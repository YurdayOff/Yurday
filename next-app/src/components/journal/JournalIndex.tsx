import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/ui/Reveal'
import { journalArticles } from '@/data/journal'
import { journalArticlePath, type JournalLocale } from '@/lib/journal'
import { journalUi } from './journal-ui'
import './Journal.css'

export function JournalIndex({ locale }: { locale: JournalLocale }) {
  const ui = journalUi[locale]

  return (
    <section className="journal-index">
      <div className="container">
        <Reveal className="section-head">
          <div className="eyebrow">{ui.eyebrowIndex}</div>
          <h1>{ui.h2Index}</h1>
          <p>{ui.ledeIndex}</p>
        </Reveal>

        <div className="journal-grid">
          {journalArticles.map((article) => {
            const content = article.content[locale]
            return (
              <Reveal className="journal-card" key={article.id}>
                <Link href={journalArticlePath(article, locale)} className="journal-card-link">
                  <div className="journal-card-image">
                    <Image
                      src={article.image}
                      alt={content.title}
                      width={480}
                      height={320}
                      sizes="(max-width: 780px) 100vw, 33vw"
                    />
                  </div>
                  <div className="journal-card-body">
                    <h2>{content.title}</h2>
                    <p>{content.description}</p>
                    <span className="journal-card-cta">
                      {ui.readMore}
                      <span aria-hidden="true"> →</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
