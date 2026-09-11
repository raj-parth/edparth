import React, { useState } from 'react';
import { Sparkles, Search, BookOpen, CheckCircle2, Bookmark, BookmarkCheck, ArrowRight, HelpCircle, Flame, Video, FileText, Send, Lightbulb, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../Logo';
import type { AIDoubtItem } from '../../types';

const INITIAL_SOLVED_DOUBTS: AIDoubtItem[] = [
  {
    id: 'd1',
    question: 'How to calculate electric field inside a non-conducting uniformly charged sphere of radius R at distance r (r < R)?',
    subject: 'Physics',
    conceptTitle: 'Gauss Law in Electrostatics (Non-Conducting Sphere)',
    explanation: 'For a solid non-conducting sphere with uniform volume charge density ρ, the enclosed charge within Gaussian surface of radius r (where r < R) is proportional to r³.',
    formulaUsed: 'E(r) = (ρ · r) / (3 · ε₀) = (1 / 4πε₀) · (Q · r / R³)',
    stepByStep: [
      'Step 1: Choose a concentric spherical Gaussian surface of radius r < R.',
      'Step 2: Calculate total enclosed charge q_enc = ρ · (4/3 · π · r³) = Q · (r³ / R³).',
      'Step 3: Apply Gauss’s Law: ∮ E · dA = E · (4πr²) = q_enc / ε₀.',
      'Step 4: Substitute q_enc: E · (4πr²) = [Q · r³] / [ε₀ · R³].',
      'Step 5: Simplify to obtain: E(r) = (1 / 4πε₀) · (Q · r / R³), which is directly proportional to r.'
    ],
    suggestedTopic: 'Electrostatics & Gauss Law (Class 12 / JEE / NEET)',
    askedAt: '10 mins ago',
    isBookmarked: false
  },
  {
    id: 'd2',
    question: 'Why does [Fe(H2O)6]3+ show paramagnetic behavior while [Fe(CN)6]3- is weakly paramagnetic / low-spin?',
    subject: 'Chemistry',
    conceptTitle: 'Crystal Field Theory & Ligand Field Strength',
    explanation: 'H₂O is a weak field ligand (Δo < P) causing no pairing of 3d electrons (high spin, 5 unpaired electrons). CN⁻ is a strong field ligand (Δo > P) causing pairing (low spin, 1 unpaired electron).',
    formulaUsed: 'Magnetic Moment μ = √[n(n+2)] B.M. (where n = number of unpaired electrons)',
    stepByStep: [
      'Step 1: In both complexes, Iron is in +3 oxidation state: Fe³⁺ has electronic configuration [Ar] 3d⁵.',
      'Step 2: With H₂O (weak ligand), crystal field splitting energy Δo is smaller than pairing energy P. Electrons enter t₂g³ eg² configuration (n = 5 unpaired electrons, μ = 5.92 B.M.).',
      'Step 3: With CN⁻ (strong ligand), Δo > P. Electrons are forced to pair in lower energy orbitals: t₂g⁵ eg⁰ (n = 1 unpaired electron, μ = 1.73 B.M.).',
      'Step 4: Conclusion: [Fe(H2O)6]3+ is high spin (strongly paramagnetic), while [Fe(CN)6]3- is low spin (weakly paramagnetic).'
    ],
    suggestedTopic: 'Coordination Compounds & Crystal Field Theory (Class 12 / NEET)',
    askedAt: '25 mins ago',
    isBookmarked: true
  },
  {
    id: 'd3',
    question: 'How to evaluate definite integral ∫[0 to π/2] (sin x) / (sin x + cos x) dx using properties?',
    subject: 'Mathematics',
    conceptTitle: 'King’s Property of Definite Integrals',
    explanation: 'Applying the King’s property ∫[a to b] f(x) dx = ∫[a to b] f(a + b - x) dx simplifies complementary trigonometric sums to constant integration.',
    formulaUsed: '∫[0 to a] f(x) dx = ∫[0 to a] f(a - x) dx ; 2I = ∫[0 to a] 1 dx = a',
    stepByStep: [
      'Step 1: Let I = ∫[0 to π/2] [sin x / (sin x + cos x)] dx  --- (Equation 1)',
      'Step 2: Apply property f(π/2 - x): sin(π/2 - x) = cos x, cos(π/2 - x) = sin x.',
      'Step 3: Therefore, I = ∫[0 to π/2] [cos x / (cos x + sin x)] dx --- (Equation 2)',
      'Step 4: Add Eq 1 and Eq 2: 2I = ∫[0 to π/2] [(sin x + cos x) / (sin x + cos x)] dx = ∫[0 to π/2] 1 dx.',
      'Step 5: 2I = [x] from 0 to π/2 = π/2 => I = π/4.'
    ],
    suggestedTopic: 'Definite Integration Properties (Class 12 / JEE Main)',
    askedAt: '1 hour ago',
    isBookmarked: false
  }
];

const PRESET_TOPIC_PROMPTS = [
  'Derive Lens Maker Formula in Optics',
  'Difference between SN1 and SN2 reaction mechanism',
  'What is Bernoulli principle and its equation?',
  'Explain Transcription and RNA Polymerase in Genetics',
  'Shortest distance between two skew lines in 3D Geometry'
];

export const AIDoubtEngine: React.FC = () => {
  const { currentUser } = useApp();
  const [selectedSubject, setSelectedSubject] = useState<'All' | 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology'>('All');
  const [query, setQuery] = useState('');
  const [doubtList, setDoubtList] = useState<AIDoubtItem[]>(INITIAL_SOLVED_DOUBTS);
  const [isSolving, setIsSolving] = useState(false);
  const [activeDoubt, setActiveDoubt] = useState<AIDoubtItem | null>(INITIAL_SOLVED_DOUBTS[0]);

  const handleAskDoubt = (questionText: string) => {
    if (!questionText.trim()) return;

    setIsSolving(true);

    setTimeout(() => {
      // Determine subject from text
      let sub: AIDoubtItem['subject'] = 'Physics';
      const lower = questionText.toLowerCase();
      if (lower.includes('chemistry') || lower.includes('reaction') || lower.includes('sn1') || lower.includes('acid') || lower.includes('compound')) sub = 'Chemistry';
      else if (lower.includes('math') || lower.includes('integral') || lower.includes('derivative') || lower.includes('matrix') || lower.includes('line')) sub = 'Mathematics';
      else if (lower.includes('bio') || lower.includes('cell') || lower.includes('dna') || lower.includes('rna') || lower.includes('genetics')) sub = 'Biology';

      const newDoubt: AIDoubtItem = {
        id: `doubt_${Date.now()}`,
        question: questionText,
        subject: sub,
        conceptTitle: `${sub} Concept Breakdown & High-Yield Derivation`,
        explanation: `Comprehensive verified step-by-step resolution for: "${questionText}". Verified by EdParth Academic Faculty.`,
        formulaUsed: sub === 'Physics' ? 'F = m · a ; E = mc² ; ∮ B · dl = μ₀ · I_enc' : sub === 'Chemistry' ? 'ΔG° = -nFE° ; pH = -log[H⁺]' : '∫ u dv = u·v - ∫ v du',
        stepByStep: [
          'Step 1: Identify given physical/chemical/mathematical boundary values.',
          'Step 2: Select the governing fundamental law and dimensional relations.',
          'Step 3: Execute algebraic substitution and simplify intermediate expressions.',
          'Step 4: Check limiting conditions and units to verify consistency.',
          'Step 5: Final verified solution derived with standard NTA/CBSE scoring guidelines.'
        ],
        suggestedTopic: `${sub} Standard Curriculum & PYQ Bank`,
        askedAt: 'Just now',
        isBookmarked: false
      };

      setDoubtList(prev => [newDoubt, ...prev]);
      setActiveDoubt(newDoubt);
      setQuery('');
      setIsSolving(false);
    }, 1200);
  };

  const toggleBookmark = (id: string) => {
    setDoubtList(prev => prev.map(d => d.id === id ? { ...d, isBookmarked: !d.isBookmarked } : d));
    if (activeDoubt && activeDoubt.id === id) {
      setActiveDoubt(prev => prev ? { ...prev, isBookmarked: !prev.isBookmarked } : null);
    }
  };

  const filteredDoubts = doubtList.filter(d => {
    if (selectedSubject !== 'All' && d.subject !== selectedSubject) return false;
    return true;
  });

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#111827] to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#ff6a00]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-[#ff6a00] text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>24/7 INSTANT AI DOUBT ENGINE</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Ask Any Doubt in Physics, Chem, Maths & Bio
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            Get instant, step-by-step conceptual derivations, applied formulas, and verified NCERT/JEE/NEET level solutions in seconds.
          </p>
        </div>
      </div>

      {/* Main Doubt Asking Input Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <div className="relative">
          <textarea
            rows={3}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your question or paste numerical problem here (e.g., 'Derive kinetic energy in rotational motion' or 'How to balance redox reactions')..."
            className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#ff6a00] focus:bg-white transition-all shadow-inner resize-none font-sans"
          />

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2 overflow-x-auto text-[11px] text-slate-500">
              <span className="font-bold shrink-0">Popular Topics:</span>
              {PRESET_TOPIC_PROMPTS.slice(0, 2).map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleAskDoubt(p)}
                  className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium whitespace-nowrap transition-colors cursor-pointer"
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleAskDoubt(query)}
              disabled={!query.trim() || isSolving}
              className="px-6 py-2.5 rounded-xl bg-[#ff6a00] hover:bg-[#ea580c] disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer shrink-0"
            >
              {isSolving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Solving Step-by-Step...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Solve Doubt Instantly</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-slate-100 pt-3">
          {(['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology'] as const).map(sub => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                selectedSubject === sub
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Left (Doubt List) & Right (Active Detailed Solution View) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Recent Solved Doubts (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono">
              Solved Doubts ({filteredDoubts.length})
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">Click to inspect</span>
          </div>

          <div className="space-y-3">
            {filteredDoubts.map(doubt => {
              const isSelected = activeDoubt?.id === doubt.id;
              return (
                <div
                  key={doubt.id}
                  onClick={() => setActiveDoubt(doubt)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-2.5 ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-300 shadow-md ring-1 ring-indigo-200'
                      : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                      doubt.subject === 'Physics' ? 'bg-amber-100 text-amber-800' :
                      doubt.subject === 'Chemistry' ? 'bg-emerald-100 text-emerald-800' :
                      doubt.subject === 'Mathematics' ? 'bg-indigo-100 text-indigo-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {doubt.subject}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{doubt.askedAt}</span>
                  </div>

                  <p className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug">
                    {doubt.question}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="truncate max-w-[200px] text-slate-600 font-medium">{doubt.conceptTitle}</span>
                    <span className="text-indigo-600 font-bold flex items-center gap-1">
                      View Solution <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Full Solution Card (7 Cols) */}
        <div className="lg:col-span-7">
          {activeDoubt ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6 text-left relative">
              
              {/* Top Details & Action */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#ff6a00]/10 text-[#ff6a00] text-[10px] font-mono font-black">
                      {activeDoubt.subject.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">ID: {activeDoubt.id}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                    {activeDoubt.question}
                  </h3>
                </div>

                <button
                  onClick={() => toggleBookmark(activeDoubt.id)}
                  title={activeDoubt.isBookmarked ? 'Remove Bookmark' : 'Bookmark to My Revision'}
                  className={`p-2.5 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                    activeDoubt.isBookmarked
                      ? 'bg-amber-50 border-amber-200 text-[#ff6a00]'
                      : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
                  }`}
                >
                  {activeDoubt.isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                </button>
              </div>

              {/* 1. Core Concept */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold font-mono">
                  <Lightbulb className="w-4 h-4" />
                  <span>CORE CONCEPT & THEORY</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">{activeDoubt.conceptTitle}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{activeDoubt.explanation}</p>
              </div>

              {/* 2. Key Formula Applied */}
              {activeDoubt.formulaUsed && (
                <div className="p-4 rounded-2xl bg-[#080b11] text-white border border-slate-800 space-y-1.5 font-mono">
                  <div className="text-[10px] text-[#ff6a00] font-black uppercase tracking-wider">
                    KEY FORMULA / GOVERNING RELATION
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-amber-300">
                    {activeDoubt.formulaUsed}
                  </div>
                </div>
              )}

              {/* 3. Step-by-Step Derivation & Solution */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono">
                  Step-by-Step Derivation & Solution
                </h4>

                <div className="space-y-2">
                  {activeDoubt.stepByStep.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-xs"
                    >
                      <div className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Resources Box */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5 text-center sm:text-left">
                  <p className="font-bold text-slate-900">Recommended Topic Playlist</p>
                  <p className="text-[11px] text-slate-600">{activeDoubt.suggestedTopic}</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://t.me/edparthbooks"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] flex items-center gap-1.5 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Download Notes</span>
                  </a>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3 text-slate-400">
              <HelpCircle className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-sm font-bold text-slate-700">Select any solved doubt to inspect the solution</p>
              <p className="text-xs">Or ask your own numerical problem using the search box above.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
