export default function LoadingState({ label = 'Loading' }: { label?: string }) {
  return <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-sm text-zinc-400" role="status">
    <span className="size-6 animate-spin rounded-full border-2 border-zinc-700 border-t-cyan" aria-hidden="true"/>
    <p>{label}</p>
  </div>
}
