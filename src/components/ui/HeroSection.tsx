import Image from 'next/image'
import type { ReactNode } from 'react'
import './HeroSection.css'

type HeroSectionProps = {
  children: ReactNode
  /** Variante resserrée utilisée par les pages occasion. */
  compact?: boolean
  /** Photo affichée à côté du texte (accueil uniquement). */
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
      <div className="hero-inner">
        <div className="hero-content">{children}</div>
        {image ? (
          <div className="hero-photo">
            <Image
              src={image.src}
              alt={image.alt}
              width={900}
              height={506}
              priority
              sizes="(max-width: 900px) 100vw, 520px"
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
