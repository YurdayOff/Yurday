import Image from 'next/image'
import { HashLink } from '@/components/ui/HashLink'
import { Reveal } from '@/components/ui/Reveal'
import type { Messages } from '@/i18n/messages'
import './ClosingCta.css'

/** Dernière relance, juste avant le formulaire : « à qui pensez-vous ? » */
export function ClosingCta({ messages }: { messages: Messages }) {
  const { closing } = messages.home

  return (
    <section className="sec invite-sec">
      <div className="wrap invite">
        <Reveal className="invite-pic" as="div">
          <Image
            src="/images/r-couple.jpg"
            alt={closing.title.em}
            width={900}
            height={620}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </Reveal>
        <Reveal className="invite-txt">
          <span className="eyebrow">{closing.eyebrow}</span>
          <h2 className="display">
            {closing.title.lead}
            <em>{closing.title.em}</em>
          </h2>
          <p className="text">{closing.text}</p>
          <HashLink href="#contact" className="btn btn-primary">
            {closing.cta}
          </HashLink>
        </Reveal>
      </div>
    </section>
  )
}
