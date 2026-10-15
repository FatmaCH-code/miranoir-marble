// Inner-page header: a band of the black Nero slab with the title on it
export default function PageHeader({ title, body, children }) {
  return (
    <section className="relative overflow-hidden bg-slab text-stone">
      <img src="/brand/header-noir.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-r from-slab/90 via-slab/60 to-transparent" />
      <div className="page relative py-16 sm:py-20">
        <h1 className="text-4xl sm:text-5xl">{title}</h1>
        {body && <p className="measure mt-4 text-[17px] text-stone/80">{body}</p>}
        {children}
      </div>
    </section>
  )
}
