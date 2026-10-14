import { PhoneIcon } from '@/components/ui/PhoneIcon'
import { Reveal } from '@/components/ui/Reveal'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import type { Messages } from '@/i18n/messages'
import { site, whatsappLink } from '@/lib/site'
import { ContactForm } from './ContactForm'
import './Contact.css'

type ContactProps = {
  messages: Messages
  /** Formulaire exceptionnellement adapté à une demande de séminaire d'entreprise. */
  seminar?: boolean
}

/** Dernière section : le formulaire de projet. */
export function Contact({ messages, seminar = false }: ContactProps) {
  const { contact } = messages

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-wrap">
          <Reveal className="contact-side">
            <div className="eyebrow">{contact.eyebrow}</div>
            <h2>{contact.h2}</h2>
            <p>{contact.lede}</p>
            <div className="contact-note">
              {contact.note.before} <a href={`mailto:${site.email}`}>{site.email}</a>
              {contact.note.middle} <a href={`tel:+${site.whatsapp.number}`}>{site.whatsapp.displayNumber}</a>
              {contact.note.after}
            </div>
            <div className="contact-direct">
              <span className="contact-direct-lead">{contact.direct.lead}</span>
              <div className="contact-direct-btns">
                <a href={`tel:+${site.whatsapp.number}`} className="contact-direct-btn">
                  <PhoneIcon size={18} />
                  <span>
                    {contact.direct.call} <strong>{site.whatsapp.displayNumber}</strong>
                  </span>
                </a>
                <a
                  href={whatsappLink(messages.shared.whatsappMessage)}
                  target="_blank"
                  rel="noopener"
                  className="contact-direct-btn contact-direct-btn--wa"
                >
                  <WhatsAppIcon size={18} />
                  <span>{contact.direct.whatsapp}</span>
                </a>
              </div>
            </div>
          </Reveal>
          <ContactForm
            form={contact.form}
            seminar={seminar}
            fixedOccasion={seminar ? messages.occasions.cards['seminaire-entreprise'] : undefined}
          />
        </div>
      </div>
    </section>
  )
}
