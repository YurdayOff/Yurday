import { defaultLocale, isLocale, locales, localePath, type Locale } from '@/i18n/config'
import { occasionFromSlug, occasionPath } from './occasions'

/**
 * Pages légales : rédigées en français uniquement (elles engagent Yurday).
 * Elles ne sont donc publiées que sur les URL sans préfixe de langue.
 */
export const legalPaths = {
  mentions: '/mentions-legales',
  terms: '/cgv',
  privacy: '/politique-de-confidentialite',
} as const

export type LegalPageId = keyof typeof legalPaths

export const legalPageIds = Object.keys(legalPaths) as LegalPageId[]

/**
 * Équivalent de la page courante dans chaque langue, déduit du chemin affiché.
 * Les slugs étant traduits, un simple préfixe de langue ne suffit pas.
 * Les pages sans équivalent traduit (légales, 404) renvoient vers l'accueil.
 */
export function alternatePaths(pathname: string): Record<Locale, string> {
  const segments = pathname.split('/').filter(Boolean)
  const prefix = segments[0]
  const hasPrefix = prefix !== undefined && isLocale(prefix)
  const currentLocale: Locale = hasPrefix ? (prefix as Locale) : defaultLocale
  const slug = hasPrefix ? segments[1] : segments[0]
  const occasion = slug ? occasionFromSlug(slug, currentLocale) : undefined

  return Object.fromEntries(
    locales.map((locale) => [
      locale,
      occasion ? occasionPath(occasion, locale) : localePath(locale),
    ]),
  ) as Record<Locale, string>
}
