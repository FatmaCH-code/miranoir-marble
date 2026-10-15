import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useT } from '../i18n'
import { COLLECTIONS, BRANDS, APPLICATIONS, AREA_IMAGES } from '../config'
import { usePublicStones } from '../store/stones'
import StoneCard from '../components/StoneCard'
import Process from '../components/Process'
import { ContactDetails, MapEmbed } from '../components/ContactBlock'

function Hero() {
  const t = useT()
  const ref = useRef(null)
  // move the polished sheen with the pointer
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
    ref.current.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
  }
  return (
    <section ref={ref} onPointerMove={onMove} className="relative overflow-hidden bg-slab text-stone">
      <img src="/projects2/kitchen-belvedere.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-slab/90 via-slab/60 to-slab/20" />
      <div className="hero-sheen absolute inset-0" />
      <div className="page relative grid min-h-[min(86vh,780px)] items-center gap-10 py-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="hero-in max-w-xl">
          <img src="/brand/monogram-light.png" alt="" className="mb-8 h-16 w-auto lg:hidden" />
          <h1 className="text-[40px] leading-[1.08] sm:text-[56px]">{t('hero.title')}</h1>
          <p className="mt-6 text-[17px] text-stone/80">{t('hero.body')}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/urunler" className="btn btn-light">{t('hero.cta')}</Link>
            <Link to="/iletisim" className="btn-line text-stone">{t('hero.cta2')}</Link>
          </div>
        </div>
        <img src="/brand/logo-light.png" alt="Miranoir Marble" className="hero-in hidden w-full max-w-[420px] justify-self-end opacity-90 lg:block" />
      </div>
    </section>
  )
}

function Panels() {
  const t = useT()
  const items = [
    { img: '/projects2/kitchen-arabescato.jpg', title: t('home.counters.title'), body: t('home.counters.body'), cta: t('home.apps.cta'), to: '/uygulamalar/tezgah' },
    { img: '/projects2/living-onyx.jpg', title: t('home.apps.title'), body: t('home.apps.body'), cta: t('nav.allApps'), to: '/uygulamalar' },
  ]
  return (
    <section className="page grid gap-5 py-20 md:grid-cols-2">
      {items.map((it) => (
        <Link key={it.to} to={it.to} className="group relative block overflow-hidden rounded-sm text-stone">
          <div className="slab aspect-[4/5] sm:aspect-[4/3]"><img src={it.img} alt="" loading="lazy" /></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slab/95 via-slab/55 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
            <h2 className="text-3xl">{it.title}</h2>
            <p className="mt-2 max-w-md text-[15px] text-stone/80">{it.body}</p>
            <span className="mt-5 inline-block border-b border-stone/60 pb-0.5 text-[15px] group-hover:border-stone">{it.cta}</span>
          </div>
        </Link>
      ))}
    </section>
  )
}

function Areas() {
  const t = useT()
  return (
    <section className="page pb-20">
      <h2 className="text-4xl">{t('home.areas.title')}</h2>
      <p className="measure mt-3 text-noir/75">{t('home.areas.body')}</p>
      <ul className="mt-10 grid gap-x-10 border-t border-mist sm:grid-cols-2">
        {APPLICATIONS.map((a) => (
          <li key={a} className="border-b border-mist">
            <Link to={`/uygulamalar/${a}`} className="group flex items-center gap-5 py-4">
              <img src={AREA_IMAGES[a]} alt="" loading="lazy" className="h-14 w-14 shrink-0 rounded-full object-cover" />
              <span>
                <span className="block font-display text-xl group-hover:text-verd">{t(`app.${a}`)}</span>
                <span className="block text-sm text-vein">{t(`appd.${a}`)}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Featured() {
  const t = useT()
  const { stones } = usePublicStones()
  const featured = stones.filter((s) => s.featured).slice(0, 6)
  if (!featured.length) return null
  return (
    <section className="page pb-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl">{t('home.featured.title')}</h2>
          <p className="measure mt-3 text-noir/75">{t('home.featured.body')}</p>
        </div>
        <Link to="/urunler" className="link">{t('nav.allProducts')}</Link>
      </div>
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
        {featured.map((s) => <StoneCard key={s.id} stone={s} />)}
      </div>
    </section>
  )
}

function Collections() {
  const t = useT()
  const { stones } = usePublicStones()
  return (
    <section className="bg-white py-20">
      <div className="page">
        <h2 className="text-4xl">{t('home.cols.title')}</h2>
        <p className="measure mt-3 text-noir/75">{t('home.cols.body')}</p>
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {COLLECTIONS.map(({ key, cover }) => (
            <Link key={key} to={`/urunler/${key}`} className="group block">
              <div className="slab aspect-[3/4] rounded-t-full"><img src={cover} alt="" loading="lazy" /></div>
              <h3 className="mt-4 font-display text-2xl group-hover:text-verd">{t(`col.${key}`)}</h3>
              <p className="text-sm text-vein">{t('home.count', { n: stones.filter((s) => s.collection === key).length })}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function Brands() {
  const t = useT()
  const all = BRANDS
  return (
    <section className="border-y border-mist py-14">
      <div className="page">
        <h2 className="text-center text-sm text-vein">{t('home.brands.title')}</h2>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 font-display text-2xl text-noir/80">
          {all.map((b) => <li key={b}>{b}</li>)}
        </ul>
      </div>
    </section>
  )
}

export default function Home() {
  const t = useT()
  return (
    <>
      <Hero />
      <Panels />
      <Areas />
      <Featured />
      <Collections />
      <section className="page py-20">
        <h2 className="text-4xl">{t('home.process.title')}</h2>
        <p className="measure mt-3 mb-12 text-noir/75">{t('home.process.body')}</p>
        <Process />
      </section>
      <Brands />
      <section className="page grid gap-12 py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="mb-8 text-4xl">{t('nav.contact')}</h2>
          <ContactDetails />
        </div>
        <MapEmbed className="h-[380px] lg:h-full lg:min-h-[420px]" />
      </section>
    </>
  )
}
