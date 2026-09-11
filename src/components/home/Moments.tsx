import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'
import { moments as momentList } from '@/data/moments'
import type { Messages } from '@/i18n/messages'
import { SectionHead } from './SectionHead'
import './Moments.css'

type MomentsProps = { messages: Messages }

/** Carrousel de vrais moments vécus par des clients, photo et histoire à l'appui. */
export function Moments({ messages }: MomentsProps) {
  const { moments } = messages

  return (
    <section id="moments" className="section-coral">
      <div className="container">
        <SectionHead eyebrow={moments.eyebrow} title={moments.h2} />
      </div>

      <Reveal className="moment-scroll">
        {momentList.map(({ id, image }) => {
          const item = moments.items[id as keyof typeof moments.items]
          return (
            <article className="moment-card" key={id}>
              <div className="moment-photo">
                <Image
                  src={image}
                  alt={item.title}
                  width={520}
                  height={420}
                  sizes="(max-width: 640px) 82vw, 340px"
                />
              </div>
              <div className="moment-text">
                <h3>{item.title}</h3>
                <p>{item.story}</p>
              </div>
            </article>
          )
        })}
      </Reveal>
    </section>
  )
}
