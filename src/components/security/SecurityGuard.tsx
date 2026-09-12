import React, { useEffect, useState } from 'react';
import { Shield, AlertTriangle, Lock, EyeOff } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface SecurityAlert {
  id: string;
  message: string;
  type: 'drm' | 'shortcut' | 'proctor';
}

export const SecurityGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);

  const triggerSecurityAlert = (message: string, type: 'drm' | 'shortcut' | 'proctor' = 'drm') => {
    const newAlert: SecurityAlert = {
      id: `alert_${Date.now()}`,
      message,
      type
    };
    setAlerts(prev => [...prev.slice(-2), newAlert]);

    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a.id !== newAlert.id));
    }, 3800);
  };

  useEffect(() => {
    // 1. Right Click Prevention (whitelisting form inputs/textareas)
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
         target.tagName === 'TEXTAREA' ||
         target.isContentEditable ||
         target.closest('input, textarea, [contenteditable="true"]'))
      ) {
        return; // Permit context menu for copy, paste, and text selection in inputs
      }

      e.preventDefault();
      triggerSecurityAlert(
        'EdParth DRM Protection: Right-click is disabled to protect proprietary study material & question papers.',
        'drm'
      );
    };

    // 2. DevTools & Capture Shortcut Interception
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 key
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        triggerSecurityAlert('DevTools Inspection Shortcut (F12) has been restricted by security policy.', 'shortcut');
        return;
      }

      // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        triggerSecurityAlert('Source Code Inspector shortcuts are blocked on EdParth secure portal.', 'shortcut');
        return;
      }

      // Ctrl+U (View Source)
      if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        triggerSecurityAlert('Page Source Viewing (Ctrl+U) is restricted on protected educational materials.', 'shortcut');
        return;
      }

      // Ctrl+S (Save Page)
      if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        triggerSecurityAlert('Direct Page saving is disabled. Use the official in-app download vault for verified PDFs.', 'shortcut');
        return;
      }

      // PrintScreen / Screenshot key warning
      if (e.key === 'PrintScreen') {
        triggerSecurityAlert('Screen capture key detected. User identity watermark is permanently embedded in the content.', 'proctor');
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      {children}

      {/* Floating Security Alert Toasts */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-md pointer-events-none">
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto bg-[#080b11]/95 text-slate-100 border border-amber-500/40 shadow-2xl backdrop-blur-md rounded-2xl p-4 flex items-start gap-3.5"
            >
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 mt-0.5 border border-amber-500/20">
                {alert.type === 'drm' && <Shield className="w-5 h-5 text-[#ff6a00]" />}
                {alert.type === 'shortcut' && <Lock className="w-5 h-5 text-amber-400" />}
                {alert.type === 'proctor' && <EyeOff className="w-5 h-5 text-red-400" />}
              </div>

              <div className="space-y-1 text-left flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 font-mono">
                    SECURITY POLICY ENFORCED
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">256-BIT DRM</span>
                </div>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  {alert.message}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};
