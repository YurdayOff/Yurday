'use client'

import type { ElementType, ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'

type RevealProps = {
  children: ReactNode
  /** Balise rendue (div par défaut). */
  as?: ElementType
  className?: string
}

/** Apparition en fondé-monté à l'arrivée dans la fenêtre. */
export function Reveal({ children, as: Tag = 'div', className }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.12 })
  const classes = ['reveal', inView && 'in', className].filter(Boolean).join(' ')

  return (
    <Tag ref={ref} className={classes}>
      {children}
    </Tag>
  )
}
