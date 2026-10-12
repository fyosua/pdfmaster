import en from '@/messages/studio/en.json';
import zh from '@/messages/studio/zh.json';
import zhtw from '@/messages/studio/zh-TW.json';
import ja from '@/messages/studio/ja.json';
import ko from '@/messages/studio/ko.json';
import es from '@/messages/studio/es.json';
import fr from '@/messages/studio/fr.json';
import de from '@/messages/studio/de.json';
import pt from '@/messages/studio/pt.json';
import ar from '@/messages/studio/ar.json';
import it from '@/messages/studio/it.json';
import id from '@/messages/studio/id.json';
import vi from '@/messages/studio/vi.json';
import ro from '@/messages/studio/ro.json';
import pl from '@/messages/studio/pl.json';

// Per-locale studio dictionaries. English is the canonical fallback, so a
// locale that hasn't been translated yet shows English (never Chinese).
const dicts: Record<string, Record<string, string>> = {
  en, zh, 'zh-TW': zhtw, ja, ko, es, fr, de, pt, ar, it, id, vi, ro, pl,
};

type Params = Record<string, string | number>;

/**
 * Resolve + interpolate a studio key. Fallback chain: locale dict -> en.
 * If `params` provided, replaces ${token} placeholders with their values.
 */
export function getStudioText(
  locale: string,
  key: string,
  params?: Params
): string {
  const d: Record<string, string> | undefined = dicts[locale];
  const enR = en as Record<string, string>;
  let raw: string;
  if (d && key in d) raw = d[key];
  else raw = enR[key] ?? key;

  if (!params) return raw;
  return raw.replace(/\$\{([a-zA-Z0-9_.]+)\}/g, (_, name) => {
    const v = params[name];
    return v === undefined ? '' : String(v);
  });
}