import type { ReactNode } from 'react'
export default function PageShell({ title, children }: { title: string; children: ReactNode }) {
  return <section className="page-shell"><div className="page-heading"><h1>{title}</h1></div>{children}</section>
}
