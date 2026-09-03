import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/ui/Reveal'
import { Stagger } from '@/components/ui/Stagger'
import { Perforation, TicketNotches } from '@/components/ui/Ticket'
import type { Locale } from '@/i18n/config'
import type { Messages } from '@/i18n/messages'
import { occasionImage, occasionKeys, occasionPath } from '@/lib/occasions'
import { SectionHead } from './SectionHead'
import './Occasions.css'

type OccasionsProps = {
  messages: Messages
  locale: Locale
}

/** Grille des cinq occasions phares, puis les autres sous forme d'étiquettes. */
export function Occasions({ messages, locale }: OccasionsProps) {
  const { occasions } = messages

  return (
    <section id="occasions">
      <div className="container">
        <SectionHead eyebrow={occasions.eyebrow} title={occasions.h2} lede={occasions.lede} />

        <Stagger className="cat-grid">
          {occasionKeys.map((key) => (
            <Link
              key={key}
              href={occasionPath(key, locale)}
              className="ticket cat-card stagger-item"
            >
              <TicketNotches />
              <div className="cat-photo">
                <Image
                  src={occasionImage(key)}
                  alt={occasions.cards[key]}
                  width={520}
                  height={520}
                  sizes="(max-width: 560px) 100vw, 340px"
                />
              </div>
              <Perforation />
              <div className="cat-text">
                <h3>{occasions.cards[key]}</h3>
              </div>
            </Link>
          ))}
        </Stagger>

        <Reveal className="occasion-more">
          <div className="occasion-more-label">{occasions.moreLabel}</div>
          <Stagger className="chip-row">
            {occasions.chips.map((chip) => (
              <span key={chip} className="chip stagger-item">
                {chip}
              </span>
            ))}
          </Stagger>
        </Reveal>
      </div>
    </section>
  )
}
