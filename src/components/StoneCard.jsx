import { Link } from 'react-router-dom'
import { useT } from '../i18n'

export default function StoneCard({ stone }) {
  const t = useT()
  return (
    <Link to={`/tas/${stone.slug}`} className="group block">
      <div className="slab aspect-[4/3] rounded-sm">
        <img src={stone.images[0]} alt={stone.name} loading="lazy" />
      </div>
      <h3 className="mt-3 font-display text-xl group-hover:text-verd">{stone.name}</h3>
      <p className="text-sm text-vein">{stone.collection ? t.col(stone.collection) : t(`mat.${stone.material}`)}</p>
    </Link>
  )
}
