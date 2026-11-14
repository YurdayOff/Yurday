'use client'

import { useEffect } from 'react'
import { CONSENT_EVENT, GTM_ID, hasAnalyticsConsent, trackEvent } from '@/lib/analytics'

let injected = false

function injectGtm(): void {
  if (injected || !GTM_ID) return
  injected = true

  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  document.head.appendChild(script)

  const iframe = document.createElement('iframe')
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`
  iframe.height = '0'
  iframe.width = '0'
  iframe.style.display = 'none'
  iframe.style.visibility = 'hidden'
  const noscript = document.createElement('noscript')
  noscript.appendChild(iframe)
  document.body.prepend(noscript)
}

/** Lien tel/WhatsApp/Calendly cliqué ailleurs qu'au moment d'une demande aboutie (ContactForm). */
function trackQuickContactClick(href: string): void {
  if (href.startsWith('tel:')) trackEvent('contact_click', { method: 'phone' })
  else if (href.includes('wa.me') || href.includes('whatsapp')) {
    trackEvent('contact_click', { method: 'whatsapp' })
  } else if (href.includes('calendly.com')) trackEvent('contact_click', { method: 'calendly' })
}

/**
 * Charge GTM uniquement si NEXT_PUBLIC_GTM_ID est défini ET que le visiteur a
 * accepté les cookies (CookieConsent). Écoute aussi l'acceptation en direct,
 * pour ne pas attendre un rechargement de page après le clic « Accepter ».
 * Pose aussi un suivi de clic délégué sur tous les liens tel:/WhatsApp/Calendly
 * du site, sans avoir à instrumenter chaque composant qui en affiche un.
 */
export function GoogleTagManager() {
  useEffect(() => {
    if (!GTM_ID) return

    if (hasAnalyticsConsent()) injectGtm()
    const onConsent = () => injectGtm()
    window.addEventListener(CONSENT_EVENT, onConsent)

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest('a')
      const href = link?.getAttribute('href')
      if (href) trackQuickContactClick(href)
    }
    document.addEventListener('click', onClick)

    return () => {
      window.removeEventListener(CONSENT_EVENT, onConsent)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return null
}
