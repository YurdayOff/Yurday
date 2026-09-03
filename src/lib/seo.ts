import type { Metadata } from 'next'
import { defaultLocale, locales, localeInfo, type Locale } from '@/i18n/config'
import { site } from './site'

/** Codes attendus par Open Graph (langue_PAYS). */
const openGraphLocales: Record<Locale, string> = {
  fr: 'fr_FR',
  en: 'en_US',
  es: 'es_ES',
  pt: 'pt_PT',
  zh: 'zh_CN',
  de: 'de_DE',
  it: 'it_IT',
  ja: 'ja_JP',
  ar: 'ar_AR',
}

export function absoluteUrl(path: string): string {
  return `${site.url}${path === '/' ? '/' : path}`
}

/**
 * Canonique + `hreflang` pour toutes les langues.
 * `pathFor` renvoie le chemin de la page courante dans la langue demandée :
 * les slugs étant traduits, il ne suffit pas de préfixer l'URL.
 */
export function buildAlternates(
  locale: Locale,
  pathFor: (locale: Locale) => string,
): Metadata['alternates'] {
  const languages: Record<string, string> = {}
  for (const other of locales) {
    languages[localeInfo[other].htmlLang] = absoluteUrl(pathFor(other))
  }
  languages['x-default'] = absoluteUrl(pathFor(defaultLocale))

  return { canonical: absoluteUrl(pathFor(locale)), languages }
}

type PageMetadataInput = {
  locale: Locale
  title: string
  description: string
  /** Chemin de la page dans chaque langue. */
  pathFor: (locale: Locale) => string
  /** Image de partage (chemin absolu depuis la racine du site). */
  image: string
}

/** Métadonnées communes à toutes les pages : canonique, hreflang, Open Graph, Twitter. */
export function buildPageMetadata({
  locale,
  title,
  description,
  pathFor,
  image,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(pathFor(locale))

  return {
    // Le suffixe « | Yurday » vient du gabarit défini dans le layout.
    title,
    description,
    alternates: buildAlternates(locale, pathFor),
    openGraph: {
      type: 'website',
      siteName: site.name,
      title,
      description,
      url,
      locale: openGraphLocales[locale],
      alternateLocale: locales
        .filter((other) => other !== locale)
        .map((other) => openGraphLocales[other]),
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(image)],
    },
  }
}
