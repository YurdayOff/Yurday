import Image from 'next/image'
import Link from 'next/link'
import { HashLink } from '@/components/ui/HashLink'
import { Reveal } from '@/components/ui/Reveal'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import type { JournalArticle } from '@/data/journal'
import { localePath, type Locale } from '@/i18n/config'
import type { Messages } from '@/i18n/messages'
import { journalIndexPath, type JournalLocale } from '@/lib/journal'
import { occasionPath } from '@/lib/occasions'
import { whatsappLink } from '@/lib/site'
import { journalUi } from './journal-ui'
import './Journal.css'

type JournalArticleViewProps = {
  article: JournalArticle
  locale: JournalLocale
  messages: Messages
}

export function JournalArticleView({ article, locale, messages }: JournalArticleViewProps) {
  const content = article.content[locale]
  const ui = journalUi[locale]
  const occasionHref = occasionPath(article.relatedOccasion, locale as Locale)
  const occasionLabel = messages.occasions.cards[article.relatedOccasion]
  const contactHref = `${localePath(locale as Locale)}#contact`

  return (
    <article className="journal-article">
      <div className="container journal-article-head">
        <Link href={journalIndexPath(locale)} className="journal-back">
          ← {ui.backToJournal}
        </Link>
        <h1>{content.title}</h1>
        <p className="journal-article-intro">{content.intro}</p>
      </div>

      <div className="journal-article-image">
        <Image
          src={article.image}
          alt={content.title}
          width={1600}
          height={900}
          priority
          sizes="100vw"
        />
      </div>

      <div className="container journal-article-body">
        {content.sections.map((section) => (
          <Reveal className="journal-section" key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            {section.items ? (
              <ul className="journal-items">
                {section.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : null}
          </Reveal>
        ))}

        <Reveal className="journal-cta">
          <h2>{content.ctaTitle}</h2>
          <p>{content.ctaText}</p>
          <div className="journal-cta-actions">
            <a
              href={whatsappLink(messages.shared.whatsappMessage)}
              target="_blank"
              rel="noopener"
              className="btn btn-primary"
            >
              <WhatsAppIcon size={18} />
              {messages.shared.ctaWhatsapp}
            </a>
            <HashLink href={contactHref} className="btn btn-ghost">
              {messages.shared.ctaEmail}
            </HashLink>
          </div>
        </Reveal>

        <Reveal className="journal-related">
          <p>{ui.relatedTitle}</p>
          <Link href={occasionHref} className="btn btn-ghost">
            {occasionLabel} — {ui.relatedCta}
          </Link>
        </Reveal>
      </div>
    </article>
  )
}
