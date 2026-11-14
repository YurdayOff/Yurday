import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/LegalPage'
import { defaultLocale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import { legalMetadata, legalStaticParams } from '@/lib/legal-metadata'
import { legalPaths } from '@/lib/routes'
import { site } from '@/lib/site'

const TITLE = 'Mentions légales'

export const dynamicParams = false
export const generateStaticParams = legalStaticParams

export const metadata: Metadata = legalMetadata(TITLE, legalPaths.mentions)

export default async function MentionsLegalesPage() {
  const messages = await getMessages(defaultLocale)

  return (
    <LegalPage title={TITLE} updated="28 septembre 2026" current="mentions" messages={messages}>
      <h2>Éditeur du site</h2>
      <p>
        {site.name}, {site.legal.form} au capital social de {site.legal.capital}.
        <br />
        Siège social : {site.legal.address}.
        <br />
        RCS {site.legal.rcs} : {site.legal.siren}.
        <br />
        SIRET : {site.legal.siret}.
        <br />
        Code APE/NAF : {site.legal.apeCode}.
        <br />
        Directeur de la publication : {site.legal.director}.
        <br />
        Contact : <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <h2>Hébergement</h2>
      <p>
        Ce site est hébergé par Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, États-Unis.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&rsquo;ensemble des contenus présents sur ce site (textes, photographies, logo, mise en
        page) est la propriété de {site.name}, sauf mention contraire, et ne peut être reproduit sans
        autorisation préalable.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Le traitement des données personnelles collectées via ce site est détaillé dans notre{' '}
        <a href={legalPaths.privacy}>politique de confidentialité</a>.
      </p>
    </LegalPage>
  )
}
