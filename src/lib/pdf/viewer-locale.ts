/**
 * PDF.js viewer locale mapping.
 *
 * The PDF.js web viewer (public/pdfjs-viewer/viewer.html) supports a
 * `?locale=` query parameter (viewer.js AppOptions). Without it, the viewer
 * falls back to `navigator.language` (the browser's language), so a Chinese
 * browser would render the viewer UI in Mandarin even when the app page is
 * set to English. This helper maps the app's next-intl locale codes to the
 * locale directory names shipped under public/pdfjs-viewer/locale/.
 */
export const PDFJS_LOCALE_MAP: Record<string, string> = {
  en: 'en-US',
  zh: 'zh-CN',
  'zh-TW': 'zh-TW',
  pt: 'pt-PT',
  es: 'es-ES',
  // ar, de, fr, id, it, ja, ko, pl, ro, vi already match a PDF.js locale dir
};

/**
 * Convert an app locale code to a PDF.js viewer locale code.
 * Unknown codes pass through unchanged (viewer falls back to en-US then).
 */
export function toPdfjsLocale(locale: string): string {
  return PDFJS_LOCALE_MAP[locale] || locale;
}

/**
 * Build the PDF.js viewer URL for the given app locale so the embedded
 * viewer UI follows the app's selected language instead of the browser's.
 */
export function buildViewerUrl(basePath: string, locale: string): string {
  const query = `locale=${encodeURIComponent(toPdfjsLocale(locale))}`;
  return basePath.includes('?')
    ? `${basePath}&${query}`
    : `${basePath}?${query}`;
}