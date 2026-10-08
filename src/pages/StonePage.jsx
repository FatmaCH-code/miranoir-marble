import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useT } from '../i18n'
import { whatsappHref } from '../config'
import { usePublicStones } from '../store/stones'
import StoneCard from '../components/StoneCard'
import QuoteForm from '../components/QuoteForm'
import { WhatsAppIcon } from '../components/Icons'

export default function StonePage() {
  const t = useT()
  const { slug } = useParams()
  const { stones, ready } = usePublicStones()
  const [active, setActive] = useState(0)
  const stone = stones.find((s) => s.slug === slug)

  if (!ready) return <div className="page py-24 text-vein">{t('products.loading')}</div>
  if (!stone) return (
    <div className="page py-24">
      <p>{t('stone.notFound')}</p>
      <Link to="/urunler" className="link mt-4 inline-block">{t('stone.back')}</Link>
    </div>
  )

  const related = stones.filter((s) => s.id !== stone.id && (s.material === stone.material || s.tone === stone.tone))
    .sort((a, b) => (b.material === stone.material) - (a.material === stone.material)).slice(0, 4)
  const specs = [
    ['stone.material', t(`mat.${stone.material}`)], ['stone.brand', stone.brand],
    ['stone.finish', stone.finish], ['stone.thickness', stone.thickness], ['stone.tone', t(`tone.${stone.tone}`)],
  ].filter(([, v]) => v)

  return (
    <>
      <section className="page py-10">
        <Link to={`/urunler/${stone.material}`} className="inline-flex items-center gap-2 text-sm text-vein hover:text-noir">
          <ArrowLeft className="h-4 w-4" />{t('stone.back')}
        </Link>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <div className="slab aspect-square rounded-sm">
              <img src={stone.images[active] || stone.images[0]} alt={stone.name} />
            </div>
            {stone.images.length > 1 && (
              <div className="mt-3 flex gap-3">
                {stone.images.map((src, i) => (
                  <button key={src + i} onClick={() => setActive(i)} aria-label={`${stone.name} ${i + 1}`}
                    className={`h-20 w-20 overflow-hidden rounded-sm border-2 ${i === active ? 'border-noir' : 'border-transparent'}`}>
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="lg:pt-6">
            <p className="text-vein">{t(`mat.${stone.material}`)}</p>
            <h1 className="mt-1 text-5xl">{stone.name}</h1>
            <p className="measure mt-6 text-[17px] text-noir/80">{t.pick(stone.description)}</p>
            <dl className="mt-8 divide-y divide-mist border-y border-mist">
              {specs.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 py-3 text-[15px]">
                  <dt className="text-vein">{t(k)}</dt><dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#teklif" className="btn">{t('stone.quote')}</a>
              <a href={whatsappHref(t('stone.waText', { name: stone.name }))} target="_blank" rel="noreferrer" className="btn-line">
                <WhatsAppIcon className="h-4 w-4" />{t('stone.whatsapp')}
              </a>
            </div>
            <p className="mt-6 text-sm text-vein">{t('stone.note')}</p>
          </div>
        </div>
      </section>

      <section id="teklif" className="scroll-mt-28 bg-white py-16">
        <div className="page max-w-3xl"><QuoteForm key={stone.slug} defaultStone={stone.slug} /></div>
      </section>

      {related.length > 0 && (
        <section className="page py-16">
          <h2 className="mb-8 text-3xl">{t('stone.related')}</h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {related.map((s) => <StoneCard key={s.id} stone={s} />)}
          </div>
        </section>
      )}
    </>
  )
}
