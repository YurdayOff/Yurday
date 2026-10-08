import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JournalArticleView } from '@/components/journal/JournalArticleView'
import { JsonLd } from '@/components/ui/JsonLd'
import { isLocale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import { journalArticles, type JournalArticle } from '@/data/journal'
import {
  isJournalLocale,
  journalArticleFromSlug,
  journalArticlePath,
  journalLocales,
  type JournalLocale,
} from '@/lib/journal'
import { absoluteUrl } from '@/lib/seo'
import { site } from '@/lib/site'
import { blogPostingSchema, jsonLdGraph } from '@/lib/structured-data'

type JournalArticlePageProps = { params: Promise<{ locale: string; article: string }> }

export function generateStaticParams() {
  return journalLocales.flatMap((locale) =>
    journalArticles.map((article) => ({ locale, article: article.slug[locale] })),
  )
}

export const dynamicParams = false

async function resolve(
  params: JournalArticlePageProps['params'],
): Promise<{ locale: JournalLocale; article: JournalArticle }> {
  const { locale: rawLocale, article: slug } = await params
  if (!isLocale(rawLocale) || !isJournalLocale(rawLocale)) notFound()

  const article = journalArticleFromSlug(journalArticles, slug, rawLocale)
  if (!article) notFound()

  return { locale: rawLocale, article }
}

export async function generateMetadata({ params }: JournalArticlePageProps): Promise<Metadata> {
  const { locale, article } = await resolve(params)
  const content = article.content[locale]
  const path = journalArticlePath(article, locale)

  const languages: Record<string, string> = {
    fr: absoluteUrl(journalArticlePath(article, 'fr')),
    en: absoluteUrl(journalArticlePath(article, 'en')),
    'x-default': absoluteUrl(journalArticlePath(article, 'fr')),
  }

  return {
    title: content.title,
    description: content.description,
    alternates: { canonical: absoluteUrl(path), languages },
    openGraph: {
      type: 'article',
      siteName: site.name,
      title: content.title,
      description: content.description,
      url: absoluteUrl(path),
      publishedTime: article.publishedAt,
      images: [{ url: absoluteUrl(article.image), width: 1600, height: 900, alt: content.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
      images: [absoluteUrl(article.image)],
    },
  }
}

export default async function JournalArticlePage({ params }: JournalArticlePageProps) {
  const { locale, article } = await resolve(params)
  const messages = await getMessages(locale)
  const content = article.content[locale]

  return (
    <>
      <JsonLd
        json={jsonLdGraph([
          blogPostingSchema({
            title: content.title,
            description: content.description,
            image: absoluteUrl(article.image),
            url: absoluteUrl(journalArticlePath(article, locale)),
            publishedAt: article.publishedAt,
          }),
        ])}
      />
      <JournalArticleView article={article} locale={locale} messages={messages} />
    </>
  )
}
