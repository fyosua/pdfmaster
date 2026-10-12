'use client';

import { getStudioText } from '@/lib/i18n/studio';
import React from 'react';
import {
  FileText,
  FileCode,
  Image,
  Layers,
  BookOpen,
  Presentation,
  Table,
  Archive,
  Receipt,
  FileDown,
} from 'lucide-react';

interface ExportToolOptionsProps {
  toolId: string;
  options: Record<string, any>;
  onChange: (key: string, value: any) => void;
  totalPages?: number;
  locale?: string;
}

export function ExportToolOptions({
  toolId,
  options,
  onChange,
  totalPages = 1,
  locale = 'zh',
}: ExportToolOptionsProps) {

  switch (toolId) {
    case 'pdf-to-markdown': {
      const includePageNumbers = options.includePageNumbers ?? false;
      const preserveLineBreaks = options.preserveLineBreaks ?? true;
      const pageRange = options.pageRange || '';

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale, 'k0294')}
            </label>
            <div className="space-y-2 text-xs">
              <label className="flex items-center justify-between cursor-pointer">
                <span>{getStudioText(locale, 'k0295')}</span>
                <input
                  type="checkbox"
                  checked={includePageNumbers}
                  onChange={(e) => onChange('includePageNumbers', e.target.checked)}
                  className="w-4 h-4 rounded text-primary"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span>{getStudioText(locale, 'k0296')}</span>
                <input
                  type="checkbox"
                  checked={preserveLineBreaks}
                  onChange={(e) => onChange('preserveLineBreaks', e.target.checked)}
                  className="w-4 h-4 rounded text-primary"
                />
              </label>
            </div>
            <div className="space-y-1.5 pt-2">
              <label className="text-xs text-muted-foreground">{getStudioText(locale, 'k0297')}</label>
              <input
                type="text"
                value={pageRange}
                onChange={(e) => onChange('pageRange', e.target.value)}
                placeholder={getStudioText(locale, 'k0298')}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-border bg-background"
              />
            </div>
          </div>
        </div>
      );
    }

    case 'pdf-to-json': {
      const includeText = options.includeText ?? true;
      const includeMetadata = options.includeMetadata ?? true;
      const includePageInfo = options.includePageInfo ?? true;
      const includeOutline = options.includeOutline ?? true;
      const prettyPrint = options.prettyPrint ?? true;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale, 'k0299')}
            </label>
            <div className="space-y-2 text-xs">
              {[
                { key: 'includeText', label: getStudioText(locale, 'k0300'), val: includeText },
                { key: 'includeMetadata', label: getStudioText(locale, 'k0301'), val: includeMetadata },
                { key: 'includePageInfo', label: getStudioText(locale, 'k0302'), val: includePageInfo },
                { key: 'includeOutline', label: getStudioText(locale, 'k0303'), val: includeOutline },
                { key: 'prettyPrint', label: getStudioText(locale, 'k0304'), val: prettyPrint },
              ].map((item) => (
                <label key={item.key} className="flex items-center justify-between p-1.5 rounded hover:bg-muted/40 cursor-pointer">
                  <span>{item.label}</span>
                  <input
                    type="checkbox"
                    checked={item.val}
                    onChange={(e) => onChange(item.key, e.target.checked)}
                    className="w-4 h-4 rounded text-primary"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      );
    }

    case 'pdf-to-tiff': {
      const colorMode = options.colorMode || 'color';
      const compression = options.compression || 'packbits';
      const dpi = options.dpi ?? 150;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale, 'k0305')}
            </label>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">{getStudioText(locale, 'k0306')}</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'color', label: getStudioText(locale, 'k0307') },
                  { id: 'grayscale', label: getStudioText(locale, 'k0308') },
                  { id: 'mono', label: getStudioText(locale, 'k0309') },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onChange('colorMode', c.id)}
                    className={`py-1.5 px-2 text-xs rounded-lg border text-center ${
                      colorMode === c.id
                        ? 'border-primary bg-primary/10 text-primary font-medium'
                        : 'border-border/60 hover:bg-muted/50'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs pt-2">
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale, 'k0310')}</label>
                <select
                  value={compression}
                  onChange={(e) => onChange('compression', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                >
                  <option value="packbits">{getStudioText(locale, 'k0311')}</option>
                  <option value="lzw">{getStudioText(locale, 'k0312')}</option>
                  <option value="none">{getStudioText(locale, 'k0313')}</option>
                </select>
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale, 'k0314')}</label>
                <select
                  value={dpi}
                  onChange={(e) => onChange('dpi', parseInt(e.target.value) || 150)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                >
                  <option value={96}>{getStudioText(locale, 'k0315')}</option>
                  <option value={150}>{getStudioText(locale, 'k0316')}</option>
                  <option value={300}>{getStudioText(locale, 'k0317')}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'pdf-to-svg': {
      const scale = options.scale ?? 2;
      const pageRange = options.pageRange || '';

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale, 'k0318')}
            </label>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span>{getStudioText(locale, 'k0319')}</span>
                <span className="font-semibold text-primary">{scale}x</span>
              </div>
              <input
                type="range"
                min="1"
                max="3"
                step="0.5"
                value={scale}
                onChange={(e) => onChange('scale', parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div className="space-y-1.5 pt-2">
              <label className="text-xs text-muted-foreground">{getStudioText(locale, 'k0320')}</label>
              <input
                type="text"
                value={pageRange}
                onChange={(e) => onChange('pageRange', e.target.value)}
                placeholder="1-5"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-border bg-background"
              />
            </div>
          </div>
        </div>
      );
    }

    case 'pdf-to-cbz': {
      const title = options.title || '';
      const series = options.series || '';
      const format = options.format || 'jpg';
      const quality = options.quality ?? 0.85;
      const manga = options.manga || 'No';

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale, 'k0321')}
            </label>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale, 'k0322')}</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => onChange('title', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale, 'k0323')}</label>
                <input
                  type="text"
                  value={series}
                  onChange={(e) => onChange('series', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale, 'k0324')}</label>
                <select
                  value={format}
                  onChange={(e) => onChange('format', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                >
                  <option value="jpg">{getStudioText(locale, 'k0325')}</option>
                  <option value="webp">{getStudioText(locale, 'k0326')}</option>
                  <option value="png">{getStudioText(locale, 'k0327')}</option>
                </select>
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale, 'k0328')}</label>
                <select
                  value={manga}
                  onChange={(e) => onChange('manga', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                >
                  <option value="No">{getStudioText(locale, 'k0329')}</option>
                  <option value="Yes">{getStudioText(locale, 'k0330')}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'pdf-to-pptx': {
      const dpi = options.dpi ?? 150;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale, 'k0331')}
            </label>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">{getStudioText(locale, 'k0332')}</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 96, label: '96 DPI', desc: getStudioText(locale, 'k0333') },
                  { id: 150, label: '150 DPI', desc: getStudioText(locale, 'k0334') },
                  { id: 300, label: '300 DPI', desc: getStudioText(locale, 'k0335') },
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => onChange('dpi', d.id)}
                    className={`flex flex-col items-center py-2 px-1 text-xs rounded-lg border ${
                      dpi === d.id
                        ? 'border-primary bg-primary/10 text-primary font-medium'
                        : 'border-border/60 hover:bg-muted/50'
                    }`}
                  >
                    <span>{d.label}</span>
                    <span className="text-[10px] text-muted-foreground">{d.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'extract-images': {
      const minWidth = options.minWidth ?? 100;
      const minHeight = options.minHeight ?? 100;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale, 'k0336')}
            </label>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale, 'k0337')}</label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={minWidth}
                  onChange={(e) => onChange('minWidth', parseInt(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale, 'k0338')}</label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={minHeight}
                  onChange={(e) => onChange('minHeight', parseInt(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground">
              {getStudioText(locale, 'k0339')}
            </p>
          </div>
        </div>
      );
    }

    case 'extract-tables': {
      const format = options.format || 'xlsx';
      const minColumns = options.minColumns ?? 2;
      const minRows = options.minRows ?? 2;
      const includePageNumbers = options.includePageNumbers ?? true;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale, 'k0340')}
            </label>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">{getStudioText(locale, 'k0341')}</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'xlsx', label: getStudioText(locale, 'k0342') },
                  { id: 'csv', label: getStudioText(locale, 'k0343') },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => onChange('format', f.id)}
                    className={`py-1.5 px-2 text-xs rounded-lg border text-center ${
                      format === f.id
                        ? 'border-primary bg-primary/10 text-primary font-medium'
                        : 'border-border/60 hover:bg-muted/50'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale, 'k0344')}</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={minColumns}
                  onChange={(e) => onChange('minColumns', parseInt(e.target.value) || 2)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale, 'k0345')}</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={minRows}
                  onChange={(e) => onChange('minRows', parseInt(e.target.value) || 2)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'annotation-exporter': {
      const format = options.format || 'markdown';
      const incHighlights = options.incHighlights ?? true;
      const incNotes = options.incNotes ?? true;
      const incUnderlines = options.incUnderlines ?? true;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale, 'k0346')}
            </label>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">{getStudioText(locale, 'k0347')}</label>
              <div className="grid grid-cols-3 gap-2">
                {['markdown', 'json', 'txt'].map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => onChange('format', fmt)}
                    className={`py-1 px-2 text-xs rounded-lg border text-center uppercase ${
                      format === fmt
                        ? 'border-primary bg-primary/10 text-primary font-medium'
                        : 'border-border/60 hover:bg-muted/50'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2 pt-2 text-xs">
              <label className="flex items-center justify-between cursor-pointer">
                <span>{getStudioText(locale, 'k0348')}</span>
                <input
                  type="checkbox"
                  checked={incHighlights}
                  onChange={(e) => onChange('incHighlights', e.target.checked)}
                  className="w-4 h-4 rounded text-primary"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span>{getStudioText(locale, 'k0349')}</span>
                <input
                  type="checkbox"
                  checked={incNotes}
                  onChange={(e) => onChange('incNotes', e.target.checked)}
                  className="w-4 h-4 rounded text-primary"
                />
              </label>
            </div>
          </div>
        </div>
      );
    }

    case 'global-invoice-parser': {
      const targetCurrency = options.targetCurrency || 'USD';
      const customRate = options.customRate ?? 1.0;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale, 'k0350')}
            </label>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">{getStudioText(locale, 'k0351')}</label>
              <select
                value={targetCurrency}
                onChange={(e) => onChange('targetCurrency', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-border bg-background"
              >
                <option value="CNY">{getStudioText(locale, 'k0352')}</option>
                <option value="USD">{getStudioText(locale, 'k0353')}</option>
                <option value="EUR">{getStudioText(locale, 'k0354')}</option>
                <option value="GBP">{getStudioText(locale, 'k0355')}</option>
                <option value="JPY">{getStudioText(locale, 'k0356')}</option>
              </select>
            </div>
          </div>
        </div>
      );
    }

    case 'pdf-to-slide': {
      const themeColor = options.themeColor || '#6366f1';

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale, 'k0357')}
            </label>
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">{getStudioText(locale, 'k0358')}</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={themeColor}
                  onChange={(e) => onChange('themeColor', e.target.value)}
                  className="w-7 h-7 rounded border border-border cursor-pointer p-0.5"
                />
                <span className="font-mono text-muted-foreground">{themeColor}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'pdf-to-zip': {
      const compressionLevel = options.compressionLevel ?? 6;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale, 'k0359')}
            </label>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span>{getStudioText(locale, 'k0360')}</span>
                <span className="font-semibold text-primary">{compressionLevel}</span>
              </div>
              <input
                type="range"
                min="1"
                max="9"
                value={compressionLevel}
                onChange={(e) => onChange('compressionLevel', parseInt(e.target.value) || 6)}
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
