type FacebookIconProps = {
  size?: number
  className?: string
}

/** Glyphe Facebook, utilisé dans le footer. Même style trait que InstagramIcon. */
export function FacebookIcon({ size = 24, className }: FacebookIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M13.4 20v-7.3h2.1l.3-2.4h-2.4V8.7c0-.7.2-1.1 1.1-1.1h1.3V5.3c-.2 0-1-.1-1.8-.1-1.8 0-3.1 1.1-3.1 3.2v2h-2.1v2.4h2.1V20" />
    </svg>
  )
}
