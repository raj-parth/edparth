import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield, Zap, BookOpen, Sparkles, CheckCircle2, User as UserIcon, Phone, School, Award, ChevronDown, Check, Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../Logo';
import { verifyAdminCredentials } from '../../utils/auth';
import { loginStudentWithFirebase, registerStudentWithFirebase } from '../../services/firebase';
import type { ClassGrade, TargetExam } from '../../types';
import { AuthBackground3D } from './AuthBackground3D';

export const AuthPage: React.FC<{ onAuthSuccess?: () => void }> = ({ onAuthSuccess }) => {
  const { loginUser, students, currentUser } = useApp();

  const isSecretAdminUrl = typeof window !== 'undefined' && (
    new URLSearchParams(window.location.search).get('admin') === 'true' ||
    new URLSearchParams(window.location.search).get('portal') === 'admin' ||
    window.location.pathname === '/admin'
  );
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(isSecretAdminUrl);

  const [mode, setMode] = useState<'login' | 'signup' | 'admin'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [school, setSchool] = useState('');
  const [classGrade, setClassGrade] = useState<ClassGrade>('Class 12');
  const [targetExam, setTargetExam] = useState<TargetExam>('JEE Main/Adv');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setErrorMessage('Please enter both your email and password.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. SECURE ADMIN CREDENTIAL VERIFICATION
      const isAdmin = await verifyAdminCredentials(trimmedEmail, trimmedPassword);
      if (isAdmin) {
        loginUser({
          id: 'admin_1',
          name: 'RAJ (Master Admin)',
          email: trimmedEmail,
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          joinedAt: '2026-01-01',
          stats: { testsGiven: 0, studyHours: 999, streakDays: 100, avgScore: 100, xp: 99999 }
        });
        onAuthSuccess?.();
        return;
      }

      if (mode === 'admin') {
        setErrorMessage('Invalid administrative passcode. Please verify credentials.');
        return;
      }

      // 2. REAL FIREBASE STUDENT AUTHENTICATION
      const result = await loginStudentWithFirebase(trimmedEmail, trimmedPassword, students);
      if (!result.success || !result.user) {
        setErrorMessage(result.error || 'Authentication failed. Please verify your credentials.');
        return;
      }

      loginUser(result.user);
      onAuthSuccess?.();
    } catch (err: any) {
      setErrorMessage(err.message || 'Login error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStudentSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('Please provide your full name, valid email, and set a password.');
      return;
    }

    if (password.trim().length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await registerStudentWithFirebase({
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        classGrade,
        targetExam,
        school: school.trim() || 'EdParth Student',
        phone: phone.trim()
      });

      if (!result.success || !result.user) {
        setErrorMessage(result.error || 'Registration failed. Please try again.');
        return;
      }

      loginUser(result.user);
      onAuthSuccess?.();
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 flex flex-col justify-between p-4 sm:p-8 select-none relative overflow-hidden font-sans">
      
      {/* 3D WebGL Interactive Science & STEM Background Animation */}
      <AuthBackground3D />

      {/* Ambient Depth Elements (Zero cheap neon) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Top Header Bar */}
      <header className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between pb-6">
        <div className="bg-slate-900/40 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-white/10 shadow-lg flex items-center gap-3">
          <Logo size="md" theme="dark" showSubtitle={true} />
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/40 border border-white/10 text-xs font-mono backdrop-blur-xl text-slate-300 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold text-slate-300">256-BIT SECURE GATEWAY</span>
        </div>
      </header>

      {/* Main Split Layout: Left Showcase & Right Auth Form */}
      <main className="relative z-10 w-full max-w-6xl mx-auto my-auto py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Platform Brand Showcase (7 Cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-[#ff6a00]" />
              <span>TIER-1 EXCELLENCE • FREE EDUCATION</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight text-white leading-tight font-heading">
                Master JEE, NEET & Boards With Precision.
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal max-w-lg">
                EdParth delivers realistic NTA CBT simulated tests, 24/7 AI Doubt solving, verified notes, and hand-picked video playlists — completely accessible for serious learners.
              </p>
            </div>

            {/* 4 Core Pillars Cards - Glassy Translucent */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-900/35 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all flex items-start gap-3 shadow-lg shadow-black/20">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">NTA CBT Simulator</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Real test engine with timer, proctor & analytics</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/35 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all flex items-start gap-3 shadow-lg shadow-black/20">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">24/7 AI Doubt Engine</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Instant step-by-step derivations & formulas</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/35 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all flex items-start gap-3 shadow-lg shadow-black/20">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Study Material Vault</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Topper handwritten notes & chapter DPPs</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/35 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all flex items-start gap-3 shadow-lg shadow-black/20">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">DRM Piracy Protected</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Dynamic watermark & session protection</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Auth Terminal Card (6 Cols) - Frosted Glass */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900/35 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/15 shadow-[0_12px_45px_rgba(0,0,0,0.6)] space-y-5 text-left relative ring-1 ring-white/10">
              
              {/* If user is already saved, show quick continue banner */}
              {currentUser && (
                <div className="p-3.5 rounded-2xl bg-blue-950/40 backdrop-blur-md border border-blue-500/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={currentUser.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser.name}`}
                      alt={currentUser.name}
                      className="w-9 h-9 rounded-xl border border-blue-500/40 bg-slate-800/80 shrink-0"
                    />
                    <div className="truncate text-left">
                      <p className="text-xs font-bold text-white truncate">Continue as {currentUser.name}</p>
                      <p className="text-[10px] text-blue-300 font-mono truncate">{currentUser.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onAuthSuccess?.();
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 cursor-pointer shadow-md transition-all flex items-center gap-1"
                  >
                    <span>Enter Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Top Mode Switcher - Glass Dock */}
              <div className="p-1 bg-slate-950/40 backdrop-blur-md rounded-2xl border border-white/10 flex items-center mb-5">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMessage(''); }}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    mode === 'login'
                      ? 'bg-white/15 text-white shadow-sm border border-white/20 backdrop-blur-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Student Login
                </button>

                <button
                  type="button"
                  onClick={() => { setMode('signup'); setErrorMessage(''); }}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    mode === 'signup'
                      ? 'bg-white/15 text-white shadow-sm border border-white/20 backdrop-blur-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Register (New Student)
                </button>

                {isAdminUnlocked && (
                  <button
                    type="button"
                    onClick={() => { setMode('admin'); setErrorMessage(''); }}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      mode === 'admin'
                        ? 'bg-white/15 text-[#ff6a00] shadow-sm border border-white/20 backdrop-blur-md'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Admin Portal
                  </button>
                )}
              </div>

              {/* Error Notice */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-medium mb-4 flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 mt-0.5">⚠️</span>
                    <span>{errorMessage}</span>
                  </div>
                  {errorMessage.includes('Register') && mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => { setMode('signup'); setErrorMessage(''); }}
                      className="self-start text-[11px] font-bold text-[#ff6a00] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      Click here to Register new account &rarr;
                    </button>
                  )}
                  {errorMessage.includes('Login') && mode === 'signup' && (
                    <button
                      type="button"
                      onClick={() => { setMode('login'); setErrorMessage(''); }}
                      className="self-start text-[11px] font-bold text-[#ff6a00] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      Click here to Login &rarr;
                    </button>
                  )}
                </div>
              )}

              {/* Login & Admin Form */}
              {(mode === 'login' || mode === 'admin') && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 font-mono">
                      {mode === 'admin' ? 'ADMINISTRATIVE CREDENTIAL EMAIL' : 'STUDENT GMAIL / EMAIL'}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={mode === 'admin' ? 'admin@edparth.com' : 'student@gmail.com'}
                        className="w-full bg-slate-950/45 backdrop-blur-md border border-white/15 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#ff6a00] focus:ring-2 focus:ring-[#ff6a00]/25 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-300 font-mono">
                        {mode === 'admin' ? 'MASTER PASSCODE' : 'PASSWORD'}
                      </label>
                      {mode === 'login' && (
                        <button
                          type="button"
                          onClick={() => setErrorMessage('For password assistance, please register or contact support@edparth.com.')}
                          className="text-[11px] text-[#ff6a00] hover:underline cursor-pointer"
                        >
                          Forgot?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-950/45 backdrop-blur-md border border-white/15 rounded-xl pl-10 pr-11 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#ff6a00] focus:ring-2 focus:ring-[#ff6a00]/25 transition-all font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#ff6a00] hover:bg-[#ea580c] disabled:opacity-60 text-white font-black text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying Credentials...</span>
                      </>
                    ) : (
                      <>
                        <span>{mode === 'admin' ? 'Verify & Access Admin Console' : 'Login to EdParth'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {mode === 'login' && (
                    <div className="pt-2 text-center">
                      <p className="text-xs text-slate-400">
                        New student?{' '}
                        <button
                          type="button"
                          onClick={() => { setMode('signup'); setErrorMessage(''); }}
                          className="text-[#ff6a00] font-bold hover:underline cursor-pointer"
                        >
                          Register here &rarr;
                        </button>
                      </p>
                    </div>
                  )}
                </form>
              )}

              {/* Sign Up / Register Form */}
              {mode === 'signup' && (
                <form onSubmit={handleStudentSignup} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full bg-slate-950/45 backdrop-blur-md border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#ff6a00] focus:ring-2 focus:ring-[#ff6a00]/25 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Gmail / Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@gmail.com"
                        className="w-full bg-slate-950/45 backdrop-blur-md border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#ff6a00] focus:ring-2 focus:ring-[#ff6a00]/25 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Class Grade *</label>
                      <select
                        value={classGrade}
                        onChange={(e) => setClassGrade(e.target.value as ClassGrade)}
                        className="w-full bg-slate-950/45 backdrop-blur-md border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff6a00] focus:ring-2 focus:ring-[#ff6a00]/25 transition-all"
                      >
                        <option value="Class 12" className="bg-slate-900 text-white">Class 12th</option>
                        <option value="Class 11" className="bg-slate-900 text-white">Class 11th</option>
                        <option value="Class 10" className="bg-slate-900 text-white">Class 10th</option>
                        <option value="Class 9" className="bg-slate-900 text-white">Class 9th</option>
                        <option value="Dropper/Target" className="bg-slate-900 text-white">Dropper / Target 2026</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Target Exam *</label>
                      <select
                        value={targetExam}
                        onChange={(e) => setTargetExam(e.target.value as TargetExam)}
                        className="w-full bg-slate-950/45 backdrop-blur-md border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff6a00] focus:ring-2 focus:ring-[#ff6a00]/25 transition-all"
                      >
                        <option value="JEE Main/Adv" className="bg-slate-900 text-white">JEE Main & Advanced</option>
                        <option value="NEET UG" className="bg-slate-900 text-white">NEET UG Medical</option>
                        <option value="CBSE Class 12" className="bg-slate-900 text-white">CBSE Class 12th Board</option>
                        <option value="CBSE Class 11" className="bg-slate-900 text-white">CBSE Class 11th Foundation</option>
                        <option value="CBSE Class 10" className="bg-slate-900 text-white">CBSE Class 10th Board</option>
                        <option value="CBSE Class 9" className="bg-slate-900 text-white">CBSE Class 9th Foundation</option>
                        <option value="Govt Exam (SSC/NDA/CUET)" className="bg-slate-900 text-white">Govt Exam (NDA / CUET)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">School / Coaching</label>
                      <input
                        type="text"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        placeholder="e.g. DPS / KV / Allen"
                        className="w-full bg-slate-950/45 backdrop-blur-md border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#ff6a00] focus:ring-2 focus:ring-[#ff6a00]/25 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-950/45 backdrop-blur-md border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#ff6a00] focus:ring-2 focus:ring-[#ff6a00]/25 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Set Password * (Min. 6 characters)</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-950/45 backdrop-blur-md border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#ff6a00] focus:ring-2 focus:ring-[#ff6a00]/25 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#ff6a00] hover:bg-[#ea580c] disabled:opacity-60 text-white font-black text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Registering Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Free Student Account</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="pt-2 text-center">
                    <p className="text-xs text-slate-400">
                      Already registered?{' '}
                      <button
                        type="button"
                        onClick={() => { setMode('login'); setErrorMessage(''); }}
                        className="text-[#ff6a00] font-bold hover:underline cursor-pointer"
                      >
                        Login here &rarr;
                      </button>
                    </p>
                  </div>
                </form>
              )}

              {/* Bottom Security Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Free Forever
                </span>
                <span>•</span>
                <span>256-Bit SSL Encrypted</span>
                <span>•</span>
                <span>Strict DRM Protected</span>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Clean Bottom Attribution */}
      <footer className="relative z-10 text-center text-xs text-slate-500 font-mono py-4">
        <span>DEVELOPED BY </span>
        <strong className="text-slate-400">RAJ KANNAUJIYA</strong>
        <span 
          onClick={() => setIsAdminUnlocked(prev => !prev)}
          className="mx-2 text-slate-700 hover:text-slate-500 cursor-pointer select-none transition-colors"
          title="System Access"
        >
          //
        </span>
        <span>TEAM: </span>
        <strong className="text-slate-400">TEAM PARTH</strong>
      </footer>

    </div>
  );
};
