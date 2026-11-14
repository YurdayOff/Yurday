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

    // Parallax léger : la vidéo défile un peu plus lentement que la page,
    // pour donner une impression de profondeur au scroll. Désactivé si
    // l'utilisateur préfère moins de mouvement.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const offset = Math.min(window.scrollY * 0.25, 160)
        video.style.transform = `translate3d(0, ${offset}px, 0) scale(1.12)`
      })
    }
    if (!reduceMotion) {
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
    }

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
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
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
