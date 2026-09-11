import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertTriangle, CheckCircle2, XCircle, ArrowRight, ArrowLeft, RotateCcw, Award, FileText, ChevronRight, BarChart2, Eye, ZoomIn, ZoomOut, User as UserIcon, ShieldAlert, ShieldCheck } from 'lucide-react';
import { CBTExam, QuestionStatus, StudentTestResult } from '../../types';
import { useApp } from '../../context/AppContext';
import { WatermarkOverlay } from '../security/WatermarkOverlay';
import confetti from 'canvas-confetti';

interface CBTExamEngineProps {
  exam: CBTExam;
  onExit: () => void;
}

export const CBTExamEngine: React.FC<CBTExamEngineProps> = ({ exam, onExit }) => {
  const { currentUser, submitTestResult } = useApp();

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [questionStatuses, setQuestionStatuses] = useState<Record<number, QuestionStatus>>({});
  const [timeLeft, setTimeLeft] = useState(exam.durationMinutes * 60);
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [testResult, setTestResult] = useState<StudentTestResult | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [proctorStrikes, setProctorStrikes] = useState<number>(0);
  const [showProctorWarning, setShowProctorWarning] = useState<boolean>(false);

  const currentQuestion = exam.questions[currentQIndex];

  // Get distinct subjects in this exam
  const subjects = Array.from(new Set(exam.questions.map(q => q.subject)));

  // Anti-Cheating Window Blur / Tab Switch Detector
  useEffect(() => {
    if (isTestSubmitted) return;

    const handleWindowBlur = () => {
      setProctorStrikes(prev => {
        const next = prev + 1;
        setShowProctorWarning(true);
        if (next >= 3) {
          // Auto submit if student repeatedly switches tabs
          setTimeout(() => {
            handleSubmitExam();
          }, 1500);
        }
        return next;
      });
    };

    window.addEventListener('blur', handleWindowBlur);
    return () => window.removeEventListener('blur', handleWindowBlur);
  }, [isTestSubmitted]);

  // Countdown timer
  useEffect(() => {
    if (isTestSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestSubmitted]);

  // Track question status as visited if not answered yet
  useEffect(() => {
    if (currentQuestion && !questionStatuses[currentQuestion.id]) {
      setQuestionStatuses(prev => ({
        ...prev,
        [currentQuestion.id]: 'not_answered'
      }));
    }
  }, [currentQIndex]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? `${hrs}:` : ''}${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSelectOption = (optionId: string) => {
    if (isTestSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const handleClearResponse = () => {
    setSelectedAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
    setQuestionStatuses(prev => ({
      ...prev,
      [currentQuestion.id]: 'not_answered'
    }));
  };

  const handleSaveAndNext = () => {
    const hasAnswered = !!selectedAnswers[currentQuestion.id];
    setQuestionStatuses(prev => ({
      ...prev,
      [currentQuestion.id]: hasAnswered ? 'answered' : 'not_answered'
    }));

    if (currentQIndex < exam.questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    }
  };

  const handleMarkForReviewAndNext = () => {
    const hasAnswered = !!selectedAnswers[currentQuestion.id];
    setQuestionStatuses(prev => ({
      ...prev,
      [currentQuestion.id]: hasAnswered ? 'answered_marked_for_review' : 'marked_for_review'
    }));

    if (currentQIndex < exam.questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    }
  };

  const handleSubmitExam = () => {
    setShowConfirmModal(false);

    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let totalAttempted = 0;

    exam.questions.forEach(q => {
      const userAnswer = selectedAnswers[q.id];
      if (userAnswer) {
        totalAttempted++;
        if (userAnswer === q.correctOptionId) {
          correctCount++;
          score += q.marks;
        } else {
          wrongCount++;
          score -= q.negativeMarks;
        }
      }
    });

    const accuracy = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;
    const timeTaken = exam.durationMinutes * 60 - timeLeft;

    const result: StudentTestResult = {
      id: `res_${Date.now()}`,
      examId: exam.id,
      examTitle: exam.title,
      studentId: currentUser ? currentUser.id : 'guest',
      studentName: currentUser ? currentUser.name : 'Guest Student',
      score,
      maxScore: exam.totalMarks,
      accuracy,
      totalAttempted,
      correctCount,
      wrongCount,
      timeTakenSeconds: timeTaken,
      timestamp: new Date().toISOString(),
      userAnswers: selectedAnswers
    };

    setTestResult(result);
    setIsTestSubmitted(true);
    submitTestResult(result);

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 }
    });
  };

  // Status counters for palette
  const answeredCount = Object.values(questionStatuses).filter(s => s === 'answered').length;
  const notAnsweredCount = Object.values(questionStatuses).filter(s => s === 'not_answered').length;
  const markedReviewCount = Object.values(questionStatuses).filter(s => s === 'marked_for_review').length;
  const answeredMarkedCount = Object.values(questionStatuses).filter(s => s === 'answered_marked_for_review').length;
  const notVisitedCount = exam.questions.length - Object.keys(questionStatuses).length;

  // Filter questions by subject if tab active
  const filteredQuestionIndices = exam.questions
    .map((q, idx) => ({ q, idx }))
    .filter(item => selectedSubject === 'All' || item.q.subject === selectedSubject);

  if (isTestSubmitted && testResult) {
    return (
      <div className="min-h-screen bg-[#090a0f] py-8 px-4 max-w-6xl mx-auto space-y-8">
        {/* Score Card Header */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-xs mb-3">
            <CheckCircle2 className="w-4 h-4" />
            <span>Test Submitted Successfully</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white">{exam.title}</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Candidate: <strong className="text-indigo-300">{testResult.studentName}</strong> • Completed in {Math.floor(testResult.timeTakenSeconds / 60)}m {testResult.timeTakenSeconds % 60}s
          </p>

          {/* Stats Grid */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Your Score</span>
              <div className="text-2xl sm:text-3xl font-black text-indigo-400 mt-1">
                {testResult.score} <span className="text-xs text-slate-500">/ {testResult.maxScore}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Accuracy</span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                {testResult.accuracy}%
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Correct / Wrong</span>
              <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                <span className="text-emerald-400">{testResult.correctCount}</span>
                <span className="text-slate-600"> / </span>
                <span className="text-red-400">{testResult.wrongCount}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Attempted</span>
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 mt-1">
                {testResult.totalAttempted} <span className="text-xs text-slate-500">/ {exam.questions.length}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={onExit}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              Back to Study Portal
            </button>
          </div>
        </div>

        {/* Detailed Solutions Breakdown */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-indigo-400" />
              <span>Detailed Question Solutions & Answers</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              {exam.questions.length} Total Questions
            </span>
          </div>

          <div className="space-y-6">
            {exam.questions.map((q, idx) => {
              const userAns = testResult.userAnswers[q.id];
              const isCorrect = userAns === q.correctOptionId;
              const isSkipped = !userAns;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border ${
                    isSkipped
                      ? 'bg-slate-900/50 border-slate-800'
                      : isCorrect
                      ? 'bg-emerald-950/20 border-emerald-500/30'
                      : 'bg-red-950/20 border-red-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-lg bg-slate-800 text-xs font-bold text-indigo-300">
                        Q{idx + 1}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{q.subject}</span>
                      {q.topic && <span className="text-xs text-slate-500">• {q.topic}</span>}
                    </div>

                    <span
                      className={`px-3 py-0.5 rounded-full text-xs font-bold ${
                        isSkipped
                          ? 'bg-slate-800 text-slate-400'
                          : isCorrect
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {isSkipped ? 'Skipped' : isCorrect ? '+4 Marks (Correct)' : '-1 Mark (Incorrect)'}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-200 font-medium mb-4 leading-relaxed">
                    {q.text}
                  </p>

                  {/* Figure if available */}
                  {q.imageUrl && (
                    <div className="mb-4 max-w-md rounded-xl overflow-hidden border border-slate-700">
                      <img src={q.imageUrl} alt="Question Figure" className="w-full object-contain max-h-64 bg-slate-900" />
                    </div>
                  )}

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                    {q.options.map(opt => {
                      const isOptionCorrect = opt.id === q.correctOptionId;
                      const isOptionSelected = opt.id === userAns;

                      return (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-xl border flex items-center justify-between text-xs sm:text-sm ${
                            isOptionCorrect
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold'
                              : isOptionSelected && !isCorrect
                              ? 'bg-red-500/20 border-red-500 text-red-200 line-through'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-slate-800 text-xs font-bold flex items-center justify-center">
                              {opt.id}
                            </span>
                            <span>{opt.text}</span>
                          </div>
                          {isOptionCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                          {isOptionSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Box */}
                  <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-200">
                    <span className="font-bold text-indigo-300">💡 Solution: </span>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07080c] flex flex-col text-slate-200 select-none">
      {/* NTA Top Navigation Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
            EP
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-white leading-tight">{exam.title}</h1>
            <span className="text-[11px] text-slate-400">{exam.targetExam} • Computer Based Test</span>
          </div>
        </div>

        {/* Timer & Candidate Info */}
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono font-bold text-sm ${
            timeLeft < 300
              ? 'bg-red-500/20 border-red-500 text-red-300 animate-pulse'
              : 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300'
          }`}>
            <Clock className="w-4 h-4" />
            <span>Time Left: {formatTime(timeLeft)}</span>
          </div>

          <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-slate-700">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-bold text-xs">
              {currentUser?.name ? currentUser.name[0] : 'S'}
            </div>
            <div className="text-left text-xs">
              <p className="font-bold text-white">{currentUser?.name || 'Student Candidate'}</p>
              <p className="text-[10px] text-slate-400">{currentUser?.classGrade || 'Class 12'}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Subject Section Switcher */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs overflow-x-auto">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-semibold mr-1">Sections:</span>
          <button
            onClick={() => setSelectedSubject('All')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              selectedSubject === 'All'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            All Sections ({exam.questions.length})
          </button>
          {subjects.map(sub => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                selectedSubject === sub
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {sub} ({exam.questions.filter(q => q.subject === sub).length})
            </button>
          ))}
        </div>

        {/* Text Zoom Control */}
        <div className="hidden md:flex items-center gap-2 text-slate-400">
          <span className="text-[11px]">Zoom:</span>
          <button
            onClick={() => setZoomLevel(prev => Math.max(80, prev - 10))}
            className="p-1 hover:bg-slate-800 rounded text-slate-300"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs font-mono">{zoomLevel}%</span>
          <button
            onClick={() => setZoomLevel(prev => Math.min(130, prev + 10))}
            className="p-1 hover:bg-slate-800 rounded text-slate-300"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main CBT Workspace: Left Question Area + Right Question Palette */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        <WatermarkOverlay position="grid" opacity={0.06} />
        
        {/* Left Column: Question Screen */}
        <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 overflow-y-auto bg-slate-950/60 relative z-10" style={{ fontSize: `${zoomLevel}%` }}>
          {currentQuestion ? (
            <div className="space-y-5 max-w-4xl">
              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-bold text-xs sm:text-sm">
                    Question No. {currentQIndex + 1}
                  </span>
                  <span className="text-xs font-semibold text-indigo-300 bg-indigo-950/60 px-2.5 py-0.5 rounded border border-indigo-500/20">
                    {currentQuestion.subject}
                  </span>
                </div>

                <div className="text-xs text-slate-400 font-mono">
                  Marks: <span className="text-emerald-400 font-bold">+{currentQuestion.marks}</span> / <span className="text-red-400 font-bold">-{currentQuestion.negativeMarks}</span>
                </div>
              </div>

              {/* Question Text */}
              <div className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
                {currentQuestion.text}
              </div>

              {/* Diagram / Figure */}
              {currentQuestion.imageUrl && (
                <div className="my-3 p-2 bg-slate-900 rounded-2xl border border-slate-700 max-w-md">
                  <img
                    src={currentQuestion.imageUrl}
                    alt="Diagram"
                    className="w-full h-auto object-contain rounded-xl max-h-72"
                  />
                  <p className="text-center text-[11px] text-slate-400 mt-1 font-mono">Figure for Q.{currentQIndex + 1}</p>
                </div>
              )}

              {/* 4 Interactive Options */}
              <div className="space-y-3 pt-2">
                {currentQuestion.options.map((opt) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`p-3.5 sm:p-4 rounded-2xl border flex items-center gap-3.5 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-600/10 text-white'
                          : 'bg-slate-900/70 border-slate-800 hover:bg-slate-900 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {opt.id}
                      </div>
                      <span className="text-sm sm:text-base font-normal flex-1">
                        {opt.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-400 py-20">No question selected</div>
          )}

          {/* Bottom Action Bar */}
          <div className="mt-8 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleSaveAndNext}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 cursor-pointer flex items-center gap-1.5"
              >
                <span>Save & Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleMarkForReviewAndNext}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-600/20 cursor-pointer"
              >
                Mark for Review & Next
              </button>

              <button
                onClick={handleClearResponse}
                className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs sm:text-sm cursor-pointer"
              >
                Clear Response
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentQIndex === 0}
                onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-200 font-semibold text-xs sm:text-sm cursor-pointer flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                disabled={currentQIndex === exam.questions.length - 1}
                onClick={() => setCurrentQIndex(prev => Math.min(exam.questions.length - 1, prev + 1))}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-200 font-semibold text-xs sm:text-sm cursor-pointer flex items-center gap-1"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowConfirmModal(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-600/30 cursor-pointer hover:scale-[1.02] transition-transform ml-2"
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: NTA Question Palette */}
        <div className="w-full lg:w-80 bg-slate-900 border-l border-slate-800 p-4 flex flex-col justify-between overflow-y-auto">
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">
              Question Palette
            </h3>

            {/* Legend Indicators */}
            <div className="grid grid-cols-2 gap-2 text-[11px] mb-4 pb-3 border-b border-slate-800 text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px]">
                  {answeredCount}
                </span>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-red-600 text-white font-bold flex items-center justify-center text-[10px]">
                  {notAnsweredCount}
                </span>
                <span>Not Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-slate-700 text-slate-300 font-bold flex items-center justify-center text-[10px]">
                  {notVisitedCount}
                </span>
                <span>Not Visited</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-purple-600 text-white font-bold flex items-center justify-center text-[10px]">
                  {markedReviewCount + answeredMarkedCount}
                </span>
                <span>Marked Review</span>
              </div>
            </div>

            {/* Questions Grid */}
            <div className="grid grid-cols-5 gap-2 max-h-72 overflow-y-auto pr-1">
              {exam.questions.map((q, idx) => {
                const status = questionStatuses[q.id] || 'not_visited';
                const isCurrent = idx === currentQIndex;

                let bgClass = 'bg-slate-800 text-slate-400';
                if (status === 'answered') bgClass = 'bg-emerald-600 text-white';
                else if (status === 'not_answered') bgClass = 'bg-red-600 text-white';
                else if (status === 'marked_for_review') bgClass = 'bg-purple-600 text-white';
                else if (status === 'answered_marked_for_review') bgClass = 'bg-purple-600 text-white ring-2 ring-emerald-400';

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`h-9 rounded-lg font-bold text-xs transition-all cursor-pointer flex items-center justify-center ${bgClass} ${
                      isCurrent ? 'ring-2 ring-white scale-105 shadow-md' : 'hover:opacity-90'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800">
            <button
              onClick={() => setShowConfirmModal(true)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs shadow-md cursor-pointer"
            >
              Final Submit Test
            </button>
          </div>
        </div>
      </div>

      {/* Anti-Cheating Proctor Alert Modal */}
      <AnimatePresence>
        {showProctorWarning && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-red-500/50 max-w-lg w-full text-center space-y-4 shadow-2xl ring-2 ring-red-500/30"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto border border-red-500/30">
                <ShieldAlert className="w-8 h-8 animate-pulse" />
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-mono font-bold uppercase">
                  ANTI-CHEATING PROCTOR VIOLATION
                </div>
                <h3 className="text-xl font-black text-white">Focus Lost: Tab Switch Detected</h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Navigating away from the CBT exam interface or switching browser tabs is strictly recorded. You have received <strong className="text-red-400">Strike {proctorStrikes} of 3</strong>.
              </p>

              <div className="p-3 bg-red-950/40 rounded-xl border border-red-500/20 text-xs text-red-300 font-mono text-left space-y-1">
                <div>• Event: Window Unfocused / Application Blur</div>
                <div>• Policy: Exceeding 3 strikes results in automated test submission</div>
                <div>• Identity: {currentUser?.name || 'Candidate'} (IP Logged)</div>
              </div>

              <button
                onClick={() => setShowProctorWarning(false)}
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-red-600/30"
              >
                I Understand, Resume My Examination
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Submit Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel bg-slate-950 p-6 rounded-3xl border border-slate-700 max-w-md w-full text-center space-y-4 shadow-2xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-white">Ready to Submit Exam?</h3>
              <p className="text-xs text-slate-400">
                You have answered <strong className="text-emerald-400">{answeredCount + answeredMarkedCount}</strong> out of <strong className="text-white">{exam.questions.length}</strong> questions.
              </p>

              <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300 font-mono text-left space-y-1">
                <div className="flex justify-between"><span>Answered:</span><span className="text-emerald-400 font-bold">{answeredCount}</span></div>
                <div className="flex justify-between"><span>Marked for Review:</span><span className="text-purple-400 font-bold">{markedReviewCount}</span></div>
                <div className="flex justify-between"><span>Not Answered / Visited:</span><span className="text-red-400 font-bold">{notAnsweredCount + notVisitedCount}</span></div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700 cursor-pointer"
                >
                  Resume Test
                </button>
                <button
                  onClick={handleSubmitExam}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 cursor-pointer"
                >
                  Confirm & Submit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
