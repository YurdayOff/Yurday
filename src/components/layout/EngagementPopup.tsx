'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import type { Messages } from '@/i18n/messages'
import './EngagementPopup.css'

const STORAGE_KEY = 'yurday-popup-shown'
const DELAY_MS = 30_000

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

/** Invitation à écrire, proposée une fois par session après 30 secondes. */
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
        <div className="popup-eyebrow">{messages.popup.eyebrow}</div>
        <h3 id="popup-title">{messages.popup.title}</h3>
        <p>{messages.popup.body}</p>
        <div className="popup-actions">
          <Link href={contactHref} className="btn btn-primary" onClick={close}>
            {messages.nav.cta}
          </Link>
          <button type="button" className="popup-dismiss" onClick={close}>
            {messages.popup.dismiss}
          </button>
        </div>
      </div>
    </div>
  )
}
