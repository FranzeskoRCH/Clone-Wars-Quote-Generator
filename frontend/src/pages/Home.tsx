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

  return <section className="generator-page" aria-label="Quote generator">
    {jumping && <HyperspaceTransition/>}
    <h1 className="generator-title">STAR WARS: THE CLONE WARS</h1>
    <div className="generator-quote" aria-live="polite">
      {loading ? <LoadingState label="Loading quote"/> : error ? <StatePanel title="Quotes unavailable" detail={error}/> : current ? <>
        <blockquote>“{current.quote}”</blockquote>
        <p className="generator-meta">Season {current.season} <span aria-hidden="true">·</span> Episode {current.chapter}</p>
      </> : <StatePanel title="No quotes found" detail="The quote archive is empty."/>}
    </div>
    <div className="generator-actions">
      <button className="button button-primary" onClick={nextQuote} disabled={loading || !!error || quotes.length === 0}><Dices size={16}/> Generate quote</button>
      {current && <button className="button button-outline" onClick={() => toggleFavorite(current)} aria-pressed={isFavorite(current.id)}><Bookmark size={16} fill={isFavorite(current.id) ? 'currentColor' : 'none'}/>{isFavorite(current.id) ? 'Saved' : 'Save'}</button>}
      {current && <ShareQuote quote={current}/>}
    </div>
  </section>
}
