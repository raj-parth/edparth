import React from 'react';
import { Sparkles, BookOpen, Zap, Shield, User, LogOut, PlusCircle, LayoutDashboard, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  activeView: 'home' | 'cbt-list' | 'library' | 'dashboard' | 'admin';
  setActiveView: (view: 'home' | 'cbt-list' | 'library' | 'dashboard' | 'admin') => void;
  onRequestMaterialClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  onRequestMaterialClick
}) => {
  const { currentUser, openAuthModal, logoutUser } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-[#090a0f]/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo & Mascot Identifier */}
        <div
          onClick={() => setActiveView('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-[2px] shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <span className="text-xl">🎓</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg sm:text-xl font-black tracking-tight text-white font-heading">
                EdParth
              </span>
              <span className="text-xs font-black px-1.5 py-0.5 rounded bg-gradient-to-r from-cyan-400 to-indigo-400 text-slate-950">
                STUDY
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
              Class 9-12 • JEE • NEET • Govt Exams
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
          <button
            onClick={() => setActiveView('home')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeView === 'home'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            Explore
          </button>

          <button
            onClick={() => setActiveView('cbt-list')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'cbt-list'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
            <span>CBT Tests</span>
          </button>

          <button
            onClick={() => setActiveView('library')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'library'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Study Vault</span>
          </button>

          {currentUser?.role === 'admin' ? (
            <button
              onClick={() => setActiveView('admin')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'admin'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : 'text-amber-400 hover:bg-slate-800/60'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Hub</span>
            </button>
          ) : currentUser ? (
            <button
              onClick={() => setActiveView('dashboard')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
          ) : null}
        </nav>

        {/* Right User Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Request Button */}
          <button
            onClick={onRequestMaterialClick}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 text-xs font-semibold transition-all cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Request Notes</span>
          </button>

          {currentUser ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveView(currentUser.role === 'admin' ? 'admin' : 'dashboard')}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl glass-panel border border-indigo-500/30 hover:border-indigo-500/60 transition-all cursor-pointer"
              >
                <img
                  src={currentUser.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser.name}`}
                  alt={currentUser.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl object-cover bg-slate-900"
                />
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-white leading-tight">{currentUser.name}</p>
                  <p className="text-[10px] text-indigo-400">{currentUser.role === 'admin' ? 'Admin' : currentUser.classGrade || 'Student'}</p>
                </div>
              </button>

              <button
                onClick={logoutUser}
                title="Logout"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors border border-slate-800 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('login')}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Login
              </button>

              <button
                onClick={() => openAuthModal('signup')}
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                Join Free
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Mobile Bottom Bar Navigation */}
      <div className="md:hidden flex items-center justify-around bg-slate-950 border-t border-slate-800 py-2.5 px-2">
        <button
          onClick={() => setActiveView('home')}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold ${
            activeView === 'home' ? 'text-indigo-400' : 'text-slate-400'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveView('cbt-list')}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold ${
            activeView === 'cbt-list' ? 'text-indigo-400' : 'text-slate-400'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>CBT Tests</span>
        </button>

        <button
          onClick={() => setActiveView('library')}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold ${
            activeView === 'library' ? 'text-indigo-400' : 'text-slate-400'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Notes Vault</span>
        </button>

        {currentUser?.role === 'admin' ? (
          <button
            onClick={() => setActiveView('admin')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold ${
              activeView === 'admin' ? 'text-amber-400' : 'text-slate-400'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Admin</span>
          </button>
        ) : (
          <button
            onClick={() => currentUser ? setActiveView('dashboard') : openAuthModal('login')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold ${
              activeView === 'dashboard' ? 'text-indigo-400' : 'text-slate-400'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{currentUser ? 'Profile' : 'Sign In'}</span>
          </button>
        )}
      </div>
    </header>
  );
};
