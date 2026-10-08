import { Link } from 'react-router-dom'
import { useT } from '../i18n'

export default function NotFound() {
  const t = useT()
  return (
    <section className="page py-28 text-center">
      <p className="font-display text-7xl text-vein">404</p>
      <p className="mt-4">{t.lang === 'en' ? 'This page does not exist.' : 'Bu sayfa bulunamadı.'}</p>
      <Link to="/" className="btn mt-8">{t('nav.home')}</Link>
    </section>
  )
}
