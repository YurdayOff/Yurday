import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, isLocale } from '@/i18n/config'

/**
 * Routage des langues, façon « préfixe si nécessaire » :
 *   /            -> réécrit vers /fr            (URL affichée inchangée)
 *   /anniversaire-> réécrit vers /fr/anniversaire
 *   /fr/...      -> redirigé vers /...          (une seule URL indexable par page)
 *   /en/...      -> servi tel quel
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const segments = pathname.split('/').filter(Boolean)
  const first = segments[0]

  if (first === defaultLocale) {
    const url = request.nextUrl.clone()
    url.pathname = `/${segments.slice(1).join('/')}`
    return NextResponse.redirect(url, 308)
  }

  if (first !== undefined && isLocale(first)) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Ni les fichiers statiques, ni les routes internes de Next.
  matcher: ['/((?!_next/|api/|.*\\.).*)'],
}
