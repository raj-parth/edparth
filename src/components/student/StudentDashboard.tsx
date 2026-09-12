import React from 'react';
import { Award, Flame, Zap, MessageSquare, Target, School, Mail, BarChart3, BookOpen, Trophy, Shield, CheckCircle2, ArrowRight, Coins, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface StudentDashboardProps {
  onStartCbtClick: () => void;
  onRequestMaterialClick: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onStartCbtClick,
  onRequestMaterialClick
}) => {
  const { currentUser, testResults, chatMessages, leaderboard, openSecurityModal } = useApp();

  if (!currentUser) return null;

  const myResults = testResults.filter(r => r.studentId === currentUser.id);
  const myRequests = chatMessages.filter(m => m.senderId === currentUser.id && m.isRequest);

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-[1600px] mx-auto font-sans">
      
      {/* Student Profile Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <img
            src={currentUser.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser.name}`}
            alt={currentUser.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-indigo-100 bg-slate-50 shadow-sm"
          />

          <div className="space-y-1.5 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{currentUser.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                {currentUser.classGrade || 'Class 12'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#ff6a00]" />
                Target: <strong className="text-slate-800">{currentUser.targetExam || 'JEE Main/Adv'}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-indigo-600" />
                {currentUser.school || 'Academic Institute'}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {currentUser.email}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            onClick={onStartCbtClick}
            className="flex-1 md:flex-none px-5 py-2.5 rounded-2xl bg-[#ff6a00] hover:bg-[#ea580c] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-amber-200 fill-amber-200" />
            <span>Practice CBT Mock</span>
          </button>

          <button
            onClick={openSecurityModal}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Shield className="w-4 h-4 text-[#ff6a00]" />
            <span>Security Center</span>
          </button>
        </div>
      </div>

      {/* 4 Performance Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#ff6a00] flex items-center justify-center shrink-0 border border-amber-100">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div className="text-left">
            <div className="text-xs text-slate-400 font-bold">Daily Streak</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">{currentUser.stats.streakDays} Days</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
            <Zap className="w-6 h-6" />
          </div>
          <div className="text-left">
            <div className="text-xs text-slate-400 font-bold">Tests Attempted</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">{currentUser.stats.testsGiven} Tests</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <Award className="w-6 h-6" />
          </div>
          <div className="text-left">
            <div className="text-xs text-slate-400 font-bold">Avg Accuracy</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">{currentUser.stats.avgScore || 85}%</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
            <Coins className="w-6 h-6" />
          </div>
          <div className="text-left">
            <div className="text-xs text-slate-400 font-bold">Study XP Coins</div>
            <div className="text-xl sm:text-2xl font-black text-purple-600 font-mono">{currentUser.stats.xp} XP</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Weekly Leaderboard + CBT Test History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Weekly Leaderboard (PW Style Gamification) (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Weekly Leaderboard</h3>
                  <p className="text-[10px] text-slate-400">Ranked by CBT accuracy & DPP XP</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold">
                WEEK 36
              </span>
            </div>

            <div className="space-y-2.5">
              {leaderboard.length === 0 ? (
                <div className="p-6 text-center bg-slate-50 rounded-2xl border border-slate-100">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-amber-500/70" />
                  <p className="text-xs font-bold text-slate-800">All-India Rank 1 is Open!</p>
                  <p className="text-[11px] text-slate-500 mt-1">Take a CBT Mock Test or solve DPPs to claim your rank on the leaderboard.</p>
                  {onStartCbtClick && (
                    <button
                      onClick={onStartCbtClick}
                      className="mt-3 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      Start Mock Test
                    </button>
                  )}
                </div>
              ) : (
                leaderboard.map((entry) => (
                  <div
                    key={entry.id}
                    className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${
                      entry.rank === 1
                        ? 'bg-amber-50/60 border-amber-200 ring-1 ring-amber-200'
                        : entry.rank === 2
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-white border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs font-mono ${
                        entry.rank === 1 ? 'bg-[#ff6a00] text-white shadow-xs' :
                        entry.rank === 2 ? 'bg-slate-700 text-white' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        #{entry.rank}
                      </div>

                      <img
                        src={entry.avatar}
                        alt={entry.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />

                      <div className="text-left">
                        <p className="text-xs font-bold text-slate-900 leading-tight">{entry.name}</p>
                        <span className="text-[10px] text-slate-400 font-medium">{entry.classGrade} • {entry.badge}</span>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <div className="text-xs font-black text-indigo-600">{entry.xp} XP</div>
                      <div className="text-[10px] text-emerald-600 font-bold">{entry.avgAccuracy}% Acc</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 rounded-2xl bg-indigo-50/80 border border-indigo-200 flex items-center justify-between text-xs text-indigo-900 font-bold">
              <span>Your Current Rank:</span>
              <span className="font-mono text-[#ff6a00]">
                {(() => {
                  const myRank = leaderboard.findIndex(e => e.id === currentUser.id);
                  return myRank !== -1 ? `#${myRank + 1} in All India EdParth` : 'Unranked (Take 1 CBT test to rank)';
                })()}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: CBT Test History & Requests (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-900">
                Your CBT Mock Test Performance
              </h2>
              <span className="text-xs text-slate-400 font-mono">{myResults.length} Tests Recorded</span>
            </div>

            {myResults.length > 0 ? (
              <div className="space-y-3">
                {myResults.map((res) => (
                  <div key={res.id} className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-slate-900">{res.examTitle}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Submitted on {new Date(res.timestamp).toLocaleDateString()} • Time: {Math.floor(res.timeTakenSeconds / 60)}m
                      </p>
                    </div>

                    <div className="text-right font-mono">
                      <div className="text-base font-black text-indigo-600">
                        {res.score} <span className="text-xs text-slate-400">/ {res.maxScore}</span>
                      </div>
                      <div className="text-[11px] text-emerald-600 font-bold">{res.accuracy}% Accuracy</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 text-slate-400 space-y-3">
                <Zap className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-800">No CBT Test Records Yet</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Attempt proctored NTA format mock tests to get AI percentile and accuracy analytics.
                </p>
                <button
                  onClick={onStartCbtClick}
                  className="px-5 py-2.5 rounded-xl bg-[#ff6a00] hover:bg-[#ea580c] text-white font-bold text-xs shadow-sm cursor-pointer"
                >
                  Start First CBT Mock
                </button>
              </div>
            )}
          </div>

          {/* Chat Requests Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 text-left">
            <h3 className="text-sm font-extrabold text-slate-900">
              Your Community Note Requests
            </h3>

            {myRequests.length > 0 ? (
              <div className="space-y-2">
                {myRequests.map((req) => (
                  <div key={req.id} className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800">
                        Request Posted
                      </span>
                      <span className="text-slate-400 font-mono">{req.timestamp}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800">{req.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">No active note requests posted in chat.</p>
            )}

            <button
              onClick={onRequestMaterialClick}
              className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              + Post New Request in Community
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
