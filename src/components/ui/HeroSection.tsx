import type { ReactNode } from 'react'
import { HeroBgVideo } from './HeroBgVideo'
import './HeroSection.css'

type HeroSectionProps = {
  children: ReactNode
  /** Variante resserrée utilisée par les pages occasion. */
  compact?: boolean
  /** Vidéo plein cadre en fond, texte en blanc par-dessus (page d'accueil uniquement). */
  video?: {
    src: string
    srcSd?: string
    poster: string
    pauseLabel: string
    playLabel: string
    scrollLabel: string
  }
}

export function HeroSection({ children, compact = false, video }: HeroSectionProps) {
  if (video) {
    return (
      <section className="hero hero--video">
        <HeroBgVideo
          src={video.src}
          srcSd={video.srcSd}
          poster={video.poster}
          pauseLabel={video.pauseLabel}
          playLabel={video.playLabel}
        />
        <div className="hero-video-overlay" aria-hidden="true" />
        <div className="hero-inner">{children}</div>
        <span className="hero-scroll" aria-hidden="true">
          {video.scrollLabel}
        </span>
      </section>
    )
  }

  return (
    <section className={compact ? 'hero hero--compact' : 'hero'}>
      <div className="hero-inner">{children}</div>
    </section>
  )
}
