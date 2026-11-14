import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JournalIndex } from '@/components/journal/JournalIndex'
import { journalUi } from '@/components/journal/journal-ui'
import { isLocale } from '@/i18n/config'
import { absoluteUrl } from '@/lib/seo'
import { site } from '@/lib/site'
import { isJournalLocale, journalIndexPath, journalLocales, type JournalLocale } from '@/lib/journal'

type JournalPageProps = { params: Promise<{ locale: string }> }

export function generateStaticParams() {
  return journalLocales.map((locale) => ({ locale }))
}

export const dynamicParams = false

function resolve(locale: string): JournalLocale {
  if (!isLocale(locale) || !isJournalLocale(locale)) notFound()
  return locale
}

export async function generateMetadata({ params }: JournalPageProps): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = resolve(raw)
  const ui = journalUi[locale]
  const path = journalIndexPath(locale)

  const languages: Record<string, string> = {
    fr: absoluteUrl(journalIndexPath('fr')),
    en: absoluteUrl(journalIndexPath('en')),
    'x-default': absoluteUrl(journalIndexPath('fr')),
  }

  return {
    title: ui.h2Index,
    description: ui.ledeIndex,
    alternates: { canonical: absoluteUrl(path), languages },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: ui.h2Index,
      description: ui.ledeIndex,
      url: absoluteUrl(path),
      images: [{ url: absoluteUrl('/og-yurday.jpg'), width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ui.h2Index,
      description: ui.ledeIndex,
      images: [absoluteUrl('/og-yurday.jpg')],
    },
  }
}

export default async function JournalPage({ params }: JournalPageProps) {
  const { locale: raw } = await params
  const locale = resolve(raw)

  return <JournalIndex locale={locale} />
}
