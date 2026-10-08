import type { JournalLocale } from '@/lib/journal'

/**
 * Le journal n'existe qu'en français et en anglais (cf. lib/journal.ts) :
 * ces quelques textes d'interface vivent donc ici plutôt que dans les
 * fichiers de messages des 9 langues, qui devraient sinon tous porter la
 * même forme sans jamais s'en servir.
 */
export const journalUi: Record<
  JournalLocale,
  {
    eyebrowIndex: string
    h2Index: string
    ledeIndex: string
    footerLink: string
    readMore: string
    backToJournal: string
    relatedTitle: string
    relatedCta: string
    publishedLabel: string
    ctaDefaultLabel: string
  }
> = {
  fr: {
    eyebrowIndex: 'LE JOURNAL YURDAY',
    h2Index: 'Idées, guides et histoires pour une journée réussie',
    ledeIndex:
      'Des conseils concrets pour organiser une journée inoubliable, occasion par occasion.',
    footerLink: 'Journal',
    readMore: 'Lire l’article',
    backToJournal: 'Retour au journal',
    relatedTitle: 'Envie d’aller plus loin ?',
    relatedCta: 'Découvrir la page',
    publishedLabel: 'Publié le',
    ctaDefaultLabel: 'Discutons de votre projet',
  },
  en: {
    eyebrowIndex: 'THE YURDAY JOURNAL',
    h2Index: 'Ideas, guides and stories for a day well spent',
    ledeIndex: 'Practical advice to plan an unforgettable day, occasion by occasion.',
    footerLink: 'Journal',
    readMore: 'Read the article',
    backToJournal: 'Back to the journal',
    relatedTitle: 'Want to go further?',
    relatedCta: 'Discover the page',
    publishedLabel: 'Published on',
    ctaDefaultLabel: 'Let’s talk about your project',
  },
}
