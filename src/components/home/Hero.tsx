import { HeroSection } from '@/components/ui/HeroSection'
import type { Messages } from '@/i18n/messages'
import { TrustBar } from './TrustBar'

type HeroProps = {
  messages: Messages
  /** Chemin de la page courante, pour les ancres internes. */
  home: string
}

export function Hero({ messages }: HeroProps) {
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
        {hero.title.highlight}
      </h1>
      <TrustBar messages={messages} />
    </HeroSection>
  )
}
