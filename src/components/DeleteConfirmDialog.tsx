import { DuplicateGroup } from '../types';
import { formatFileSize } from '../data/mockData';
import { AlertTriangle, Shield, Trash2, X } from 'lucide-react';

interface DeleteConfirmDialogProps {
  groups: DuplicateGroup[];
  onConfirm: () => void;
  onCancel: () => void;
  darkMode: boolean;
}

export default function DeleteConfirmDialog({ groups, onConfirm, onCancel, darkMode }: DeleteConfirmDialogProps) {
  const selectedFiles = groups.flatMap(g => g.files.filter(f => f.isSelected));
  const totalSize = selectedFiles.reduce((sum, f) => sum + f.size, 0);
  const hasMixedFormats = selectedFiles.length > 0 && new Set(selectedFiles.map(f => f.extension)).size > 1;
  const hasReferences = selectedFiles.some(f => f.isReference);

  const bg = darkMode ? 'bg-surface-800' : 'bg-white';
  const text = darkMode ? 'text-surface-200' : 'text-surface-700';
  const textMuted = darkMode ? 'text-surface-400' : 'text-surface-500';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className={`w-full max-w-md rounded-2xl ${bg} shadow-2xl overflow-hidden`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-surface-200 dark:border-surface-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
              <Trash2 className="w-4 h-4 text-red-600" />
            </div>
            <h3 className={`text-base font-bold ${text}`}>تأكيد الحذف الآمن</h3>
          </div>
          <button onClick={onCancel} className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <p className={`text-sm ${textMuted}`}>
            سيتم نقل الملفات المحددة إلى <strong>سلة المحذوفات</strong> (وليس الحذف النهائي).
          </p>

          {/* Summary */}
          <div className={`rounded-xl p-4 space-y-2 ${darkMode ? 'bg-surface-750' : 'bg-surface-50'} border ${darkMode ? 'border-surface-700' : 'border-surface-200'}`}>
            <div className="flex justify-between">
              <span className={`text-sm ${textMuted}`}>عدد الملفات</span>
              <span className={`text-sm font-bold ${text}`}>{selectedFiles.length} ملف</span>
            </div>
            <div className="flex justify-between">
              <span className={`text-sm ${textMuted}`}>المساحة المستردة</span>
              <span className="text-sm font-bold text-primary-600">{formatFileSize(totalSize)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${textMuted}`}>الملف المرجعي</span>
              <span className="flex items-center gap-1 text-sm text-green-600 font-medium">
                <Shield className="w-3.5 h-3.5" /> محمي
              </span>
            </div>
          </div>

          {/* Warnings */}
          {hasMixedFormats && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-800 dark:text-amber-300">
                <strong>تحذير:</strong> بعض الملفات بصيغ مختلفة. تأكد من مراجعة الملفات قبل الحذف.
              </p>
            </div>
          )}

          {hasReferences && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800">
              <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-red-800 dark:text-red-300">
                <strong>تنبيه:</strong> لا يمكن حذف الملفات المرجعية. سيتم تجاهلها تلقائياً.
              </p>
            </div>
          )}

          {/* Safety note */}
          <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800">
            <Shield className="w-4 h-4 text-green-600" />
            <p className="text-xs text-green-700 dark:text-green-300">
              الحذف آمن — الملفات تذهب لسلة المحذوفات ويمكن استعادتها
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className={`flex items-center gap-3 p-4 border-t ${darkMode ? 'border-surface-700' : 'border-surface-200'}`}>
          <button
            onClick={onCancel}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
              darkMode ? 'border-surface-600 text-surface-300 hover:bg-surface-700' : 'border-surface-300 text-surface-600 hover:bg-surface-50'
            }`}
          >
            إلغاء
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm"
          >
            تأكيد الحذف
          </button>
        </div>
      </div>
    </div>
  );
}
