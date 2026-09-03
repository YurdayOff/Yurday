import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Cairo, Fraunces, Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { EngagementPopup } from '@/components/layout/EngagementPopup'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { PromoBanner } from '@/components/layout/PromoBanner'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import { isLocale, locales, localeInfo, localePath, type Locale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import { site } from '@/lib/site'
import '@/styles/tokens.css'
import '@/styles/base.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  // `opsz` : sans cet axe, la police est figée à sa taille optique par défaut (14)
  // et les grands titres paraissent trop épais.
  axes: ['opsz'],
  variable: '--font-fraunces',
  display: 'swap',
})

/** Chargée pour l'arabe uniquement : Fraunces et Inter n'ont pas ce jeu de caractères. */
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#FBF8F3',
  colorScheme: 'light',
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  applicationName: site.name,
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type LocaleLayoutProps = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()

  const locale: Locale = raw
  const info = localeInfo[locale]
  const messages = await getMessages(locale)
  const home = localePath(locale)

  return (
    <html
      lang={info.htmlLang}
      dir={info.dir}
      className={`${inter.variable} ${fraunces.variable} ${cairo.variable}`}
    >
      <body>
        {/* Sans JavaScript, les animations d'apparition ne se déclenchent pas :
            on affiche alors directement le contenu. */}
        <noscript>
          <style>{'.reveal,.stagger-item{opacity:1;transform:none}'}</style>
        </noscript>
        <a href="#contenu" className="skip-link">
          {messages.a11y.skipToContent}
        </a>
        <Header locale={locale} messages={messages} />
        <PromoBanner messages={messages} />
        <main id="contenu">{children}</main>
        <Footer messages={messages} />
        <WhatsAppFloat label={messages.a11y.whatsappFloat} />
        <EngagementPopup messages={messages} contactHref={`${home}#contact`} />
      </body>
    </html>
  )
}
