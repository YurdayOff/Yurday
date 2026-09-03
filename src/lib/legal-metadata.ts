import type { Metadata } from 'next'
import { defaultLocale } from '@/i18n/config'
import { absoluteUrl } from './seo'
import { site } from './site'

/**
 * Les pages légales n'existent qu'en français et contiennent encore des champs
 * à compléter (raison sociale, SIRET, hébergeur…). Elles sont donc explicitement
 * exclues de l'index : à retirer dès que le contenu est validé.
 */
export function legalMetadata(title: string, path: string): Metadata {
  return {
    title,
    description: `${title} du site ${site.name}.`,
    alternates: { canonical: absoluteUrl(path) },
    robots: { index: false, follow: true },
    openGraph: { title, url: absoluteUrl(path), locale: 'fr_FR', siteName: site.name },
  }
}

/** Ces pages ne sont générées que pour la langue par défaut. */
export function legalStaticParams() {
  return [{ locale: defaultLocale }]
}
