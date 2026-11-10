import React from 'react';
import { Check } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
}

export const Toast: React.FC<ToastProps> = ({ toasts }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-black text-white px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 border border-gray-800 transition-all duration-300 transform translate-y-0"
          style={{ fontSize: 'var(--body)' }}
        >
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Check size={13} strokeWidth={2.5} />
          </div>
          <span className="font-jakarta text-xs tracking-wide">{toast.text}</span>
        </div>
      ))}
    </div>
  );
};
