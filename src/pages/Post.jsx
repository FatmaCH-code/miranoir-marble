import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useT } from '../i18n'
import { posts } from '../data/posts'
import { formatDate } from '../lib/utils'

export default function Post() {
  const t = useT()
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)
  if (!post) return (
    <div className="page py-24"><p>{t('blog.notFound')}</p><Link to="/blog" className="link mt-4 inline-block">{t('blog.back')}</Link></div>
  )
  return (
    <article className="pb-20">
      <div className="slab h-[42vh] min-h-[260px]"><img src={post.cover} alt="" /></div>
      <div className="page max-w-3xl">
        <Link to="/blog" className="mt-10 inline-flex items-center gap-2 text-sm text-vein hover:text-noir"><ArrowLeft className="h-4 w-4" />{t('blog.back')}</Link>
        <time className="mt-8 block text-sm text-vein" dateTime={post.date}>{formatDate(post.date, t.lang)}</time>
        <h1 className="mt-2 text-4xl sm:text-5xl">{t.pick(post.title)}</h1>
        <div className="mt-8 space-y-5 text-[17px] leading-[1.75] text-noir/85">
          {(post.body[t.lang] || post.body.tr).map((para, i) => <p key={i}>{para}</p>)}
        </div>
        <Link to="/iletisim" className="btn mt-12">{t('nav.quote')}</Link>
      </div>
    </article>
  )
}
