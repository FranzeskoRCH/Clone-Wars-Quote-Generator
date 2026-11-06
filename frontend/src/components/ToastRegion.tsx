import { Check, Info, TriangleAlert } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function ToastRegion() {
  const { toasts } = useApp()
  return <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2" aria-live="polite" aria-atomic="false">{toasts.map((toast) => <div className="flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 shadow-xl sm:max-w-sm" role="status" key={toast.id}>
    {toast.kind === 'success' ? <Check size={16} className="text-green-400"/> : toast.kind === 'error' ? <TriangleAlert size={16} className="text-red-400"/> : <Info size={16} className="text-cyan"/>}<span>{toast.message}</span>
  </div>)}</div>
}
