'use client'

import { useEffect, useState } from 'react'

/** Respecte le réglage système « réduire les animations ». */
export function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefers(query.matches)
    const onChange = (event: MediaQueryListEvent) => setPrefers(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return prefers
}
