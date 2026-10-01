import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { whatsappLink } from '@/lib/site'
import './WhatsAppFloat.css'

/** Bouton d'appel permanent, en bas de l'écran. */
export function WhatsAppFloat({ label, message }: { label: string; message: string }) {
  return (
    <a
      className="wa-float"
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener"
      aria-label={label}
    >
      <WhatsAppIcon size={36} />
    </a>
  )
}
