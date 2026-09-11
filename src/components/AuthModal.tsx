import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, Mail, Lock, ArrowRight, Shield, Zap, BookOpen, MessageSquare, Tv, Sparkles, CheckCircle2, User as UserIcon, Phone, School, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import type { ClassGrade, TargetExam } from '../types';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    setAuthModalMode,
    loginUser,
    registerStudent,
    students
  } = useApp();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [school, setSchool] = useState('');
  const [classGrade, setClassGrade] = useState<ClassGrade>('Class 12');
  const [targetExam, setTargetExam] = useState<TargetExam>('JEE Main/Adv');

  if (!isAuthModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    // 1. SECRET ADMIN LOGIN
    if (trimmedEmail === 'parthverse0@gmail.com' && trimmedPassword === 'mos2026rk') {
      setTimeout(() => {
        loginUser({
          id: 'admin_1',
          name: 'RAJ (Master Admin)',
          email: 'parthverse0@gmail.com',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          joinedAt: '2026-01-01',
          stats: { testsGiven: 0, studyHours: 999, streakDays: 100, avgScore: 100, xp: 99999 }
        });
      }, 300);
      return;
    }

    // 2. STUDENT LOGIN
    const found = students.find(s => s.email.toLowerCase() === trimmedEmail);
    if (found) {
      setTimeout(() => {
        loginUser(found);
      }, 300);
    } else {
      // Auto-register student if logging in directly
      const newStudent = {
        name: email.split('@')[0] || 'Student',
        email: email.trim(),
        phone: phone || '+91 98765 00000',
        school: 'School / Institute',
        classGrade: classGrade,
        targetExam: targetExam
      };
      registerStudent(newStudent);
    }
  };

  const handleStudentSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMessage('Please provide your full name and email address.');
      return;
    }

    setTimeout(() => {
      registerStudent({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        school: school.trim() || 'School / College',
        classGrade,
        targetExam
      });
    }, 300);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-slate-950 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.9)] border border-slate-800 overflow-hidden my-6 flex flex-col md:flex-row text-slate-100"
        >
          {/* Ambient Glow Accents */}
          <div className="absolute top-0 right-1/4 w-96 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-96 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors z-30 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* LEFT SIDE: Professional Auth Form */}
          <div className="w-full md:w-7/12 p-6 sm:p-10 flex flex-col justify-between relative z-10 bg-slate-950/60">
            <div>
              {/* Brand & Title */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between">
                  <Logo size="sm" theme="dark" showSubtitle={false} />
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] font-mono font-bold">
                    <Shield className="w-3 h-3 text-cyan-400" />
                    <span>SECURE GATEWAY</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-heading">
                    {authModalMode === 'login' ? 'Welcome Back' : 'Create Student Profile'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
                    {authModalMode === 'login'
                      ? 'Sign in to continue your mock test sessions, notes vault & peer chat.'
                      : 'Get unlimited access to NTA CBT mock tests, formula cards, and chapter videos.'}
                  </p>
                </div>
              </div>

              {/* Mode Toggle Switcher */}
              <div className="grid grid-cols-2 gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => { setAuthModalMode('login'); setErrorMessage(''); }}
                  className={`py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer font-sans ${
                    authModalMode === 'login'
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthModalMode('signup'); setErrorMessage(''); }}
                  className={`py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer font-sans ${
                    authModalMode === 'signup'
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1. SIGN IN FORM */}
              {authModalMode === 'login' && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-sans">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="youremail@gmail.com"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-slate-600 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-sans">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-slate-600 rounded-xl pl-10 pr-11 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#ff6a00] hover:bg-[#ea580c] text-white font-sans font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>Sign In to EdParth</span>
                    <span>→</span>
                  </button>
                </form>
              )}

              {/* 2. SIGN UP FORM */}
              {authModalMode === 'signup' && (
                <form onSubmit={handleStudentSignup} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 font-sans">Full Name *</label>
                    <div className="relative">
                      <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Parth Sharma"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-slate-600 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 font-sans">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@gmail.com"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-slate-600 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1 font-sans">Class / Grade</label>
                      <select
                        value={classGrade}
                        onChange={(e) => setClassGrade(e.target.value as ClassGrade)}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-slate-600 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none font-medium"
                      >
                        <option value="Class 9">Class 9</option>
                        <option value="Class 10">Class 10</option>
                        <option value="Class 11">Class 11</option>
                        <option value="Class 12">Class 12</option>
                        <option value="Dropper/Target">Dropper / Target</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1 font-sans">Target Exam</label>
                      <select
                        value={targetExam}
                        onChange={(e) => setTargetExam(e.target.value as TargetExam)}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-slate-600 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none font-medium"
                      >
                        <option value="JEE Main/Adv">JEE Main / Adv</option>
                        <option value="NEET UG">NEET UG</option>
                        <option value="Govt Exam (SSC/NDA/CUET)">Govt Exams</option>
                        <option value="CBSE Class 12">Class 12 CBSE</option>
                        <option value="CBSE Class 10">Class 10 CBSE</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1 font-sans">School / Coaching</label>
                      <input
                        type="text"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        placeholder="School Name"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-slate-600 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1 font-sans">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-slate-600 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 font-sans">Create Password *</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-slate-600 rounded-xl pl-10 pr-11 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#ff6a00] hover:bg-[#ea580c] text-white font-sans font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
                  >
                    <span>Complete Registration</span>
                    <span>→</span>
                  </button>
                </form>
              )}
            </div>

            {/* Bottom Toggle Note */}
            <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
              {authModalMode === 'login' ? (
                <span>
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthModalMode('signup')}
                    className="font-bold text-[#ff6a00] hover:underline cursor-pointer"
                  >
                    Register free profile
                  </button>
                </span>
              ) : (
                <span>
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthModalMode('login')}
                    className="font-bold text-[#ff6a00] hover:underline cursor-pointer"
                  >
                    Sign in here
                  </button>
                </span>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Aesthetic Feature Showcase & Telemetry Card */}
          <div className="w-full md:w-5/12 bg-slate-900/50 p-6 sm:p-10 flex flex-col justify-between relative border-t md:border-t-0 md:border-l border-slate-800">
            {/* Top Badge */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                PORTAL SUITE
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                CLASS 9–12 • JEE • NEET
              </span>
            </div>

            {/* Showcase Feature Grid */}
            <div className="space-y-3 my-auto py-6">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/90 flex items-start gap-3 shadow-sm hover:border-slate-700 transition-colors">
                <div className="p-2 rounded-lg bg-slate-800 text-[#ff6a00] shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-sans">Full NTA CBT Simulator</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">Real exam interface with timer, section switching & instant analytics.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/90 flex items-start gap-3 shadow-sm hover:border-slate-700 transition-colors">
                <div className="p-2 rounded-lg bg-slate-800 text-[#ff6a00] shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-sans">Encrypted Study Vault</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">Direct access to verified chapter books, DPPs & formula sheets.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/90 flex items-start gap-3 shadow-sm hover:border-slate-700 transition-colors">
                <div className="p-2 rounded-lg bg-slate-800 text-[#ff6a00] shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-sans">Student Peer Community</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">Live discussion and study requests with fellow aspirants.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/90 flex items-start gap-3 shadow-sm hover:border-slate-700 transition-colors">
                <div className="p-2 rounded-lg bg-slate-800 text-[#ff6a00] shrink-0">
                  <Tv className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-sans">In-App Video Playlists</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">Watch chapter one-shots & revision streams directly in-app.</p>
                </div>
              </div>
            </div>

            {/* Bottom Security Assurance */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit Encrypted</span>
              </span>
              <span>RAJ KANNAUJIYA // EDPARTH</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
