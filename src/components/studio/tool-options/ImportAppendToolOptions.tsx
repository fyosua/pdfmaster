'use client';

import React from 'react';
import {
  FileText,
  FileCode,
  Mail,
  BookOpen,
  Image,
  Palette,
} from 'lucide-react';
import { getStudioText } from '@/lib/i18n/studio';
import type { Locale } from '@/lib/i18n/config';

interface ImportAppendToolOptionsProps {
  toolId: string;
  options: Record<string, any>;
  onChange: (key: string, value: any) => void;
  locale?: string;
}

export function ImportAppendToolOptions({
  toolId,
  options,
  onChange,
  locale = 'zh',
}: ImportAppendToolOptionsProps) {
  switch (toolId) {
    case 'markdown-to-pdf': {
      const pageSize = options.pageSize || 'a4';
      const theme = options.theme || 'github';
      const gfm = options.gfm ?? true;
      const syntaxHighlight = options.syntaxHighlight ?? true;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0361')}
            </label>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0362')}</label>
                <select
                  value={pageSize}
                  onChange={(e) => onChange('pageSize', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                >
                  <option value="a4">A4 (210×297mm)</option>
                  <option value="letter">US Letter</option>
                </select>
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0363')}</label>
                <select
                  value={theme}
                  onChange={(e) => onChange('theme', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                >
                  <option value="github">{getStudioText(locale as Locale, 'k0364')}</option>
                  <option value="light">{getStudioText(locale as Locale, 'k0365')}</option>
                  <option value="dark">{getStudioText(locale as Locale, 'k0366')}</option>
                </select>
              </div>
            </div>
            <div className="space-y-2 pt-2 text-xs">
              <label className="flex items-center justify-between cursor-pointer">
                <span>{getStudioText(locale as Locale, 'k0367')}</span>
                <input
                  type="checkbox"
                  checked={gfm}
                  onChange={(e) => onChange('gfm', e.target.checked)}
                  className="w-4 h-4 rounded text-primary"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span>{getStudioText(locale as Locale, 'k0368')}</span>
                <input
                  type="checkbox"
                  checked={syntaxHighlight}
                  onChange={(e) => onChange('syntaxHighlight', e.target.checked)}
                  className="w-4 h-4 rounded text-primary"
                />
              </label>
            </div>
          </div>
        </div>
      );
    }

    case 'json-to-pdf': {
      const pageSize = options.pageSize || 'A4';
      const fontSize = options.fontSize ?? 11;
      const indentSpaces = options.indentSpaces ?? 2;
      const showLineNumbers = options.showLineNumbers ?? true;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0369')}
            </label>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0370')}</label>
                <input
                  type="number"
                  min="8"
                  max="18"
                  value={fontSize}
                  onChange={(e) => onChange('fontSize', parseInt(e.target.value) || 11)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0371')}</label>
                <select
                  value={indentSpaces}
                  onChange={(e) => onChange('indentSpaces', parseInt(e.target.value) || 2)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                >
                  <option value={2}>{getStudioText(locale as Locale, 'k0372')}</option>
                  <option value={4}>{getStudioText(locale as Locale, 'k0373')}</option>
                </select>
              </div>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs">
              <span>{getStudioText(locale as Locale, 'k0374')}</span>
              <input
                type="checkbox"
                checked={showLineNumbers}
                onChange={(e) => onChange('showLineNumbers', e.target.checked)}
                className="w-4 h-4 rounded text-primary"
              />
            </div>
          </div>
        </div>
      );
    }

    case 'txt-to-pdf': {
      const fontSize = options.fontSize ?? 12;
      const lineHeight = options.lineHeight ?? 1.5;
      const fontId = options.fontId || 'helvetica';

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0375')}
            </label>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0370')}</label>
                <input
                  type="number"
                  min="9"
                  max="20"
                  value={fontSize}
                  onChange={(e) => onChange('fontSize', parseInt(e.target.value) || 12)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0376')}</label>
                <select
                  value={lineHeight}
                  onChange={(e) => onChange('lineHeight', parseFloat(e.target.value) || 1.5)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                >
                  <option value={1.2}>{getStudioText(locale as Locale, 'k0377')}</option>
                  <option value={1.5}>{getStudioText(locale as Locale, 'k0378')}</option>
                  <option value={1.8}>{getStudioText(locale as Locale, 'k0379')}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'email-to-pdf': {
      const includeCcBcc = options.includeCcBcc ?? true;
      const includeAttachments = options.includeAttachments ?? true;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0380')}
            </label>
            <div className="space-y-2 text-xs">
              <label className="flex items-center justify-between cursor-pointer">
                <span>{getStudioText(locale as Locale, 'k0381')}</span>
                <input
                  type="checkbox"
                  checked={includeCcBcc}
                  onChange={(e) => onChange('includeCcBcc', e.target.checked)}
                  className="w-4 h-4 rounded text-primary"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span>{getStudioText(locale as Locale, 'k0382')}</span>
                <input
                  type="checkbox"
                  checked={includeAttachments}
                  onChange={(e) => onChange('includeAttachments', e.target.checked)}
                  className="w-4 h-4 rounded text-primary"
                />
              </label>
            </div>
          </div>
        </div>
      );
    }

    case 'cbz-to-pdf': {
      const quality = options.quality ?? 0.85;
      const maintainAspectRatio = options.maintainAspectRatio ?? true;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0383')}
            </label>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span>{getStudioText(locale as Locale, 'k0384')}</span>
                <span className="font-semibold text-primary">{Math.round(quality * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.0"
                step="0.05"
                value={quality}
                onChange={(e) => onChange('quality', parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div className="pt-2 flex items-center justify-between text-xs">
              <span>{getStudioText(locale as Locale, 'k0385')}</span>
              <input
                type="checkbox"
                checked={maintainAspectRatio}
                onChange={(e) => onChange('maintainAspectRatio', e.target.checked)}
                className="w-4 h-4 rounded text-primary"
              />
            </div>
          </div>
        </div>
      );
    }

    case 'djvu-to-pdf': {
      const dpi = options.dpi ?? 150;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0386')}
            </label>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">{getStudioText(locale as Locale, 'k0387')}</label>
              <select
                value={dpi}
                onChange={(e) => onChange('dpi', parseInt(e.target.value) || 150)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-border bg-background"
              >
                <option value={150}>{getStudioText(locale as Locale, 'k0388')}</option>
                <option value={300}>{getStudioText(locale as Locale, 'k0389')}</option>
              </select>
            </div>
          </div>
        </div>
      );
    }

    case 'psd-to-pdf': {
      const margin = options.margin ?? 36;
      const centerImage = options.centerImage ?? true;
      const scaleToFit = options.scaleToFit ?? true;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0390')}
            </label>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span>{getStudioText(locale as Locale, 'k0391')}</span>
                <span className="font-semibold text-primary">{margin} pt</span>
              </div>
              <input
                type="range"
                min="0"
                max="72"
                value={margin}
                onChange={(e) => onChange('margin', parseInt(e.target.value) || 0)}
                className="w-full accent-primary"
              />
            </div>
            <div className="space-y-2 pt-2 text-xs">
              <label className="flex items-center justify-between cursor-pointer">
                <span>{getStudioText(locale as Locale, 'k0392')}</span>
                <input
                  type="checkbox"
                  checked={centerImage}
                  onChange={(e) => onChange('centerImage', e.target.checked)}
                  className="w-4 h-4 rounded text-primary"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span>{getStudioText(locale as Locale, 'k0393')}</span>
                <input
                  type="checkbox"
                  checked={scaleToFit}
                  onChange={(e) => onChange('scaleToFit', e.target.checked)}
                  className="w-4 h-4 rounded text-primary"
                />
              </label>
            </div>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}