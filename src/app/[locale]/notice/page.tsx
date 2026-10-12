import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NOTICE — OfficeTools (PDFCraft fork)',
  description: 'AGPL-3.0 open-source component notice for the OfficeTools PDF toolkit.',
};

export default function NoticePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">NOTICE</h1>
      <p className="text-[hsl(var(--color-muted-foreground))] text-sm mb-8">
        This OfficeTools PDF toolkit is a white-labeled fork of the open-source project{' '}
        <a className="underline" href="https://github.com/PDFCraftTool/pdfcraft">PDFCraft</a>{' '}
        (by PDFCraftTool), which is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0).
      </p>

      <h2 className="text-xl font-semibold mb-3">Open-source source code</h2>
      <p className="mb-4">
        In accordance with the AGPL-3.0 license, the complete corresponding source code of this
        toolkit, including all white-label/branding modifications, is publicly available at:
      </p>
      <p className="mb-6">
        <a className="underline text-[hsl(var(--color-primary))]" href="https://github.com/fyosua/officetools-pdfcraft">
          https://github.com/fyosua/officetools-pdfcraft
        </a>
      </p>

      <h2 className="text-xl font-semibold mb-3">License</h2>
      <p className="mb-6 text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]">
        This software is free software: you can redistribute it and/or modify it under the terms of
        the GNU Affero General Public License as published by the Free Software Foundation, either
        version 3 of the License, or (at your option) any later version. This program is distributed
        in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
        warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the AGPL-3.0 license for
        details. A copy of the license is included with the distribution as <code>LICENSE</code>.
      </p>

      <h2 className="text-xl font-semibold mb-3">Attribution</h2>
      <p className="text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]">
        Original project: <a className="underline" href="https://github.com/PDFCraftTool/pdfcraft">PDFCraftTool/pdfcraft</a>{' '}
        — Copyright (c) PDFCraftTool contributors. Used under AGPL-3.0.
      </p>
    </div>
  );
}
