import Link from 'next/link'
import type { ReactNode } from 'react'
import type { Messages } from '@/i18n/messages'
import { legalPaths, type LegalPageId } from '@/lib/routes'
import '@/styles/legal.css'

type LegalPageProps = {
  title: string
  /** Date de dernière mise à jour, à renseigner par Yurday. */
  updated: string
  current: LegalPageId
  messages: Messages
  children: ReactNode
}

/** Champ que Yurday doit compléter avant la mise en ligne. */
export function FillIn({ children = 'à compléter' }: { children?: ReactNode }) {
  return <span className="legal-fill-in">{children}</span>
}

export function LegalPage({ title, updated, current, messages, children }: LegalPageProps) {
  const links: { id: LegalPageId; label: string }[] = [
    { id: 'mentions', label: messages.legal.mentions },
    { id: 'terms', label: messages.legal.terms },
    { id: 'privacy', label: messages.legal.privacy },
  ]

  return (
    <div className="legal-page">
      <div className="container">
        <article className="legal-card">
          <h1>{title}</h1>
          <div className="legal-updated">Dernière mise à jour : {updated}</div>
          {children}
        </article>
        <nav className="legal-nav" aria-label={messages.legal.mentions}>
          {links.map((link) => (
            <Link
              key={link.id}
              href={legalPaths[link.id]}
              aria-current={link.id === current ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
