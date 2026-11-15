import { ScanFolder, ScanSettings } from '../types';
import { FolderOpen, Plus, Search, Image, FileText, Music, Video, Play } from 'lucide-react';

interface WelcomeScreenProps {
  folders: ScanFolder[];
  setFolders: (f: ScanFolder[]) => void;
  scanSettings: ScanSettings;
  setScanSettings: (s: ScanSettings) => void;
  onStartScan: () => void;
  onAddFolder: () => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
}

export default function WelcomeScreen({ folders, onStartScan, onAddFolder }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8 animate-fade-in">
        {/* Hero */}
        <div className="text-center space-y-3">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-200">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 7h-9" /><path d="M14 17H5" />
              <circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-surface-800">مرحباً بك في منظّف النسخ الذكي</h1>
          <p className="text-surface-500 text-sm">ابحث عن الملفات المكررة والمتشابهة بأمان وكفاءة</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StepCard
            step={1}
            icon={<FolderOpen className="w-6 h-6 text-primary-600" />}
            title="أضف المجلدات"
            desc="اسحب المجلدات أو تصفح لتحديد مواقع الفحص"
            action={
              <button
                onClick={onAddFolder}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                إضافة مجلد
              </button>
            }
          />
          <StepCard
            step={2}
            icon={<Search className="w-6 h-6 text-primary-600" />}
            title="اختر نوع المقارنة"
            desc="نسخ مطابقة تماماً أو ملفات متشابهة بصرياً أو صوتياً"
            action={
              <div className="flex gap-1.5">
                <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs"><Image className="w-3 h-3" /> صور</span>
                <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 text-amber-700 text-xs"><FileText className="w-3 h-3" /> مستندات</span>
                <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-purple-50 text-purple-700 text-xs"><Music className="w-3 h-3" /> صوت</span>
                <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-rose-50 text-rose-700 text-xs"><Video className="w-3 h-3" /> فيديو</span>
              </div>
            }
          />
          <StepCard
            step={3}
            icon={<Play className="w-6 h-6 text-primary-600" />}
            title="ابدأ الفحص"
            desc="راجع النتائج وقارن الملفات ثم احذف بأمان"
            action={
              <button
                onClick={onStartScan}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-sm"
              >
                <Play className="w-3.5 h-3.5" />
                بدء الفحص
              </button>
            }
          />
        </div>

        {/* Current folders */}
        {folders.filter(f => f.enabled).length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-surface-600">المجلدات المحددة للفحص</h3>
            <div className="space-y-1.5">
              {folders.filter(f => f.enabled).map(folder => (
                <div key={folder.id} className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-surface-200 shadow-sm">
                  <FolderOpen className="w-4 h-4 text-primary-600" />
                  <div>
                    <p className="text-sm font-medium text-surface-700">{folder.name}</p>
                    <p className="text-xs text-surface-400" dir="ltr">{folder.path}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick info */}
        <div className="bg-gradient-to-r from-primary-50 to-teal-50 rounded-xl p-4 border border-primary-100">
          <h3 className="text-sm font-semibold text-primary-800 mb-2">💡 ميزة المقارنة عبر الامتدادات</h3>
          <p className="text-xs text-primary-700 leading-relaxed">
            يمكن للبرنامج اكتشاف أن photo.jpg و photo.png و photo.webp هي نفس الصورة، 
            أو أن voice.mp3 و voice.m4a هو نفس التسجيل، حتى لو اختلفت الصيغ.
            يتم ذلك بمقارنة المحتوى الفعلي وليس الامتداد.
          </p>
        </div>
      </div>
    </div>
  );
}

function StepCard({ step, icon, title, desc, action }: { step: number; icon: React.ReactNode; title: string; desc: string; action: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-surface-200 p-4 space-y-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center">{step}</span>
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-surface-800">{title}</h3>
      <p className="text-xs text-surface-500 leading-relaxed">{desc}</p>
      <div>{action}</div>
    </div>
  );
}
