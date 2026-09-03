import { Stars } from '@/components/ui/Stars'
import type { Messages } from '@/i18n/messages'
import { site } from '@/lib/site'
import { CountUp } from './CountUp'
import './TrustBar.css'

/** Note, nombre de journées organisées, promesse de sur-mesure. */
export function TrustBar({ messages }: { messages: Messages }) {
  return (
    <div className="trustbar">
      <div className="trust-item">
        <Stars label={messages.trust.starsLabel} />
        <div className="trust-label">{messages.trust.starsLabel}</div>
      </div>
      <div className="trust-item">
        <CountUp target={site.daysOrganised} suffix="+" className="trust-num" />
        <div className="trust-label">{messages.trust.daysLabel}</div>
      </div>
      <div className="trust-item">
        <CountUp target={100} suffix="%" className="trust-num" />
        <div className="trust-label">{messages.trust.bespokeLabel}</div>
      </div>
    </div>
  )
}
