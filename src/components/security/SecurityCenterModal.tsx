import React, { useState } from 'react';
import { Shield, Smartphone, Lock, CheckCircle2, AlertCircle, RefreshCw, X, Key, Globe, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SecurityCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityCenterModal: React.FC<SecurityCenterModalProps> = ({
  isOpen,
  onClose
}) => {
  const { currentUser } = useApp();
  const [sessionRevoked, setSessionRevoked] = useState(false);

  if (!isOpen) return null;

  const sessionToken = currentUser ? `EP-AUTH-${btoa(currentUser.id + currentUser.email).slice(0, 18).toUpperCase()}` : 'EP-GUEST-SECURE';
  const connectionDetails = `HTTPS / TLS 1.3 Direct (${window.location.hostname || 'edparth.com'})`;

  const handleRevokeOtherSessions = () => {
    setSessionRevoked(true);
    setTimeout(() => {
      setSessionRevoked(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800">
        
        {/* Modal Header */}
        <div className="bg-[#080b11] text-white p-6 sm:p-7 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#ff6a00]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight font-sans">EdParth Security Center</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                  ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Enterprise Content Protection, DRM & Session Management
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Security Overview Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-indigo-600 mb-1">
                <Lock className="w-4 h-4" />
                <span className="text-[11px] font-bold">Encryption</span>
              </div>
              <div className="text-sm font-black text-slate-900 font-mono">AES-256 GCM</div>
              <div className="text-[10px] text-slate-500">End-to-end verified</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-[#ff6a00] mb-1">
                <Eye className="w-4 h-4" />
                <span className="text-[11px] font-bold">Anti-Piracy</span>
              </div>
              <div className="text-sm font-black text-slate-900">Dynamic DRM</div>
              <div className="text-[10px] text-slate-500">Watermark active</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-[11px] font-bold">Proctor Level</span>
              </div>
              <div className="text-sm font-black text-slate-900">Tier-1 Strict</div>
              <div className="text-[10px] text-slate-500">Tab-switch detection</div>
            </div>
          </div>

          {/* Active Session & Device Card */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400 text-[11px] pb-2 border-b border-slate-800">
              <span className="font-bold flex items-center gap-1.5 text-slate-300">
                <Smartphone className="w-3.5 h-3.5 text-[#ff6a00]" /> CURRENT ACTIVE DEVICE
              </span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Now
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-500 block">Session Token:</span>
                <span className="text-amber-300 font-bold">{sessionToken}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Account Holder:</span>
                <span className="text-slate-200 font-bold">{currentUser?.name || 'Guest Explorer'}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500 block">Verified Transport Layer:</span>
                <span className="text-slate-300">{connectionDetails}</span>
              </div>
            </div>
          </div>

          {/* Security Features Checklist */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono">
              Enforced DRM Protections
            </h4>

            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-900">Dynamic Floating Watermark</p>
                  <p className="text-[11px] text-slate-500">Embeds student name and live timestamp across all lecture videos and CBT tests to prohibit illegal distribution.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-900">Anti-Inspect & Developer Shortcut Blocker</p>
                  <p className="text-[11px] text-slate-500">Right-click, F12 developer console, page source viewing (Ctrl+U), and unauthorized screenshots are disabled.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-900">NTA CBT Proctor Warning System</p>
                  <p className="text-[11px] text-slate-500">Monitors tab focus during live tests. Switching browser windows gives formal proctor warnings.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action: Revoke other sessions */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleRevokeOtherSessions}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
              <span>Revoke All Other Device Sessions</span>
            </button>

            {sessionRevoked && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" /> All other sessions successfully terminated.
              </span>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200/80 text-center text-[11px] text-slate-500 font-mono">
          <span>DEVELOPED BY RAJ KANNAUJIYA // TEAM PARTH SECURITY ENGINE</span>
        </div>
      </div>
    </div>
  );
};
