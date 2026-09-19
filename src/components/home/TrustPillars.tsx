import type { Messages } from '@/i18n/messages'
import './TrustPillars.css'

const icons = {
  discretion: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
      <path
        d="M12 3l7 3v5c0 4.5-3 8.2-7 9.5-4-1.3-7-5-7-9.5V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 12l1.8 1.8L14.8 10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  payment: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 14.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  response: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
} as const

/** Trois réassurances clés, juste avant le formulaire. */
export function TrustPillars({ messages }: { messages: Messages }) {
  const { trustPillars } = messages
  const items = [
    { key: 'discretion', ...trustPillars.discretion },
    { key: 'payment', ...trustPillars.payment },
    { key: 'response', ...trustPillars.response },
  ] as const

  return (
    <section className="trust-pillars">
      <div className="container">
        <div className="trust-pillars-grid">
          {items.map((item) => (
            <div className="trust-pillar" key={item.key}>
              <span className="trust-pillar-icon">{icons[item.key]}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
