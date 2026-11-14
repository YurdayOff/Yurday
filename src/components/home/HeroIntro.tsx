import { HashLink } from '@/components/ui/HashLink'
import { PhoneIcon } from '@/components/ui/PhoneIcon'
import type { Messages } from '@/i18n/messages'
import { site } from '@/lib/site'
import { TrustBar } from './TrustBar'
import './HeroIntro.css'

/**
 * Juste après le premier écran (vidéo + titre + un bouton) : le détail du
 * projet, le contact direct, puis les chiffres. Respire, hors du cadre vidéo.
 */
export function HeroIntro({ messages }: { messages: Messages }) {
  const { hero } = messages

  return (
    <section className="hero-intro">
      <div className="container">
        <p className="lede">{hero.lede}</p>
        <div className="hero-intro-links">
          <a href={`tel:+${site.whatsapp.number}`} className="hero-call">
            <PhoneIcon size={16} />
            <span>
              {hero.callUs} <strong>{site.whatsapp.displayNumber}</strong>
            </span>
          </a>
          <HashLink href="#moments" className="hero-examples-link">
            {hero.examplesLink}
          </HashLink>
        </div>
        <TrustBar messages={messages} />
      </div>
    </section>
  )
}
