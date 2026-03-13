/** Formats a SOL amount (pass the value already in SOL, not lamports). */
export default function SolAmount({ sol, className = '' }: { sol: number; className?: string }) {
  const fmt = sol >= 1000
    ? `${(sol / 1000).toFixed(2)}k`
    : sol >= 1
    ? sol.toFixed(2)
    : sol.toFixed(4)
  return <span className={className}>{fmt} SOL</span>
}
