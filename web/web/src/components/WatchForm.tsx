import { useState } from 'react'
import type { Watch } from '../lib/types'

interface Props {
  onAdd: (w: Watch) => Promise<void>
  loading?: boolean
}

export default function WatchForm({ onAdd, loading = false }: Props) {
  const [address, setAddress] = useState('')
  const [label,   setLabel]   = useState('')
  const [error,   setError]   = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const addr = address.trim()
    if (!addr) { setError('Address is required'); return }
    setError(null)
    try {
      await onAdd({ address: addr, label: label.trim() || undefined })
      setAddress('')
      setLabel('')
    } catch (err) {
      setError(String(err))
    }
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="flex flex-col gap-2">
      <input
        value={address}
        onChange={e => setAddress(e.target.value)}
        placeholder="Wallet address or token CA"
        className="bg-tg-input border border-tg-border rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-tg-blue"
      />
      <input
        value={label}
        onChange={e => setLabel(e.target.value)}
        placeholder="Label (optional)"
        className="bg-tg-input border border-tg-border rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-tg-blue"
      />
      {error && <p className="text-pump-pink text-xs">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-tg-blue text-white rounded-lg py-2 text-sm font-medium hover:bg-tg-blue/80 transition disabled:opacity-50"
      >
        {loading ? 'Adding…' : '+ Add Watch'}
      </button>
    </form>
  )
}
