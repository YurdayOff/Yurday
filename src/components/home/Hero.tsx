import Link from 'next/link'
import { HeroSection } from '@/components/ui/HeroSection'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import type { Messages } from '@/i18n/messages'
import { site } from '@/lib/site'
import { TrustBar } from './TrustBar'

type HeroProps = {
  messages: Messages
  /** Chemin de la page courante, pour l'ancre du formulaire. */
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
      </h1>
      <p className="lede">{hero.lede}</p>
      <div className="hero-actions">
        <a href={site.whatsapp.url} target="_blank" rel="noopener" className="btn btn-primary">
          <WhatsAppIcon size={18} />
          {messages.shared.ctaWhatsapp}
        </a>
        <Link href={`${home}#contact`} className="btn btn-ghost">
          {messages.shared.ctaEmail}
        </Link>
      </div>
      <TrustBar messages={messages} />
    </HeroSection>
  )
}
