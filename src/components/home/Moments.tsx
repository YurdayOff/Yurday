import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'
import type { Messages } from '@/i18n/messages'
import './Moments.css'

const CARDS = [
  { id: 'demande', image: '/images/r-demande.jpg' },
  { id: 'noces', image: '/images/r-noces.jpg' },
  { id: 'lettre', image: '/images/r-lettre.jpg' },
] as const

/** Trois moments vécus, en grille, juste après les deux duos. */
export function Moments({ messages }: { messages: Messages }) {
  const { moments } = messages

  return (
    <section className="sec white">
      <div className="wrap">
        <div className="head-c">
          <span className="eyebrow">{moments.eyebrow}</span>
          <h2 className="title">{moments.h2}</h2>
        </div>
        <div className="cards">
          {CARDS.map(({ id, image }) => {
            const item = moments.items[id as keyof typeof moments.items]
            return (
              <Reveal className="card" key={id}>
                <div className="ph">
                  <Image src={image} alt={item.subtitle} width={640} height={480} sizes="(max-width: 1000px) 100vw, 33vw" />
                </div>
                <span className="eyebrow">{item.eyebrow}</span>
                <div className="subtitle">{item.subtitle}</div>
                <p className="text">{item.text}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
