import { useMemo, useRef, useState, type FormEvent } from 'react'
import PageShell from '../components/PageShell'
import { useApp } from '../context/AppContext'

interface FormValues { name: string; email: string; message: string; updates: boolean }
export default function Contact() {
  const [values, setValues] = useState<FormValues>({ name: '', email: '', message: '', updates: true })
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { toast } = useApp()
  const errors = useMemo(() => ({ name: values.name.trim().length < 2 ? 'Enter at least 2 characters.' : '', email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ? 'Enter a valid email address.' : '', message: values.message.trim().length < 10 ? 'Message must be at least 10 characters.' : '' }), [values])
  const valid = !errors.name && !errors.email && !errors.message
  const change = (field: keyof FormValues, value: string | boolean) => setValues((previous) => ({ ...previous, [field]: value }))
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (valid) dialogRef.current?.showModal() }
  const confirm = () => { dialogRef.current?.close(); toast('success', 'Message submitted.'); setValues({ name: '', email: '', message: '', updates: false }) }
  return <PageShell title="Contact"><div className="contact-layout"><form className="contact-form" onSubmit={submit} noValidate><div className="form-row"><label htmlFor="name">Name</label><input id="name" value={values.name} onChange={(event) => change('name', event.target.value)} aria-invalid={!!errors.name} aria-describedby="name-error"/><span className="field-error" id="name-error">{values.name && errors.name}</span></div><div className="form-row"><label htmlFor="email">Email</label><input id="email" type="email" value={values.email} onChange={(event) => change('email', event.target.value)} aria-invalid={!!errors.email} aria-describedby="email-error"/><span className="field-error" id="email-error">{values.email && errors.email}</span></div><div className="form-row"><label htmlFor="message">Message</label><textarea id="message" rows={4} value={values.message} onChange={(event) => change('message', event.target.value)} aria-invalid={!!errors.message} aria-describedby="message-error"/><span className="field-error" id="message-error">{values.message && errors.message}</span></div>
      {/* Dark-pattern demonstration: this marketing opt-in starts checked and is visually deemphasized, nudging consent before a deliberate choice. It is included to satisfy the requested UI exercise; a real product should default it to unchecked and present it at full contrast. */}<label className="dark-pattern-optin"><input type="checkbox" checked={values.updates} onChange={(event) => change('updates', event.target.checked)}/><span>Send me occasional archive updates</span></label>
      <button className="button button-primary submit-button" disabled={!valid}>Review message</button></form></div><dialog ref={dialogRef} className="confirm-dialog"><h2 id="contact-dialog-title">Submit message?</h2><p>Your message is ready to submit.</p><div className="dialog-actions"><button type="button" className="button" onClick={() => dialogRef.current?.close()}>Cancel</button><button type="button" className="button button-primary" onClick={confirm}>Submit</button></div></dialog></PageShell>
}
