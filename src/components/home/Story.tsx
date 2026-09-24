import { Reveal } from '@/components/ui/Reveal'
import type { Messages } from '@/i18n/messages'
import { SectionHead } from './SectionHead'
import './Story.css'

/** Récit des fondateurs et présentation de l'équipe. */
export function Story({ messages }: { messages: Messages }) {
  const { story } = messages

  return (
    <section id="notre-histoire">
      <div className="container">
        <SectionHead eyebrow={story.eyebrow} title={story.h2} />

        <div className="histoire-wrap">
          <Reveal className="histoire-photo">
            <video
              className="histoire-video"
              src="/video/notre-histoire.mp4"
              poster="/images/notre-histoire-poster.webp"
              controls
              playsInline
              preload="none"
              width={720}
              height={1280}
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
            <p className="founders-signature">{story.signature}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
