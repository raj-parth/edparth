import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ParthAvatarProps {
  isPasswordFocused?: boolean;
  isTyping?: boolean;
  mood?: 'normal' | 'happy' | 'shy' | 'thinking' | 'celebrate' | 'surprised';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  showBadge?: boolean;
}

export const ParthAvatar: React.FC<ParthAvatarProps> = ({
  isPasswordFocused = false,
  isTyping = false,
  mood = 'normal',
  size = 'md',
  message,
  showBadge = true
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!avatarRef.current) return;
      const rect = avatarRef.current.getBoundingClientRect();
      const avatarCenterX = rect.left + rect.width / 2;
      const avatarCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - avatarCenterX;
      const deltaY = e.clientY - avatarCenterY;
      const maxDistance = 400;

      const eyeLimit = 5;
      const moveX = Math.min(Math.max((deltaX / maxDistance) * eyeLimit, -eyeLimit), eyeLimit);
      const moveY = Math.min(Math.max((deltaY / maxDistance) * eyeLimit, -eyeLimit), eyeLimit);

      setMousePos({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-40 h-40',
    lg: 'w-56 h-56',
    xl: 'w-72 h-72'
  };

  const isCoveringEyes = isPasswordFocused;

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      {/* Speech Bubble */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mb-2 px-3.5 py-1.5 rounded-2xl bg-white text-slate-800 text-xs font-semibold shadow-lg shadow-indigo-500/10 border border-slate-200/80 flex items-center gap-2 z-20"
          >
            <span className="text-sm">✨</span>
            <span>{message}</span>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-slate-200/80" />
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={avatarRef} className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
        {/* Soft Background Tint Halo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-100 via-indigo-100 to-purple-100 blur-xl opacity-80" />

        {/* Clean Modern Illustrated Mascot Character (PARTH) */}
        <svg
          viewBox="0 0 240 240"
          className="w-full h-full relative z-10 overflow-visible"
        >
          <defs>
            <linearGradient id="parthSkin" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffdfc9" />
              <stop offset="100%" stopColor="#f7cca8" />
            </linearGradient>
            <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#4338ca" />
            </linearGradient>
            <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#4f46e5" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Body / Hoodie */}
          <path
            d="M 60 210 C 60 170 80 155 120 155 C 160 155 180 170 180 210 Z"
            fill="url(#hoodieGrad)"
            filter="url(#softShadow)"
          />
          {/* Hoodie Strings / Collar */}
          <path d="M 105 160 L 102 188" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          <path d="M 135 160 L 138 188" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          <circle cx="102" cy="190" r="3" fill="#ffffff" />
          <circle cx="138" cy="190" r="3" fill="#ffffff" />

          {/* Neck */}
          <rect x="108" y="130" width="24" height="28" rx="6" fill="#f0be95" />

          {/* Head & Face */}
          <g>
            {/* Ears */}
            <circle cx="68" cy="105" r="12" fill="url(#parthSkin)" />
            <circle cx="172" cy="105" r="12" fill="url(#parthSkin)" />
            <circle cx="68" cy="105" r="6" fill="#f0be95" />
            <circle cx="172" cy="105" r="6" fill="#f0be95" />

            {/* Face Base */}
            <ellipse cx="120" cy="105" rx="52" ry="50" fill="url(#parthSkin)" filter="url(#softShadow)" />

            {/* Cute Hair with Volume */}
            <path
              d="M 68 95 C 65 60 85 40 120 40 C 160 40 175 60 172 95 C 162 70 145 68 120 68 C 95 68 78 72 68 95 Z"
              fill="url(#hairGrad)"
            />
            {/* Front Bangs */}
            <path
              d="M 74 78 Q 95 90 108 76 Q 130 92 166 74 Q 150 60 120 62 Q 90 60 74 78 Z"
              fill="url(#hairGrad)"
            />

            {/* Smart Glasses */}
            <rect x="78" y="86" width="34" height="28" rx="8" fill="none" stroke="#334155" strokeWidth="3" />
            <rect x="128" y="86" width="34" height="28" rx="8" fill="none" stroke="#334155" strokeWidth="3" />
            <path d="M 112 98 L 128 98" stroke="#334155" strokeWidth="3" />

            {/* Blush Cheeks */}
            <ellipse cx="82" cy="120" rx="7" ry="4" fill="#fb7185" opacity="0.4" />
            <ellipse cx="158" cy="120" rx="7" ry="4" fill="#fb7185" opacity="0.4" />

            {/* Expressive Eyes */}
            {!isCoveringEyes ? (
              <g>
                {/* Left Eye */}
                <g transform={`translate(${95 + (isTyping ? 0 : mousePos.x)}, ${100 + (isTyping ? 3 : mousePos.y)})`}>
                  <circle cx="0" cy="0" r="7" fill="#0f172a" />
                  <circle cx="-2" cy="-2" r="2.5" fill="#ffffff" />
                </g>

                {/* Right Eye */}
                <g transform={`translate(${145 + (isTyping ? 0 : mousePos.x)}, ${100 + (isTyping ? 3 : mousePos.y)})`}>
                  <circle cx="0" cy="0" r="7" fill="#0f172a" />
                  <circle cx="-2" cy="-2" r="2.5" fill="#ffffff" />
                </g>

                {/* Mouth */}
                {mood === 'happy' || mood === 'celebrate' ? (
                  <path d="M 110 128 Q 120 138 130 128" fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                ) : (
                  <path d="M 112 129 Q 120 134 128 129" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
                )}
              </g>
            ) : (
              /* Eyes closed when typing password */
              <g>
                <path d="M 88 100 Q 95 105 102 100" fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <path d="M 138 100 Q 145 105 152 100" fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <path d="M 114 128 Q 120 125 126 128" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            )}

            {/* Hands Animation */}
            <motion.g
              animate={
                isCoveringEyes
                  ? { y: -45, scale: 1.1 }
                  : isTyping
                  ? { y: [0, 4, 0] }
                  : { y: 0 }
              }
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
            >
              {/* Left Hand */}
              <circle
                cx={isCoveringEyes ? 95 : 62}
                cy={isCoveringEyes ? 144 : 175}
                r="15"
                fill="url(#parthSkin)"
                stroke="#f7cca8"
                strokeWidth="2"
                filter="url(#softShadow)"
              />
              {/* Right Hand */}
              <circle
                cx={isCoveringEyes ? 145 : 178}
                cy={isCoveringEyes ? 144 : 175}
                r="15"
                fill="url(#parthSkin)"
                stroke="#f7cca8"
                strokeWidth="2"
                filter="url(#softShadow)"
              />
            </motion.g>
          </g>
        </svg>
      </div>

      {showBadge && (
        <div className="mt-2 px-3.5 py-1 rounded-full bg-white shadow-sm border border-slate-200 text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>PARTH • AI Study Guide</span>
        </div>
      )}
    </div>
  );
};
