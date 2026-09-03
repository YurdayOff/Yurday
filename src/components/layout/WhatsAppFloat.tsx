import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { site } from '@/lib/site'
import './WhatsAppFloat.css'

/** Bouton d'appel permanent, en bas de l'écran. */
export function WhatsAppFloat({ label }: { label: string }) {
  return (
    <a
      className="wa-float"
      href={site.whatsapp.url}
      target="_blank"
      rel="noopener"
      aria-label={label}
    >
      <WhatsAppIcon size={36} />
    </a>
  )
}
