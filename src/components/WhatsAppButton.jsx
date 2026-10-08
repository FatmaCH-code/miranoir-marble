import { whatsappHref } from '../config'
import { useT } from '../i18n'
import { WhatsAppIcon } from './Icons'

export default function WhatsAppButton() {
  const t = useT()
  return (
    <a href={whatsappHref(t('wa.text'))} target="_blank" rel="noreferrer" aria-label={t('wa.label')} title={t('wa.label')}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] transition-transform hover:scale-105">
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  )
}
