import { defaultLocale, locales, type Locale } from '@/i18n/config'

/** Les cinq occasions qui ont leur propre page. */
export const occasionKeys = [
  'anniversaire',
  'demande-en-mariage',
  'fete-des-meres',
  'evg-evjf',
  'pot-de-depart',
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
  'pot-de-depart': {
    fr: 'pot-de-depart',
    en: 'farewell-party',
    es: 'fiesta-de-despedida',
    pt: 'festa-de-despedida',
    de: 'abschiedsfeier',
    it: 'festa-d-addio',
    zh: 'farewell-party',
    ja: 'farewell-party',
    ar: 'farewell-party',
  },
}

/** Photo d'illustration de la carte « occasions » et de l'image de partage. */
const images: Record<OccasionKey, string> = {
  anniversaire: '/images/occasion-anniversaire.webp',
  'demande-en-mariage': '/images/occasion-demande-en-mariage.webp',
  'fete-des-meres': '/images/occasion-fete-des-meres.webp',
  'evg-evjf': '/images/occasion-evg-evjf.webp',
  'pot-de-depart': '/images/occasion-pot-de-depart.webp',
}

export function occasionSlug(key: OccasionKey, locale: Locale): string {
  return slugs[key][locale]
}

export function occasionImage(key: OccasionKey): string {
  return images[key]
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
