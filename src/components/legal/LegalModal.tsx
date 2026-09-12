import React, { useState } from 'react';
import { Shield, FileText, AlertCircle, Mail, X, CheckCircle2 } from 'lucide-react';

export type LegalTab = 'privacy' | 'terms' | 'disclaimer' | 'contact';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTab;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy'
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-[#ff6a00]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight">
                EdParth Legal & Compliance Portal
              </h3>
              <p className="text-xs text-slate-400">
                Official policies, terms of service, disclaimers, and contact details
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2 overflow-x-auto shrink-0 gap-2">
          {[
            { id: 'privacy' as LegalTab, label: 'Privacy Policy', icon: Shield },
            { id: 'terms' as LegalTab, label: 'Terms of Service', icon: FileText },
            { id: 'disclaimer' as LegalTab, label: 'Disclaimer', icon: AlertCircle },
            { id: 'contact' as LegalTab, label: 'Contact & Support', icon: Mail }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
                  isActive
                    ? 'border-[#ff6a00] text-slate-900 bg-white font-extrabold shadow-xs'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#ff6a00]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-left text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
          
          {/* PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-black text-slate-900 mb-1">Privacy Policy</h4>
                <p className="text-xs text-slate-500 font-mono">Last Updated: September 2026</p>
              </div>

              <div className="space-y-3">
                <p>
                  EdParth respects your privacy and is committed to protecting student personal data in accordance with the Information Technology Act, 2000 and applicable digital privacy regulations.
                </p>

                <h5 className="font-extrabold text-slate-900 pt-2">1. Information Collection & Usage</h5>
                <p>
                  We only store essential learner profiles (student name, academic stream, grade, and test history) locally on your device using client-side browser storage, or on secure cloud endpoints when authenticating. We do not sell, rent, or lease personal information to third-party marketing companies.
                </p>

                <h5 className="font-extrabold text-slate-900 pt-2">2. Local Storage & Telemetry</h5>
                <p>
                  To provide offline study continuity and exam state preservation, EdParth utilizes your browser’s local storage. Anonymous site visit analytics may be processed via Google Analytics 4 to improve platform performance.
                </p>

                <h5 className="font-extrabold text-slate-900 pt-2">3. Content Protection & Watermarking</h5>
                <p>
                  To prevent unauthorized piracy of proprietary learning materials, practice tests and study materials may display your registered identifier as a transparent session watermark during active learning sessions.
                </p>

                <h5 className="font-extrabold text-slate-900 pt-2">4. Your Data Rights</h5>
                <p>
                  You can clear your student profile, reset exam records, or request account removal at any time by contacting our privacy officer at <strong className="text-slate-900">support@edparth.com</strong>.
                </p>
              </div>
            </div>
          )}

          {/* TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-black text-slate-900 mb-1">Terms of Service</h4>
                <p className="text-xs text-slate-500 font-mono">Effective: September 2026</p>
              </div>

              <div className="space-y-3">
                <p>
                  By accessing or utilizing EdParth, you agree to comply with and be bound by the following conditions of use:
                </p>

                <h5 className="font-extrabold text-slate-900 pt-2">1. Educational Fair Use</h5>
                <p>
                  All study materials, mock questions, solutions, and lecture videos hosted on or linked from EdParth are provided solely for non-commercial, individual student learning and examination preparation.
                </p>

                <h5 className="font-extrabold text-slate-900 pt-2">2. Anti-Piracy & DRM Integrity</h5>
                <p>
                  Users agree not to systematically scrape, reproduce, reverse engineer, or redistribute questions, solution sets, or video assets without express written consent from EdParth. Attempting to circumvent portal security controls or exam proctoring timers is strictly prohibited.
                </p>

                <h5 className="font-extrabold text-slate-900 pt-2">3. Account Integrity & Academic Honesty</h5>
                <p>
                  Students participating in Computer-Based Test (CBT) mock simulations must observe academic integrity. Simulated percentile calculations and exam scores reflect independent student performance.
                </p>
              </div>
            </div>
          )}

          {/* DISCLAIMER */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-black text-slate-900 mb-1">Disclaimer & Non-Affiliation Notice</h4>
                <p className="text-xs text-slate-500 font-mono">Public Information Notice</p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs">
                  <strong>Important Notice:</strong> EdParth is an independent, community-driven educational initiative created by Raj Kannaujiya and Team Parth.
                </div>

                <p>
                  EdParth is not affiliated with, authorized, endorsed by, or officially associated with the National Testing Agency (NTA), the Central Board of Secondary Education (CBSE), the Indian Institutes of Technology (IITs), or any government examination authority.
                </p>

                <p>
                  Exam names such as "JEE Main", "JEE Advanced", "NEET UG", "NDA", and "CUET" are registered trademarks of their respective governing boards. References to these examinations are made solely for descriptive, educational curriculum orientation and student preparation purposes.
                </p>

                <p>
                  While we strive to maintain complete accuracy in all questions, formulas, and solutions, EdParth provides learning resources on an "as is" basis without warranties of any kind.
                </p>
              </div>
            </div>
          )}

          {/* CONTACT & SUPPORT */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-black text-slate-900 mb-1">Contact & Academic Support</h4>
                <p className="text-xs text-slate-500">Reach the EdParth administrative and faculty team</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
                    <Mail className="w-4 h-4" />
                    <span>Official Email Support</span>
                  </div>
                  <p className="text-xs text-slate-800 font-bold">support@edparth.com</p>
                  <p className="text-[11px] text-slate-500">For platform queries, doubt escalations, and feedback</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-sky-600 font-bold text-xs">
                    <Shield className="w-4 h-4" />
                    <span>Telegram Community Vault</span>
                  </div>
                  <a
                    href="https://t.me/edparthbooks"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-sky-600 font-bold hover:underline block"
                  >
                    @edparthbooks
                  </a>
                  <p className="text-[11px] text-slate-500">Official Telegram channel for daily PDFs & updates</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 mt-4">
                <div className="text-xs font-mono font-bold text-slate-400 uppercase">Platform Leadership</div>
                <div className="text-xs sm:text-sm text-slate-200">
                  Developed & Maintained by <strong className="text-white">Raj Kannaujiya</strong> with <strong className="text-[#ff6a00]">Team Parth</strong>.
                </div>
                <p className="text-[11px] text-slate-400">
                  Committed to delivering high-caliber, equitable education and computer-based test simulation for every student in India.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Compliant with Indian Digital Information Standards</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
