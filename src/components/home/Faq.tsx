'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import type { Messages } from '@/i18n/messages'
import { SectionHead } from './SectionHead'
import './Faq.css'

type FaqProps = {
  messages: Messages
  /** Chemin de la page d'accueil, pour l'ancre du formulaire. */
  home: string
}

/** Accordéon : une seule réponse ouverte à la fois. */
export function Faq({ messages, home }: FaqProps) {
  const { faq } = messages
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <SectionHead eyebrow={faq.eyebrow} title={faq.h2} />

        <div className="faq-list">
          {faq.items.map((item, index) => {
            const open = openIndex === index
            const panelId = `faq-answer-${index}`

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
          <Link href={`${home}#contact`} className="btn btn-primary">
            {messages.nav.cta}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
