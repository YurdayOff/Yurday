'use client'

import { useEffect, useRef, useState } from 'react'

type HeroBgVideoProps = {
  src: string
  /** Variante légère servie sous 900px, pour ne pas charger la HD sur mobile. */
  srcSd?: string
  poster: string
  pauseLabel: string
  playLabel: string
}

/**
 * L'autoplay HTML seul (attributs `muted`/`autoPlay`) n'est pas fiable sur
 * mobile : Safari iOS en particulier exige que `muted` soit posé comme
 * propriété JS avant `play()`, et certains navigateurs bloquent le premier
 * essai. On force la lecture au montage, puis on retente à la première
 * interaction si le navigateur l'a refusée.
 */
export function HeroBgVideo({ src, srcSd, poster, pauseLabel, playLabel }: HeroBgVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    video.src = srcSd && window.innerWidth < 900 ? srcSd : src

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
  }, [src, srcSd])

  const toggle = () => {
    const video = ref.current
    if (!video) return
    if (video.paused) {
      video.play()
      setPaused(false)
    } else {
      video.pause()
      setPaused(true)
    }
  }

  return (
    <>
      <video
        ref={ref}
        className="hero-bg-video"
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <button type="button" className="hero-pause" onClick={toggle}>
        {paused ? playLabel : pauseLabel}
      </button>
    </>
  )
}
