import Link from 'next/link'
import type { ReactNode } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { Stagger } from '@/components/ui/Stagger'
import { Perforation } from '@/components/ui/Ticket'
import type { Locale } from '@/i18n/config'
import type { Messages } from '@/i18n/messages'
import { occasionKeys, occasionPath, type OccasionKey } from '@/lib/occasions'
import { SectionHead } from './SectionHead'
import './Occasions.css'

type OccasionsProps = {
  messages: Messages
  locale: Locale
}

/** Une icône trait fin par occasion, dans l'esprit des pictogrammes de TrustPillars. */
const icons: Record<OccasionKey, ReactNode> = {
  anniversaire: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
      <path
        d="M12 4c-1.2 1.6-1.8 2.7-1.8 3.6a1.8 1.8 0 0 0 3.6 0c0-.9-.6-2-1.8-3.6z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <rect x="10.3" y="9.3" width="3.4" height="9.2" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 20h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  'demande-en-mariage': (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
      <circle cx="12" cy="14.5" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9.3 8.6 12 4l2.7 4.6-2.7 2.2-2.7-2.2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
  'saint-valentin': (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
      <path
        d="M12 20s-7.5-4.6-9.8-9.1C.7 7.4 2.4 4 5.9 4c2 0 3.4 1.1 4.1 2.4.4.7.4.7.4.7s0 0 .4-.7C11.7 5.1 13.1 4 15.1 4c3.5 0 5.2 3.4 3.7 6.9C16.5 15.4 12 20 12 20z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  ),
  'evg-evjf': (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
      <path d="M6 4h4l-.6 5.4a1.4 1.4 0 0 1-1.4 1.2 1.4 1.4 0 0 1-1.4-1.2L6 4z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M8 10.6V16M6 19h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M14.5 6h4l-.5 5a1.3 1.3 0 0 1-1.3 1.1h-.4a1.3 1.3 0 0 1-1.3-1.1l-.5-5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M16.5 12.1V17M14.7 19.5h3.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  'fete-des-meres': (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
      <circle cx="12" cy="6.5" r="2.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 9v10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 14c-2 0-3.4-1-4-2.4M12 16.5c2 0 3.4-1 4-2.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
}

/** Grille des cinq occasions phares, puis les autres sous forme d'étiquettes. */
export function Occasions({ messages, locale }: OccasionsProps) {
  const { occasions } = messages

  return (
    <section id="occasions" className="section-paper-deep">
      <div className="container">
        <SectionHead eyebrow={occasions.eyebrow} title={occasions.h2} lede={occasions.lede} />

        <Stagger className="cat-grid">
          {occasionKeys.map((key) => (
            <Link
              key={key}
              href={occasionPath(key, locale)}
              className="ticket cat-card stagger-item"
            >
              <div className="cat-icon">{icons[key]}</div>
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
          <p className="occasion-tagline">{occasions.tagline}</p>
        </Reveal>
      </div>
    </section>
  )
}
