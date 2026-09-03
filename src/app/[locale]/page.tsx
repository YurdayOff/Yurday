import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Concept } from '@/components/home/Concept'
import { Contact } from '@/components/home/Contact'
import { Faq } from '@/components/home/Faq'
import { Hero } from '@/components/home/Hero'
import { Occasions } from '@/components/home/Occasions'
import { Process } from '@/components/home/Process'
import { Reviews } from '@/components/home/Reviews'
import { Story } from '@/components/home/Story'
import { JsonLd } from '@/components/ui/JsonLd'
import { isLocale, localePath, type Locale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import { buildPageMetadata } from '@/lib/seo'
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
    title: messages.seo.home.title,
    description: messages.seo.home.description,
    pathFor: (target) => localePath(target),
    image: '/og/accueil.jpg',
    absoluteTitle: true,
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
      <Concept messages={messages} />
      <Occasions messages={messages} locale={locale} />
      <Reviews messages={messages} locale={locale} />
      <Process messages={messages} />
      <Story messages={messages} />
      <Faq messages={messages} home={home} />
      <Contact messages={messages} />
    </>
  )
}
