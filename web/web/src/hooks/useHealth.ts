import { useState, useEffect } from 'react'
import type { HealthStatus } from '../lib/types'
import { api } from '../lib/api'

const POLL_INTERVAL_MS = 30_000

export function useHealth() {
  const [health, setHealth] = useState<HealthStatus | null>(null)
  const [error,  setError]  = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function poll() {
      try {
        const h = await api.health()
        if (!cancelled) { setHealth(h); setError(null) }
      } catch (err) {
        if (!cancelled) setError(String(err))
      }
    }

    poll()
    const timer = setInterval(poll, POLL_INTERVAL_MS)
    return () => { cancelled = true; clearInterval(timer) }
  }, [])

  return { health, error }
}
