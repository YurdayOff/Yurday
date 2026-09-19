import Image from 'next/image'
import type { ReactNode } from 'react'
import './HeroSection.css'

type HeroSectionProps = {
  children: ReactNode
  /** Variante resserrée utilisée par les pages occasion. */
  compact?: boolean
  /** Photo en fond plein cadre (accueil uniquement). */
  image?: { src: string; alt: string }
}

export function HeroSection({ children, compact = false, image }: HeroSectionProps) {
  const classes = [
    'hero',
    compact ? 'hero--compact' : '',
    image ? 'hero--with-photo' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={classes}>
      {image ? (
        <div className="hero-photo" aria-hidden="true">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="hero-scrim" />
        </div>
      ) : null}
      <div className="hero-inner">
        <div className="hero-content">{children}</div>
      </div>
    </section>
  )
}
