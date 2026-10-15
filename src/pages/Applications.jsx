import { Link, useNavigate, useParams } from 'react-router-dom'
import { useT } from '../i18n'
import { APPLICATIONS, AREA_IMAGES } from '../config'
import { projects } from '../data/projects'
import PageHeader from '../components/PageHeader'

function ProjectGrid({ list }) {
  const t = useT()
  return (
    <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
      {list.map((p) => (
        <figure key={p.id}>
          <div className="slab aspect-[3/2] rounded-sm"><img src={p.image} alt={t.pick(p.title)} loading="lazy" /></div>
          <figcaption className="mt-4">
            <h3 className="font-display text-xl">{t.pick(p.title)}</h3>
            <p className="text-sm text-vein">{t(`app.${p.app}`)}{p.stone ? `, ${p.stone}` : ''}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export default function Applications() {
  const t = useT()
  const nav = useNavigate()
  const { app } = useParams()
  const current = APPLICATIONS.includes(app) ? app : ''
  const list = projects.filter((p) => !current || p.app === current)

  return (
    <>
      <PageHeader title={current ? t(`app.${current}`) : t('home.areas.title')} body={current ? t(`appd.${current}`) : t('apps.body')} />
      <section className="page py-12">
        <div className="flex flex-wrap gap-2">
          <button className="chip" aria-pressed={!current} onClick={() => nav('/uygulamalar')}>{t('apps.all')}</button>
          {APPLICATIONS.map((a) => <button key={a} className="chip" aria-pressed={current === a} onClick={() => nav(`/uygulamalar/${a}`)}>{t(`app.${a}`)}</button>)}
        </div>

        {!current && (
          <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {APPLICATIONS.map((a) => (
              <li key={a}>
                <Link to={`/uygulamalar/${a}`} className="group block">
                  <div className="slab aspect-[4/5] rounded-t-full"><img src={AREA_IMAGES[a]} alt="" loading="lazy" /></div>
                  <h2 className="mt-4 font-display text-xl group-hover:text-verd">{t(`app.${a}`)}</h2>
                  <p className="mt-1 text-[15px] text-noir/75">{t(`appd.${a}`)}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-16">
          {!current && <h2 className="mb-8 text-3xl">{t('apps.projects')}</h2>}
          {list.length ? <ProjectGrid list={list} /> : (
            <div className="rounded-2xl border border-dashed border-vein/40 p-10 text-center">
              <p className="text-noir/75">{t('apps.empty')}</p>
              <Link to="/iletisim" className="btn mt-5">{t('nav.quote')}</Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
