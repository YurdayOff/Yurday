import Link from 'next/link'
import { HeroSection } from '@/components/ui/HeroSection'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { localePath, type Locale } from '@/i18n/config'
import type { Messages } from '@/i18n/messages'
import { occasionKeys, occasionPath, type OccasionKey } from '@/lib/occasions'
import { site } from '@/lib/site'
import './OccasionPage.css'

type OccasionContentProps = {
  occasion: OccasionKey
  locale: Locale
  messages: Messages
}

function ContactActions({ messages, locale }: { messages: Messages; locale: Locale }) {
  return (
    <div className="occasion-actions">
      <a href={site.whatsapp.url} target="_blank" rel="noopener" className="btn btn-primary">
        <WhatsAppIcon size={18} />
        {messages.shared.ctaWhatsapp}
      </a>
      <Link href={`${localePath(locale)}#contact`} className="btn btn-ghost">
        {messages.shared.ctaEmail}
      </Link>
    </div>
  )
}

/** Page dédiée à une occasion : promesse, récit, appel à l'action, occasions voisines. */
export function OccasionContent({ occasion, locale, messages }: OccasionContentProps) {
  const page = messages.occasionPages[occasion]
  const others = occasionKeys.filter((key) => key !== occasion)

  return (
    <>
      <HeroSection compact>
        <div className="eyebrow">{page.eyebrow}</div>
        <h1>
          {page.title.lead} <em>{page.title.em}</em> {page.title.tail}
        </h1>
        <p className="lede">{page.intro}</p>
        <ContactActions messages={messages} locale={locale} />
      </HeroSection>

      <section className="occasion-content section-paper-deep">
        <div className="container">
          <div className="occasion-story">
            <p>{page.story}</p>
          </div>
        </div>
      </section>

      <section className="occasion-content">
        <div className="container">
          <div className="occasion-cta">
            <h2>{page.cta.title}</h2>
            <p>{page.cta.text}</p>
            <ContactActions messages={messages} locale={locale} />
          </div>
        </div>
      </section>

      <section className="other-occasions">
        <h2>{messages.occasions.moreLabel}</h2>
        <div className="other-occasions-list">
          {others.map((key) => (
            <Link key={key} href={occasionPath(key, locale)}>
              {messages.occasions.cards[key]}
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
