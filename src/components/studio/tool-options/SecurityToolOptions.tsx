'use client';

import React from 'react';
import {
  ShieldAlert,
  Search,
  EyeOff,
  Key,
  FileCheck2,
  Lock,
  Anchor,
  Sparkles,
} from 'lucide-react';
import { getStudioText } from '@/lib/i18n/studio';
import type { Locale } from '@/lib/i18n/config';

interface SecurityToolOptionsProps {
  toolId: string;
  options: Record<string, any>;
  onChange: (key: string, value: any) => void;
  totalPages?: number;
  locale?: string;
}

export function SecurityToolOptions({
  toolId,
  options,
  onChange,
  totalPages = 1,
  locale = 'zh',
}: SecurityToolOptionsProps) {

  switch (toolId) {
    case 'sanitize-pdf':
    case 'deep-sanitize': {
      const removeJavaScript = options.removeJavaScript ?? true;
      const removeAttachments = options.removeAttachments ?? true;
      const removeLinks = options.removeLinks ?? true;
      const flattenForms = options.flattenForms ?? true;
      const removeMetadata = options.removeMetadata ?? true;
      const removeAnnotations = options.removeAnnotations ?? false;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0546')}
            </label>
            <div className="space-y-2 text-xs">
              {[
                { key: 'removeJavaScript', label: getStudioText(locale as Locale, 'k0547'), val: removeJavaScript },
                { key: 'removeAttachments', label: getStudioText(locale as Locale, 'k0548'), val: removeAttachments },
                { key: 'removeLinks', label: getStudioText(locale as Locale, 'k0549'), val: removeLinks },
                { key: 'flattenForms', label: getStudioText(locale as Locale, 'k0550'), val: flattenForms },
                { key: 'removeMetadata', label: getStudioText(locale as Locale, 'k0551'), val: removeMetadata },
                { key: 'removeAnnotations', label: getStudioText(locale as Locale, 'k0552'), val: removeAnnotations },
              ].map((item) => (
                <label key={item.key} className="flex items-center justify-between p-2 rounded-lg border border-border/50 hover:bg-muted/40 cursor-pointer">
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

    case 'find-and-redact':
    case 'redact-pdf': {
      const searchTermsInput = options.searchTermsInput || '';
      const caseSensitive = options.caseSensitive ?? false;
      const wholeWord = options.wholeWord ?? false;
      const useRegex = options.useRegex ?? false;
      const redactionColor = options.redactionColor || '#000000';
      const replacementText = options.replacementText || '';

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0553')}
            </label>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                {getStudioText(locale as Locale, 'k0554')}
              </label>
              <input
                type="text"
                value={searchTermsInput}
                onChange={(e) => onChange('searchTermsInput', e.target.value)}
                placeholder={getStudioText(locale as Locale, 'k0555')}
                className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-background"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs pt-1">
              {[
                { key: 'caseSensitive', label: getStudioText(locale as Locale, 'k0556'), val: caseSensitive },
                { key: 'wholeWord', label: getStudioText(locale as Locale, 'k0557'), val: wholeWord },
                { key: 'useRegex', label: getStudioText(locale as Locale, 'k0558'), val: useRegex },
              ].map((m) => (
                <label key={m.key} className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={m.val}
                    onChange={(e) => onChange(m.key, e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-primary"
                  />
                  <span className="text-[11px]">{m.label}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs pt-2">
              <span>{getStudioText(locale as Locale, 'k0559')}</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={redactionColor}
                  onChange={(e) => onChange('redactionColor', e.target.value)}
                  className="w-7 h-7 rounded border border-border cursor-pointer p-0.5"
                />
                <span className="font-mono text-muted-foreground">{redactionColor}</span>
              </div>
            </div>
            <div className="space-y-1.5 pt-1">
              <label className="text-xs text-muted-foreground">{getStudioText(locale as Locale, 'k0560')}</label>
              <input
                type="text"
                value={replacementText}
                onChange={(e) => onChange('replacementText', e.target.value)}
                placeholder={getStudioText(locale as Locale, 'k0561')}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-border bg-background"
              />
            </div>
          </div>
        </div>
      );
    }

    case 'smart-data-redactor': {
      const idRedact = options.idRedact ?? true;
      const phoneRedact = options.phoneRedact ?? true;
      const emailRedact = options.emailRedact ?? true;
      const customKeywords = options.customKeywords || '';

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0562')}
            </label>
            <div className="space-y-2 text-xs">
              {[
                { key: 'idRedact', label: getStudioText(locale as Locale, 'k0563'), val: idRedact },
                { key: 'phoneRedact', label: getStudioText(locale as Locale, 'k0564'), val: phoneRedact },
                { key: 'emailRedact', label: getStudioText(locale as Locale, 'k0565'), val: emailRedact },
              ].map((item) => (
                <label key={item.key} className="flex items-center justify-between p-2 rounded-lg border border-border/50 hover:bg-muted/40 cursor-pointer">
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
            <div className="space-y-1.5 pt-2">
              <label className="text-xs text-muted-foreground">{getStudioText(locale as Locale, 'k0566')}</label>
              <input
                type="text"
                value={customKeywords}
                onChange={(e) => onChange('customKeywords', e.target.value)}
                placeholder={getStudioText(locale as Locale, 'k0567')}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-border bg-background"
              />
            </div>
          </div>
        </div>
      );
    }

    case 'change-permissions': {
      const allowPrinting = options.allowPrinting ?? true;
      const allowCopying = options.allowCopying ?? false;
      const allowModifying = options.allowModifying ?? false;
      const allowAnnotating = options.allowAnnotating ?? false;
      const ownerPassword = options.ownerPassword || '';

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0568')}
            </label>
            <div className="space-y-2 text-xs">
              {[
                { key: 'allowPrinting', label: getStudioText(locale, 'k0161'), val: allowPrinting },
                { key: 'allowCopying', label: getStudioText(locale as Locale, 'k0569'), val: allowCopying },
                { key: 'allowModifying', label: getStudioText(locale as Locale, 'k0570'), val: allowModifying },
                { key: 'allowAnnotating', label: getStudioText(locale as Locale, 'k0571'), val: allowAnnotating },
              ].map((p) => (
                <label key={p.key} className="flex items-center justify-between p-2 rounded-lg border border-border/50 hover:bg-muted/40 cursor-pointer">
                  <span>{p.label}</span>
                  <input
                    type="checkbox"
                    checked={p.val}
                    onChange={(e) => onChange(p.key, e.target.checked)}
                    className="w-4 h-4 rounded text-primary"
                  />
                </label>
              ))}
            </div>
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-medium text-foreground">{getStudioText(locale as Locale, 'k0572')}</label>
              <input
                type="password"
                value={ownerPassword}
                onChange={(e) => onChange('ownerPassword', e.target.value)}
                placeholder={getStudioText(locale as Locale, 'k0573')}
                className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-background"
              />
            </div>
          </div>
        </div>
      );
    }

    case 'digital-sign-pdf': {
      const reason = options.reason || getStudioText(locale as Locale, 'k0574');
      const location = options.location || '';
      const contactInfo = options.contactInfo || '';
      const enableVisible = options.enableVisible ?? true;
      const sigPage = options.sigPage ?? 1;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0575')}
            </label>
            <div className="space-y-2 text-xs">
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0576')}</label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => onChange('reason', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0577')}</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => onChange('location', e.target.value)}
                  placeholder={getStudioText(locale as Locale, 'k0578')}
                  className="w-full px-3 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0579')}</label>
                <input
                  type="text"
                  value={contactInfo}
                  onChange={(e) => onChange('contactInfo', e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full px-3 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
              <div className="pt-2 flex items-center justify-between">
                <span>{getStudioText(locale as Locale, 'k0580')}</span>
                <input
                  type="checkbox"
                  checked={enableVisible}
                  onChange={(e) => onChange('enableVisible', e.target.checked)}
                  className="w-4 h-4 rounded text-primary"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'cert-cryptor': {
      const sealPos = options.sealPos || 'bottom-right';
      const waxColor = options.waxColor || 'red';

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0581')}
            </label>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">{getStudioText(locale as Locale, 'k0582')}</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'red', label: getStudioText(locale as Locale, 'k0583') },
                  { id: 'gold', label: getStudioText(locale as Locale, 'k0584') },
                  { id: 'blue', label: getStudioText(locale as Locale, 'k0585') },
                ].map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => onChange('waxColor', w.id)}
                    className={`py-1.5 px-2 text-xs rounded-lg border text-center ${
                      waxColor === w.id
                        ? 'border-primary bg-primary/10 text-primary font-medium'
                        : 'border-border/60 hover:bg-muted/50'
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5 pt-2">
              <label className="text-xs text-muted-foreground">{getStudioText(locale as Locale, 'k0586')}</label>
              <select
                value={sealPos}
                onChange={(e) => onChange('sealPos', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-border bg-background"
              >
                <option value="bottom-right">{getStudioText(locale, 'k0183')}</option>
                <option value="top-right">{getStudioText(locale, 'k0182')}</option>
                <option value="center">{getStudioText(locale as Locale, 'k0587')}</option>
              </select>
            </div>
          </div>
        </div>
      );
    }

    case 'pdf-signature-anchor-helper': {
      const pageNumber = options.pageNumber ?? 1;
      const anchorX = options.anchorX ?? 0.8;
      const anchorY = options.anchorY ?? 0.8;
      const anchorLabel = options.anchorLabel || getStudioText(locale as Locale, 'k0588');

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {getStudioText(locale as Locale, 'k0589')}
            </label>
            <div className="space-y-1.5">
              <label className="text-xs text-foreground font-medium">{getStudioText(locale as Locale, 'k0590')}</label>
              <input
                type="text"
                value={anchorLabel}
                onChange={(e) => onChange('anchorLabel', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-background"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs pt-1">
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0591')}</label>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={pageNumber}
                  onChange={(e) => onChange('pageNumber', parseInt(e.target.value) || 1)}
                  className="w-full px-2 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0592')}</label>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="1"
                  value={anchorX}
                  onChange={(e) => onChange('anchorX', parseFloat(e.target.value) || 0.8)}
                  className="w-full px-2 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{getStudioText(locale as Locale, 'k0593')}</label>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="1"
                  value={anchorY}
                  onChange={(e) => onChange('anchorY', parseFloat(e.target.value) || 0.8)}
                  className="w-full px-2 py-1.5 rounded-lg border border-border bg-background"
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
