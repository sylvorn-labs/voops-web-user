import { useEffect } from 'react';

import { useSheetStore } from '@/stores/sheet/sheet.store';

/**
 * `useSheetDirty`
 *
 * Syncs a react-hook-form `isDirty` boolean up to the global sheet store so
 * that `GlobalSheet` can intercept close attempts and show the "unsaved
 * changes" confirmation dialog when the form has been touched.
 *
 * Also registers a cleanup effect that resets the dirty flag to `false` when
 * the sheet component unmounts, preventing stale state from leaking into the
 * next sheet session.
 *
 * ### Usage
 * Drop this inside any Add or Edit sheet, replacing the two manual `useEffect`
 * calls that every sheet previously duplicated:
 *
 * ```ts
 * const { formState: { isDirty } } = useForm<FormValues>({ … });
 * useSheetDirty(isDirty);
 * ```
 *
 * ### Before (repeated in every Add/Edit sheet)
 * ```ts
 * const setDirty = useSheetStore((s) => s.setDirty);
 *
 * useEffect(() => {
 *   setDirty(isDirty);
 * }, [isDirty, setDirty]);
 *
 * useEffect(() => {
 *   return () => { setDirty(false); };
 *   // eslint-disable-next-line react-hooks/exhaustive-deps
 * }, []);
 * ```
 *
 * ### After
 * ```ts
 * useSheetDirty(isDirty);
 * ```
 */
export function useSheetDirty(isDirty: boolean): void {
  const setDirty = useSheetStore(s => s.setDirty);

  // Push the current dirty state up to the store on every render where it
  // changes, so GlobalSheet can gate close attempts behind the confirmation
  // dialog as soon as the first field is touched.
  useEffect(() => {
    setDirty(isDirty);
  }, [isDirty, setDirty]);

  // Always reset the dirty flag when the sheet component unmounts so that
  // stale "dirty" state from this session never leaks into the next open.
  // The empty dependency array is intentional — we only want the cleanup to
  // run on unmount, not on every render.
  useEffect(() => {
    return () => {
      setDirty(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
