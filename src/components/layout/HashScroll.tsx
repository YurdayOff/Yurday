'use client'

import { useEffect } from 'react'

/**
 * Filet de sécurité : si la page se charge avec un hash dans l'URL (venant
 * d'une autre page, ex. clic sur « Discutons de votre projet » depuis une
 * page occasion), on s'assure que la cible est bien atteinte — Next.js ne
 * le garantit pas toujours lui-même après une navigation.
 */
export function HashScroll() {
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return
    const target = document.getElementById(id)
    target?.scrollIntoView({ block: 'start' })
  }, [])

  return null
}
