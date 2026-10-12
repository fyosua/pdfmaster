import { defaultLocale, isValidLocale, locales, type Locale } from '@/lib/i18n/config';

const LOCALE_STORAGE_KEY = 'NEXT_LOCALE';

function normalizeLocale(input: string): Locale | null {
  if (isValidLocale(input)) {
    return input;
  }

  const lower = input.toLowerCase();
  const exactMatch = locales.find((locale) => locale.toLowerCase() === lower);
  if (exactMatch) {
    return exactMatch;
  }

  const primary = lower.split('-')[0];
  const primaryMatch = locales.find((locale) => locale.toLowerCase() === primary);
  return primaryMatch ?? null;
}

export function getClientLocale(): Locale {
  // Officetools UI is English-only — always return the default locale.
  return defaultLocale;
}

export function setClientLocale(locale: string): Locale {
  const resolvedLocale = normalizeLocale(locale) ?? defaultLocale;

  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCALE_STORAGE_KEY, resolvedLocale);
    document.cookie = `${LOCALE_STORAGE_KEY}=${resolvedLocale};path=/;max-age=31536000`;
  }

  return resolvedLocale;
}
