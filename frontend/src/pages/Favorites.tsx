import { Trash2 } from 'lucide-react'
import PageShell from '../components/PageShell'
import QuoteCard from '../components/QuoteCard'
import StatePanel from '../components/StatePanel'
import ConfirmDialog from '../components/ConfirmDialog'
import { useApp } from '../context/AppContext'

export default function Favorites() {
  const { favorites, clearFavorites, toast } = useApp()
  const clear = () => { clearFavorites(); toast('info', 'Favorites cleared.') }
  return <PageShell title="Favorites">{favorites.length > 0 && <div className="mb-5 flex items-center justify-between text-xs text-zinc-400"><span>{favorites.length} saved {favorites.length === 1 ? 'quote' : 'quotes'}</span><ConfirmDialog trigger={<button className="inline-flex items-center gap-1.5 rounded border border-zinc-800 px-3 py-2 text-xs text-zinc-400 transition hover:border-zinc-600 hover:text-white"><Trash2 size={14}/> Clear all</button>} title="Clear favorites?" description="This removes all saved quotes from this device." confirmLabel="Clear favorites" onConfirm={clear}/></div>}{favorites.length ? <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">{favorites.map((quote) => <QuoteCard key={quote.id} quote={quote}/>)}</div> : <StatePanel title="No favorites yet" detail="Save quotes to find them here." action="Explore quotes" to="/explore"/>}</PageShell>
}
