import { useState } from 'react'
import { Check } from 'lucide-react'
import { useT } from '../i18n'
import { APPLICATIONS, COLLECTIONS } from '../config'
import { usePublicStones } from '../store/stones'
import { createQuote } from '../services/api'
import { emailQuote } from '../services/notify'

const empty = { name: '', phone: '', email: '', application: 'tezgah', stone: '', size: '', message: '' }

export default function QuoteForm({ defaultStone = '' }) {
  const t = useT()
  const { stones } = usePublicStones()
  const [f, setF] = useState({ ...empty, stone: defaultStone })
  const [state, setState] = useState('idle') // idle | sending | sent
  const [error, setError] = useState('')
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (!f.name.trim() || !f.phone.trim()) { setError(t('form.required')); return }
    setError(''); setState('sending')
    // save it (admin panel / Supabase) and email it at the same time;
    // the request counts as sent if at least one of the two worked
    const stoneName = stones.find((s) => s.slug === f.stone)?.name || ''
    const [saved, emailed] = await Promise.allSettled([createQuote(f), emailQuote(f, stoneName)])
    if (emailed.status === 'rejected') console.warn('Quote email failed:', emailed.reason)
    if (saved.status === 'fulfilled' || emailed.value === true) setState('sent')
    else { setError(saved.reason?.message || t('form.failed')); setState('idle') }
  }

  if (state === 'sent') {
    return (
      <div className="rounded-2xl border border-mist bg-white p-8" role="status">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-verd text-white"><Check className="h-5 w-5" /></span>
        <h3 className="mt-5 font-display text-2xl">{t('form.sent.t')}</h3>
        <p className="mt-2 text-vein">{t('form.sent.b', { phone: f.phone })}</p>
        <button className="btn-line mt-6" onClick={() => { setF({ ...empty, stone: defaultStone }); setState('idle') }}>{t('form.again')}</button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="grid gap-5 rounded-2xl border border-mist bg-white p-6 sm:grid-cols-2 sm:p-8" noValidate>
      <h2 className="font-display text-2xl sm:col-span-2">{t('form.title')}</h2>
      <div>
        <label htmlFor="q-name" className="field-label">{t('form.name')}</label>
        <input id="q-name" className="field" value={f.name} onChange={set('name')} autoComplete="name" required />
      </div>
      <div>
        <label htmlFor="q-phone" className="field-label">{t('form.phone')}</label>
        <input id="q-phone" className="field" type="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" required />
      </div>
      <div>
        <label htmlFor="q-email" className="field-label">{t('form.email')} <span className="font-normal text-vein">({t('form.optional')})</span></label>
        <input id="q-email" className="field" type="email" value={f.email} onChange={set('email')} autoComplete="email" />
      </div>
      <div>
        <label htmlFor="q-app" className="field-label">{t('form.application')}</label>
        <select id="q-app" className="field" value={f.application} onChange={set('application')}>
          {APPLICATIONS.map((a) => <option key={a} value={a}>{t(`app.${a}`)}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="q-stone" className="field-label">{t('form.stone')}</label>
        <select id="q-stone" className="field" value={f.stone} onChange={set('stone')}>
          <option value="">{t('form.stoneAny')}</option>
          {COLLECTIONS.filter(({ key }) => stones.some((s) => s.collection === key)).map(({ key }) => (
            <optgroup key={key} label={t.col(key)}>
              {stones.filter((s) => s.collection === key).map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
            </optgroup>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="q-size" className="field-label">{t('form.size')}</label>
        <input id="q-size" className="field" value={f.size} onChange={set('size')} placeholder={t('form.sizeHint')} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="q-msg" className="field-label">{t('form.message')} <span className="font-normal text-vein">({t('form.optional')})</span></label>
        <textarea id="q-msg" className="field min-h-[110px]" value={f.message} onChange={set('message')} />
      </div>
      {error && <p className="text-sm text-[#A1362B] sm:col-span-2" role="alert">{error}</p>}
      <div className="sm:col-span-2">
        <button className="btn w-full sm:w-auto" disabled={state === 'sending'}>{state === 'sending' ? t('form.sending') : t('form.send')}</button>
      </div>
    </form>
  )
}
