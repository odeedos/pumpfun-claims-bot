import { useState, useEffect, useCallback } from 'react'
import type { Watch } from '../lib/types'
import { api } from '../lib/api'

export function useWatches() {
  const [watches,  setWatches]  = useState<Watch[]>([])
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const w = await api.watches.list()
      setWatches(w)
      setError(null)
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void load() }, [load])

  const add = useCallback(async (w: Watch) => {
    await api.watches.add(w)
    await load()
  }, [load])

  const remove = useCallback(async (addr: string) => {
    await api.watches.remove(addr)
    await load()
  }, [load])

  return { watches, loading, error, add, remove, refresh: load }
}
