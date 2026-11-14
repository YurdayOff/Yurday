'use client'

import type { ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'

type StaggerProps = {
  /** Chaque enfant direct portant la classe `stagger-item` apparaît à son tour. */
  children: ReactNode
  className?: string
}

/** Conteneur qui révèle ses enfants un par un dès qu'il entre dans la fenêtre. */
export function Stagger({ children, className }: StaggerProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 })
  const classes = ['stagger-parent', inView && 'in', className].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  )
}
