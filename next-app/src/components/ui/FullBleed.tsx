import Image from 'next/image'
import { Reveal } from './Reveal'
import './FullBleed.css'

type FullBleedProps = {
  src: string
  alt: string
}

/** Interlude plein cadre, sans texte : respire entre deux propos. */
export function FullBleed({ src, alt }: FullBleedProps) {
  return (
    <Reveal className="full-bleed">
      <Image src={src} alt={alt} width={1600} height={1000} sizes="100vw" />
    </Reveal>
  )
}
