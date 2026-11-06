import { useState } from 'react'
import { Copy, Share2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import type { Quote } from '../types'

export default function ShareQuote({ quote }: { quote: Quote }) {
  const [open, setOpen] = useState(false)
  const { toast } = useApp()
  const url = new URL(`/quote/${quote.id}`, window.location.origin).toString()
  const text = `“${quote.quote}”`
  const xUrl = `https://twitter.com/intent/tweet?${new URLSearchParams({ text, url })}`
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?${new URLSearchParams({ u: url, quote: text })}`
  const redditUrl = `https://www.reddit.com/submit?${new URLSearchParams({ url, title: text })}`
  const copyQuote = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        const copied = document.execCommand('copy')
        textarea.remove()
        if (!copied) throw new Error('Clipboard unavailable')
      }
      toast('success', 'Quote copied to clipboard.')
      setOpen(false)
    } catch {
      toast('error', 'Could not copy the quote. Check clipboard permissions.')
    }
  }

  return <div className="relative">
    <button className="inline-flex h-10 items-center gap-2 rounded border border-zinc-800 px-4 text-sm text-zinc-200 transition hover:border-zinc-600" type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)}><Share2 size={15}/> Share</button>
    {open && <div className="absolute right-0 top-[calc(100%+0.5rem)] z-20 flex gap-1 rounded-md border border-zinc-800 bg-zinc-950 p-1.5 shadow-xl max-sm:right-1/2 max-sm:translate-x-1/2" role="group" aria-label="Share this quote">
      <a className="whitespace-nowrap rounded px-2.5 py-2 text-xs text-zinc-300 hover:bg-zinc-900 hover:text-cyan" href={xUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on X">X</a>
      <a className="whitespace-nowrap rounded px-2.5 py-2 text-xs text-zinc-300 hover:bg-zinc-900 hover:text-cyan" href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">Facebook</a>
      <a className="whitespace-nowrap rounded px-2.5 py-2 text-xs text-zinc-300 hover:bg-zinc-900 hover:text-cyan" href={redditUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Reddit">Reddit</a>
      <button className="inline-flex items-center gap-1 whitespace-nowrap rounded px-2.5 py-2 text-xs text-zinc-300 hover:bg-zinc-900 hover:text-cyan" type="button" onClick={copyQuote}><Copy size={13}/> Copy quote</button>
    </div>}
  </div>
}
