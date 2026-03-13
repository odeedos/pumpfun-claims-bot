export default function StatusDot({ connected }: { connected: boolean }) {
  return (
    <span className={`inline-block w-2 h-2 rounded-full ${connected ? 'bg-pump-green' : 'bg-pump-pink'}`} />
  )
}
