import Image from 'next/image'
import Link from 'next/link'
import { moments as momentList } from '@/data/moments'
import { Reveal } from '@/components/ui/Reveal'
import type { Messages } from '@/i18n/messages'
import { SectionHead } from './SectionHead'
import './Moments.css'

type MomentsProps = {
  messages: Messages
  /** Chemin de la page courante, pour l'ancre vers le formulaire. */
  home: string
}

/** Vraies histoires clients, chacune en grand chapitre plein cadre. */
export function Moments({ messages, home }: MomentsProps) {
  const { moments } = messages

  return (
    <section id="moments">
      <div className="moments-head-band">
        <div className="container">
          <SectionHead eyebrow={moments.eyebrow} title={moments.h2} lede={moments.lede} />
        </div>
      </div>

      <div className="moment-chapters">
        {momentList.map(({ id, image }) => {
          const item = moments.items[id as keyof typeof moments.items]
          return (
            <Reveal className="moment-chapter" key={id}>
              <div className="moment-chapter-photo">
                <Image
                  src={image}
                  alt={item.title}
                  width={720}
                  height={540}
                  sizes="(max-width: 780px) 100vw, 50vw"
                />
              </div>
              <div className="moment-chapter-text">
                <h3>{item.title}</h3>
                <p>{item.story}</p>
              </div>
            </Reveal>
          )
        })}
      </div>

      <div className="container">
        <div className="moment-cta-wrap">
          <Link href={`${home}#contact`} className="btn btn-primary">
            {moments.cta}
          </Link>
        </div>
      </div>
    </section>
  )
}
