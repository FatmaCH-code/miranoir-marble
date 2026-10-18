import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react'
import { COMPANY, telHref, whatsappHref } from '../config'
import { useT } from '../i18n'
import { WhatsAppIcon, PinterestIcon } from './Icons'

export function ContactDetails() {
  const t = useT()
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.mapsQuery)}`
  const Row = ({ icon: Icon, title, children }) => (
    <div className="flex gap-4">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-mist bg-white"><Icon className="h-4 w-4" /></span>
      <div><h3 className="font-display text-lg">{title}</h3><div className="mt-1 text-[15px] text-noir/80">{children}</div></div>
    </div>
  )
  return (
    <div className="space-y-7">
      <Row icon={Phone} title={t('contact.phone')}>
        {COMPANY.phones.map((p) => <a key={p} href={telHref(p)} className="block hover:text-verd">{p}</a>)}
      </Row>
      <Row icon={Mail} title={t('contact.email')}><a href={`mailto:${COMPANY.email}`} className="hover:text-verd">{COMPANY.email}</a></Row>
      <Row icon={MapPin} title={t('contact.address')}>
        <p>{COMPANY.address}</p>
        <a href={mapsLink} target="_blank" rel="noreferrer" className="link mt-1 inline-block">{t('contact.directions')}</a>
      </Row>
      <div className="flex gap-2 pl-14">
        {[[whatsappHref(t('wa.text')), WhatsAppIcon, 'WhatsApp'], [COMPANY.social.instagram, Instagram, 'Instagram'], [COMPANY.social.facebook, Facebook, 'Facebook'], [COMPANY.social.pinterest, PinterestIcon, 'Pinterest']].filter(([href]) => href).map(([href, I, label]) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full bg-noir text-stone hover:bg-verd"><I className="h-4 w-4" /></a>
        ))}
      </div>
    </div>
  )
}

export function MapEmbed({ className = '' }) {
  return (
    <iframe
      title="Map"
      src={`https://maps.google.com/maps?q=${encodeURIComponent(COMPANY.mapsQuery)}&t=m&z=14&output=embed`}
      className={`w-full rounded-2xl border border-mist grayscale-[60%] ${className}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  )
}
