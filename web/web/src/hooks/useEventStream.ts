import { useState, useEffect, useCallback } from 'react'
import type { FeedEvent } from '../types'
import { api } from '../lib/api'

const MAX_EVENTS = 100
const RECONNECT_DELAY_MS = 3_000

export function useEventStream() {
  const [events,    setEvents]    = useState<FeedEvent[]>([])
  const [connected, setConnected] = useState(false)
  const [error,     setError]     = useState<string | null>(null)

  const addEvent = useCallback((evt: FeedEvent) => {
    setEvents(prev => [(evt as FeedEvent & { isNew: boolean; id: string })
      , ...prev].slice(0, MAX_EVENTS))
  }, [])

  useEffect(() => {
    let es: EventSource | null = null
    let retryTimeout: ReturnType<typeof setTimeout> | undefined
    let stopped = false

    function connect() {
      if (stopped) return
      try {
        es = new EventSource(api.streamUrl())
      } catch {
        setError('EventSource not supported')
        return
      }

      es.onopen = () => {
        setConnected(true)
        setError(null)
      }

      es.onerror = () => {
        setConnected(false)
        es?.close()
        if (!stopped) {
          retryTimeout = setTimeout(connect, RECONNECT_DELAY_MS)
        }
      }

      // Generic message handler — each SSE event carries the type in its `event` field
      const TYPES = ['launch', 'trade', 'graduation', 'claim', 'distribution'] as const
      for (const t of TYPES) {
        es.addEventListener(t, (e: MessageEvent) => {
          try {
            const raw = JSON.parse(e.data as string) as Record<string, unknown>
            addEvent({ ...raw, type: t } as FeedEvent)
          } catch {
            // ignore malformed frames
          }
        })
      }
    }

    connect()

    return () => {
      stopped = true
      clearTimeout(retryTimeout)
      es?.close()
      setConnected(false)
    }
  }, [addEvent])

  return { events, connected, error }
}
