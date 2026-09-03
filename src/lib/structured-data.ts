import type { Locale } from '@/i18n/config'
import { localeInfo, localePath } from '@/i18n/config'
import type { Messages } from '@/i18n/messages'
import { occasionPath, type OccasionKey } from './occasions'
import { absoluteUrl } from './seo'
import { site } from './site'

/**
 * Données structurées schema.org.
 *
 * Note : les avis affichés sur le site sont collectés par Yurday elle-même.
 * Google interdit le balisage `AggregateRating` dans ce cas (avis « auto-
 * promotionnels »), il n'est donc volontairement pas déclaré ici.
 */

type JsonLdObject = Record<string, unknown>

export const organizationId = `${site.url}/#organization`
const websiteId = `${site.url}/#website`

export function organizationSchema(messages: Messages, locale: Locale): JsonLdObject {
  return {
    '@type': 'ProfessionalService',
    '@id': organizationId,
    name: site.name,
    url: absoluteUrl(localePath(locale)),
    description: messages.seo.home.description,
    slogan: messages.footer.tagline,
    logo: absoluteUrl(site.images.logo),
    image: absoluteUrl('/og/accueil.jpg'),
    email: site.email,
    telephone: site.whatsapp.displayNumber,
    priceRange: '€€',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: site.areaServed.region,
      address: {
        '@type': 'PostalAddress',
        addressLocality: site.areaServed.city,
        addressRegion: site.areaServed.region,
        addressCountry: site.areaServed.country,
      },
    },
    founder: site.founders.map((founder) => ({
      '@type': 'Person',
      name: founder.name,
      email: founder.email,
    })),
    knowsLanguage: Object.values(localeInfo).map((info) => info.htmlLang),
    ...(site.social.length > 0 ? { sameAs: site.social } : {}),
  }
}

export function websiteSchema(messages: Messages, locale: Locale): JsonLdObject {
  return {
    '@type': 'WebSite',
    '@id': websiteId,
    url: absoluteUrl(localePath(locale)),
    name: site.name,
    description: messages.seo.home.description,
    inLanguage: localeInfo[locale].htmlLang,
    publisher: { '@id': organizationId },
  }
}

export function faqSchema(messages: Messages): JsonLdObject {
  return {
    '@type': 'FAQPage',
    mainEntity: messages.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function occasionServiceSchema(
  key: OccasionKey,
  messages: Messages,
  locale: Locale,
): JsonLdObject {
  const page = messages.occasionPages[key]

  return {
    '@type': 'Service',
    name: messages.occasions.cards[key],
    serviceType: page.eyebrow,
    description: page.intro,
    url: absoluteUrl(occasionPath(key, locale)),
    inLanguage: localeInfo[locale].htmlLang,
    provider: { '@id': organizationId },
    areaServed: { '@type': 'AdministrativeArea', name: site.areaServed.region },
  }
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
): JsonLdObject {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

/** Assemble un graphe unique : un seul bloc JSON-LD par page. */
export function jsonLdGraph(nodes: JsonLdObject[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes })
}
