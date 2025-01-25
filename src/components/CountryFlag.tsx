import * as flags from 'country-flag-icons/react/3x2';

interface CountryFlagProps {
  countryCode: string;
  className?: string;
}

export function CountryFlag({ countryCode, className = "w-6 h-4" }: CountryFlagProps) {
  const code = countryCode.toUpperCase();
  // @ts-ignore - Dynamic access to flags
  const Flag = flags[code];

  if (!Flag) {
    return null;
  }

  return <Flag className={className} title={code} />;
}