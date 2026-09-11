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
  { id: 'karting', image: '/images/moment-karting.webp' },
  { id: 'voiture-luxe', image: '/images/moment-voiture-luxe.webp' },
  { id: 'evjf-boite-nuit', image: '/images/moment-evjf-boite-nuit.webp' },
  { id: 'parc-des-princes', image: '/images/moment-parc-des-princes.webp' },
  { id: 'star-dior', image: '/images/moment-star-dior.webp' },
]
