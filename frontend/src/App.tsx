import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ToastRegion from './components/ToastRegion'
import Home from './pages/Home'
import Explore from './pages/Explore'
import QuoteDetail from './pages/QuoteDetail'
import Favorites from './pages/Favorites'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return <div className="flex min-h-screen flex-col bg-black"><Header/><main className="w-full flex-1"><Routes><Route path="/" element={<Home/>}/><Route path="/explore" element={<Explore/>}/><Route path="/quote/:id" element={<QuoteDetail/>}/><Route path="/favorites" element={<Favorites/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<NotFound/>}/></Routes></main><Footer/><ToastRegion/></div>
}
