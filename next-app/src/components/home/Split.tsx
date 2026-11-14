import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/ui/Reveal'
import './Split.css'

type SplitContent = {
  eyebrow: string
  title: { lead: string; em: string }
  text: string
  cta: string
}

type SplitProps = {
  id?: string
  content: SplitContent
  image: { src: string; alt: string }
  href: string
  /** Image à droite plutôt qu'à gauche. */
  reverse?: boolean
}

/** Duo éditorial image/texte : présente un public (particuliers ou entreprises). */
export function Split({ id, content, image, href, reverse = false }: SplitProps) {
  return (
    <section id={id} className={reverse ? 'split rev' : 'split'}>
      <Reveal className="split-pic" as="div">
        <Image src={image.src} alt={image.alt} width={900} height={760} sizes="(max-width: 900px) 100vw, 50vw" />
      </Reveal>
      <div className="split-txt">
        <Reveal>
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 className="title">
            {content.title.lead}
            <em>{content.title.em}</em>
          </h2>
          <p className="text">{content.text}</p>
          <Link href={href} className="link-underline">
            {content.cta}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
