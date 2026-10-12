'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Loader2,
  SlidersHorizontal,
  Download,
  Lock,
  Unlock,
  Files,
  ArrowRight,
  ExternalLink,
  Shield,
  FileText,
  Upload,
  Eye,
  EyeOff,
  Grid,
  Layers,
  Sparkles,
  Maximize2,
  Clock,
  Printer,
  FileCheck2,
  Image as ImageIcon,
  Type,
  Palette,
  Compass,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  type StudioToolId,
  normalizeStudioToolId,
  findStudioToolConfig,
  getToolExecutionType,
  ZERO_CONFIG_TOOL_IDS,
} from './studio-processors';
import { getToolContent } from '@/config/tool-content';
import type { Locale } from '@/lib/i18n/config';
import { getStudioText } from '@/lib/i18n/studio';
import { OrganizeToolOptions } from './tool-options/OrganizeToolOptions';
import { EditAnnotateToolOptions } from './tool-options/EditAnnotateToolOptions';
import { SecurityToolOptions } from './tool-options/SecurityToolOptions';
import { OptimizeRepairToolOptions } from './tool-options/OptimizeRepairToolOptions';
import { ExportToolOptions } from './tool-options/ExportToolOptions';
import { ImportAppendToolOptions } from './tool-options/ImportAppendToolOptions';

export const getToolDefaultOptions = (id: string, locale: Locale): Record<string, any> => {
  switch (id) {
    case 'split-pdf':
      return { splitMode: 'ranges', rangeInput: '', splitCount: 2, evenOddMode: 'both' };
    case 'divide-pages':
      return { splitDirection: 'vertical', splitRatio: 0.5 };
    case 'combine-single-page':
      return { direction: 'vertical', spacing: 10, backgroundColor: '#ffffff' };
    case 'grid-combine':
      return { rows: 2, cols: 2, margin: 20, spacing: 10 };
    case 'pdf-booklet':
      return { gridMode: '1x2', paperSize: 'a4', orientation: 'landscape', rotation: 'none', padding: 20 };
    case 'photo-tiling-prepress':
      return { photoSpec: '1-inch', paperSize: '6-inch', gapPt: 8 };
    case 'pdf-lossless-slicer':
      return { pageNumber: 1, sliceX: 0.1, sliceY: 0.1, sliceWidth: 0.8, sliceHeight: 0.8 };
    case 'passport-id-composer':
      return { watermark: getStudioText(locale, 'k0087'), layout: 'single-page' };
    case 'pdf-two-column-reflower':
      return { middleGapRatio: 0.5, horizontalReading: false };
    case 'pdf-spine-bookbinder':
      return { pageCount: 100, paperGsm: 80, bookTitle: 'PDFCraft Book' };
    case 'pdf-page-resizer-uniform':
      return { targetSize: 'A4', scaleMode: 'fit' };
    case 'pdf-scratchpad-canvas':
      return { padPosition: 'right', padSize: 200, gridType: 'grid' };
    case 'table-of-contents':
      return { title: getStudioText(locale, 'k0088'), fontSize: 12, fontFamily: 'helv', addBookmark: true };
    case 'bookmark':
      return { title: '', pageNumber: 1, level: 1 };
    case 'edit-metadata':
      return { title: '', author: '', subject: '', keywords: '', creator: 'PDFCraft' };
    case 'text-color':
      return { color: '#0000ff', mode: 'dark', threshold: 128 };
    case 'background-color':
      return { color: '#fdf6e2', opacity: 0.8, mode: 'replace-white' };
    case 'interactive-toc-generator':
      return { title: getStudioText(locale, 'k0089'), insertIndex: 1 };
    case 'bookmarks-auto-generator':
      return { strategy: 'font-size', minFontSize: 14 };
    case 'batch-barcode-injector':
      return { barcodeType: 'qrcode', value: 'https://officetools.yosuaf.com', xPos: 0.8, yPos: 0.8, width: 80, height: 80, pageRange: 'all' };
    case 'signature-ink-optimizer':
      return { threshold: 200, inkType: 'auto', contrast: 1.5 };
    case 'remove-blank-pages':
      return { threshold: 99, filterMode: 'all' };
    case 'remove-annotations':
      return { removeAll: true };
    case 'sanitize-pdf':
    case 'deep-sanitize':
      return {
        removeJavaScript: true,
        removeAttachments: true,
        removeLinks: true,
        flattenForms: true,
        removeMetadata: true,
        removeAnnotations: false,
      };
    case 'find-and-redact':
    case 'redact-pdf':
      return { searchTermsInput: '', caseSensitive: false, wholeWord: false, useRegex: false, redactionColor: '#000000', replacementText: '' };
    case 'smart-data-redactor':
      return { idRedact: true, phoneRedact: true, emailRedact: true, customKeywords: '' };
    case 'change-permissions':
      return { allowPrinting: true, allowCopying: false, allowModifying: false, allowAnnotating: false, ownerPassword: '' };
    case 'digital-sign-pdf':
      return { reason: getStudioText(locale, 'k0090'), location: '', contactInfo: '', enableVisible: true, sigPage: 1 };
    case 'cert-cryptor':
      return { sealPos: 'bottom-right', waxColor: 'red' };
    case 'pdf-signature-anchor-helper':
      return { pageNumber: 1, anchorX: 0.8, anchorY: 0.8, anchorLabel: getStudioText(locale, 'k0091') };
    case 'linearize-pdf':
      return { useObjectStreams: true };
    case 'deskew-pdf':
    case 'pdf-deskew-aligner':
      return { threshold: 10, dpi: 150 };
    case 'pdf-to-pdfa':
      return { level: '2b', embedFonts: true, flattenTransparency: true };
    case 'font-to-outline':
      return { dpi: 300, preserveSelectableText: false };
    case 'ocg-manager':
      return { layerAction: 'remove-hidden' };
    case 'eink-optimizer':
      return { contrastOffset: 15, dilationAmount: 1 };
    case 'batch-watermark-remover':
      return { watermarkText: getStudioText(locale, 'k0092'), removeImages: true };
    case 'dead-link-debugger':
      return { action: 'remove-broken' };
    case 'handwriting-ink-contrast-booster':
      return { threshold: 180, contrast: 1.8, inkType: 'pen' };
    case 'pdf-to-markdown':
      return { includePageNumbers: false, preserveLineBreaks: true, pageRange: '' };
    case 'pdf-to-json':
      return { includeText: true, includeMetadata: true, includePageInfo: true, includeOutline: true, prettyPrint: true, pageRange: '' };
    case 'pdf-to-tiff':
      return { colorMode: 'color', compression: 'packbits', dpi: 150 };
    case 'pdf-to-svg':
      return { scale: 2, pageRange: '' };
    case 'pdf-to-cbz':
      return { title: '', series: '', format: 'jpg', quality: 0.85, manga: 'No' };
    case 'pdf-to-pptx':
      return { dpi: 150 };
    case 'extract-images':
      return { minWidth: 100, minHeight: 100 };
    case 'extract-tables':
      return { format: 'xlsx', minColumns: 2, minRows: 2, includePageNumbers: true };
    case 'annotation-exporter':
      return { format: 'markdown', incHighlights: true, incNotes: true, incUnderlines: true };
    case 'global-invoice-parser':
      return { targetCurrency: 'USD', customRate: 1.0 };
    case 'pdf-to-slide':
      return { themeColor: '#6366f1' };
    case 'pdf-to-zip':
      return { compressionLevel: 6 };
    case 'markdown-to-pdf':
      return { pageSize: 'a4', theme: 'github', gfm: true, syntaxHighlight: true };
    case 'json-to-pdf':
      return { pageSize: 'A4', fontSize: 11, indentSpaces: 2, showLineNumbers: true };
    case 'txt-to-pdf':
      return { fontSize: 12, lineHeight: 1.5, fontId: 'helvetica' };
    case 'email-to-pdf':
      return { includeCcBcc: true, includeAttachments: true };
    case 'cbz-to-pdf':
      return { quality: 0.85, maintainAspectRatio: true };
    case 'djvu-to-pdf':
      return { dpi: 150 };
    case 'psd-to-pdf':
      return { margin: 36, centerImage: true, scaleToFit: true };
    default:
      return {};
  }
};

interface StudioToolDrawerProps {
  toolId: StudioToolId | null;
  onClose: () => void;
  onApply: (toolId: StudioToolId, options: Record<string, any>) => Promise<void>;
  onExport?: (toolId: StudioToolId, options: Record<string, any>) => Promise<void>;
  isApplying: boolean;
  locale?: string;
  availableDocuments?: Array<{ id: string; name: string; file: File; currentBlob: Blob }>;
  totalPages?: number;
}

