import { useSearchParams } from 'react-router-dom'
import { useT } from '../i18n'
import PageHeader from '../components/PageHeader'
import QuoteForm from '../components/QuoteForm'
import { ContactDetails, MapEmbed } from '../components/ContactBlock'

export default function Contact() {
  const t = useT()
  const [params] = useSearchParams()
  return (
    <>
      <PageHeader title={t('contact.title')} body={t('contact.body')} />
      <section className="page grid gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <QuoteForm defaultStone={params.get('tas') || ''} />
        <ContactDetails />
      </section>
      <section className="page pb-20"><MapEmbed className="h-[420px]" /></section>
    </>
  )
}
