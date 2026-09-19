import Link from 'next/link'
import { moments as momentList } from '@/data/moments'
import type { Messages } from '@/i18n/messages'
import { MomentSpotlight } from './MomentSpotlight'
import { SectionHead } from './SectionHead'
import './Moments.css'

type MomentsProps = {
  messages: Messages
  /** Chemin de la page courante, pour l'ancre vers le formulaire. */
  home: string
}

/** Vraies histoires clients, présentées une à une en grand format. */
export function Moments({ messages, home }: MomentsProps) {
  const { moments } = messages

  const items = momentList.map(({ id, image }) => {
    const item = moments.items[id as keyof typeof moments.items]
    return { id, image, title: item.title, story: item.story }
  })

  return (
    <section id="moments" className="section-coral">
      <div className="container">
        <SectionHead eyebrow={moments.eyebrow} title={moments.h2} lede={moments.lede} />

        <MomentSpotlight
          items={items}
          previousLabel={messages.a11y.previousStory}
          nextLabel={messages.a11y.nextStory}
        />

        <div className="moment-cta-wrap">
          <Link href={`${home}#contact`} className="btn btn-white">
            {moments.cta}
          </Link>
        </div>
      </div>
    </section>
  )
}
