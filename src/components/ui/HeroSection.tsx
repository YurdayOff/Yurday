import Image from 'next/image'
import type { ReactNode } from 'react'
import './HeroSection.css'

type HeroSectionProps = {
  children: ReactNode
  /** Variante resserrée utilisée par les pages occasion. */
  compact?: boolean
  /** Photo affichée à côté du texte (page d'accueil uniquement). */
  photo?: { src: string; alt: string }
}

export function HeroSection({ children, compact = false, photo }: HeroSectionProps) {
  if (photo) {
    return (
      <section className="hero hero--split">
        <div className="hero-inner">
          <div className="hero-copy">{children}</div>
          <div className="hero-photo">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={720}
              height={900}
              sizes="(max-width: 960px) 100vw, 480px"
              priority
            />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={compact ? 'hero hero--compact' : 'hero'}>
      <div className="hero-inner">{children}</div>
    </section>
  )
}
