import { Reveal } from '@/components/ui/Reveal'
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
      </div>
    </section>
  )
}
