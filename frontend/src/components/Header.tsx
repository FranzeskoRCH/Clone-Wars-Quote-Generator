import { NavLink } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const links = [{ to: '/', label: 'Generator' }, { to: '/explore', label: 'Explore' }, { to: '/favorites', label: 'Favorites' }, { to: '/contact', label: 'Contact' }]

export default function Header() {
  const { favorites } = useApp()
  return <header className="mx-auto flex w-[min(1100px,calc(100%-2rem))] flex-col justify-center gap-3 border-b border-zinc-800 py-3 sm:h-[68px] sm:w-[min(1100px,calc(100%-3rem))] sm:flex-row sm:items-center sm:justify-between sm:py-0">
    <NavLink to="/" className="flex flex-col items-start gap-0.5" aria-label="Clone Wars Quotes home">
      <span className="font-display text-xs font-semibold tracking-[.12em] text-[#c9b46c]">CLONE WARS</span>
      <span className="text-[8px] tracking-[.2em] text-zinc-400">QUOTES</span>
    </NavLink>
    <nav className="flex gap-5 overflow-x-auto sm:gap-7" aria-label="Main navigation">
      {links.map(({ to, label }) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `whitespace-nowrap text-xs transition-colors sm:text-sm ${isActive ? 'text-cyan' : 'text-zinc-400 hover:text-zinc-100'}`}>
        {label}{label === 'Favorites' && favorites.length > 0 ? ` (${favorites.length})` : ''}
      </NavLink>)}
    </nav>
  </header>
}
