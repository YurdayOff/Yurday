import type { ReactNode } from 'react'
import { HeroBgVideo } from './HeroBgVideo'
import './HeroSection.css'

type HeroSectionProps = {
  children: ReactNode
  /** Variante resserrée utilisée par les pages occasion. */
  compact?: boolean
  /** Vidéo plein cadre en fond, texte en blanc par-dessus (page d'accueil uniquement). */
  video?: { src: string; poster: string }
}

export function HeroSection({ children, compact = false, video }: HeroSectionProps) {
  if (video) {
    return (
      <section className="hero hero--video">
        <HeroBgVideo src={video.src} poster={video.poster} />
        <div className="hero-video-overlay" aria-hidden="true" />
        <div className="hero-inner">{children}</div>
      </section>
    )
  }

  return (
    <section className={compact ? 'hero hero--compact' : 'hero'}>
      <div className="hero-inner">{children}</div>
    </section>
  )
}
