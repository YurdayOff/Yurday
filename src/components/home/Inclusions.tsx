import { Reveal } from '@/components/ui/Reveal'
import { Stagger } from '@/components/ui/Stagger'
import '@/components/ui/Ticket.css'
import type { Messages } from '@/i18n/messages'
import { SectionHead } from './SectionHead'
import './Inclusions.css'

const icons = {
  comediens: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 19c0-3 2.2-5 5-5s5 2 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M15 6.5c1.3.3 2.2 1.4 2.2 2.8S16.3 12 15 12.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M16.5 14c2 .4 3.5 2.1 3.5 4.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  lieux: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  surprises: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
      <rect x="4" y="10" width="16" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 14h16" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 10v10" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M12 10c-1-2.4-2.8-3.5-4.2-3.1-1.3.4-1.3 2.2.3 2.7.9.3 2.4.4 3.9.4zM12 10c1-2.4 2.8-3.5 4.2-3.1 1.3.4 1.3 2.2-.3 2.7-.9.3-2.4.4-3.9.4z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  ),
  gastronomie: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
      <path d="M7 3v8a2 2 0 0 0 4 0V3M9 3v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M9 11v10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M17 3c-1.7 0-3 2-3 5s1.3 4 3 4M17 3v18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  souvenir: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 6l1.6-2.4h4.8L16 6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="3.4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  coordination: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
} as const

/** Ce qu'une journée Yurday peut assembler, pour donner un sentiment de richesse concret. */
export function Inclusions({ messages }: { messages: Messages }) {
  const { inclusions } = messages
  const items = [
    { key: 'comediens', ...inclusions.items.comediens },
    { key: 'lieux', ...inclusions.items.lieux },
    { key: 'surprises', ...inclusions.items.surprises },
    { key: 'gastronomie', ...inclusions.items.gastronomie },
    { key: 'souvenir', ...inclusions.items.souvenir },
    { key: 'coordination', ...inclusions.items.coordination },
  ] as const

  return (
    <section id="inclusions" className="section-paper-deep">
      <div className="container">
        <SectionHead eyebrow={inclusions.eyebrow} title={inclusions.h2} lede={inclusions.lede} />
        <Stagger className="inclusions-grid">
          {items.map((item) => (
            <div className="ticket inclusion-card stagger-item" key={item.key}>
              <span className="inclusion-icon">{icons[item.key]}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
