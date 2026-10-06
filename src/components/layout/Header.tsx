'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { HashLink } from '@/components/ui/HashLink'
import { localePath, type Locale } from '@/i18n/config'
import type { Messages } from '@/i18n/messages'
import { site } from '@/lib/site'
import { LanguageSwitcher } from './LanguageSwitcher'
import './Header.css'

type HeaderProps = {
  locale: Locale
  messages: Messages
}

/** Ancres de la page d'accueil, dans l'ordre du menu. */
const sections = [
  { hash: '#occasions', key: 'occasions' },
  { hash: '#avis', key: 'reviews' },
  { hash: '#comment-ca-marche', key: 'process' },
  { hash: '#faq', key: 'faq' },
] as const

export function Header({ locale, messages }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const home = localePath(locale)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className={scrolled ? 'is-scrolled' : undefined}>
      <div className="nav">
        <div className="nav-brand">
          <Link href={home} className="nav-logo" aria-label={site.name}>
            <Image
              src={site.images.logo}
              alt={site.name}
              width={500}
              height={91}
              priority
              sizes="120px"
            />
          </Link>
        </div>
        <nav className="nav-links" aria-label={messages.a11y.mainNav}>
          {sections.map((section) => (
            <HashLink key={section.hash} href={`${home}${section.hash}`}>
              {messages.nav[section.key]}
            </HashLink>
          ))}
        </nav>
        <div className="nav-cta">
          <LanguageSwitcher locale={locale} label={messages.a11y.languageSwitcher} />
          <HashLink href={`${home}#contact`} className="btn btn-primary">
            {messages.nav.cta}
          </HashLink>
          <button
            type="button"
            className={menuOpen ? 'nav-burger is-open' : 'nav-burger'}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? messages.a11y.close : messages.a11y.openMenu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      {menuOpen ? (
        <nav className="nav-mobile" aria-label={messages.a11y.mainNav}>
          {sections.map((section) => (
            <HashLink
              key={section.hash}
              href={`${home}${section.hash}`}
              onNavigate={() => setMenuOpen(false)}
            >
              {messages.nav[section.key]}
            </HashLink>
          ))}
          <HashLink
            href={`${home}#contact`}
            className="btn btn-primary nav-mobile-cta"
            onNavigate={() => setMenuOpen(false)}
          >
            {messages.nav.cta}
          </HashLink>
        </nav>
      ) : null}
    </header>
  )
}
