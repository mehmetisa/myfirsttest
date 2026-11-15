import { DuplicateGroup } from '../types';
import { formatFileSize, formatDate } from '../data/mockData';
import { ChevronDown, ChevronUp, Lock, Image, FileText, Music, Video, Check, Eye, Shield, AlertTriangle, Folder } from 'lucide-react';

interface ResultsPanelProps {
  groups: DuplicateGroup[];
  setGroups: (g: DuplicateGroup[]) => void;
  onToggleExpand: (id: string) => void;
  onToggleSelection: (groupId: string, fileId: string) => void;
  onSetReference: (groupId: string, fileId: string) => void;
  onSelectAllExceptRef: (groupId: string) => void;
  onDeleteSelected: () => void;
  onOpenPreview: (group: DuplicateGroup, fileId: string) => void;
  deletionComplete: boolean;
  onMoveCopy: () => void;
  darkMode: boolean;
}

function getFileIcon(type: string) {
  switch (type) {
    case 'image': return Image;
    case 'document': return FileText;
    case 'audio': return Music;
    case 'video': return Video;
    default: return FileText;
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case 'image': return 'text-blue-500';
    case 'document': return 'text-amber-500';
    case 'audio': return 'text-purple-500';
    case 'video': return 'text-rose-500';
    default: return 'text-surface-500';
  }
}

