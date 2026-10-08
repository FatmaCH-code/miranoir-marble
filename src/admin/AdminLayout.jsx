import { useEffect } from 'react'
import { Navigate, NavLink, Route, Routes, Link } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAdmin } from '../store/admin'
import { useT, useLang } from '../i18n'
import StonesPanel from './StonesPanel'
import QuotesPanel from './QuotesPanel'

export default function AdminLayout() {
  const t = useT()
  const { lang, setLang } = useLang()
  const { admin, ready, init, logout } = useAdmin()
  useEffect(() => { if (!ready) init() }, [ready, init])

  if (!ready) return <div className="p-10 text-vein">…</div>
  if (!admin) return <Navigate to="/admin/login" replace />

  const tab = ({ isActive }) => `rounded-full px-4 py-2 text-sm ${isActive ? 'bg-noir text-stone' : 'hover:bg-mist'}`
  return (
    <div className="min-h-screen bg-stone">
      <header className="border-b border-mist bg-white">
        <div className="page flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link to="/"><img src="/brand/monogram-dark.png" alt="Miranoir" className="h-8 w-auto" /></Link>
            <nav className="flex gap-1">
              <NavLink to="/admin" end className={tab}>{t('admin.stones')}</NavLink>
              <NavLink to="/admin/teklifler" className={tab}>{t('admin.quotes')}</NavLink>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <button onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')} className="text-vein hover:text-noir">{lang === 'tr' ? 'EN' : 'TR'}</button>
            <span className="hidden text-vein sm:inline">{admin.email}</span>
            <button onClick={logout} className="inline-flex items-center gap-1.5 hover:text-verd"><LogOut className="h-4 w-4" />{t('admin.logout')}</button>
          </div>
        </div>
      </header>
      <main className="page py-10">
        <Routes>
          <Route index element={<StonesPanel />} />
          <Route path="teklifler" element={<QuotesPanel />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
    </div>
  )
}
