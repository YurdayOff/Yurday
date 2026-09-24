import Link from 'next/link'
import { HeroSection } from '@/components/ui/HeroSection'
import type { Messages } from '@/i18n/messages'
import { TrustBar } from './TrustBar'

type HeroProps = {
  messages: Messages
}

const HERO_VIDEO = {
  src: '/video/hero-yurday.mp4',
  poster: '/images/hero-video-poster.webp',
}

export function Hero({ messages }: HeroProps) {
  const { hero } = messages

  return (
    <HeroSection video={HERO_VIDEO}>
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
