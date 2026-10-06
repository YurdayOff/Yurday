'use client'

import Link from 'next/link'
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'

type HashLinkProps = {
  href: string
  className?: string
  children: ReactNode
  onNavigate?: () => void
} & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'aria-label'>

/**
 * Lien vers une ancre (`#contact`, `/en#contact`...). Next.js ne défile pas
 * toujours jusqu'à la cible pour une navigation vers la même page (le hash
 * change mais le scroll n'a pas lieu) : on gère donc le défilement nous-mêmes
 * quand l'élément existe déjà dans la page, et on laisse Link faire une
 * vraie navigation sinon (ex. depuis une page occasion vers l'accueil).
 */
export function HashLink({ href, className, children, onNavigate, ...rest }: HashLinkProps) {
  const hashIndex = href.indexOf('#')
  const id = hashIndex === -1 ? null : href.slice(hashIndex + 1)
  const path = hashIndex === -1 ? href : href.slice(0, hashIndex)

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.()
    if (!id) return
    // Cible absente (page différente) : navigation normale, rien à intercepter.
    if (path && path !== window.location.pathname) return

    const target = document.getElementById(id)
    if (!target) return

    event.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.pushState(null, '', href)
  }

  return (
    <Link href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </Link>
  )
}
