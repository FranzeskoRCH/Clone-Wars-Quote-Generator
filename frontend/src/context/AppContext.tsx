import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Quote, ToastKind, ToastMessage } from '../types'

interface AppContextValue {
  favorites: Quote[]
  toasts: ToastMessage[]
  toggleFavorite: (quote: Quote) => void
  clearFavorites: () => void
  isFavorite: (id: number) => boolean
  toast: (kind: ToastKind, message: string) => void
}
const Context = createContext<AppContextValue | null>(null)
const STORAGE_KEY = 'clone-wars-favorites'

export function AppProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Quote[]>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as Quote[] } catch { return [] }
  })
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)) }, [favorites])
  const toast = useCallback((kind: ToastKind, message: string) => {
    const id = Date.now() + Math.random()
    setToasts((current) => [...current, { id, kind, message }])
    window.setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 3400)
  }, [])
  const toggleFavorite = useCallback((quote: Quote) => {
    const alreadySaved = favorites.some((item) => item.id === quote.id)
    setFavorites((current) => {
      if (current.some((item) => item.id === quote.id)) return current.filter((item) => item.id !== quote.id)
      return [quote, ...current]
    })
    toast(alreadySaved ? 'info' : 'success', alreadySaved ? 'Quote removed from favorites.' : 'Quote saved to favorites.')
  }, [favorites, toast])
  const clearFavorites = useCallback(() => setFavorites([]), [])
  const isFavorite = useCallback((id: number) => favorites.some((quote) => quote.id === id), [favorites])
  const value = useMemo(() => ({ favorites, toasts, toggleFavorite, clearFavorites, isFavorite, toast }), [favorites, toasts, toggleFavorite, clearFavorites, isFavorite, toast])
  return <Context.Provider value={value}>{children}</Context.Provider>
}
export function useApp() { const value = useContext(Context); if (!value) throw new Error('useApp must be used inside AppProvider'); return value }
