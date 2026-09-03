import type { ReactNode } from 'react'
import './HeroSection.css'

type HeroSectionProps = {
  children: ReactNode
  /** Variante resserrée utilisée par les pages occasion. */
  compact?: boolean
}

export function HeroSection({ children, compact = false }: HeroSectionProps) {
  return (
    <section className={compact ? 'hero hero--compact' : 'hero'}>
      <div className="hero-inner">{children}</div>
    </section>
  )
}
