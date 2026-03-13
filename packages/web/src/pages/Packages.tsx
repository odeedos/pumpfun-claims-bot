import { Link } from 'react-router-dom'

function BotMsg({ children, time = '10:00' }: { children: React.ReactNode; time?: string }) {
  return (
    <div className="flex gap-2 items-start">
      <div className="w-8 h-8 rounded-full bg-tg-input flex items-center justify-center text-sm shrink-0">📦</div>
      <div className="bg-tg-bubble-in rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
        <p className="text-tg-blue text-sm font-medium mb-1">PumpKit</p>
        {children}
        <span className="text-[11px] text-zinc-500 block text-right mt-1">{time}</span>
      </div>
    </div>
  )
}

const PACKAGES = [
  {
    icon: '🧱',
    name: '@pumpkit/core',
    border: 'border-l-tg-blue',
    desc: 'The shared foundation. Every PumpKit bot uses core.',
    features: [
      '🤖 Grammy bot scaffolding + command router',
      '📡 WebSocket + HTTP event monitors',
      '⛓️ Solana RPC client + program decoders',
      '📝 HTML message formatter (Telegram)',
      '💾 File-based + SQLite storage adapters',
      '⚙️ Typed env config with validation',
      '🏥 HTTP health check server',
      '📊 Leveled console logger',
    ],
    code: `import { createBot, createHealthServer } from '@pumpkit/core';

const bot = createBot({
  token: process.env.BOT_TOKEN!,
  commands: { start: (ctx) => ctx.reply('Hello!') },
});`,
  },
  {
    icon: '📡',
    name: '@pumpkit/monitor',
    border: 'border-l-pump-green',
    desc: 'All-in-one PumpFun activity monitor. DM bot + REST API + SSE streaming.',
    features: [
      '💰 Fee claims (by wallet or token)',
      '🚀 Token launches (with cashback detection)',
      '🎓 Graduations (bonding curve → AMM)',
      '🐋 Whale trades (configurable threshold)',
      '👑 CTO events (creator transfers)',
      '💎 Fee distributions',
    ],
    extra: 'API: REST endpoints + SSE real-time stream\nDeploy: Railway, Fly.io, or any Node.js host',
  },
  {
    icon: '📢',
    name: '@pumpkit/channel',
    border: 'border-l-pump-cyan',
    desc: 'Read-only Telegram channel feed. Broadcasts token events to a public channel.',
    features: [
      '• Zero interaction needed — just add as channel admin',
      '• Customizable message templates',
      '• Filter by event type',
      '• Rate limiting built in',
    ],
  },
  {
    icon: '💰',
    name: '@pumpkit/claim',
    border: 'border-l-pump-yellow',
    desc: 'Fee claim tracker. Look up claims by token CA or creator X handle.',
    features: [
      '• /claim <CA> — show fee claims for a token',
      '• /creator <handle> — find tokens by X/Twitter handle',
      '• CSV export for accounting',
      '• Historical claim data',
    ],
  },
  {
    icon: '🏆',
    name: '@pumpkit/tracker',
    border: 'border-l-pump-purple',
    desc: 'Group call-tracking bot. Add to your Telegram group, members call tokens, bot tracks results.',
    features: [
      '📊 Leaderboards (daily/weekly/monthly/all-time)',
      '💰 PNL cards with entry/exit prices',
      '🏅 Rank tiers (Amateur → Oracle)',
      '⛓️ Multi-chain (Solana, ETH, Base, BSC)',
      '📈 Win rate & multiplier tracking',
      '🎯 Call resolution (auto or manual)',
    ],
  },
]

export default function Packages() {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-3xl mx-auto pb-24">

      <div className="text-center py-2">
        <span className="bg-tg-input/80 text-zinc-400 text-xs px-3 py-1 rounded-full">Packages</span>
      </div>

      {/* Overview */}
      <BotMsg time="10:00">
        <p className="text-zinc-300 text-sm">PumpKit ships 5 packages. Each is independent — use what you need.</p>
        <p className="text-xs text-zinc-500 mt-1">5 packages • TypeScript • MIT License • Node.js ≥ 20</p>
      </BotMsg>

      {/* Package cards */}
      {PACKAGES.map((pkg, i) => (
        <div key={pkg.name} className="flex gap-2 items-start">
          <div className="w-8 h-8 rounded-full bg-tg-input flex items-center justify-center text-sm shrink-0">{pkg.icon}</div>
          <div className={`bg-tg-bubble-in rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] border-l-4 ${pkg.border}`}>
            <p className="text-tg-blue text-sm font-medium mb-1">PumpKit</p>
            <p className="text-tg-blue font-bold font-mono text-sm">✅ {pkg.name}</p>
            <p className="text-zinc-300 text-xs mt-1 mb-2">{pkg.desc}</p>
            <ul className="text-zinc-500 text-xs space-y-0.5">
              {pkg.features.map(f => <li key={f}>{f}</li>)}
            </ul>
            {pkg.extra && (
              <pre className="text-zinc-500 text-xs mt-2 whitespace-pre-wrap">{pkg.extra}</pre>
            )}
            {pkg.code && (
              <div className="bg-[#1a2332] rounded-lg p-3 font-mono text-xs text-zinc-300 overflow-x-auto mt-3">
                <pre>{pkg.code}</pre>
              </div>
            )}
            <p className="text-zinc-600 text-[11px] mt-2 font-mono">npm install {pkg.name} <span className="text-zinc-700">(coming soon)</span></p>
            <span className="text-[11px] text-zinc-500 block text-right mt-1">10:0{i}</span>
          </div>
        </div>
      ))}

      {/* CTA */}
      <div className="bg-tg-bubble rounded-2xl rounded-br-sm max-w-[85%] ml-auto px-4 py-3">
        <p className="text-white font-semibold mb-1">Ready to build?</p>
        <p className="text-zinc-300 text-sm mb-2">Pick a package and start coding.</p>
        <div className="grid grid-cols-3 gap-2">
          <Link to="/docs"
             className="bg-tg-input text-tg-blue text-xs rounded-lg px-2 py-1.5 text-center hover:bg-tg-hover transition">
            📖 Read the Docs
          </Link>
          <Link to="/create"
             className="bg-tg-input text-tg-blue text-xs rounded-lg px-2 py-1.5 text-center hover:bg-tg-hover transition">
            🪙 Create Coin
          </Link>
          <a href="https://github.com/nirholas/pumpkit" target="_blank" rel="noreferrer"
             className="bg-tg-input text-tg-blue text-xs rounded-lg px-2 py-1.5 text-center hover:bg-tg-hover transition">
            ⭐ GitHub
          </a>
        </div>
        <span className="text-[11px] text-zinc-500 block text-right mt-1">10:05</span>
      </div>
    </div>
  )
}
