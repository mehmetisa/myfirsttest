import { useState } from 'react';
import { X, FolderOpen, Copy, ArrowRightLeft, Check, AlertCircle } from 'lucide-react';

interface MoveCopyDialogProps {
  onClose: () => void;
  onComplete: () => void;
  darkMode: boolean;
}

export default function MoveCopyDialog({ onClose, onComplete, darkMode }: MoveCopyDialogProps) {
  const [operation, setOperation] = useState<'copy' | 'move'>('copy');
  const [destination, setDestination] = useState<'single' | 'perType'>('single');
  const [conflict, setConflict] = useState<'skip' | 'rename' | 'replace' | 'ask'>('rename');
  const [preserveStructure, setPreserveStructure] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const bg = darkMode ? 'bg-surface-800' : 'bg-white';
  const text = darkMode ? 'text-surface-200' : 'text-surface-700';
  const textMuted = darkMode ? 'text-surface-400' : 'text-surface-500';

  const handleStart = () => {
    setIsProcessing(true);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setIsProcessing(false);
        setCompleted(true);
      }
      setProgress(p);
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className={`w-full max-w-lg rounded-2xl ${bg} shadow-2xl overflow-hidden max-h-[90vh] flex flex-col`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-surface-700' : 'border-surface-200'}`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
              <ArrowRightLeft className="w-4 h-4 text-primary-600" />
            </div>
            <h3 className={`text-base font-bold ${text}`}>نقل/نسخ الملفات المتبقية</h3>
          </div>
          <button onClick={onClose} className={`p-1 rounded-lg ${darkMode ? 'hover:bg-surface-700' : 'hover:bg-surface-100'}`}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {!completed ? (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Operation */}
            <div className="space-y-2">
              <label className={`text-sm font-medium ${text}`}>العملية</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setOperation('copy')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium border-2 transition-colors ${
                    operation === 'copy'
                      ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20'
                      : darkMode ? 'border-surface-600 text-surface-400 hover:border-surface-500' : 'border-surface-200 text-surface-500 hover:border-surface-300'
                  }`}
                >
                  <Copy className="w-4 h-4" /> نسخ
                </button>
                <button
                  onClick={() => setOperation('move')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium border-2 transition-colors ${
                    operation === 'move'
                      ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20'
                      : darkMode ? 'border-surface-600 text-surface-400 hover:border-surface-500' : 'border-surface-200 text-surface-500 hover:border-surface-300'
                  }`}
                >
                  <ArrowRightLeft className="w-4 h-4" /> نقل
                </button>
              </div>
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <label className={`text-sm font-medium ${text}`}>الوجهة</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setDestination('single')}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                    destination === 'single'
                      ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20'
                      : darkMode ? 'border-surface-600 text-surface-400' : 'border-surface-200 text-surface-500'
                  }`}
                >
                  مجلد واحد
                </button>
                <button
                  onClick={() => setDestination('perType')}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                    destination === 'perType'
                      ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20'
                      : darkMode ? 'border-surface-600 text-surface-400' : 'border-surface-200 text-surface-500'
                  }`}
                >
                  حسب النوع
                </button>
              </div>
              <div className={`flex items-center gap-2 p-2.5 rounded-lg border ${darkMode ? 'border-surface-600 bg-surface-750' : 'border-surface-200 bg-surface-50'}`}>
                <FolderOpen className="w-4 h-4 text-primary-600" />
                <span className={`text-xs ${textMuted}`} dir="ltr">
                  {destination === 'single' ? 'C:\\Users\\أحمد\\Desktop\\النسخ_الأصلية' : 'C:\\Users\\أحمد\\Desktop\\النسخ_الأصلية\\{صور, مستندات, ...}'}
                </span>
              </div>
            </div>

            {/* Conflict handling */}
            <div className="space-y-2">
              <label className={`text-sm font-medium ${text}`}>عند التعارض (ملف بنفس الاسم موجود)</label>
              <select
                value={conflict}
                onChange={(e) => setConflict(e.target.value as typeof conflict)}
                className={`w-full py-2 px-3 rounded-lg text-sm border ${darkMode ? 'bg-surface-700 border-surface-600 text-surface-200' : 'bg-white border-surface-200 text-surface-700'}`}
              >
                <option value="skip">تخطي الملف</option>
                <option value="rename">إعادة تسمية تلقائية</option>
                <option value="replace">استبدال الملف الموجود</option>
                <option value="ask">السؤال لكل ملف</option>
              </select>
            </div>

            {/* Structure */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={preserveStructure}
                onChange={(e) => setPreserveStructure(e.target.checked)}
                className="w-4 h-4 rounded accent-primary-600"
              />
              <span className={`text-sm ${text}`}>الحفاظ على بنية المجلدات الأصلية</span>
            </label>

            {/* Progress */}
            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className={`text-xs ${textMuted}`}>جاري التنفيذ...</span>
                  <span className="text-xs font-bold text-primary-600">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 rounded-full bg-surface-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary-500 transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Completion summary */
          <div className="flex-1 p-6 flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className={`text-lg font-bold ${text}`}>تمت العملية بنجاح!</h3>
            <div className={`w-full rounded-xl p-4 space-y-2 ${darkMode ? 'bg-surface-750' : 'bg-surface-50'}`}>
              <div className="flex justify-between">
                <span className={`text-sm ${textMuted}`}>تم {operation === 'copy' ? 'نسخ' : 'نقل'}</span>
                <span className={`text-sm font-bold ${text}`}>8 ملفات</span>
              </div>
              <div className="flex justify-between">
                <span className={`text-sm ${textMuted}`}>تم تخطيها</span>
                <span className={`text-sm font-bold ${text}`}>0</span>
              </div>
              <div className="flex justify-between">
                <span className={`text-sm ${textMuted}`}>أخطاء</span>
                <span className="text-sm font-bold text-green-600">0</span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className={`flex items-center gap-3 p-4 border-t ${darkMode ? 'border-surface-700' : 'border-surface-200'}`}>
          {completed ? (
            <button
              onClick={onComplete}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            >
              تم
            </button>
          ) : (
            <>
              <button
                onClick={onClose}
                disabled={isProcessing}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors disabled:opacity-50 ${
                  darkMode ? 'border-surface-600 text-surface-300 hover:bg-surface-700' : 'border-surface-300 text-surface-600 hover:bg-surface-50'
                }`}
              >
                إلغاء
              </button>
              <button
                onClick={handleStart}
                disabled={isProcessing}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-sm disabled:opacity-50"
              >
                {isProcessing ? 'جاري التنفيذ...' : `بدء ${operation === 'copy' ? 'النسخ' : 'النقل'}`}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
