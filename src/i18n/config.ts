import type { CountryCode } from '@/components/ui/Flag'

/** Langues du site, dans l'ordre du sélecteur. */
export const locales = ['fr', 'en', 'es', 'pt', 'zh', 'de', 'it', 'ja', 'ar'] as const

export type Locale = (typeof locales)[number]

/**
 * Le français n'est pas préfixé dans l'URL : yurday.fr/ reste l'adresse
 * canonique historique, les autres langues vivent sous /en, /es, etc.
 */
export const defaultLocale: Locale = 'fr'

type LocaleInfo = {
  /** Nom de la langue, écrit dans cette langue. */
  label: string
  /** Code court affiché dans le sélecteur. */
  code: string
  /** Valeur de l'attribut `lang` et du `hreflang` correspondant. */
  htmlLang: string
  dir: 'ltr' | 'rtl'
  flag: CountryCode
}

export const localeInfo: Record<Locale, LocaleInfo> = {
  fr: { label: 'Français', code: 'FR', htmlLang: 'fr', dir: 'ltr', flag: 'FR' },
  en: { label: 'English', code: 'EN', htmlLang: 'en', dir: 'ltr', flag: 'GB' },
  es: { label: 'Español', code: 'ES', htmlLang: 'es', dir: 'ltr', flag: 'ES' },
  pt: { label: 'Português', code: 'PT', htmlLang: 'pt', dir: 'ltr', flag: 'PT' },
  zh: { label: '中文', code: '中文', htmlLang: 'zh-Hans', dir: 'ltr', flag: 'CN' },
  de: { label: 'Deutsch', code: 'DE', htmlLang: 'de', dir: 'ltr', flag: 'DE' },
  it: { label: 'Italiano', code: 'IT', htmlLang: 'it', dir: 'ltr', flag: 'IT' },
  ja: { label: '日本語', code: 'JA', htmlLang: 'ja', dir: 'ltr', flag: 'JP' },
  ar: { label: 'العربية', code: 'AR', htmlLang: 'ar', dir: 'rtl', flag: 'SA' },
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/**
 * URL publique d'un chemin dans une langue donnée.
 * `localePath('fr', '/anniversaire')` -> `/anniversaire`
 * `localePath('en', '/birthday')`     -> `/en/birthday`
 */
export function localePath(locale: Locale, path = '/'): string {
  const clean = path === '/' ? '' : path
  return locale === defaultLocale ? clean || '/' : `/${locale}${clean}`
}
