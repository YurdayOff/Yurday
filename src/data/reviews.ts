import type { CountryCode } from '@/components/ui/Flag'
import type { Locale } from '@/i18n/config'

export type Review = {
  /** Identifiant stable : sert de clé de traduction dans `reviews.items`. */
  id: number
  name: string
  country: CountryCode
  /** Langue d'origine de l'avis : la mention « traduit en… » est masquée dans cette langue. */
  nativeLocale: Locale
}

/** Avis clients, dans l'ordre d'affichage. Le texte vit dans les fichiers de messages. */
export const reviews: Review[] = [
  { id: 1, name: "Sebastien M.", country: 'FR', nativeLocale: 'fr' },
  { id: 2, name: "Daniel R.", country: 'MX', nativeLocale: 'es' },
  { id: 3, name: "Wei C.", country: 'CN', nativeLocale: 'zh' },
  { id: 4, name: "Thomas G.", country: 'FR', nativeLocale: 'fr' },
  { id: 5, name: "Sihan L.", country: 'CN', nativeLocale: 'zh' },
  { id: 6, name: "Julia F.", country: 'DE', nativeLocale: 'de' },
  { id: 7, name: "Noah S.", country: 'FR', nativeLocale: 'fr' },
  { id: 8, name: "Oliver B.", country: 'GB', nativeLocale: 'en' },
  { id: 9, name: "Fang W.", country: 'CN', nativeLocale: 'zh' },
  { id: 10, name: "Catherine M.", country: 'FR', nativeLocale: 'fr' },
  { id: 11, name: "James C.", country: 'US', nativeLocale: 'en' },
  { id: 12, name: "Yuki T.", country: 'JP', nativeLocale: 'ja' },
  { id: 13, name: "Sarah B.", country: 'FR', nativeLocale: 'fr' },
  { id: 14, name: "Emily J.", country: 'US', nativeLocale: 'en' },
  { id: 15, name: "Alex J.", country: 'US', nativeLocale: 'en' },
  { id: 16, name: "Léa R.", country: 'FR', nativeLocale: 'fr' },
  { id: 17, name: "María G.", country: 'ES', nativeLocale: 'es' },
  { id: 18, name: "Anna M.", country: 'DE', nativeLocale: 'fr' },
  { id: 20, name: "Pedro A.", country: 'PT', nativeLocale: 'pt' },
  { id: 21, name: "Aitana R.", country: 'ES', nativeLocale: 'es' },
  { id: 22, name: "Benjamin D.", country: 'FR', nativeLocale: 'fr' },
  { id: 23, name: "Mia T.", country: 'AU', nativeLocale: 'en' },
  { id: 24, name: "Camila O.", country: 'BR', nativeLocale: 'pt' },
  { id: 25, name: "Mehdi A.", country: 'FR', nativeLocale: 'fr' },
  { id: 26, name: "Ravi P.", country: 'IN', nativeLocale: 'en' },
  { id: 27, name: "Thomas S.", country: 'DE', nativeLocale: 'de' },
  { id: 28, name: "Walid B.", country: 'FR', nativeLocale: 'fr' },
  { id: 29, name: "Guillermo L.", country: 'ES', nativeLocale: 'es' },
  { id: 30, name: "Sophie L.", country: 'FR', nativeLocale: 'fr' },
  { id: 31, name: "Laura M.", country: 'FR', nativeLocale: 'fr' },
  { id: 32, name: "Karim E.", country: 'FR', nativeLocale: 'fr' },
  { id: 33, name: "Julie P.", country: 'FR', nativeLocale: 'fr' },
  { id: 34, name: "Alexandre V.", country: 'FR', nativeLocale: 'fr' },
  { id: 35, name: "Lucas B.", country: 'FR', nativeLocale: 'fr' },
  { id: 36, name: "Sophie M.", country: 'FR', nativeLocale: 'fr' },
  { id: 37, name: "René C.", country: 'FR', nativeLocale: 'fr' },
  { id: 38, name: "Inès M.", country: 'FR', nativeLocale: 'fr' },
  { id: 39, name: "Emma C.", country: 'FR', nativeLocale: 'fr' },
]

/** Un seul bandeau défilant, avec tous les avis. */
export const reviewRows: Review[][] = [reviews]
