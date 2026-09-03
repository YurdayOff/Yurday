import { Marker } from '@/components/ui/Marker'
import { Reveal } from '@/components/ui/Reveal'
import type { Messages } from '@/i18n/messages'
import './Concept.css'

/** Phrase manifeste : l'occasion importe moins que la personne. */
export function Concept({ messages }: { messages: Messages }) {
  const { concept } = messages

  return (
    <section id="concept" className="section-paper-deep">
      <div className="container">
        <Reveal as="p" className="concept-statement">
          {concept.lead}
          <Marker>{concept.highlight}</Marker>
          {concept.tail}
        </Reveal>
      </div>
    </section>
  )
}
