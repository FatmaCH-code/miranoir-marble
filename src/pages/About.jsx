import { Link } from 'react-router-dom'
import { useT } from '../i18n'
import PageHeader from '../components/PageHeader'
import Process from '../components/Process'
import { Sparkle } from '../components/Icons'

export default function About() {
  const t = useT()
  return (
    <>
      <PageHeader title={t('about.title')} />
      <section className="page grid gap-12 py-20 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <p className="font-display text-3xl leading-snug">{t('about.lead')}</p>
          <div className="measure mt-8 space-y-5 text-[17px] text-noir/80">
            <p>{t('about.p1')}</p><p>{t('about.p2')}</p><p>{t('about.p3')}</p>
          </div>
          <Link to="/iletisim" className="btn mt-10">{t('nav.quote')}</Link>
        </div>
        <div className="slab aspect-[4/5] rounded-t-full">
          <img src="/projects2/about-bar.jpg" alt="" />
        </div>
      </section>
      <section className="bg-white py-20">
        <ul className="page grid gap-10 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <li key={n}>
              <Sparkle className="h-5 w-5 text-verd" />
              <h2 className="mt-4 font-display text-2xl">{t(`about.v${n}.t`)}</h2>
              <p className="mt-2 text-noir/75">{t(`about.v${n}.b`)}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="page py-20">
        <h2 className="mb-12 text-4xl">{t('home.process.title')}</h2>
        <Process />
      </section>
    </>
  )
}
