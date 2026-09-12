import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, Award, Play, BookOpen, CheckCircle2, Layers, Search, Sparkles, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { CBTExam } from '../../types';

interface CBTListProps {
  onStartExam: (exam: CBTExam) => void;
  onOpenConverter: () => void;
}

export const CBTList: React.FC<CBTListProps> = ({ onStartExam, onOpenConverter }) => {
  const { exams, currentUser, testResults } = useApp();

  const [search, setSearch] = useState('');
  const [selectedExamFilter, setSelectedExamFilter] = useState('All');

  const examCategories = ['All', 'JEE Main/Adv', 'NEET UG', 'Govt Exam (SSC/NDA/CUET)', 'CBSE Class 12', 'CBSE Class 10'];

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(search.toLowerCase()) ||
                          exam.subject.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedExamFilter === 'All' || exam.targetExam === selectedExamFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-extrabold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>NTA-Standard Real Exam Simulation</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Computer Based Test (CBT) Series
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl font-medium">
            Practice actual JEE Main/Adv & NEET NTA test screens with timer countdown, negative markings, question palette, and detailed solution reviews.
          </p>
        </div>

        {currentUser?.role === 'admin' && (
          <button
            onClick={onOpenConverter}
            className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Convert PDF to New CBT</span>
          </button>
        )}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search mock tests by topic or exam..."
            className="w-full bg-white border border-slate-200 rounded-full pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-indigo-600 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {examCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedExamFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedExamFilter === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Exam Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between space-y-5 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-50 text-indigo-700">
                  {exam.targetExam}
                </span>
                {(() => {
                  const attempts = testResults.filter(r => r.examId === exam.id).length;
                  return (
                    <span className="text-[11px] text-slate-400 font-mono">
                      {attempts > 0 ? `${attempts} ${attempts === 1 ? 'attempt' : 'attempts'}` : 'Ready to attempt'}
                    </span>
                  );
                })()}
              </div>

              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                {exam.title}
              </h3>

              <p className="text-xs text-slate-500 font-medium">
                Subject: <strong className="text-slate-800">{exam.subject}</strong>
              </p>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
                <div className="p-2.5 rounded-2xl bg-slate-50">
                  <div className="text-[10px] text-slate-400 font-bold">Questions</div>
                  <div className="text-xs font-extrabold text-slate-900 mt-0.5">{exam.questions.length} Qs</div>
                </div>
                <div className="p-2.5 rounded-2xl bg-slate-50">
                  <div className="text-[10px] text-slate-400 font-bold">Duration</div>
                  <div className="text-xs font-extrabold text-indigo-600 mt-0.5">{exam.durationMinutes} Mins</div>
                </div>
                <div className="p-2.5 rounded-2xl bg-slate-50">
                  <div className="text-[10px] text-slate-400 font-bold">Total Marks</div>
                  <div className="text-xs font-extrabold text-emerald-600 mt-0.5">{exam.totalMarks} M</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onStartExam(exam)}
              className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Real CBT Mock Test</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
