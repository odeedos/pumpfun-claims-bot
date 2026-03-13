import { useState, useEffect, useRef, useCallback } from 'react'
import EventCard, { type MockEvent, type EventType } from '../components/EventCard'

// ──────────────────────────────────────────────
// Mock data
// ──────────────────────────────────────────────

const MOCK_TOKENS = [
  { name: 'PumpKitty',  symbol: 'KITTY', mint: '7xKpABCDEFGHIJKLMNOPQRSTUVWXYZ123nRm' },
  { name: 'SolDoge',    symbol: 'SDOGE', mint: '3mFqABCDEFGHIJKLMNOPQRSTUVWXYZ1238vLp' },
  { name: 'MoonPump',   symbol: 'MPUMP', mint: '9aHjABCDEFGHIJKLMNOPQRSTUVWXYZ1232wXk' },
  { name: 'BonkFren',   symbol: 'BFREN', mint: '5cNrABCDEFGHIJKLMNOPQRSTUVWXYZ1237tQs' },
  { name: 'PepeSol',    symbol: 'PEPE',  mint: '2dLwABCDEFGHIJKLMNOPQRSTUVWXYZ1234mYn' },
  { name: 'DegenApe',   symbol: 'DAPE',  mint: '8bGxABCDEFGHIJKLMNOPQRSTUVWXYZ1231pRv' },
  { name: 'ChadCoin',   symbol: 'CHAD',  mint: '4fKtABCDEFGHIJKLMNOPQRSTUVWXYZ1236sWm' },
  { name: 'WenLambo',   symbol: 'WEN',   mint: '6eJyABCDEFGHIJKLMNOPQRSTUVWXYZ1239cDp' },
  { name: 'kekius',     symbol: 'KEKIUS', mint: '7GhWwhaMgbKiRWxF93Bud6HnHMci6NCLTJyTxG8zFH51' },
  { name: 'Pumfun oso', symbol: 'OSO',   mint: '8ocgxU9ccawJUYAjwf2yC9VvetCUth2xjKS2kAcmjFi8' },
  { name: 'RocketFrog', symbol: 'RFROG', mint: 'DzXqFEFuZgJoLmNbPcSnTvYwXaHdKiOpJrStUvWxYz12' },
  { name: 'SolCat',     symbol: 'SCAT',  mint: 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUu34' },
]

const CREATORS = [
  '7GhWwhaMgbKiRWxF93Bud6HnHMci6NCLTJyTxG8zFH51',
  '8ocgxU9ccawJUYAjwf2yC9VvetCUth2xjKS2kAcmjFi8',
  '3mFqZAbCdEfGhIjKlMnOpQrStUvWxYz1234567890AB',
  '9aHjCdEfGhIjKlMnOpQrStUvWxYz1234567890ABCD',
  'DzXqFEFuZgJoLmNbPcSnTvYwXaHdKiOpJrStUvWxYz12',
]

const GITHUB_HANDLES = ['nirholas', 'soldev', 'pumpbuilder', 'cryptokev', 'solhacker']

function rand<T>(arr: T[]) { return arr[Math.floor(Math.random() * arr.length)] }
function randNum(min: number, max: number) { return +(Math.random() * (max - min) + min).toFixed(2) }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min }

function makeEvent(type: EventType, minsAgo: number): MockEvent {
  const token   = rand(MOCK_TOKENS)
  const creator = rand(CREATORS)
  const ts      = new Date(Date.now() - minsAgo * 60_000)
  const id      = `${type}-${Date.now()}-${Math.random()}`

  switch (type) {
    case 'launch': {
      const bc       = randInt(0, 15)
      const initSol  = randNum(0.2, 5.0)
      const mc       = randInt(8_000, 80_000)
      return {
        id, type, timestamp: ts, token, creator,
        initialMcUsd:    mc,
        holders:         randInt(1, 12),
        bondingCurve:    bc,
        initialSol:      initSol,
        cashbackEnabled: Math.random() > 0.5,
        hasTwitter:      Math.random() > 0.4,
        hasTelegram:     Math.random() > 0.6,
        hasWebsite:      Math.random() > 0.7,
        description:     Math.random() > 0.5
          ? rand(['The future of memecoins on Solana!', 'WAGMI fren 🐸', 'Community-driven, no dev wallet'])
          : undefined,
      }
    }
    case 'whale': {
      const isBuy   = Math.random() > 0.35
      const sol     = randNum(15, 120)
      const mcBefore = randInt(50_000, 500_000)
      const impact  = randNum(1.5, 8.5)
      const mcAfter  = isBuy
        ? Math.round(mcBefore * (1 + impact / 100))
        : Math.round(mcBefore * (1 - impact / 100))
      return {
        id, type, timestamp: ts, token,
        tradeAmountSol: sol,
        tradeType:      isBuy ? 'buy' : 'sell',
        wallet:         rand(CREATORS),
        priceImpact:    impact,
        mcBefore, mcAfter,
        bcAfter:        randInt(30, 85),
        holders:        randInt(20, 400),
      }
    }
    case 'graduation': {
      return {
        id, type, timestamp: ts, token,
        liquiditySol:    randNum(83, 87),
        peakMcUsd:       randInt(200_000, 5_000_000),
        totalHolders:    randInt(100, 2000),
        totalVolumeSol:  randInt(300, 5000),
      }
    }
    case 'claim': {
      const claimAmt = randNum(0.5, 25)
      return {
        id, type, timestamp: ts, token,
        claimer:          creator,
        claimAmountSol:   claimAmt,
        lifetimeClaimedSol: randNum(claimAmt, claimAmt * 20),
        claimNumber:      randInt(1, 100),
        githubHandle:     Math.random() > 0.5 ? rand(GITHUB_HANDLES) : undefined,
        initialMcUsd:     randInt(10_000, 300_000),
        holders:          randInt(10, 500),
      }
    }
    case 'cto': {
      return {
        id, type, timestamp: ts, token,
        fromWallet:       creator,
        toWallet:         rand(CREATORS.filter(c => c !== creator)),
        mcAtTransfer:     randInt(20_000, 250_000),
        holdersAtTransfer: randInt(15, 300),
        bondingCurve:     randInt(20, 75),
      }
    }
  }
}

