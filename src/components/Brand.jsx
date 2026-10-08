import { Link } from 'react-router-dom'

// Horizontal lockup for the navbar: monogram + wordmark set like the logo
export default function Brand({ light = false, className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-3 ${className}`} aria-label="Miranoir Marble">
      <img src={light ? '/brand/monogram-light.png' : '/brand/monogram-dark.png'} alt="" className="h-10 w-auto" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[22px] tracking-[0.12em] ${light ? 'text-stone' : 'text-noir'}`}>MİRANOİR</span>
        <span className={`mt-1 text-[10px] tracking-[0.62em] ${light ? 'text-stone/70' : 'text-vein'}`}>MARBLE</span>
      </span>
    </Link>
  )
}
