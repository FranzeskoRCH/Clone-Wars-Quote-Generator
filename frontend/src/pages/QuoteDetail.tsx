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
  if (loading) return <div className="detail-page"><LoadingState label="Opening transmission"/></div>
  if (error || !quote) return <div className="detail-page"><StatePanel title="Transmission unavailable" detail={error || 'This quote could not be found.'} action="Return to archive" to="/explore"/></div>
  const saved = isFavorite(quote.id)
  return <section className="detail-page"><Link className="back-link" to="/explore"><ArrowLeft size={15}/> Back to quotes</Link><article className="detail-card"><blockquote>{quote.quote}</blockquote><div className="detail-meta"><span>Season {quote.season} · Episode {quote.chapter}</span><div className="detail-actions"><button className={`button ${saved ? 'button-saved' : 'button-outline'}`} onClick={() => toggleFavorite(quote)}><Bookmark size={15} fill={saved ? 'currentColor' : 'none'}/>{saved ? 'Saved' : 'Save quote'}</button><ShareQuote quote={quote}/></div></div></article></section>
}
