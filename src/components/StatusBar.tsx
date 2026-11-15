import { AppScreen, DuplicateGroup, ScanState } from '../types';
import { formatFileSize } from '../data/mockData';
import { HardDrive, Files, FolderSearch, Activity } from 'lucide-react';

interface StatusBarProps {
  screen: AppScreen;
  scanState: ScanState;
  groups: DuplicateGroup[];
  darkMode: boolean;
}

export default function StatusBar({ screen, scanState, groups, darkMode }: StatusBarProps) {
  const bg = darkMode ? 'bg-surface-800 border-surface-700' : 'bg-white border-surface-200';
  const text = darkMode ? 'text-surface-300' : 'text-surface-600';

  const totalReclaimable = groups.reduce((sum, g) => sum + g.reclaimableSize, 0);
  const totalFiles = groups.reduce((sum, g) => sum + g.files.length, 0);

  return (
    <footer className={`h-8 flex items-center px-4 border-t ${bg} gap-4`}>
      {/* Status indicator */}
      <div className="flex items-center gap-2">
        {screen === 'scanning' ? (
          <>
            <Activity className="w-3.5 h-3.5 text-primary-500 animate-pulse" />
            <span className={`text-xs ${text}`}>جاري الفحص... {Math.round(scanState.progress)}%</span>
          </>
        ) : screen === 'results' ? (
          <>
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className={`text-xs ${text}`}>اكتمل الفحص</span>
          </>
        ) : (
          <>
            <div className="w-2 h-2 rounded-full bg-surface-400" />
            <span className={`text-xs ${text}`}>جاهز</span>
          </>
        )}
      </div>

      <div className="h-3 w-px bg-surface-300" />

      {/* Stats */}
      {screen === 'results' && (
        <>
          <div className="flex items-center gap-1.5">
            <Files className="w-3.5 h-3.5 text-surface-400" />
            <span className={`text-xs ${text}`}>{totalFiles} ملف مكرر</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FolderSearch className="w-3.5 h-3.5 text-surface-400" />
            <span className={`text-xs ${text}`}>{groups.length} مجموعة</span>
          </div>
          <div className="flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-primary-500" />
            <span className="text-xs font-medium text-primary-600">{formatFileSize(totalReclaimable)} قابل للاسترداد</span>
          </div>
        </>
      )}

      {/* Right side */}
      <div className="mr-auto flex items-center gap-2">
        <span className={`text-xs ${darkMode ? 'text-surface-500' : 'text-surface-400'}`}>
          منظّف النسخ الذكي v1.0
        </span>
      </div>
    </footer>
  );
}
