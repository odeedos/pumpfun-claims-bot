import type { HealthStatus, Watch } from './types'

const BASE = import.meta.env.VITE_API_URL ?? ''

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json() as Promise<T>
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json() as Promise<T>
}

async function del(path: string): Promise<void> {
  const res = await fetch(`${BASE}${path}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
}

export const api = {
  health: () => get<HealthStatus>('/health'),
  watches: {
    list:   ()               => get<Watch[]>('/api/v1/watches'),
    add:    (w: Watch)       => post<Watch>('/api/v1/watches', w),
    remove: (addr: string)   => del(`/api/v1/watches/${encodeURIComponent(addr)}`),
  },
  /** Returns the SSE endpoint URL for EventSource */
  streamUrl: () => `${BASE}/api/v1/claims/stream`,
}
