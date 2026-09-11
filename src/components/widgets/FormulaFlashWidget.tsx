import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';

const FORMULA_CARDS = [
  {
    subject: 'Physics (JEE / Class 12)',
    topic: 'Capacitance & Dielectrics',
    formula: 'C = (K * ε₀ * A) / d',
    notes: 'Energy stored U = ½ C V² = Q² / (2C). When dielectric is inserted with battery connected, V is constant and C increases by factor K.'
  },
  {
    subject: 'Chemistry (NEET / Class 11)',
    topic: 'Thermodynamics',
    formula: 'ΔG = ΔH - TΔS',
    notes: 'For spontaneity, ΔG < 0. At equilibrium, ΔG = 0 and ΔG° = -RT ln K_eq.'
  },
  {
    subject: 'Mathematics (Class 12 / JEE)',
    topic: 'Definite Integrals Property',
    formula: '∫[0 to a] f(x)dx = ∫[0 to a] f(a-x)dx',
    notes: 'Classic King\'s Property used to evaluate trigonometric and algebraic symmetric integrals.'
  },
  {
    subject: 'Biology (NEET / Class 11)',
    topic: 'Photosynthesis',
    formula: '6CO₂ + 12H₂O + light → C₆H₁₂O₆ + 6O₂ + 6H₂O',
    notes: 'Rubisco is the most abundant enzyme in the biosphere, functioning in the Calvin (C3) cycle.'
  }
];

export const FormulaFlashWidget: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const card = FORMULA_CARDS[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % FORMULA_CARDS.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + FORMULA_CARDS.length) % FORMULA_CARDS.length);
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
            Formula Flashcard
          </span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">
          {currentIndex + 1} / {FORMULA_CARDS.length}
        </span>
      </div>

      {/* 3D Card Area */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="cursor-pointer min-h-[120px] p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 hover:border-indigo-300 transition-all flex flex-col justify-between"
      >
        <div>
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
            {card.subject} • {card.topic}
          </span>
          <div className="mt-1.5 text-sm sm:text-base font-black font-mono text-slate-900">
            {card.formula}
          </div>
        </div>

        {isFlipped ? (
          <p className="text-xs text-indigo-900 mt-2 leading-relaxed bg-white/90 p-2 rounded-xl border border-indigo-100">
            💡 {card.notes}
          </p>
        ) : (
          <p className="text-[10px] text-slate-400 italic mt-2">
            Click card to reveal key exam tip ↻
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={handlePrev}
          className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
        >
          {isFlipped ? 'Hide Tip' : 'Flip Tip'}
        </button>

        <button
          onClick={handleNext}
          className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
