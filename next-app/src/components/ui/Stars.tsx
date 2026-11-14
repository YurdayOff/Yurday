type StarsProps = {
  /** Nombre d'étoiles pleines (5 par défaut). */
  count?: number
  className?: string
  /** Description lue par les lecteurs d'écran. */
  label: string
}

/** Étoiles décoratives : la note chiffrée reste dans le texte voisin. */
export function Stars({ count = 5, className = 'stars', label }: StarsProps) {
  return (
    <div className={className} role="img" aria-label={label}>
      {'★'.repeat(count)}
    </div>
  )
}
