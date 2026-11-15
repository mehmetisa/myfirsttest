import { DuplicateGroup } from '../types';
import { formatFileSize } from '../data/mockData';
import { X, Lock, Eye, Shield, Image, FileText, Music, Video, ZoomIn, ZoomOut } from 'lucide-react';

interface PreviewPanelProps {
  group: DuplicateGroup;
  selectedFileId: string | null;
  onSelectFile: (id: string) => void;
  onSetReference: (fileId: string) => void;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  darkMode: boolean;
}

export default function PreviewPanel({ group, selectedFileId, onSelectFile, onSetReference, setCollapsed, darkMode }: PreviewPanelProps) {
  const selectedFile = group.files.find(f => f.id === selectedFileId) || group.files[0];
  const otherFiles = group.files.filter(f => f.id !== selectedFile?.id);

  const bg = darkMode ? 'bg-surface-800 border-surface-700' : 'bg-white border-surface-200';
  const text = darkMode ? 'text-surface-200' : 'text-surface-700';
  const textMuted = darkMode ? 'text-surface-400' : 'text-surface-500';

  const renderPreview = (type: string, name: string) => {
    switch (type) {
      case 'image':
        return (
          <div className={`flex-1 flex items-center justify-center rounded-xl ${darkMode ? 'bg-surface-900' : 'bg-surface-100'} relative overflow-hidden`}>
            <div className="text-center p-8">
              <div className="w-48 h-36 mx-auto rounded-lg bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center mb-4 shadow-lg">
                <Image className="w-16 h-16 text-white/80" />
              </div>
              <p className={`text-sm font-medium ${text}`}>{name}</p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <button className={`p-1.5 rounded-md ${darkMode ? 'bg-surface-700 hover:bg-surface-600' : 'bg-white hover:bg-surface-50'} shadow-sm`}>
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button className={`p-1.5 rounded-md ${darkMode ? 'bg-surface-700 hover:bg-surface-600' : 'bg-white hover:bg-surface-50'} shadow-sm`}>
                  <ZoomOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      case 'audio':
        return (
          <div className={`flex-1 flex flex-col items-center justify-center rounded-xl ${darkMode ? 'bg-surface-900' : 'bg-surface-100'} p-6`}>
            <div className="w-full max-w-sm">
              <div className="flex items-center justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-lg">
                  <Music className="w-10 h-10 text-white" />
                </div>
              </div>
              <p className={`text-center text-sm font-medium mb-4 ${text}`}>{name}</p>
              {/* Waveform visualization */}
              <div className={`h-16 rounded-lg ${darkMode ? 'bg-surface-800' : 'bg-white'} flex items-end justify-center gap-0.5 px-4 py-2`}>
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-purple-400 rounded-full transition-all"
                    style={{ height: `${Math.random() * 80 + 20}%` }}
                  />
                ))}
              </div>
              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <button className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 transition-colors shadow-md">
                  ▶
                </button>
              </div>
              <div className={`text-center text-xs mt-2 ${textMuted}`}>00:00 / 15:32</div>
            </div>
          </div>
        );
      case 'video':
        return (
          <div className={`flex-1 flex items-center justify-center rounded-xl ${darkMode ? 'bg-surface-900' : 'bg-surface-100'} relative`}>
            <div className="text-center p-8">
              <div className="w-56 h-32 mx-auto rounded-lg bg-gradient-to-br from-rose-300 to-rose-500 flex items-center justify-center mb-4 shadow-lg relative">
                <Video className="w-12 h-12 text-white/80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-white text-lg mr-[-2px]">▶</span>
                  </div>
                </div>
              </div>
              <p className={`text-sm font-medium ${text}`}>{name}</p>
              <div className={`text-xs mt-1 ${textMuted}`}>1920×1080 • 05:42</div>
            </div>
          </div>
        );
      case 'document':
        return (
          <div className={`flex-1 flex items-center justify-center rounded-xl ${darkMode ? 'bg-surface-900' : 'bg-surface-100'} p-6`}>
            <div className="w-full max-w-sm">
              <div className={`rounded-lg ${darkMode ? 'bg-surface-800' : 'bg-white'} p-4 shadow-sm border ${darkMode ? 'border-surface-700' : 'border-surface-200'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-amber-500" />
                  <span className={`text-sm font-medium ${text}`}>{name}</span>
                </div>
                {/* Simulated document content */}
                <div className="space-y-2">
                  <div className={`h-2.5 rounded ${darkMode ? 'bg-surface-700' : 'bg-surface-200'} w-full`} />
                  <div className={`h-2.5 rounded ${darkMode ? 'bg-surface-700' : 'bg-surface-200'} w-4/5`} />
                  <div className={`h-2.5 rounded ${darkMode ? 'bg-surface-700' : 'bg-surface-200'} w-full`} />
                  <div className={`h-2.5 rounded ${darkMode ? 'bg-surface-700' : 'bg-surface-200'} w-3/4`} />
                  <div className="h-4" />
                  <div className={`h-2.5 rounded ${darkMode ? 'bg-surface-700' : 'bg-surface-200'} w-full`} />
                  <div className={`h-2.5 rounded ${darkMode ? 'bg-surface-700' : 'bg-surface-200'} w-5/6`} />
                  <div className={`h-2.5 rounded ${darkMode ? 'bg-surface-700' : 'bg-surface-200'} w-2/3`} />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="flex-1 flex items-center justify-center text-surface-400">معاينة غير متاحة</div>;
    }
  };

  return (
    <aside className={`w-80 ${bg} border-r flex flex-col overflow-hidden animate-slide-left`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-3 border-b ${darkMode ? 'border-surface-700' : 'border-surface-200'}`}>
        <h3 className={`text-sm font-semibold ${text}`}>معاينة ومقارنة</h3>
        <button onClick={() => setCollapsed(true)} className={`p-1 rounded hover:bg-surface-100 ${darkMode ? 'hover:bg-surface-700' : ''}`}>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Why this group */}
      <div className={`px-3 py-2 ${darkMode ? 'bg-surface-750 border-surface-700' : 'bg-amber-50 border-amber-100'} border-b`}>
        <p className={`text-xs ${darkMode ? 'text-surface-300' : 'text-amber-800'}`}>
          💡 {group.matchReason}
        </p>
      </div>

      {/* Main preview */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {selectedFile && renderPreview(selectedFile.type, selectedFile.name)}

        {/* File metadata */}
        {selectedFile && (
          <div className={`rounded-lg p-3 ${darkMode ? 'bg-surface-750' : 'bg-surface-50'} space-y-2`}>
            <div className="flex justify-between">
              <span className={`text-xs ${textMuted}`}>الحجم</span>
              <span className={`text-xs font-medium ${text}`}>{formatFileSize(selectedFile.size)}</span>
            </div>
            <div className="flex justify-between">
              <span className={`text-xs ${textMuted}`}>الامتداد</span>
              <span className={`text-xs font-medium ${text}`}>{selectedFile.extension}</span>
            </div>
            {selectedFile.dimensions && (
              <div className="flex justify-between">
                <span className={`text-xs ${textMuted}`}>الأبعاد</span>
                <span className={`text-xs font-medium ${text}`} dir="ltr">{selectedFile.dimensions}</span>
              </div>
            )}
            {selectedFile.duration && (
              <div className="flex justify-between">
                <span className={`text-xs ${textMuted}`}>المدة</span>
                <span className={`text-xs font-medium ${text}`}>{selectedFile.duration}</span>
              </div>
            )}
            {selectedFile.pages && (
              <div className="flex justify-between">
                <span className={`text-xs ${textMuted}`}>الصفحات</span>
                <span className={`text-xs font-medium ${text}`}>{selectedFile.pages}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className={`text-xs ${textMuted}`}>التشابه</span>
              <span className="text-xs font-bold text-primary-600">{selectedFile.similarity}%</span>
            </div>
          </div>
        )}

        {/* Comparison with other files */}
        {otherFiles.length > 0 && (
          <div className="space-y-2">
            <h4 className={`text-xs font-semibold ${textMuted}`}>مقارنة مع النسخ الأخرى</h4>
            {otherFiles.map(file => (
              <button
                key={file.id}
                onClick={() => onSelectFile(file.id)}
                className={`w-full flex items-center gap-2 p-2 rounded-lg border transition-colors text-right ${
                  selectedFile?.id === file.id
                    ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : darkMode ? 'border-surface-700 hover:bg-surface-700' : 'border-surface-200 hover:bg-surface-50'
                }`}
              >
                <div className={`w-8 h-8 rounded flex items-center justify-center ${
                  file.type === 'image' ? 'bg-blue-100 text-blue-600' :
                  file.type === 'audio' ? 'bg-purple-100 text-purple-600' :
                  file.type === 'video' ? 'bg-rose-100 text-rose-600' :
                  'bg-amber-100 text-amber-600'
                }`}>
                  <Eye className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium truncate ${text}`}>{file.name}</p>
                  <p className={`text-xs ${textMuted}`}>{file.extension} • {formatFileSize(file.size)}</p>
                </div>
                {file.isReference && <Shield className="w-3.5 h-3.5 text-primary-600" />}
              </button>
            ))}
          </div>
        )}

        {/* Actions */}
        {selectedFile && (
          <div className="space-y-2 pt-2">
            {!selectedFile.isReference ? (
              <button
                onClick={() => onSetReference(selectedFile.id)}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium border border-primary-300 text-primary-700 bg-primary-50 hover:bg-primary-100 transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                تعيين كملف مرجعي
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium bg-primary-100 text-primary-700">
                <Shield className="w-3.5 h-3.5" />
                هذا هو الملف المرجعي المحمي
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
