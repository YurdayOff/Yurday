import { Reveal } from '@/components/ui/Reveal'
import type { Messages } from '@/i18n/messages'
import { site } from '@/lib/site'
import { ContactForm } from './ContactForm'
import './Contact.css'

/** Dernière section : le formulaire de projet. */
export function Contact({ messages }: { messages: Messages }) {
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
              {contact.note.after}
            </div>
          </Reveal>
          <ContactForm form={contact.form} />
        </div>
      </div>
    </section>
  )
}
