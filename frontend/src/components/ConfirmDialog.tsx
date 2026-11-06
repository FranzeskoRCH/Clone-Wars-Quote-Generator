import { useRef, type ReactNode } from 'react'
export default function ConfirmDialog({ trigger, title, description, confirmLabel = 'Confirm', onConfirm }: { trigger: ReactNode; title: string; description: string; confirmLabel?: string; onConfirm: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const close = () => dialogRef.current?.close()
  return <><span onClick={() => dialogRef.current?.showModal()}>{trigger}</span><dialog className="confirm-dialog" ref={dialogRef} aria-labelledby="dialog-title"><div className="dialog-orbit">✦</div><h2 id="dialog-title">{title}</h2><p>{description}</p><div className="dialog-actions"><button className="button button-quiet" onClick={close}>Cancel</button><button className="button button-danger" onClick={() => { onConfirm(); close() }}>{confirmLabel}</button></div></dialog></>
}
