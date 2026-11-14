'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Flag } from '@/components/ui/Flag'
import { locales, localeInfo, type Locale } from '@/i18n/config'
import { alternatePaths } from '@/lib/routes'
import './LanguageSwitcher.css'

type LanguageSwitcherProps = {
  locale: Locale
  /** Libellé accessible du bouton (« Choisir la langue »). */
  label: string
}

/**
 * Chaque langue est un vrai lien : les moteurs suivent les versions traduites
 * et le choix survit au rechargement, contrairement à un `<select>` en mémoire.
 */
export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const paths = alternatePaths(pathname)
  const current = localeInfo[locale]

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={wrapRef} className={open ? 'lang-switcher-wrap open' : 'lang-switcher-wrap'}>
      <button
        type="button"
        className="lang-current"
        aria-label={label}
        aria-expanded={open}
        aria-controls="lang-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <Flag country={current.flag} className="flag-icon" />
        <span className="lang-current-code">{current.code}</span>
        <svg className="lang-chevron" viewBox="0 0 10 6" aria-hidden="true">
          <path
            d="M1,1 L5,5 L9,1"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <ul className="lang-menu" id="lang-menu">
        {locales.map((other) => {
          const info = localeInfo[other]
          return (
            <li key={other}>
              <Link
                className={other === locale ? 'lang-option active' : 'lang-option'}
                href={paths[other]}
                hrefLang={info.htmlLang}
                lang={info.htmlLang}
                aria-current={other === locale ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                <Flag country={info.flag} className="flag-icon" />
                {info.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
