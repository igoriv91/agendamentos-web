interface AppLogoProps {
  size?: number
  className?: string
}

export const AppLogo = ({ size = 40, className }: AppLogoProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="agendall-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1E52C8" />
        <stop offset="100%" stopColor="#0D2470" />
      </linearGradient>
    </defs>

    {/* Background rounded square */}
    <rect width="100" height="100" rx="20" fill="url(#agendall-bg)" />

    {/* Green calendar cell — 2nd col, rows 2-3 */}
    <rect x="34" y="30" width="32" height="40" fill="#22C55E" />

    {/* Horizontal grid lines */}
    <line x1="12" y1="30" x2="88" y2="30" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
    <line x1="12" y1="52" x2="88" y2="52" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
    <line x1="12" y1="70" x2="88" y2="70" stroke="white" strokeWidth="2.8" strokeLinecap="round" />

    {/* Vertical grid lines */}
    <line x1="34" y1="12" x2="34" y2="88" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
    <line x1="66" y1="12" x2="66" y2="88" stroke="white" strokeWidth="2.8" strokeLinecap="round" />

    {/* Checkmark */}
    <polyline
      points="44,60 50,67 63,50"
      fill="none"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
