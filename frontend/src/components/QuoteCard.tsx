import { Bookmark, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Quote } from '../types'
import { useApp } from '../context/AppContext'

export default function QuoteCard({ quote }: { quote: Quote }) {
  const { isFavorite, toggleFavorite } = useApp()
  const saved = isFavorite(quote.id)
  return <article className="quote-card"><div className="card-topline"><span>Season {quote.season} · Episode {quote.chapter}</span><button className={`icon-button ${saved ? 'saved' : ''}`} aria-label={saved ? 'Remove quote from favorites' : 'Save quote to favorites'} aria-pressed={saved} onClick={() => toggleFavorite(quote)}><Bookmark size={17} fill={saved ? 'currentColor' : 'none'}/></button></div><p className="card-quote">“{quote.quote}”</p><div className="card-bottom"><span>Quote {quote.id}</span><Link to={`/quote/${quote.id}`}>View details <ArrowUpRight size={14}/></Link></div></article>
}
