import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useT } from '../i18n'
import { COLLECTIONS, COLLECTION_KEYS } from '../config'
import { usePublicStones } from '../store/stones'
import PageHeader from '../components/PageHeader'
import StoneCard from '../components/StoneCard'

export default function Products() {
  const t = useT()
  const nav = useNavigate()
  const { material: param } = useParams()
  const [q, setQ] = useState('')
  const { stones, ready, error } = usePublicStones()
  const col = COLLECTION_KEYS.includes(param) ? param : ''
  const query = q.trim().toLocaleLowerCase('tr')
  const list = stones.filter((s) => (!col || s.collection === col) && (!query || s.name.toLocaleLowerCase('tr').includes(query)))

  return (
    <>
      <PageHeader title={col ? t(`col.${col}`) : t('products.title')} body={col ? t(`cold.${col}`) : t('products.body')} />
      <section className="page py-12">
        <div className="flex flex-wrap gap-2" role="group" aria-label={t('stone.collection')}>
          <button className="chip" aria-pressed={!col} onClick={() => nav('/urunler')}>{t('products.all')}</button>
          {COLLECTIONS.map(({ key }) => (
            <button key={key} className="chip" aria-pressed={col === key} onClick={() => nav(`/urunler/${key}`)}>{t(`col.${key}`)}</button>
          ))}
        </div>
        <label className="relative mt-5 block max-w-md">
          <span className="sr-only">{t('products.search')}</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-vein" />
          <input className="field pl-11" placeholder={t('products.search')} value={q} onChange={(e) => setQ(e.target.value)} />
        </label>

        <div className="mt-10">
          {!ready && <p className="text-vein">{t('products.loading')}</p>}
          {error && <p className="text-[#A1362B]">{error}</p>}
          {ready && !list.length && (
            <div className="rounded-2xl border border-dashed border-vein/40 p-10 text-center">
              <p className="text-noir/75">{t('products.empty')}</p>
              <button className="btn-line mt-5" onClick={() => { setQ(''); nav('/urunler') }}>{t('products.clear')}</button>
            </div>
          )}
          <div className="grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-3 lg:grid-cols-4">
            {list.map((s) => <StoneCard key={s.id} stone={s} />)}
          </div>
        </div>
      </section>
    </>
  )
}
