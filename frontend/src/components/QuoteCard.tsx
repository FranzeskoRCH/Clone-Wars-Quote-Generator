import { Bookmark, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Quote } from '../types'
import { useApp } from '../context/AppContext'

export default function QuoteCard({ quote }: { quote: Quote }) {
  const { isFavorite, toggleFavorite } = useApp()
  const saved = isFavorite(quote.id)
  return <article className="flex min-h-48 flex-col rounded-md border border-zinc-800 bg-zinc-950 p-4 transition-colors hover:border-zinc-700 sm:p-5">
    <div className="flex items-center justify-between gap-3 text-xs text-zinc-400"><span>Season {quote.season} · Episode {quote.chapter}</span>
      <button className={`grid size-8 shrink-0 place-items-center rounded border transition-colors ${saved ? 'border-cyan text-cyan' : 'border-zinc-800 text-zinc-400 hover:border-cyan hover:text-cyan'}`} aria-label={saved ? 'Remove quote from favorites' : 'Save quote to favorites'} aria-pressed={saved} onClick={() => toggleFavorite(quote)}><Bookmark size={16} fill={saved ? 'currentColor' : 'none'}/></button>
    </div>
    <p className="my-5 text-base font-medium leading-relaxed text-zinc-100">“{quote.quote}”</p>
    <div className="mt-auto flex items-center justify-between border-t border-zinc-800 pt-3 text-xs text-zinc-500"><span>Quote {quote.id}</span><Link className="inline-flex items-center gap-1 text-cyan hover:text-cyan/80" to={`/quote/${quote.id}`}>View details <ArrowUpRight size={13}/></Link></div>
  </article>
}
