import { Link } from 'react-router-dom'

function BotMsg({ time, children }: { time: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2 items-start max-w-[85%]">
      <div className="w-9 h-9 rounded-full bg-tg-input flex items-center justify-center text-base shrink-0">
        🤖
      </div>
      <div className="bg-tg-bubble-in rounded-2xl rounded-tl-sm px-4 py-3">
        <p className="text-tg-blue text-sm font-medium mb-1">PumpKit Bot</p>
        {children}
        <span className="text-[11px] text-zinc-500 block text-right mt-1">{time}</span>
      </div>
    </div>
  )
}

function UserMsg({ time, children }: { time: string; children: React.ReactNode }) {
  return (
    <div className="bg-tg-bubble rounded-2xl rounded-br-sm max-w-[85%] ml-auto px-4 py-3">
      {children}
      <span className="text-[11px] text-zinc-500 block text-right mt-1">{time}</span>
    </div>
  )
}

const FEATURES = [
  { icon: '🔔', title: 'Fee Claim Monitoring',         desc: 'Track every creator fee claim on-chain in real time' },
  { icon: '🚀', title: 'Token Launch Alerts',           desc: 'Get notified the instant a new token is created' },
  { icon: '🎓', title: 'Graduation Detection',          desc: 'Detect when tokens complete the bonding curve' },
  { icon: '🐋', title: 'Whale Trade Alerts',            desc: 'Configurable SOL threshold for large trades' },
  { icon: '👑', title: 'CTO Tracking',                  desc: 'Monitor creator ownership transfers' },
  { icon: '📊', title: 'Leaderboards & PNL',            desc: 'Group call-tracking with full stats' },
]

const PACKAGES = [
  { name: '@pumpkit/core',    status: '✅', desc: 'Shared framework & utilities' },
  { name: '@pumpkit/monitor', status: '✅', desc: 'All-in-one PumpFun monitor' },
  { name: '@pumpkit/channel', status: '✅', desc: 'Read-only channel feed bot' },
  { name: '@pumpkit/claim',   status: '✅', desc: 'Fee claim tracker bot' },
  { name: '@pumpkit/tracker', status: '🚧', desc: 'Group call-tracking bot' },
]

export default function Home() {
  return (
    <div className="flex flex-col gap-3 p-4 max-w-3xl mx-auto pb-20">

      {/* Date separator */}
      <div className="text-center py-2">
        <span className="bg-tg-input/80 text-zinc-400 text-xs px-3 py-1 rounded-full">Today</span>
      </div>

      {/* 1 — Hero */}
      <UserMsg time="12:00">
        <div className="text-4xl mb-2">🚀</div>
        <p className="text-lg font-bold text-white leading-snug">
          Build your own PumpFun Telegram bot in hours, not weeks
        </p>
        <p className="text-zinc-400 text-sm mt-1">
          PumpKit is an open-source TypeScript framework for building production-ready PumpFun bots on Solana.
        </p>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <a href="https://github.com/nirholas/pumpkit" target="_blank" rel="noreferrer"
             className="bg-tg-input text-tg-blue text-sm rounded-lg px-4 py-2 text-center hover:bg-tg-hover transition">
            ⭐ Star on GitHub
          </a>
          <Link to="/docs"
             className="bg-tg-input text-tg-blue text-sm rounded-lg px-4 py-2 text-center hover:bg-tg-hover transition">
            📖 Read the Docs
          </Link>
        </div>
      </UserMsg>

      {/* 2 — What is PumpKit */}
      <BotMsg time="12:00">
        <p className="text-white font-semibold mb-1">What is PumpKit?</p>
        <p className="text-zinc-300 text-sm leading-relaxed">
          PumpKit is an open-source TypeScript monorepo with everything you need to build and deploy
          a PumpFun bot — Solana monitoring, Telegram integration, on-chain event decoders, and
          production-ready building blocks.
        </p>
      </BotMsg>

      {/* 3 — Feature grid */}
      <UserMsg time="12:01">
        <p className="text-white font-semibold mb-2">What's included?</p>
        <div className="grid grid-cols-2 gap-2">
          {FEATURES.map(f => (
            <div key={f.title} className="bg-tg-input rounded-xl p-3">
              <div className="text-xl mb-1">{f.icon}</div>
              <p className="text-white text-xs font-semibold">{f.title}</p>
              <p className="text-zinc-500 text-[11px] leading-tight mt-0.5">{f.desc}</p>
            </div>
          ))}
        </div>
      </UserMsg>

      {/* 4 — Quick start */}
      <BotMsg time="12:02">
        <p className="text-white font-semibold mb-2">Quick Start</p>
        <div className="bg-[#1a2332] rounded-lg p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
          <p><span className="text-pump-green">$</span> git clone https://github.com/nirholas/pumpkit.git</p>
          <p><span className="text-pump-green">$</span> cd pumpkit && npm install</p>
          <p><span className="text-pump-green">$</span> cp packages/monitor/.env.example packages/monitor/.env</p>
          <p><span className="text-pump-green">$</span> npm run dev --workspace=@pumpkit/monitor</p>
        </div>
      </BotMsg>

      {/* 5 — Packages */}
      <UserMsg time="12:03">
        <p className="text-white font-semibold mb-2">📦 Packages</p>
        <div className="flex flex-col gap-1.5">
          {PACKAGES.map(pkg => (
            <div key={pkg.name} className="bg-tg-input/80 rounded-lg px-3 py-2 flex items-center gap-3">
              <span className="text-sm">{pkg.status}</span>
              <div>
                <p className="text-tg-blue text-xs font-mono font-semibold">{pkg.name}</p>
                <p className="text-zinc-500 text-[11px]">{pkg.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </UserMsg>

      {/* 6 — CTA */}
      <BotMsg time="12:04">
        <p className="text-zinc-300 text-sm">
          Ready to build? Start with the docs or check out the create coin tutorial →
        </p>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Link to="/create"
             className="bg-tg-input text-tg-blue text-sm rounded-lg px-4 py-2 text-center hover:bg-tg-hover transition">
            Create Coin →
          </Link>
          <Link to="/docs"
             className="bg-tg-input text-tg-blue text-sm rounded-lg px-4 py-2 text-center hover:bg-tg-hover transition">
            View Docs →
          </Link>
        </div>
      </BotMsg>
    </div>
  )
}
