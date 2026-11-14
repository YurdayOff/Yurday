import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ClosingCta } from '@/components/home/ClosingCta'
import { Contact } from '@/components/home/Contact'
import { Faq } from '@/components/home/Faq'
import { Hero } from '@/components/home/Hero'
import { HeroIntro } from '@/components/home/HeroIntro'
import { Moments } from '@/components/home/Moments'
import { Split } from '@/components/home/Split'
import { Testimonials } from '@/components/home/Testimonials'
import { FullBleed } from '@/components/ui/FullBleed'
import { JsonLd } from '@/components/ui/JsonLd'
import { isLocale, localePath, type Locale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import { occasionPath } from '@/lib/occasions'
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
  })
}

export default async function HomePage({ params }: HomeProps) {
  const locale = await resolveLocale(params)
  const messages = await getMessages(locale)
  const home = localePath(locale)
  const { particuliers, entreprises } = messages.home

  return (
    <>
      <JsonLd
        json={jsonLdGraph([
          organizationSchema(messages, locale),
          websiteSchema(messages, locale),
          faqSchema(messages),
        ])}
      />
      <Hero messages={messages} />
      <HeroIntro messages={messages} />
      <FullBleed src="/images/r-chauffeur.jpg" alt="" />
      <Split
        id="particuliers"
        content={particuliers}
        image={{ src: '/images/r-meres.jpg', alt: `${particuliers.title.lead}${particuliers.title.em}` }}
        href={`${home}#contact`}
      />
      <Split
        id="entreprises"
        content={entreprises}
        image={{ src: '/images/r-reception.jpg', alt: `${entreprises.title.lead}${entreprises.title.em}` }}
        href={occasionPath('entreprises', locale)}
        reverse
      />
      <Moments messages={messages} />
      <Testimonials messages={messages} />
      <ClosingCta messages={messages} />
      <Contact messages={messages} />
      <Faq messages={messages} home={home} />
    </>
  )
}
