import type { Watch } from '../lib/types'
import WalletAddress from './WalletAddress'

interface Props {
  watches: Watch[]
  onRemove: (addr: string) => Promise<void>
  loading?: boolean
}

export default function WatchList({ watches, onRemove, loading = false }: Props) {
  if (watches.length === 0) {
    return <p className="text-zinc-500 text-xs text-center py-4">No watches yet.</p>
  }

  return (
    <ul className="flex flex-col gap-1.5">
      {watches.map(w => (
        <li key={w.address} className="flex items-center justify-between bg-tg-input rounded-lg px-3 py-2 gap-2">
          <div className="min-w-0">
            {w.label && <p className="text-zinc-300 text-xs font-medium truncate">{w.label}</p>}
            <WalletAddress address={w.address} chars={6} className="text-xs text-zinc-500" />
          </div>
          <button
            onClick={() => void onRemove(w.address)}
            disabled={loading}
            className="text-pump-pink text-xs hover:text-pump-pink/80 transition shrink-0 disabled:opacity-50"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  )
}
