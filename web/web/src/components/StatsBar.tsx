import type { FeedEvent } from '../types'

interface Props {
  events: FeedEvent[]
  connected: boolean
}

export default function StatsBar({ events, connected }: Props) {
  const launches     = events.filter(e => e.type === 'launch').length
  const trades       = events.filter(e => e.type === 'trade').length
  const graduations  = events.filter(e => e.type === 'graduation').length
  const claims       = events.filter(e => e.type === 'claim').length

  return (
    <div className="flex items-center gap-3 px-4 py-1.5 border-b border-tg-border bg-tg-chat/80 text-[11px] text-zinc-500 overflow-x-auto">
      <span className={`shrink-0 ${connected ? 'text-pump-green' : 'text-pump-pink'}`}>
        ● {connected ? 'Live' : 'Offline'}
      </span>
      <span className="shrink-0">🚀 <span className="text-tg-blue">{launches}</span> launches</span>
      <span className="shrink-0">🐋 <span className="text-pump-orange">{trades}</span> trades</span>
      <span className="shrink-0">🎓 <span className="text-pump-purple">{graduations}</span> grads</span>
      <span className="shrink-0">💰 <span className="text-pump-green">{claims}</span> claims</span>
    </div>
  )
}
