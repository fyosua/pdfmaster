'use client';

import React from 'react';
import {
  Zap,
  RotateCw,
  Archive,
  Type,
  Layers,
  Smartphone,
  Eraser,
  Link2Off,
  PenTool,
  Wrench,
} from 'lucide-react';
import { getStudioText } from '@/lib/i18n/studio';
import type { Locale } from '@/lib/i18n/config';

interface OptimizeRepairToolOptionsProps {
  toolId: string;
  options: Record<string, any>;
  onChange: (key: string, value: any) => void;
  totalPages?: number;
  locale?: string;
}

export function OptimizeRepairToolOptions({
  toolId,
  options,
  onChange,
  totalPages = 1,
  locale = 'zh',
}: OptimizeRepairToolOptionsProps) {

  switch (toolId) {
    case 'linearize-pdf': {
      const useObjectStreams = options.useObjectStreams ?? true;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0394')}
            </label>
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">{getStudioText(locale as Locale, 'k0395')}</span>
              <input
                type="checkbox"
                checked={useObjectStreams}
                onChange={(e) => onChange('useObjectStreams', e.target.checked)}
                className="w-4 h-4 rounded text-primary"
              />
            </div>
            <p className="text-[11px] text-muted-foreground">
              {getStudioText(locale as Locale, 'k0396')}
            </p>
          </div>
        </div>
      );
    }

    case 'deskew-pdf':
    case 'pdf-deskew-aligner': {
      const threshold = options.threshold ?? 10;
      const dpi = options.dpi ?? 150;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0397')}
            </label>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span>{getStudioText(locale as Locale, 'k0398')}</span>
                <span className="font-semibold text-primary">{threshold}</span>
              </div>
              <input
                type="range"
                min="5"
                max="45"
                value={threshold}
                onChange={(e) => onChange('threshold', parseInt(e.target.value) || 10)}
                className="w-full accent-primary"
              />
            </div>
            <div className="space-y-1.5 pt-2">
              <label className="text-xs text-muted-foreground">{getStudioText(locale as Locale, 'k0399')}</label>
              <select
                value={dpi}
                onChange={(e) => onChange('dpi', parseInt(e.target.value) || 150)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-border bg-background"
              >
                <option value={96}>{getStudioText(locale as Locale, 'k0400')}</option>
                <option value={150}>{getStudioText(locale as Locale, 'k0401')}</option>
                <option value={300}>{getStudioText(locale as Locale, 'k0402')}</option>
              </select>
            </div>
          </div>
        </div>
      );
    }

    case 'pdf-to-pdfa': {
      const level = options.level || '2b';
      const embedFonts = options.embedFonts ?? true;
      const flattenTransparency = options.flattenTransparency ?? true;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0403')}
            </label>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">{getStudioText(locale as Locale, 'k0404')}</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '1b', label: 'PDF/A-1b', desc: getStudioText(locale as Locale, 'k0405') },
                  { id: '2b', label: 'PDF/A-2b', desc: getStudioText(locale, 'k0334') },
                  { id: '3b', label: 'PDF/A-3b', desc: getStudioText(locale as Locale, 'k0406') },
                ].map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => onChange('level', l.id)}
                    className={`flex flex-col items-center py-2 px-1 text-xs rounded-lg border ${
                      level === l.id
                        ? 'border-primary bg-primary/10 text-primary font-medium'
                        : 'border-border/60 hover:bg-muted/50'
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="text-[10px] text-muted-foreground">{l.desc}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2 pt-2 text-xs">
              <label className="flex items-center justify-between cursor-pointer">
                <span>{getStudioText(locale as Locale, 'k0407')}</span>
                <input
                  type="checkbox"
                  checked={embedFonts}
                  onChange={(e) => onChange('embedFonts', e.target.checked)}
                  className="w-4 h-4 rounded text-primary"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span>{getStudioText(locale as Locale, 'k0408')}</span>
                <input
                  type="checkbox"
                  checked={flattenTransparency}
                  onChange={(e) => onChange('flattenTransparency', e.target.checked)}
                  className="w-4 h-4 rounded text-primary"
                />
              </label>
            </div>
          </div>
        </div>
      );
    }

    case 'font-to-outline': {
      const dpi = options.dpi ?? 300;
      const preserveSelectableText = options.preserveSelectableText ?? false;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0409')}
            </label>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">{getStudioText(locale as Locale, 'k0410')}</label>
              <select
                value={dpi}
                onChange={(e) => onChange('dpi', parseInt(e.target.value) || 300)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-border bg-background"
              >
                <option value={150}>{getStudioText(locale as Locale, 'k0411')}</option>
                <option value={300}>{getStudioText(locale as Locale, 'k0412')}</option>
                <option value={600}>{getStudioText(locale as Locale, 'k0413')}</option>
              </select>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs">
              <span>{getStudioText(locale as Locale, 'k0414')}</span>
              <input
                type="checkbox"
                checked={preserveSelectableText}
                onChange={(e) => onChange('preserveSelectableText', e.target.checked)}
                className="w-4 h-4 rounded text-primary"
              />
            </div>
          </div>
        </div>
      );
    }

    case 'ocg-manager': {
      const layerAction = options.layerAction || 'remove-hidden';

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0415')}
            </label>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">{getStudioText(locale as Locale, 'k0416')}</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'remove-hidden', label: getStudioText(locale as Locale, 'k0417') },
                  { id: 'flatten-all', label: getStudioText(locale as Locale, 'k0418') },
                ].map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => onChange('layerAction', a.id)}
                    className={`py-1.5 px-2 text-xs rounded-lg border text-center ${
                      layerAction === a.id
                        ? 'border-primary bg-primary/10 text-primary font-medium'
                        : 'border-border/60 hover:bg-muted/50'
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'eink-optimizer': {
      const contrastOffset = options.contrastOffset ?? 15;
      const dilationAmount = options.dilationAmount ?? 1;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0419')}
            </label>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span>{getStudioText(locale as Locale, 'k0420')}</span>
                <span className="font-semibold text-primary">+{contrastOffset}%</span>
              </div>
              <input
                type="range"
                min="-20"
                max="50"
                value={contrastOffset}
                onChange={(e) => onChange('contrastOffset', parseInt(e.target.value) || 0)}
                className="w-full accent-primary"
              />
            </div>
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs">
                <span>{getStudioText(locale as Locale, 'k0421')}</span>
                <span className="font-semibold text-primary">{dilationAmount} px</span>
              </div>
              <input
                type="range"
                min="0"
                max="4"
                value={dilationAmount}
                onChange={(e) => onChange('dilationAmount', parseInt(e.target.value) || 0)}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>
      );
    }

    case 'batch-watermark-remover': {
      const watermarkText = options.watermarkText || getStudioText(locale, 'k0092');
      const removeImages = options.removeImages ?? true;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0422')}
            </label>
            <div className="space-y-1.5">
              <label className="text-xs text-foreground font-medium">{getStudioText(locale as Locale, 'k0423')}</label>
              <input
                type="text"
                value={watermarkText}
                onChange={(e) => onChange('watermarkText', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-background"
              />
            </div>
            <div className="pt-2 flex items-center justify-between text-xs">
              <span>{getStudioText(locale as Locale, 'k0424')}</span>
              <input
                type="checkbox"
                checked={removeImages}
                onChange={(e) => onChange('removeImages', e.target.checked)}
                className="w-4 h-4 rounded text-primary"
              />
            </div>
          </div>
        </div>
      );
    }

    case 'dead-link-debugger': {
      const action = options.action || 'remove-broken';

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0425')}
            </label>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">{getStudioText(locale as Locale, 'k0426')}</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'remove-broken', label: getStudioText(locale as Locale, 'k0427') },
                  { id: 'redirect-https', label: getStudioText(locale as Locale, 'k0428') },
                ].map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => onChange('action', a.id)}
                    className={`py-1.5 px-2 text-xs rounded-lg border text-center ${
                      action === a.id
                        ? 'border-primary bg-primary/10 text-primary font-medium'
                        : 'border-border/60 hover:bg-muted/50'
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'handwriting-ink-contrast-booster': {
      const threshold = options.threshold ?? 180;
      const contrast = options.contrast ?? 1.8;
      const inkType = options.inkType || 'pen';

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0429')}
            </label>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">{getStudioText(locale as Locale, 'k0430')}</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'pen', label: getStudioText(locale as Locale, 'k0431') },
                  { id: 'pencil', label: getStudioText(locale as Locale, 'k0432') },
                  { id: 'marker', label: getStudioText(locale as Locale, 'k0433') },
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
                <span>{getStudioText(locale as Locale, 'k0434')}</span>
                <span className="font-semibold text-primary">{threshold}</span>
              </div>
              <input
                type="range"
                min="100"
                max="240"
                value={threshold}
                onChange={(e) => onChange('threshold', parseInt(e.target.value) || 180)}
                className="w-full accent-primary"
              />
            </div>
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs">
                <span>{getStudioText(locale as Locale, 'k0435')}</span>
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

    default:
      return null;
  }
}
