import React from 'react';
import { motion } from 'framer-motion';
import { HeroAnimation } from './HeroAnimation';
import { PomodoroWidget } from './widgets/PomodoroWidget';
import { FormulaFlashWidget } from './widgets/FormulaFlashWidget';
import { ParthAvatar } from './ParthAvatar';
import { Zap, BookOpen, Sparkles, Shield, ArrowRight, Award, Flame, Users, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CBTExam } from '../types';

interface HomeSectionProps {
  onStartExam: (exam: CBTExam) => void;
  onExploreVault: () => void;
  onRequestMaterial: () => void;
  onExploreCbtList: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  onStartExam,
  onExploreVault,
  onRequestMaterial,
  onExploreCbtList
}) => {
  const { exams, contentList, openAuthModal, currentUser } = useApp();

  return (
    <div className="space-y-16">
      {/* 1. Hyperrealistic Animated Hero */}
      <HeroAnimation
        onExploreClick={onExploreVault}
        onLoginClick={() => openAuthModal('login')}
        onCbtClick={onExploreCbtList}
      />

      {/* 2. Gen-Z Real-time Interactive Widgets Row */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Study Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Gen-Z Live Study Widgets
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono hidden sm:block">
            Realtime Focus & Revision
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Widget 1: Pomodoro Study Clock */}
          <PomodoroWidget />

          {/* Widget 2: Instant Formula Flashcard */}
          <FormulaFlashWidget />

          {/* Widget 3: Live Mascot Motivation Card */}
          <div className="glass-panel p-5 rounded-3xl border border-purple-500/30 flex flex-col justify-between space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Parth AI Study Coach
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <div className="flex items-center justify-center py-1">
              <ParthAvatar
                size="sm"
                mood="happy"
                message="Let's crush today's target! 🎯"
              />
            </div>

            <div className="text-center">
              <p className="text-xs text-slate-300 font-medium">
                "Solve 20 PYQs daily to rank in top 1% of JEE & NEET."
              </p>
              <button
                onClick={onExploreCbtList}
                className="mt-3 w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-md cursor-pointer hover:scale-[1.01] transition-transform"
              >
                Attempt Daily Sprint Test →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured CBT Mock Tests Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
                <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                <span>NTA JEE & NEET Examination Engine</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Featured Computer Based Tests
              </h2>
            </div>

            <button
              onClick={onExploreCbtList}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
            >
              <span>View All Test Series ({exams.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.slice(0, 3).map((exam) => (
              <div
                key={exam.id}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {exam.targetExam}
                  </span>
                  <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                    {exam.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>{exam.questions.length} Qs</span>
                    <span>•</span>
                    <span>{exam.durationMinutes} Mins</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-semibold">{exam.totalMarks} Marks</span>
                  </div>
                </div>

                <button
                  onClick={() => onStartExam(exam)}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  <span>Start Test</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Request Custom Materials Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-slate-950 via-emerald-950/20 to-slate-950 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
          <div className="space-y-3 text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Special Student Service</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Can't Find A Rare Book or DPP Solution?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Submit a quick material request to <strong>Raj Sir & the EdParth academic team</strong>. We upload verified solutions, formula compendiums, and high-yield question sheets within 24 hours.
            </p>
          </div>

          <button
            onClick={onRequestMaterial}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 border border-emerald-400/30"
          >
            <Sparkles className="w-5 h-5" />
            <span>Submit Material Request Now</span>
          </button>
        </div>
      </section>
    </div>
  );
};
