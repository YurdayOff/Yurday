import type { MetadataRoute } from 'next'
import { defaultLocale, locales, localeInfo, localePath, type Locale } from '@/i18n/config'
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

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...localizedEntries((locale) => localePath(locale), 1),
    ...occasionKeys.flatMap((key) =>
      localizedEntries((locale) => occasionPath(key, locale), 0.8),
    ),
  ]
}
