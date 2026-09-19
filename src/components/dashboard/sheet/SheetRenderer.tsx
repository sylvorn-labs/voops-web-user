import React from 'react';

import type {
  SheetRegistry,
  ViewSheetProps,
  EditSheetProps,
  AddSheetProps,
} from '@/types/sheet.d';

import { SheetLoadingSkeleton } from './SheetLoadingSkeleton';

// ─── Lazy Sheet Imports ──────────────────────────────────────

const BusinessAddSheet = React.lazy(() =>
  import('@/pages/dashboard/businesses/components/sheet/BusinessAddSheet').then(
    m => ({ default: m.BusinessAddSheet }),
  ),
);

const BusinessEditSheet = React.lazy(() =>
  import('@/pages/dashboard/businesses/components/sheet/BusinessEditSheet').then(
    m => ({ default: m.BusinessEditSheet }),
  ),
);

// ─── Registry ────────────────────────────────────────────────
//
// Add a new entry here whenever a new feature needs sheet support.
// The key must match the `sheetKey` passed to `useSheetStore().open(...)`.
//
// Any of the three mode keys can be omitted if the feature doesn't support
// that mode — the renderer will fall back to <SheetNotConfigured />.

const SHEET_REGISTRY: SheetRegistry = {
  business: {
    add: BusinessAddSheet,
    edit: BusinessEditSheet,
  },
};

// ─── Not-Configured Fallback ─────────────────────────────────

function SheetNotConfigured({
  sheetKey,
  mode,
}: {
  sheetKey: string;
  mode: string;
}) {
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-8 text-center">
      <div className="flex size-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5"
          aria-hidden="true"
        >
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-foreground text-sm font-medium">
          Sheet not configured
        </p>
        <p className="text-muted-foreground max-w-xs text-xs leading-relaxed">
          No{' '}
          <code className="bg-muted rounded px-1 py-0.5 font-mono">{mode}</code>{' '}
          component is registered for{' '}
          <code className="bg-muted rounded px-1 py-0.5 font-mono">
            &quot;{sheetKey}&quot;
          </code>
          . Add it to the{' '}
          <code className="bg-muted rounded px-1 py-0.5 font-mono">
            SHEET_REGISTRY
          </code>{' '}
          in{' '}
          <code className="bg-muted rounded px-1 py-0.5 font-mono">
            SheetRenderer.tsx
          </code>
          .
        </p>
      </div>
    </div>
  );
}

// ─── Props ───────────────────────────────────────────────────

interface SheetRendererProps {
  sheetKey: string;
  mode: 'view' | 'edit' | 'add';
  /** Present for "view" and "edit" modes. Always undefined for "add". */
  id?: string;
  /** Stable HTML form id forwarded to edit / add content components. */
  formId: string;
  prefill?: Record<string, unknown>;
  onSuccess?: () => void;
}

// ─── Renderer ────────────────────────────────────────────────

export function SheetRenderer({
  sheetKey,
  mode,
  id,
  formId,
  prefill,
  onSuccess,
}: SheetRendererProps) {
  const config = SHEET_REGISTRY[sheetKey];

  // ─── View ──────────────────────────────────────────────────

  if (mode === 'view') {
    const ViewComponent = config?.view as
      React.ComponentType<ViewSheetProps> | undefined;

    if (!ViewComponent || !id) {
      return <SheetNotConfigured sheetKey={sheetKey} mode="view" />;
    }

    return (
      <React.Suspense fallback={<SheetLoadingSkeleton />}>
        <ViewComponent id={id} />
      </React.Suspense>
    );
  }

  // ─── Edit ──────────────────────────────────────────────────

  if (mode === 'edit') {
    const EditComponent = config?.edit as
      React.ComponentType<EditSheetProps> | undefined;

    if (!EditComponent || !id) {
      return <SheetNotConfigured sheetKey={sheetKey} mode="edit" />;
    }

    return (
      <React.Suspense fallback={<SheetLoadingSkeleton />}>
        <EditComponent id={id} formId={formId} onSuccess={onSuccess} />
      </React.Suspense>
    );
  }

  // ─── Add ───────────────────────────────────────────────────

  if (mode === 'add') {
    const AddComponent = config?.add as
      React.ComponentType<AddSheetProps> | undefined;

    if (!AddComponent) {
      return <SheetNotConfigured sheetKey={sheetKey} mode="add" />;
    }

    return (
      <React.Suspense fallback={<SheetLoadingSkeleton />}>
        <AddComponent formId={formId} prefill={prefill} onSuccess={onSuccess} />
      </React.Suspense>
    );
  }

  // Should never be reached — TypeScript exhaustiveness
  return null;
}
