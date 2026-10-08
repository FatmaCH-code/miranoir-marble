import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom'
import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import Products from './pages/Products'
import StonePage from './pages/StonePage'
import Applications from './pages/Applications'
import About from './pages/About'
import Blog from './pages/Blog'
import Post from './pages/Post'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import { useStones } from './store/stones'
import { useLang } from './i18n'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function SiteLayout() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <TopBar />
      <Navbar />
      <main id="main"><Outlet /></main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default function App() {
  const load = useStones((s) => s.load)
  const lang = useLang((s) => s.lang)
  useEffect(() => { load() }, [load])
  useEffect(() => { document.documentElement.lang = lang }, [lang])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/urunler" element={<Products />} />
          <Route path="/urunler/:material" element={<Products />} />
          <Route path="/tas/:slug" element={<StonePage />} />
          <Route path="/uygulamalar" element={<Applications />} />
          <Route path="/uygulamalar/:app" element={<Applications />} />
          <Route path="/hakkimizda" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Post />} />
          <Route path="/iletisim" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </BrowserRouter>
  )
}
