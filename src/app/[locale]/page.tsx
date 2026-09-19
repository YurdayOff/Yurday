import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Contact } from '@/components/home/Contact'
import { Faq } from '@/components/home/Faq'
import { Hero } from '@/components/home/Hero'
import { Moments } from '@/components/home/Moments'
import { Occasions } from '@/components/home/Occasions'
import { Process } from '@/components/home/Process'
import { Reviews } from '@/components/home/Reviews'
import { Story } from '@/components/home/Story'
import { TrustPillars } from '@/components/home/TrustPillars'
import { JsonLd } from '@/components/ui/JsonLd'
import { Seam } from '@/components/ui/Seam'
import { isLocale, localePath, type Locale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import { buildPageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'
import {
  faqSchema,
  jsonLdGraph,
  organizationSchema,
  websiteSchema,
} from '@/lib/structured-data'

type HomeProps = { params: Promise<{ locale: string }> }

async function resolveLocale(params: HomeProps['params']): Promise<Locale> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return locale
}

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const messages = await getMessages(locale)

  return buildPageMetadata({
    locale,
    // Le gabarit « %s | Yurday » du layout ne s'applique qu'aux segments enfants :
    // la page d'accueil compose son titre elle-même.
    title: `${messages.seo.home.title} | ${site.name}`,
    description: messages.seo.home.description,
    pathFor: (target) => localePath(target),
    image: '/og/accueil.jpg',
  })
}

export default async function HomePage({ params }: HomeProps) {
  const locale = await resolveLocale(params)
  const messages = await getMessages(locale)
  const home = localePath(locale)

  return (
    <>
      <JsonLd
        json={jsonLdGraph([
          organizationSchema(messages, locale),
          websiteSchema(messages, locale),
          faqSchema(messages),
        ])}
      />
      <Hero messages={messages} home={home} />
      <Seam />
      <Occasions messages={messages} />
      <Seam />
      <Process messages={messages} />
      <Seam />
      <Moments messages={messages} home={home} />
      <Seam />
      <Reviews messages={messages} locale={locale} />
      <Seam />
      <Story messages={messages} />
      <Seam />
      <Faq messages={messages} home={home} />
      <Seam />
      <TrustPillars messages={messages} />
      <Seam />
      <Contact messages={messages} />
    </>
  )
}
