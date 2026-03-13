export default function TokenBadge({
  name,
  symbol,
  size = 'md',
}: {
  name?: string
  symbol?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const nameStr   = name   ? name   : '—'
  const symbolStr = symbol ? `$${symbol}` : ''

  if (size === 'sm') {
    return (
      <span className="text-xs text-white">
        {nameStr}{symbolStr ? <span className="text-pump-green ml-1">({symbolStr})</span> : null}
      </span>
    )
  }
  if (size === 'lg') {
    return (
      <p className="text-lg font-bold text-white leading-tight">
        {nameStr}
        {symbolStr && <span className="text-pump-green ml-1.5">{symbolStr}</span>}
      </p>
    )
  }
  return (
    <p className="text-base font-bold text-white">
      {nameStr}
      {symbolStr && <span className="text-pump-green ml-1.5">{symbolStr}</span>}
    </p>
  )
}
