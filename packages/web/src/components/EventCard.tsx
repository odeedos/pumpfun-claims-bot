export type EventType = 'launch' | 'whale' | 'graduation' | 'claim' | 'cto'

export interface MockEvent {
  id: string
  type: EventType
  timestamp: Date
  isNew?: boolean

  token: {
    name: string
    symbol: string
    mint: string
  }

  // ── Launch ──────────────────────────────────────────
  creator?: string
  initialMcUsd?: number
  holders?: number
  bondingCurve?: number       // 0-100
  cashbackEnabled?: boolean
  hasTwitter?: boolean
  hasTelegram?: boolean
  hasWebsite?: boolean
  description?: string
  initialSol?: number         // SOL raised at time of launch

  // ── Whale ────────────────────────────────────────────
  tradeAmountSol?: number
  tradeType?: 'buy' | 'sell'
  wallet?: string
  priceImpact?: number        // %
  mcBefore?: number
  mcAfter?: number
  bcAfter?: number            // bonding curve % after trade

  // ── Graduation ───────────────────────────────────────
  liquiditySol?: number
  peakMcUsd?: number
  totalHolders?: number
  totalVolumeSol?: number

  // ── Claim ────────────────────────────────────────────
  claimer?: string
  claimAmountSol?: number
  lifetimeClaimedSol?: number
  claimNumber?: number
  githubHandle?: string

  // ── CTO ──────────────────────────────────────────────
  fromWallet?: string
  toWallet?: string
  mcAtTransfer?: number
  holdersAtTransfer?: number
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function trunc(addr: string) {
  if (addr.length <= 8) return addr
  return `${addr.slice(0, 4)}…${addr.slice(-4)}`
}

function fmtUsd(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}k`
  return `$${n.toFixed(0)}`
}

function fmtSol(n: number) {
  return `${n.toFixed(1)} SOL`
}

function fmtTime(d: Date) {
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
}

// Bonding curve progress bar
function BondingBar({ pct }: { pct: number }) {
  const capped = Math.min(pct, 100)
  const color = pct >= 80 ? '#b388ff' : pct >= 50 ? '#00e676' : '#5eb5f7'
  return (
    <div className="mt-1">
      <div className="flex justify-between text-[10px] text-zinc-500 mb-0.5">
        <span>Bonding Curve</span>
        <span style={{ color }}>{capped.toFixed(0)}%</span>
      </div>
      <div className="w-full h-1.5 bg-tg-input rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${capped}%`, background: color }}
        />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Per-type card bodies
// ─────────────────────────────────────────────────────────────

function LaunchBody({ e }: { e: MockEvent }) {
  const solLink = `https://solscan.io/token/${e.token.mint}`
  const pumpLink = `https://pump.fun/coin/${e.token.mint}`

  return (
    <>
      <p className="font-semibold text-white leading-tight">
        🚀 New Token Launch
      </p>

      <div className="mt-2 space-y-0.5">
        <p className="text-base font-bold text-white">
          {e.token.name}{' '}
          <span className="text-pump-green">(${e.token.symbol})</span>
        </p>
        <p className="text-xs text-zinc-400 font-mono break-all">
          CA: {e.token.mint}
        </p>
        <p className="text-xs text-zinc-400 font-mono">
          Creator: {e.creator ? trunc(e.creator) : '—'}
        </p>
      </div>

      {/* Stats row */}
      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        {e.initialMcUsd !== undefined && (
          <span className="text-zinc-300">
            💰 <span className="text-white font-medium">{fmtUsd(e.initialMcUsd)}</span>{' '}
            <span className="text-zinc-500">MC</span>
          </span>
        )}
        {e.holders !== undefined && (
          <span className="text-zinc-300">
            👥 <span className="text-white font-medium">{e.holders}</span>{' '}
            <span className="text-zinc-500">holders</span>
          </span>
        )}
        {e.initialSol !== undefined && (
          <span className="text-zinc-300">
            ⚡ <span className="text-white font-medium">{fmtSol(e.initialSol)}</span>{' '}
            <span className="text-zinc-500">raised</span>
          </span>
        )}
        <span className="text-zinc-300">
          🔁{' '}
          <span className={e.cashbackEnabled ? 'text-pump-green font-medium' : 'text-zinc-500'}>
            {e.cashbackEnabled ? 'Cashback ON' : 'No cashback'}
          </span>
        </span>
      </div>

      {/* Bonding bar */}
      {e.bondingCurve !== undefined && <BondingBar pct={e.bondingCurve} />}

      {/* Socials */}
      {(e.hasTwitter || e.hasTelegram || e.hasWebsite) && (
        <div className="mt-1.5 flex gap-2 text-[11px]">
          {e.hasTwitter  && <span className="text-tg-blue">🐦 Twitter</span>}
          {e.hasTelegram && <span className="text-tg-blue">💬 Telegram</span>}
          {e.hasWebsite  && <span className="text-tg-blue">🌐 Website</span>}
        </div>
      )}

      {/* Description */}
      {e.description && (
        <p className="mt-1.5 text-xs text-zinc-400 italic">"{e.description}"</p>
      )}

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-2 mt-3">
        <a href={pumpLink} target="_blank" rel="noreferrer"
           className="bg-tg-input text-tg-blue text-xs rounded-lg px-3 py-1.5 text-center hover:bg-tg-hover transition">
          View on PumpFun
        </a>
        <a href={solLink} target="_blank" rel="noreferrer"
           className="bg-tg-input text-tg-blue text-xs rounded-lg px-3 py-1.5 text-center hover:bg-tg-hover transition">
          Explorer
        </a>
      </div>
    </>
  )
}

