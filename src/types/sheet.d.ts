import type React from 'react';
import type { IconSvgElement } from '@hugeicons/react';

// ─── Core Sheet Types ────────────────────────────────────────────────────────

export type SheetMode = 'view' | 'edit' | 'add';

export type SheetSize = 'sm' | 'default' | 'lg' | 'xl' | '2xl' | 'full';

/** Payload delivered to `onSuccess` callbacks when an add sheet creates a record. */
export interface SheetSuccessResult {
  id?: string;
}

export interface OpenSheetConfig {
  sheetKey: string;
  mode: SheetMode;
  id?: string;
  title: string;
  description?: string;
  size?: SheetSize;
  prefill?: Record<string, unknown>;
  footerSlot?: React.ReactNode;
  onSuccess?: (result?: SheetSuccessResult) => void;
}

export interface SheetStoreState {
  isOpen: boolean;
  sheetKey: string;
  mode: SheetMode;
  id?: string;
  title: string;
  description?: string;
  size?: SheetSize;
  prefill?: Record<string, unknown>;
  footerSlot?: React.ReactNode;
  onSuccess?: (result?: SheetSuccessResult) => void;
  _isDirty: boolean;
}

export interface SheetStoreActions {
  open: (config: OpenSheetConfig) => void;
  close: () => void;
  setDirty: (dirty: boolean) => void;
  switchMode: (mode: SheetMode) => void;
}

export type SheetStore = SheetStoreState & SheetStoreActions;

// ─── Sheet Registry & Content Component Props ───────────────────────────────

export interface ViewSheetProps {
  id: string;
}

export interface EditSheetProps {
  id: string;
  formId: string;
  onSuccess?: (result?: SheetSuccessResult) => void;
}

export interface AddSheetProps {
  formId: string;
  prefill?: Record<string, unknown>;
  onSuccess?: (result?: SheetSuccessResult) => void;
}

export interface SheetFeatureConfig {
  view?: React.ComponentType<ViewSheetProps>;
  edit?: React.ComponentType<EditSheetProps>;
  add?: React.ComponentType<AddSheetProps>;
}

export type SheetRegistry = Record<string, SheetFeatureConfig>;

// ─── Helper Component Props ──────────────────────────────────────────────────

export interface SheetActionBarButtonProps {
  icon?: IconSvgElement;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export interface SheetDetailRowProps {
  label: string;
  value?: React.ReactNode;
  fallback?: string;
  multiline?: boolean;
  copyable?: boolean;
  className?: string;
}

export interface SheetErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export interface SheetSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

export interface SheetFieldProps {
  label: string;
  value?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  copyable?: boolean;
}

export interface SheetFieldGroupProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export type SheetBadgeVariant =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'income'
  | 'expense'
  | 'warning'
  | 'info'
  | 'balance';

/** Props for `SheetStatusBadge` */
export interface SheetStatusBadgeProps {
  status: string;
  colorMap?: Record<string, SheetBadgeVariant>;
  className?: string;
}

/** Props for `SheetLoadingSkeleton` */
export interface SheetLoadingSkeletonProps {
  rows?: number;
  className?: string;
}

/** Props for `SheetCharCounter` */
export interface SheetCharCounterProps {
  current: number;
  max: number;
  className?: string;
}
