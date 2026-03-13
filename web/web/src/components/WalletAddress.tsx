import { useState } from 'react'

interface Props {
  address: string
  /** How many chars to show on each side (default 4) */
  chars?: number
  /** If true, show a copy-to-clipboard button */
  copyable?: boolean
  /** Additional className */
  className?: string
  /** If true, don't truncate — show full address */
  full?: boolean
}

export default function WalletAddress({ address, chars = 4, copyable = false, className = '', full = false }: Props) {
  const [copied, setCopied] = useState(false)

  const display = full
    ? address
    : `${address.slice(0, chars)}…${address.slice(-chars)}`

  function copy() {
    void navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <span className={`font-mono inline-flex items-center gap-1 ${className}`}>
      <span className="break-all">{display}</span>
      {copyable && (
        <button
          onClick={copy}
          className="text-zinc-600 hover:text-tg-blue transition text-[10px] shrink-0"
          title="Copy address"
        >
          {copied ? '✓' : '⎘'}
        </button>
      )}
    </span>
  )
}
