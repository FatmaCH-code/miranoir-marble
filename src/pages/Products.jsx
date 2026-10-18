import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Search, ExternalLink } from 'lucide-react'
import { useT } from '../i18n'
import { COLLECTIONS, COLLECTION_KEYS, GROUPS, collectionOf, catalogSearchHref, whatsappHref } from '../config'
import { usePublicStones } from '../store/stones'
import PageHeader from '../components/PageHeader'
import StoneCard from '../components/StoneCard'
import { WhatsAppIcon } from '../components/Icons'

export default function Products() {
  const t = useT()
  const nav = useNavigate()
  const { material: param } = useParams()
  const [q, setQ] = useState('')
  const { stones, ready, error } = usePublicStones()
  const col = COLLECTION_KEYS.includes(param) ? param : ''
  const c = col ? collectionOf(col) : null
  const query = q.trim().toLocaleLowerCase('tr')
  const list = stones.filter((s) => (!col || s.collection === col) && (!query || s.name.toLocaleLowerCase('tr').includes(query)))
  const brandEmpty = ready && c?.brand && !stones.some((s) => s.collection === col)

  return (
    <>
      <PageHeader title={col ? t.col(col) : t('products.title')} body={col ? t.colDesc(col) : t('products.body')}>
        {c?.catalogQuery && (
          <a href={catalogSearchHref(c)} target="_blank" rel="noreferrer" className="btn-line mt-7 text-stone">
            {t('brand.catalog', { brand: c.brand })}<ExternalLink className="h-4 w-4" />
          </a>
        )}
      </PageHeader>
      <section className="page py-12">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <button className="chip" aria-pressed={!col} onClick={() => nav('/urunler')}>{t('products.all')}</button>
          </div>
          {GROUPS.map((g) => (
            <div key={g} className="flex flex-wrap items-center gap-2" role="group" aria-label={t(`grp.${g}`)}>
              <span className="mr-2 w-full text-sm text-vein sm:w-40">{t(`grp.${g}`)}</span>
              {COLLECTIONS.filter((x) => x.group === g).map(({ key }) => (
                <button key={key} className="chip" aria-pressed={col === key} onClick={() => nav(`/urunler/${key}`)}>{t.col(key)}</button>
              ))}
            </div>
          ))}
        </div>

        {brandEmpty ? (
          <div className="mt-12 space-y-6 rounded-2xl border border-mist bg-white p-8">
            <p className="measure text-[17px] text-noir/80">{t('brand.empty', { brand: c.brand })}</p>
            <div className="flex flex-wrap gap-3">
              <a href={catalogSearchHref(c)} target="_blank" rel="noreferrer" className="btn">{t('brand.catalog', { brand: c.brand })}<ExternalLink className="h-4 w-4" /></a>
              <a href={whatsappHref(t('stone.waText', { name: c.brand }))} target="_blank" rel="noreferrer" className="btn-line"><WhatsAppIcon className="h-4 w-4" />{t('stone.whatsapp')}</a>
              <Link to="/iletisim" className="btn-line">{t('brand.ask')}</Link>
            </div>
          </div>
        ) : (
          <>
            <label className="relative mt-8 block max-w-md">
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
          </>
        )}
      </section>
    </>
  )
}
