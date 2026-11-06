import { useEffect, useState } from 'react'
import { ArrowLeft, Bookmark } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import LoadingState from '../components/LoadingState'
import StatePanel from '../components/StatePanel'
import ShareQuote from '../components/ShareQuote'
import { getQuote } from '../api/quotes'
import { useApp } from '../context/AppContext'
import type { Quote } from '../types'

export default function QuoteDetail() {
  const { id } = useParams()
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { isFavorite, toggleFavorite, toast } = useApp()
  useEffect(() => { const numericId = Number(id); if (!Number.isInteger(numericId) || numericId < 1) { const message = 'That quote identifier is not valid.'; setError(message); setLoading(false); toast('error', message); return } const controller = new AbortController(); getQuote(numericId, controller.signal).then(setQuote).catch((reason: unknown) => { if (!controller.signal.aborted) { const message = reason instanceof Error ? reason.message : 'Unable to load this quote.'; setError(message); toast('error', message) } }).finally(() => { if (!controller.signal.aborted) setLoading(false) }); return () => controller.abort() }, [id, toast])
  if (loading) return <div className="mx-auto min-h-[calc(100vh-160px)] w-[min(760px,calc(100%-2rem))] py-10"><LoadingState label="Opening quote"/></div>
  if (error || !quote) return <div className="mx-auto min-h-[calc(100vh-160px)] w-[min(760px,calc(100%-2rem))] py-10"><StatePanel title="Quote unavailable" detail={error || 'This quote could not be found.'} action="Return to quotes" to="/explore"/></div>
  const saved = isFavorite(quote.id)
  return <section className="mx-auto min-h-[calc(100vh-160px)] w-[min(760px,calc(100%-2rem))] py-9 sm:py-12"><Link className="mb-5 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-cyan" to="/explore"><ArrowLeft size={15}/> Back to quotes</Link><article className="rounded-md border border-zinc-800 bg-zinc-950 p-5 sm:p-7"><blockquote className="mb-7 text-2xl leading-relaxed tracking-tight text-zinc-100 sm:text-3xl">{quote.quote}</blockquote><div className="flex flex-col gap-4 border-t border-zinc-800 pt-4 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between"><span>Season {quote.season} · Episode {quote.chapter}</span><div className="flex flex-wrap items-center gap-2"><button className={`inline-flex h-10 items-center gap-2 rounded border px-4 text-sm transition ${saved ? 'border-cyan text-cyan' : 'border-zinc-800 text-zinc-200 hover:border-zinc-600'}`} onClick={() => toggleFavorite(quote)}><Bookmark size={15} fill={saved ? 'currentColor' : 'none'}/>{saved ? 'Saved' : 'Save quote'}</button><ShareQuote quote={quote}/></div></div></article></section>
}
