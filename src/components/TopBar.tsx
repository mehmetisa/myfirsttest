import { AppScreen, ScanSettings } from '../types';
import { Search, Settings, Download, Moon, Sun, Play, RotateCcw } from 'lucide-react';

interface TopBarProps {
  screen: AppScreen;
  scanSettings: ScanSettings;
  setScanSettings: (s: ScanSettings) => void;
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  onSearch: () => void;
  onStartScan: () => void;
  onExport: () => void;
}

export default function TopBar({ screen, darkMode, setDarkMode, onStartScan, onExport }: TopBarProps) {
  return (
    <header className={`h-14 flex items-center px-4 gap-3 border-b ${darkMode ? 'bg-surface-800 border-surface-700' : 'bg-white border-surface-200'} shadow-sm`}>
      {/* Logo */}
      <div className="flex items-center gap-2 ml-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 7h-9" /><path d="M14 17H5" />
            <circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" />
          </svg>
        </div>
        <h1 className="text-base font-bold text-primary-700 hidden sm:block">منظّف النسخ الذكي</h1>
      </div>

      {/* Search */}
      {screen === 'results' && (
        <div className={`flex-1 max-w-md mx-auto relative`}>
          <Search className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-surface-400' : 'text-surface-400'}`} />
          <input
            type="text"
            placeholder="بحث في النتائج..."
            className={`w-full pr-10 pl-4 py-2 rounded-lg text-sm border transition-colors ${
              darkMode
                ? 'bg-surface-700 border-surface-600 text-surface-100 placeholder:text-surface-400 focus:border-primary-500'
                : 'bg-surface-50 border-surface-200 text-surface-800 placeholder:text-surface-400 focus:border-primary-500'
            } focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 mr-auto">
        {screen === 'results' && (
          <>
            <button
              onClick={onStartScan}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors"
              title="إعادة الفحص"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden md:inline">فحص جديد</span>
            </button>
            <button
              onClick={onExport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-surface-100 text-surface-700 hover:bg-surface-200 transition-colors"
              title="تصدير التقرير"
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">تصدير</span>
            </button>
          </>
        )}

        {screen === 'welcome' && (
          <button
            onClick={onStartScan}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-sm"
          >
            <Play className="w-4 h-4" />
            بدء الفحص
          </button>
        )}

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-surface-700 text-surface-300' : 'hover:bg-surface-100 text-surface-600'}`}
          title={darkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <button
          className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-surface-700 text-surface-300' : 'hover:bg-surface-100 text-surface-600'}`}
          title="الإعدادات"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
