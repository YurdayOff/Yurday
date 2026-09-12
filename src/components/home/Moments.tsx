'use client'

import Image from 'next/image'
import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import { moments as momentList } from '@/data/moments'
import type { Messages } from '@/i18n/messages'
import { SectionHead } from './SectionHead'
import './Moments.css'

type MomentsProps = { messages: Messages }

const AUTO_ADVANCE_MS = 6000
const STACK_DEPTH = 3

/** Position de chaque carte dans la pile, relative à la carte active. */
function stackStyle(offset: number): CSSProperties {
  if (offset === 0) {
    return { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 1, zIndex: STACK_DEPTH + 1 }
  }
  if (offset > STACK_DEPTH) {
    return { transform: `translate(46px, 46px) rotate(9deg) scale(0.88)`, opacity: 0, zIndex: 0 }
  }
  const step = offset * 14
  return {
    transform: `translate(${step}px, ${step}px) rotate(${offset * 3}deg) scale(${1 - offset * 0.035})`,
    opacity: 1 - offset * 0.16,
    zIndex: STACK_DEPTH + 1 - offset,
  }
}

/** Les histoires se feuillettent comme une pile de photos ; jamais deux au même endroit. */
export function Moments({ messages }: MomentsProps) {
  const { moments } = messages
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % momentList.length)
    }, AUTO_ADVANCE_MS)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section id="moments" className="section-coral">
      <div className="container">
        <SectionHead eyebrow={moments.eyebrow} title={moments.h2} />

        <div className="moment-stage">
          {momentList.map(({ id, image }, i) => {
            const item = moments.items[id as keyof typeof moments.items]
            const offset = (i - index + momentList.length) % momentList.length
            return (
              <article
                className={`moment-slide${offset === 0 ? ' is-active' : ''}`}
                key={id}
                style={stackStyle(offset)}
                aria-hidden={offset !== 0}
              >
                <div className="moment-photo">
                  <Image src={image} alt={item.title} width={640} height={520} sizes="(max-width: 760px) 90vw, 480px" />
                </div>
                <div className="moment-text">
                  <div className="eyebrow moment-kicker">{moments.kicker}</div>
                  <h3>{item.title}</h3>
                  <p>{item.story}</p>
                </div>
              </article>
            )
          })}
        </div>

        <div className="moment-dots">
          {momentList.map(({ id }, i) => (
            <button
              key={id}
              type="button"
              className={`moment-dot${i === index ? ' is-active' : ''}`}
              aria-label={moments.items[id as keyof typeof moments.items].title}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
