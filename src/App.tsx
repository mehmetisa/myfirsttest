import { useState, useCallback, useEffect } from 'react';
import { AppScreen, DuplicateGroup, ScanSettings, ScanState, Toast, ScanFolder } from './types';
import { mockGroups, mockFolders } from './data/mockData';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import ResultsPanel from './components/ResultsPanel';
import PreviewPanel from './components/PreviewPanel';
import WelcomeScreen from './components/WelcomeScreen';
import ScanningScreen from './components/ScanningScreen';
import StatusBar from './components/StatusBar';
import DeleteConfirmDialog from './components/DeleteConfirmDialog';
import MoveCopyDialog from './components/MoveCopyDialog';
import OnboardingDialog from './components/OnboardingDialog';
import ToastContainer from './components/ToastContainer';

function App() {
  const [screen, setScreen] = useState<AppScreen>('welcome');
  const [groups, setGroups] = useState<DuplicateGroup[]>([]);
  const [folders, setFolders] = useState<ScanFolder[]>(mockFolders);
  const [selectedGroup, setSelectedGroup] = useState<DuplicateGroup | null>(null);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showMoveCopy, setShowMoveCopy] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [deletionComplete, setDeletionComplete] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [previewCollapsed, setPreviewCollapsed] = useState(false);

  const [scanSettings, setScanSettings] = useState<ScanSettings>({
    mode: 'similar',
    scope: 'same_folder_first',
    similarity: 90,
    crossExtension: true,
    noRecurse: false,
    minSize: 0,
    maxSize: 0,
    fileTypes: ['image', 'document', 'audio', 'video'],
  });

  const [scanState, setScanState] = useState<ScanState>({
    isScanning: false,
    progress: 0,
    phase: '',
    filesScanned: 0,
    totalFiles: 0,
    currentFolder: '',
    duplicatesFound: 0,
    estimatedTime: '',
  });

  const addToast = useCallback((message: string, type: Toast['type'] = 'info', action?: string, onAction?: () => void) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type, action, onAction }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const startScan = useCallback(() => {
    setScreen('scanning');
    setScanState({
      isScanning: true,
      progress: 0,
      phase: 'same_folder',
      filesScanned: 0,
      totalFiles: 2847,
      currentFolder: 'C:\\Users\\أحمد\\Pictures',
      duplicatesFound: 0,
      estimatedTime: '~3 دقائق',
    });

    // Simulate scanning progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 8 + 2;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setScanState(prev => ({
          ...prev,
          isScanning: false,
          progress: 100,
          phase: 'complete',
          filesScanned: 2847,
          duplicatesFound: 6,
          currentFolder: '',
          estimatedTime: '',
        }));
        setGroups(mockGroups);
        setScreen('results');
        addToast('اكتمل الفحص - تم العثور على 6 مجموعات مكررة', 'success');
      } else {
        const phase = progress < 40 ? 'same_folder' : progress < 80 ? 'cross_folder' : 'comparing';
        const folders = ['C:\\Users\\أحمد\\Pictures', 'C:\\Users\\أحمد\\Documents', 'C:\\Users\\أحمد\\Downloads'];
        const folderIdx = Math.floor((progress / 100) * folders.length);
        setScanState(prev => ({
          ...prev,
          progress,
          phase,
          filesScanned: Math.floor((progress / 100) * 2847),
          duplicatesFound: Math.floor((progress / 100) * 6),
          currentFolder: folders[Math.min(folderIdx, folders.length - 1)],
          estimatedTime: `~${Math.ceil((100 - progress) / 20)} دقائق`,
        }));
      }
    }, 300);
  }, [addToast]);

  const handleDeleteSelected = useCallback(() => {
    setShowDeleteConfirm(true);
  }, []);

  const confirmDelete = useCallback(() => {
    setShowDeleteConfirm(false);
    setGroups(prev => prev.map(g => ({
      ...g,
      files: g.files.map(f => ({
        ...f,
        isSelected: f.isReference ? false : f.isSelected,
      })).filter(f => !f.isSelected),
    })).filter(g => g.files.length > 1));
    setDeletionComplete(true);
    addToast('تم نقل 4 ملفات إلى سلة المحذوفات', 'success', 'تراجع', () => {
      addToast('تم التراجع عن الحذف', 'info');
    });
  }, [addToast]);

  const toggleFileSelection = useCallback((groupId: string, fileId: string) => {
    setGroups(prev => prev.map(g => {
      if (g.id !== groupId) return g;
      return {
        ...g,
        files: g.files.map(f => {
          if (f.id !== fileId) return f;
          if (f.isReference) {
            addToast('لا يمكن تحديد الملف المرجعي - فهو محمي', 'warning');
            return f;
          }
          return { ...f, isSelected: !f.isSelected };
        }),
      };
    }));
  }, [addToast]);

  const setReference = useCallback((groupId: string, fileId: string) => {
    setGroups(prev => prev.map(g => {
      if (g.id !== groupId) return g;
      return {
        ...g,
        files: g.files.map(f => ({
          ...f,
          isReference: f.id === fileId,
          isSelected: f.id === fileId ? false : f.isSelected,
        })),
      };
    }));
    addToast('تم تعيين الملف المرجعي', 'success');
  }, [addToast]);

  const toggleGroupExpand = useCallback((groupId: string) => {
    setGroups(prev => prev.map(g =>
      g.id === groupId ? { ...g, expanded: !g.expanded } : g
    ));
  }, []);

  const selectAllExceptRef = useCallback((groupId: string) => {
    setGroups(prev => prev.map(g => {
      if (g.id !== groupId) return g;
      return {
        ...g,
        files: g.files.map(f => ({
          ...f,
          isSelected: !f.isReference,
        })),
      };
    }));
  }, []);

  const openPreview = useCallback((group: DuplicateGroup, fileId: string) => {
    setSelectedGroup(group);
    setSelectedFileId(fileId);
    setPreviewCollapsed(false);
  }, []);

  const handleSetReferenceFromPreview = useCallback((fileId: string) => {
    if (selectedGroup) {
      setReference(selectedGroup.id, fileId);
    }
  }, [selectedGroup]);

  const addFolder = useCallback(() => {
    const newFolder: ScanFolder = {
      id: Math.random().toString(36).substr(2, 9),
      path: 'C:\\Users\\أحمد\\Desktop\\ملفات_جديدة',
      name: 'ملفات جديدة',
      enabled: true,
    };
    setFolders(prev => [...prev, newFolder]);
    addToast('تمت إضافة المجلد بنجاح', 'success');
  }, [addToast]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'o') { e.preventDefault(); addFolder(); }
      if (e.ctrlKey && e.key === 'f') { e.preventDefault(); /* focus search */ }
      if (e.key === 'Escape') { setShowDeleteConfirm(false); setShowMoveCopy(false); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [addFolder]);

  // Dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={`h-screen w-screen flex flex-col overflow-hidden ${darkMode ? 'bg-surface-900 text-surface-100' : 'bg-surface-50 text-surface-800'}`}>
      <TopBar
        screen={screen}
        scanSettings={scanSettings}
        setScanSettings={setScanSettings}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onSearch={() => {}}
        onStartScan={startScan}
        onExport={() => addToast('تم تصدير التقرير بنجاح', 'success')}
      />

      <div className="flex-1 flex overflow-hidden">
        {screen === 'welcome' && (
          <WelcomeScreen
            folders={folders}
            setFolders={setFolders}
            scanSettings={scanSettings}
            setScanSettings={setScanSettings}
            onStartScan={startScan}
            onAddFolder={addFolder}
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
        )}

        {screen === 'scanning' && (
          <ScanningScreen scanState={scanState} />
        )}

        {(screen === 'results' || screen === 'preview') && (
          <>
            <Sidebar
              folders={folders}
              setFolders={setFolders}
              scanSettings={scanSettings}
              setScanSettings={setScanSettings}
              collapsed={sidebarCollapsed}
              setCollapsed={setSidebarCollapsed}
              onAddFolder={addFolder}
              onStartScan={startScan}
              darkMode={darkMode}
            />

            <ResultsPanel
              groups={groups}
              setGroups={setGroups}
              onToggleExpand={toggleGroupExpand}
              onToggleSelection={toggleFileSelection}
              onSetReference={setReference}
              onSelectAllExceptRef={selectAllExceptRef}
              onDeleteSelected={handleDeleteSelected}
              onOpenPreview={openPreview}
              deletionComplete={deletionComplete}
              onMoveCopy={() => setShowMoveCopy(true)}
              darkMode={darkMode}
            />

            {!previewCollapsed && selectedGroup && (
              <PreviewPanel
                group={selectedGroup}
                selectedFileId={selectedFileId}
                onSelectFile={setSelectedFileId}
                onSetReference={(fileId: string) => setReference(selectedGroup.id, fileId)}
                collapsed={previewCollapsed}
                setCollapsed={setPreviewCollapsed}
                darkMode={darkMode}
              />
            )}
          </>
        )}
      </div>

      <StatusBar
        screen={screen}
        scanState={scanState}
        groups={groups}
        darkMode={darkMode}
      />

      {showDeleteConfirm && (
        <DeleteConfirmDialog
          groups={groups}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          darkMode={darkMode}
        />
      )}

      {showMoveCopy && (
        <MoveCopyDialog
          onClose={() => setShowMoveCopy(false)}
          onComplete={() => {
            setShowMoveCopy(false);
            addToast('تمت عملية النقل/النسخ بنجاح', 'success');
          }}
          darkMode={darkMode}
        />
      )}

      {showOnboarding && (
        <OnboardingDialog
          onClose={() => setShowOnboarding(false)}
          darkMode={darkMode}
        />
      )}

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;
