import { useEffect, useMemo, useState } from 'react'
import { X } from 'lucide-react'
import PageShell from '../components/PageShell'
import QuoteCard from '../components/QuoteCard'
import LoadingState from '../components/LoadingState'
import StatePanel from '../components/StatePanel'
import { getQuotes } from '../api/quotes'
import { useApp } from '../context/AppContext'
import type { Quote } from '../types'

export default function Explore() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [season, setSeason] = useState('all')
  const { toast } = useApp()
  useEffect(() => { const controller = new AbortController(); getQuotes(controller.signal).then(setQuotes).catch((reason: unknown) => { if (!controller.signal.aborted) { const message = reason instanceof Error ? reason.message : 'Unable to load quotes.'; setError(message); toast('error', message) } }).finally(() => { if (!controller.signal.aborted) setLoading(false) }); return () => controller.abort() }, [toast])
  const seasons = useMemo(() => [...new Set(quotes.map((quote) => quote.season))].sort((a,b) => a-b), [quotes])
  const filtered = useMemo(() => quotes.filter((quote) => (season === 'all' || quote.season === Number(season)) && quote.quote.toLowerCase().includes(search.trim().toLowerCase())), [quotes, season, search])
  return <PageShell title="Explore quotes"><div className="mb-5 flex flex-wrap items-center gap-3 border-b border-zinc-800 pb-4">
    <label className="flex h-10 min-w-0 flex-1 items-center rounded border border-zinc-800 px-3 focus-within:border-cyan"><span className="sr-only">Search quotes</span><input className="h-full w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search quotes"/>{search && <button className="text-zinc-400 hover:text-white" aria-label="Clear search" onClick={() => setSearch('')}><X size={15}/></button>}</label>
    <label><span className="sr-only">Filter by season</span><select className="h-10 min-w-36 rounded border border-zinc-800 bg-black px-3 text-sm text-zinc-200" value={season} onChange={(event) => setSeason(event.target.value)}><option value="all">All seasons</option>{seasons.map((item) => <option value={item} key={item}>Season {item}</option>)}</select></label>
    <span className="ml-auto text-xs text-zinc-500" aria-live="polite">{loading ? '' : `${filtered.length} quotes`}</span>
  </div>
    {loading ? <LoadingState label="Loading quotes"/> : error ? <StatePanel title="Quotes unavailable" detail={error}/> : filtered.length ? <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((quote) => <QuoteCard key={quote.id} quote={quote}/>)}</div> : <StatePanel title="No quotes match" detail="Try changing your search or season filter."/>}</PageShell>
}
