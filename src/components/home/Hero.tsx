import { HeroSection } from '@/components/ui/HeroSection'
import type { Messages } from '@/i18n/messages'

type HeroProps = {
  messages: Messages
}

const HERO_VIDEO = {
  src: '/video/hero-film.mp4',
  srcSd: '/video/hero-film-sd.mp4',
  poster: '/images/hero-poster.jpg',
}

/**
 * Premier écran volontairement nu : juste le titre, porté par la vidéo.
 * Le reste (présentation, contact, chiffres) vit plus bas, pour laisser
 * la vidéo porter seule l'impression à l'arrivée.
 */
export function Hero({ messages }: HeroProps) {
  const { hero, shared } = messages
  return (
    <HeroSection
      video={{
        ...HERO_VIDEO,
        pauseLabel: shared.pause,
        playLabel: shared.play,
        scrollLabel: shared.discover,
      }}
    >
      <span className="eyebrow">{hero.eyebrow}</span>
      <h1>
        {hero.title.lead}
        <br />
        <em>{hero.title.em}</em>
      </h1>
    </HeroSection>
  )
}
