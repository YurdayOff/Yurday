import { Reveal } from '@/components/ui/Reveal'
import type { Messages } from '@/i18n/messages'
import './HeroIntro.css'

/**
 * Manifeste centré juste après le hero : « La maison Yurday ». Reprend la
 * place de l'ancien bandeau de chiffres, pour laisser l'image du hero
 * porter seule la première impression et le propos s'installer ensuite.
 */
export function HeroIntro({ messages }: { messages: Messages }) {
  const { heroIntro } = messages

  return (
    <section className="hero-intro">
      <div className="container">
        <Reveal className="hero-intro-inner">
          <span className="eyebrow">{heroIntro.eyebrow}</span>
          <h2>
            {heroIntro.statement.lead}
            <em>{heroIntro.statement.em}</em>
          </h2>
          <p>{heroIntro.text}</p>
        </Reveal>
      </div>
    </section>
  )
}
