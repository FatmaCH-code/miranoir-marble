import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react'
import { COMPANY, telHref } from '../config'
import { PinterestIcon } from './Icons'

export default function TopBar() {
  return (
    <div className="bg-slab text-[13px] text-stone/80">
      <div className="page flex h-10 items-center justify-between gap-4">
        <div className="flex items-center gap-5 overflow-hidden whitespace-nowrap">
          <span className="hidden items-center gap-1.5 md:flex"><MapPin className="h-3.5 w-3.5" />{COMPANY.area}</span>
          {COMPANY.phones.map((p, i) => (
            <a key={p} href={telHref(p)} className={`items-center gap-1.5 hover:text-white ${i ? 'hidden sm:flex' : 'flex'}`}>
              <Phone className="h-3.5 w-3.5" />{p}
            </a>
          ))}
          <a href={`mailto:${COMPANY.email}`} className="hidden items-center gap-1.5 hover:text-white lg:flex">
            <Mail className="h-3.5 w-3.5" />{COMPANY.email}
          </a>
        </div>
        <div className="flex items-center gap-1">
          {COMPANY.social.instagram && <a href={COMPANY.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="p-1.5 hover:text-white"><Instagram className="h-4 w-4" /></a>}
          {COMPANY.social.facebook && <a href={COMPANY.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="p-1.5 hover:text-white"><Facebook className="h-4 w-4" /></a>}
          {COMPANY.social.pinterest && <a href={COMPANY.social.pinterest} target="_blank" rel="noreferrer" aria-label="Pinterest" className="p-1.5 hover:text-white"><PinterestIcon className="h-4 w-4" /></a>}
        </div>
      </div>
    </div>
  )
}
