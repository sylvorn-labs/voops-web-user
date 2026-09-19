import React from 'react';

import type {
  SheetRegistry,
  ViewSheetProps,
  EditSheetProps,
  AddSheetProps,
} from '@/types/sheet.d';

import { SheetLoadingSkeleton } from './SheetLoadingSkeleton';

// ─── Lazy Sheet Imports ──────────────────────────────────────────────────────

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

const CategoryAddSheet = React.lazy(() =>
  import('@/pages/dashboard/categories/components/sheets/CategoryAddSheet').then(
    m => ({ default: m.CategoryAddSheet }),
  ),
);

const CategoryEditSheet = React.lazy(() =>
  import('@/pages/dashboard/categories/components/sheets/CategoryEditSheet').then(
    m => ({ default: m.CategoryEditSheet }),
  ),
);

const CategoryViewSheet = React.lazy(() =>
  import('@/pages/dashboard/categories/components/sheets/CategoryViewSheet').then(
    m => ({ default: m.CategoryViewSheet }),
  ),
);

// ─── Registry ────────────────────────────────────────────────────────────────
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
  category: {
    view: CategoryViewSheet,
    add: CategoryAddSheet,
    edit: CategoryEditSheet,
  },
};

// ─── Not-Configured Fallback ─────────────────────────────────────────────────

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
    <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
      <p className="text-muted-foreground text-sm font-medium">
        No sheet component registered for key{' '}
        <code className="text-foreground bg-muted rounded px-1 py-0.5 font-mono text-xs">
          &quot;{sheetKey}&quot;
        </code>{' '}
        in mode{' '}
        <code className="text-foreground bg-muted rounded px-1 py-0.5 font-mono text-xs">
          &quot;{mode}&quot;
        </code>
        .
      </p>
      <p className="text-muted-foreground text-xs">
        Register it in{' '}
        <code className="bg-muted rounded px-1 py-0.5 font-mono">
          src/components/dashboard/sheet/SheetRenderer.tsx
        </code>
      </p>
    </div>
  );
}

// ─── SheetRenderer Component ─────────────────────────────────────────────────

export interface SheetRendererProps {
  sheetKey: string;
  mode: 'view' | 'edit' | 'add';
  id?: string;
  formId?: string;
  prefill?: Record<string, unknown>;
  onSuccess?: () => void;
}

/**
 * `SheetRenderer`
 *
 * Looks up the active feature sheet in `SHEET_REGISTRY` by `(sheetKey, mode)`
 * and renders it inside a `<React.Suspense>` boundary with a skeleton fallback.
 *
 * Dispatches the correct props based on the active mode:
 * - `view`: receives `{ id }`
 * - `edit`: receives `{ id, formId, onSuccess }`
 * - `add`:  receives `{ formId, prefill, onSuccess }`
 */
export function SheetRenderer({
  sheetKey,
  mode,
  id,
  formId = 'sheet-form',
  prefill,
  onSuccess,
}: SheetRendererProps) {
  const featureSheets = SHEET_REGISTRY[sheetKey];

  if (!featureSheets) {
    return <SheetNotConfigured sheetKey={sheetKey} mode={mode} />;
  }

  return (
    <React.Suspense fallback={<SheetLoadingSkeleton />}>
      {mode === 'view' &&
        id &&
        (featureSheets.view ? (
          React.createElement(
            featureSheets.view as React.ComponentType<ViewSheetProps>,
            { id },
          )
        ) : (
          <SheetNotConfigured sheetKey={sheetKey} mode={mode} />
        ))}

      {mode === 'edit' &&
        id &&
        (featureSheets.edit ? (
          React.createElement(
            featureSheets.edit as React.ComponentType<EditSheetProps>,
            { id, formId, onSuccess },
          )
        ) : (
          <SheetNotConfigured sheetKey={sheetKey} mode={mode} />
        ))}

      {mode === 'add' &&
        (featureSheets.add ? (
          React.createElement(
            featureSheets.add as React.ComponentType<AddSheetProps>,
            { formId, prefill, onSuccess },
          )
        ) : (
          <SheetNotConfigured sheetKey={sheetKey} mode={mode} />
        ))}
    </React.Suspense>
  );
}
