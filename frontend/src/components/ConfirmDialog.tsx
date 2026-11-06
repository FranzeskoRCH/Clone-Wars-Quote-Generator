import { useRef, type ReactNode } from 'react'

export default function ConfirmDialog({ trigger, title, description, confirmLabel = 'Confirm', onConfirm }: { trigger: ReactNode; title: string; description: string; confirmLabel?: string; onConfirm: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const close = () => dialogRef.current?.close()
  return <>
    <span className="inline-flex" onClick={() => dialogRef.current?.showModal()}>{trigger}</span>
    <dialog className="w-[min(420px,calc(100%-2rem))] rounded-lg border border-zinc-700 bg-zinc-950 p-6 text-zinc-100 shadow-2xl" ref={dialogRef} aria-labelledby="dialog-title">
      <h2 id="dialog-title" className="text-lg font-semibold">{title}</h2><p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
      <div className="mt-6 flex justify-end gap-2"><button className="rounded border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-zinc-500" onClick={close}>Cancel</button><button className="rounded bg-red-900 px-4 py-2 text-sm text-red-100 hover:bg-red-800" onClick={() => { onConfirm(); close() }}>{confirmLabel}</button></div>
    </dialog>
  </>
}
