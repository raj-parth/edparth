import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Coffee, Flame } from 'lucide-react';

export const PomodoroWidget: React.FC = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setIsActive(false);
          if (mode === 'focus') {
            setMode('break');
            setMinutes(5);
            setSeconds(0);
          } else {
            setMode('focus');
            setMinutes(25);
            setSeconds(0);
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, mode]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(mode === 'focus' ? 25 : 5);
    setSeconds(0);
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {mode === 'focus' ? (
            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
          ) : (
            <Coffee className="w-4 h-4 text-emerald-500" />
          )}
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
            {mode === 'focus' ? 'Deep Study Session' : 'Quick Recharge'}
          </span>
        </div>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-slate-600"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-indigo-600" />}
        </button>
      </div>

      {/* Clock display */}
      <div className="text-center py-1">
        <div className="text-3xl font-black font-mono tracking-tight text-slate-900">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <p className="text-[10px] font-bold text-slate-400 mt-0.5">
          {isActive ? 'Focus Mode is Active' : 'Timer Paused'}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={toggleTimer}
          className={`px-4 py-2 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
            isActive
              ? 'bg-amber-500 text-white hover:bg-amber-600'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isActive ? 'Pause' : 'Start Focus'}</span>
        </button>

        <button
          onClick={resetTimer}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
