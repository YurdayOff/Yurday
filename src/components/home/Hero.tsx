import { HashLink } from '@/components/ui/HashLink'
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
        <br />
        <em>{hero.title.em}</em>
      </h1>
      <p className="lede">{hero.lede}</p>
      <div className="hero-actions">
        <HashLink href="#contact" className="btn btn-primary">
          {messages.nav.cta}
        </HashLink>
      </div>
      <HashLink href="#moments" className="hero-examples-link">
        {hero.examplesLink}
      </HashLink>
      <TrustBar messages={messages} />
    </HeroSection>
  )
}
