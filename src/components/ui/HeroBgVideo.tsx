'use client'

import { useEffect, useRef } from 'react'

type HeroBgVideoProps = {
  src: string
  poster: string
}

/**
 * L'autoplay HTML seul (attributs `muted`/`autoPlay`) n'est pas fiable sur
 * mobile : Safari iOS en particulier exige que `muted` soit posé comme
 * propriété JS avant `play()`, et certains navigateurs bloquent le premier
 * essai. On force la lecture au montage, puis on retente à la première
 * interaction si le navigateur l'a refusée.
 */
export function HeroBgVideo({ src, poster }: HeroBgVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true

    const tryPlay = () => {
      video.play().catch(() => {
        // Autoplay refusé (économie de données, mode batterie...) : on
        // retentera au premier geste de l'utilisateur, capté ci-dessous.
      })
    }

    tryPlay()

    const onFirstInteraction = () => {
      if (video.paused) tryPlay()
    }
    window.addEventListener('touchstart', onFirstInteraction, { once: true, passive: true })
    window.addEventListener('scroll', onFirstInteraction, { once: true, passive: true })
    window.addEventListener('click', onFirstInteraction, { once: true })

    return () => {
      window.removeEventListener('touchstart', onFirstInteraction)
      window.removeEventListener('scroll', onFirstInteraction)
      window.removeEventListener('click', onFirstInteraction)
    }
  }, [])

  return (
    <video
      ref={ref}
      className="hero-bg-video"
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    />
  )
}
