import Image from 'next/image'
import Link from 'next/link'
import { FacebookIcon } from '@/components/ui/FacebookIcon'
import { InstagramIcon } from '@/components/ui/InstagramIcon'
import type { Locale } from '@/i18n/config'
import type { Messages } from '@/i18n/messages'
import { isJournalLocale, journalIndexPath } from '@/lib/journal'
import { occasionKeys, occasionPath } from '@/lib/occasions'
import { legalPaths } from '@/lib/routes'
import { site } from '@/lib/site'
import './Footer.css'

const currentYear = new Date().getFullYear()

export function Footer({ messages, locale }: { messages: Messages; locale: Locale }) {
  const legalLinks = [
    { href: legalPaths.mentions, label: messages.legal.mentions },
    { href: legalPaths.terms, label: messages.legal.terms },
    { href: legalPaths.privacy, label: messages.legal.privacy },
  ]

  return (
    <footer>
      <Image
        src={site.images.logo}
        alt={site.name}
        width={500}
        height={91}
        sizes="132px"
      />
      <div>{messages.footer.tagline}</div>
      <div style={{ marginTop: 8 }}>
        <a href={`mailto:${site.email}`} className="footer-email">
          {site.email}
        </a>
      </div>
      <nav className="footer-occasions" aria-label={messages.nav.occasions}>
        <span className="footer-occasions-label">{messages.nav.occasions}</span>
        {occasionKeys.map((key) => (
          <Link key={key} href={occasionPath(key, locale)} className="footer-occasions-link">
            {messages.occasions.cards[key]}
          </Link>
        ))}
        {isJournalLocale(locale) ? (
          <Link href={journalIndexPath(locale)} className="footer-occasions-link">
            Journal
          </Link>
        ) : null}
      </nav>
      {site.social.instagram || site.social.facebook ? (
        <div className="footer-social">
          {site.social.instagram ? (
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              className="footer-social-link"
            >
              <InstagramIcon size={20} />
            </a>
          ) : null}
          {site.social.facebook ? (
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
              className="footer-social-link"
            >
              <FacebookIcon size={20} />
            </a>
          ) : null}
        </div>
      ) : null}
      <div className="footer-legal">
        <span>
          &copy; {currentYear} {site.name}. {messages.footer.rights}
        </span>
        {legalLinks.map((link) => (
          <Link key={link.href} href={link.href} className="footer-legal-link">
            {link.label}
          </Link>
        ))}
      </div>
    </footer>
  )
}
