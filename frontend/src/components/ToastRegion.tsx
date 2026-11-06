import { Check, Info, TriangleAlert } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function ToastRegion() {
  const { toasts } = useApp()
  return <div className="toast-region" aria-live="polite" aria-atomic="false">{toasts.map((toast) => <div className={`toast toast-${toast.kind}`} role="status" key={toast.id}>{toast.kind === 'success' ? <Check size={16}/> : toast.kind === 'error' ? <TriangleAlert size={16}/> : <Info size={16}/>}<span>{toast.message}</span></div>)}</div>
}
