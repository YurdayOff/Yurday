'use client'

import { useEffect, useRef, useState } from 'react'

type Options = {
  /** Part de l'élément visible avant déclenchement (0 → 1). */
  threshold?: number
  /** Ne déclencher qu'une fois (par défaut) : les animations ne se rejouent pas. */
  once?: boolean
}

/**
 * Indique si l'élément référencé est entré dans la fenêtre.
 * Sans JavaScript, la feuille de style de secours (cf. layout) affiche
 * directement le contenu : rien ne reste invisible.
 */
export function useInView<T extends HTMLElement>({ threshold = 0.12, once = true }: Options = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) observer.disconnect()
          } else if (!once) {
            setInView(false)
          }
        }
      },
      { threshold },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, once])

  return { ref, inView }
}
