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
 * Renvoie `true` d'emblée si IntersectionObserver n'est pas disponible,
 * pour ne jamais laisser de contenu invisible.
 */
export function useInView<T extends HTMLElement>({ threshold = 0.12, once = true }: Options = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

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
