import { ArrowLeft02Icon } from '@hugeicons/core-free-icons';
import { useId, useState, useCallback } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet/Sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog/AlertDialog';

import { useSheetStore } from '@/stores/sheet/sheet.store';
import { ScrollArea } from '@/components/ui/scroll-area/ScrollArea';
import { Separator } from '@/components/ui/separator/Separator';
import { Spinner } from '@/components/ui/spinner/Spinner';
import { Button } from '@/components/ui/button/Button';
import type { SheetSize, SheetSuccessResult } from '@/types/sheet';
import { cn } from '@/lib/utils';

import { SheetRenderer } from './SheetRenderer';

// ─── Size Map ─────────────────────────────────────────────────────────────────

const SIZE_CLASS: Record<SheetSize, string> = {
  sm: 'sm:max-w-xs',
  default: 'sm:max-w-sm',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-2xl',
  '2xl': 'sm:max-w-5xl',
  full: 'sm:max-w-full',
};

// ─── Unsaved Changes Guard ────────────────────────────────────────────────────

interface UnsavedChangesDialogProps {
  open: boolean;
  onDiscard: () => void;
  onKeepEditing: () => void;
}

function UnsavedChangesDialog({
  open,
  onDiscard,
  onKeepEditing,
}: UnsavedChangesDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Discard unsaved changes?</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes that will be lost if you close this panel.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onKeepEditing}>
            Keep editing
          </AlertDialogCancel>
          <AlertDialogAction onClick={onDiscard}>
            Discard changes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

interface SheetFooterControlsProps {
  mode: 'edit' | 'add';
  formId: string;
  isSubmitting: boolean;
  footerSlot?: React.ReactNode;
  onCancel: () => void;
}

