import { Link } from 'react-router-dom'
import { useT } from '../i18n'
import { posts } from '../data/posts'
import { formatDate } from '../lib/utils'
import PageHeader from '../components/PageHeader'

export default function Blog() {
  const t = useT()
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date))
  return (
    <>
      <PageHeader title={t('blog.title')} body={t('blog.body')} />
      <section className="page grid gap-x-6 gap-y-14 py-16 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <Link key={p.slug} to={`/blog/${p.slug}`} className="group block">
            <div className="slab aspect-[3/2] rounded-sm"><img src={p.cover} alt="" loading="lazy" /></div>
            <time className="mt-4 block text-sm text-vein" dateTime={p.date}>{formatDate(p.date, t.lang)}</time>
            <h2 className="mt-1 font-display text-2xl group-hover:text-verd">{t.pick(p.title)}</h2>
            <p className="mt-2 text-noir/75">{t.pick(p.excerpt)}</p>
          </Link>
        ))}
      </section>
    </>
  )
}
