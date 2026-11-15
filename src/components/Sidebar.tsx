import { ScanFolder, ScanSettings } from '../types';
import { FolderOpen, Plus, ChevronRight, ChevronLeft, Image, FileText, Music, Video, Sliders } from 'lucide-react';

interface SidebarProps {
  folders: ScanFolder[];
  setFolders: (f: ScanFolder[]) => void;
  scanSettings: ScanSettings;
  setScanSettings: (s: ScanSettings) => void;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  onAddFolder: () => void;
  onStartScan: () => void;
  darkMode: boolean;
}

export default function Sidebar({ folders, scanSettings, setScanSettings, collapsed, setCollapsed, onAddFolder, onStartScan, darkMode }: SidebarProps) {
  const bg = darkMode ? 'bg-surface-800' : 'bg-white';
  const border = darkMode ? 'border-surface-700' : 'border-surface-200';
  const text = darkMode ? 'text-surface-200' : 'text-surface-700';
  const textMuted = darkMode ? 'text-surface-400' : 'text-surface-500';

  if (collapsed) {
    return (
      <div className={`w-12 ${bg} border-l ${border} flex flex-col items-center py-3 gap-3`}>
        <button onClick={() => setCollapsed(false)} className={`p-1.5 rounded-lg hover:bg-surface-100 ${darkMode ? 'hover:bg-surface-700' : ''}`} title="توسيع">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <FolderOpen className={`w-4 h-4 ${textMuted}`} />
        <Sliders className={`w-4 h-4 ${textMuted}`} />
      </div>
    );
  }

  return (
    <aside className={`w-72 ${bg} border-l ${border} flex flex-col overflow-hidden animate-slide-right`}>
      {/* Collapse button */}
      <div className="flex items-center justify-between p-3 border-b border-inherit">
        <span className={`text-sm font-semibold ${text}`}>مصادر الفحص</span>
        <button onClick={() => setCollapsed(true)} className={`p-1 rounded hover:bg-surface-100 ${darkMode ? 'hover:bg-surface-700' : ''}`}>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Folders list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {folders.map(folder => (
          <div
            key={folder.id}
            className={`flex items-center gap-2 p-2.5 rounded-lg border transition-colors cursor-pointer ${
              folder.enabled
                ? darkMode ? 'border-primary-600/30 bg-primary-900/20' : 'border-primary-200 bg-primary-50'
                : darkMode ? 'border-surface-700 bg-surface-800' : 'border-surface-200 bg-surface-50'
            }`}
          >
            <input
              type="checkbox"
              checked={folder.enabled}
              onChange={() => {}}
              className="w-4 h-4 rounded accent-primary-600"
            />
            <FolderOpen className={`w-4 h-4 ${folder.enabled ? 'text-primary-600' : textMuted}`} />
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${text}`}>{folder.name}</p>
              <p className={`text-xs truncate ${textMuted}`} dir="ltr">{folder.path}</p>
            </div>
          </div>
        ))}
        <button
          onClick={onAddFolder}
          className={`w-full flex items-center justify-center gap-2 p-2.5 rounded-lg border-2 border-dashed transition-colors ${
            darkMode ? 'border-surface-600 text-surface-400 hover:border-primary-600 hover:text-primary-400' : 'border-surface-300 text-surface-500 hover:border-primary-400 hover:text-primary-600'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">إضافة مجلد</span>
        </button>
      </div>

      {/* Settings */}
      <div className={`border-t ${border} p-3 space-y-3`}>
        <h3 className={`text-xs font-semibold ${textMuted} uppercase tracking-wide`}>إعدادات المقارنة</h3>

        {/* Mode */}
        <div className="space-y-1.5">
          <label className={`text-xs font-medium ${text}`}>وضع المقارنة</label>
          <div className="flex gap-1">
            <button
              onClick={() => setScanSettings({ ...scanSettings, mode: 'exact' })}
              className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-colors ${
                scanSettings.mode === 'exact'
                  ? 'bg-primary-600 text-white'
                  : darkMode ? 'bg-surface-700 text-surface-300 hover:bg-surface-600' : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
              }`}
            >
              مطابق تماماً
            </button>
            <button
              onClick={() => setScanSettings({ ...scanSettings, mode: 'similar' })}
              className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-colors ${
                scanSettings.mode === 'similar'
                  ? 'bg-primary-600 text-white'
                  : darkMode ? 'bg-surface-700 text-surface-300 hover:bg-surface-600' : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
              }`}
            >
              متشابه
            </button>
          </div>
        </div>

        {/* Scope */}
        <div className="space-y-1.5">
          <label className={`text-xs font-medium ${text}`}>نطاق المقارنة</label>
          <select
            value={scanSettings.scope}
            onChange={(e) => setScanSettings({ ...scanSettings, scope: e.target.value as ScanSettings['scope'] })}
            className={`w-full py-1.5 px-2 rounded-md text-xs border ${
              darkMode ? 'bg-surface-700 border-surface-600 text-surface-200' : 'bg-white border-surface-200 text-surface-700'
            }`}
          >
            <option value="same_folder">نفس المجلد فقط</option>
            <option value="same_folder_first">نفس المجلد أولاً</option>
            <option value="all_folders">جميع المجلدات</option>
          </select>
        </div>

        {/* Similarity */}
        {scanSettings.mode === 'similar' && (
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className={`text-xs font-medium ${text}`}>حد التشابه</label>
              <span className="text-xs font-bold text-primary-600">{scanSettings.similarity}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={scanSettings.similarity}
              onChange={(e) => setScanSettings({ ...scanSettings, similarity: parseInt(e.target.value) })}
              className="w-full h-1.5 rounded-full appearance-none bg-surface-200 accent-primary-600"
            />
          </div>
        )}

        {/* Cross-extension toggle */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={scanSettings.crossExtension}
            onChange={(e) => setScanSettings({ ...scanSettings, crossExtension: e.target.checked })}
            className="w-4 h-4 rounded accent-primary-600"
          />
          <span className={`text-xs ${text}`}>مقارنة عبر امتدادات مختلفة</span>
        </label>

        {/* File types */}
        <div className="space-y-1.5">
          <label className={`text-xs font-medium ${text}`}>أنواع الملفات</label>
          <div className="flex flex-wrap gap-1.5">
            {[
              { type: 'image' as const, icon: Image, label: 'صور' },
              { type: 'document' as const, icon: FileText, label: 'مستندات' },
              { type: 'audio' as const, icon: Music, label: 'صوت' },
              { type: 'video' as const, icon: Video, label: 'فيديو' },
            ].map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                onClick={() => {
                  const types = scanSettings.fileTypes.includes(type)
                    ? scanSettings.fileTypes.filter(t => t !== type)
                    : [...scanSettings.fileTypes, type];
                  setScanSettings({ ...scanSettings, fileTypes: types });
                }}
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-colors ${
                  scanSettings.fileTypes.includes(type)
                    ? 'bg-primary-100 text-primary-700 border border-primary-200'
                    : darkMode ? 'bg-surface-700 text-surface-400 border border-surface-600' : 'bg-surface-100 text-surface-500 border border-surface-200'
                }`}
              >
                <Icon className="w-3 h-3" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Start scan */}
        <button
          onClick={onStartScan}
          className="w-full py-2.5 rounded-lg text-sm font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-sm"
        >
          بدء الفحص
        </button>
      </div>
    </aside>
  );
}
