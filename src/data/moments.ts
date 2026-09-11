export type Moment = {
  /** Identifiant stable : sert de clé de traduction dans `moments.items`. */
  id: string
  image: string
}

/** Vrais moments clients, dans l'ordre d'affichage. Le texte vit dans les fichiers de messages. */
export const moments: Moment[] = [
  { id: 'anniversaire', image: '/images/occasion-anniversaire.webp' },
  { id: 'demande-en-mariage', image: '/images/occasion-demande-en-mariage.webp' },
  { id: 'saint-valentin', image: '/images/occasion-saint-valentin.webp' },
  { id: 'evg-evjf', image: '/images/occasion-evg-evjf.webp' },
  { id: 'fete-des-meres', image: '/images/occasion-fete-des-meres.webp' },
  { id: 'karting', image: '/images/moment-karting.webp' },
  { id: 'voiture-luxe', image: '/images/moment-voiture-luxe.webp' },
  { id: 'evjf-boite-nuit', image: '/images/moment-evjf-boite-nuit.webp' },
  { id: 'parc-des-princes', image: '/images/moment-parc-des-princes.webp' },
  { id: 'star-dior', image: '/images/moment-star-dior.webp' },
]
