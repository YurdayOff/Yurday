import { PhoneIcon } from '@/components/ui/PhoneIcon'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { site, whatsappLink } from '@/lib/site'
import './WhatsAppFloat.css'

type WhatsAppFloatProps = {
  label: string
  message: string
  phoneLabel: string
}

/** Boutons de contact permanents, en bas de l'écran : WhatsApp, et l'appel sur mobile. */
export function WhatsAppFloat({ label, message, phoneLabel }: WhatsAppFloatProps) {
  return (
    <>
      <a className="phone-float" href={`tel:+${site.whatsapp.number}`} aria-label={phoneLabel}>
        <PhoneIcon size={26} />
      </a>
      <a
        className="wa-float"
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener"
        aria-label={label}
      >
        <WhatsAppIcon size={36} />
      </a>
    </>
  )
}
