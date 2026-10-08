import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAdmin } from '../store/admin'
import { backendMode, DEMO_ADMIN } from '../services/api'
import { useT } from '../i18n'

export default function AdminLogin() {
  const t = useT()
  const nav = useNavigate()
  const { admin, ready, init, login } = useAdmin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  useEffect(() => { if (!ready) init() }, [ready, init])
  useEffect(() => { if (admin) nav('/admin', { replace: true }) }, [admin, nav])

  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setError('')
    try { await login(email, password) } catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slab px-5">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-stone p-8">
        <img src="/brand/logo-dark.png" alt="Miranoir Marble" className="mx-auto h-24 w-auto" />
        <h1 className="mt-6 text-center text-2xl">{t('admin.title')}</h1>
        {backendMode === 'local' && (
          <p className="mt-4 rounded-lg bg-mist p-3 text-sm">{t('admin.demo', DEMO_ADMIN)}</p>
        )}
        <label className="field-label mt-6" htmlFor="a-email">{t('admin.email')}</label>
        <input id="a-email" className="field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
        <label className="field-label mt-4" htmlFor="a-pass">{t('admin.password')}</label>
        <input id="a-pass" className="field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
        {error && <p className="mt-3 text-sm text-[#A1362B]" role="alert">{error}</p>}
        <button className="btn mt-6 w-full" disabled={busy}>{t('admin.login')}</button>
        <Link to="/" className="mt-4 block text-center text-sm text-vein hover:text-noir">{t('admin.viewSite')}</Link>
      </form>
    </div>
  )
}
