import { useMemo, useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useT } from '../i18n'
import { MATERIALS } from '../config'
import { usePublicStones } from '../store/stones'
import PageHeader from '../components/PageHeader'
import StoneCard from '../components/StoneCard'

export default function Products() {
  const t = useT()
  const nav = useNavigate()
  const { material } = useParams()
  const [params, setParams] = useSearchParams()
  const brand = params.get('marka') || ''
  const tone = params.get('ton') || ''
  const [q, setQ] = useState('')
  const { stones, ready, error } = usePublicStones()
  const mat = MATERIALS.includes(material) ? material : ''

  const setParam = (k, v) => { const p = new URLSearchParams(params); v ? p.set(k, v) : p.delete(k); setParams(p, { replace: true }) }
  const brands = useMemo(() => [...new Set(stones.filter((s) => !mat || s.material === mat).map((s) => s.brand).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'tr')), [stones, mat])
  const list = stones.filter((s) =>
    (!mat || s.material === mat) && (!brand || s.brand === brand) && (!tone || s.tone === tone) &&
    (!q || s.name.toLocaleLowerCase('tr').includes(q.toLocaleLowerCase('tr'))))

  const clear = () => { setQ(''); nav('/urunler') }

  return (
    <>
      <PageHeader title={mat ? t(`mat.${mat}`) : t('products.title')} body={t('products.body')} />
      <section className="page py-12">
        <div className="flex flex-wrap gap-2" role="group" aria-label={t('stone.material')}>
          <button className="chip" aria-pressed={!mat} onClick={() => nav('/urunler')}>{t('products.all')}</button>
          {MATERIALS.map((m) => (
            <button key={m} className="chip" aria-pressed={mat === m} onClick={() => nav(`/urunler/${m}`)}>{t(`mat.${m}`)}</button>
          ))}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_200px_160px]">
          <label className="relative">
            <span className="sr-only">{t('products.search')}</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-vein" />
            <input className="field pl-11" placeholder={t('products.search')} value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <label>
            <span className="sr-only">{t('products.brand')}</span>
            <select className="field" value={brand} onChange={(e) => setParam('marka', e.target.value)}>
              <option value="">{t('products.brand')}: {t('products.all')}</option>
              {brands.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </label>
          <label>
            <span className="sr-only">{t('products.tone')}</span>
            <select className="field" value={tone} onChange={(e) => setParam('ton', e.target.value)}>
              <option value="">{t('products.tone')}: {t('products.all')}</option>
              {['light', 'dark', 'warm'].map((x) => <option key={x} value={x}>{t(`tone.${x}`)}</option>)}
            </select>
          </label>
        </div>

        <div className="mt-12">
          {!ready && <p className="text-vein">{t('products.loading')}</p>}
          {error && <p className="text-[#A1362B]">{error}</p>}
          {ready && !list.length && (
            <div className="rounded-2xl border border-dashed border-vein/40 p-10 text-center">
              <p className="text-noir/75">{t('products.empty')}</p>
              <button className="btn-line mt-5" onClick={clear}>{t('products.clear')}</button>
            </div>
          )}
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {list.map((s) => <StoneCard key={s.id} stone={s} />)}
          </div>
        </div>
      </section>
    </>
  )
}
