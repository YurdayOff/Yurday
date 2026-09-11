import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'
import { Stagger } from '@/components/ui/Stagger'
import { Perforation, TicketNotches } from '@/components/ui/Ticket'
import type { Messages } from '@/i18n/messages'
import { occasionImage, occasionKeys } from '@/lib/occasions'
import { SectionHead } from './SectionHead'
import './Moments.css'

type MomentsProps = { messages: Messages }

/** Galerie de vrais moments vécus par des clients, un par occasion phare. */
export function Moments({ messages }: MomentsProps) {
  const { moments } = messages

  return (
    <section id="moments" className="section-paper-deep">
      <div className="container">
        <SectionHead eyebrow={moments.eyebrow} title={moments.h2} lede={moments.lede} />

        <Stagger className="moment-grid">
          {occasionKeys.map((key) => (
            <Reveal as="figure" key={key} className="ticket moment-card stagger-item">
              <TicketNotches />
              <div className="moment-photo">
                <Image
                  src={occasionImage(key)}
                  alt={moments.items[key]}
                  width={520}
                  height={650}
                  sizes="(max-width: 560px) 100vw, 300px"
                />
              </div>
              <Perforation />
              <figcaption className="moment-text">{moments.items[key]}</figcaption>
            </Reveal>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
