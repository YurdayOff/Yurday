import { Reveal } from '@/components/ui/Reveal'

type SectionHeadProps = {
  eyebrow: string
  title: string
  /** Chapeau optionnel sous le titre. */
  lede?: string
  className?: string
}

/** En-tête centré commun à toutes les sections de la page d'accueil. */
export function SectionHead({ eyebrow, title, lede, className }: SectionHeadProps) {
  const classes = className ? `section-head ${className}` : 'section-head'

  return (
    <Reveal className={classes}>
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      {lede ? <p>{lede}</p> : null}
    </Reveal>
  )
}
