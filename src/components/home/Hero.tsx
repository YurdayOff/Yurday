import { HeroSection } from '@/components/ui/HeroSection'
import type { Messages } from '@/i18n/messages'
import { TrustBar } from './TrustBar'

type HeroProps = {
  messages: Messages
}

export function Hero({ messages }: HeroProps) {
  const { hero } = messages

  return (
    <HeroSection>
      <h1>
        {hero.title.lead}
        <em>{hero.title.em}</em>
      </h1>
      <p className="lede">{hero.lede}</p>
      <TrustBar messages={messages} />
    </HeroSection>
  )
}