export default function ResultsPanel({ groups, onToggleExpand, onToggleSelection, onSetReference, onSelectAllExceptRef, onDeleteSelected, onOpenPreview, deletionComplete, onMoveCopy, darkMode }: ResultsPanelProps) {
  const totalReclaimable = groups.reduce((sum, g) => sum + g.reclaimableSize, 0);
  const totalFiles = groups.reduce((sum, g) => sum + g.files.length, 0);
  const selectedCount = groups.reduce((sum, g) => sum + g.files.filter(f => f.isSelected).length, 0);
  const sameFolderGroups = groups.filter(g => g.isSameFolder);
  const crossFolderGroups = groups.filter(g => !g.isSameFolder);

  const bg = darkMode ? 'bg-surface-900' : 'bg-surface-50';
  const cardBg = darkMode ? 'bg-surface-800' : 'bg-white';
  const border = darkMode ? 'border-surface-700' : 'border-surface-200';
  const text = darkMode ? 'text-surface-200' : 'text-surface-700';
  const textMuted = darkMode ? 'text-surface-400' : 'text-surface-500';

  return (
    <main className={`flex-1 flex flex-col overflow-hidden ${bg}`}>
      {/* Results header */}
      <div className={`px-4 py-3 border-b ${border} flex items-center justify-between flex-wrap gap-2`}>
        <div className="flex items-center gap-4">
          <h2 className={`text-lg font-bold ${text}`}>نتائج الفحص</h2>
          <div className="flex items-center gap-3">
            <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-surface-700 text-surface-300' : 'bg-surface-100 text-surface-600'}`}>
              {groups.length} مجموعة
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-surface-700 text-surface-300' : 'bg-surface-100 text-surface-600'}`}>
              {totalFiles} ملف
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700">
              {formatFileSize(totalReclaimable)} قابل للاسترداد
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedCount > 0 && (
            <button
              onClick={onDeleteSelected}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-danger-500 text-white hover:bg-danger-600 transition-colors"
            >
              حذف المحدد ({selectedCount})
            </button>
          )}
          {deletionComplete && (
            <button
              onClick={onMoveCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors animate-fade-in"
            >
              نقل/نسخ الملفات المتبقية
            </button>
          )}
        </div>
      </div>

      {/* Groups list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Same folder groups */}
        {sameFolderGroups.length > 0 && (
          <div className="space-y-3">
            <h3 className={`text-sm font-semibold ${textMuted} flex items-center gap-2`}>
              <Folder className="w-4 h-4" />
              مجموعات نفس المجلد ({sameFolderGroups.length})
            </h3>
            {sameFolderGroups.map(group => (
              <GroupCard
                key={group.id}
                group={group}
                onToggleExpand={onToggleExpand}
                onToggleSelection={onToggleSelection}
                onSetReference={onSetReference}
                onSelectAllExceptRef={onSelectAllExceptRef}
                onOpenPreview={onOpenPreview}
                darkMode={darkMode}
              />
            ))}
          </div>
        )}

        {/* Cross-folder groups */}
        {crossFolderGroups.length > 0 && (
          <div className="space-y-3 mt-4">
            <h3 className={`text-sm font-semibold ${textMuted} flex items-center gap-2`}>
              <Folder className="w-4 h-4" />
              مجموعات مجلدات مختلفة ({crossFolderGroups.length})
            </h3>
            {crossFolderGroups.map(group => (
              <GroupCard
                key={group.id}
                group={group}
                onToggleExpand={onToggleExpand}
                onToggleSelection={onToggleSelection}
                onSetReference={onSetReference}
                onSelectAllExceptRef={onSelectAllExceptRef}
                onOpenPreview={onOpenPreview}
                darkMode={darkMode}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

interface GroupCardProps {
  group: DuplicateGroup;
  onToggleExpand: (id: string) => void;
  onToggleSelection: (groupId: string, fileId: string) => void;
  onSetReference: (groupId: string, fileId: string) => void;
  onSelectAllExceptRef: (groupId: string) => void;
  onOpenPreview: (group: DuplicateGroup, fileId: string) => void;
  darkMode: boolean;
}

function GroupCard({ group, onToggleExpand, onToggleSelection, onSetReference, onSelectAllExceptRef, onOpenPreview, darkMode }: GroupCardProps) {
  const cardBg = darkMode ? 'bg-surface-800 border-surface-700' : 'bg-white border-surface-200';
  const text = darkMode ? 'text-surface-200' : 'text-surface-700';
  const textMuted = darkMode ? 'text-surface-400' : 'text-surface-500';

  return (
    <div className={`rounded-xl border ${cardBg} overflow-hidden transition-all duration-200 animate-fade-in`}>
      {/* Group header */}
      <div
        className="flex items-center gap-3 p-3 cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-750 transition-colors"
        onClick={() => onToggleExpand(group.id)}
      >
        <button className={`p-1 rounded transition-colors ${darkMode ? 'hover:bg-surface-700' : 'hover:bg-surface-100'}`}>
          {group.expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-sm font-semibold ${text}`}>
              {group.files[0]?.name.replace(/\.[^.]+$/, '')}
            </span>
            <span className={`text-xs ${textMuted}`}>
              ({group.files.length} ملفات)
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {group.isSameFolder ? (
              <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                نفس المجلد
              </span>
            ) : (
              <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                مجلدات مختلفة
              </span>
            )}
            {group.hasMixedFormats && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                صيغ مختلفة
              </span>
            )}
            {group.reviewed && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 flex items-center gap-0.5">
                <Check className="w-3 h-3" /> تمت المراجعة
              </span>
            )}
          </div>
        </div>

        <div className="text-left space-y-0.5">
          <p className={`text-xs font-medium ${text}`}>{formatFileSize(group.totalSize)}</p>
          <p className="text-xs text-primary-600 font-medium">{formatFileSize(group.reclaimableSize)} مستردة</p>
        </div>
      </div>

      {/* Expanded content */}
      {group.expanded && (
        <div className={`border-t ${darkMode ? 'border-surface-700' : 'border-surface-100'}`}>
          {/* Match reason */}
          <div className={`px-4 py-2 ${darkMode ? 'bg-surface-750' : 'bg-surface-50'} flex items-center gap-2`}>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span className={`text-xs ${textMuted}`}>{group.matchReason}</span>
          </div>

          {/* Quick actions */}
          <div className={`px-4 py-2 flex items-center gap-2 border-b ${darkMode ? 'border-surface-700' : 'border-surface-100'}`}>
            <button
              onClick={(e) => { e.stopPropagation(); onSelectAllExceptRef(group.id); }}
              className={`text-xs px-2 py-1 rounded-md transition-colors ${darkMode ? 'bg-surface-700 text-surface-300 hover:bg-surface-600' : 'bg-surface-100 text-surface-600 hover:bg-surface-200'}`}
            >
              تحديد الكل ما عدا المرجع
            </button>
          </div>

          {/* Files list */}
          <div className="divide-y divide-surface-100 dark:divide-surface-700">
            {group.files.map(file => {
              const Icon = getFileIcon(file.type);
              const iconColor = getTypeColor(file.type);
              return (
                <div
                  key={file.id}
                  className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                    file.isSelected
                      ? darkMode ? 'bg-danger-500/10' : 'bg-danger-50'
                      : file.isReference
                        ? darkMode ? 'bg-primary-900/10' : 'bg-primary-50/50'
                        : ''
                  }`}
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={file.isSelected}
                    onChange={() => onToggleSelection(group.id, file.id)}
                    disabled={file.isReference}
                    className="w-4 h-4 rounded accent-primary-600 disabled:opacity-50"
                    title={file.isReference ? 'ملف مرجعي محمي' : ''}
                  />

                  {/* Type icon */}
                  <Icon className={`w-5 h-5 ${iconColor}`} />

                  {/* File info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium truncate ${text}`}>{file.name}</span>
                      {file.isReference && (
                        <span className="flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                          <Shield className="w-3 h-3" /> مرجع
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className={`text-xs ${textMuted}`} dir="ltr">{file.extension}</span>
                      <span className={`text-xs ${textMuted}`}>{formatFileSize(file.size)}</span>
                      <span className={`text-xs ${textMuted}`}>{formatDate(file.modified)}</span>
                      {file.similarity < 100 && (
                        <span className="text-xs text-primary-600 font-medium">{file.similarity}% تشابه</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onOpenPreview(group, file.id)}
                      className={`p-1.5 rounded-md transition-colors ${darkMode ? 'hover:bg-surface-700 text-surface-400' : 'hover:bg-surface-100 text-surface-500'}`}
                      title="معاينة"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {!file.isReference && (
                      <button
                        onClick={() => onSetReference(group.id, file.id)}
                        className={`p-1.5 rounded-md transition-colors ${darkMode ? 'hover:bg-surface-700 text-surface-400' : 'hover:bg-surface-100 text-surface-500'}`}
                        title="تعيين كمرجع"
                      >
                        <Lock className="w-4 h-4" />
                      </button>
                    )}
                    {file.isReference && (
                      <Lock className="w-4 h-4 text-primary-600" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
