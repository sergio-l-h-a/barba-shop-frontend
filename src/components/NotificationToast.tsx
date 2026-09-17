import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, X, Info } from 'lucide-react';
export interface ToastProps {
  id: string;
  type?: 'success' | 'warning' | 'info';
  title: string;
  message?: string;
  onClose: (id: string) => void;
}

export const NotificationToast: React.FC<ToastProps> = ({
  id,
  type = 'success',
  title,
  message,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/95 border border-emerald-500/40 text-zinc-100 shadow-xl backdrop-blur-md animate-in slide-in-from-top-2 duration-200 min-w-[320px] max-w-md">
      {type === 'success' && (
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
      )}
      {type === 'warning' && (
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
      )}
      {type === 'info' && (
        <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
      )}

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-zinc-100">{title}</h4>
        {message && <p className="text-xs text-zinc-400 mt-0.5">{message}</p>}
      </div>

      <button
        onClick={() => onClose(id)}
        className="text-zinc-500 hover:text-zinc-300 p-1 rounded-lg transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
