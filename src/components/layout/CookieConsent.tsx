'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Messages } from '@/i18n/messages'
import { legalPaths } from '@/lib/routes'
import './CookieConsent.css'

const STORAGE_KEY = 'yurday-cookie-consent'

function storedChoice(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function storeChoice(value: 'accepted' | 'declined'): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // Navigation privée ou stockage refusé : le bandeau réapparaîtra, sans dommage.
  }
}

type CookieConsentProps = {
  messages: Messages
}

/** Bandeau RGPD, affiché tant qu'aucun choix n'a été enregistré. */
export function CookieConsent({ messages }: CookieConsentProps) {
  const [visible, setVisible] = useState(false)
  const { cookies } = messages

  useEffect(() => {
    if (!storedChoice()) setVisible(true)
  }, [])

  const choose = (value: 'accepted' | 'declined') => {
    storeChoice(value)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-banner" role="dialog" aria-modal="false" aria-label={cookies.accept}>
      <p className="cookie-text">
        {cookies.message}{' '}
        <Link href={legalPaths.privacy} className="cookie-link">
          {cookies.policyLink}
        </Link>
      </p>
      <div className="cookie-actions">
        <button type="button" className="btn btn-ghost cookie-btn" onClick={() => choose('declined')}>
          {cookies.decline}
        </button>
        <button
          type="button"
          className="btn btn-primary cookie-btn"
          onClick={() => choose('accepted')}
        >
          {cookies.accept}
        </button>
      </div>
    </div>
  )
}
