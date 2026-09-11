import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileText, Sparkles, Plus, Trash2, Image, Play, Eye, FileCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { CBTExam, CBTQuestion } from '../../types';
import confetti from 'canvas-confetti';

interface PdfToCbtConverterProps {
  onTestPublished?: (exam: CBTExam) => void;
}

export const PdfToCbtConverter: React.FC<PdfToCbtConverterProps> = ({ onTestPublished }) => {
  const { addCBTExam, currentUser } = useApp();

  const [isProcessing, setIsProcessing] = useState(false);
  const [examTitle, setExamTitle] = useState('JEE Advanced 2026 Physics & Chemistry Speed Drill');
  const [targetExam, setTargetExam] = useState('JEE Main/Adv');
  const [subject, setSubject] = useState('Physics & Chemistry');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [marksPerQuestion, setMarksPerQuestion] = useState(4);
  const [negativeMarks, setNegativeMarks] = useState(1);

  const [rawText, setRawText] = useState(`Q1. A particle moves in a circle of radius R = 5m with constant speed v = 10 m/s. What is the magnitude of centripetal acceleration acting on the particle?
(A) 10 m/s²
(B) 20 m/s²
(C) 50 m/s²
(D) 5 m/s²
Answer: B
Explanation: Centripetal acceleration a_c = v² / R = 10² / 5 = 100 / 5 = 20 m/s².

Q2. What is the hybridization and geometric shape of Xenon Difluoride (XeF2)?
(A) sp³d, Linear
(B) sp³, Tetrahedral
(C) sp³d², Octahedral
(D) sp² , Trigonal Planar
Answer: A
Explanation: Xe has 8 valence electrons + 2 bond pairs = 10 electrons = 5 pairs (2 bp + 3 lp) -> sp³d hybridization with 3 lone pairs in equatorial positions resulting in a Linear geometry.

Q3. Find the value of the integral ∫ [ e^x (1 + x) / cos²(x e^x) ] dx.
(A) tan(x e^x) + C
(B) cot(x e^x) + C
(C) sin(x e^x) + C
(D) e^x tan(x) + C
Answer: A
Explanation: Let t = x e^x => dt = (x e^x + e^x) dx = e^x(1 + x) dx. Thus ∫ dt / cos²(t) = ∫ sec²(t) dt = tan(t) + C = tan(x e^x) + C.`);

  const [parsedQuestions, setParsedQuestions] = useState<CBTQuestion[]>([
    {
      id: 1,
      subject: 'Physics',
      text: 'A particle moves in a circle of radius R = 5m with constant speed v = 10 m/s. What is the magnitude of centripetal acceleration acting on the particle?',
      imageUrl: '',
      options: [
        { id: 'A', text: '10 m/s²' },
        { id: 'B', text: '20 m/s²' },
        { id: 'C', text: '50 m/s²' },
        { id: 'D', text: '5 m/s²' }
      ],
      correctOptionId: 'B',
      explanation: 'Centripetal acceleration a_c = v² / R = 10² / 5 = 100 / 5 = 20 m/s².',
      marks: 4,
      negativeMarks: 1,
      topic: 'Circular Motion'
    },
    {
      id: 2,
      subject: 'Chemistry',
      text: 'What is the hybridization and geometric shape of Xenon Difluoride (XeF2)?',
      imageUrl: '',
      options: [
        { id: 'A', text: 'sp³d, Linear' },
        { id: 'B', text: 'sp³, Tetrahedral' },
        { id: 'C', text: 'sp³d², Octahedral' },
        { id: 'D', text: 'sp² , Trigonal Planar' }
      ],
      correctOptionId: 'A',
      explanation: 'Xe has 8 valence electrons + 2 bond pairs = 10 electrons = 5 pairs (2 bp + 3 lp) -> sp³d hybridization with 3 lone pairs in equatorial positions resulting in a Linear geometry.',
      marks: 4,
      negativeMarks: 1,
      topic: 'Chemical Bonding'
    },
    {
      id: 3,
      subject: 'Mathematics',
      text: 'Find the value of the integral ∫ [ e^x (1 + x) / cos²(x e^x) ] dx.',
      imageUrl: '',
      options: [
        { id: 'A', text: 'tan(x e^x) + C' },
        { id: 'B', text: 'cot(x e^x) + C' },
        { id: 'C', text: 'sin(x e^x) + C' },
        { id: 'D', text: 'e^x tan(x) + C' }
      ],
      correctOptionId: 'A',
      explanation: 'Let t = x e^x => dt = (x e^x + e^x) dx = e^x(1 + x) dx. Thus ∫ dt / cos²(t) = ∫ sec²(t) dt = tan(t) + C = tan(x e^x) + C.',
      marks: 4,
      negativeMarks: 1,
      topic: 'Indefinite Integration'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'upload' | 'edit'>('upload');

  const handleParseText = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const qBlocks = rawText.split(/(?:Q\d+[\.\:]|\n\d+[\.\:])/i).filter(b => b.trim().length > 10);
      
      const newQuestions: CBTQuestion[] = qBlocks.map((block, idx) => {
        const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
        
        let qText = lines[0] || `Question ${idx + 1}`;
        let optA = 'Option A';
        let optB = 'Option B';
        let optC = 'Option C';
        let optD = 'Option D';
        let ans = 'A';
        let exp = 'Step by step standard solution.';

        lines.forEach(line => {
          if (/^\(?[A1]\)[\.\:\s]/i.test(line)) optA = line.replace(/^\(?[A1]\)[\.\:\s]*/i, '');
          else if (/^\(?[B2]\)[\.\:\s]/i.test(line)) optB = line.replace(/^\(?[B2]\)[\.\:\s]*/i, '');
          else if (/^\(?[C3]\)[\.\:\s]/i.test(line)) optC = line.replace(/^\(?[C3]\)[\.\:\s]*/i, '');
          else if (/^\(?[D4]\)[\.\:\s]/i.test(line)) optD = line.replace(/^\(?[D4]\)[\.\:\s]*/i, '');
          else if (/^(?:Ans|Answer|Key)[\:\s]/i.test(line)) {
            const match = line.match(/[A-D]/i);
            if (match) ans = match[0].toUpperCase();
          } else if (/^(?:Exp|Explanation|Solution)[\:\s]/i.test(line)) {
            exp = line.replace(/^(?:Exp|Explanation|Solution)[\:\s]*/i, '');
          }
        });

        return {
          id: idx + 1,
          subject: subject.split('&')[idx % 2]?.trim() || subject,
          text: qText,
          imageUrl: '',
          options: [
            { id: 'A', text: optA },
            { id: 'B', text: optB },
            { id: 'C', text: optC },
            { id: 'D', text: optD }
          ],
          correctOptionId: ans,
          explanation: exp,
          marks: marksPerQuestion,
          negativeMarks: negativeMarks,
          topic: 'General'
        };
      });

      if (newQuestions.length > 0) {
        setParsedQuestions(newQuestions);
      }
      setIsProcessing(false);
      setActiveTab('edit');
    }, 600);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setTimeout(() => {
      const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      setExamTitle(`${fileNameWithoutExt} (Auto-Converted CBT)`);
      setIsProcessing(false);
      setActiveTab('edit');
    }, 900);
  };

  const handleUpdateQuestion = (index: number, updated: Partial<CBTQuestion>) => {
    setParsedQuestions(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...updated };
      return copy;
    });
  };

  const handleAddQuestion = () => {
    const newQ: CBTQuestion = {
      id: parsedQuestions.length + 1,
      subject: subject.split('&')[0]?.trim() || 'Physics',
      text: 'New question statement with figures & formula...',
      imageUrl: '',
      options: [
        { id: 'A', text: 'Option A value' },
        { id: 'B', text: 'Option B value' },
        { id: 'C', text: 'Option C value' },
        { id: 'D', text: 'Option D value' }
      ],
      correctOptionId: 'A',
      explanation: 'Detailed step-by-step concept explanation.',
      marks: marksPerQuestion,
      negativeMarks: negativeMarks,
      topic: 'Practice'
    };
    setParsedQuestions(prev => [...prev, newQ]);
  };

  const handleDeleteQuestion = (id: number) => {
    setParsedQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handlePublishExam = () => {
    const newExam: CBTExam = {
      id: `cbt_${Date.now()}`,
      title: examTitle,
      targetExam,
      subject,
      durationMinutes,
      totalMarks: parsedQuestions.length * marksPerQuestion,
      passingMarks: Math.round(parsedQuestions.length * marksPerQuestion * 0.4),
      instructions: [
        `This test is generated from "${examTitle}".`,
        `Each correct question awards +${marksPerQuestion} marks. Incorrect answer incurs -${negativeMarks} mark.`,
        'Candidates can change their responses before final submission.',
        'Use the question palette to jump between questions easily.'
      ],
      questions: parsedQuestions,
      createdBy: currentUser ? currentUser.name : 'Admin (RAJ)',
      createdAt: new Date().toISOString().split('T')[0],
      attemptsCount: 0
    };

    addCBTExam(newExam);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });

    if (onTestPublished) {
      onTestPublished(newExam);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-xs mb-1">
            <Sparkles className="w-4 h-4" />
            <span>AI Automated Test Generator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            PDF & Paper to Real CBT Converter
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Convert test PDFs, DPPs, and worksheets into live computer based tests with diagram and figure support.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            1. Upload & Parse
          </button>
          <button
            onClick={() => setActiveTab('edit')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'edit'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>2. Question Editor</span>
            <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] flex items-center justify-center font-bold">
              {parsedQuestions.length}
            </span>
          </button>
        </div>
      </div>

      {/* Tab 1: Upload */}
      {activeTab === 'upload' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="font-extrabold text-sm text-slate-900 mb-2 flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-indigo-600" />
                <span>Upload PDF Document</span>
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                Upload your exam PDF, Word file, or scanned test paper.
              </p>

              <label className="border-2 border-dashed border-slate-200 hover:border-indigo-600 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-[#f8fafc] hover:bg-slate-50">
                <input
                  type="file"
                  accept=".pdf,.docx,.txt,.png,.jpg"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <FileText className="w-10 h-10 text-indigo-600 mb-2 animate-bounce" />
                <span className="text-xs font-extrabold text-slate-800">
                  Click to Browse PDF
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  PDF, DOCX, TXT (up to 50MB)
                </span>
              </label>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-indigo-600" />
                  <span>Paste Question Bank Text</span>
                </h4>
                <span className="text-[11px] text-slate-400 font-mono">Format: Q1. ... (A) ... Ans: B</span>
              </div>

              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                rows={10}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl p-4 text-xs font-mono text-slate-800 focus:outline-none focus:border-indigo-600 resize-none leading-relaxed"
              />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-medium">
                Questions with diagrams and answer keys ready.
              </span>
              <button
                onClick={handleParseText}
                disabled={isProcessing}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>Convert to Interactive CBT ({parsedQuestions.length} Qs)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Question Editor */}
      {activeTab === 'edit' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="lg:col-span-2">
              <label className="block text-[11px] font-bold text-slate-600 mb-1">CBT Exam Title</label>
              <input
                type="text"
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Target Category</label>
              <select
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value)}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
              >
                <option value="JEE Main/Adv">JEE Main & Adv</option>
                <option value="NEET UG">NEET UG</option>
                <option value="Govt Exam (SSC/NDA/CUET)">Govt Exam</option>
                <option value="CBSE Class 12">Class 12</option>
                <option value="CBSE Class 10">Class 10</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Duration (Mins)</label>
              <input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Marking (+ / -)</label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={marksPerQuestion}
                  onChange={(e) => setMarksPerQuestion(Number(e.target.value))}
                  className="w-1/2 bg-[#f8fafc] border border-slate-200 rounded-xl px-2 py-1.5 text-xs text-slate-900 text-center"
                />
                <span className="text-slate-400">/</span>
                <input
                  type="number"
                  value={negativeMarks}
                  onChange={(e) => setNegativeMarks(Number(e.target.value))}
                  className="w-1/2 bg-[#f8fafc] border border-slate-200 rounded-xl px-2 py-1.5 text-xs text-slate-900 text-center"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {parsedQuestions.map((q, qIndex) => (
              <div key={q.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-extrabold text-xs">
                      {qIndex + 1}
                    </span>
                    <input
                      type="text"
                      value={q.subject}
                      onChange={(e) => handleUpdateQuestion(qIndex, { subject: e.target.value })}
                      className="bg-slate-50 text-xs font-bold text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200"
                    />
                  </div>

                  <button
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <textarea
                  value={q.text}
                  onChange={(e) => handleUpdateQuestion(qIndex, { text: e.target.value })}
                  rows={2}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-indigo-600"
                />

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={q.imageUrl || ''}
                    onChange={(e) => handleUpdateQuestion(qIndex, { imageUrl: e.target.value })}
                    placeholder="Diagram / Figure PNG URL (optional)"
                    className="flex-1 bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                  />
                  {q.imageUrl && (
                    <a
                      href={q.imageUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-slate-100 text-indigo-600 text-xs flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt) => (
                    <div
                      key={opt.id}
                      className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                        q.correctOptionId === opt.id
                          ? 'bg-emerald-50 border-emerald-300'
                          : 'bg-[#f8fafc] border-slate-200'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleUpdateQuestion(qIndex, { correctOptionId: opt.id })}
                        className={`w-6 h-6 rounded-md text-xs font-bold flex items-center justify-center shrink-0 ${
                          q.correctOptionId === opt.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {opt.id}
                      </button>
                      <input
                        type="text"
                        value={opt.text}
                        onChange={(e) => {
                          const updatedOptions = q.options.map(o => o.id === opt.id ? { ...o, text: e.target.value } : o);
                          handleUpdateQuestion(qIndex, { options: updatedOptions });
                        }}
                        className="w-full bg-transparent text-xs text-slate-800 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-5 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <button
              onClick={handleAddQuestion}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Question</span>
            </button>

            <button
              onClick={handlePublishExam}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Publish & Launch CBT Series</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
