import Link from 'next/link'
import { Contact } from '@/components/home/Contact'
import { Process } from '@/components/home/Process'
import { Reviews } from '@/components/home/Reviews'
import { OccasionFaq } from '@/components/occasion/OccasionFaq'
import { HashLink } from '@/components/ui/HashLink'
import { HeroSection } from '@/components/ui/HeroSection'
import '@/components/ui/Ticket.css'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { localePath, type Locale } from '@/i18n/config'
import type { Messages } from '@/i18n/messages'
import { journalArticles } from '@/data/journal'
import { isJournalLocale, journalArticlePath } from '@/lib/journal'
import { occasionKeys, occasionPath, type OccasionKey } from '@/lib/occasions'
import { whatsappLink } from '@/lib/site'
import './OccasionPage.css'

type OccasionContentProps = {
  occasion: OccasionKey
  locale: Locale
  messages: Messages
}

function ContactActions({
  messages,
  contactHref,
}: {
  messages: Messages
  contactHref: string
}) {
  return (
    <div className="occasion-actions">
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
  )
}

/** Page dédiée à une occasion : promesse, récit, appel à l'action, occasions voisines. */
export function OccasionContent({ occasion, locale, messages }: OccasionContentProps) {
  const page = messages.occasionPages[occasion]
  const others = occasionKeys.filter((key) => key !== occasion)
  // Noël et Séminaire embarquent leur propre formulaire ; les autres pages renvoient vers celui de l'accueil.
  const contactHref = page.contactForm ? '#contact' : `${localePath(locale)}#contact`
  const relatedArticle = isJournalLocale(locale)
    ? journalArticles.find((article) => article.relatedOccasion === occasion)
    : undefined

  return (
    <>
      <HeroSection compact>
        <div className="eyebrow">{page.eyebrow}</div>
        <h1>
          {page.title.lead} <em>{page.title.em}</em> {page.title.tail}
        </h1>
        <p className="lede">{page.intro}</p>
        <ContactActions messages={messages} contactHref={contactHref} />
      </HeroSection>

      <section className="occasion-content section-paper-deep">
        <div className="container">
          <div className="occasion-story">
            <p>{page.story}</p>
          </div>
        </div>
      </section>

      {page.scenario ? (
        <section className="occasion-scenario">
          <div className="container">
            <p className="occasion-scenario-label">{page.scenario.label}</p>
            <div className="ticket occasion-scenario-card">
              <h3>{page.scenario.title}</h3>
              <p className="occasion-scenario-tagline">{page.scenario.tagline}</p>
              {page.scenario.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.ideas ? (
        <section className="occasion-content">
          <div className="container">
            <h2 className="occasion-ideas-h2">{page.ideas.h2}</h2>
            <div className="occasion-ideas-grid">
              {page.ideas.items.map((idea) => (
                <div className="ticket occasion-idea-card" key={idea.title}>
                  <h3>{idea.title}</h3>
                  <p>{idea.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.process ? <Process messages={messages} /> : null}

      {page.deadline ? (
        <section className="occasion-content">
          <div className="container">
            <div className="occasion-deadline">
              <h2>{page.deadline.h2}</h2>
              <p>{page.deadline.text}</p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="occasion-content">
        <div className="container">
          <div className="occasion-cta">
            <h2>{page.cta.title}</h2>
            <p>{page.cta.text}</p>
            <ContactActions messages={messages} contactHref={contactHref} />
          </div>
        </div>
      </section>

      {page.reviews ? <Reviews messages={messages} locale={locale} /> : null}

      {page.faq ? (
        <OccasionFaq faq={page.faq} contactHref={contactHref} ctaLabel={messages.nav.cta} />
      ) : null}

      {page.contactForm ? (
        <Contact messages={messages} seminar={occasion === 'seminaire-entreprise'} />
      ) : null}

      {relatedArticle && isJournalLocale(locale) ? (
        <div className="container occasion-related-article">
          <Link href={journalArticlePath(relatedArticle, locale)}>
            {relatedArticle.content[locale].title} →
          </Link>
        </div>
      ) : null}

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
