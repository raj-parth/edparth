import React from 'react';
import { Target, CheckCircle2, X, Sparkles, BookOpen, GraduationCap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { TargetExam } from '../../types';

const GOAL_OPTIONS: { id: TargetExam; title: string; subtitle: string; iconBg: string; badge: string }[] = [
  {
    id: 'JEE Main/Adv',
    title: 'IIT-JEE (Main & Advanced)',
    subtitle: 'Physics, Chemistry & Mathematics High-Yield Sprint',
    iconBg: 'bg-indigo-500/10 text-indigo-600',
    badge: 'Flagship'
  },
  {
    id: 'NEET UG',
    title: 'NEET UG Medical',
    subtitle: 'NCERT Line-by-Line Biology, Chemistry & Physics',
    iconBg: 'bg-emerald-500/10 text-emerald-600',
    badge: 'Popular'
  },
  {
    id: 'CBSE Class 12',
    title: 'Class 12th Board Exam',
    subtitle: 'Full Board Theory, Exemplars & Derivations',
    iconBg: 'bg-purple-500/10 text-purple-600',
    badge: 'Board 2026'
  },
  {
    id: 'CBSE Class 11',
    title: 'Class 11th Foundation',
    subtitle: 'Mechanics, Organic Basics & Calculus Core',
    iconBg: 'bg-amber-500/10 text-amber-600',
    badge: 'Foundation'
  },
  {
    id: 'CBSE Class 10',
    title: 'Class 10th Board Exam',
    subtitle: 'Science & Maths Concept Booster with PYQs',
    iconBg: 'bg-blue-500/10 text-blue-600',
    badge: 'Board 2026'
  },
  {
    id: 'CBSE Class 9',
    title: 'Class 9th Foundation',
    subtitle: 'Core Science, Physics Laws & Algebra Sprint',
    iconBg: 'bg-teal-500/10 text-teal-600',
    badge: 'Early Starter'
  },
  {
    id: 'Govt Exam (SSC/NDA/CUET)',
    title: 'Govt Exams (NDA / CUET / SSC)',
    subtitle: 'Quantitative Aptitude, General Science & English',
    iconBg: 'bg-rose-500/10 text-rose-600',
    badge: 'Competitive'
  }
];

export const TargetGoalModal: React.FC = () => {
  const { isGoalModalOpen, closeGoalModal, targetGoal, setTargetGoal } = useApp();

  if (!isGoalModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800">
        
        {/* Header */}
        <div className="bg-[#080b11] text-white p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#ff6a00]">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight">Select Your Preparation Goal</h3>
              <p className="text-xs text-slate-400">Customizes your video hub, CBT tests, and study vault</p>
            </div>
          </div>

          <button
            onClick={closeGoalModal}
            className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-3 max-h-[70vh] overflow-y-auto">
          {GOAL_OPTIONS.map((goal) => {
            const isSelected = targetGoal === goal.id;
            return (
              <div
                key={goal.id}
                onClick={() => {
                  setTargetGoal(goal.id);
                  closeGoalModal();
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  isSelected
                    ? 'bg-orange-50/80 border-[#ff6a00] shadow-sm ring-1 ring-[#ff6a00]'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${goal.iconBg}`}>
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900">{goal.title}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                        {goal.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">{goal.subtitle}</p>
                  </div>
                </div>

                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-[#ff6a00] shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-300 shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 font-medium">
          Target goal preference is synced with your student study plan.
        </div>
      </div>
    </div>
  );
};