function WhaleBody({ e }: { e: MockEvent }) {
  const isBuy = e.tradeType === 'buy'
  const amtColor = isBuy ? 'text-pump-green' : 'text-pump-pink'
  const pumpLink = `https://pump.fun/coin/${e.token.mint}`

  return (
    <>
      <p className="font-semibold text-white">
        🐋 Whale {isBuy ? 'Buy' : 'Sell'} —{' '}
        <span className={amtColor}>{fmtSol(e.tradeAmountSol ?? 0)}</span>
      </p>

      <div className="mt-2 space-y-0.5">
        <p className="text-base font-bold text-white">
          {e.token.name}{' '}
          <span className="text-pump-green">(${e.token.symbol})</span>
        </p>
        <p className="text-xs text-zinc-400 font-mono break-all">
          CA: {e.token.mint}
        </p>
        <p className="text-xs text-zinc-400 font-mono">
          Wallet: {e.wallet ? trunc(e.wallet) : '—'}
        </p>
      </div>

      {/* Market cap change */}
      {e.mcBefore !== undefined && e.mcAfter !== undefined && (
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className="text-zinc-500">MC:</span>
          <span className="text-zinc-300">{fmtUsd(e.mcBefore)}</span>
          <span className="text-zinc-500">→</span>
          <span className={`font-semibold ${isBuy ? 'text-pump-green' : 'text-pump-pink'}`}>
            {fmtUsd(e.mcAfter)}
          </span>
        </div>
      )}

      <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        {e.priceImpact !== undefined && (
          <span className="text-zinc-300">
            📊 <span className={`font-medium ${isBuy ? 'text-pump-green' : 'text-pump-pink'}`}>
              {isBuy ? '+' : '-'}{e.priceImpact.toFixed(1)}%
            </span>{' '}
            <span className="text-zinc-500">impact</span>
          </span>
        )}
        {e.holders !== undefined && (
          <span className="text-zinc-300">
            👥 <span className="text-white font-medium">{e.holders}</span>{' '}
            <span className="text-zinc-500">holders</span>
          </span>
        )}
      </div>

      {e.bcAfter !== undefined && <BondingBar pct={e.bcAfter} />}

      <div className="mt-3">
        <a href={pumpLink} target="_blank" rel="noreferrer"
           className="block w-full bg-tg-input text-tg-blue text-xs rounded-lg px-3 py-1.5 text-center hover:bg-tg-hover transition">
          View TX
        </a>
      </div>
    </>
  )
}