const ALL_TYPES: EventType[] = ['launch', 'whale', 'graduation', 'claim', 'cto']
const FILTER_CONFIG = [
  { id: 'all',        label: 'All',          types: ALL_TYPES },
  { id: 'launch',     label: '🚀 Launches',   types: ['launch']     as EventType[] },
  { id: 'whale',      label: '🐋 Whales',     types: ['whale']      as EventType[] },
  { id: 'graduation', label: '🎓 Grads',      types: ['graduation'] as EventType[] },
  { id: 'claim',      label: '💰 Claims',     types: ['claim']      as EventType[] },
  { id: 'cto',        label: '👑 CTO',        types: ['cto']        as EventType[] },
]

// ──────────────────────────────────────────────
// Hook
// ──────────────────────────────────────────────

function useMockFeed() {
  const [events, setEvents] = useState<MockEvent[]>(() => {
    const count = randInt(8, 12)
    return Array.from({ length: count }, (_, i) =>
      makeEvent(rand(ALL_TYPES), i * randNum(0.4, 2.5))
    ).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  })

  const addEvent = useCallback(() => {
    const event: MockEvent = { ...makeEvent(rand(ALL_TYPES), 0), isNew: true }
    setEvents(prev => {
      const next = [event, ...prev.slice(0, 49)]
      return next
    })
    // Clear isNew after animation
    setTimeout(() => {
      setEvents(prev => prev.map(e => e.id === event.id ? { ...e, isNew: false } : e))
    }, 400)
  }, [])

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    function schedule() {
      timeout = setTimeout(() => {
        addEvent()
        schedule()
      }, randInt(3000, 6000))
    }
    schedule()
    return () => clearTimeout(timeout)
  }, [addEvent])

  return events
}

// ──────────────────────────────────────────────
// Stats bar (live counters)
// ──────────────────────────────────────────────

function StatsBar({ events }: { events: MockEvent[] }) {
  const launches    = events.filter(e => e.type === 'launch').length
  const whales      = events.filter(e => e.type === 'whale').length
  const graduations = events.filter(e => e.type === 'graduation').length
  const claims      = events.filter(e => e.type === 'claim').length
  return (
    <div className="flex gap-4 text-[11px] text-zinc-500 px-4 py-1.5 border-b border-tg-border bg-tg-chat/80">
      <span>🚀 <span className="text-tg-blue">{launches}</span> launches</span>
      <span>🐋 <span className="text-pump-orange">{whales}</span> whales</span>
      <span>🎓 <span className="text-pump-purple">{graduations}</span> grads</span>
      <span>💰 <span className="text-pump-green">{claims}</span> claims</span>
    </div>
  )
}

// ──────────────────────────────────────────────
// Dashboard
// ──────────────────────────────────────────────

export default function Dashboard() {
  const allEvents               = useMockFeed()
  const [filter, setFilter]     = useState('all')
  const bottomRef               = useRef<HTMLDivElement>(null)

  const activeFilter = FILTER_CONFIG.find(f => f.id === filter) ?? FILTER_CONFIG[0]
  const visible      = allEvents.filter(e => activeFilter.types.includes(e.type))

  return (
    <div className="flex flex-col h-full">

      {/* ── Filter bar ── */}
      <div className="sticky top-0 z-10 bg-tg-chat/95 backdrop-blur-sm border-b border-tg-border">
        <div className="flex gap-2 px-4 py-2 overflow-x-auto no-scrollbar">
          {FILTER_CONFIG.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition shrink-0 ${
                filter === f.id
                  ? 'bg-tg-blue text-white'
                  : 'bg-tg-input text-zinc-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <StatsBar events={allEvents} />
      </div>

      {/* ── Events ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-2 p-4 max-w-3xl mx-auto pb-6">

          {/* Date separator */}
          <div className="text-center py-2">
            <span className="bg-tg-input/80 text-zinc-400 text-xs px-3 py-1 rounded-full">Today</span>
          </div>

          {visible.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 text-sm">
              No {filter} events yet — waiting for activity…
            </div>
          ) : (
            visible.map(event => <EventCard key={event.id} event={event} />)
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* ── Bottom info bar ── */}
      <div className="shrink-0 border-t border-tg-border bg-tg-header/80 px-4 py-2 text-center text-[11px] text-zinc-500">
        Simulated feed •{' '}
        <a
          href="https://github.com/nirholas/pumpkit"
          target="_blank"
          rel="noreferrer"
          className="text-tg-blue hover:underline"
        >
          Connect your bot for live data
        </a>
      </div>
    </div>
  )
}
