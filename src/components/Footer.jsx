import { Link } from 'react-router-dom'
import { COMPANY, telHref } from '../config'
import { useT } from '../i18n'

export default function Footer() {
  const t = useT()
  const links = [['/urunler', 'nav.products'], ['/uygulamalar', 'nav.applications'], ['/hakkimizda', 'nav.about'], ['/blog', 'nav.blog'], ['/iletisim', 'nav.contact']]
  return (
    <footer className="bg-slab text-stone/75">
      <div className="page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src="/brand/logo-light.png" alt="Miranoir Marble" className="h-28 w-auto" />
          <p className="mt-6 max-w-xs text-[15px]">{t('footer.tagline')}</p>
        </div>
        <div>
          <h2 className="mb-4 font-display text-lg text-stone">{t('footer.links')}</h2>
          <ul className="space-y-2 text-[15px]">
            {links.map(([to, k]) => <li key={to}><Link to={to} className="hover:text-white">{t(k)}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-display text-lg text-stone">{t('footer.contact')}</h2>
          <ul className="space-y-2 text-[15px]">
            {COMPANY.phones.map((p) => <li key={p}><a href={telHref(p)} className="hover:text-white">{p}</a></li>)}
            <li><a href={`mailto:${COMPANY.email}`} className="hover:text-white">{COMPANY.email}</a></li>
            <li className="max-w-[16rem]">{COMPANY.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="page flex flex-col gap-2 py-6 text-[13px] sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {COMPANY.legalName}. {t('footer.rights')}</span>
          <Link to="/admin" className="text-stone/40 hover:text-stone/80">{t('admin.title')}</Link>
        </div>
      </div>
    </footer>
  )
}
