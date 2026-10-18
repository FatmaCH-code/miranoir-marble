// Sends a quote request to the business inbox (see QUOTE_EMAIL in src/config.js)
import { QUOTE_EMAIL, COMPANY } from '../config'
import { trText } from '../i18n'

export const emailEnabled = Boolean(QUOTE_EMAIL.provider && QUOTE_EMAIL.to)

export async function emailQuote(q, stoneName) {
  if (!emailEnabled) return false
  const fields = {
    'Ad soyad': q.name,
    Telefon: q.phone,
    'E-posta': q.email || '—',
    'Uygulama alanı': q.application ? trText(`app.${q.application}`) : '—',
    'İlgilenilen taş': stoneName || 'Henüz karar vermedi',
    'Yaklaşık ölçü': q.size || '—',
    Not: q.message || '—',
    WhatsApp: `https://wa.me/${q.phone.replace(/\D/g, '').replace(/^0/, '90')}`,
  }
  const subject = `Yeni teklif talebi: ${q.name}${stoneName ? ' — ' + stoneName : ''}`

  let res
  if (QUOTE_EMAIL.provider === 'web3forms') {
    res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: QUOTE_EMAIL.web3formsKey, subject, from_name: COMPANY.name + ' web sitesi', replyto: q.email || undefined, ...fields }),
    })
  } else {
    res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(QUOTE_EMAIL.to)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _subject: subject, _template: 'table', _captcha: 'false', ...(q.email ? { _replyto: q.email } : {}), ...fields }),
    })
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.success === false || data.success === 'false') throw new Error(data.message || 'Email could not be sent')
  return true
}
