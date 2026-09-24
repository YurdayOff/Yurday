import type { Messages } from '@/i18n/messages'
import './PromoBanner.css'

/** Bandeau de rareté, juste sous l'en-tête. */
export function PromoBanner({ messages }: { messages: Messages }) {
  return (
    <div className="promo-banner">
      <div className="container promo-banner-inner">
        <span>{messages.promo.text}</span>
      </div>
    </div>
  )
}
