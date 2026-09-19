import { defaultLocale, locales, type Locale } from '@/i18n/config'

/** Les cinq occasions qui ont leur propre page. */
export const occasionKeys = [
  'anniversaire',
  'demande-en-mariage',
  'saint-valentin',
  'evg-evjf',
  'fete-des-meres',
] as const

export type OccasionKey = (typeof occasionKeys)[number]

/**
 * Un slug par langue : une URL lisible dans la langue du visiteur pèse dans le
 * référencement local. Les langues à écriture non latine reprennent le slug
 * anglais pour garder des URL partageables (pas d'échappement %).
 */
const slugs: Record<OccasionKey, Record<Locale, string>> = {
  anniversaire: {
    fr: 'anniversaire',
    en: 'birthday',
    es: 'cumpleanos',
    pt: 'aniversario',
    de: 'geburtstag',
    it: 'compleanno',
    zh: 'birthday',
    ja: 'birthday',
    ar: 'birthday',
  },
  'demande-en-mariage': {
    fr: 'demande-en-mariage',
    en: 'marriage-proposal',
    es: 'pedida-de-mano',
    pt: 'pedido-de-casamento',
    de: 'heiratsantrag',
    it: 'proposta-di-matrimonio',
    zh: 'marriage-proposal',
    ja: 'marriage-proposal',
    ar: 'marriage-proposal',
  },
  'saint-valentin': {
    fr: 'saint-valentin',
    en: 'valentines-day',
    es: 'san-valentin',
    pt: 'dia-dos-namorados',
    de: 'valentinstag',
    it: 'san-valentino',
    zh: 'valentines-day',
    ja: 'valentines-day',
    ar: 'valentines-day',
  },
  'evg-evjf': {
    fr: 'evg-evjf',
    en: 'bachelor-bachelorette-party',
    es: 'despedida-de-soltero',
    pt: 'despedida-de-solteiro',
    de: 'junggesellenabschied',
    it: 'addio-al-celibato',
    zh: 'bachelor-bachelorette-party',
    ja: 'bachelor-bachelorette-party',
    ar: 'bachelor-bachelorette-party',
  },
  'fete-des-meres': {
    fr: 'fete-des-meres',
    en: 'mothers-day',
    es: 'dia-de-la-madre',
    pt: 'dia-das-maes',
    de: 'muttertag',
    it: 'festa-della-mamma',
    zh: 'mothers-day',
    ja: 'mothers-day',
    ar: 'mothers-day',
  },
}

export function occasionSlug(key: OccasionKey, locale: Locale): string {
  return slugs[key][locale]
}

/** Chemin public de la page occasion, préfixe de langue compris. */
export function occasionPath(key: OccasionKey, locale: Locale): string {
  const slug = occasionSlug(key, locale)
  return locale === defaultLocale ? `/${slug}` : `/${locale}/${slug}`
}

/** Résout un slug d'URL vers une occasion, pour une langue donnée. */
export function occasionFromSlug(slug: string, locale: Locale): OccasionKey | undefined {
  return occasionKeys.find((key) => slugs[key][locale] === slug)
}

/** Toutes les paires langue / slug, pour la génération statique et le sitemap. */
export function allOccasionParams(): { locale: Locale; occasion: string }[] {
  return locales.flatMap((locale) =>
    occasionKeys.map((key) => ({ locale, occasion: slugs[key][locale] })),
  )
}
