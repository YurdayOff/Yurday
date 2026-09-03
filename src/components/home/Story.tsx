import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'
import type { Messages } from '@/i18n/messages'
import { site } from '@/lib/site'
import { SectionHead } from './SectionHead'
import './Story.css'

/** Récit des fondateurs et présentation de l'équipe. */
export function Story({ messages }: { messages: Messages }) {
  const { story } = messages

  return (
    <section id="notre-histoire" className="section-paper-deep">
      <div className="container">
        <SectionHead eyebrow={story.eyebrow} title={story.h2} />

        <div className="histoire-wrap">
          <Reveal className="histoire-photo">
            <Image
              src={site.images.founders}
              alt={`${site.founders.map((founder) => founder.name).join(' & ')} — ${story.transition}`}
              width={640}
              height={735}
              sizes="(max-width: 860px) 340px, 340px"
            />
          </Reveal>
          <Reveal className="founders-story">
            {story.paragraphs.map((lines, index) => (
              <p key={index}>
                {lines.map((line, lineIndex) => (
                  <span key={lineIndex}>
                    {lineIndex > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </p>
            ))}
          </Reveal>
        </div>

        <Reveal as="p" className="founders-transition">
          {story.transition}
        </Reveal>

        <div className="founders-wrap">
          {site.founders.map((founder) => (
            <Reveal key={founder.id} className="founder">
              <Image src={founder.photo} alt={founder.name} width={420} height={420} sizes="108px" />
              <h3>{founder.name}</h3>
              <p>{story.bios[founder.id]}</p>
              <a href={`mailto:${founder.email}`} className="founder-email">
                {founder.email}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
