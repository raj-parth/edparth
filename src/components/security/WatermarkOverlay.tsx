import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';

interface WatermarkOverlayProps {
  opacity?: number;
  position?: 'floating' | 'grid';
}

export const WatermarkOverlay: React.FC<WatermarkOverlayProps> = ({
  opacity = 0.16,
  position = 'floating'
}) => {
  const { currentUser } = useApp();
  const [pos, setPos] = useState({ x: 20, y: 30 });
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Slowly drift the watermark across the screen to foil static crop filters
  useEffect(() => {
    if (position !== 'floating') return;
    const moveInterval = setInterval(() => {
      setPos({
        x: Math.floor(10 + Math.random() * 65),
        y: Math.floor(15 + Math.random() * 65)
      });
    }, 6000);
    return () => clearInterval(moveInterval);
  }, [position]);

  const studentName = currentUser?.name || 'STUDENT_SESSION';
  const studentEmail = currentUser?.email
    ? currentUser.email.replace(/(.{2})(.*)(@.*)/, '$1***$3')
    : 'EDPARTH-2026';
  const studentId = currentUser?.id || 'SEC_9921';

  if (position === 'grid') {
    return (
      <div 
        className="pointer-events-none absolute inset-0 z-30 overflow-hidden select-none flex flex-wrap gap-16 p-8 items-center justify-around"
        style={{ opacity }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i} 
            className="transform -rotate-12 text-slate-400 font-mono text-[11px] font-bold tracking-widest text-center"
          >
            <div>EDPARTH SECURE • {studentName}</div>
            <div>{studentEmail} • {studentId}</div>
            <div>{timeStr}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden select-none">
      <div
        className="absolute transition-all duration-1000 ease-in-out font-mono text-xs font-black tracking-widest px-3.5 py-2 rounded-xl border border-white/20 bg-slate-950/40 backdrop-blur-[2px] text-white shadow-lg"
        style={{
          top: `${pos.y}%`,
          left: `${pos.x}%`,
          opacity,
          transform: 'rotate(-6deg)'
        }}
      >
        <div className="flex items-center gap-1.5 text-[10px] text-amber-300 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>EDPARTH SECURE DRM</span>
        </div>
        <div className="text-[11px] text-white font-bold">{studentName} ({studentId})</div>
        <div className="text-[9px] text-slate-300">{studentEmail} • {timeStr}</div>
      </div>
    </div>
  );
};
