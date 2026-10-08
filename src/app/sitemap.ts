import type { MetadataRoute } from 'next'
import { defaultLocale, locales, localeInfo, localePath, type Locale } from '@/i18n/config'
import { journalArticles } from '@/data/journal'
import { journalArticlePath, journalIndexPath, journalLocales } from '@/lib/journal'
import { occasionKeys, occasionPath } from '@/lib/occasions'
import { absoluteUrl } from '@/lib/seo'

/**
 * Une entrée par page et par langue, avec ses équivalents `hreflang`.
 * Les pages légales en sont absentes : elles sont volontairement non indexées
 * tant que leur contenu n'est pas validé (cf. lib/legal-metadata.ts).
 */
function localizedEntries(
  pathFor: (locale: Locale) => string,
  priority: number,
): MetadataRoute.Sitemap {
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((locale) => [localeInfo[locale].htmlLang, absoluteUrl(pathFor(locale))]),
  )
  languages['x-default'] = absoluteUrl(pathFor(defaultLocale))

  return locales.map((locale) => ({
    url: absoluteUrl(pathFor(locale)),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    // Le français est la version principale du site.
    priority: locale === defaultLocale ? priority : Math.round((priority - 0.1) * 10) / 10,
    alternates: { languages },
  }))
}

/**
 * Le journal n'existe qu'en français et en anglais (cf. lib/journal.ts) :
 * pas d'équivalent dans les 7 autres langues, donc pas de `hreflang` vers elles.
 */
function journalEntries(
  pathFor: (locale: (typeof journalLocales)[number]) => string,
  priority: number,
): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {
    fr: absoluteUrl(pathFor('fr')),
    en: absoluteUrl(pathFor('en')),
    'x-default': absoluteUrl(pathFor('fr')),
  }

  return journalLocales.map((locale) => ({
    url: absoluteUrl(pathFor(locale)),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: locale === defaultLocale ? priority : Math.round((priority - 0.1) * 10) / 10,
    alternates: { languages },
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...localizedEntries((locale) => localePath(locale), 1),
    ...occasionKeys.flatMap((key) =>
      localizedEntries((locale) => occasionPath(key, locale), 0.8),
    ),
    ...journalEntries((locale) => journalIndexPath(locale), 0.6),
    ...journalArticles.flatMap((article) =>
      journalEntries((locale) => journalArticlePath(article, locale), 0.6),
    ),
  ]
}
