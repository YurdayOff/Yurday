'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import type { Messages } from '@/i18n/messages'
import { SectionHead } from './SectionHead'
import './Process.css'

/** Hauteur réservée à la ligne, au-dessus des colonnes. */
const LINE_HEIGHT = 64
/** Chiffres romains des étapes. */
const NUMERALS = ['I', 'II', 'III', 'IV']
const DRAW_DURATION_MS = 1400
/** Au-delà, la frise passe en liste verticale (cf. Process.css). */
const DESKTOP_MIN_WIDTH = 861

type Layout = {
  width: number
  /** Centre x de chaque colonne, pour poser son chiffre sur la ligne. */
  centers: number[]
}

export function Process({ messages }: { messages: Messages }) {
  const { process } = messages
  const timelineRef = useRef<HTMLDivElement>(null)
  const columnsRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<SVGLineElement>(null)
  const played = useRef(false)
  const [layout, setLayout] = useState<Layout | null>(null)
  const reducedMotion = usePrefersReducedMotion()

  const measure = useCallback(() => {
    const timeline = timelineRef.current
    const columns = columnsRef.current
    if (!timeline || !columns) return

    if (window.innerWidth < DESKTOP_MIN_WIDTH) {
      setLayout(null)
      return
    }

    const width = timeline.offsetWidth
    if (width < 10) return

    const timelineLeft = timeline.getBoundingClientRect().left
    const centers = Array.from(columns.children).map((column) => {
      const rect = column.getBoundingClientRect()
      return rect.left - timelineLeft + rect.width / 2
    })

    setLayout((current) => {
      if (current && current.width === width) return current
      return { width, centers }
    })
  }, [])

  /** Mesure dès que la frise est dans le DOM, puis à chaque changement de largeur. */
  const attachTimeline = useCallback(
    (node: HTMLDivElement | null) => {
      timelineRef.current = node
      if (!node) return

      measure()
      const observer = new ResizeObserver(() => measure())
      observer.observe(node)
      return () => observer.disconnect()
    },
    [measure],
  )

  // Ligne cachée au départ, puis dessinée d'un trait à l'arrivée à l'écran.
  useEffect(() => {
    const line = lineRef.current
    const timeline = timelineRef.current
    if (!line || !timeline || !layout || played.current) return

    const length = layout.width
    line.style.strokeDasharray = `${length}`
    line.style.strokeDashoffset = reducedMotion ? '0' : `${length}`

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect()
          played.current = true
          line.style.transition = `stroke-dashoffset ${DRAW_DURATION_MS}ms var(--ease-premium)`
          line.style.strokeDashoffset = '0'
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(timeline)

    return () => observer.disconnect()
  }, [layout, reducedMotion])

  return (
    <section id="comment-ca-marche">
      <div className="container">
        <SectionHead eyebrow={process.eyebrow} title={process.h2} lede={process.lede} />

        <div className="process-timeline" ref={attachTimeline}>
          <svg className="process-flight" width={layout?.width} height={LINE_HEIGHT} aria-hidden="true">
            <line
              x1={0}
              y1={LINE_HEIGHT / 2}
              x2={layout?.width}
              y2={LINE_HEIGHT / 2}
              stroke="var(--line)"
              strokeWidth="1"
            />
            <line
              ref={lineRef}
              x1={0}
              y1={LINE_HEIGHT / 2}
              x2={layout?.width}
              y2={LINE_HEIGHT / 2}
              stroke="var(--gold)"
              strokeWidth="1"
            />
          </svg>

          {layout?.centers.map((x, index) => (
            <div key={index} className="process-marker" style={{ left: x }} aria-hidden="true">
              {NUMERALS[index]}
            </div>
          ))}

          <div className="process-columns" ref={columnsRef}>
            {process.steps.map((step, index) => (
              <Reveal key={step.title} className="process-col">
                <span className="process-mobile-num" aria-hidden="true">
                  {NUMERALS[index]}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
