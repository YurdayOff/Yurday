/** Constantes de l'entreprise, utilisées par le contenu, le SEO et les données structurées. */
export const site = {
  name: 'Yurday',
  /** Sans slash final. Surchargeable pour les préproductions. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yurday.fr').replace(/\/$/, ''),
  email: 'contact@yurday.fr',
  whatsapp: {
    /** Format international sans « + », attendu par wa.me. */
    number: '33743703902',
    url: 'https://wa.me/33743703902',
    displayNumber: '+33 7 43 70 39 02',
  },
  /** Zone d'intervention actuelle (cf. FAQ). */
  areaServed: { city: 'Paris', region: 'Île-de-France', country: 'FR' },
  reviews: { average: 4.8, count: 100 },
  daysOrganised: 150,
  founders: [
    { id: 'leo', name: 'Léo', email: 'leo@yurday.fr', photo: '/images/fondateur-leo.webp' },
    { id: 'luca', name: 'Luca', email: 'luca@yurday.fr', photo: '/images/fondateur-luca.webp' },
  ],
  images: {
    logo: '/images/yurday-logo.webp',
    founders: '/images/fondateurs-leo-luca.webp',
  },
  /**
   * Formulaire : les champs sont postés vers un formulaire statique détecté par
   * Netlify Forms (cf. public/__forms.html). À remplacer par une route API si
   * l'hébergement change.
   */
  form: { endpoint: '/__forms.html', name: 'contact-yurday' },
  social: [] as string[],
} as const

export const foundersById = Object.fromEntries(
  site.founders.map((founder) => [founder.id, founder]),
) as Record<(typeof site.founders)[number]['id'], (typeof site.founders)[number]>
