export type Moment = {
  /** Identifiant stable : sert de clé de traduction dans `moments.items`. */
  id: string
  image: string
}

/**
 * Vrais moments clients, dans l'ordre d'affichage. Le texte vit dans les fichiers de
 * messages. Les photos ne sont jamais réutilisées ailleurs sur le site (elles servent
 * déjà de photo de carte pour les pages occasion) : chaque nouvelle histoire doit
 * arriver avec sa propre photo inédite.
 */
export const moments: Moment[] = [
  { id: 'montgolfiere-fete-des-meres', image: '/images/moment-montgolfiere-fete-des-meres.webp' },
  { id: 'degustation-vin', image: '/images/moment-degustation-vin.webp' },
  { id: 'croisiere-seine', image: '/images/moment-croisiere-seine.webp' },
  { id: 'opera-chauffeur', image: '/images/moment-opera-chauffeur.webp' },
  { id: 'caleche-saint-valentin', image: '/images/moment-caleche-saint-valentin.webp' },
  { id: 'demande-mariage-coucher-soleil', image: '/images/moment-demande-mariage-coucher-soleil.webp' },
]
