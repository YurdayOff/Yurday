type CountUpProps = {
  target: number
  suffix?: string
  className?: string
}

/** Affiche directement sa valeur finale (plus de décompte animé). */
export function CountUp({ target, suffix = '', className }: CountUpProps) {
  return (
    <div className={className}>
      {target}
      {suffix}
    </div>
  )
}
