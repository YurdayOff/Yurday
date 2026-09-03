import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import type { Messages } from '@/i18n/messages'
import { site } from '@/lib/site'
import './PromoBanner.css'

/** Bandeau de rareté, juste sous l'en-tête. */
export function PromoBanner({ messages }: { messages: Messages }) {
  return (
    <div className="promo-banner">
      <div className="container promo-banner-inner">
        <span>{messages.promo.text}</span>
        <a
          href={site.whatsapp.url}
          target="_blank"
          rel="noopener"
          className="promo-link"
        >
          <WhatsAppIcon size={16} className="promo-wa-icon" />
          <span>{messages.promo.cta}</span>
        </a>
      </div>
    </div>
  )
}
