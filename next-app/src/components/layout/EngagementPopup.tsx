'use client'

import { useCallback, useEffect, useState } from 'react'
import { HashLink } from '@/components/ui/HashLink'
import type { Messages } from '@/i18n/messages'
import './EngagementPopup.css'

const STORAGE_KEY = 'yurday-popup-shown'
const DELAY_MS = 60_000

type EngagementPopupProps = {
  messages: Messages
  /** Cible du bouton principal (ancre du formulaire de contact). */
  contactHref: string
}

function alreadyShown(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function remember(): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // Navigation privée ou stockage refusé : la pop-up réapparaîtra, sans dommage.
  }
}

/** Invitation à écrire, proposée une fois par session après 1 minute. */
export function EngagementPopup({ messages, contactHref }: EngagementPopupProps) {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => {
    setOpen(false)
    remember()
  }, [])

  useEffect(() => {
    if (alreadyShown()) return

    const timer = window.setTimeout(() => {
      // Ne pas déranger quelqu'un qui est déjà en train de remplir le formulaire.
      const contact = document.getElementById('contact')
      if (contact) {
        const rect = contact.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) return
      }
      setOpen(true)
      remember()
    }, DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, close])

  return (
    <div
      className={open ? 'popup-overlay open' : 'popup-overlay'}
      onClick={(event) => {
        if (event.target === event.currentTarget) close()
      }}
    >
      <div
        className="popup-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        aria-hidden={!open}
      >
        <button
          type="button"
          className="popup-close"
          aria-label={messages.a11y.close}
          onClick={close}
        >
          ✕
        </button>
        <div className="popup-badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2.5c.7 2.8 1.6 4.8 3.1 6.4 1.5 1.5 3.6 2.4 6.4 3.1-2.8.7-4.9 1.6-6.4 3.1-1.5 1.6-2.4 3.6-3.1 6.4-.7-2.8-1.6-4.8-3.1-6.4-1.5-1.5-3.6-2.4-6.4-3.1 2.8-.7 4.9-1.6 6.4-3.1 1.5-1.6 2.4-3.6 3.1-6.4Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="eyebrow">{messages.popup.eyebrow}</div>
        <h3 id="popup-title">{messages.popup.title}</h3>
        <div className="popup-divider" aria-hidden="true" />
        <p>{messages.popup.body}</p>
        <div className="popup-actions">
          <HashLink href={contactHref} className="btn btn-primary" onNavigate={close}>
            {messages.nav.cta}
          </HashLink>
          <button type="button" className="popup-dismiss" onClick={close}>
            {messages.popup.dismiss}
          </button>
        </div>
      </div>
    </div>
  )
}
