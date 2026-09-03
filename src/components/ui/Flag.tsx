import type { ReactElement } from 'react'

/**
 * Drapeaux dessinés en SVG plutôt qu'en émojis : les émojis de drapeaux
 * ne sont pas rendus sous Windows, où le site est très consulté.
 */
export type CountryCode = keyof typeof FLAG_SHAPES

const FLAG_SHAPES = {
  AU: (
    <svg viewBox="0 0 3 2" aria-hidden="true" focusable="false">
      <rect width="3" height="2" fill="#00247d"/>
      <path d="M0,0 L1.5,1 M1.5,0 L0,1" stroke="#fff" strokeWidth="0.15"/>
      <path d="M0.75,0 V1 M0,0.5 H1.5" stroke="#fff" strokeWidth="0.25"/>
      <path d="M0.75,0 V1 M0,0.5 H1.5" stroke="#cf142b" strokeWidth="0.12"/>
      <circle cx="2.3" cy="1.5" r="0.12" fill="#fff"/>
      <circle cx="2.5" cy="0.5" r="0.1" fill="#fff"/>
      <circle cx="2.7" cy="1.1" r="0.1" fill="#fff"/>
      <circle cx="2.1" cy="1.0" r="0.08" fill="#fff"/>
    </svg>
  ),
  BR: (
    <svg viewBox="0 0 3 2" aria-hidden="true" focusable="false">
      <rect width="3" height="2" fill="#009739"/>
      <polygon points="1.5,0.2 2.7,1 1.5,1.8 0.3,1" fill="#FEDD00"/>
      <circle cx="1.5" cy="1" r="0.45" fill="#012169"/>
    </svg>
  ),
  CN: (
    <svg viewBox="0 0 30 20" aria-hidden="true" focusable="false">
      <rect width="30" height="20" fill="#DE2910"/>
      <g fill="#FFDE00"><polygon points="5,3 5.9,5.6 8.6,5.6 6.4,7.2 7.2,9.8 5,8.2 2.8,9.8 3.6,7.2 1.4,5.6 4.1,5.6"/>
      <polygon points="10.5,2 10.9,3 12,3 11.1,3.6 11.5,4.6 10.5,4 9.5,4.6 9.9,3.6 9,3 10.1,3"/>
      <polygon points="13,5 13.4,6 14.5,6 13.6,6.6 14,7.6 13,7 12,7.6 12.4,6.6 11.5,6 12.6,6"/>
      <polygon points="13,9.5 13.4,10.5 14.5,10.5 13.6,11.1 14,12.1 13,11.5 12,12.1 12.4,11.1 11.5,10.5 12.6,10.5"/>
      <polygon points="10.5,13 10.9,14 12,14 11.1,14.6 11.5,15.6 10.5,15 9.5,15.6 9.9,14.6 9,14 10.1,14"/>
      </g>
    </svg>
  ),
  DE: (
    <svg viewBox="0 0 3 2" aria-hidden="true" focusable="false">
      <rect width="3" height="0.667" fill="#000"/>
      <rect y="0.667" width="3" height="0.667" fill="#DD0000"/>
      <rect y="1.333" width="3" height="0.667" fill="#FFCE00"/>
    </svg>
  ),
  ES: (
    <svg viewBox="0 0 3 2" aria-hidden="true" focusable="false">
      <rect width="3" height="2" fill="#AA151B"/>
      <rect y="0.5" width="3" height="1" fill="#F1BF00"/>
    </svg>
  ),
  FR: (
    <svg viewBox="0 0 3 2" aria-hidden="true" focusable="false">
      <rect width="1" height="2" fill="#002654"/>
      <rect x="1" width="1" height="2" fill="#fff"/>
      <rect x="2" width="1" height="2" fill="#ED2939"/>
    </svg>
  ),
  GB: (
    <svg viewBox="0 0 60 36" aria-hidden="true" focusable="false">
      <rect width="60" height="36" fill="#00247d"/>
      <path d="M0,0 L60,36 M60,0 L0,36" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,36 M60,0 L0,36" stroke="#cf142b" strokeWidth="2"/>
      <path d="M30,0 V36 M0,18 H60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 V36 M0,18 H60" stroke="#cf142b" strokeWidth="6"/>
    </svg>
  ),
  IN: (
    <svg viewBox="0 0 3 2" aria-hidden="true" focusable="false">
      <rect width="3" height="0.667" fill="#FF9933"/>
      <rect y="0.667" width="3" height="0.667" fill="#fff"/>
      <rect y="1.333" width="3" height="0.667" fill="#138808"/>
      <circle cx="1.5" cy="1" r="0.2" fill="none" stroke="#000080" strokeWidth="0.03"/>
    </svg>
  ),
  IT: (
    <svg viewBox="0 0 3 2" aria-hidden="true" focusable="false">
      <rect width="1" height="2" fill="#009246"/>
      <rect x="1" width="1" height="2" fill="#fff"/>
      <rect x="2" width="1" height="2" fill="#CE2B37"/>
    </svg>
  ),
  JP: (
    <svg viewBox="0 0 3 2" aria-hidden="true" focusable="false">
      <rect width="3" height="2" fill="#fff"/>
      <circle cx="1.5" cy="1" r="0.6" fill="#BC002D"/>
    </svg>
  ),
  MX: (
    <svg viewBox="0 0 3 2" aria-hidden="true" focusable="false">
      <rect width="1" height="2" fill="#006341"/>
      <rect x="1" width="1" height="2" fill="#fff"/>
      <rect x="2" width="1" height="2" fill="#CE1126"/>
    </svg>
  ),
  PT: (
    <svg viewBox="0 0 3 2" aria-hidden="true" focusable="false">
      <rect width="3" height="2" fill="#FF0000"/>
      <rect width="1.2" height="2" fill="#006600"/>
    </svg>
  ),
  SA: (
    <svg viewBox="0 0 3 2" aria-hidden="true" focusable="false">
      <rect width="3" height="2" fill="#006C35"/>
      <rect x="0.15" y="0.65" width="2.7" height="0.13" fill="#fff" rx="0.02"/>
      <rect x="0.15" y="0.9" width="2.2" height="0.13" fill="#fff" rx="0.02"/>
      <g stroke="#fff" strokeWidth="0.09" strokeLinecap="round"><line x1="0.4" y1="1.55" x2="2.1" y2="1.55"/>
      <line x1="2.0" y1="1.4" x2="2.25" y2="1.55"/>
      <line x1="2.0" y1="1.7" x2="2.25" y2="1.55"/>
      </g>
    </svg>
  ),
  US: (
    <svg viewBox="0 0 3 2" aria-hidden="true" focusable="false">
      <rect width="3" height="2" fill="#B22234"/>
      <g fill="#fff"><rect y="0.1538" width="3" height="0.1538"/>
      <rect y="0.4614" width="3" height="0.1538"/>
      <rect y="0.769" width="3" height="0.1538"/>
      <rect y="1.0766" width="3" height="0.1538"/>
      <rect y="1.3842" width="3" height="0.1538"/>
      <rect y="1.6918" width="3" height="0.1538"/>
      </g><rect width="1.2" height="1.0769" fill="#3C3B6E"/>
    </svg>
  ),
} satisfies Record<string, ReactElement>

type FlagProps = {
  /** Code pays ISO 3166-1 alpha-2. */
  country: CountryCode
  /** Nom du pays, lu par les lecteurs d'écran. Omis pour un drapeau décoratif. */
  title?: string
  className?: string
}

export function Flag({ country, title, className = 'flag' }: FlagProps) {
  return (
    <span className={className} role={title ? 'img' : undefined} aria-label={title} title={title}>
      {FLAG_SHAPES[country]}
    </span>
  )
}
