import { useMemo, useRef, useState, type FormEvent } from 'react'
import PageShell from '../components/PageShell'
import { useApp } from '../context/AppContext'

interface FormValues { name: string; email: string; message: string; updates: boolean }

export default function Contact() {
  const [values, setValues] = useState<FormValues>({ name: '', email: '', message: '', updates: true })
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { toast } = useApp()
  const errors = useMemo(() => ({
    name: values.name.trim().length < 2 ? 'Enter at least 2 characters.' : '',
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ? 'Enter a valid email address.' : '',
    message: values.message.trim().length < 10 ? 'Message must be at least 10 characters.' : '',
  }), [values])
  const valid = !errors.name && !errors.email && !errors.message
  const change = (field: keyof FormValues, value: string | boolean) => setValues((previous) => ({ ...previous, [field]: value }))
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (valid) dialogRef.current?.showModal() }
  const confirm = () => {
    dialogRef.current?.close()
    toast('success', 'Contact form placeholder confirmed.')
    setValues({ name: '', email: '', message: '', updates: false })
  }

  return <PageShell title="Contact"><div className="mx-auto w-full max-w-xl rounded-md border border-zinc-800 p-5 sm:p-7">
    <form className="flex flex-col gap-4" onSubmit={submit} noValidate>
      <div className="flex flex-col gap-2"><label className="text-sm text-zinc-300" htmlFor="name">Name</label><input className="rounded border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-cyan" id="name" value={values.name} onChange={(event) => change('name', event.target.value)} aria-invalid={!!(values.name && errors.name)} aria-describedby="name-error"/><span className="min-h-3 text-xs text-red-400" id="name-error">{values.name && errors.name}</span></div>
      <div className="flex flex-col gap-2"><label className="text-sm text-zinc-300" htmlFor="email">Email</label><input className="rounded border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-cyan aria-[invalid=true]:border-red-500" id="email" type="email" value={values.email} onChange={(event) => change('email', event.target.value)} aria-invalid={!!(values.email && errors.email)} aria-describedby="email-error"/><span className="min-h-3 text-xs text-red-400" id="email-error">{values.email && errors.email}</span></div>
      <div className="flex flex-col gap-2"><label className="text-sm text-zinc-300" htmlFor="message">Message</label><textarea className="resize-y rounded border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-cyan" id="message" rows={4} value={values.message} onChange={(event) => change('message', event.target.value)} aria-invalid={!!(values.message && errors.message)} aria-describedby="message-error"/><span className="min-h-3 text-xs text-red-400" id="message-error">{values.message && errors.message}</span></div>
      <button className="mt-1 self-start rounded bg-cyan px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-cyan/80 disabled:cursor-not-allowed disabled:opacity-40" disabled={!valid}>Review message</button>
    </form>
  </div>

  <dialog ref={dialogRef} className="w-[min(440px,calc(100%-2rem))] rounded-lg border border-zinc-700 bg-zinc-950 p-6 text-zinc-100 shadow-2xl" aria-labelledby="contact-dialog-title">
    <h2 id="contact-dialog-title" className="text-lg font-semibold">Submit message?</h2>
    <p className="mt-2 text-sm leading-relaxed text-zinc-400">This contact form is a UI placeholder.</p>
    {/* Dark pattern for the assignment: this low-contrast marketing opt-in is preselected, nudging consent inside the confirmation dialog. */}
    <label className="mt-5 flex items-center gap-2 text-xs text-zinc-600 opacity-60"><input className="accent-cyan" type="checkbox" checked={values.updates} onChange={(event) => change('updates', event.target.checked)}/><span>Send me occasional updates</span></label>
    <div className="mt-6 flex justify-end gap-2"><button type="button" className="rounded border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-zinc-500" onClick={() => dialogRef.current?.close()}>Cancel</button><button type="button" className="rounded bg-cyan px-4 py-2 text-sm font-semibold text-black hover:bg-cyan/80" onClick={confirm}>Confirm</button></div>
  </dialog>
  </PageShell>
}
