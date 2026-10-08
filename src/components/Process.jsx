import { useT } from '../i18n'

// Four real steps in order, so they are numbered. The line between them ends
// in the open circles from the feet of the Miranoir monogram.
export default function Process() {
  const t = useT()
  return (
    <ol className="relative grid gap-10 md:grid-cols-4 md:gap-8">
      {[1, 2, 3, 4].map((n) => (
        <li key={n} className="relative">
          {n < 4 && <span aria-hidden="true" className="absolute left-11 top-[22px] hidden h-px w-[calc(100%-0.75rem)] bg-noir/25 md:block" />}
          <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-noir bg-stone font-display text-lg">{n}</span>
          <h3 className="mt-5 font-display text-xl">{t(`step${n}.t`)}</h3>
          <p className="mt-2 text-[15px] text-noir/75">{t(`step${n}.b`)}</p>
        </li>
      ))}
    </ol>
  )
}
