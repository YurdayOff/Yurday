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
  { id: 'star-dior', image: '/images/moment-star-dior.webp' },
  { id: 'croisiere-seine', image: '/images/moment-croisiere-seine.webp' },
  { id: 'gt3rs-circuit', image: '/images/moment-gt3rs-circuit.webp' },
  { id: 'degustation-vin', image: '/images/moment-degustation-vin.webp' },
  { id: 'roses-cartier', image: '/images/moment-roses-cartier.webp' },
]
