import React, { useState, useEffect } from 'react';
import { Search, X, Zap, Play, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: 'home' | 'cbt-list' | 'lectures' | 'library' | 'chat' | 'doubts' | 'dashboard' | 'admin') => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const { exams, lectures, contentList } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredExams = exams.filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.subject.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 3);

  const filteredLectures = lectures.filter(l => 
    l.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.subject.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 3);

  const filteredContent = contentList.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.subject.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800">
        
        {/* Search Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search CBT tests, YouTube lectures, formulas, or PDF books..."
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results */}
        <div className="p-4 sm:p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          
          {/* CBT Mock Tests */}
          {filteredExams.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-black uppercase text-indigo-600 font-mono">
                <Zap className="w-3.5 h-3.5" />
                <span>CBT Mock Tests</span>
              </div>
              <div className="space-y-1.5">
                {filteredExams.map(exam => (
                  <div
                    key={exam.id}
                    onClick={() => {
                      onNavigate('cbt-list');
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200/80 hover:border-indigo-200 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-900">{exam.title}</p>
                      <p className="text-[10px] text-slate-500">{exam.subject} • {exam.durationMinutes} mins • {exam.totalMarks} Marks</p>
                    </div>
                    <span className="text-indigo-600 text-xs font-bold flex items-center gap-1">Start <ArrowRight className="w-3 h-3" /></span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* YouTube Video Lectures */}
          {filteredLectures.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-black uppercase text-[#ff6a00] font-mono">
                <Play className="w-3.5 h-3.5" />
                <span>Video Lectures & Channels</span>
              </div>
              <div className="space-y-1.5">
                {filteredLectures.map(lec => (
                  <div
                    key={lec.id}
                    onClick={() => {
                      onNavigate('lectures');
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-orange-50 border border-slate-200/80 hover:border-orange-200 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-900">{lec.title}</p>
                      <p className="text-[10px] text-slate-500">{lec.channelName} • {lec.subject}</p>
                    </div>
                    <span className="text-[#ff6a00] text-xs font-bold flex items-center gap-1">Watch <ArrowRight className="w-3 h-3" /></span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Study Vault & PDF Notes */}
          {filteredContent.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-black uppercase text-emerald-600 font-mono">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Study Vault & PDF Notes</span>
              </div>
              <div className="space-y-1.5">
                {filteredContent.map(item => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onNavigate('library');
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-200 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-900">{item.title}</p>
                      <p className="text-[10px] text-slate-500">{item.subject} • {item.fileSize}</p>
                    </div>
                    <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">Open <ArrowRight className="w-3 h-3" /></span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick AI Doubt Option */}
          <div
            onClick={() => {
              onNavigate('doubts');
              onClose();
            }}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#ff6a00]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold">Have a custom question?</p>
                <p className="text-[10px] text-slate-300">Ask the 24/7 AI Doubt Engine for instant step-by-step solution</p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#ff6a00] flex items-center gap-1">Ask AI <ArrowRight className="w-3 h-3" /></span>
          </div>

        </div>

        {/* Search Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono px-5">
          <span>Press ESC to exit</span>
          <span>EDPARTH SEARCH ENGINE</span>
        </div>
      </div>
    </div>
  );
};
