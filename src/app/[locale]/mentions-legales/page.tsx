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
    <LegalPage title={TITLE} updated="18 septembre 2026" current="mentions" messages={messages}>
      <h2>Éditeur du site</h2>
      <p>
        {site.name}, société à responsabilité limitée (SARL) au capital social de 2 000 €.
        <br />
        Siège social : 25 Rue de Ponthieu, 75008 Paris.
        <br />
        SIRET : en cours d&rsquo;attribution (société en cours d&rsquo;immatriculation au RCS de
        Paris).
        <br />
        Directeur de la publication : Léo Magnier.
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
