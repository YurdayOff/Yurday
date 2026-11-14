declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

/**
 * ID du conteneur Google Tag Manager (ex. GTM-XXXXXXX). Tant qu'elle n'est pas
 * définie, GoogleTagManager et trackEvent restent inertes : aucun script ne se
 * charge, aucun événement ne part.
 */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

const CONSENT_KEY = 'yurday-cookie-consent'

/** Émis par CookieConsent dès que le visiteur accepte, pour charger GTM sans recharger la page. */
export const CONSENT_EVENT = 'yurday:consent-accepted'

export function hasAnalyticsConsent(): boolean {
  try {
    return window.localStorage.getItem(CONSENT_KEY) === 'accepted'
  } catch {
    return false
  }
}

/**
 * Empile un événement dans le dataLayer GTM. Sûr à appeler partout sans
 * condition : sans conteneur configuré ou sans consentement, ne fait rien.
 */
export function trackEvent(event: string, params: Record<string, unknown> = {}): void {
  if (!GTM_ID || typeof window === 'undefined' || !hasAnalyticsConsent()) return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event, ...params })
}
