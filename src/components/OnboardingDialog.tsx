import { useState } from 'react';
import { X, Search, Shield, Trash2 } from 'lucide-react';

interface OnboardingDialogProps {
  onClose: () => void;
  darkMode: boolean;
}

export default function OnboardingDialog({ onClose, darkMode }: OnboardingDialogProps) {
  const [step, setStep] = useState(0);
  const bg = darkMode ? 'bg-surface-800' : 'bg-white';
  const text = darkMode ? 'text-surface-200' : 'text-surface-700';
  const textMuted = darkMode ? 'text-surface-400' : 'text-surface-500';

  const cards = [
    {
      icon: <Search className="w-10 h-10 text-primary-600" />,
      title: 'الفحص الذكي',
      desc: 'يفحص البرنامج ملفاتك ويجمع المكررة والمتشابهة في مجموعات واضحة. يدعم المقارنة عبر امتدادات مختلفة (مثل JPG و PNG).',
      color: 'from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-900/10',
    },
    {
      icon: <Shield className="w-10 h-10 text-blue-600" />,
      title: 'الملف المرجعي المحمي',
      desc: 'يحمي البرنامج ملفاً واحداً في كل مجموعة كمرجع. لا يمكن حذفه إلا بتأكيد مزدوج، ولا يمكن إفراغ المجموعة بالكامل.',
      color: 'from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-900/10',
    },
    {
      icon: <Trash2 className="w-10 h-10 text-green-600" />,
      title: 'الحذف الآمن',
      desc: 'يُنقل الحذف إلى سلة المحذوفات وليس الحذف النهائي. يمكنك التراجع في أي وقت، مع سجل كامل لكل العمليات.',
      color: 'from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-900/10',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className={`w-full max-w-md rounded-2xl ${bg} shadow-2xl overflow-hidden`}>
        {/* Skip button */}
        <div className="flex justify-start p-3">
          <button
            onClick={onClose}
            className={`text-xs ${textMuted} hover:text-surface-700 dark:hover:text-surface-200 transition-colors`}
          >
            تخطي
          </button>
        </div>

        {/* Card content */}
        <div className="px-8 pb-6 space-y-6">
          <div className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br ${cards[step].color} flex items-center justify-center`}>
            {cards[step].icon}
          </div>

          <div className="text-center space-y-2">
            <h2 className={`text-xl font-bold ${text}`}>{cards[step].title}</h2>
            <p className={`text-sm leading-relaxed ${textMuted}`}>{cards[step].desc}</p>
          </div>

          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2">
            {cards.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === step ? 'w-6 bg-primary-500' : 'w-2 bg-surface-300 dark:bg-surface-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className={`flex items-center gap-3 p-4 border-t ${darkMode ? 'border-surface-700' : 'border-surface-200'}`}>
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                darkMode ? 'border-surface-600 text-surface-300 hover:bg-surface-700' : 'border-surface-300 text-surface-600 hover:bg-surface-50'
              }`}
            >
              السابق
            </button>
          )}
          {step < cards.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-sm"
            >
              التالي
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-sm"
            >
              ابدأ الاستخدام
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
