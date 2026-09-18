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
    <LegalPage title={TITLE} updated="18 septembre 2026" current="terms" messages={messages}>
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
        écrite du devis par le client.
      </p>

      <h2>Prix et modalités de paiement</h2>
      <p>
        Les prix sont indiqués en euros. Aucun paiement n&rsquo;est demandé au client avant qu&rsquo;il
        n&rsquo;ait validé le devis et le prix proposés : le règlement n&rsquo;intervient qu&rsquo;une
        fois cette validation obtenue.
      </p>

      <h2>Droit de rétractation</h2>
      <p>
        Conformément à l&rsquo;article L221-28 du Code de la consommation, le droit de rétractation
        ne s&rsquo;applique pas aux prestations dont la date d&rsquo;exécution est fixée avec
        précision, ce qui est le cas de l&rsquo;ensemble des journées organisées par {site.name}.
      </p>

      <h2>Annulation</h2>
      <p>
        En cas d&rsquo;annulation du projet par le client après validation du devis et paiement,{' '}
        {site.name} retient les sommes suivantes, à titre de compensation des frais déjà engagés
        (acomptes et réservations auprès des prestataires, temps de conception de la journée) :
      </p>
      <ul>
        <li>annulation à plus de 30 jours de la date prévue : 30% du montant total du devis ;</li>
        <li>annulation entre 15 et 30 jours de la date prévue : 60% du montant total du devis ;</li>
        <li>
          annulation à moins de 15 jours de la date prévue : 100% du montant total du devis, sans
          remboursement.
        </li>
      </ul>
      <p>
        Le solde éventuel est reversé au client dans un délai de 14 jours suivant la demande
        d&rsquo;annulation.
      </p>

      <h2>Report de la date</h2>
      <p>
        Le client peut demander le report de la date de sa journée, sous réserve de la disponibilité
        des prestataires concernés à la nouvelle date souhaitée. Passé un délai de 15 jours avant la
        date prévue, le report n&rsquo;est plus possible, sauf circonstance exceptionnelle
        (conditions météorologiques extrêmes, décès, ou autre cas de force majeure caractérisé),
        étudiée au cas par cas par {site.name}. À défaut de circonstance exceptionnelle reconnue, la
        demande est traitée comme une annulation et les conditions de l&rsquo;article «&nbsp;Annulation&nbsp;»
        s&rsquo;appliquent.
      </p>
      <p>
        Les frais déjà engagés par {site.name} auprès de prestataires tiers pour la date initiale,
        lorsqu&rsquo;ils ne peuvent être ni annulés ni reportés par ces prestataires, restent à la
        charge du client et lui sont facturés séparément, même en cas de report accepté.
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
