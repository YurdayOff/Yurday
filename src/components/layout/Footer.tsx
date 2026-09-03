import Image from 'next/image'
import Link from 'next/link'
import type { Messages } from '@/i18n/messages'
import { legalPaths } from '@/lib/routes'
import { site } from '@/lib/site'
import './Footer.css'

const currentYear = new Date().getFullYear()

export function Footer({ messages }: { messages: Messages }) {
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
        height={213}
        sizes="60px"
      />
      <div>{messages.footer.tagline}</div>
      <div style={{ marginTop: 8 }}>
        <a href={`mailto:${site.email}`} className="footer-email">
          {site.email}
        </a>
      </div>
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
