'use client'

import { useState } from 'react'
import { HashLink } from '@/components/ui/HashLink'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHead } from '@/components/home/SectionHead'
import type { Messages } from '@/i18n/messages'
import '@/components/home/Faq.css'

type OccasionFaqProps = {
  faq: NonNullable<Messages['occasionPages']['noel']['faq']>
  /** Ancre du formulaire de contact de la page (plus bas sur la même page). */
  contactHref: string
  ctaLabel: string
}

/** Accordéon FAQ propre à une page occasion (questions différentes de celles de l'accueil). */
export function OccasionFaq({ faq, contactHref, ctaLabel }: OccasionFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="section-paper-deep">
      <div className="container">
        <SectionHead eyebrow={faq.eyebrow} title={faq.h2} />

        <div className="faq-list">
          {faq.items.map((item, index) => {
            const open = openIndex === index
            const panelId = `occasion-faq-answer-${index}`

            return (
              <Reveal key={item.question} className={open ? 'faq-item open' : 'faq-item'}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span>{item.question}</span>
                  <span className="plus" aria-hidden="true">
                    +
                  </span>
                </button>
                <div className="faq-a" id={panelId} role="region">
                  <p>{item.answer}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="faq-closing">
          <p>{faq.closing}</p>
          <HashLink href={contactHref} className="btn btn-primary">
            {ctaLabel}
          </HashLink>
        </Reveal>
      </div>
    </section>
  )
}
