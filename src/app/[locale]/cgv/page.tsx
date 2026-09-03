import type { Metadata } from 'next'
import { FillIn, LegalPage } from '@/components/legal/LegalPage'
import { defaultLocale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import { legalMetadata, legalStaticParams } from '@/lib/legal-metadata'
import { legalPaths } from '@/lib/routes'
import { site } from '@/lib/site'

const TITLE = 'Conditions générales de vente'

export const dynamicParams = false
export const generateStaticParams = legalStaticParams

export const metadata: Metadata = legalMetadata(TITLE, legalPaths.terms)

export default async function CgvPage() {
  const messages = await getMessages(defaultLocale)

  return (
    <LegalPage title={TITLE} updated="à définir" current="terms" messages={messages}>
      <h2>Objet</h2>
      <p>
        Les présentes conditions régissent la vente de prestations de création et
        d&rsquo;organisation de journées sur mesure par {site.name} (ci-après « le prestataire ») à
        ses clients.
      </p>

      <h2>Devis et commande</h2>
      <p>
        Toute prestation fait l&rsquo;objet d&rsquo;un devis personnalisé, gratuit et sans
        engagement. La commande est réputée ferme et définitive à réception de l&rsquo;acceptation
        écrite du devis par le client et, le cas échéant, du versement de l&rsquo;acompte prévu.
      </p>

      <h2>Prix et modalités de paiement</h2>
      <p>
        Les prix sont indiqués en euros. Modalités précises (acompte, solde, moyens de paiement
        acceptés) : <FillIn />.
      </p>

      <h2>Annulation et rétractation</h2>
      <p>
        Conditions d&rsquo;annulation par le client (délais, pénalités éventuelles) : <FillIn />.
        <br />
        Conformément à l&rsquo;article L221-28 du Code de la consommation, le droit de rétractation
        ne s&rsquo;applique pas aux prestations pleinement exécutées avant la fin du délai de
        rétractation avec l&rsquo;accord du client, ni aux prestations dont la date d&rsquo;exécution
        est fixée avec précision.
      </p>

      <h2>Responsabilité</h2>
      <p>
        {site.name} s&rsquo;engage à mettre en œuvre tous les moyens nécessaires à la bonne exécution
        de la prestation. La responsabilité de {site.name} ne saurait être engagée en cas de force
        majeure ou de fait imprévisible d&rsquo;un prestataire tiers.
      </p>

      <h2>Litiges et médiation</h2>
      <p>
        Les présentes CGV sont soumises au droit français. En cas de litige, le client peut recourir
        gratuitement à un médiateur de la consommation : <FillIn /> (nom et coordonnées du
        médiateur).
      </p>
    </LegalPage>
  )
}
