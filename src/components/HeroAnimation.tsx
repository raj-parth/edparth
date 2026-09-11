import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Atom, Dna, Compass, Zap, Flame, Award, ShieldCheck, ArrowRight, BookOpen, Layers } from 'lucide-react';

interface HeroAnimationProps {
  onExploreClick: () => void;
  onLoginClick: () => void;
  onCbtClick: () => void;
}

export const HeroAnimation: React.FC<HeroAnimationProps> = ({
  onExploreClick,
  onLoginClick,
  onCbtClick
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'jee' | 'neet' | 'boards' | 'govt'>('all');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Education particles with math symbols & scientific formulas
    const symbols = ['∫', '∑', 'π', 'Δ', 'λ', 'ℏ', '⚛', 'θ', '√', 'E=mc²', 'F=ma', 'pH', 'DNA', '∞'];
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      symbol: string;
      color: string;
      alpha: number;
      rotation: number;
      vRot: number;
    }[] = [];

    const colors = ['#818cf8', '#38bdf8', '#c084fc', '#34d399', '#f472b6'];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 14 + 12,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.15,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.02
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle orbital rings in center
      ctx.save();
      ctx.translate(width / 2, height / 2.2);
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
      ctx.lineWidth = 1.5;

      const time = Date.now() * 0.001;
      for (let r = 100; r <= 380; r += 70) {
        ctx.beginPath();
        ctx.ellipse(0, 0, r, r * 0.45, time * 0.2 * (r % 2 === 0 ? 1 : -1), 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // Render floating mathematical & scientific particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;

        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
        if (p.y < -50) p.y = height + 50;
        if (p.y > height + 50) p.y = -50;

        // Mouse avoidance/attraction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.x -= (dx / dist) * 1.5;
          p.y -= (dy / dist) * 1.5;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.font = `bold ${p.size}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-12 pb-20 px-4">
      {/* Dynamic Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Atmospheric Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-cyan-500/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-fuchsia-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center">
        
        {/* Gen-Z Glowing Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-semibold mb-6 shadow-lg shadow-indigo-500/10"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Next-Gen Study Hub for Class 9-12, JEE Main/Adv, NEET UG & Govt Exams</span>
        </motion.div>

        {/* Hero Main Heading with Dynamic Gradients */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] max-w-4xl"
        >
          Master Your Exams with{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-500 drop-shadow-[0_0_35px_rgba(99,102,241,0.4)]">
            EdParth Study
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl font-medium leading-relaxed"
        >
          Hyper-realistic <span className="text-cyan-300 font-semibold">NTA-Style CBT Test Engine</span>, AI-assisted PDF paper converters, verified notes vault, and curated problem sets uploaded directly by top educators.
        </motion.p>

        {/* Target Exam Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-wrap justify-center gap-2 max-w-2xl"
        >
          {[
            { id: 'all', label: '⚡ All Categories', icon: Zap },
            { id: 'jee', label: '⚛️ JEE Main & Advanced', icon: Atom },
            { id: 'neet', label: '🧬 NEET UG (Medical)', icon: Dna },
            { id: 'boards', label: '📚 Class 9 - 12 (CBSE/ICSE)', icon: BookOpen },
            { id: 'govt', label: '🎯 Govt Exams (SSC/NDA/CUET)', icon: ShieldCheck }
          ].map((pill) => {
            const Icon = pill.icon;
            const isSelected = activeTab === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setActiveTab(pill.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25 border border-indigo-400/40 scale-105'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{pill.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
        >
          <button
            onClick={onCbtClick}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5 group cursor-pointer border border-indigo-400/30"
          >
            <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300 group-hover:rotate-12 transition-transform" />
            <span>Launch CBT Mock Test</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl glass-panel text-slate-200 hover:text-white font-semibold text-base hover:bg-slate-800/80 hover:border-indigo-500/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Explore Material Vault</span>
          </button>
        </motion.div>

        {/* Interactive 3D Feature Floating Cards Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full text-left"
        >
          {/* Card 1: CBT Simulation */}
          <div className="glass-panel glass-panel-hover p-5 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all" />
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-100 mb-1 flex items-center gap-2">
              NTA-Style CBT Engine
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">LIVE</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time timer, section palette, instant ranking analytics & step solutions.
            </p>
          </div>

          {/* Card 2: PDF to CBT Converter */}
          <div className="glass-panel glass-panel-hover p-5 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all" />
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-100 mb-1">
              PDF to CBT Converter
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload any PDF paper or test document & instantly convert it into an interactive exam.
            </p>
          </div>

          {/* Card 3: Interactive Mascot */}
          <div className="glass-panel glass-panel-hover p-5 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all" />
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-100 mb-1">
              Parth AI Study Guide
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gen-Z interactive mascot reacting to your cursor, study streak & quiz performance.
            </p>
          </div>

          {/* Card 4: Student Material Request */}
          <div className="glass-panel glass-panel-hover p-5 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all" />
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-100 mb-1">
              Request Any Material
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Need HC Verma notes, PYQs, or formula sheets? Submit a request to Admin directly.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
