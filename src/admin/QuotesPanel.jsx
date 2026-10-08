import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import { useT } from '../i18n'
import { listQuotes, updateQuoteStatus } from '../services/api'
import { downloadCSV, formatDate } from '../lib/utils'
import { telHref } from '../config'

const STATUSES = ['new', 'contacted', 'won', 'lost']

export default function QuotesPanel() {
  const t = useT()
  const [quotes, setQuotes] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => { listQuotes().then(setQuotes).catch((e) => setError(e.message)) }, [])

  const change = async (q, status) => {
    setQuotes((list) => list.map((x) => (x.id === q.id ? { ...x, status } : x)))
    try { await updateQuoteStatus(q.id, status) } catch (e) { setError(e.message) }
  }

  const exportCsv = () => downloadCSV('miranoir-teklifler.csv', [
    ['Tarih', 'Ad', 'Telefon', 'E-posta', 'Alan', 'Taş', 'Ölçü', 'Not', 'Durum'],
    ...quotes.map((q) => [q.createdAt, q.name, q.phone, q.email, q.application, q.stone, q.size, q.message, q.status]),
  ])

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl">{t('admin.quotes')}</h1>
        {quotes?.length > 0 && <button className="btn-line !py-2.5 text-sm" onClick={exportCsv}><Download className="h-4 w-4" />{t('admin.export')}</button>}
      </div>
      {error && <p className="mt-4 text-[#A1362B]">{error}</p>}
      {quotes && !quotes.length && <p className="mt-8 rounded-2xl border border-dashed border-vein/40 p-10 text-center text-vein">{t('admin.noQuotes')}</p>}
      <div className="mt-8 space-y-4">
        {quotes?.map((q) => (
          <article key={q.id} className="rounded-2xl border border-mist bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-xl">{q.name}</h2>
                <p className="text-sm text-vein">{formatDate(q.createdAt, t.lang)}</p>
              </div>
              <select className="field !w-auto !py-2 text-sm" value={q.status} onChange={(e) => change(q, e.target.value)} aria-label="Status">
                {STATUSES.map((s) => <option key={s} value={s}>{t(`admin.status.${s}`)}</option>)}
              </select>
            </div>
            <dl className="mt-4 grid gap-x-6 gap-y-1 text-[15px] sm:grid-cols-2">
              <div><dt className="inline text-vein">{t('form.phone')}: </dt><dd className="inline"><a className="link" href={telHref(q.phone)}>{q.phone}</a> · <a className="link" href={`https://wa.me/${q.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">WhatsApp</a></dd></div>
              {q.email && <div><dt className="inline text-vein">{t('form.email')}: </dt><dd className="inline"><a className="link" href={`mailto:${q.email}`}>{q.email}</a></dd></div>}
              <div><dt className="inline text-vein">{t('form.application')}: </dt><dd className="inline">{q.application ? t(`app.${q.application}`) : '—'}</dd></div>
              <div><dt className="inline text-vein">{t('form.stone')}: </dt><dd className="inline">{q.stone || '—'}</dd></div>
              {q.size && <div className="sm:col-span-2"><dt className="inline text-vein">{t('form.size')}: </dt><dd className="inline">{q.size}</dd></div>}
            </dl>
            {q.message && <p className="mt-3 rounded-lg bg-stone p-3 text-[15px]">{q.message}</p>}
          </article>
        ))}
      </div>
    </div>
  )
}
