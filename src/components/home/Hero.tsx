import { HashLink } from '@/components/ui/HashLink'
import { HeroSection } from '@/components/ui/HeroSection'
import type { Messages } from '@/i18n/messages'

type HeroProps = {
  messages: Messages
}

const HERO_VIDEO = {
  src: '/video/hero-yurday.mp4',
  poster: '/images/hero-video-poster.webp',
}

/**
 * Premier écran volontairement nu : juste le titre et un appel à l'action.
 * Le reste (détail, contact direct, chiffres) vit dans HeroIntro, juste en
 * dessous, pour laisser la vidéo porter seule l'impression à l'arrivée.
 */
export function Hero({ messages }: HeroProps) {
  const { hero } = messages

  return (
    <HeroSection video={HERO_VIDEO}>
      <h1>
        {hero.title.lead}
        <br />
        <em>{hero.title.em}</em>
      </h1>
      <div className="hero-actions">
        <HashLink href="#contact" className="btn btn-primary">
          {messages.nav.cta}
        </HashLink>
      </div>
    </HeroSection>
  )
}
