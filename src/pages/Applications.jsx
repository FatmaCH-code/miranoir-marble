import { useNavigate, useParams } from 'react-router-dom'
import { useT } from '../i18n'
import { APPLICATIONS } from '../config'
import { projects } from '../data/projects'
import PageHeader from '../components/PageHeader'

export default function Applications() {
  const t = useT()
  const nav = useNavigate()
  const { app } = useParams()
  const current = APPLICATIONS.includes(app) ? app : ''
  const list = projects.filter((p) => !current || p.app === current)

  return (
    <>
      <PageHeader title={current ? t(`app.${current}`) : t('apps.title')} body={t('apps.body')} />
      <section className="page py-12">
        <div className="flex flex-wrap gap-2">
          <button className="chip" aria-pressed={!current} onClick={() => nav('/uygulamalar')}>{t('apps.all')}</button>
          {APPLICATIONS.map((a) => <button key={a} className="chip" aria-pressed={current === a} onClick={() => nav(`/uygulamalar/${a}`)}>{t(`app.${a}`)}</button>)}
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <figure key={p.id}>
              <div className="slab aspect-[3/2] rounded-sm"><img src={p.image} alt={t.pick(p.title)} loading="lazy" /></div>
              <figcaption className="mt-4">
                <h2 className="font-display text-xl">{t.pick(p.title)}</h2>
                <p className="text-sm text-vein">{p.stone}, {t(`mat.${p.material}`)} — {p.place}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  )
}
