import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, BookOpen, Clock, Award, Play, ChevronRight, CheckCircle2, Flame, ChevronDown, ChevronUp, HelpCircle, MessageSquare, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { CBTExam } from '../../types';
import { PomodoroWidget } from '../widgets/PomodoroWidget';
import { FormulaFlashWidget } from '../widgets/FormulaFlashWidget';
import { ParthAvatar } from '../ParthAvatar';

interface StudentHomeViewProps {
  onStartExam: (exam: CBTExam) => void;
  onExploreVault: () => void;
  onExploreCbtList: () => void;
  onExploreLectures: () => void;
  onOpenChat: () => void;
  onOpenDoubts?: () => void;
}

export const StudentHomeView: React.FC<StudentHomeViewProps> = ({
  onStartExam,
  onExploreVault,
  onExploreCbtList,
  onExploreLectures,
  onOpenChat,
  onOpenDoubts
}) => {
  const { exams, currentUser, requireAuth, targetGoal } = useApp();

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const courses = [
    {
      id: 'c1',
      title: 'JEE Physics: Rotational Dynamics & Center of Mass Solved Sprint',
      category: 'Physics',
      categoryColor: 'bg-indigo-50 text-indigo-700',
      progress: 75,
      lessons: '9/12 Practiced',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
      tag: 'JEE Main & Adv'
    },
    {
      id: 'c2',
      title: 'NEET Chemistry: Coordination Compounds & Chemical Bonding High-Yield',
      category: 'Chemistry',
      categoryColor: 'bg-emerald-50 text-emerald-700',
      progress: 50,
      lessons: '5/10 Practiced',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80',
      tag: 'NEET UG'
    },
    {
      id: 'c3',
      title: 'Class 12 Maths: Definite Integrals & Area Under Curves Masterclass',
      category: 'Mathematics',
      categoryColor: 'bg-purple-50 text-purple-700',
      progress: 90,
      lessons: '10/11 Practiced',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
      tag: 'CBSE Class 12'
    }
  ];

  const faqs = [
    {
      q: 'How does the EdParth CBT Test Simulation work?',
      a: 'The EdParth CBT engine strictly replicates real-world NTA examination screens for JEE Main/Adv and NEET UG with full question palettes, color legends, countdown timer, negative markings, and instant percentile solutions.'
    },
    {
      q: 'How can I request specific reference books or solved notes?',
      a: 'Head over to the "Community & Chats" tab or post a single message mentioning the book or chapter notes you need. Our faculty team reviews and uploads verified PDFs.'
    },
    {
      q: 'Are the study materials and video lectures free to access?',
      a: 'Yes! Simply create your free student account on EdParth using your Gmail and class grade to access all PDF notes, formula sheets, CBT test series, and video lectures.'
    },
    {
      q: 'Where can I get daily PDF updates on Telegram?',
      a: 'You can join our official verified Telegram channel at https://t.me/edparthbooks for direct PDF downloads and daily question updates.'
    }
  ];

  return (
    <div className="p-4 sm:p-8 space-y-10 max-w-[1600px] mx-auto">
      {/* Top Welcome Banner with Mascot */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden text-left">
        <div className="space-y-2 z-10 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100 font-mono">
            <Flame className="w-3.5 h-3.5 text-[#ff6a00] fill-[#ff6a00]" />
            <span>Target Exam: {targetGoal} • 2026 Academic Excellence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
            {currentUser ? `Welcome back, ${currentUser.name}!` : 'Welcome to EdParth!'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            NTA CBT Test Series, Verified Book Vault, and 24/7 AI Doubt Resolution.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <button
            onClick={() => onOpenDoubts && onOpenDoubts()}
            className="px-5 py-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-[#ff6a00] border border-amber-200 text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <span>Ask 24/7 AI Doubt</span>
            <span>→</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT & CENTER: Main Dashboard Content (8 cols) */}
        <div className="xl:col-span-8 space-y-8">
          
          {/* 1. HERO BANNER: Continue Learning (matching Image 1) */}
          <div className="relative rounded-3xl bg-gradient-to-r from-[#534be7] via-[#5d56f0] to-[#7169f4] p-7 sm:p-9 text-white overflow-hidden shadow-xl shadow-indigo-500/15">
            {/* Background Geometric Star Vector */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none hidden sm:block">
              <svg width="220" height="220" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="50,0 60,35 95,50 60,65 50,100 40,65 5,50 40,35" />
                <circle cx="50" cy="50" r="20" />
              </svg>
            </div>

            <div className="relative z-10 max-w-lg space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold tracking-wider uppercase backdrop-blur-md">
                ONLINE LEARNING & TEST ENGINE
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Continue Your Study & Exam Preparation
              </h2>

              <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed font-normal">
                Class 9-12 CBSE/ICSE, JEE Main & Advanced, NEET UG, and Competitive Government examinations.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => requireAuth(onExploreCbtList)}
                  className="px-6 py-2.5 rounded-full bg-white text-indigo-700 font-extrabold text-xs shadow-md hover:bg-indigo-50 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>Launch CBT Mock Test</span>
                </button>

                <button
                  onClick={() => requireAuth(onExploreVault)}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                >
                  Study Material Vault
                </button>
              </div>
            </div>

            {/* Quick Status Pills */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white/95 rounded-2xl p-3.5 text-slate-800 flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">JEE Physics</span>
                  <span className="text-xs font-extrabold text-slate-900">4/10 Tests Done</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs">
                  ⚛️
                </div>
              </div>

              <div className="bg-white/95 rounded-2xl p-3.5 text-slate-800 flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">NEET Chemistry</span>
                  <span className="text-xs font-extrabold text-slate-900">6/8 Modules Done</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-xs">
                  🧪
                </div>
              </div>

              <div className="bg-white/95 rounded-2xl p-3.5 text-slate-800 flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">Class 12 Maths</span>
                  <span className="text-xs font-extrabold text-slate-900">9/12 Solved</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 font-bold text-xs">
                  📐
                </div>
              </div>
            </div>
          </div>

          {/* 2. SECTION: Continue Study Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Continue Studying
              </h3>
              <button
                onClick={() => requireAuth(onExploreLectures)}
                className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
              >
                <span>Watch Lectures</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-3">
                    <div className="relative h-36 rounded-2xl overflow-hidden bg-slate-100">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${course.categoryColor} shadow-sm`}>
                        {course.category}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h4>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400">
                        <span>{course.lessons}</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-indigo-600"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500">{course.tag}</span>
                    <button
                      onClick={() => requireAuth(onExploreCbtList)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                    >
                      Practice →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. SECTION: Available Real CBT Mock Tests */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Recommended NTA CBT Tests
              </h3>
              <span className="text-xs font-bold text-slate-400 font-mono">
                {exams.length} Test Papers
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {exams.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-50 text-indigo-700">
                        {exam.targetExam}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{exam.durationMinutes} Mins</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug">{exam.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{exam.subject} • {exam.questions.length} Questions</p>
                  </div>

                  <button
                    onClick={() => requireAuth(() => onStartExam(exam))}
                    className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Zap className="w-3.5 h-3.5 fill-white" />
                    <span>Launch Test Screen</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 4. SECTION: FAQs (Clean & Professional) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-extrabold text-slate-900">
                Frequently Asked Questions (FAQs)
              </h3>
            </div>

            <div className="divide-y divide-slate-100">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="py-3.5">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold text-slate-800 hover:text-indigo-600 transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-indigo-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {isOpen && (
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed pl-1">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Statistics & Widgets */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* Card 1: Statistic Card with Weekly Bar Chart */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-5">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="relative">
                <img
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                  alt="Student"
                  className="w-20 h-20 rounded-full object-cover border-2 border-indigo-100 shadow-md"
                />
                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
              </div>

              <div>
                <h4 className="font-extrabold text-base text-slate-900">
                  {currentUser ? `Welcome, ${currentUser.name}!` : 'Welcome to edparth!'}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {currentUser ? `${currentUser.classGrade || 'Class 12'} • Target: ${currentUser.targetExam || 'JEE Main'}` : 'Sign in to track your test rankings'}
                </p>
              </div>
            </div>

            {/* Weekly Study Hours Bar Chart */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Weekly Hours</span>
                <span className="text-indigo-600">28.5 hrs</span>
              </div>

              <div className="flex items-end justify-between gap-2 h-36 pt-4 pb-2">
                {[
                  { day: 'Mon', hours: 40, height: '40%' },
                  { day: 'Tue', hours: 65, height: '65%' },
                  { day: 'Wed', hours: 50, height: '50%' },
                  { day: 'Thu', hours: 85, height: '85%', active: true },
                  { day: 'Fri', hours: 70, height: '70%' },
                  { day: 'Sat', hours: 90, height: '90%' },
                  { day: 'Sun', hours: 60, height: '60%' }
                ].map((col, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div
                      className={`w-full rounded-t-xl transition-all ${
                        col.active
                          ? 'bg-indigo-600 shadow-md shadow-indigo-600/20'
                          : 'bg-indigo-100 hover:bg-indigo-200'
                      }`}
                      style={{ height: col.height }}
                    />
                    <span className="text-[10px] font-bold text-slate-400">{col.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Streak & XP */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-amber-900">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-pulse" />
                <div>
                  <p className="text-xs font-extrabold">{currentUser?.stats.streakDays || 19} Days Streak</p>
                  <p className="text-[10px] text-amber-700">Keep it active daily!</p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-orange-600">+{currentUser?.stats.xp || 2450} XP</span>
            </div>
          </div>

          {/* Card 2: Pomodoro Focus Clock */}
          <PomodoroWidget />

          {/* Card 3: Formula Flashcard */}
          <FormulaFlashWidget />

          {/* Card 4: Community Chat Trigger */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3 text-center">
            <MessageSquare className="w-8 h-8 text-indigo-600 mx-auto" />
            <h4 className="text-sm font-extrabold text-slate-900">Student Discussion & Notes Desk</h4>
            <p className="text-xs text-slate-500">
              Ask doubts or request specific book solutions from the faculty team in 1 message.
            </p>
            <button
              onClick={onOpenChat}
              className="w-full py-2.5 rounded-full bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs transition-colors"
            >
              Open Community Room
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
