import React from 'react';
import { LayoutDashboard, Zap, BookOpen, MessageSquare, Play, Shield, LogOut, Send, Sparkles, Trophy, Lock, BarChart3 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';

export type NavViewType = 'home' | 'cbt-list' | 'lectures' | 'library' | 'chat' | 'doubts' | 'dashboard' | 'admin' | 'analytics';

interface SidebarProps {
  activeView: NavViewType;
  setActiveView: (view: NavViewType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView
}) => {
  const { currentUser, exams, openAuthModal, logoutUser, openSecurityModal } = useApp();

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 p-5 flex flex-col justify-between shrink-0 min-h-screen font-sans">
      <div>
        {/* Brand Logo strictly 'EdParth' */}
        <div
          onClick={() => setActiveView('home')}
          className="cursor-pointer mb-7 px-2"
        >
          <Logo size="md" showSubtitle={true} />
        </div>

        {/* Overview Navigation (PW & Top EdTech Organization) */}
        <div className="space-y-6">
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-3 mb-2 block font-mono">
              STUDY SUITE
            </span>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveView('home')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeView === 'home'
                    ? 'bg-indigo-50 text-indigo-700 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <LayoutDashboard className={`w-4 h-4 ${activeView === 'home' ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>Dashboard & Study</span>
              </button>

              {/* 24/7 AI Doubt Engine (Flagship PW feature) */}
              <button
                onClick={() => setActiveView('doubts')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeView === 'doubts'
                    ? 'bg-amber-50 text-[#ff6a00] shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className={`w-4 h-4 ${activeView === 'doubts' ? 'text-[#ff6a00]' : 'text-[#ff6a00]'}`} />
                  <span>24/7 AI Doubt Engine</span>
                </div>
                <span className="px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[9px] font-black">
                  AI
                </span>
              </button>

              <button
                onClick={() => setActiveView('cbt-list')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeView === 'cbt-list'
                    ? 'bg-indigo-50 text-indigo-700 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Zap className={`w-4 h-4 ${activeView === 'cbt-list' ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>CBT Mock Tests</span>
                </div>
                <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                  {exams.length} Live
                </span>
              </button>

              <button
                onClick={() => setActiveView('lectures')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeView === 'lectures'
                    ? 'bg-indigo-50 text-indigo-700 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Play className={`w-4 h-4 ${activeView === 'lectures' ? 'text-[#ff6a00]' : 'text-slate-400'}`} />
                <span>Lectures & YouTube</span>
              </button>

              <button
                onClick={() => setActiveView('library')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeView === 'library'
                    ? 'bg-indigo-50 text-indigo-700 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <BookOpen className={`w-4 h-4 ${activeView === 'library' ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>Study Vault & DPPs</span>
              </button>

              <button
                onClick={() => setActiveView('dashboard')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeView === 'dashboard'
                    ? 'bg-indigo-50 text-indigo-700 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Trophy className={`w-4 h-4 ${activeView === 'dashboard' ? 'text-amber-500' : 'text-slate-400'}`} />
                <span>My Rank & Stats</span>
              </button>

              <button
                onClick={() => setActiveView('chat')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeView === 'chat'
                    ? 'bg-indigo-50 text-indigo-700 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <MessageSquare className={`w-4 h-4 ${activeView === 'chat' ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>Community & Chats</span>
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Section: Security & Admin & Developer Credits */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        
        {/* Security Center Button */}
        <button
          onClick={openSecurityModal}
          className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors cursor-pointer text-xs font-bold"
        >
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-[#ff6a00]" />
            <span>256-Bit DRM Security</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
        </button>

        {/* Only show Admin Hub if Admin is logged in */}
        {currentUser?.role === 'admin' && (
          <button
            onClick={() => setActiveView('admin')}
            className={`w-full flex items-center gap-2.5 p-2.5 rounded-2xl transition-all cursor-pointer ${
              activeView === 'admin'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-indigo-50 text-indigo-900 hover:bg-indigo-100'
            }`}
          >
            <Shield className="w-4 h-4 text-[#ff6a00]" />
            <div className="text-left">
              <p className="text-xs font-bold">Admin Hub</p>
              <p className="text-[9px] opacity-80">Content & Tests Manager</p>
            </div>
          </button>
        )}

        {/* Clean Developer & Team Card */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
            <span>Developer</span>
            <span className="text-[#ff6a00] font-black">RAJ KANNAUJIYA</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
            <span>Team</span>
            <span className="font-bold text-slate-800">TEAM PARTH</span>
          </div>

          <div className="pt-1.5 border-t border-slate-200 flex items-center justify-between gap-2">
            {/* Instagram */}
            <a
              href="https://instagram.com/rajvqx"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-600 hover:text-pink-700 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>@rajvqx</span>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/edparthbooks"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-600 hover:text-sky-700 transition-colors"
            >
              <Send className="w-3 h-3" />
              <span>Channel</span>
            </a>
          </div>
        </div>

        {/* Auth status */}
        {currentUser ? (
          <button
            onClick={logoutUser}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out ({currentUser.name.split(' ')[0]})</span>
          </button>
        ) : (
          <button
            onClick={() => openAuthModal('login')}
            className="w-full py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-sm cursor-pointer"
          >
            Sign In
          </button>
        )}
      </div>
    </aside>
  );
};
