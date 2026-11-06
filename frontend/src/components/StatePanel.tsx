import { Link } from 'react-router-dom'

export default function StatePanel({ title, detail, action, to }: { title: string; detail: string; action?: string; to?: string }) {
  return <div className="flex min-h-48 flex-col items-center justify-center rounded-md border border-zinc-800 px-6 py-8 text-center" role="status">
    <h2 className="text-base font-medium text-zinc-100">{title}</h2>
    <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">{detail}</p>
    {action && to && <Link className="mt-4 rounded border border-zinc-700 px-4 py-2 text-sm text-cyan transition hover:border-cyan" to={to}>{action}</Link>}
  </div>
}
