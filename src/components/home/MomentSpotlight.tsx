'use client'

import Image from 'next/image'
import { useState } from 'react'

type SpotlightItem = {
  id: string
  image: string
  title: string
  story: string
}

type MomentSpotlightProps = {
  items: SpotlightItem[]
  previousLabel: string
  nextLabel: string
}

/** Une histoire à la fois, en grand format : navigation manuelle uniquement. */
export function MomentSpotlight({ items, previousLabel, nextLabel }: MomentSpotlightProps) {
  const [index, setIndex] = useState(0)
  const current = items[index]
  if (!current) return null

  const go = (delta: number) => {
    setIndex((i) => (i + delta + items.length) % items.length)
  }

  return (
    <div className="moment-spotlight">
      <div className="moment-spotlight-photo">
        <Image
          key={current.id}
          src={current.image}
          alt={current.title}
          width={960}
          height={720}
          sizes="(max-width: 860px) 100vw, 600px"
          priority={index === 0}
        />
      </div>
      <div className="moment-spotlight-text">
        <h3>{current.title}</h3>
        <p>{current.story}</p>
        <div className="moment-spotlight-nav">
          <button type="button" aria-label={previousLabel} onClick={() => go(-1)}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M15 5l-7 7 7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="moment-spotlight-dots">
            {items.map((item, i) => (
              <span key={item.id} className={i === index ? 'is-active' : undefined} />
            ))}
          </div>
          <button type="button" aria-label={nextLabel} onClick={() => go(1)}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M9 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
