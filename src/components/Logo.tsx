import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showSubtitle?: boolean;
  theme?: 'dark' | 'light' | 'white' | 'auto';
  variant?: 'horizontal' | 'vertical' | 'icon';
  useImage?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showSubtitle = true,
  theme = 'auto',
  variant = 'horizontal',
  useImage = false,
  className = ''
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20'
  };

  const titleSizes = {
    sm: 'text-base font-black',
    md: 'text-xl font-black',
    lg: 'text-2xl font-black',
    xl: 'text-3xl font-black',
    '2xl': 'text-4xl font-black'
  };

  const subtitleSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm',
    '2xl': 'text-base'
  };

  // Luxury A1 Corporate Color Palette (Zero neon)
  const isDarkSurface = theme === 'dark' || theme === 'white';
  const textColor = isDarkSurface ? 'text-white' : 'text-[#0b0f19]';
  const subtitleColor = isDarkSurface ? 'text-slate-400' : 'text-slate-500';
  const epStemColor = isDarkSurface ? '#ffffff' : '#0b0f19';
  const epCutoutColor = isDarkSurface ? '#080b11' : '#ffffff';

  return (
    <div
      className={`inline-flex items-center gap-3 select-none group ${
        variant === 'vertical' ? 'flex-col text-center' : ''
      } ${className}`}
    >
      {/* Official EdParth EP Monogram with Orange Play Button */}
      {useImage ? (
        <div className={`relative ${iconDimensions[size]} shrink-0 rounded-2xl overflow-hidden shadow-sm transition-transform duration-200 group-hover:scale-105`}>
          <img
            src="/logo.png"
            alt="EdParth Official Logo"
            className="w-full h-full object-contain"
          />
        </div>
      ) : (
        <div className={`relative ${iconDimensions[size]} shrink-0 transition-transform duration-200 group-hover:scale-105`}>
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-sm"
          >
            {/* Outer stylized interlocking E & P glyph */}
            <rect x="18" y="14" width="16" height="72" rx="8" fill={epStemColor} />
            
            {/* Top Bar spanning across to create P loop */}
            <path
              d="M18 22C18 17.5817 21.5817 14 26 14H62C74.1503 14 84 23.8497 84 36C84 48.1503 74.1503 58 62 58H34V46H62C67.5228 46 72 41.5228 72 36C72 30.4772 67.5228 26 62 26H26C21.5817 26 18 22.4183 18 22Z"
              fill={epStemColor}
            />

            {/* Middle arm of E */}
            <rect x="18" y="44" width="30" height="12" rx="6" fill={epStemColor} />

            {/* Bottom bar of E */}
            <path
              d="M18 78C18 82.4183 21.5817 86 26 86H68C72.4183 86 76 82.4183 76 78C76 73.5817 72.4183 70 68 70H26C21.5817 70 18 73.5817 18 78Z"
              fill={epStemColor}
            />

            {/* Inner P loop cutout */}
            <path
              d="M34 26H60C65.5228 26 70 30.4772 70 36C70 41.5228 65.5228 46 60 46H34V26Z"
              fill={epCutoutColor}
            />

            {/* Iconic Vibrant Signature EdParth Orange Play Triangle */}
            <path
              d="M48 26L76 41L48 56V26Z"
              fill="#ff6a00"
              className="drop-shadow-[0_2px_8px_rgba(255,106,0,0.5)]"
            />
          </svg>
        </div>
      )}

      {variant !== 'icon' && (
        <div className="leading-tight text-left">
          <div className="flex items-center tracking-tight">
            <span className={`${titleSizes[size]} ${textColor} font-sans font-black tracking-tight`}>
              Ed<span className="text-[#ff6a00]">Parth</span>
            </span>
          </div>

          {showSubtitle && (
            <p className={`${subtitleSizes[size]} ${subtitleColor} font-semibold tracking-normal mt-0.5 whitespace-nowrap`}>
              Your Learning Companion
            </p>
          )}
        </div>
      )}
    </div>
  );
};
