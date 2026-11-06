import { useEffect, useState } from 'react'
import { Bookmark, Dices } from 'lucide-react'
import { getQuotes } from '../api/quotes'
import LoadingState from '../components/LoadingState'
import StatePanel from '../components/StatePanel'
import ShareQuote from '../components/ShareQuote'
import HyperspaceTransition from '../components/HyperspaceTransition'
import { useApp } from '../context/AppContext'
import type { Quote } from '../types'

export default function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [current, setCurrent] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [jumping, setJumping] = useState(false)
  const { toggleFavorite, isFavorite, toast } = useApp()

  useEffect(() => {
    const controller = new AbortController()
    getQuotes(controller.signal).then((items) => {
      setQuotes(items)
      setCurrent(items[Math.floor(Math.random() * items.length)] ?? null)
    }).catch((reason: unknown) => {
      if (!controller.signal.aborted) {
        const message = reason instanceof Error ? reason.message : 'Unable to load quotes.'
        setError(message)
        toast('error', message)
      }
    }).finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [toast])

  const nextQuote = () => {
    if (!quotes.length || jumping) return
    setJumping(true)
    window.setTimeout(() => {
      const alternatives = quotes.filter((item) => item.id !== current?.id)
      setCurrent(alternatives[Math.floor(Math.random() * alternatives.length)] ?? quotes[0])
    }, 600)
    window.setTimeout(() => setJumping(false), 1200)
  }

  return <section className="relative flex min-h-[calc(100vh-128px)] flex-col items-center justify-center overflow-hidden bg-black px-5 py-10 text-center text-cyan" aria-label="Quote generator">
    {jumping && <HyperspaceTransition/>}
    <h1 className="mb-8 font-display text-xs font-medium tracking-[.2em] text-[#c9b46c] sm:mb-14">STAR WARS: THE CLONE WARS</h1>
    <div className="flex min-h-[220px] w-full max-w-3xl flex-col items-center justify-center" aria-live="polite">
      {loading ? <LoadingState label="Loading quote"/> : error ? <StatePanel title="Quotes unavailable" detail={error}/> : current ? <>
        <blockquote className="text-2xl font-normal leading-relaxed tracking-tight text-cyan sm:text-3xl lg:text-4xl">“{current.quote}”</blockquote>
        <p className="mt-6 text-sm text-zinc-500">Season {current.season} <span aria-hidden="true">·</span> Episode {current.chapter}</p>
      </> : <StatePanel title="No quotes found" detail="The quote archive is empty."/>}
    </div>
    <div className="mt-8 flex flex-wrap justify-center gap-2 sm:mt-10">
      <button className="inline-flex h-10 items-center gap-2 rounded bg-cyan px-4 text-sm font-semibold text-black transition hover:bg-cyan/80 disabled:cursor-not-allowed disabled:opacity-40" onClick={nextQuote} disabled={loading || !!error || quotes.length === 0}><Dices size={16}/> Generate quote</button>
      {current && <button className="inline-flex h-10 items-center gap-2 rounded border border-zinc-800 px-4 text-sm text-zinc-200 transition hover:border-zinc-600" onClick={() => toggleFavorite(current)} aria-pressed={isFavorite(current.id)}><Bookmark size={16} fill={isFavorite(current.id) ? 'currentColor' : 'none'}/>{isFavorite(current.id) ? 'Saved' : 'Save'}</button>}
      {current && <ShareQuote quote={current}/>}
    </div>
  </section>
}
