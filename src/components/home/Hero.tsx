import Link from 'next/link'
import { HeroSection } from '@/components/ui/HeroSection'
import type { Messages } from '@/i18n/messages'
import { TrustBar } from './TrustBar'

type HeroProps = {
  messages: Messages
}

/**
 * Photo choisie parmi les moments clients encore inédits ailleurs sur le site
 * (voir le commentaire dans `data/moments.ts` : celles du carrousel « Vraies
 * histoires » ne sont jamais réutilisées).
 */
const HERO_PHOTO = {
  src: '/images/moment-pique-nique.webp',
  alt: 'Un pique-nique au coucher du soleil face à la tour Eiffel, l’une des journées imaginées par Yurday.',
}

export function Hero({ messages }: HeroProps) {
  const { hero } = messages

  return (
    <HeroSection photo={HERO_PHOTO}>
      <h1>
        {hero.title.lead}
        <em>{hero.title.em}</em>
      </h1>
      <p className="lede">{hero.lede}</p>
      <Link href="#moments" className="hero-examples-link">
        {hero.examplesLink}
      </Link>
      <TrustBar messages={messages} />
    </HeroSection>
  )
}
