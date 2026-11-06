import type { ReactNode } from 'react'

export default function PageShell({ title, children }: { title: string; children: ReactNode }) {
  return <section className="mx-auto min-h-[calc(100vh-150px)] w-[min(1100px,calc(100%-2rem))] py-9 sm:w-[min(1100px,calc(100%-3rem))] sm:py-14">
    <div className="mb-7"><h1 className="text-2xl font-semibold tracking-tight text-zinc-100 sm:text-[28px]">{title}</h1></div>
    {children}
  </section>
}
