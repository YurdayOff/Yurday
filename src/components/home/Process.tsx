'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import type { Messages } from '@/i18n/messages'
import { SectionHead } from './SectionHead'
import './Process.css'

/** Hauteur réservée au vol, au-dessus des colonnes. */
const FLIGHT_HEIGHT = 150
/** Ordonnées de la vague : bas, haut, bas, haut. */
const WAVE_Y = [120, 24, 92, 30]
/** Rayon d'une pastille numérotée et espace souhaité sous celle-ci. */
const MARKER_RADIUS = 23
const MARKER_GAP = 26
const FLIGHT_DURATION_MS = 3200
/** Au-delà, la frise passe en liste verticale (cf. Process.css). */
const DESKTOP_MIN_WIDTH = 861

type Point = { x: number; y: number }

type Layout = {
  width: number
  points: Point[]
  path: string
  /** Décalage vertical de chaque colonne, pour rester à égale distance de sa pastille. */
  offsets: number[]
}

function buildPath(points: Point[]): string {
  const [first, second, third, fourth] = points
  if (!first || !second || !third || !fourth) return ''

  const control = (from: Point, to: Point) => (to.x - from.x) / 3
  const c1 = control(first, second)
  const c2 = control(second, third)
  const c3 = control(third, fourth)

  return (
    `M${first.x},${first.y} ` +
    `C${first.x + c1},${first.y} ${second.x - c1},${second.y} ${second.x},${second.y} ` +
    `C${second.x + c2},${second.y} ${third.x - c2},${third.y} ${third.x},${third.y} ` +
    `C${third.x + c3},${third.y} ${fourth.x - c3},${fourth.y} ${fourth.x},${fourth.y}`
  )
}

export function Process({ messages }: { messages: Messages }) {
  const { process } = messages
  const timelineRef = useRef<HTMLDivElement>(null)
  const columnsRef = useRef<HTMLDivElement>(null)
  const routeRef = useRef<SVGPathElement>(null)
  const planeRef = useRef<SVGGElement>(null)
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

    // Centre réel de chaque colonne : une simple fraction de la largeur
    // ignorerait l'espace entre colonnes.
    const timelineLeft = timeline.getBoundingClientRect().left
    const points = Array.from(columns.children).map((column, index) => {
      const rect = column.getBoundingClientRect()
      return { x: rect.left - timelineLeft + rect.width / 2, y: WAVE_Y[index] ?? 0 }
    })

    const path = buildPath(points)
    setLayout((current) => {
      // Évite un rendu inutile quand la mesure ne change rien.
      if (current && current.width === width && current.path === path) return current
      return {
        width,
        points,
        path,
        offsets: points.map((point) => point.y + MARKER_RADIUS + MARKER_GAP - FLIGHT_HEIGHT),
      }
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

  // Trajectoire cachée au départ, puis dessinée d'un trait à l'arrivée à l'écran.
  useEffect(() => {
    const route = routeRef.current
    const plane = planeRef.current
    const timeline = timelineRef.current
    const start = layout?.points[0]
    if (!route || !plane || !timeline || !start || played.current) return

    const length = route.getTotalLength()
    route.style.strokeDasharray = `${length}`
    route.style.strokeDashoffset = `${length}`
    plane.setAttribute('transform', `translate(${start.x},${start.y})`)
    plane.style.opacity = reducedMotion ? '0' : '1'

    let frame = 0
    const play = () => {
      played.current = true
      if (reducedMotion) {
        route.style.strokeDashoffset = '0'
        return
      }

      const begin = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - begin) / FLIGHT_DURATION_MS)
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
        const distance = eased * length
        const point = route.getPointAtLength(distance)
        const next = route.getPointAtLength(Math.min(length, distance + 1))
        const angle = (Math.atan2(next.y - point.y, next.x - point.x) * 180) / Math.PI
        plane.setAttribute('transform', `translate(${point.x},${point.y}) rotate(${angle})`)
        route.style.strokeDashoffset = `${length - distance}`
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect()
          play()
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(timeline)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [layout, reducedMotion])

  return (
    <section id="comment-ca-marche">
      <div className="container">
        <SectionHead eyebrow={process.eyebrow} title={process.h2} lede={process.lede} />

        <div className="process-timeline" ref={attachTimeline}>
          <svg
            className="process-flight"
            width={layout?.width}
            height={FLIGHT_HEIGHT}
            aria-hidden="true"
          >
            <path
              d={layout?.path}
              fill="none"
              stroke="var(--coral-2)"
              strokeWidth="2"
              strokeDasharray="1 8"
              strokeLinecap="round"
              opacity="0.35"
            />
            <path
              ref={routeRef}
              d={layout?.path}
              fill="none"
              stroke="var(--coral-2)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <g ref={planeRef} className="flight-plane" style={{ opacity: 0 }}>
              <g transform="translate(-10,-9.6) scale(0.8)">
                <path
                  d="M23,12 L2,3.5 L9.5,12 L2,20.5 Z"
                  fill="white"
                  stroke="var(--coral-3)"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path
                  d="M23,12 L9.5,12"
                  fill="none"
                  stroke="var(--coral-3)"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
                <path
                  d="M9.5,12 L6,17.5"
                  fill="none"
                  stroke="var(--coral-3)"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </g>
            </g>
          </svg>

          {layout?.points.map((point, index) => (
            <div
              key={index}
              className="process-marker"
              style={{ left: point.x, top: point.y }}
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, '0')}
            </div>
          ))}

          <div className="process-columns" ref={columnsRef}>
            {process.steps.map((step, index) => (
              <Reveal
                key={step.title}
                className="process-col"
                style={{ marginTop: layout?.offsets[index] }}
              >
                <span className="process-mobile-num" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
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
