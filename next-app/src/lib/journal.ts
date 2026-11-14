import { defaultLocale, type Locale } from '@/i18n/config'
import type { OccasionKey } from './occasions'

/**
 * Le journal n'existe pour l'instant qu'en français et en anglais : des
 * articles longs, pas des champs courts, demandent un vrai travail de
 * rédaction par langue plutôt qu'une traduction mécanique. Les 7 autres
 * langues suivront.
 */
export const journalLocales = ['fr', 'en'] as const
export type JournalLocale = (typeof journalLocales)[number]

export function isJournalLocale(locale: Locale): locale is JournalLocale {
  return (journalLocales as readonly string[]).includes(locale)
}

export type JournalArticleMeta = {
  id: string
  /** Slug par langue disponible. */
  slug: Record<JournalLocale, string>
  /** Occasion liée, pour le lien de fin d'article. */
  relatedOccasion: OccasionKey
  /** Image de couverture, déjà présente dans /public/images. */
  image: string
  /** Date de publication (ISO), pour le balisage BlogPosting. */
  publishedAt: string
}

const slugBase = defaultLocale // 'fr' : pas de préfixe de langue dans l'URL

/** Chemin public de la page liste du journal. */
export function journalIndexPath(locale: JournalLocale): string {
  return locale === slugBase ? '/journal' : `/${locale}/journal`
}

/** Chemin public d'un article, préfixe de langue compris. */
export function journalArticlePath(meta: JournalArticleMeta, locale: JournalLocale): string {
  const slug = meta.slug[locale]
  return locale === slugBase ? `/journal/${slug}` : `/${locale}/journal/${slug}`
}

/** Résout un slug d'URL vers un article, pour une langue donnée. */
export function journalArticleFromSlug<T extends JournalArticleMeta>(
  articles: T[],
  slug: string,
  locale: JournalLocale,
): T | undefined {
  return articles.find((article) => article.slug[locale] === slug)
}
