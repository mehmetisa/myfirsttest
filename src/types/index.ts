export type FileType = 'image' | 'document' | 'audio' | 'video' | 'other';
export type ComparisonScope = 'same_folder' | 'same_folder_first' | 'all_folders';
export type ScanMode = 'exact' | 'similar';
export type AppScreen = 'welcome' | 'scanning' | 'results' | 'preview';

export interface ScanFolder {
  id: string;
  path: string;
  name: string;
  enabled: boolean;
}

export interface FileItem {
  id: string;
  name: string;
  path: string;
  folder: string;
  extension: string;
  size: number;
  modified: string;
  type: FileType;
  isReference: boolean;
  isSelected: boolean;
  similarity: number;
  thumbnail?: string;
  duration?: string;
  dimensions?: string;
  pages?: number;
  quality?: string;
}

export interface DuplicateGroup {
  id: string;
  files: FileItem[];
  totalSize: number;
  reclaimableSize: number;
  isSameFolder: boolean;
  hasMixedFormats: boolean;
  matchReason: string;
  reviewed: boolean;
  expanded: boolean;
}

export interface ScanSettings {
  mode: ScanMode;
  scope: ComparisonScope;
  similarity: number;
  crossExtension: boolean;
  noRecurse: boolean;
  minSize: number;
  maxSize: number;
  fileTypes: FileType[];
}

export interface ScanState {
  isScanning: boolean;
  progress: number;
  phase: string;
  filesScanned: number;
  totalFiles: number;
  currentFolder: string;
  duplicatesFound: number;
  estimatedTime: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  action?: string;
  onAction?: () => void;
}
