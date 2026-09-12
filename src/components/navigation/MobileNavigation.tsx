import React from 'react';
import { LayoutDashboard, Zap, Sparkles, Play, BookOpen, Shield, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { NavViewType } from '../Sidebar';

interface MobileNavigationProps {
  activeView: NavViewType;
  setActiveView: (view: NavViewType) => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  activeView,
  setActiveView
}) => {
  const { currentUser } = useApp();

  const navItems = [
    { id: 'home' as NavViewType, label: 'Study', icon: LayoutDashboard },
    { id: 'cbt-list' as NavViewType, label: 'Mock CBT', icon: Zap },
    { id: 'doubts' as NavViewType, label: 'AI Doubts', icon: Sparkles, highlight: true },
    { id: 'lectures' as NavViewType, label: 'Lectures', icon: Play },
    { id: 'library' as NavViewType, label: 'Vault', icon: BookOpen },
  ];

  if (currentUser?.role === 'admin') {
    navItems.push({ id: 'admin' as NavViewType, label: 'Admin', icon: Shield });
  }

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 px-2 py-1.5 flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeView === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all cursor-pointer relative min-w-[56px] ${
              isActive
                ? item.highlight ? 'text-[#ff6a00]' : 'text-indigo-600'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <div className={`p-1 rounded-xl transition-all ${
              isActive 
                ? item.highlight ? 'bg-orange-50' : 'bg-indigo-50'
                : ''
            }`}>
              <Icon className={`w-5 h-5 ${
                isActive 
                  ? item.highlight ? 'text-[#ff6a00] stroke-[2.5]' : 'text-indigo-600 stroke-[2.5]'
                  : 'stroke-[1.8]'
              }`} />
            </div>
            <span className={`text-[10px] tracking-tight mt-0.5 font-medium ${
              isActive ? 'font-extrabold text-slate-900' : 'text-slate-500'
            }`}>
              {item.label}
            </span>
            {isActive && (
              <span className={`w-1 h-1 rounded-full mt-0.5 ${
                item.highlight ? 'bg-[#ff6a00]' : 'bg-indigo-600'
              }`} />
            )}
          </button>
        );
      })}
    </nav>
  );
};
