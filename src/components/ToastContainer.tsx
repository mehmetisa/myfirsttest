import { Toast } from '../types';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info, RotateCcw } from 'lucide-react';

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export default function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-4 z-50 space-y-2 max-w-sm">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const getIcon = () => {
    switch (toast.type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'info': return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const getBg = () => {
    switch (toast.type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-amber-50 border-amber-200';
      case 'error': return 'bg-red-50 border-red-200';
      case 'info': return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border shadow-lg ${getBg()} animate-slide-left`}>
      {getIcon()}
      <p className="flex-1 text-sm text-surface-700">{toast.message}</p>
      {toast.action && (
        <button
          onClick={() => { toast.onAction?.(); onRemove(toast.id); }}
          className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-white border border-surface-200 text-primary-700 hover:bg-primary-50 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          {toast.action}
        </button>
      )}
      <button
        onClick={() => onRemove(toast.id)}
        className="p-0.5 rounded hover:bg-surface-200 transition-colors"
      >
        <X className="w-3.5 h-3.5 text-surface-400" />
      </button>
    </div>
  );
}
