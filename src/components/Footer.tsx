import React from 'react';
import { Send, ExternalLink, BookOpen, Sparkles } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white text-slate-600">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        
        {/* Top Row: Brand & Description */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-100">
          
          <div className="md:col-span-2 space-y-3">
            <Logo size="md" showSubtitle={false} />
            <p className="text-xs text-slate-500 leading-relaxed max-w-md font-medium">
              <strong className="text-slate-900">EdParth</strong> is India's dedicated preparation platform for Class 9 to 12 CBSE/ICSE, JEE Main & Advanced, NEET UG, and Competitive Government examinations. Featuring authentic NTA CBT mock test simulations, verified PDF chapter notes, and student community discussions.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 font-mono">
              Exam Modules
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500 font-medium">
              <li>• JEE Main & Advanced Mock CBTs</li>
              <li>• NEET UG Medical Chapter Sprints</li>
              <li>• Class 9 - 12 Board Solutions</li>
              <li>• Govt Exams (SSC, NDA, CUET)</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 font-mono">
              Connect & Community
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a
                  href="https://t.me/edparthbooks"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sky-600 hover:text-sky-700 font-bold"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram: @edparthbooks</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/rajvqx"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-pink-600 hover:text-pink-700 font-bold"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram: @rajvqx</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Clean Developer & Team Attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-900">EdParth</strong>. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold">
              Developer: <strong className="text-indigo-600 font-extrabold">RAJ KANNAUJIYA</strong>
            </span>

            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold">
              Team: <strong className="text-slate-900 font-extrabold">TEAM PARTH</strong>
            </span>

            <a
              href="https://instagram.com/rajvqx"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-pink-600 font-bold flex items-center gap-1.5 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current text-pink-600" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>@rajvqx</span>
            </a>

            <a
              href="https://t.me/edparthbooks"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-sky-600 font-bold flex items-center gap-1 transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-sky-600" />
              <span>Telegram Channel</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

