'use client'

import { useEffect, useState } from 'react'
import type { Messages } from '@/i18n/messages'
import './Testimonials.css'

/** Citations clients, une à la fois, qui tournent seules toutes les 7 secondes. */
export function Testimonials({ messages }: { messages: Messages }) {
  const { testimonials } = messages
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.quotes.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [testimonials.quotes.length])

  return (
    <section className="sec dark testimonials">
      <span className="eyebrow">{testimonials.eyebrow}</span>
      <div className="quotes">
        {testimonials.quotes.map((quote, i) => (
          <div className={i === index ? 'quote on' : 'quote'} key={quote.who}>
            <p>{quote.text}</p>
            <div className="who">{quote.who}</div>
          </div>
        ))}
      </div>
      <div className="dots">
        {testimonials.quotes.map((quote, i) => (
          <button
            key={quote.who}
            type="button"
            className={i === index ? 'on' : undefined}
            aria-label={quote.who}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  )
}
