interface LogoProps {
  size?: number;
  className?: string;
}

const Logo = ({ size = 48, className = "" }: LogoProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    aria-hidden="true"
  >
    <rect width="64" height="64" rx="14" fill="#120A0C" />
    <rect x="3" y="3" width="58" height="58" rx="12" fill="none" stroke="#D8A93A" strokeWidth="1.2" opacity="0.6" />
    {/* red seal disc */}
    <circle cx="32" cy="32" r="22" fill="#D11F26" />
    <circle cx="32" cy="32" r="22" fill="none" stroke="#F4D488" strokeWidth="1.2" />
    {/* stylised waves */}
    <path
      d="M13 40 C 19 34, 25 46, 32 40 C 39 34, 45 46, 51 40"
      fill="none"
      stroke="#F8F0E3"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path
      d="M15 33 C 21 27, 27 39, 33 33 C 39 27, 45 39, 49 34"
      fill="none"
      stroke="#F4D488"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.85"
    />
    <circle cx="32" cy="22" r="3.4" fill="#F4D488" />
  </svg>
);

export default Logo;
