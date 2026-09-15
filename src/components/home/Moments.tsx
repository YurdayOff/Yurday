import Image from 'next/image'
import Link from 'next/link'
import { moments as momentList } from '@/data/moments'
import type { Messages } from '@/i18n/messages'
import { SectionHead } from './SectionHead'
import './Moments.css'

type MomentsProps = {
  messages: Messages
  /** Chemin de la page courante, pour l'ancre vers le formulaire. */
  home: string
}

/** Bandeau de vraies histoires clients, que le visiteur fait défiler lui-même. */
export function Moments({ messages, home }: MomentsProps) {
  const { moments } = messages

  return (
    <section id="moments" className="section-coral">
      <div className="container">
        <SectionHead eyebrow={moments.eyebrow} title={moments.h2} />
      </div>

      <div className="moment-scroll">
        {momentList.map(({ id, image }) => {
          const item = moments.items[id as keyof typeof moments.items]
          return (
            <article className="moment-card" key={id}>
              <div className="moment-photo">
                <Image src={image} alt={item.title} width={480} height={360} sizes="220px" />
              </div>
              <div className="moment-text">
                <h3>{item.title}</h3>
                <p>{item.story}</p>
              </div>
            </article>
          )
        })}
      </div>

      <p className="moment-hint">{moments.hint}</p>

      <div className="moment-cta-wrap">
        <Link href={`${home}#contact`} className="btn btn-white">
          {moments.cta}
        </Link>
      </div>
    </section>
  )
}
