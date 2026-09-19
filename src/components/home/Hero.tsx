import Link from 'next/link'
import { HeroSection } from '@/components/ui/HeroSection'
import { Marker } from '@/components/ui/Marker'
import type { Messages } from '@/i18n/messages'
import { TrustBar } from './TrustBar'

type HeroProps = {
  messages: Messages
  /** Chemin de la page courante, pour les ancres internes. */
  home: string
}

export function Hero({ messages, home }: HeroProps) {
  const { hero } = messages

  return (
    <HeroSection>
      <div className="eyebrow">{hero.eyebrow}</div>
      <h1>
        {hero.title.lead}
        <em>{hero.title.em}</em>
        {hero.title.tail}
        <br />
        {hero.title.line2}
        <Marker>{hero.title.highlight}</Marker>
      </h1>
      <div className="hero-actions">
        <Link href={`${home}#contact`} className="btn btn-primary">
          {messages.nav.cta}
        </Link>
      </div>
      <TrustBar messages={messages} />
    </HeroSection>
  )
}
