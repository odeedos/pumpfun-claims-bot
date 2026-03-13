import { useState, useEffect } from 'react'

function formatAgo(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000)
  if (diff < 5)  return 'just now'
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function TimeAgo({ timestamp, className = '' }: { timestamp: number; className?: string }) {
  const [label, setLabel] = useState(() => formatAgo(timestamp))

  useEffect(() => {
    const timer = setInterval(() => setLabel(formatAgo(timestamp)), 10_000)
    return () => clearInterval(timer)
  }, [timestamp])

  return <span className={className}>{label}</span>
}
