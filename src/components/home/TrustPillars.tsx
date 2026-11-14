import type { Messages } from '@/i18n/messages'
import './TrustPillars.css'

const numerals = ['I', 'II', 'III'] as const

/** Trois réassurances clés, juste avant le formulaire. */
export function TrustPillars({ messages }: { messages: Messages }) {
  const { trustPillars } = messages
  const items = [trustPillars.discretion, trustPillars.payment, trustPillars.response]

  return (
    <section className="trust-pillars">
      <div className="container">
        <div className="trust-pillars-row">
          {items.map((item, index) => (
            <div className="trust-pillar" key={item.title}>
              <span className="trust-pillar-num" aria-hidden="true">
                {numerals[index]}
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
