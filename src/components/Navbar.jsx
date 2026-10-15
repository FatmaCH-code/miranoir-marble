import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import Brand from './Brand'
import { useT, useLang } from '../i18n'
import { COLLECTIONS, APPLICATIONS } from '../config'

function Dropdown({ label, to, items }) {
  return (
    <div className="group relative">
      <NavLink to={to} className={({ isActive }) => `flex items-center gap-1 py-7 hover:text-verd ${isActive ? 'text-verd' : ''}`}>
        {label}<ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
      </NavLink>
      <div className="invisible absolute left-1/2 top-full z-30 w-60 -translate-x-1/2 rounded-xl border border-mist bg-white p-2 opacity-0 shadow-[0_18px_40px_-20px_rgba(30,36,36,0.45)] transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        {items.map((it) => (
          <Link key={it.to} to={it.to} className="block rounded-lg px-4 py-2.5 text-[15px] hover:bg-stone">{it.label}</Link>
        ))}
      </div>
    </div>
  )
}

export default function Navbar() {
  const t = useT()
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])

  const productItems = [{ to: '/urunler', label: t('nav.allProducts') }, ...COLLECTIONS.map(({ key }) => ({ to: `/urunler/${key}`, label: t(`col.${key}`) }))]
  const appItems = [{ to: '/uygulamalar', label: t('nav.allApps') }, ...APPLICATIONS.map((a) => ({ to: `/uygulamalar/${a}`, label: t(`app.${a}`) }))]
  const simple = [['/hakkimizda', 'nav.about'], ['/blog', 'nav.blog'], ['/iletisim', 'nav.contact']]
  const langBtn = (
    <button onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')} className="rounded-full px-3 py-1.5 text-sm text-vein hover:text-noir" aria-label={t('lang.switch')}>
      {lang === 'tr' ? 'EN' : 'TR'}
    </button>
  )

  return (
    <header className="sticky top-0 z-40 border-b border-mist bg-stone/95 backdrop-blur">
      <div className="page flex h-20 items-center justify-between">
        <Brand />
        <nav className="hidden items-center gap-8 text-[15px] lg:flex" aria-label="Main">
          <NavLink to="/" end className={({ isActive }) => `py-7 hover:text-verd ${isActive ? 'text-verd' : ''}`}>{t('nav.home')}</NavLink>
          <Dropdown label={t('nav.products')} to="/urunler" items={productItems} />
          <Dropdown label={t('nav.applications')} to="/uygulamalar" items={appItems} />
          {simple.map(([to, k]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `py-7 hover:text-verd ${isActive ? 'text-verd' : ''}`}>{t(k)}</NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          {langBtn}
          <Link to="/iletisim" className="btn !py-2.5">{t('nav.quote')}</Link>
        </div>
        <div className="flex items-center gap-1 lg:hidden">
          {langBtn}
          <button onClick={() => setOpen(!open)} className="p-2" aria-expanded={open} aria-label={t('nav.menu')}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="max-h-[calc(100vh-8rem)] overflow-y-auto border-t border-mist bg-stone lg:hidden" aria-label="Mobile">
          <div className="page space-y-6 py-6">
            <Link to="/" className="block font-display text-2xl">{t('nav.home')}</Link>
            <div>
              <Link to="/urunler" className="block font-display text-2xl">{t('nav.products')}</Link>
              <div className="mt-2 flex flex-wrap gap-2">
                {COLLECTIONS.map(({ key }) => <Link key={key} to={`/urunler/${key}`} className="chip">{t(`col.${key}`)}</Link>)}
              </div>
            </div>
            <div>
              <Link to="/uygulamalar" className="block font-display text-2xl">{t('nav.applications')}</Link>
              <div className="mt-2 flex flex-wrap gap-2">
                {APPLICATIONS.map((a) => <Link key={a} to={`/uygulamalar/${a}`} className="chip">{t(`app.${a}`)}</Link>)}
              </div>
            </div>
            {simple.map(([to, k]) => <Link key={to} to={to} className="block font-display text-2xl">{t(k)}</Link>)}
            <Link to="/iletisim" className="btn w-full">{t('nav.quote')}</Link>
          </div>
        </nav>
      )}
    </header>
  )
}
