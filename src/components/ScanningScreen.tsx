import { ScanState } from '../types';
import { Loader2, FolderOpen, FileSearch, GitCompare } from 'lucide-react';

interface ScanningScreenProps {
  scanState: ScanState;
}

export default function ScanningScreen({ scanState }: ScanningScreenProps) {
  const phaseText = () => {
    switch (scanState.phase) {
      case 'same_folder': return 'فحص نفس المجلد';
      case 'cross_folder': return 'فحص بين المجلدات';
      case 'comparing': return 'مقارنة الملفات';
      case 'complete': return 'اكتمل الفحص';
      default: return 'جاري التحضير...';
    }
  };

  const phaseIcon = () => {
    switch (scanState.phase) {
      case 'same_folder': return <FolderOpen className="w-5 h-5 text-primary-500" />;
      case 'cross_folder': return <FileSearch className="w-5 h-5 text-primary-500" />;
      case 'comparing': return <GitCompare className="w-5 h-5 text-primary-500" />;
      default: return <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />;
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-lg w-full space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-100 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
          </div>
          <h2 className="text-xl font-bold text-surface-800">جاري الفحص...</h2>
          <p className="text-sm text-surface-500">يرجى الانتظار بينما يتم فحص ملفاتك</p>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-surface-700">{phaseText()}</span>
            <span className="text-sm font-bold text-primary-600">{Math.round(scanState.progress)}%</span>
          </div>
          <div className="h-3 rounded-full bg-surface-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-l from-primary-500 to-primary-400 transition-all duration-300 ease-out"
              style={{ width: `${scanState.progress}%` }}
            />
          </div>
        </div>

        {/* Phase indicator */}
        <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-surface-50 border border-surface-200">
          {phaseIcon()}
          <span className="text-sm text-surface-600">{phaseText()}</span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="ملفات تم فحصها" value={scanState.filesScanned.toLocaleString('ar-SA')} total={scanState.totalFiles.toLocaleString('ar-SA')} />
          <StatCard label="نسخ مكررة" value={scanState.duplicatesFound.toLocaleString('ar-SA')} />
          <StatCard label="الوقت المتبقي" value={scanState.estimatedTime || '...'} />
          <StatCard label="المجلد الحالي" value={scanState.currentFolder ? scanState.currentFolder.split('\\').pop() || '' : '...'} small />
        </div>

        {/* Phase steps */}
        <div className="space-y-2">
          <PhaseStep label="فحص نفس المجلد" active={scanState.phase === 'same_folder'} done={scanState.progress > 40} />
          <PhaseStep label="فحص بين المجلدات" active={scanState.phase === 'cross_folder'} done={scanState.progress > 80} />
          <PhaseStep label="مقارنة الملفات" active={scanState.phase === 'comparing'} done={scanState.progress >= 100} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, total, small }: { label: string; value: string; total?: string; small?: boolean }) {
  return (
    <div className="p-3 rounded-lg bg-white border border-surface-200 shadow-sm">
      <p className="text-xs text-surface-500 mb-1">{label}</p>
      <p className={`font-bold text-surface-800 ${small ? 'text-xs truncate' : 'text-lg'}`}>{value}</p>
      {total && <p className="text-xs text-surface-400">من {total}</p>}
    </div>
  );
}

function PhaseStep({ label, active, done }: { label: string; active: boolean; done: boolean }) {
  return (
    <div className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
      active ? 'bg-primary-50 border border-primary-200' : done ? 'bg-green-50 border border-green-200' : 'bg-surface-50 border border-surface-200'
    }`}>
      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
        done ? 'bg-green-500 text-white' : active ? 'bg-primary-500 text-white' : 'bg-surface-300 text-white'
      }`}>
        {done ? '✓' : active ? <Loader2 className="w-3 h-3 animate-spin" /> : <span className="text-xs">•</span>}
      </div>
      <span className={`text-xs font-medium ${active ? 'text-primary-700' : done ? 'text-green-700' : 'text-surface-500'}`}>{label}</span>
    </div>
  );
}