function GraduationBody({ e }: { e: MockEvent }) {
  const pumpLink = `https://pump.fun/coin/${e.token.mint}`
  const dexLink = `https://dexscreener.com/solana/${e.token.mint}`

  return (
    <>
      <p className="font-semibold text-white">🎓 Token Graduated!</p>

      <div className="mt-2 space-y-0.5">
        <p className="text-base font-bold text-white">
          {e.token.name}{' '}
          <span className="text-pump-green">(${e.token.symbol})</span>
        </p>
        <p className="text-xs text-zinc-400 font-mono break-all">
          CA: {e.token.mint}
        </p>
        <p className="text-xs text-zinc-400">Migrated to PumpSwap AMM ✓</p>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        {e.liquiditySol !== undefined && (
          <span className="text-zinc-300">
            🏊 <span className="text-white font-medium">{fmtSol(e.liquiditySol)}</span>{' '}
            <span className="text-zinc-500">liquidity</span>
          </span>
        )}
        {e.peakMcUsd !== undefined && (
          <span className="text-zinc-300">
            🏆 <span className="text-pump-yellow font-medium">{fmtUsd(e.peakMcUsd)}</span>{' '}
            <span className="text-zinc-500">peak MC</span>
          </span>
        )}
        {e.totalHolders !== undefined && (
          <span className="text-zinc-300">
            👥 <span className="text-white font-medium">{e.totalHolders.toLocaleString()}</span>{' '}
            <span className="text-zinc-500">holders</span>
          </span>
        )}
        {e.totalVolumeSol !== undefined && (
          <span className="text-zinc-300">
            📈 <span className="text-white font-medium">{e.totalVolumeSol.toLocaleString()} SOL</span>{' '}
            <span className="text-zinc-500">volume</span>
          </span>
        )}
      </div>

      {/* Graduation badge */}
      <div className="mt-2 inline-flex items-center gap-1.5 bg-pump-purple/20 border border-pump-purple/40 rounded-full px-3 py-1 text-xs text-pump-purple">
        🎓 Bonding curve complete — 100%
      </div>

      <div className="grid grid-cols-2 gap-2 mt-3">
        <a href={pumpLink} target="_blank" rel="noreferrer"
           className="bg-tg-input text-tg-blue text-xs rounded-lg px-3 py-1.5 text-center hover:bg-tg-hover transition">
          View Pool
        </a>
        <a href={dexLink} target="_blank" rel="noreferrer"
           className="bg-tg-input text-tg-blue text-xs rounded-lg px-3 py-1.5 text-center hover:bg-tg-hover transition">
          Trade
        </a>
      </div>
    </>
  )
}

function ClaimBody({ e }: { e: MockEvent }) {
  const solLink = `https://solscan.io/token/${e.token.mint}`

  return (
    <>
      <p className="font-semibold text-white">
        💰 Fee Claimed —{' '}
        <span className="text-pump-green">{fmtSol(e.claimAmountSol ?? 0)}</span>
      </p>

      <div className="mt-2 space-y-0.5">
        <p className="text-base font-bold text-white">
          {e.token.name}{' '}
          <span className="text-pump-green">(${e.token.symbol})</span>
        </p>
        <p className="text-xs text-zinc-400 font-mono break-all">
          CA: {e.token.mint}
        </p>
        <p className="text-xs text-zinc-400 font-mono">
          Creator: {e.claimer ? trunc(e.claimer) : '—'} claimed fees
        </p>
        {e.githubHandle && (
          <p className="text-xs text-tg-blue">🐙 GitHub: @{e.githubHandle}</p>
        )}
      </div>

      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        {e.lifetimeClaimedSol !== undefined && (
          <span className="text-zinc-300">
            🏆 <span className="text-white font-medium">{fmtSol(e.lifetimeClaimedSol)}</span>{' '}
            <span className="text-zinc-500">lifetime</span>
          </span>
        )}
        {e.claimNumber !== undefined && (
          <span className="text-zinc-300">
            🔖 <span className="text-white font-medium">Claim #{e.claimNumber}</span>
          </span>
        )}
        {e.initialMcUsd !== undefined && (
          <span className="text-zinc-300">
            💰 <span className="text-white font-medium">{fmtUsd(e.initialMcUsd)}</span>{' '}
            <span className="text-zinc-500">MC</span>
          </span>
        )}
        {e.holders !== undefined && (
          <span className="text-zinc-300">
            👥 <span className="text-white font-medium">{e.holders}</span>{' '}
            <span className="text-zinc-500">holders</span>
          </span>
        )}
      </div>

      <div className="mt-3">
        <a href={solLink} target="_blank" rel="noreferrer"
           className="block w-full bg-tg-input text-tg-blue text-xs rounded-lg px-3 py-1.5 text-center hover:bg-tg-hover transition">
          View TX
        </a>
      </div>
    </>
  )
}

