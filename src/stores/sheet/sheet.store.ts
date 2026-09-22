import { create } from 'zustand';

import type { SheetStore, SheetMode, OpenSheetConfig } from '@/types/sheet';

// ─── Default State ────────────────────────────────────────────────────────────

const DEFAULT_STATE: Omit<
  SheetStore,
  'open' | 'close' | 'setDirty' | 'switchMode'
> = {
  isOpen: false,
  sheetKey: '',
  mode: 'view',
  id: undefined,
  title: '',
  description: undefined,
  size: 'default',
  prefill: undefined,
  footerSlot: undefined,
  onSuccess: undefined,
  _isDirty: false,
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useSheetStore = create<SheetStore>((set, get) => ({
  ...DEFAULT_STATE,

  // ── open ──────────────────────────────────────────────────────────────────
  /**
   * Opens the sheet with the given configuration.
   * Always resets the dirty flag so stale state from a previous session
   * can never block the new sheet from closing.
   */
  open: (config: OpenSheetConfig) => {
    set({
      isOpen: true,
      sheetKey: config.sheetKey,
      mode: config.mode,
      id: config.id,
      title: config.title,
      description: config.description,
      size: config.size ?? 'default',
      prefill: config.prefill,
      footerSlot: config.footerSlot,
      onSuccess: config.onSuccess,
      _isDirty: false,
    });
  },

  // ── close ─────────────────────────────────────────────────────────────────
  /**
   * Closes the sheet and resets every state field back to its default.
   * Does NOT check the dirty flag — the unsaved-changes confirmation lives
   * in `GlobalSheet` before it calls `close()`.
   */
  close: () => {
    set({ ...DEFAULT_STATE });
  },

  // ── setDirty ──────────────────────────────────────────────────────────────
  /**
   * Called by edit / add content components to synchronise the form's dirty
   * state with the store so `GlobalSheet` can show the "unsaved changes"
   * warning before closing.
   *
   * Usage inside a feature sheet:
   * ```ts
   * const setDirty = useSheetStore((s) => s.setDirty);
   * useEffect(() => { setDirty(form.formState.isDirty); }, [form.formState.isDirty]);
   * ```
   */
  setDirty: (dirty: boolean) => {
    if (get()._isDirty === dirty) return; // skip redundant updates
    set({ _isDirty: dirty });
  },

  // ── switchMode ────────────────────────────────────────────────────────────
  /**
   * Transitions the active sheet to a different mode without closing it.
   * Most commonly used to switch "view" → "edit" when the user clicks the
   * Edit button inside the view action bar, avoiding a visible close/reopen
   * flicker.
   *
   * - Resets the dirty flag on every mode switch.
   * - Preserves all other state (id, title, description, size, prefill).
   */
  switchMode: (mode: SheetMode) => {
    set({ mode, _isDirty: false });
  },
}));
