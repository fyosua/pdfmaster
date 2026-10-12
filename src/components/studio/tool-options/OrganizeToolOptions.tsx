'use client';

import React from 'react';
import { getStudioText } from '@/lib/i18n/studio';
import type { Locale } from '@/lib/i18n/config';
import {
  Scissors,
  Split,
  Layers,
  Grid,
  BookOpen,
  Image,
  CreditCard,
  Columns,
  BookMarked,
  Maximize2,
  FileSpreadsheet,
  Bookmark as BookmarkIcon,
  ListOrdered,
  FileText,
  Palette,
  Info,
} from 'lucide-react';

interface OrganizeToolOptionsProps {
  toolId: string;
  options: Record<string, any>;
  onChange: (key: string, value: any) => void;
  totalPages?: number;
  locale?: string;
}

export function OrganizeToolOptions({
  toolId,
  options,
  onChange,
  totalPages = 1,
  locale = 'zh',
}: OrganizeToolOptionsProps) {

  switch (toolId) {
    case 'split-pdf': {
      const splitMode = options.splitMode || 'ranges';
      const rangeInput = options.rangeInput || '';
      const splitCount = options.splitCount || 2;
      const evenOddMode = options.evenOddMode || 'both';

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0436')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'ranges', label: getStudioText(locale as Locale, 'k0437'), desc: getStudioText(locale as Locale, 'k0438') },
                { id: 'everyN', label: getStudioText(locale as Locale, 'k0439'), desc: getStudioText(locale as Locale, 'k0440') },
                { id: 'all', label: getStudioText(locale as Locale, 'k0441'), desc: getStudioText(locale as Locale, 'k0442') },
                { id: 'evenOdd', label: getStudioText(locale as Locale, 'k0443'), desc: getStudioText(locale as Locale, 'k0444') },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => onChange('splitMode', m.id)}
                  className={`flex flex-col items-start p-2.5 rounded-lg border text-left text-xs transition-colors ${
                    splitMode === m.id
                      ? 'border-primary bg-primary/10 text-primary font-medium'
                      : 'border-border/60 hover:bg-muted/50 text-foreground'
                  }`}
                >
                  <span className="font-semibold">{m.label}</span>
                  <span className="text-[10px] text-muted-foreground">{m.desc}</span>
                </button>
              ))}
            </div>

            {splitMode === 'ranges' && (
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-medium text-foreground">
                  {getStudioText(locale as Locale, 'k0445')}
                </label>
                <input
                  type="text"
                  value={rangeInput}
                  onChange={(e) => onChange('rangeInput', e.target.value)}
                  placeholder={getStudioText(locale as Locale, 'k0446')}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <p className="text-[11px] text-muted-foreground">
                  {getStudioText(locale as Locale, 'k0447', { totalPages })}
                </p>
              </div>
            )}

            {splitMode === 'everyN' && (
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-foreground">{getStudioText(locale as Locale, 'k0448')}</span>
                  <span className="font-semibold text-primary">{splitCount} {getStudioText(locale as Locale, 'k0449')}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max={Math.max(10, totalPages)}
                  value={splitCount}
                  onChange={(e) => onChange('splitCount', parseInt(e.target.value) || 1)}
                  className="w-full accent-primary"
                />
              </div>
            )}

            {splitMode === 'evenOdd' && (
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-medium text-foreground">{getStudioText(locale as Locale, 'k0450')}</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'both', label: getStudioText(locale as Locale, 'k0451') },
                    { id: 'odd', label: getStudioText(locale, 'k0288') },
                    { id: 'even', label: getStudioText(locale as Locale, 'k0452') },
                  ].map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => onChange('evenOddMode', o.id)}
                      className={`py-1.5 px-2 text-xs rounded-lg border text-center ${
                        evenOddMode === o.id
                          ? 'border-primary bg-primary/10 text-primary font-medium'
                          : 'border-border/60 hover:bg-muted/50'
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    case 'divide-pages': {
      const splitDirection = options.splitDirection || 'vertical';
      const splitRatio = options.splitRatio ?? 0.5;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0453')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onChange('splitDirection', 'vertical')}
                className={`py-2 px-3 text-xs rounded-lg border text-center font-medium ${
                  splitDirection === 'vertical'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border/60 hover:bg-muted/50'
                }`}
              >
                {getStudioText(locale as Locale, 'k0454')}
              </button>
              <button
                type="button"
                onClick={() => onChange('splitDirection', 'horizontal')}
                className={`py-2 px-3 text-xs rounded-lg border text-center font-medium ${
                  splitDirection === 'horizontal'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border/60 hover:bg-muted/50'
                }`}
              >
                {getStudioText(locale as Locale, 'k0455')}
              </button>
            </div>
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs">
                <span>{getStudioText(locale as Locale, 'k0456')}</span>
                <span className="font-semibold text-primary">{Math.round(splitRatio * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.9"
                step="0.05"
                value={splitRatio}
                onChange={(e) => onChange('splitRatio', parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>
      );
    }

    case 'combine-single-page': {
      const direction = options.direction || 'vertical';
      const spacing = options.spacing ?? 10;
      const backgroundColor = options.backgroundColor || '#ffffff';

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0457')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onChange('direction', 'vertical')}
                className={`py-2 px-3 text-xs rounded-lg border text-center font-medium ${
                  direction === 'vertical'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border/60 hover:bg-muted/50'
                }`}
              >
                {getStudioText(locale as Locale, 'k0458')}
              </button>
              <button
                type="button"
                onClick={() => onChange('direction', 'horizontal')}
                className={`py-2 px-3 text-xs rounded-lg border text-center font-medium ${
                  direction === 'horizontal'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border/60 hover:bg-muted/50'
                }`}
              >
                {getStudioText(locale as Locale, 'k0459')}
              </button>
            </div>
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs">
                <span>{getStudioText(locale as Locale, 'k0460')}</span>
                <span className="font-semibold text-primary">{spacing} pt</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={spacing}
                onChange={(e) => onChange('spacing', parseInt(e.target.value) || 0)}
                className="w-full accent-primary"
              />
            </div>
            <div className="flex items-center justify-between pt-2 text-xs">
              <span>{getStudioText(locale as Locale, 'k0461')}</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => onChange('backgroundColor', e.target.value)}
                  className="w-7 h-7 rounded border border-border cursor-pointer p-0.5"
                />
                <span className="font-mono text-muted-foreground">{backgroundColor}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'grid-combine': {
      const rows = options.rows ?? 2;
      const cols = options.cols ?? 2;
      const margin = options.margin ?? 20;
      const spacing = options.spacing ?? 10;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0462')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0463')}</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={rows}
                  onChange={(e) => onChange('rows', parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0464')}</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={cols}
                  onChange={(e) => onChange('cols', parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-border bg-background"
                />
              </div>
            </div>
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs">
                <span>{getStudioText(locale as Locale, 'k0465')}</span>
                <span className="font-semibold text-primary">{margin} pt</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={margin}
                onChange={(e) => onChange('margin', parseInt(e.target.value) || 0)}
                className="w-full accent-primary"
              />
            </div>
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs">
                <span>{getStudioText(locale as Locale, 'k0466')}</span>
                <span className="font-semibold text-primary">{spacing} pt</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={spacing}
                onChange={(e) => onChange('spacing', parseInt(e.target.value) || 0)}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>
      );
    }

    case 'pdf-booklet': {
      const gridMode = options.gridMode || '1x2';
      const paperSize = options.paperSize || 'a4';
      const orientation = options.orientation || 'landscape';
      const rotation = options.rotation || 'none';
      const padding = options.padding ?? 20;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0467')}
            </label>
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground block">{getStudioText(locale as Locale, 'k0468')}</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: '1x2', label: getStudioText(locale as Locale, 'k0469') },
                  { id: '2x2', label: getStudioText(locale as Locale, 'k0470') },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => onChange('gridMode', m.id)}
                    className={`py-2 px-2 text-xs rounded-lg border text-center ${
                      gridMode === m.id
                        ? 'border-primary bg-primary/10 text-primary font-medium'
                        : 'border-border/60 hover:bg-muted/50'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0471')}</label>
                <select
                  value={paperSize}
                  onChange={(e) => onChange('paperSize', e.target.value)}
                  className="w-full px-2 py-1.5 text-xs rounded-lg border border-border bg-background"
                >
                  <option value="a4">A4 (210×297mm)</option>
                  <option value="letter">US Letter</option>
                  <option value="a3">A3</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0472')}</label>
                <select
                  value={orientation}
                  onChange={(e) => onChange('orientation', e.target.value)}
                  className="w-full px-2 py-1.5 text-xs rounded-lg border border-border bg-background"
                >
                  <option value="landscape">{getStudioText(locale as Locale, 'k0473')}</option>
                  <option value="portrait">{getStudioText(locale, 'kPortrait')}</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs">
                <span>{getStudioText(locale as Locale, 'k0474')}</span>
                <span className="font-semibold text-primary">{padding} pt</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={padding}
                onChange={(e) => onChange('padding', parseInt(e.target.value) || 0)}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>
      );
    }

    case 'photo-tiling-prepress': {
      const photoSpec = options.photoSpec || '1-inch';
      const paperSize = options.paperSize || '6-inch';
      const gapPt = options.gapPt ?? 8;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0475')}
            </label>
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">{getStudioText(locale as Locale, 'k0476')}</label>
              <select
                value={photoSpec}
                onChange={(e) => onChange('photoSpec', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-border bg-background"
              >
                <option value="1-inch">{getStudioText(locale as Locale, 'k0477')}</option>
                <option value="2-inch">{getStudioText(locale as Locale, 'k0478')}</option>
                <option value="passport">{getStudioText(locale as Locale, 'k0479')}</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">{getStudioText(locale as Locale, 'k0480')}</label>
              <select
                value={paperSize}
                onChange={(e) => onChange('paperSize', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-border bg-background"
              >
                <option value="6-inch">{getStudioText(locale as Locale, 'k0481')}</option>
                <option value="a4">{getStudioText(locale as Locale, 'k0482')}</option>
              </select>
            </div>
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs">
                <span>{getStudioText(locale as Locale, 'k0483')}</span>
                <span className="font-semibold text-primary">{gapPt} pt</span>
              </div>
              <input
                type="range"
                min="2"
                max="24"
                value={gapPt}
                onChange={(e) => onChange('gapPt', parseInt(e.target.value) || 8)}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>
      );
    }

    case 'pdf-lossless-slicer': {
      const pageNumber = options.pageNumber || 1;
      const sliceX = options.sliceX ?? 0.1;
      const sliceY = options.sliceY ?? 0.1;
      const sliceWidth = options.sliceWidth ?? 0.8;
      const sliceHeight = options.sliceHeight ?? 0.8;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0484')}
            </label>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0485')}</label>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="0.9"
                  value={sliceX}
                  onChange={(e) => onChange('sliceX', parseFloat(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0486')}</label>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="0.9"
                  value={sliceY}
                  onChange={(e) => onChange('sliceY', parseFloat(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0487')}</label>
                <input
                  type="number"
                  step="0.05"
                  min="0.1"
                  max="1"
                  value={sliceWidth}
                  onChange={(e) => onChange('sliceWidth', parseFloat(e.target.value) || 0.8)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0488')}</label>
                <input
                  type="number"
                  step="0.05"
                  min="0.1"
                  max="1"
                  value={sliceHeight}
                  onChange={(e) => onChange('sliceHeight', parseFloat(e.target.value) || 0.8)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'passport-id-composer': {
      const watermark = options.watermark || getStudioText(locale, 'k0087');
      const layout = options.layout || 'single-page';

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0489')}
            </label>
            <div className="space-y-1.5">
              <label className="text-xs text-foreground font-medium">{getStudioText(locale as Locale, 'k0490')}</label>
              <input
                type="text"
                value={watermark}
                onChange={(e) => onChange('watermark', e.target.value)}
                placeholder={getStudioText(locale as Locale, 'k0491')}
                className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-background"
              />
            </div>
            <div className="space-y-1.5 pt-1">
              <label className="text-xs text-muted-foreground">{getStudioText(locale as Locale, 'k0492')}</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onChange('layout', 'single-page')}
                  className={`py-1.5 px-2 text-xs rounded-lg border text-center ${
                    layout === 'single-page'
                      ? 'border-primary bg-primary/10 text-primary font-medium'
                      : 'border-border/60 hover:bg-muted/50'
                  }`}
                >
                  {getStudioText(locale as Locale, 'k0493')}
                </button>
                <button
                  type="button"
                  onClick={() => onChange('layout', 'two-cards')}
                  className={`py-1.5 px-2 text-xs rounded-lg border text-center ${
                    layout === 'two-cards'
                      ? 'border-primary bg-primary/10 text-primary font-medium'
                      : 'border-border/60 hover:bg-muted/50'
                  }`}
                >
                  {getStudioText(locale as Locale, 'k0494')}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'pdf-two-column-reflower': {
      const middleGapRatio = options.middleGapRatio ?? 0.5;
      const horizontalReading = options.horizontalReading ?? false;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0495')}
            </label>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span>{getStudioText(locale as Locale, 'k0496')}</span>
                <span className="font-semibold text-primary">{Math.round(middleGapRatio * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="0.8"
                step="0.05"
                value={middleGapRatio}
                onChange={(e) => onChange('middleGapRatio', parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div className="pt-2 flex items-center justify-between text-xs">
              <span>{getStudioText(locale as Locale, 'k0497')}</span>
              <input
                type="checkbox"
                checked={horizontalReading}
                onChange={(e) => onChange('horizontalReading', e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary"
              />
            </div>
          </div>
        </div>
      );
    }

    case 'pdf-spine-bookbinder': {
      const pageCount = options.pageCount ?? totalPages;
      const paperGsm = options.paperGsm ?? 80;
      const bookTitle = options.bookTitle || 'PDFCraft Book';

      // Spine thickness approximate calculation (mm)
      const spineThicknessMm = ((pageCount / 2) * (paperGsm === 70 ? 0.09 : paperGsm === 80 ? 0.1 : paperGsm === 100 ? 0.12 : 0.15)).toFixed(1);

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0498')}
            </label>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 flex justify-between items-center text-xs">
              <span className="font-medium text-primary">{getStudioText(locale as Locale, 'k0499')}:</span>
              <span className="font-mono text-base font-bold text-primary">{spineThicknessMm} mm</span>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-foreground font-medium">{getStudioText(locale as Locale, 'k0500')}</label>
              <input
                type="text"
                value={bookTitle}
                onChange={(e) => onChange('bookTitle', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-background"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0501')}</label>
                <input
                  type="number"
                  min="4"
                  value={pageCount}
                  onChange={(e) => onChange('pageCount', parseInt(e.target.value) || 4)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0502')}</label>
                <select
                  value={paperGsm}
                  onChange={(e) => onChange('paperGsm', parseInt(e.target.value) || 80)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                >
                  <option value={70}>{getStudioText(locale as Locale, 'k0503')}</option>
                  <option value={80}>{getStudioText(locale as Locale, 'k0504')}</option>
                  <option value={100}>{getStudioText(locale as Locale, 'k0505')}</option>
                  <option value={120}>{getStudioText(locale as Locale, 'k0506')}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'pdf-page-resizer-uniform': {
      const targetSize = options.targetSize || 'A4';
      const scaleMode = options.scaleMode || 'fit';

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0507')}
            </label>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">{getStudioText(locale as Locale, 'k0508')}</label>
              <select
                value={targetSize}
                onChange={(e) => onChange('targetSize', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-border bg-background"
              >
                <option value="A4">A4 (210×297mm)</option>
                <option value="Letter">US Letter (8.5×11in)</option>
                <option value="A3">A3 (297×420mm)</option>
                <option value="A5">A5 (148×210mm)</option>
              </select>
            </div>
            <div className="space-y-1.5 pt-1">
              <label className="text-xs text-muted-foreground">{getStudioText(locale as Locale, 'k0509')}</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'fit', label: getStudioText(locale as Locale, 'k0510') },
                  { id: 'fill', label: getStudioText(locale as Locale, 'k0511') },
                  { id: 'stretch', label: getStudioText(locale as Locale, 'k0512') },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onChange('scaleMode', s.id)}
                    className={`py-1.5 px-2 text-xs rounded-lg border text-center ${
                      scaleMode === s.id
                        ? 'border-primary bg-primary/10 text-primary font-medium'
                        : 'border-border/60 hover:bg-muted/50'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'pdf-scratchpad-canvas': {
      const padPosition = options.padPosition || 'right';
      const padSize = options.padSize ?? 200;
      const gridType = options.gridType || 'grid';

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0513')}
            </label>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">{getStudioText(locale as Locale, 'k0514')}</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'right', label: getStudioText(locale as Locale, 'k0515') },
                  { id: 'left', label: getStudioText(locale as Locale, 'k0516') },
                  { id: 'bottom', label: getStudioText(locale as Locale, 'k0517') },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onChange('padPosition', p.id)}
                    className={`py-1.5 px-2 text-xs rounded-lg border text-center ${
                      padPosition === p.id
                        ? 'border-primary bg-primary/10 text-primary font-medium'
                        : 'border-border/60 hover:bg-muted/50'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5 pt-2">
              <label className="text-xs text-muted-foreground">{getStudioText(locale as Locale, 'k0518')}</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'grid', label: getStudioText(locale as Locale, 'k0519') },
                  { id: 'dots', label: getStudioText(locale as Locale, 'k0520') },
                  { id: 'lines', label: getStudioText(locale as Locale, 'k0521') },
                  { id: 'blank', label: getStudioText(locale as Locale, 'k0522') },
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => onChange('gridType', g.id)}
                    className={`py-1.5 px-2 text-xs rounded-lg border text-center ${
                      gridType === g.id
                        ? 'border-primary bg-primary/10 text-primary font-medium'
                        : 'border-border/60 hover:bg-muted/50'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs">
                <span>{getStudioText(locale as Locale, 'k0523')}</span>
                <span className="font-semibold text-primary">{padSize} pt</span>
              </div>
              <input
                type="range"
                min="100"
                max="400"
                value={padSize}
                onChange={(e) => onChange('padSize', parseInt(e.target.value) || 200)}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>
      );
    }

    case 'table-of-contents': {
      const title = options.title || getStudioText(locale, 'k0088');
      const fontSize = options.fontSize ?? 12;
      const fontFamily = options.fontFamily || 'helv';
      const addBookmark = options.addBookmark ?? true;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0524')}
            </label>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">{getStudioText(locale as Locale, 'k0525')}</label>
              <input
                type="text"
                value={title}
                onChange={(e) => onChange('title', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-background"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0526')}</label>
                <select
                  value={fontFamily}
                  onChange={(e) => onChange('fontFamily', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                >
                  <option value="helv">{getStudioText(locale as Locale, 'k0527')}</option>
                  <option value="times">{getStudioText(locale as Locale, 'k0528')}</option>
                  <option value="courier">{getStudioText(locale as Locale, 'k0529')}</option>
                </select>
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0530')}</label>
                <input
                  type="number"
                  min="9"
                  max="24"
                  value={fontSize}
                  onChange={(e) => onChange('fontSize', parseInt(e.target.value) || 12)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs">
              <span>{getStudioText(locale as Locale, 'k0531')}</span>
              <input
                type="checkbox"
                checked={addBookmark}
                onChange={(e) => onChange('addBookmark', e.target.checked)}
                className="w-4 h-4 rounded text-primary"
              />
            </div>
          </div>
        </div>
      );
    }

    case 'bookmark': {
      const title = options.title || '';
      const pageNumber = options.pageNumber ?? 1;
      const level = options.level ?? 1;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0532')}
            </label>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">{getStudioText(locale as Locale, 'k0533')}</label>
              <input
                type="text"
                value={title}
                onChange={(e) => onChange('title', e.target.value)}
                placeholder={getStudioText(locale as Locale, 'k0534')}
                className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-background"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0535')}</label>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={pageNumber}
                  onChange={(e) => onChange('pageNumber', parseInt(e.target.value) || 1)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0536')}</label>
                <select
                  value={level}
                  onChange={(e) => onChange('level', parseInt(e.target.value) || 1)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                >
                  <option value={1}>{getStudioText(locale as Locale, 'k0537')}</option>
                  <option value={2}>{getStudioText(locale as Locale, 'k0538')}</option>
                  <option value={3}>{getStudioText(locale as Locale, 'k0539')}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'edit-metadata': {
      const title = options.title || '';
      const author = options.author || '';
      const subject = options.subject || '';
      const keywords = options.keywords || '';
      const creator = options.creator || 'PDFCraft';

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0540')}
            </label>
            <div className="space-y-2 text-xs">
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0541')}</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => onChange('title', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0542')}</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => onChange('author', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0543')}</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => onChange('subject', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0544')}</label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => onChange('keywords', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0545')}</label>
                <input
                  type="text"
                  value={creator}
                  onChange={(e) => onChange('creator', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}
