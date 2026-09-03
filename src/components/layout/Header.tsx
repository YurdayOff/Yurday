'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
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
  { hash: '#notre-histoire', key: 'story' },
  { hash: '#faq', key: 'faq' },
] as const

export function Header({ locale, messages }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const home = localePath(locale)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={scrolled ? 'is-scrolled' : undefined}>
      <div className="nav">
        <div className="nav-brand">
          <Link href={home} className="nav-logo" aria-label={site.name}>
            <Image
              src={site.images.logo}
              alt={site.name}
              width={500}
              height={213}
              priority
              sizes="120px"
            />
          </Link>
        </div>
        <nav className="nav-links" aria-label={messages.a11y.mainNav}>
          {sections.map((section) => (
            <Link key={section.hash} href={`${home}${section.hash}`}>
              {messages.nav[section.key]}
            </Link>
          ))}
        </nav>
        <div className="nav-cta">
          <LanguageSwitcher locale={locale} label={messages.a11y.languageSwitcher} />
          <Link href={`${home}#contact`} className="btn btn-primary">
            {messages.nav.cta}
          </Link>
        </div>
      </div>
    </header>
  )
}
