import { DuplicateGroup, FileItem, ScanFolder } from '../types';

export const mockFolders: ScanFolder[] = [
  { id: '1', path: 'C:\\Users\\أحمد\\Pictures', name: 'الصور', enabled: true },
  { id: '2', path: 'C:\\Users\\أحمد\\Documents', name: 'المستندات', enabled: true },
  { id: '3', path: 'C:\\Users\\أحمد\\Downloads', name: 'التنزيلات', enabled: true },
  { id: '4', path: 'C:\\Users\\أحمد\\Music', name: 'الموسيقى', enabled: false },
];

const createFile = (overrides: Partial<FileItem>): FileItem => ({
  id: Math.random().toString(36).substr(2, 9),
  name: '',
  path: '',
  folder: '',
  extension: '',
  size: 0,
  modified: '2024-01-15',
  type: 'image',
  isReference: false,
  isSelected: false,
  similarity: 100,
  ...overrides,
});

export const mockGroups: DuplicateGroup[] = [
  // Same folder - Images (cross-extension)
  {
    id: 'g1',
    files: [
      createFile({
        id: 'f1', name: 'صورة_العائلة.jpg', path: 'C:\\Users\\أحمد\\Pictures\\صورة_العائلة.jpg',
        folder: 'الصور', extension: 'JPG', size: 3_500_000, modified: '2024-01-10',
        type: 'image', isReference: true, similarity: 100, dimensions: '4032×3024', quality: 'عالية'
      }),
      createFile({
        id: 'f2', name: 'صورة_العائلة.png', path: 'C:\\Users\\أحمد\\Pictures\\صورة_العائلة.png',
        folder: 'الصور', extension: 'PNG', size: 5_200_000, modified: '2024-01-10',
        type: 'image', isReference: false, similarity: 98, dimensions: '4032×3024', quality: 'عالية جداً'
      }),
      createFile({
        id: 'f3', name: 'صورة_العائلة.webp', path: 'C:\\Users\\أحمد\\Pictures\\صورة_العائلة.webp',
        folder: 'الصور', extension: 'WEBP', size: 1_800_000, modified: '2024-01-12',
        type: 'image', isReference: false, similarity: 95, dimensions: '4032×3024', quality: 'متوسطة'
      }),
    ],
    totalSize: 10_500_000,
    reclaimableSize: 7_000_000,
    isSameFolder: true,
    hasMixedFormats: true,
    matchReason: 'نفس الصورة بصيغ مختلفة (JPG, PNG, WEBP) - تشابه بصري 98%',
    reviewed: false,
    expanded: true,
  },
  // Same folder - Audio (cross-extension)
  {
    id: 'g2',
    files: [
      createFile({
        id: 'f4', name: 'تسجيل_اجتماع.mp3', path: 'C:\\Users\\أحمد\\Documents\\تسجيل_اجتماع.mp3',
        folder: 'المستندات', extension: 'MP3', size: 8_400_000, modified: '2024-02-01',
        type: 'audio', isReference: false, similarity: 100, duration: '15:32'
      }),
      createFile({
        id: 'f5', name: 'تسجيل_اجتماع.m4a', path: 'C:\\Users\\أحمد\\Documents\\تسجيل_اجتماع.m4a',
        folder: 'المستندات', extension: 'M4A', size: 6_200_000, modified: '2024-02-01',
        type: 'audio', isReference: true, similarity: 99, duration: '15:32'
      }),
      createFile({
        id: 'f6', name: 'تسجيل_اجتماع.ogg', path: 'C:\\Users\\أحمد\\Documents\\تسجيل_اجتماع.ogg',
        folder: 'المستندات', extension: 'OGG', size: 5_800_000, modified: '2024-02-03',
        type: 'audio', isReference: false, similarity: 97, duration: '15:30'
      }),
    ],
    totalSize: 20_400_000,
    reclaimableSize: 14_200_000,
    isSameFolder: true,
    hasMixedFormats: true,
    matchReason: 'نفس التسجيل الصوتي بصيغ مختلفة - بصمة صوتية متطابقة',
    reviewed: false,
    expanded: false,
  },
  // Same folder - Documents (cross-extension)
  {
    id: 'g3',
    files: [
      createFile({
        id: 'f7', name: 'تقرير_سنوي.docx', path: 'C:\\Users\\أحمد\\Documents\\تقرير_سنوي.docx',
        folder: 'المستندات', extension: 'DOCX', size: 2_100_000, modified: '2024-03-01',
        type: 'document', isReference: true, similarity: 100, pages: 45
      }),
      createFile({
        id: 'f8', name: 'تقرير_سنوي.pdf', path: 'C:\\Users\\أحمد\\Documents\\تقرير_سنوي.pdf',
        folder: 'المستندات', extension: 'PDF', size: 3_800_000, modified: '2024-03-02',
        type: 'document', isReference: false, similarity: 96, pages: 45
      }),
      createFile({
        id: 'f9', name: 'تقرير_سنوي.txt', path: 'C:\\Users\\أحمد\\Documents\\تقرير_سنوي.txt',
        folder: 'المستندات', extension: 'TXT', size: 180_000, modified: '2024-03-01',
        type: 'document', isReference: false, similarity: 92, pages: 42
      }),
    ],
    totalSize: 6_080_000,
    reclaimableSize: 3_980_000,
    isSameFolder: true,
    hasMixedFormats: true,
    matchReason: 'نفس المحتوى النصي بصيغ مختلفة - تشابه نصي 96%',
    reviewed: true,
    expanded: false,
  },
  // Same folder - Video (cross-extension)
  {
    id: 'g4',
    files: [
      createFile({
        id: 'f10', name: 'فيديو_الرحلة.mp4', path: 'C:\\Users\\أحمد\\Pictures\\فيديو_الرحلة.mp4',
        folder: 'الصور', extension: 'MP4', size: 150_000_000, modified: '2024-01-20',
        type: 'video', isReference: true, similarity: 100, duration: '05:42', dimensions: '1920×1080'
      }),
      createFile({
        id: 'f11', name: 'فيديو_الرحلة.mkv', path: 'C:\\Users\\أحمد\\Pictures\\فيديو_الرحلة.mkv',
        folder: 'الصور', extension: 'MKV', size: 220_000_000, modified: '2024-01-20',
        type: 'video', isReference: false, similarity: 99, duration: '05:42', dimensions: '1920×1080'
      }),
    ],
    totalSize: 370_000_000,
    reclaimableSize: 220_000_000,
    isSameFolder: true,
    hasMixedFormats: true,
    matchReason: 'نفس الفيديو بصيغ مختلفة - إطارات رئيسية متطابقة',
    reviewed: false,
    expanded: false,
  },
  // Cross-folder - Images
  {
    id: 'g5',
    files: [
      createFile({
        id: 'f12', name: 'شعار_الشركة.png', path: 'C:\\Users\\أحمد\\Documents\\شعار_الشركة.png',
        folder: 'المستندات', extension: 'PNG', size: 450_000, modified: '2024-02-15',
        type: 'image', isReference: true, similarity: 100, dimensions: '800×600'
      }),
      createFile({
        id: 'f13', name: 'شعار_الشركة.png', path: 'C:\\Users\\أحمد\\Downloads\\شعار_الشركة.png',
        folder: 'التنزيلات', extension: 'PNG', size: 450_000, modified: '2024-02-20',
        type: 'image', isReference: false, similarity: 100, dimensions: '800×600'
      }),
      createFile({
        id: 'f14', name: 'logo_copy.jpg', path: 'C:\\Users\\أحمد\\Pictures\\logo_copy.jpg',
        folder: 'الصور', extension: 'JPG', size: 320_000, modified: '2024-02-18',
        type: 'image', isReference: false, similarity: 94, dimensions: '800×600'
      }),
    ],
    totalSize: 1_220_000,
    reclaimableSize: 770_000,
    isSameFolder: false,
    hasMixedFormats: true,
    matchReason: 'نفس الصورة في مجلدات مختلفة - تطابق تام بين مجلدين وتشابه 94% مع الثالث',
    reviewed: false,
    expanded: false,
  },
  // Same folder - Exact duplicates
  {
    id: 'g6',
    files: [
      createFile({
        id: 'f15', name: 'ملخص_المشروع.xlsx', path: 'C:\\Users\\أحمد\\Documents\\ملخص_المشروع.xlsx',
        folder: 'المستندات', extension: 'XLSX', size: 890_000, modified: '2024-01-05',
        type: 'document', isReference: true, similarity: 100, pages: 3
      }),
      createFile({
        id: 'f16', name: 'ملخص_المشروع (نسخة).xlsx', path: 'C:\\Users\\أحمد\\Documents\\ملخص_المشروع (نسخة).xlsx',
        folder: 'المستندات', extension: 'XLSX', size: 890_000, modified: '2024-01-05',
        type: 'document', isReference: false, similarity: 100, pages: 3
      }),
    ],
    totalSize: 1_780_000,
    reclaimableSize: 890_000,
    isSameFolder: true,
    hasMixedFormats: false,
    matchReason: 'نسخة طبق الأصل - نفس المحتوى والحجم بالضبط',
    reviewed: false,
    expanded: false,
  },
];

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 بايت';
  const k = 1024;
  const sizes = ['بايت', 'كيلوبايت', 'ميغابايت', 'غيغابايت'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' });
}
