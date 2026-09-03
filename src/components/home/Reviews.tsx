import { Flag } from '@/components/ui/Flag'
import { Stars } from '@/components/ui/Stars'
import { Perforation, TicketNotches } from '@/components/ui/Ticket'
import { localeInfo, type Locale } from '@/i18n/config'
import type { Messages } from '@/i18n/messages'
import { reviewRows, type Review } from '@/data/reviews'
import { SectionHead } from './SectionHead'
import './Reviews.css'

type ReviewsProps = {
  messages: Messages
  locale: Locale
}

/** Nom du pays dans la langue affichée, sans table de traduction à maintenir. */
function countryName(country: string, locale: Locale): string {
  const names = new Intl.DisplayNames([localeInfo[locale].htmlLang], { type: 'region' })
  return names.of(country) ?? country
}

function ReviewCard({
  review,
  messages,
  locale,
  duplicate,
}: {
  review: Review
  messages: Messages
  locale: Locale
  /** Copie servant uniquement à boucler le défilement : masquée aux lecteurs d'écran. */
  duplicate?: boolean
}) {
  const body = messages.reviews.items[String(review.id) as keyof typeof messages.reviews.items]

  return (
    <article className="ticket marquee-card" aria-hidden={duplicate}>
      <TicketNotches />
      <div className="review-top">
        <div className="review-avatar" aria-hidden="true">
          {review.avatar}
        </div>
        <div>
          <div className="review-name">
            {review.name} <Flag country={review.country} title={countryName(review.country, locale)} />
          </div>
          <Stars className="review-stars" label={messages.trust.starsLabel} />
        </div>
      </div>
      <Perforation />
      <div className="review-body">
        «&nbsp;{body}&nbsp;»
        {review.nativeLocale === locale ? null : (
          <span className="translated-note">{messages.reviews.translatedNote}</span>
        )}
      </div>
    </article>
  )
}

/**
 * Deux bandeaux d'avis qui défilent en continu, en sens opposés.
 * Chaque bandeau contient deux fois la même liste : l'animation translate de
 * -50 %, la boucle est donc invisible.
 */
export function Reviews({ messages, locale }: ReviewsProps) {
  const { reviews } = messages

  return (
    <section id="avis" className="section-paper-deep">
      <SectionHead
        eyebrow={reviews.eyebrow}
        title={reviews.h2}
        lede={reviews.lede}
        className="container"
      />

      {reviewRows.map((row, rowIndex) => (
        <div className="marquee-outer" key={rowIndex}>
          <div className={rowIndex === 1 ? 'marquee-track marquee-reverse' : 'marquee-track'}>
            {[false, true].map((duplicate) =>
              row.map((review) => (
                <ReviewCard
                  key={`${review.id}-${duplicate ? 'copie' : 'original'}`}
                  review={review}
                  messages={messages}
                  locale={locale}
                  duplicate={duplicate || undefined}
                />
              )),
            )}
          </div>
        </div>
      ))}

      <div className="container">
        <div className="google-badge">
          <strong>{reviews.badge.strong}</strong>
          {reviews.badge.rest}
        </div>
      </div>
    </section>
  )
}
