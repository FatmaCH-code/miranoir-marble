import { useState } from 'react'
import { ArrowLeft, Upload, X } from 'lucide-react'
import { useT } from '../i18n'
import { COLLECTIONS, collectionOf } from '../config'
import { saveStone, uploadStoneImage } from '../services/api'
import { slugify } from '../lib/utils'

const blank = { name: '', slug: '', collection: 'beyaz', material: 'mermer', brand: '', tone: 'light', finish: '', thickness: '', description: { tr: '', en: '' }, images: [], featured: false, active: true }

// defined outside the editor so inputs keep focus while typing
const Field = ({ id, label, children }) => <div><label htmlFor={id} className="field-label">{label}</label>{children}</div>

export default function StoneEditor({ stone, onDone }) {
  const t = useT()
  const [s, setS] = useState(stone ? structuredClone(stone) : blank)
  const [slugTouched, setSlugTouched] = useState(!!stone)
  const [busy, setBusy] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const set = (k) => (e) => setS({ ...s, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  const upload = async (e) => {
    const files = [...e.target.files]; e.target.value = ''
    setUploading(true); setError('')
    try {
      const urls = []
      for (const f of files) urls.push(await uploadStoneImage(f))
      setS((cur) => ({ ...cur, images: [...cur.images, ...urls] }))
    } catch (err) { setError(err.message) } finally { setUploading(false) }
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!s.name.trim() || !s.slug.trim()) { setError(`${t('admin.name')} / ${t('admin.slug')}`); return }
    setBusy(true); setError('')
    try { await saveStone(s); onDone() } catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  return (
    <form onSubmit={submit} className="max-w-3xl">
      <button type="button" onClick={onDone} className="inline-flex items-center gap-2 text-sm text-vein hover:text-noir"><ArrowLeft className="h-4 w-4" />{t('admin.cancel')}</button>
      <h1 className="mt-4 text-3xl">{stone ? stone.name : t('admin.add')}</h1>
      <div className="mt-8 grid gap-5 rounded-2xl border border-mist bg-white p-6 sm:grid-cols-2">
        <Field id="e-name" label={t('admin.name')}>
          <input id="e-name" className="field" value={s.name} onChange={(e) => setS({ ...s, name: e.target.value, slug: slugTouched ? s.slug : slugify(e.target.value) })} />
        </Field>
        <Field id="e-slug" label={t('admin.slug')}>
          <input id="e-slug" className="field" value={s.slug} onChange={(e) => { setSlugTouched(true); setS({ ...s, slug: slugify(e.target.value) }) }} />
        </Field>
        <Field id="e-col" label={t('stone.collection')}>
          <select id="e-col" className="field" value={s.collection}
            onChange={(e) => { const c = collectionOf(e.target.value); setS({ ...s, collection: c.key, material: c.material, brand: c.brand || s.brand }) }}>
            {COLLECTIONS.map(({ key }) => <option key={key} value={key}>{t(`col.${key}`)}</option>)}
          </select>
        </Field>
        <Field id="e-brand" label={t('stone.brand')}><input id="e-brand" className="field" value={s.brand} onChange={set('brand')} /></Field>
        <Field id="e-finish" label={t('stone.finish')}><input id="e-finish" className="field" value={s.finish} onChange={set('finish')} /></Field>
        <Field id="e-thick" label={t('stone.thickness')}><input id="e-thick" className="field" value={s.thickness} onChange={set('thickness')} /></Field>
        <div className="flex flex-col justify-end gap-2 pb-1 text-[15px]">
          <label className="flex items-center gap-2"><input type="checkbox" checked={s.featured} onChange={set('featured')} />{t('admin.featured')}</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={s.active} onChange={set('active')} />{t('admin.active')}</label>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="e-dtr" className="field-label">{t('admin.descTr')}</label>
          <textarea id="e-dtr" className="field min-h-[90px]" value={s.description.tr} onChange={(e) => setS({ ...s, description: { ...s.description, tr: e.target.value } })} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="e-den" className="field-label">{t('admin.descEn')}</label>
          <textarea id="e-den" className="field min-h-[90px]" value={s.description.en} onChange={(e) => setS({ ...s, description: { ...s.description, en: e.target.value } })} />
        </div>
        <div className="sm:col-span-2">
          <span className="field-label">{t('admin.photos')}</span>
          <div className="flex flex-wrap gap-3">
            {s.images.map((src, i) => (
              <div key={src.slice(-40) + i} className="relative">
                <img src={src} alt="" className="h-24 w-24 rounded object-cover" />
                <button type="button" onClick={() => setS({ ...s, images: s.images.filter((_, j) => j !== i) })}
                  className="absolute -right-2 -top-2 rounded-full bg-noir p-1 text-stone" aria-label={t('admin.delete')}><X className="h-3 w-3" /></button>
              </div>
            ))}
            <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded border border-dashed border-vein text-center text-xs text-vein hover:bg-stone">
              <Upload className="h-4 w-4" />{uploading ? t('admin.uploading') : t('admin.upload')}
              <input type="file" accept="image/*" multiple className="sr-only" onChange={upload} disabled={uploading} />
            </label>
          </div>
        </div>
      </div>
      {error && <p className="mt-4 text-[#A1362B]" role="alert">{error}</p>}
      <div className="mt-6 flex gap-3">
        <button className="btn" disabled={busy || uploading}>{t('admin.save')}</button>
        <button type="button" className="btn-line" onClick={onDone}>{t('admin.cancel')}</button>
      </div>
    </form>
  )
}
