import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'
import type { Messages } from '@/i18n/messages'
import { occasionImage, occasionKeys } from '@/lib/occasions'
import { SectionHead } from './SectionHead'
import './Moments.css'

type MomentsProps = { messages: Messages }

/** Carrousel de vrais moments vécus par des clients, un par occasion phare. */
export function Moments({ messages }: MomentsProps) {
  const { moments } = messages

  return (
    <section id="moments" className="section-paper-rose">
      <div className="container">
        <SectionHead eyebrow={moments.eyebrow} title={moments.h2} lede={moments.lede} />
      </div>

      <Reveal className="moment-scroll">
        {occasionKeys.map((key) => (
          <figure className="moment-slide" key={key}>
            <Image
              src={occasionImage(key)}
              alt={moments.items[key]}
              width={520}
              height={650}
              sizes="(max-width: 640px) 78vw, 320px"
            />
            <figcaption className="moment-caption">{moments.items[key]}</figcaption>
          </figure>
        ))}
      </Reveal>
    </section>
  )
}
