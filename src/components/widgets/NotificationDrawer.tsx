import React from 'react';
import { Bell, X, CheckCheck, Trash2, Zap, Play, Shield, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose
}) => {
  const { notifications, markNotificationAsRead, clearAllNotifications } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#080b11] text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#ff6a00]">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Notifications</h3>
              <p className="text-[10px] text-slate-400">Exam schedules, DPP drops & security</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                title="Clear all notifications"
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-20 text-slate-400 space-y-2">
              <Bell className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs font-bold text-slate-600">No new notifications</p>
              <p className="text-[11px]">You're all caught up with exams & lectures.</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markNotificationAsRead(n.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left space-y-1.5 relative ${
                  n.isRead
                    ? 'bg-slate-50 border-slate-200/80 opacity-80'
                    : 'bg-white border-slate-200 shadow-sm ring-1 ring-indigo-100'
                }`}
              >
                {!n.isRead && (
                  <span className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-[#ff6a00]" />
                )}

                <div className="flex items-center gap-2">
                  {n.type === 'test' && <Zap className="w-3.5 h-3.5 text-indigo-600" />}
                  {n.type === 'lecture' && <Play className="w-3.5 h-3.5 text-[#ff6a00]" />}
                  {n.type === 'security' && <Shield className="w-3.5 h-3.5 text-emerald-600" />}
                  {n.type === 'system' && <Info className="w-3.5 h-3.5 text-slate-600" />}
                  
                  <span className="text-xs font-bold text-slate-900">{n.title}</span>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed font-normal">{n.message}</p>
                <div className="text-[10px] text-slate-400 font-mono pt-1">{n.time}</div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[10px] text-slate-500 font-mono">
          EDPARTH NOTIFICATION ENGINE // LIVE
        </div>
      </div>
    </div>
  );
};
