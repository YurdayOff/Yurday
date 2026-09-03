import type { NextConfig } from 'next'

/**
 * Anciennes URL (site statique) -> nouvelles URL propres.
 * Redirections permanentes pour conserver le référencement acquis.
 */
const legacyRedirects = [
  { source: '/index.html', destination: '/' },
  { source: '/anniversaire.html', destination: '/anniversaire' },
  { source: '/demande-en-mariage.html', destination: '/demande-en-mariage' },
  { source: '/fete-des-meres.html', destination: '/fete-des-meres' },
  { source: '/evg-evjf.html', destination: '/evg-evjf' },
  { source: '/pot-de-depart.html', destination: '/pot-de-depart' },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/webp'],
  },
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }))
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ]
  },
}

export default nextConfig
