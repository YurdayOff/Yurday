import type { Metadata } from 'next'
import { FillIn, LegalPage } from '@/components/legal/LegalPage'
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
    <LegalPage title={TITLE} updated="à définir" current="mentions" messages={messages}>
      <h2>Éditeur du site</h2>
      <p>
        {site.name}, <FillIn /> (forme juridique, ex. SASU/EURL), au capital social de <FillIn /> €.
        <br />
        Siège social : <FillIn />.
        <br />
        SIRET : <FillIn /> · RCS : <FillIn />.
        <br />
        Directeur de la publication : <FillIn />.
        <br />
        Contact : <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <h2>Hébergement</h2>
      <p>
        Ce site est hébergé par <FillIn /> (raison sociale, adresse, téléphone de l&rsquo;hébergeur).
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
