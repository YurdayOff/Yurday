'use client'

import type { ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'

/** Trait tracé à la main sous un mot-clé, dessiné à l'arrivée à l'écran. */
export function Marker({ children }: { children: ReactNode }) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 })

  return (
    <span ref={ref} className={`marker${inView ? ' in-view' : ''}`}>
      {children}
      <svg viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M2,9 C60,2 240,2 298,9"
          stroke="var(--coral-2)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}
