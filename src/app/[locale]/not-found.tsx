import Link from 'next/link'
import { HeroSection } from '@/components/ui/HeroSection'
import { defaultLocale, localePath } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'

/**
 * Page 404. Le segment de langue n'est pas accessible ici (Next rend cette page
 * hors contexte de route), on affiche donc la version française.
 */
export default async function NotFound() {
  const messages = await getMessages(defaultLocale)

  return (
    <HeroSection compact>
      <div className="eyebrow">404</div>
      <h1>Cette page n&rsquo;existe pas (ou plus)</h1>
      <p className="lede">
        Le lien est peut-être incomplet. Retournez à l&rsquo;accueil pour retrouver toutes les
        occasions.
      </p>
      <div className="hero-actions">
        <Link href={localePath(defaultLocale)} className="btn btn-primary">
          {messages.nav.home}
        </Link>
      </div>
    </HeroSection>
  )
}
