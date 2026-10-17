'use client';

import { getStudioText } from '@/lib/i18n/studio';
import React from 'react';
import {
  Type,
  Palette,
  QrCode,
  PenTool,
  FileX2,
  Trash2,
  Sparkles,
  BookOpenCheck,
  BookmarkCheck,
} from 'lucide-react';

interface EditAnnotateToolOptionsProps {
  toolId: string;
  options: Record<string, any>;
  onChange: (key: string, value: any) => void;
  totalPages?: number;
  locale?: string;
}

export function EditAnnotateToolOptions({
  toolId,
  options,
  onChange,
  totalPages = 1,
  locale = 'zh',
}: EditAnnotateToolOptionsProps) {

  switch (toolId) {
    case 'text-color': {
      const color = options.color || '#0000ff';
      const mode = options.mode || 'dark';
      const threshold = options.threshold ?? 128;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale, 'k0247')}
            </label>
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">{getStudioText(locale, 'k0248')}</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => onChange('color', e.target.value)}
                  className="w-7 h-7 rounded border border-border cursor-pointer p-0.5"
                />
                <span className="font-mono text-muted-foreground">{color}</span>
              </div>
            </div>
            <div className="space-y-1.5 pt-2">
              <label className="text-xs text-muted-foreground">{getStudioText(locale, 'k0249')}</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'dark', label: getStudioText(locale, 'k0250') },
                  { id: 'light', label: getStudioText(locale, 'k0251') },
                  { id: 'custom', label: getStudioText(locale, 'k0252') },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => onChange('mode', m.id)}
                    className={`py-1.5 px-2 text-xs rounded-lg border text-center ${
                      mode === m.id
                        ? 'border-primary bg-primary/10 text-primary font-medium'
                        : 'border-border/60 hover:bg-muted/50'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
            {mode === 'custom' && (
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs">
                  <span>{getStudioText(locale, 'k0253')}</span>
                  <span className="font-semibold text-primary">{threshold}</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="220"
                  value={threshold}
                  onChange={(e) => onChange('threshold', parseInt(e.target.value) || 128)}
                  className="w-full accent-primary"
                />
              </div>
            )}
          </div>
        </div>
      );
    }

    case 'background-color': {
      const color = options.color || '#fdf6e2';
      const opacity = options.opacity ?? 0.8;
      const mode = options.mode || 'replace-white';

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale, 'k0254')}
            </label>
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">{getStudioText(locale, 'k0255')}</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => onChange('color', e.target.value)}
                  className="w-7 h-7 rounded border border-border cursor-pointer p-0.5"
                />
                <span className="font-mono text-muted-foreground">{color}</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {[
                { hex: '#fdf6e2', name: getStudioText(locale, 'k0256') },
                { hex: '#e8f5e9', name: getStudioText(locale, 'k0257') },
                { hex: '#e3f2fd', name: getStudioText(locale, 'k0258') },
                { hex: '#ffffff', name: getStudioText(locale, 'k0259') },
              ].map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => onChange('color', c.hex)}
                  className="py-1 px-1 rounded border text-[11px] text-center"
                  style={{ backgroundColor: c.hex + '40' }}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs">
                <span>{getStudioText(locale, 'k0260')}</span>
                <span className="font-semibold text-primary">{Math.round(opacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1.0"
                step="0.05"
                value={opacity}
                onChange={(e) => onChange('opacity', parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>
      );
    }

    case 'interactive-toc-generator': {
      const title = options.title || getStudioText(locale, 'k0089');
      const insertIndex = options.insertIndex ?? 1;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale, 'k0261')}
            </label>
            <div className="space-y-1.5">
              <label className="text-xs text-foreground font-medium">{getStudioText(locale, 'k0262')}</label>
              <input
                type="text"
                value={title}
                onChange={(e) => onChange('title', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-background"
              />
            </div>
            <div className="space-y-1.5 pt-1 text-xs">
              <label className="text-muted-foreground block mb-1">{getStudioText(locale, 'k0263')}</label>
              <select
                value={insertIndex}
                onChange={(e) => onChange('insertIndex', parseInt(e.target.value) || 1)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
              >
                <option value={1}>{getStudioText(locale, 'k0264')}</option>
                <option value={2}>{getStudioText(locale, 'k0265')}</option>
              </select>
            </div>
          </div>
        </div>
      );
    }

    case 'bookmarks-auto-generator': {
      const strategy = options.strategy || 'font-size';
      const minFontSize = options.minFontSize ?? 14;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale, 'k0266')}
            </label>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">{getStudioText(locale, 'k0267')}</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'font-size', label: getStudioText(locale, 'k0268') },
                  { id: 'bold', label: getStudioText(locale, 'k0269') },
                  { id: 'numbered', label: getStudioText(locale, 'k0270') },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onChange('strategy', s.id)}
                    className={`py-1.5 px-2 text-xs rounded-lg border text-center ${
                      strategy === s.id
                        ? 'border-primary bg-primary/10 text-primary font-medium'
                        : 'border-border/60 hover:bg-muted/50'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs">
                <span>{getStudioText(locale, 'k0271')}</span>
                <span className="font-semibold text-primary">{minFontSize} pt</span>
              </div>
              <input
                type="range"
                min="10"
                max="24"
                value={minFontSize}
                onChange={(e) => onChange('minFontSize', parseInt(e.target.value) || 14)}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>
      );
    }

    case 'batch-barcode-injector': {
      const barcodeType = options.barcodeType || 'qrcode';
      const value = options.value || 'https://pdfmaster.yosuaf.com';
      const xPos = options.xPos ?? 0.8;
      const yPos = options.yPos ?? 0.8;
      const width = options.width ?? 80;
      const height = options.height ?? 80;
      const pageRange = options.pageRange || 'all';

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale, 'k0272')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'qrcode', label: getStudioText(locale, 'k0273') },
                { id: 'code128', label: 'Code 128' },
                { id: 'ean13', label: 'EAN-13' },
              ].map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => onChange('barcodeType', b.id)}
                  className={`py-1.5 px-2 text-xs rounded-lg border text-center ${
                    barcodeType === b.id
                      ? 'border-primary bg-primary/10 text-primary font-medium'
                      : 'border-border/60 hover:bg-muted/50'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
            <div className="space-y-1.5 pt-1">
              <label className="text-xs text-foreground font-medium">{getStudioText(locale, 'k0274')}</label>
              <input
                type="text"
                value={value}
                onChange={(e) => onChange('value', e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-background"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale, 'k0275')}</label>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="1"
                  value={xPos}
                  onChange={(e) => onChange('xPos', parseFloat(e.target.value) || 0.8)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale, 'k0276')}</label>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="1"
                  value={yPos}
                  onChange={(e) => onChange('yPos', parseFloat(e.target.value) || 0.8)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'signature-ink-optimizer': {
      const threshold = options.threshold ?? 200;
      const inkType = options.inkType || 'auto';
      const contrast = options.contrast ?? 1.5;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale, 'k0277')}
            </label>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">{getStudioText(locale, 'k0278')}</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'auto', label: getStudioText(locale, 'k0279') },
                  { id: 'blue', label: getStudioText(locale, 'k0280') },
                  { id: 'black', label: getStudioText(locale, 'k0281') },
                ].map((k) => (
                  <button
                    key={k.id}
                    type="button"
                    onClick={() => onChange('inkType', k.id)}
                    className={`py-1.5 px-2 text-xs rounded-lg border text-center ${
                      inkType === k.id
                        ? 'border-primary bg-primary/10 text-primary font-medium'
                        : 'border-border/60 hover:bg-muted/50'
                    }`}
                  >
                    {k.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs">
                <span>{getStudioText(locale, 'k0282')}</span>
                <span className="font-semibold text-primary">{threshold}</span>
              </div>
              <input
                type="range"
                min="120"
                max="240"
                value={threshold}
                onChange={(e) => onChange('threshold', parseInt(e.target.value) || 200)}
                className="w-full accent-primary"
              />
            </div>
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs">
                <span>{getStudioText(locale, 'k0283')}</span>
                <span className="font-semibold text-primary">{contrast}x</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="3.0"
                step="0.1"
                value={contrast}
                onChange={(e) => onChange('contrast', parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>
      );
    }

    case 'remove-blank-pages': {
      const threshold = options.threshold ?? 99;
      const filterMode = options.filterMode || 'all';

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale, 'k0284')}
            </label>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">{getStudioText(locale, 'k0285')}</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'all', label: getStudioText(locale, 'k0286') },
                  { id: 'even', label: getStudioText(locale, 'k0287') },
                  { id: 'odd', label: getStudioText(locale, 'k0288') },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => onChange('filterMode', f.id)}
                    className={`py-1.5 px-2 text-xs rounded-lg border text-center ${
                      filterMode === f.id
                        ? 'border-primary bg-primary/10 text-primary font-medium'
                        : 'border-border/60 hover:bg-muted/50'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs">
                <span>{getStudioText(locale, 'k0289')}</span>
                <span className="font-semibold text-primary">{threshold}%</span>
              </div>
              <input
                type="range"
                min="90"
                max="99.9"
                step="0.5"
                value={threshold}
                onChange={(e) => onChange('threshold', parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
              <p className="text-[11px] text-muted-foreground">
                {getStudioText(locale, 'k0290')}
              </p>
            </div>
          </div>
        </div>
      );
    }

    case 'remove-annotations': {
      const removeAll = options.removeAll ?? true;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale, 'k0291')}
            </label>
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">{getStudioText(locale, 'k0292')}</span>
              <input
                type="checkbox"
                checked={removeAll}
                onChange={(e) => onChange('removeAll', e.target.checked)}
                className="w-4 h-4 rounded text-primary"
              />
            </div>
            <p className="text-[11px] text-muted-foreground">
              {getStudioText(locale, 'k0293')}
            </p>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}
