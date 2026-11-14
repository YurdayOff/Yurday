import Link from 'next/link'
import { HashLink } from '@/components/ui/HashLink'
import { Reveal } from '@/components/ui/Reveal'
import type { Locale } from '@/i18n/config'
import type { Messages } from '@/i18n/messages'
import { occasionPath } from '@/lib/occasions'
import './Occasions.css'

type OccasionsProps = {
  messages: Messages
  locale: Locale
}

/** Bandeau manifeste : aucune occasion n'est nécessaire pour offrir une journée. */
export function Occasions({ messages, locale }: OccasionsProps) {
  const { occasions } = messages
  const entreprises = messages.occasionPages.entreprises

  return (
    <section id="occasions" className="occasions-banner">
      <div className="container">
        <Reveal className="occasions-banner-inner">
          <h2>{occasions.h2}</h2>
          <p>{occasions.lede}</p>
          <HashLink href="#contact" className="occasions-banner-cta">
            {occasions.scenariosCta}
          </HashLink>
        </Reveal>

        <Reveal className="occasions-b2b">
          <Link href={occasionPath('entreprises', locale)} className="occasions-b2b-link">
            <span className="occasions-b2b-eyebrow">{entreprises.eyebrow}</span>
            <span className="occasions-b2b-title">{entreprises.title.lead}</span>
            <span className="occasions-b2b-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