export const StudioToolDrawer: React.FC<StudioToolDrawerProps> = ({
  toolId,
  onClose,
  onApply,
  onExport,
  isApplying,
  locale = 'zh',
  availableDocuments = [],
  totalPages = 1,
}) => {
  const validLocale = (locale as Locale) || 'zh';

  // Dynamic tool-specific options (aligned across all 67+ tools)
  const [dynamicOptions, setDynamicOptions] = useState<Record<string, any>>({});
  const handleDynamicOptionChange = (key: string, value: any) => {
    setDynamicOptions((prev) => ({ ...prev, [key]: value }));
  };

  // ==========================================
  // Form States - 100% Aligned with standalone tools
  // ==========================================

  // 1. Rotate PDF (Full options: Preset + Stepless Angle + Scope + Custom Pages)
  const [rotateMode, setRotateMode] = useState<'preset' | 'stepless'>('preset');
  const [rotateAngle, setRotateAngle] = useState<number>(90);
  const [steplessAngle, setSteplessAngle] = useState<number>(0);
  const [rotateScope, setRotateScope] = useState<'all' | 'odd' | 'even' | 'custom'>('all');
  const [rotateCustomPages, setRotateCustomPages] = useState<string>('');

  // 2. Watermark (Full options: Text/Image + 9-grid/Custom Position + Tile Repeat + Font Size + Color + Opacity + Angle + Flatten)
  const [watermarkType, setWatermarkType] = useState<'text' | 'image'>('text');
  const [watermarkText, setWatermarkText] = useState<string>('CONFIDENTIAL');
  const [watermarkFontSize, setWatermarkFontSize] = useState<number>(48);
  const [watermarkColorHex, setWatermarkColorHex] = useState<string>('#e11d48');
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(0.3);
  const [watermarkAngle, setWatermarkAngle] = useState<number>(45);
  const [watermarkPosition, setWatermarkPosition] = useState<string>('center');
  const [watermarkTile, setWatermarkTile] = useState<boolean>(false);
  const [watermarkScope, setWatermarkScope] = useState<'all' | 'odd' | 'even' | 'custom'>('all');
  const [watermarkCustomPages, setWatermarkCustomPages] = useState<string>('');
  const [watermarkImageFile, setWatermarkImageFile] = useState<File | null>(null);
  const [watermarkImageScale, setWatermarkImageScale] = useState<number>(50);

  // 3. Compress PDF (Full options: Quality Level + Algorithm + Optimize Images + Remove Metadata + DPI)
  const [compressQuality, setCompressQuality] = useState<'low' | 'medium' | 'high'>('medium');
  const [compressOptimizeImages, setCompressOptimizeImages] = useState<boolean>(true);
  const [compressRemoveMetadata, setCompressRemoveMetadata] = useState<boolean>(true);
  const [compressDpi, setCompressDpi] = useState<number>(150);

  // 4. Page Numbers (Full options: 6 Positions + Format + Custom Format + Start Number + Font Size + Color + Skip First Page + Odd/Even Mode)
  const [pageNumberPos, setPageNumberPos] = useState<
    'bottom-center' | 'bottom-right' | 'bottom-left' | 'top-center' | 'top-right' | 'top-left'
  >('bottom-center');
  const [pageNumberFormat, setPageNumberFormat] = useState<'number' | 'page-of-total' | 'roman' | 'custom'>('page-of-total');
  const [pageNumberCustomFormat, setPageNumberCustomFormat] = useState<string>('Page {page} of {total}');
  const [pageNumberStart, setPageNumberStart] = useState<number>(1);
  const [pageNumberFontSize, setPageNumberFontSize] = useState<number>(11);
  const [pageNumberColor, setPageNumberColor] = useState<string>('#4b5563');
  const [pageNumberSkipFirst, setPageNumberSkipFirst] = useState<boolean>(false);
  const [pageNumberOddEvenDifferent, setPageNumberOddEvenDifferent] = useState<boolean>(false);

  // 5. Delete Pages (Full options: Page string input + quick buttons)
  const [deletePagesInput, setDeletePagesInput] = useState<string>('1');

  // 6. Extract Pages (Full options: Page range input + quick preset buttons + mode)
  const [extractPagesInput, setExtractPagesInput] = useState<string>('1');

  // 7. Add Blank Page (Full options: Insert position + Page Count)
  const [blankPagePos, setBlankPagePos] = useState<'first' | 'last' | 'after-current'>('last');
  const [blankPageCount, setBlankPageCount] = useState<number>(1);

  // 8. Crop PDF (Full options: Apply to All / Current + 4-side Margins + Presets)
  const [cropApplyToAll, setCropApplyToAll] = useState<boolean>(true);
  const [cropMarginTop, setCropMarginTop] = useState<number>(20);
  const [cropMarginBottom, setCropMarginBottom] = useState<number>(20);
  const [cropMarginLeft, setCropMarginLeft] = useState<number>(20);
  const [cropMarginRight, setCropMarginRight] = useState<number>(20);
  const [cropUniform, setCropUniform] = useState<boolean>(true);

  // 9. Encrypt PDF (Full options: User Password + Owner Password + Granular Permissions checkboxes)
  const [userPassword, setUserPassword] = useState<string>('');
  const [ownerPassword, setOwnerPassword] = useState<string>('');
  const [allowPrinting, setAllowPrinting] = useState<boolean>(true);
  const [allowCopying, setAllowCopying] = useState<boolean>(true);
  const [allowAnnotating, setAllowAnnotating] = useState<boolean>(true);
  const [allowFillingForms, setAllowFillingForms] = useState<boolean>(true);
  const [allowModifying, setAllowModifying] = useState<boolean>(false);

  // 10. Decrypt / Remove Restrictions
  const [decryptPassword, setDecryptPassword] = useState<string>('');
  const [showDecryptPassword, setShowDecryptPassword] = useState<boolean>(false);

  // 11. Header & Footer (Full options: Left, Center, Right inputs + Font size + Skip First Page)
  const [headerLeft, setHeaderLeft] = useState<string>('');
  const [headerCenter, setHeaderCenter] = useState<string>('');
  const [headerRight, setHeaderRight] = useState<string>('');
  const [footerLeft, setFooterLeft] = useState<string>('');
  const [footerCenter, setFooterCenter] = useState<string>('');
  const [footerRight, setFooterRight] = useState<string>('');
  const [hfFontSize, setHfFontSize] = useState<number>(10);
  const [hfSkipFirstPage, setHfSkipFirstPage] = useState<boolean>(false);

  // 12. Stamps (Full options: Presets + Custom text + Opacity + Position)
  const [selectedStamp, setSelectedStamp] = useState<string>('CONFIDENTIAL');
  const [stampOpacity, setStampOpacity] = useState<number>(0.7);
  const [stampPosition, setStampPosition] = useState<'center' | 'top-right' | 'bottom-right'>('center');

  // 13. Append / Merge files
  const [appendFiles, setAppendFiles] = useState<File[]>([]);

  // 14. N-Up PDF (Full options: Pages per sheet + Add border + Orientation + Page Size)
  const [nUpPages, setNUpPages] = useState<2 | 4 | 9 | 16>(2);
  const [nUpBorder, setNUpBorder] = useState<boolean>(false);
  const [nUpOrientation, setNUpOrientation] = useState<'auto' | 'portrait' | 'landscape'>('auto');
  const [nUpPageSize, setNUpPageSize] = useState<'A4' | 'Letter' | 'A3'>('A4');

  // 15. Posterize PDF (Full options: Grid + Overlap Margin + Page Size)
  const [posterizeGrid, setPosterizeGrid] = useState<'2x2' | '3x3' | '2x1' | '1x2'>('2x2');
  const [posterizeOverlap, setPosterizeOverlap] = useState<number>(0);
  const [posterizePageSize, setPosterizePageSize] = useState<'A4' | 'Letter'>('A4');

  // 16. Fix Page Size / Page Dimensions (Full options: Preset + Scale Mode + Orientation)
  const [pageSizePreset, setPageSizePreset] = useState<'a4' | 'letter' | 'a3' | 'a5'>('a4');
  const [pageSizeScaleMode, setPageSizeScaleMode] = useState<'fit' | 'fill' | 'stretch'>('fit');
  const [pageSizeOrientation, setPageSizeOrientation] = useState<'auto' | 'portrait' | 'landscape'>('auto');

  // 17. Page Labels (Full options: Style + Prefix + Start Value + Page Range)
  const [labelStyle, setLabelStyle] = useState<'D' | 'R' | 'r' | 'A' | 'a'>('D');
  const [labelPrefix, setLabelPrefix] = useState<string>('');
  const [labelStartValue, setLabelStartValue] = useState<number>(1);
  const [labelRange, setLabelRange] = useState<string>('');

  // 18. Timestamp TSA (Full options: Server selection)
  const [tsaServer, setTsaServer] = useState<string>('MeSign');

  // 19. Rasterize PDF (Full options: DPI + Color/Grayscale)
  const [rasterizeDpi, setRasterizeDpi] = useState<number>(150);
  const [rasterizeGrayscale, setRasterizeGrayscale] = useState<boolean>(false);

  // 20. OCR PDF (Full options: Language selection + Output Format + Enhance contrast)
  const [ocrLanguage, setOcrLanguage] = useState<'chi_sim' | 'eng' | 'chi_tra' | 'jpn' | 'kor' | 'fra' | 'deu'>('chi_sim');
  const [ocrOutputFormat, setOcrOutputFormat] = useState<'searchable-pdf' | 'text' | 'markdown'>('searchable-pdf');
  const [ocrEnhanceContrast, setOcrEnhanceContrast] = useState<boolean>(true);

  // 21. Export options (Images / Docx / Conversions)
  const [exportImageFormat, setExportImageFormat] = useState<'jpg' | 'png' | 'webp'>('jpg');
  const [exportImageQuality, setExportImageQuality] = useState<number>(90);
  const [exportDpi, setExportDpi] = useState<number>(150);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!toolId) return null;

  const normId = normalizeStudioToolId(toolId);
  const currentToolConfig = findStudioToolConfig(toolId);
  const localizedContent = getToolContent(validLocale, normId);

  const title = localizedContent?.title || currentToolConfig?.name || (getStudioText(validLocale, 'k0093'));
  const description = localizedContent?.metaDescription || currentToolConfig?.description || '';
  const executionType = getToolExecutionType(normId);

  const parsePageNumbers = (inputStr: string): number[] => {
    const pages = inputStr
      .split(',')
      .flatMap((part) => {
        const range = part.trim().split('-');
        if (range.length === 2) {
          const start = parseInt(range[0], 10);
          const end = parseInt(range[1], 10);
          if (!isNaN(start) && !isNaN(end) && start <= end) {
            return Array.from({ length: Math.min(end - start + 1, 1000) }, (_, i) => start + i);
          }
        }
        const p = parseInt(part.trim(), 10);
        return isNaN(p) ? [] : [p];
      })
      .filter((n) => n > 0);
    return Array.from(new Set(pages));
  };

  const hexToRgbRatio = (hex: string) => {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16) / 255 || 0;
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255 || 0;
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255 || 0;
    return { r, g, b };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isApplying) return;

    let options: Record<string, any> = {};

    switch (normId) {
      case 'rotate-pdf': {
        const angle = rotateMode === 'stepless' ? steplessAngle : rotateAngle;
        let pages: number[] | undefined;
        if (rotateScope === 'custom' && rotateCustomPages.trim()) {
          pages = parsePageNumbers(rotateCustomPages);
        }
        options = {
          angle,
          scope: rotateScope,
          pages,
        };
        break;
      }
      case 'add-watermark': {
        const rgb = hexToRgbRatio(watermarkColorHex);
        const positionCoordsMap: Record<string, { x: number; y: number }> = {
          center: { x: 0.5, y: 0.5 },
          'top-left': { x: 0.15, y: 0.15 },
          'top-center': { x: 0.5, y: 0.15 },
          'top-right': { x: 0.85, y: 0.15 },
          'bottom-left': { x: 0.15, y: 0.85 },
          'bottom-center': { x: 0.5, y: 0.85 },
          'bottom-right': { x: 0.85, y: 0.85 },
        };
        const coords = positionCoordsMap[watermarkPosition] || { x: 0.5, y: 0.5 };
        options = {
          type: watermarkType,
          text: watermarkText || 'CONFIDENTIAL',
          fontSize: watermarkFontSize,
          color: rgb,
          opacity: watermarkOpacity,
          rotation: watermarkAngle,
          position: watermarkPosition,
          xRatio: coords.x,
          yRatio: coords.y,
          repeat: watermarkTile,
          scope: watermarkScope,
          pages: watermarkScope === 'custom' ? parsePageNumbers(watermarkCustomPages) : watermarkScope,
          imageFile: watermarkImageFile,
          imageScale: watermarkImageScale,
        };
        break;
      }
      case 'compress-pdf':
        options = {
          quality: compressQuality,
          imageQuality: compressQuality === 'high' ? 0.85 : compressQuality === 'medium' ? 0.55 : 0.35,
          optimizeImages: compressOptimizeImages,
          removeMetadata: compressRemoveMetadata,
          dpi: compressDpi,
        };
        break;
      case 'page-numbers': {
        let fmt = '{n}';
        if (pageNumberFormat === 'page-of-total') fmt = '{n} / {total}';
        else if (pageNumberFormat === 'roman') fmt = '{roman}';
        else if (pageNumberFormat === 'custom') fmt = pageNumberCustomFormat;

        options = {
          position: pageNumberPos,
          format: fmt,
          startNumber: pageNumberStart,
          fontSize: pageNumberFontSize,
          fontColor: pageNumberColor,
          skipFirstPage: pageNumberSkipFirst,
          oddEvenDifferent: pageNumberOddEvenDifferent,
          oddPosition: 'bottom-right',
          evenPosition: 'bottom-left',
        };
        break;
      }
      case 'delete-pages': {
        const pages = parsePageNumbers(deletePagesInput);
        options = { pages: pages.length > 0 ? pages : [1] };
        break;
      }
      case 'extract-pages': {
        const pages = parsePageNumbers(extractPagesInput);
        options = { pages: pages.length > 0 ? pages : [1] };
        break;
      }
      case 'add-blank-page':
        options = {
          position: blankPagePos === 'first' ? 0 : 99999,
          count: blankPageCount,
        };
        break;
      case 'crop-pdf':
        options = {
          top: cropUniform ? cropMarginTop : cropMarginTop,
          bottom: cropUniform ? cropMarginTop : cropMarginBottom,
          left: cropUniform ? cropMarginTop : cropMarginLeft,
          right: cropUniform ? cropMarginTop : cropMarginRight,
          applyToAll: cropApplyToAll,
        };
        break;
      case 'encrypt-pdf':
        options = {
          userPassword,
          ownerPassword: ownerPassword || userPassword,
          permissions: {
            printing: allowPrinting,
            copying: allowCopying,
            modifying: allowModifying,
            annotating: allowAnnotating,
            fillingForms: allowFillingForms,
            contentAccessibility: true,
            documentAssembly: false,
          },
        };
        break;
      case 'remove-restrictions':
      case 'decrypt-pdf':
        options = {
          ownerPassword: decryptPassword,
          userPassword: decryptPassword,
        };
        break;
      case 'header-footer':
        options = {
          headerLeft,
          headerCenter,
          headerRight,
          footerLeft,
          footerCenter,
          footerRight,
          fontSize: hfFontSize,
          skipFirstPage: hfSkipFirstPage,
        };
        break;
      case 'add-stamps':
        options = {
          stamp: selectedStamp,
          position: stampPosition,
          opacity: stampOpacity,
        };
        break;
      case 'n-up-pdf':
        options = {
          pagesPerSheet: nUpPages,
          addBorder: nUpBorder,
          orientation: nUpOrientation,
          pageSize: nUpPageSize,
          useMargins: true,
        };
        break;
      case 'posterize-pdf': {
        const [r, c] = posterizeGrid.split('x').map((n) => parseInt(n, 10));
        options = {
          rows: r,
          cols: c,
          overlap: posterizeOverlap,
          pageSize: posterizePageSize,
          scalingMode: 'fit',
        };
        break;
      }
      case 'fix-page-size':
      case 'page-dimensions':
        options = {
          sizePreset: pageSizePreset,
          scaleMode: pageSizeScaleMode,
          orientation: pageSizeOrientation,
          maintainAspectRatio: true,
        };
        break;
      case 'add-page-labels':
        options = {
          rules: [
            {
              pageRange: labelRange,
              style: labelStyle,
              prefix: labelPrefix,
              startValue: labelStartValue,
            },
          ],
        };
        break;
      case 'timestamp-pdf':
        options = {
          tsaServer,
        };
        break;
      case 'rasterize-pdf':
        options = {
          dpi: rasterizeDpi,
          format: 'pdf',
          quality: 0.92,
          grayscale: rasterizeGrayscale,
          backgroundColor: 'white',
        };
        break;
      case 'ocr-pdf':
        options = {
          languages: ocrLanguage === 'chi_sim' ? ['chi_sim', 'eng'] : [ocrLanguage],
          outputFormat: ocrOutputFormat,
          preserveLayout: true,
          enhanceContrast: ocrEnhanceContrast,
        };
        break;
      case 'merge-pdf':
      case 'alternate-merge':
      case 'image-to-pdf':
        options = {
          additionalFiles: appendFiles,
        };
        break;
      case 'pdf-to-image':
      case 'pdf-to-jpg':
      case 'pdf-to-png':
      case 'pdf-to-webp':
        options = {
          format: normId === 'pdf-to-png' ? 'png' : normId === 'pdf-to-webp' ? 'webp' : exportImageFormat,
          quality: exportImageQuality / 100,
          scale: exportDpi === 300 ? 4 : exportDpi === 72 ? 1 : 2,
        };
        break;
      default:
        options = {
          ...getToolDefaultOptions(normId, validLocale),
          ...dynamicOptions,
        };
        break;
    }

    if (executionType === 'export' && onExport) {
      await onExport(toolId, options);
    } else {
      await onApply(toolId, options);
    }
  };

  const configuredToolIds = [
    // Core organize & edit
    'rotate-pdf',
    'add-watermark',
    'compress-pdf',
    'page-numbers',
    'delete-pages',
    'extract-pages',
    'add-blank-page',
    'crop-pdf',
    'encrypt-pdf',
    'remove-restrictions',
    'decrypt-pdf',
    'header-footer',
    'add-stamps',
    'n-up-pdf',
    'posterize-pdf',
    'fix-page-size',
    'page-dimensions',
    'add-page-labels',
    'timestamp-pdf',
    'rasterize-pdf',
    'ocr-pdf',
    // Organize & Page tools
    'split-pdf',
    'divide-pages',
    'combine-single-page',
    'grid-combine',
    'overlay-pdf',
    'pdf-booklet',
    'photo-tiling-prepress',
    'pdf-lossless-slicer',
    'passport-id-composer',
    'pdf-two-column-reflower',
    'pdf-spine-bookbinder',
    'pdf-page-resizer-uniform',
    'pdf-scratchpad-canvas',
    'table-of-contents',
    'bookmark',
    'edit-metadata',
    // Edit & Annotate tools
    'text-color',
    'background-color',
    'interactive-toc-generator',
    'bookmarks-auto-generator',
    'batch-barcode-injector',
    'signature-ink-optimizer',
    'remove-blank-pages',
    'remove-annotations',
    // Security & Protect tools
    'sanitize-pdf',
    'deep-sanitize',
    'find-and-redact',
    'redact-pdf',
    'smart-data-redactor',
    'change-permissions',
    'digital-sign-pdf',
    'cert-cryptor',
    'pdf-signature-anchor-helper',
    // Optimize & Repair tools
    'linearize-pdf',
    'deskew-pdf',
    'pdf-deskew-aligner',
    'pdf-to-pdfa',
    'font-to-outline',
    'ocg-manager',
    'eink-optimizer',
    'batch-watermark-remover',
    'dead-link-debugger',
    'handwriting-ink-contrast-booster',
    // Export & Extraction tools
    'pdf-to-markdown',
    'pdf-to-json',
    'pdf-to-tiff',
    'pdf-to-svg',
    'pdf-to-cbz',
    'pdf-to-pptx',
    'extract-images',
    'extract-tables',
    'annotation-exporter',
    'global-invoice-parser',
    'pdf-to-slide',
    'pdf-to-zip',
    // Import & Append tools
    'markdown-to-pdf',
    'json-to-pdf',
    'txt-to-pdf',
    'email-to-pdf',
    'cbz-to-pdf',
    'djvu-to-pdf',
    'psd-to-pdf',
  ];

  return (
    <div className="w-88 sm:w-96 border-l border-[hsl(var(--color-border))] bg-[hsl(var(--color-card)/0.96)] backdrop-blur-md flex flex-col flex-shrink-0 z-20 shadow-2xl transition-all animate-in slide-in-from-right-4 duration-200">
      {/* Drawer Header */}
      <div className="h-12 border-b border-[hsl(var(--color-border))] px-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <SlidersHorizontal className="w-4 h-4 text-[hsl(var(--color-primary))] flex-shrink-0" />
          <span className="text-sm font-bold text-[hsl(var(--color-foreground))] truncate">
            {title}
          </span>
        </div>
        <button
          onClick={onClose}
          disabled={isApplying}
          className="p-1 rounded-lg hover:bg-[hsl(var(--color-muted))] text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))] transition-colors"
          aria-label="Close drawer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-5 flex flex-col justify-between">
        <div className="space-y-4">
          <p className="text-xs text-[hsl(var(--color-muted-foreground))] leading-relaxed">
            {description}
          </p>

          {/* 1. Rotate Tool Form (Alighed with RotatePDFTool) */}
          {normId === 'rotate-pdf' && (
            <div className="space-y-3.5">
              {/* Mode switch: Preset vs Stepless Calibration */}
              <div className="flex rounded-lg p-0.5 bg-[hsl(var(--color-muted))] border border-[hsl(var(--color-border))] text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setRotateMode('preset')}
                  className={`flex-1 py-1 rounded-md transition-all ${
                    rotateMode === 'preset'
                      ? 'bg-[hsl(var(--color-card))] text-[hsl(var(--color-foreground))] shadow-sm font-bold'
                      : 'text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))]'
                  }`}
                >
                  {getStudioText(validLocale, 'k0094')}
                </button>
                <button
                  type="button"
                  onClick={() => setRotateMode('stepless')}
                  className={`flex-1 py-1 rounded-md transition-all ${
                    rotateMode === 'stepless'
                      ? 'bg-[hsl(var(--color-card))] text-[hsl(var(--color-foreground))] shadow-sm font-bold'
                      : 'text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))]'
                  }`}
                >
                  {getStudioText(validLocale, 'k0095')}
                </button>
              </div>

              {rotateMode === 'preset' ? (
                <div>
                  <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1.5">
                    {getStudioText(validLocale, 'k0096')}
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { deg: 90, label: getStudioText(validLocale, 'k0097') },
                      { deg: 180, label: getStudioText(validLocale, 'k0098') },
                      { deg: 270, label: getStudioText(validLocale, 'k0099') },
                      { deg: -90, label: '-90°' },
                    ].map((item) => (
                      <button
                        key={item.deg}
                        type="button"
                        onClick={() => setRotateAngle(item.deg)}
                        className={`py-2 px-1 text-xs rounded-xl border font-medium text-center transition-all ${
                          rotateAngle === item.deg
                            ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] font-bold'
                            : 'border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]'
                        }`}
                      >
                        {item.deg > 0 ? `+${item.deg}°` : `${item.deg}°`}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-[hsl(var(--color-foreground))]">{getStudioText(validLocale, 'k0100')}</span>
                    <span className="text-[hsl(var(--color-primary))] font-bold">{steplessAngle > 0 ? `+${steplessAngle}°` : `${steplessAngle}°`}</span>
                  </div>
                  <input
                    type="range"
                    min="-45"
                    max="45"
                    step="0.5"
                    value={steplessAngle}
                    onChange={(e) => setSteplessAngle(parseFloat(e.target.value))}
                    className="w-full accent-[hsl(var(--color-primary))]"
                  />
                  <div className="flex justify-between text-[10px] text-[hsl(var(--color-muted-foreground))]">
                    <span>-45°</span>
                    <span>0°</span>
                    <span>+45°</span>
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1.5">
                  {getStudioText(validLocale, 'k0101')}
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { key: 'all', label: getStudioText(locale, 'k0054') },
                    { key: 'odd', label: getStudioText(validLocale, 'k0102') },
                    { key: 'even', label: getStudioText(validLocale, 'k0103') },
                    { key: 'custom', label: getStudioText(validLocale, 'k0104') },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setRotateScope(item.key as any)}
                      className={`py-1.5 text-xs rounded-lg border font-medium transition-all ${
                        rotateScope === item.key
                          ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] font-bold'
                          : 'border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {rotateScope === 'custom' && (
                <input
                  type="text"
                  value={rotateCustomPages}
                  onChange={(e) => setRotateCustomPages(e.target.value)}
                  placeholder={getStudioText(validLocale, 'k0105')}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))]"
                />
              )}
            </div>
          )}

          {/* 2. Watermark Tool Form (Aligned with WatermarkTool) */}
          {normId === 'add-watermark' && (
            <div className="space-y-3.5">
              {/* Type Switcher */}
              <div className="flex rounded-lg p-0.5 bg-[hsl(var(--color-muted))] border border-[hsl(var(--color-border))] text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setWatermarkType('text')}
                  className={`flex-1 py-1 rounded-md transition-all flex items-center justify-center gap-1.5 ${
                    watermarkType === 'text'
                      ? 'bg-[hsl(var(--color-card))] text-[hsl(var(--color-foreground))] shadow-sm font-bold'
                      : 'text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))]'
                  }`}
                >
                  <Type className="w-3.5 h-3.5" />
                  <span>{getStudioText(validLocale, 'k0106')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setWatermarkType('image')}
                  className={`flex-1 py-1 rounded-md transition-all flex items-center justify-center gap-1.5 ${
                    watermarkType === 'image'
                      ? 'bg-[hsl(var(--color-card))] text-[hsl(var(--color-foreground))] shadow-sm font-bold'
                      : 'text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))]'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>{getStudioText(validLocale, 'k0107')}</span>
                </button>
              </div>

              {watermarkType === 'text' ? (
                <>
                  <div>
                    <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                      {getStudioText(validLocale, 'k0108')}
                    </label>
                    <input
                      type="text"
                      value={watermarkText}
                      onChange={(e) => setWatermarkText(e.target.value)}
                      placeholder="CONFIDENTIAL"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-primary))]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-[hsl(var(--color-foreground))]">{getStudioText(validLocale, 'k0109')}</span>
                        <span className="text-[hsl(var(--color-primary))] font-bold">{watermarkFontSize} pt</span>
                      </div>
                      <input
                        type="range"
                        min="16"
                        max="100"
                        value={watermarkFontSize}
                        onChange={(e) => setWatermarkFontSize(parseInt(e.target.value, 10))}
                        className="w-full accent-[hsl(var(--color-primary))]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                        {getStudioText(validLocale, 'k0110')}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={watermarkColorHex}
                          onChange={(e) => setWatermarkColorHex(e.target.value)}
                          className="w-8 h-8 rounded-lg cursor-pointer border border-[hsl(var(--color-border))] p-0.5 bg-transparent"
                        />
                        <span className="text-xs font-mono text-[hsl(var(--color-muted-foreground))]">{watermarkColorHex.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                    {getStudioText(validLocale, 'k0111')}
                  </label>
                  <label className="border-2 border-dashed border-[hsl(var(--color-border))] hover:border-[hsl(var(--color-primary))] rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[hsl(var(--color-muted)/0.2)]">
                    <ImageIcon className="w-5 h-5 text-[hsl(var(--color-muted-foreground))] mb-1" />
                    <span className="text-xs font-medium text-[hsl(var(--color-foreground))] truncate max-w-[180px]">
                      {watermarkImageFile ? watermarkImageFile.name : (getStudioText(validLocale, 'k0112'))}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) setWatermarkImageFile(e.target.files[0]);
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {/* Angle & Opacity Sliders */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-[hsl(var(--color-foreground))]">{getStudioText(validLocale, 'k0113')}</span>
                    <span className="text-[hsl(var(--color-primary))] font-bold">{watermarkAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min="-90"
                    max="90"
                    step="5"
                    value={watermarkAngle}
                    onChange={(e) => setWatermarkAngle(parseInt(e.target.value, 10))}
                    className="w-full accent-[hsl(var(--color-primary))]"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-[hsl(var(--color-foreground))]">{getStudioText(validLocale, 'k0114')}</span>
                    <span className="text-[hsl(var(--color-primary))] font-bold">{Math.round(watermarkOpacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.9"
                    step="0.05"
                    value={watermarkOpacity}
                    onChange={(e) => setWatermarkOpacity(parseFloat(e.target.value))}
                    className="w-full accent-[hsl(var(--color-primary))]"
                  />
                </div>
              </div>

              {/* Position and Tile Repeat */}
              <div>
                <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1.5">
                  {getStudioText(validLocale, 'k0115')}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { key: 'top-left', label: getStudioText(validLocale, 'k0116') },
                    { key: 'top-center', label: getStudioText(validLocale, 'k0117') },
                    { key: 'top-right', label: getStudioText(validLocale, 'k0118') },
                    { key: 'bottom-left', label: getStudioText(validLocale, 'k0119') },
                    { key: 'center', label: getStudioText(validLocale, 'k0120') },
                    { key: 'bottom-right', label: getStudioText(validLocale, 'k0121') },
                  ].map((pos) => (
                    <button
                      key={pos.key}
                      type="button"
                      onClick={() => setWatermarkPosition(pos.key)}
                      className={`py-1.5 text-[11px] rounded-lg border font-medium transition-all ${
                        watermarkPosition === pos.key
                          ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] font-bold'
                          : 'border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]'
                      }`}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-[hsl(var(--color-foreground))] cursor-pointer pt-1 border-t border-[hsl(var(--color-border))]">
                <input
                  type="checkbox"
                  checked={watermarkTile}
                  onChange={(e) => setWatermarkTile(e.target.checked)}
                  className="rounded text-[hsl(var(--color-primary))] accent-[hsl(var(--color-primary))]"
                />
                <span>{getStudioText(validLocale, 'k0122')}</span>
              </label>
            </div>
          )}

          {/* 3. Compress Tool Form (Aligned with CompressPDFTool) */}
          {normId === 'compress-pdf' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                  {getStudioText(validLocale, 'k0123')}
                </label>
                <div className="space-y-1.5">
                  {[
                    { key: 'low', label: getStudioText(validLocale, 'k0124') },
                    { key: 'medium', label: getStudioText(validLocale, 'k0125') },
                    { key: 'high', label: getStudioText(validLocale, 'k0126') },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setCompressQuality(item.key as any)}
                      className={`w-full py-2.5 px-3 text-xs rounded-xl border text-left font-medium transition-all ${
                        compressQuality === item.key
                          ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] font-bold'
                          : 'border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced Compress Options */}
              <div className="space-y-2 pt-2 border-t border-[hsl(var(--color-border))]">
                <label className="flex items-center gap-2 text-xs text-[hsl(var(--color-foreground))] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={compressOptimizeImages}
                    onChange={(e) => setCompressOptimizeImages(e.target.checked)}
                    className="rounded text-[hsl(var(--color-primary))] accent-[hsl(var(--color-primary))]"
                  />
                  <span>{getStudioText(validLocale, 'k0127')}</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-[hsl(var(--color-foreground))] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={compressRemoveMetadata}
                    onChange={(e) => setCompressRemoveMetadata(e.target.checked)}
                    className="rounded text-[hsl(var(--color-primary))] accent-[hsl(var(--color-primary))]"
                  />
                  <span>{getStudioText(validLocale, 'k0128')}</span>
                </label>
              </div>
            </div>
          )}

          {/* 4. Page Numbers Form (Aligned with PageNumbersTool) */}
          {normId === 'page-numbers' && (
            <div className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1.5">
                  {getStudioText(validLocale, 'k0129')}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { key: 'top-left', label: getStudioText(validLocale, 'k0130') },
                    { key: 'top-center', label: getStudioText(validLocale, 'k0131') },
                    { key: 'top-right', label: getStudioText(validLocale, 'k0132') },
                    { key: 'bottom-left', label: getStudioText(validLocale, 'k0133') },
                    { key: 'bottom-center', label: getStudioText(validLocale, 'k0134') },
                    { key: 'bottom-right', label: getStudioText(validLocale, 'k0135') },
                  ].map((pos) => (
                    <button
                      key={pos.key}
                      type="button"
                      onClick={() => setPageNumberPos(pos.key as any)}
                      className={`py-1.5 px-2 text-[11px] rounded-lg border font-medium text-center transition-all ${
                        pageNumberPos === pos.key
                          ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] font-bold'
                          : 'border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]'
                      }`}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1.5">
                  {getStudioText(validLocale, 'k0136')}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { key: 'number', label: '1, 2, 3...' },
                    { key: 'page-of-total', label: '1 / 10' },
                    { key: 'roman', label: 'i, ii, iii...' },
                  ].map((fmt) => (
                    <button
                      key={fmt.key}
                      type="button"
                      onClick={() => setPageNumberFormat(fmt.key as any)}
                      className={`py-1.5 px-2 text-xs rounded-lg border font-medium text-center transition-all ${
                        pageNumberFormat === fmt.key
                          ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] font-bold'
                          : 'border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]'
                      }`}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                    {getStudioText(validLocale, 'k0137')}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={pageNumberStart}
                    onChange={(e) => setPageNumberStart(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                    {getStudioText(validLocale, 'k0138')}
                  </label>
                  <input
                    type="number"
                    min="8"
                    max="24"
                    value={pageNumberFontSize}
                    onChange={(e) => setPageNumberFontSize(parseInt(e.target.value, 10) || 10)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))]"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-1 border-t border-[hsl(var(--color-border))]">
                <label className="flex items-center gap-2 text-xs text-[hsl(var(--color-foreground))] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pageNumberSkipFirst}
                    onChange={(e) => setPageNumberSkipFirst(e.target.checked)}
                    className="rounded text-[hsl(var(--color-primary))] accent-[hsl(var(--color-primary))]"
                  />
                  <span>{getStudioText(validLocale, 'k0139')}</span>
                </label>
              </div>
            </div>
          )}

          {/* 5. Delete Pages Form */}
          {normId === 'delete-pages' && (
            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                {getStudioText(validLocale, 'k0140')}
              </label>
              <input
                type="text"
                value={deletePagesInput}
                onChange={(e) => setDeletePagesInput(e.target.value)}
                placeholder="1, 3, 5-7"
                className="w-full px-3 py-2 text-xs rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-primary))]"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  { label: getStudioText(validLocale, 'k0141'), val: '1' },
                  { label: getStudioText(validLocale, 'k0142'), val: '99999' },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setDeletePagesInput(item.val)}
                    className="text-[10px] px-2 py-0.5 rounded border border-[hsl(var(--color-border))] hover:bg-[hsl(var(--color-muted))] text-[hsl(var(--color-muted-foreground))]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-[hsl(var(--color-muted-foreground))]">
                {getStudioText(validLocale, 'k0143')}
              </p>
            </div>
          )}

          {/* 6. Extract Pages Form (Aligned with ExtractPagesTool) */}
          {normId === 'extract-pages' && (
            <div className="space-y-2.5">
              <div>
                <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                  {getStudioText(validLocale, 'k0144')}
                </label>
                <input
                  type="text"
                  value={extractPagesInput}
                  onChange={(e) => setExtractPagesInput(e.target.value)}
                  placeholder="1-3, 5"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-primary))]"
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: getStudioText(validLocale, 'k0145'), val: '1-3' },
                  { label: getStudioText(validLocale, 'k0146'), val: '1' },
                  { label: getStudioText(validLocale, 'k0147'), val: '1, 3, 5, 7, 9' },
                  { label: getStudioText(validLocale, 'k0148'), val: '2, 4, 6, 8, 10' },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setExtractPagesInput(item.val)}
                    className="text-[11px] px-2.5 py-1 rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] hover:border-[hsl(var(--color-primary))] text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                {getStudioText(validLocale, 'k0149')}
              </p>
            </div>
          )}

          {/* 7. Add Blank Page Form */}
          {normId === 'add-blank-page' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                  {getStudioText(validLocale, 'k0150')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'first', label: getStudioText(validLocale, 'k0151') },
                    { key: 'last', label: getStudioText(validLocale, 'k0152') },
                  ].map((pos) => (
                    <button
                      key={pos.key}
                      type="button"
                      onClick={() => setBlankPagePos(pos.key as any)}
                      className={`py-2 px-3 text-xs rounded-xl border font-medium text-center transition-all ${
                        blankPagePos === pos.key
                          ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] font-bold'
                          : 'border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]'
                      }`}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                  {getStudioText(validLocale, 'k0153')}
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={blankPageCount}
                  onChange={(e) => setBlankPageCount(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))]"
                />
              </div>
            </div>
          )}

          {/* 8. Crop Tool Form (Aligned with CropPDFTool) */}
          {normId === 'crop-pdf' && (
            <div className="space-y-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-[hsl(var(--color-foreground))]">{getStudioText(validLocale, 'k0154')}</span>
                <span className="text-[hsl(var(--color-primary))] font-bold">{cropMarginTop} pt</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: getStudioText(validLocale, 'k0155'), val: 10 },
                  { label: getStudioText(validLocale, 'k0156'), val: 20 },
                  { label: getStudioText(validLocale, 'k0157'), val: 40 },
                ].map((preset) => (
                  <button
                    key={preset.val}
                    type="button"
                    onClick={() => {
                      setCropMarginTop(preset.val);
                      setCropMarginBottom(preset.val);
                      setCropMarginLeft(preset.val);
                      setCropMarginRight(preset.val);
                    }}
                    className={`py-1.5 px-2 text-xs rounded-lg border font-medium transition-all ${
                      cropMarginTop === preset.val
                        ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] font-bold'
                        : 'border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <input
                type="range"
                min="5"
                max="80"
                step="5"
                value={cropMarginTop}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10);
                  setCropMarginTop(v);
                  setCropMarginBottom(v);
                  setCropMarginLeft(v);
                  setCropMarginRight(v);
                }}
                className="w-full accent-[hsl(var(--color-primary))]"
              />

              <div className="pt-2 border-t border-[hsl(var(--color-border))]">
                <label className="flex items-center gap-2 text-xs text-[hsl(var(--color-foreground))] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cropApplyToAll}
                    onChange={(e) => setCropApplyToAll(e.target.checked)}
                    className="rounded text-[hsl(var(--color-primary))] accent-[hsl(var(--color-primary))]"
                  />
                  <span>{getStudioText(validLocale, 'k0158')}</span>
                </label>
              </div>
            </div>
          )}

          {/* 9. Encrypt Tool Form (Aligned with EncryptPDFTool) */}
          {normId === 'encrypt-pdf' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                  {getStudioText(validLocale, 'k0159')}
                </label>
                <input
                  type="password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-primary))]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                  {getStudioText(validLocale, 'k0160')}
                </label>
                <input
                  type="password"
                  value={ownerPassword}
                  onChange={(e) => setOwnerPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-primary))]"
                />
              </div>

              <div className="space-y-2 pt-1 border-t border-[hsl(var(--color-border))]">
                <label className="flex items-center gap-2 text-xs text-[hsl(var(--color-foreground))] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowPrinting}
                    onChange={(e) => setAllowPrinting(e.target.checked)}
                    className="rounded text-[hsl(var(--color-primary))] accent-[hsl(var(--color-primary))]"
                  />
                  <span>{getStudioText(validLocale, 'k0161')}</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-[hsl(var(--color-foreground))] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowCopying}
                    onChange={(e) => setAllowCopying(e.target.checked)}
                    className="rounded text-[hsl(var(--color-primary))] accent-[hsl(var(--color-primary))]"
                  />
                  <span>{getStudioText(validLocale, 'k0162')}</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-[hsl(var(--color-foreground))] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowAnnotating}
                    onChange={(e) => setAllowAnnotating(e.target.checked)}
                    className="rounded text-[hsl(var(--color-primary))] accent-[hsl(var(--color-primary))]"
                  />
                  <span>{getStudioText(validLocale, 'k0163')}</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-[hsl(var(--color-foreground))] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowFillingForms}
                    onChange={(e) => setAllowFillingForms(e.target.checked)}
                    className="rounded text-[hsl(var(--color-primary))] accent-[hsl(var(--color-primary))]"
                  />
                  <span>{getStudioText(validLocale, 'k0164')}</span>
                </label>
              </div>
            </div>
          )}

          {/* 10. Decrypt / Remove Restrictions Form */}
          {(normId === 'remove-restrictions' || normId === 'decrypt-pdf') && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                  {getStudioText(validLocale, 'k0165')}
                </label>
                <div className="relative">
                  <input
                    type={showDecryptPassword ? 'text' : 'password'}
                    value={decryptPassword}
                    onChange={(e) => setDecryptPassword(e.target.value)}
                    placeholder={getStudioText(validLocale, 'k0166')}
                    className="w-full px-3 py-2 pr-9 text-xs rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-primary))]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowDecryptPassword(!showDecryptPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))]"
                  >
                    {showDecryptPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[hsl(var(--color-muted)/0.3)] border border-[hsl(var(--color-border))] space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[hsl(var(--color-foreground))]">
                  <Unlock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{getStudioText(validLocale, 'k0167')}</span>
                </div>
                <p className="text-[11px] text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                  {getStudioText(validLocale, 'k0168')}
                </p>
              </div>
            </div>
          )}

          {/* 11. Header & Footer Form (Aligned with HeaderFooterTool) */}
          {normId === 'header-footer' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                  {getStudioText(validLocale, 'k0169')}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <input
                    type="text"
                    value={headerLeft}
                    onChange={(e) => setHeaderLeft(e.target.value)}
                    placeholder={getStudioText(validLocale, 'k0170')}
                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))]"
                  />
                  <input
                    type="text"
                    value={headerCenter}
                    onChange={(e) => setHeaderCenter(e.target.value)}
                    placeholder={getStudioText(validLocale, 'k0171')}
                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))]"
                  />
                  <input
                    type="text"
                    value={headerRight}
                    onChange={(e) => setHeaderRight(e.target.value)}
                    placeholder={getStudioText(validLocale, 'k0172')}
                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))]"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                  {getStudioText(validLocale, 'k0173')}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <input
                    type="text"
                    value={footerLeft}
                    onChange={(e) => setFooterLeft(e.target.value)}
                    placeholder={getStudioText(validLocale, 'k0174')}
                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))]"
                  />
                  <input
                    type="text"
                    value={footerCenter}
                    onChange={(e) => setFooterCenter(e.target.value)}
                    placeholder={getStudioText(validLocale, 'k0175')}
                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))]"
                  />
                  <input
                    type="text"
                    value={footerRight}
                    onChange={(e) => setFooterRight(e.target.value)}
                    placeholder={getStudioText(validLocale, 'k0176')}
                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))]"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-[hsl(var(--color-border))]">
                <label className="flex items-center gap-2 text-xs text-[hsl(var(--color-foreground))] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hfSkipFirstPage}
                    onChange={(e) => setHfSkipFirstPage(e.target.checked)}
                    className="rounded text-[hsl(var(--color-primary))] accent-[hsl(var(--color-primary))]"
                  />
                  <span>{getStudioText(validLocale, 'k0177')}</span>
                </label>
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-[hsl(var(--color-muted-foreground))]">{getStudioText(validLocale, 'k0178')}</span>
                  <input
                    type="number"
                    min="8"
                    max="18"
                    value={hfFontSize}
                    onChange={(e) => setHfFontSize(parseInt(e.target.value, 10) || 10)}
                    className="w-12 px-1.5 py-1 text-xs rounded border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 12. Stamps Form */}
          {normId === 'add-stamps' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-2">
                  {getStudioText(validLocale, 'k0179')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['CONFIDENTIAL', 'APPROVED', 'DRAFT', 'URGENT', 'FINAL', 'VOID'].map((stamp) => (
                    <button
                      key={stamp}
                      type="button"
                      onClick={() => setSelectedStamp(stamp)}
                      className={`py-2 px-3 text-xs rounded-xl border font-bold tracking-wider text-center transition-all ${
                        selectedStamp === stamp
                          ? 'border-red-500 bg-red-500/10 text-red-500'
                          : 'border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]'
                      }`}
                    >
                      {stamp}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                  {getStudioText(validLocale, 'k0180')}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { key: 'center', label: getStudioText(validLocale, 'k0181') },
                    { key: 'top-right', label: getStudioText(validLocale, 'k0182') },
                    { key: 'bottom-right', label: getStudioText(validLocale, 'k0183') },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setStampPosition(item.key as any)}
                      className={`py-1.5 text-xs rounded-lg border font-medium text-center transition-all ${
                        stampPosition === item.key
                          ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] font-bold'
                          : 'border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 13. N-Up PDF Form (Aligned with NUpPDFTool) */}
          {normId === 'n-up-pdf' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1.5">
                  {getStudioText(validLocale, 'k0184')}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { count: 2, label: '2-Up' },
                    { count: 4, label: '4-Up' },
                    { count: 9, label: '9-Up' },
                    { count: 16, label: '16-Up' },
                  ].map((item) => (
                    <button
                      key={item.count}
                      type="button"
                      onClick={() => setNUpPages(item.count as any)}
                      className={`py-2 text-xs rounded-xl border font-bold text-center transition-all ${
                        nUpPages === item.count
                          ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] font-bold'
                          : 'border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                    {getStudioText(validLocale, 'k0185')}
                  </label>
                  <select
                    value={nUpOrientation}
                    onChange={(e) => setNUpOrientation(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))]"
                  >
                    <option value="auto">{getStudioText(validLocale, 'k0186')}</option>
                    <option value="portrait">{getStudioText(validLocale, 'k0187')}</option>
                    <option value="landscape">{getStudioText(validLocale, 'k0188')}</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                    {getStudioText(validLocale, 'k0189')}
                  </label>
                  <select
                    value={nUpPageSize}
                    onChange={(e) => setNUpPageSize(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))]"
                  >
                    <option value="A4">A4 (210×297mm)</option>
                    <option value="Letter">Letter (8.5×11in)</option>
                    <option value="A3">A3 (297×420mm)</option>
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-2 text-xs text-[hsl(var(--color-foreground))] cursor-pointer pt-1 border-t border-[hsl(var(--color-border))]">
                <input
                  type="checkbox"
                  checked={nUpBorder}
                  onChange={(e) => setNUpBorder(e.target.checked)}
                  className="rounded text-[hsl(var(--color-primary))] accent-[hsl(var(--color-primary))]"
                />
                <span>{getStudioText(validLocale, 'k0190')}</span>
              </label>
            </div>
          )}

          {/* 14. Posterize PDF Form (Aligned with PosterizePDFTool) */}
          {normId === 'posterize-pdf' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1.5">
                  {getStudioText(validLocale, 'k0191')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: '2x2', label: getStudioText(validLocale, 'k0192') },
                    { key: '3x3', label: getStudioText(validLocale, 'k0193') },
                    { key: '2x1', label: getStudioText(validLocale, 'k0194') },
                    { key: '1x2', label: getStudioText(validLocale, 'k0195') },
                  ].map((grid) => (
                    <button
                      key={grid.key}
                      type="button"
                      onClick={() => setPosterizeGrid(grid.key as any)}
                      className={`py-2 px-2 text-xs rounded-xl border font-medium text-center transition-all ${
                        posterizeGrid === grid.key
                          ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] font-bold'
                          : 'border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]'
                      }`}
                    >
                      {grid.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                  {getStudioText(validLocale, 'k0196')}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: getStudioText(validLocale, 'k0197'), val: 0 },
                    { label: getStudioText(validLocale, 'k0198'), val: 15 },
                    { label: getStudioText(validLocale, 'k0199'), val: 30 },
                  ].map((item) => (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => setPosterizeOverlap(item.val)}
                      className={`py-1.5 text-xs rounded-lg border font-medium text-center transition-all ${
                        posterizeOverlap === item.val
                          ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] font-bold'
                          : 'border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 15. Fix Page Size Form */}
          {(normId === 'fix-page-size' || normId === 'page-dimensions') && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1.5">
                  {getStudioText(validLocale, 'k0200')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'a4', label: 'A4 (210×297mm)' },
                    { key: 'letter', label: 'Letter (8.5×11in)' },
                    { key: 'a3', label: 'A3 (297×420mm)' },
                    { key: 'a5', label: 'A5 (148×210mm)' },
                  ].map((p) => (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => setPageSizePreset(p.key as any)}
                      className={`py-2 px-2 text-xs rounded-xl border font-medium text-center transition-all ${
                        pageSizePreset === p.key
                          ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] font-bold'
                          : 'border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                  {getStudioText(validLocale, 'k0201')}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { key: 'fit', label: getStudioText(validLocale, 'k0202') },
                    { key: 'fill', label: getStudioText(validLocale, 'k0203') },
                    { key: 'stretch', label: getStudioText(validLocale, 'k0204') },
                  ].map((m) => (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => setPageSizeScaleMode(m.key as any)}
                      className={`py-1.5 text-xs rounded-lg border font-medium text-center transition-all ${
                        pageSizeScaleMode === m.key
                          ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] font-bold'
                          : 'border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 16. Page Labels Form */}
          {normId === 'add-page-labels' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1.5">
                  {getStudioText(validLocale, 'k0205')}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { key: 'D', label: '1, 2, 3...' },
                    { key: 'r', label: 'i, ii, iii...' },
                    { key: 'R', label: 'I, II, III...' },
                    { key: 'a', label: 'a, b, c...' },
                    { key: 'A', label: 'A, B, C...' },
                  ].map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setLabelStyle(s.key as any)}
                      className={`py-1.5 text-xs rounded-lg border font-medium text-center transition-all ${
                        labelStyle === s.key
                          ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] font-bold'
                          : 'border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                    {getStudioText(validLocale, 'k0206')}
                  </label>
                  <input
                    type="text"
                    value={labelPrefix}
                    onChange={(e) => setLabelPrefix(e.target.value)}
                    placeholder="Page-"
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                    {getStudioText(validLocale, 'k0207')}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={labelStartValue}
                    onChange={(e) => setLabelStartValue(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 17. Timestamp Tool Form */}
          {normId === 'timestamp-pdf' && (
            <div className="space-y-3">
              <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                {getStudioText(validLocale, 'k0208')}
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'MeSign', desc: getStudioText(validLocale, 'k0209') },
                  { id: 'DigiCert', desc: getStudioText(validLocale, 'k0210') },
                  { id: 'Sectigo', desc: getStudioText(validLocale, 'k0211') },
                  { id: 'FreeTSA', desc: getStudioText(validLocale, 'k0212') },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTsaServer(item.id)}
                    className={`w-full py-2.5 px-3 text-xs rounded-xl border text-left font-medium transition-all ${
                      tsaServer === item.id
                        ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] font-bold'
                        : 'border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]'
                    }`}
                  >
                    {item.desc}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 18. Rasterize PDF Form */}
          {normId === 'rasterize-pdf' && (
            <div className="space-y-3">
              <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                {getStudioText(validLocale, 'k0213')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { dpi: 96, label: getStudioText(validLocale, 'k0214') },
                  { dpi: 150, label: getStudioText(validLocale, 'k0215') },
                  { dpi: 300, label: getStudioText(validLocale, 'k0216') },
                ].map((item) => (
                  <button
                    key={item.dpi}
                    type="button"
                    onClick={() => setRasterizeDpi(item.dpi)}
                    className={`py-2 px-1 text-xs rounded-xl border font-medium text-center transition-all ${
                      rasterizeDpi === item.dpi
                        ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] font-bold'
                        : 'border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 text-xs text-[hsl(var(--color-foreground))] cursor-pointer pt-1 border-t border-[hsl(var(--color-border))]">
                <input
                  type="checkbox"
                  checked={rasterizeGrayscale}
                  onChange={(e) => setRasterizeGrayscale(e.target.checked)}
                  className="rounded text-[hsl(var(--color-primary))] accent-[hsl(var(--color-primary))]"
                />
                <span>{getStudioText(validLocale, 'k0217')}</span>
              </label>
            </div>
          )}

          {/* Dynamic In-Place Tool Options (Organize, Edit, Security, Optimize) */}
          <OrganizeToolOptions
            toolId={normId}
            options={dynamicOptions}
            onChange={handleDynamicOptionChange}
            totalPages={totalPages}
            locale={locale}
          />
          <EditAnnotateToolOptions
            toolId={normId}
            options={dynamicOptions}
            onChange={handleDynamicOptionChange}
            totalPages={totalPages}
            locale={locale}
          />
          <SecurityToolOptions
            toolId={normId}
            options={dynamicOptions}
            onChange={handleDynamicOptionChange}
            totalPages={totalPages}
            locale={locale}
          />
          <OptimizeRepairToolOptions
            toolId={normId}
            options={dynamicOptions}
            onChange={handleDynamicOptionChange}
            totalPages={totalPages}
            locale={locale}
          />

          {/* 19. Append / Merge External Files */}
          {executionType === 'append' && (
            <div className="space-y-3">
              <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block">
                {getStudioText(validLocale, 'k0218')}
              </label>
              <label className="border-2 border-dashed border-[hsl(var(--color-border))] hover:border-[hsl(var(--color-primary))] rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[hsl(var(--color-muted)/0.3)]">
                <Upload className="w-5 h-5 text-[hsl(var(--color-muted-foreground))] mb-1" />
                <span className="text-xs font-medium text-[hsl(var(--color-foreground))]">
                  {getStudioText(validLocale, 'k0219')}
                </span>
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      setAppendFiles(Array.from(e.target.files));
                    }
                  }}
                  className="hidden"
                />
              </label>
              {/* Quick Add from Open Studio Documents */}
              {availableDocuments && availableDocuments.length > 0 && (
                <div className="space-y-1.5 pt-1 border-t border-[hsl(var(--color-border)/0.6)]">
                  <span className="text-[11px] font-semibold text-[hsl(var(--color-foreground))] block">
                    {getStudioText(validLocale, 'k0220')}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {availableDocuments.map((doc) => {
                      const isAdded = appendFiles.some((f) => f.name === doc.name);
                      return (
                        <button
                          key={doc.id}
                          type="button"
                          onClick={() => {
                            if (isAdded) {
                              setAppendFiles((prev) => prev.filter((f) => f.name !== doc.name));
                            } else {
                              const appendFile = new File([doc.currentBlob], doc.name, {
                                type: 'application/pdf',
                              });
                              setAppendFiles((prev) => [...prev, appendFile]);
                            }
                          }}
                          className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
                            isAdded
                              ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.15)] text-[hsl(var(--color-primary))] font-semibold'
                              : 'border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))] hover:border-[hsl(var(--color-primary)/0.4)]'
                          }`}
                        >
                          <FileText className="w-3 h-3 shrink-0" />
                          <span className="truncate max-w-[120px]">{doc.name}</span>
                          <span className="font-bold">{isAdded ? '✓' : '+'}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              {/* Dynamic Format Settings for Imported External Files */}
              <ImportAppendToolOptions
                toolId={normId}
                options={dynamicOptions}
                onChange={handleDynamicOptionChange}
                locale={locale}
              />
            </div>
          )}

          {/* 20. Export Tools Parameters (OCR / Images / Docx) */}
          {executionType === 'export' && (
            <div className="space-y-3">
              {/* Image Export Tool Options */}
              {['pdf-to-image', 'pdf-to-jpg', 'pdf-to-png', 'pdf-to-webp'].includes(normId) && (
                <div className="space-y-3 p-3 rounded-xl bg-[hsl(var(--color-muted)/0.3)] border border-[hsl(var(--color-border))]">
                  <div>
                    <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                      {getStudioText(validLocale, 'k0221')}
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { key: 'jpg', label: 'JPG' },
                        { key: 'png', label: 'PNG' },
                        { key: 'webp', label: 'WebP' },
                      ].map((fmt) => (
                        <button
                          key={fmt.key}
                          type="button"
                          onClick={() => setExportImageFormat(fmt.key as any)}
                          className={`py-1.5 text-xs rounded-lg border font-medium text-center transition-all ${
                            exportImageFormat === fmt.key
                              ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] font-bold'
                              : 'border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]'
                          }`}
                        >
                          {fmt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                      {getStudioText(validLocale, 'k0222')}
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { dpi: 72, label: getStudioText(validLocale, 'k0223') },
                        { dpi: 150, label: getStudioText(validLocale, 'k0224') },
                        { dpi: 300, label: getStudioText(validLocale, 'k0225') },
                      ].map((item) => (
                        <button
                          key={item.dpi}
                          type="button"
                          onClick={() => setExportDpi(item.dpi)}
                          className={`py-1.5 text-xs rounded-lg border font-medium text-center transition-all ${
                            exportDpi === item.dpi
                              ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] font-bold'
                              : 'border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-[hsl(var(--color-foreground))]">{getStudioText(validLocale, 'k0226')}</span>
                      <span className="text-[hsl(var(--color-primary))] font-bold">{exportImageQuality}%</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      step="5"
                      value={exportImageQuality}
                      onChange={(e) => setExportImageQuality(parseInt(e.target.value, 10))}
                      className="w-full accent-[hsl(var(--color-primary))]"
                    />
                  </div>
                </div>
              )}

              {/* OCR Tool Options */}
              {normId === 'ocr-pdf' && (
                <div className="space-y-3 p-3 rounded-xl bg-[hsl(var(--color-muted)/0.3)] border border-[hsl(var(--color-border))]">
                  <div>
                    <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                      {getStudioText(validLocale, 'k0227')}
                    </label>
                    <div className="space-y-1">
                      {[
                        { key: 'chi_sim', label: getStudioText(validLocale, 'k0228') },
                        { key: 'eng', label: getStudioText(validLocale, 'k0229') },
                        { key: 'chi_tra', label: getStudioText(validLocale, 'k0230') },
                        { key: 'jpn', label: getStudioText(validLocale, 'k0231') },
                      ].map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setOcrLanguage(item.key as any)}
                          className={`w-full py-1.5 px-2.5 text-xs rounded-lg border text-left font-medium transition-all ${
                            ocrLanguage === item.key
                              ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] font-bold'
                              : 'border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                      {getStudioText(validLocale, 'k0232')}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { key: 'searchable-pdf', label: getStudioText(validLocale, 'k0233') },
                        { key: 'text', label: getStudioText(validLocale, 'k0234') },
                      ].map((out) => (
                        <button
                          key={out.key}
                          type="button"
                          onClick={() => setOcrOutputFormat(out.key as any)}
                          className={`py-1.5 px-2 text-xs rounded-lg border font-medium text-center transition-all ${
                            ocrOutputFormat === out.key
                              ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] font-bold'
                              : 'border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]'
                          }`}
                        >
                          {out.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Format & Extraction Settings for Converted Files */}
              <ExportToolOptions
                toolId={normId}
                options={dynamicOptions}
                onChange={handleDynamicOptionChange}
                totalPages={totalPages}
                locale={locale}
              />

              {/* General Export Notice */}
              <div className="p-3 rounded-xl bg-[hsl(var(--color-muted)/0.3)] border border-[hsl(var(--color-border))] space-y-1">
                <span className="text-xs font-semibold text-[hsl(var(--color-foreground))] block">
                  {getStudioText(validLocale, 'k0235')}
                </span>
                <p className="text-[11px] text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                  {getStudioText(validLocale, 'k0236')}
                </p>
              </div>
            </div>
          )}

          {/* 21. Truly Zero-Config Instant Tools Card */}
          {executionType === 'in-place' &&
            !configuredToolIds.includes(normId) && (
              <div className="p-3.5 rounded-2xl bg-[hsl(var(--color-muted)/0.4)] border border-[hsl(var(--color-border))] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[hsl(var(--color-foreground))]">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>{getStudioText(validLocale, 'k0237')}</span>
                </div>
                <p className="text-[11px] text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                  {getStudioText(validLocale, 'k0238')}
                </p>
              </div>
            )}

          {/* 22. Navigate to Standalone Editor */}
          {executionType === 'navigate' && (
            <div className="p-3.5 rounded-2xl bg-[hsl(var(--color-muted)/0.4)] border border-[hsl(var(--color-border))] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[hsl(var(--color-foreground))]">
                <ExternalLink className="w-4 h-4 text-[hsl(var(--color-primary))]" />
                <span>{getStudioText(validLocale, 'k0239')}</span>
              </div>
              <p className="text-[11px] text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                {getStudioText(validLocale, 'k0240')}
              </p>
            </div>
          )}
        </div>

        {/* Drawer Actions */}
        <div className="pt-4 border-t border-[hsl(var(--color-border))] flex items-center gap-2 flex-shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isApplying}
            className="flex-1 text-xs"
          >
            {getStudioText(validLocale, 'k0241')}
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={isApplying}
            className="flex-1 text-xs shadow-sm"
          >
            {isApplying ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                <span>{getStudioText(validLocale, 'k0242')}</span>
              </>
            ) : executionType === 'export' ? (
              <>
                <Download className="w-3.5 h-3.5 mr-1.5" />
                <span>{getStudioText(validLocale, 'k0243')}</span>
              </>
            ) : executionType === 'append' ? (
              <>
                <Files className="w-3.5 h-3.5 mr-1.5" />
                <span>{getStudioText(validLocale, 'k0244')}</span>
              </>
            ) : executionType === 'navigate' ? (
              <>
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                <span>{getStudioText(validLocale, 'k0245')}</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5 mr-1.5" />
                <span>{getStudioText(validLocale, 'k0246')}</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
