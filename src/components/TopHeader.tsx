import React, { useState } from 'react';
import { Search, Bell, MessageSquare, Flame, Shield, Target, Sparkles, ChevronDown, Coins, BarChart3 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TargetGoalModal } from './widgets/TargetGoalModal';
import { NotificationDrawer } from './widgets/NotificationDrawer';
import { SecurityCenterModal } from './security/SecurityCenterModal';
import { QuickSearchModal } from './widgets/QuickSearchModal';

interface TopHeaderProps {
  onSearchChange?: (val: string) => void;
  onChatClick: () => void;
  onNavigate?: (view: 'home' | 'cbt-list' | 'lectures' | 'library' | 'chat' | 'doubts' | 'dashboard' | 'admin' | 'analytics') => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onChatClick,
  onNavigate
}) => {
  const { 
    currentUser, 
    openAuthModal, 
    targetGoal, 
    openGoalModal, 
    isGoalModalOpen,
    isSecurityModalOpen,
    openSecurityModal,
    closeSecurityModal,
    notifications 
  } = useApp();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showStreakTooltip, setShowStreakTooltip] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const streakDays = currentUser?.stats?.streakDays || 7;
  const xpPoints = currentUser?.stats?.xp || 1450;

  return (
    <>
      <header className="h-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 font-sans shadow-xs">
        
        {/* Left Section: Target Goal Switcher & Search Bar */}
        <div className="flex items-center gap-3 w-full max-w-xl">
          
          {/* Target Goal Pill (Physics Wallah style goal switcher) */}
          <button
            onClick={openGoalModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 text-indigo-900 transition-all cursor-pointer shrink-0 shadow-xs"
          >
            <div className="w-5 h-5 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Target className="w-3.5 h-3.5" />
            </div>
            <div className="text-left hidden md:block">
              <div className="text-[9px] font-black uppercase text-indigo-500 font-mono tracking-wider">TARGET GOAL</div>
              <div className="text-xs font-black text-indigo-950 flex items-center gap-1">
                <span>{targetGoal}</span>
                <ChevronDown className="w-3 h-3 text-indigo-600" />
              </div>
            </div>
          </button>

          {/* Quick Search Bar (Ctrl+K) */}
          <div 
            onClick={() => setIsSearchOpen(true)}
            className="relative w-full cursor-pointer group"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
            <div className="w-full bg-[#f8fafc] group-hover:bg-slate-100 border border-slate-200 rounded-2xl pl-11 pr-14 py-2.5 text-xs text-slate-500 flex items-center justify-between transition-all shadow-inner">
              <span className="truncate">Search CBT tests, YouTube lectures, formulas...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-white border border-slate-300 text-[10px] font-mono text-slate-500 font-bold shadow-2xs">
                Ctrl+K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right Section: Gamification & Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 ml-auto">
          
          {/* Daily Streak Flame Counter */}
          <div className="relative">
            <button
              onMouseEnter={() => setShowStreakTooltip(true)}
              onMouseLeave={() => setShowStreakTooltip(false)}
              onClick={() => onNavigate && onNavigate('dashboard')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 transition-all cursor-pointer shadow-2xs"
            >
              <Flame className="w-4 h-4 text-[#ff6a00] fill-[#ff6a00] animate-bounce" />
              <span className="text-xs font-black text-amber-950 font-mono">{streakDays}d</span>
            </button>

            {/* Streak Tooltip */}
            {showStreakTooltip && (
              <div className="absolute top-11 left-1/2 -translate-x-1/2 z-40 w-48 p-2.5 bg-slate-900 text-white rounded-2xl shadow-xl text-left text-xs border border-slate-800 animate-in fade-in duration-150">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{streakDays} Days Active Streak</span>
                </div>
                <p className="text-[11px] text-slate-300 font-normal">
                  Solve 1 DPP or take 1 CBT mock test today to keep your streak alive!
                </p>
              </div>
            )}
          </div>

          {/* XP Coins Badge */}
          <div 
            onClick={() => onNavigate && onNavigate('dashboard')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 transition-all cursor-pointer shadow-2xs"
          >
            <Coins className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-black text-emerald-950 font-mono">{xpPoints} XP</span>
          </div>

          {/* Security Center Shortcut */}
          <button
            onClick={openSecurityModal}
            title="EdParth DRM & Security Status"
            className="w-10 h-10 rounded-2xl bg-[#f8fafc] hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <Shield className="w-4 h-4 text-[#ff6a00]" />
          </button>

          {/* Live Visitor Analytics Header Button */}
          <button
            onClick={() => onNavigate && onNavigate('analytics')}
            title="View Live Traffic & Visitors"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 transition-all cursor-pointer shadow-2xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-xs font-black text-indigo-950 hidden sm:inline">Live Visitors</span>
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(true)}
              title="Notifications"
              className="w-10 h-10 rounded-2xl bg-[#f8fafc] hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
            </button>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#ff6a00] text-white text-[10px] font-black flex items-center justify-center shadow-sm">
                {unreadCount}
              </span>
            )}
          </div>

          {/* User Profile Chip */}
          {currentUser ? (
            <div 
              onClick={() => onNavigate && onNavigate('dashboard')}
              className="flex items-center gap-2.5 pl-2 border-l border-slate-200 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <img
                src={currentUser.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser.name}`}
                alt={currentUser.name}
                className="w-9 h-9 rounded-2xl object-cover border border-indigo-200 bg-slate-100 shadow-sm"
              />
              <div className="text-left hidden lg:block leading-tight">
                <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                <p className="text-[10px] text-slate-400 font-medium">
                  {currentUser.role === 'admin' ? 'Master Admin' : currentUser.classGrade || 'Class 12'}
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="px-5 py-2 rounded-2xl bg-slate-900 text-white font-bold text-xs shadow-sm hover:bg-slate-800 transition-all cursor-pointer ml-1"
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Popups & Modals */}
      <TargetGoalModal />
      <NotificationDrawer 
        isOpen={isNotificationOpen} 
        onClose={() => setIsNotificationOpen(false)} 
      />
      <SecurityCenterModal 
        isOpen={isSecurityModalOpen} 
        onClose={closeSecurityModal} 
      />
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(view) => {
          if (onNavigate) onNavigate(view);
        }}
      />
    </>
  );
};
