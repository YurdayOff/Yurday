import { HashLink } from '@/components/ui/HashLink'
import { Reveal } from '@/components/ui/Reveal'
import '@/components/ui/Ticket.css'
import type { Messages } from '@/i18n/messages'
import './Occasions.css'

type OccasionsProps = {
  messages: Messages
}

/** Bandeau manifeste : aucune occasion n'est nécessaire pour offrir une journée. */
export function Occasions({ messages }: OccasionsProps) {
  const { occasions } = messages

  return (
    <section id="occasions" className="occasions-banner">
      <div className="container">
        <Reveal className="occasions-banner-inner">
          <h2>{occasions.h2}</h2>
          <p>{occasions.lede}</p>
        </Reveal>

        <Reveal className="occasions-scenarios">
          <p className="occasions-scenarios-label">{occasions.scenariosLabel}</p>
          <div className="occasions-scenarios-grid">
            {occasions.scenarios.map((scenario) => (
              <div className="ticket occasions-scenario-card" key={scenario.title}>
                <h3>{scenario.title}</h3>
                <p className="occasions-scenario-tagline">{scenario.tagline}</p>
                {scenario.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>
          <p className="occasions-scenarios-footer">{occasions.scenariosFooter}</p>
          <HashLink href="#contact" className="occasions-scenarios-cta">
            {occasions.scenariosCta}
          </HashLink>
        </Reveal>
      </div>
    </section>
  )
}
