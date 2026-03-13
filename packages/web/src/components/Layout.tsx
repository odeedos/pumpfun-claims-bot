import { Link, Outlet, useLocation } from 'react-router-dom'

const CHANNELS = [
  { path: '/',          icon: '🏠', name: 'PumpKit',      subtitle: 'Open-source framework' },
  { path: '/dashboard', icon: '🚀', name: 'PumpKit Live', subtitle: 'Real-time event feed', badge: 3 },
  { path: '/create',    icon: '🪙', name: 'Create Coin',  subtitle: 'Launch a token' },
  { path: '/docs',      icon: '📖', name: 'PumpKit Docs', subtitle: 'Getting started' },
  { path: '/packages',  icon: '📦', name: 'Packages',     subtitle: '5 packages available' },
]

export default function Layout() {
  const location = useLocation()
  const activeChannel =
    CHANNELS.slice().reverse().find(c => location.pathname.startsWith(c.path)) ?? CHANNELS[0]

  return (
    <div className="flex h-screen bg-tg-bg overflow-hidden">

      {/* ── Sidebar ── */}
      <div className="w-72 bg-tg-sidebar border-r border-tg-border flex flex-col shrink-0">

        {/* Sidebar header */}
        <div className="h-14 bg-tg-header border-b border-tg-border flex items-center px-4 gap-3 shrink-0">
          <div className="w-8 h-8 rounded-full bg-tg-blue flex items-center justify-center text-sm">🚀</div>
          <span className="text-white font-semibold">PumpKit</span>
          <span className="ml-auto text-zinc-500 text-lg">✏️</span>
        </div>

        {/* Search */}
        <div className="px-3 py-2 shrink-0">
          <div className="bg-tg-input rounded-full px-4 py-2 text-sm text-zinc-500">🔍 Search</div>
        </div>

        {/* Channel list */}
        <div className="flex-1 overflow-y-auto">
          {CHANNELS.map(ch => {
            const isActive = location.pathname === ch.path ||
              (ch.path !== '/' && location.pathname.startsWith(ch.path))
            return (
              <Link
                key={ch.path}
                to={ch.path}
                className={`flex items-center gap-3 px-4 py-3 transition ${isActive ? 'bg-tg-hover' : 'hover:bg-tg-hover/50'}`}
              >
                <div className="w-11 h-11 rounded-full bg-tg-input flex items-center justify-center text-xl shrink-0">
                  {ch.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white text-sm font-medium truncate">{ch.name}</span>
                    {'badge' in ch && ch.badge ? (
                      <span className="bg-tg-blue text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shrink-0">
                        {ch.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-zinc-500 text-xs truncate">{ch.subtitle}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <div className="h-14 bg-tg-header border-b border-tg-border flex items-center px-4 gap-3 shrink-0">
          <div className="w-9 h-9 rounded-full bg-tg-input flex items-center justify-center text-lg shrink-0">
            {activeChannel.icon}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold">{activeChannel.name}</p>
            <p className="text-zinc-500 text-xs">{activeChannel.subtitle}</p>
          </div>
          <div className="ml-auto flex items-center gap-4 text-zinc-500 text-lg shrink-0">
            <span className="hover:text-zinc-300 cursor-pointer">🔍</span>
            <span className="hover:text-zinc-300 cursor-pointer">☰</span>
          </div>
        </div>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto bg-tg-chat">
          <Outlet />
        </main>

        {/* Cosmetic Telegram input bar */}
        <div className="shrink-0 bg-tg-header border-t border-tg-border px-4 py-2 flex items-center gap-3">
          <button className="text-zinc-500 hover:text-zinc-300 transition text-xl">😊</button>
          <div className="flex-1 bg-tg-input rounded-full px-4 py-2 text-sm text-zinc-500">
            Message...
          </div>
          <button className="text-zinc-500 hover:text-tg-blue transition text-xl">📎</button>
          <button className="w-9 h-9 rounded-full bg-tg-blue flex items-center justify-center text-white text-sm hover:bg-tg-blue/80 transition">
            ▶
          </button>
        </div>
      </div>
    </div>
  )
}
