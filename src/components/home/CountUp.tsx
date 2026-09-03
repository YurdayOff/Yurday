'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from '@/hooks/useInView'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type CountUpProps = {
  target: number
  suffix?: string
  className?: string
  /** Durée du décompte, en millisecondes. */
  duration?: number
}

/** Chiffre qui grimpe jusqu'à sa valeur dès qu'il devient visible. */
export function CountUp({ target, suffix = '', className, duration = 1400 }: CountUpProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.5 })
  const reducedMotion = usePrefersReducedMotion()
  const [animated, setAnimated] = useState(0)
  const frame = useRef<number>(0)

  useEffect(() => {
    if (!inView || reducedMotion) return

    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimated(Math.round(target * eased))
      if (progress < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame.current)
  }, [inView, reducedMotion, target, duration])

  // Animations réduites : la valeur finale est affichée d'emblée.
  const value = reducedMotion ? target : animated

  return (
    <div ref={ref} className={className}>
      {value}
      {suffix}
    </div>
  )
}
