import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Users, Sparkles, MessageSquare, ExternalLink, HelpCircle, FileText, CheckCircle2, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { ChatMessage } from '../../types';

export const CommunityChat: React.FC = () => {
  const { students, currentUser, chatMessages, sendChatMessage, openAuthModal } = useApp();
  const [inputText, setInputText] = useState('');
  const [isRequestToggle, setIsRequestToggle] = useState(false);

  const allMembers = React.useMemo(() => {
    const list = [...students];
    if (currentUser && currentUser.role === 'student' && !list.some(s => s.id === currentUser.id)) {
      list.unshift(currentUser);
    }
    return list;
  }, [students, currentUser]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    if (!inputText.trim()) return;

    sendChatMessage(inputText.trim(), isRequestToggle);
    setInputText('');
    setIsRequestToggle(false);
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-[1600px] mx-auto">
      {/* Top Banner with Telegram Channel */}
      <div className="bg-gradient-to-r from-[#0088cc] to-[#00a2ed] rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-sky-500/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
            <span>📢 Official Telegram Community</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Join edparth Telegram Study Channel
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 font-medium">
            Daily PYQs, exam notifications, formula sheets, and PDF books repository.
          </p>
        </div>

        <a
          href="https://t.me/edparthbooks"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-2.5 rounded-full bg-white text-sky-700 font-black text-xs sm:text-sm shadow-md hover:bg-sky-50 transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span>Join @edparthbooks</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Main Chat Grid (Left: Active Student List, Right: Chat Stream) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        
        {/* Left: Active Members (Students by name only) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                <h3 className="font-extrabold text-sm text-slate-900">Student Community</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                {allMembers.length} Members
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-3">
              Ask doubts, discuss concepts, and request study materials directly with peers & teachers.
            </p>

            {/* List of students by name only */}
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {allMembers.length === 0 ? (
                <div className="p-4 text-center text-slate-400 text-xs">
                  <p className="font-semibold text-slate-600">Students Joining Live</p>
                  <p className="text-[11px] mt-0.5">As students register, they will appear here in the active study group.</p>
                </div>
              ) : (
                allMembers.map((std) => (
                  <div key={std.id} className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
                          {std.name[0]}
                        </div>
                        <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border-2 border-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          {std.name} {std.id === currentUser?.id && <span className="text-[10px] text-indigo-600 font-bold">(You)</span>}
                        </p>
                        <span className="text-[10px] font-semibold text-slate-400">{std.classGrade || 'Class 12'}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl text-[11px] text-slate-500 text-center font-medium">
            💬 Tip: Click <strong>"Material Request"</strong> checkbox to request any notes in 1 message!
          </div>
        </div>

        {/* Right: Real-time Messages & Quick Post Area */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
          
          {/* Messages Stream */}
          <div className="flex-1 space-y-3.5 max-h-[460px] overflow-y-auto pr-2">
            {chatMessages.map((msg) => {
              const isMe = currentUser?.name === msg.senderName;
              const isAdmin = msg.senderRole === 'admin' || msg.senderName.includes('Raj') || msg.senderName.includes('Admin');

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-2 mb-1 px-1 text-[11px] font-bold text-slate-400">
                    <span className={isAdmin ? 'text-amber-600 font-extrabold' : 'text-slate-700'}>
                      {msg.senderName} {isAdmin && '🛡️ (Faculty)'}
                    </span>
                    <span className="text-[10px] text-slate-300 font-mono">• {msg.timestamp}</span>
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm max-w-lg leading-relaxed shadow-sm ${
                      msg.isRequest
                        ? 'bg-amber-50 border border-amber-200 text-amber-950 font-medium'
                        : isMe
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-slate-100 text-slate-800 rounded-tl-none'
                    }`}
                  >
                    {msg.isRequest && (
                      <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase text-amber-700 mb-1">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Book / Material Request</span>
                      </div>
                    )}
                    {msg.message}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between px-2 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={isRequestToggle}
                  onChange={(e) => setIsRequestToggle(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span className="text-[11px] font-bold">Mark as Material Request (e.g. "HC Verma Solutions chahiye")</span>
              </label>

              {!currentUser && (
                <span className="text-[11px] text-indigo-600 font-bold">
                  Login required to post
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  currentUser
                    ? isRequestToggle
                      ? 'Type what notes/book you need in 1 message...'
                      : 'Ask a doubt or talk with community...'
                    : 'Please login to send message...'
                }
                className="flex-1 bg-[#f8fafc] border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-600"
              />

              <button
                type="submit"
                className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};
