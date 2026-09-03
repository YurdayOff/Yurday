import type { Metadata } from 'next'
import { FillIn, LegalPage } from '@/components/legal/LegalPage'
import { defaultLocale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import { legalMetadata, legalStaticParams } from '@/lib/legal-metadata'
import { legalPaths } from '@/lib/routes'
import { site } from '@/lib/site'

const TITLE = 'Politique de confidentialité'

export const dynamicParams = false
export const generateStaticParams = legalStaticParams

export const metadata: Metadata = legalMetadata(TITLE, legalPaths.privacy)

export default async function ConfidentialitePage() {
  const messages = await getMessages(defaultLocale)

  return (
    <LegalPage title={TITLE} updated="à définir" current="privacy" messages={messages}>
      <h2>Responsable du traitement</h2>
      <p>
        {site.name}, <FillIn /> (adresse), est responsable du traitement des données personnelles
        collectées sur ce site. Contact : <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <h2>Données collectées</h2>
      <p>
        Via le formulaire de contact, nous collectons : nom, moyen de contact (téléphone ou email),
        informations sur votre projet (occasion, budget indicatif, message).
      </p>

      <h2>Finalité et base légale</h2>
      <p>
        Ces données sont utilisées exclusivement pour répondre à votre demande et élaborer une
        proposition personnalisée, sur la base de votre consentement (envoi volontaire du
        formulaire).
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Les données sont conservées <FillIn /> (ex. 3 ans à compter du dernier contact), sauf
        obligation légale contraire.
      </p>

      <h2>Destinataires</h2>
      <p>
        Les données sont accessibles uniquement à l&rsquo;équipe {site.name}. Elles ne sont ni
        vendues ni transmises à des tiers à des fins commerciales.
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d&rsquo;un droit d&rsquo;accès, de rectification,
        d&rsquo;effacement et d&rsquo;opposition sur vos données. Pour l&rsquo;exercer, contactez-nous
        à <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Cookies et traceurs</h2>
      <p>
        Ce site ne dépose aucun cookie publicitaire ni de suivi. La langue choisie est portée par
        l&rsquo;adresse de la page. Le stockage de session du navigateur est utilisé uniquement pour
        ne pas réafficher la fenêtre d&rsquo;invitation au cours d&rsquo;une même visite.
      </p>
    </LegalPage>
  )
}
