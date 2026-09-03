import type { CountryCode } from '@/components/ui/Flag'
import type { Locale } from '@/i18n/config'

export type Review = {
  /** Identifiant stable : sert de clé de traduction dans `reviews.items`. */
  id: number
  name: string
  /** Initiale (ou premier caractère) affichée dans la pastille. */
  avatar: string
  country: CountryCode
  /** Langue d'origine de l'avis : la mention « traduit en… » est masquée dans cette langue. */
  nativeLocale: Locale
}

/** Avis clients, dans l'ordre d'affichage. Le texte vit dans les fichiers de messages. */
export const reviews: Review[] = [
  { id: 1, name: "Sebastien M.", avatar: "S", country: 'FR', nativeLocale: 'fr' },
  { id: 2, name: "Daniel R.", avatar: "D", country: 'MX', nativeLocale: 'es' },
  { id: 3, name: "Wei C.", avatar: "陈", country: 'CN', nativeLocale: 'zh' },
  { id: 4, name: "Thomas G.", avatar: "T", country: 'FR', nativeLocale: 'fr' },
  { id: 5, name: "Sihan L.", avatar: "林", country: 'CN', nativeLocale: 'zh' },
  { id: 6, name: "Julia F.", avatar: "J", country: 'DE', nativeLocale: 'de' },
  { id: 7, name: "Noah S.", avatar: "N", country: 'FR', nativeLocale: 'fr' },
  { id: 8, name: "Oliver B.", avatar: "O", country: 'GB', nativeLocale: 'en' },
  { id: 9, name: "Fang W.", avatar: "王", country: 'CN', nativeLocale: 'zh' },
  { id: 10, name: "Catherine M.", avatar: "C", country: 'FR', nativeLocale: 'fr' },
  { id: 11, name: "James C.", avatar: "J", country: 'US', nativeLocale: 'en' },
  { id: 12, name: "Yuki T.", avatar: "Y", country: 'JP', nativeLocale: 'ja' },
  { id: 13, name: "Sarah B.", avatar: "S", country: 'FR', nativeLocale: 'fr' },
  { id: 14, name: "Emily J.", avatar: "E", country: 'US', nativeLocale: 'en' },
  { id: 15, name: "Alex J.", avatar: "A", country: 'US', nativeLocale: 'en' },
  { id: 16, name: "Léa R.", avatar: "L", country: 'FR', nativeLocale: 'fr' },
  { id: 17, name: "María G.", avatar: "M", country: 'ES', nativeLocale: 'es' },
  { id: 18, name: "Anna M.", avatar: "A", country: 'DE', nativeLocale: 'fr' },
  { id: 19, name: "Nicolas R.", avatar: "N", country: 'FR', nativeLocale: 'fr' },
  { id: 20, name: "Pedro A.", avatar: "P", country: 'PT', nativeLocale: 'pt' },
  { id: 21, name: "Aitana R.", avatar: "A", country: 'ES', nativeLocale: 'es' },
  { id: 22, name: "Benjamin D.", avatar: "B", country: 'FR', nativeLocale: 'fr' },
  { id: 23, name: "Mia T.", avatar: "M", country: 'AU', nativeLocale: 'en' },
  { id: 24, name: "Camila O.", avatar: "C", country: 'BR', nativeLocale: 'pt' },
  { id: 25, name: "Mehdi A.", avatar: "M", country: 'FR', nativeLocale: 'fr' },
  { id: 26, name: "Ravi P.", avatar: "R", country: 'IN', nativeLocale: 'en' },
  { id: 27, name: "Thomas S.", avatar: "T", country: 'DE', nativeLocale: 'de' },
  { id: 28, name: "Walid B.", avatar: "W", country: 'FR', nativeLocale: 'fr' },
  { id: 29, name: "Guillermo L.", avatar: "G", country: 'ES', nativeLocale: 'es' },
  { id: 30, name: "Sophie L.", avatar: "S", country: 'FR', nativeLocale: 'fr' },
  { id: 31, name: "Laura M.", avatar: "L", country: 'FR', nativeLocale: 'fr' },
  { id: 32, name: "Karim E.", avatar: "K", country: 'FR', nativeLocale: 'fr' },
  { id: 33, name: "Julie P.", avatar: "J", country: 'FR', nativeLocale: 'fr' },
  { id: 34, name: "Alexandre V.", avatar: "A", country: 'FR', nativeLocale: 'fr' },
  { id: 35, name: "Lucas B.", avatar: "L", country: 'FR', nativeLocale: 'fr' },
  { id: 36, name: "Sophie M.", avatar: "S", country: 'FR', nativeLocale: 'fr' },
  { id: 37, name: "René C.", avatar: "R", country: 'FR', nativeLocale: 'fr' },
  { id: 38, name: "Inès M.", avatar: "I", country: 'FR', nativeLocale: 'fr' },
  { id: 39, name: "Emma C.", avatar: "E", country: 'FR', nativeLocale: 'fr' },
]

/** Deux bandeaux défilants : le premier vers la gauche, le second vers la droite. */
export const reviewRows: Review[][] = [reviews.slice(0, 19), reviews.slice(19)]