function CtoBody({ e }: { e: MockEvent }) {
  const solLink = `https://solscan.io/token/${e.token.mint}`

  return (
    <>
      <p className="font-semibold text-white">👑 Creator Transfer</p>

      <div className="mt-2 space-y-0.5">
        <p className="text-base font-bold text-white">
          {e.token.name}{' '}
          <span className="text-pump-green">(${e.token.symbol})</span>
        </p>
        <p className="text-xs text-zinc-400 font-mono break-all">
          CA: {e.token.mint}
        </p>
        <div className="flex items-center gap-1.5 text-xs font-mono mt-1">
          <span className="text-zinc-400">From:</span>
          <span className="text-pump-pink">{e.fromWallet ? trunc(e.fromWallet) : '—'}</span>
          <span className="text-zinc-500">→</span>
          <span className="text-pump-green">To: {e.toWallet ? trunc(e.toWallet) : '—'}</span>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        {e.mcAtTransfer !== undefined && (
          <span className="text-zinc-300">
            💰 <span className="text-white font-medium">{fmtUsd(e.mcAtTransfer)}</span>{' '}
            <span className="text-zinc-500">MC at transfer</span>
          </span>
        )}
        {e.holdersAtTransfer !== undefined && (
          <span className="text-zinc-300">
            👥 <span className="text-white font-medium">{e.holdersAtTransfer}</span>{' '}
            <span className="text-zinc-500">holders</span>
          </span>
        )}
        {e.bondingCurve !== undefined && (
          <span className="text-zinc-300">
            📈 <span className="text-white font-medium">{e.bondingCurve.toFixed(0)}%</span>{' '}
            <span className="text-zinc-500">bonding</span>
          </span>
        )}
      </div>

      <div className="mt-3">
        <a href={solLink} target="_blank" rel="noreferrer"
           className="block w-full bg-tg-input text-tg-blue text-xs rounded-lg px-3 py-1.5 text-center hover:bg-tg-hover transition">
          View TX
        </a>
      </div>
    </>
  )
}

// ─────────────────────────────────────────────────────────────
// Avatar config per type
// ─────────────────────────────────────────────────────────────

const TYPE_META: Record<EventType, { emoji: string; bg: string }> = {
  launch:     { emoji: '🚀', bg: 'bg-tg-blue' },
  whale:      { emoji: '🐋', bg: 'bg-pump-orange' },
  graduation: { emoji: '🎓', bg: 'bg-pump-purple' },
  claim:      { emoji: '💰', bg: 'bg-pump-green' },
  cto:        { emoji: '👑', bg: 'bg-pump-pink' },
}

// ─────────────────────────────────────────────────────────────
// EventCard
// ─────────────────────────────────────────────────────────────

export default function EventCard({ event }: { event: MockEvent }) {
  const meta = TYPE_META[event.type]

  return (
    <div
      className={`flex gap-2 items-start ${event.isNew ? 'animate-[slideIn_0.3s_ease-out]' : ''}`}
    >
      {/* Channel avatar */}
      <div className={`w-10 h-10 rounded-full ${meta.bg} flex items-center justify-center text-lg shrink-0`}>
        {meta.emoji}
      </div>

      {/* Message bubble */}
      <div className="bg-tg-bubble-in rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] min-w-[240px]">
        <p className="text-tg-blue text-sm font-medium mb-2">PumpKit Live</p>

        {event.type === 'launch'     && <LaunchBody e={event} />}
        {event.type === 'whale'      && <WhaleBody e={event} />}
        {event.type === 'graduation' && <GraduationBody e={event} />}
        {event.type === 'claim'      && <ClaimBody e={event} />}
        {event.type === 'cto'        && <CtoBody e={event} />}

        <span className="text-[11px] text-zinc-500 block text-right mt-2">
          {fmtTime(event.timestamp)}
        </span>
      </div>
    </div>
  )
}
