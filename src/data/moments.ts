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
  { id: 'karting', image: '/images/moment-karting.webp' },
  { id: 'pique-nique', image: '/images/moment-pique-nique.webp' },
  { id: 'parc-des-princes', image: '/images/moment-parc-des-princes.webp' },
  { id: 'evjf-boite-nuit', image: '/images/moment-evjf-boite-nuit.webp' },
  { id: 'gt3rs-circuit', image: '/images/moment-gt3rs-circuit.webp' },
  { id: 'degustation-vin', image: '/images/moment-degustation-vin.webp' },
  { id: 'roses-cartier', image: '/images/moment-roses-cartier.webp' },
  { id: 'saut-parachute', image: '/images/moment-saut-parachute.webp' },
  { id: 'coaching-boxe', image: '/images/moment-coaching-boxe.webp' },
  { id: 'voiture-luxe', image: '/images/moment-voiture-luxe.webp' },
  { id: 'evg-boite-nuit', image: '/images/moment-evg-boite-nuit.webp' },
]