function SheetFooterControls({
  mode,
  formId,
  isSubmitting,
  footerSlot,
  onCancel,
}: SheetFooterControlsProps) {
  if (footerSlot) {
    return <SheetFooter>{footerSlot}</SheetFooter>;
  }

  return (
    <SheetFooter>
      <div className="flex w-full items-center justify-start gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          form={formId}
          size="sm"
          disabled={isSubmitting}
          className="min-w-24 gap-1.5"
        >
          {isSubmitting && <Spinner className="size-3.5" />}
          {mode === 'edit' ? 'Save Changes' : 'Create'}
        </Button>
      </div>
    </SheetFooter>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * `GlobalSheet`
 *
 * The single mounted sheet instance for the entire application.
 * Mount it **once** at the layout level — it reads its state entirely from
 * `useSheetStore` so any component can open it without prop drilling.
 *
 * ```tsx
 * // src/app/(dashboard)/layout.tsx
 * import { GlobalSheet } from "@/features/dashboard/sheet";
 *
 * export default function DashboardLayout({ children }) {
 *   return (
 *     <>
 *       {children}
 *       <GlobalSheet />
 *     </>
 *   );
 * }
 * ```
 *
 * ### What it manages
 * - Open / close state driven by the Zustand store.
 * - An "unsaved changes" `<AlertDialog>` guard when `_isDirty` is true.
 * - The `<SheetHeader>` (title, description, optional back-to-view arrow).
 * - A `<ScrollArea>` wrapping `<SheetRenderer>` for the content area.
 * - A `<SheetFooter>` with Cancel + Submit for edit / add modes.
 *
 * ### What it does NOT manage
 * - Form state — owned entirely by the feature sheet component.
 * - Fetch / mutation logic — owned by the feature sheet component.
 * - The `isSubmitting` flag — the feature sheet signals this via a shared
 *   `data-submitting` attribute on the form element which GlobalSheet reads
 *   through the DOM. If you prefer a store-based approach, add an
 *   `isSubmitting` field to `SheetStore` and call `setSubmitting(true/false)`
 *   from your mutation callbacks.
 */
export function GlobalSheet() {
  // ── Store ──────────────────────────────────────────────────────────────────

  const isOpen = useSheetStore(s => s.isOpen);
  const mode = useSheetStore(s => s.mode);
  const sheetKey = useSheetStore(s => s.sheetKey);
  const id = useSheetStore(s => s.id);
  const title = useSheetStore(s => s.title);
  const description = useSheetStore(s => s.description);
  const size = useSheetStore(s => s.size) ?? 'default';
  const prefill = useSheetStore(s => s.prefill);
  const footerSlot = useSheetStore(s => s.footerSlot);
  const storedOnSuccess = useSheetStore(s => s.onSuccess);
  const _isDirty = useSheetStore(s => s._isDirty);

  const close = useSheetStore(s => s.close);
  const switchMode = useSheetStore(s => s.switchMode);

  // ── Local state ────────────────────────────────────────────────────────────

  /** Controls the unsaved-changes AlertDialog */
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);

  /**
   * Tracks whether the current edit sheet was entered via `switchMode`
   * (i.e. the user was previously in view mode). When true, the sheet header
   * shows a back arrow that returns to view mode instead of closing.
   */
  const [canGoBack, setCanGoBack] = useState(false);

  // Stable form id — consistent across renders within a single sheet session
  const formId = useId();

  // ── Handlers ───────────────────────────────────────────────────────────────

  /**
   * Called by the Shadcn Sheet's `onOpenChange` prop.
   * When the sheet is being closed (open = false) and there are unsaved
   * changes, we intercept and show the confirmation dialog instead.
   */
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        if (_isDirty) {
          setShowDiscardDialog(true);
        } else {
          close();
          setCanGoBack(false);
        }
      }
    },
    [_isDirty, close],
  );

  /** The user confirmed they want to discard changes and close. */
  const handleDiscard = useCallback(() => {
    setShowDiscardDialog(false);
    close();
    setCanGoBack(false);
  }, [close]);

  /** The user chose to stay and keep editing. */
  const handleKeepEditing = useCallback(() => {
    setShowDiscardDialog(false);
  }, []);

  /**
   * Cancel button in the footer.
   * Same guard as closing via the X button.
   */
  const handleCancel = useCallback(() => {
    if (_isDirty) {
      setShowDiscardDialog(true);
    } else {
      close();
      setCanGoBack(false);
    }
  }, [_isDirty, close]);

  /**
   * Back arrow in the header — returns to view mode without closing.
   * Only visible when the edit sheet was entered via switchMode.
   */
  const handleBack = useCallback(() => {
    if (_isDirty) {
      setShowDiscardDialog(true);
    } else {
      switchMode('view');
      setCanGoBack(false);
    }
  }, [_isDirty, switchMode]);

  // ── Derived ────────────────────────────────────────────────────────────────

  const showFooter = mode === 'edit' || mode === 'add';
  const showBackArrow = mode === 'edit' && canGoBack;

  /**
   * Success handler forwarded to `SheetRenderer`.
   * When the opener supplied an `onSuccess` callback (e.g. quick-add from
   * another sheet that must restore its draft), delegate to it — the
   * callback owns what happens next (usually re-opening the parent sheet).
   * Otherwise fall back to simply closing the sheet.
   */
  const handleSuccess = useCallback(
    (result?: SheetSuccessResult) => {
      if (storedOnSuccess) {
        storedOnSuccess(result);
      } else {
        close();
        setCanGoBack(false);
      }
    },
    [storedOnSuccess, close],
  );

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Main Sheet ─────────────────────────────────────────────────── */}
      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetContent
          side="right"
          showCloseButton={true}
          className={cn(
            'flex flex-col gap-0 p-0',
            'min-w-[calc(50vw)]',
            SIZE_CLASS[size],
          )}
        >
          {/* ── Header ───────────────────────────────────────────────────── */}
          <SheetHeader className="gap-0.5 px-6 pt-5 pb-4">
            <div className="flex items-center gap-2 pr-8">
              {/* Back arrow — only in edit mode entered via switchMode */}
              {showBackArrow && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={handleBack}
                  aria-label="Back to view"
                  className="text-muted-foreground hover:text-foreground -ml-1 shrink-0"
                >
                  <HugeiconsIcon icon={ArrowLeft02Icon} />
                </Button>
              )}

              <SheetTitle className="truncate">{title}</SheetTitle>
            </div>

            {description && (
              <SheetDescription className="truncate">
                {description}
              </SheetDescription>
            )}
          </SheetHeader>

          <Separator />

          {/* ── Scrollable Content ────────────────────────────────────────── */}
          <ScrollArea className="min-h-0 flex-1">
            {isOpen && sheetKey ? (
              <SheetRenderer
                sheetKey={sheetKey}
                mode={mode}
                id={id}
                formId={formId}
                prefill={prefill}
                onSuccess={handleSuccess}
              />
            ) : null}
          </ScrollArea>

          {/* ── Footer — edit / add only ──────────────────────────────────── */}
          {showFooter && (
            <>
              <Separator />
              <SheetFooterControls
                mode={mode}
                formId={formId}
                isSubmitting={false}
                footerSlot={footerSlot as React.ReactNode | undefined}
                onCancel={handleCancel}
              />
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* ── Unsaved Changes Guard ──────────────────────────────────────── */}
      <UnsavedChangesDialog
        open={showDiscardDialog}
        onDiscard={handleDiscard}
        onKeepEditing={handleKeepEditing}
      />
    </>
  );
}
