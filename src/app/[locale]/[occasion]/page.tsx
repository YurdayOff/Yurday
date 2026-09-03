import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { OccasionContent } from '@/components/occasion/OccasionContent'
import { JsonLd } from '@/components/ui/JsonLd'
import { isLocale, localePath, type Locale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import {
  allOccasionParams,
  occasionFromSlug,
  occasionPath,
  type OccasionKey,
} from '@/lib/occasions'
import { buildPageMetadata } from '@/lib/seo'
import {
  breadcrumbSchema,
  jsonLdGraph,
  occasionServiceSchema,
  organizationSchema,
} from '@/lib/structured-data'

type OccasionPageProps = { params: Promise<{ locale: string; occasion: string }> }

/** Les 45 pages (5 occasions × 9 langues) sont générées à la construction. */
export function generateStaticParams() {
  return allOccasionParams()
}

export const dynamicParams = false

async function resolve(
  params: OccasionPageProps['params'],
): Promise<{ locale: Locale; occasion: OccasionKey }> {
  const { locale, occasion: slug } = await params
  if (!isLocale(locale)) notFound()

  const occasion = occasionFromSlug(slug, locale)
  if (!occasion) notFound()

  return { locale, occasion }
}

export async function generateMetadata({ params }: OccasionPageProps): Promise<Metadata> {
  const { locale, occasion } = await resolve(params)
  const messages = await getMessages(locale)
  const seo = messages.seo.occasions[occasion]

  return buildPageMetadata({
    locale,
    title: seo.title,
    description: seo.description,
    pathFor: (target) => occasionPath(occasion, target),
    image: `/og/${occasion}.jpg`,
  })
}

export default async function OccasionPage({ params }: OccasionPageProps) {
  const { locale, occasion } = await resolve(params)
  const messages = await getMessages(locale)

  return (
    <>
      <JsonLd
        json={jsonLdGraph([
          organizationSchema(messages, locale),
          occasionServiceSchema(occasion, messages, locale),
          breadcrumbSchema([
            { name: messages.nav.home, path: localePath(locale) },
            { name: messages.occasions.cards[occasion], path: occasionPath(occasion, locale) },
          ]),
        ])}
      />
      <OccasionContent occasion={occasion} locale={locale} messages={messages} />
    </>
  )
}
