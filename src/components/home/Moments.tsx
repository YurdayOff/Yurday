'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { moments as momentList } from '@/data/moments'
import type { Messages } from '@/i18n/messages'
import { SectionHead } from './SectionHead'
import './Moments.css'

type MomentsProps = { messages: Messages }

const AUTO_ADVANCE_MS = 6000

/** Une histoire mise en avant à la fois, qui change en fondu ; jamais deux au même endroit. */
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
            return (
              <article
                className={`moment-slide${i === index ? ' is-active' : ''}`}
                key={id}
                aria-hidden={i !== index}
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
