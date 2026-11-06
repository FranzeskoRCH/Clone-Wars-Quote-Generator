import { NavLink } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const links = [{ to: '/', label: 'Generator' }, { to: '/explore', label: 'Explore' }, { to: '/favorites', label: 'Favorites' }, { to: '/contact', label: 'Contact' }]
export default function Header() {
  const { favorites } = useApp()
  return <header className="site-header"><NavLink to="/" className="brand" aria-label="Clone Wars Quotes home"><span className="brand-mark-text">CLONE WARS</span><span className="brand-subtitle">QUOTES</span></NavLink><nav className="nav-links" aria-label="Main navigation">{links.map(({ to, label }) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{label}{label === 'Favorites' && favorites.length > 0 ? ` (${favorites.length})` : ''}</NavLink>)}</nav></header>
}
