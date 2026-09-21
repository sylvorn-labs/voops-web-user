# Global Sheet Component

A unified, application-wide slide-over panel system built on top of [Shadcn UI's Sheet](https://ui.shadcn.com/docs/components/sheet), [TanStack Query v5](https://tanstack.com/query/latest), [Zustand v5](https://zustand.dev/), and [React Hook Form](https://react-hook-form.com/) + [Zod v4](https://zod.dev/). A single `<GlobalSheet />` component is mounted once at the layout level and handles every panel in the application — view, edit, and add — from a centrally-managed Zustand store.

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [File Structure](#file-structure)
4. [Modes at a Glance](#modes-at-a-glance)
5. [Quick Start — Opening a Sheet](#quick-start--opening-a-sheet)
6. [Layout Setup](#layout-setup)
7. [Zustand Store — `useSheetStore`](#zustand-store--usesheetstore)
   - [State Shape](#state-shape)
   - [Actions](#actions)
   - [Opening the Sheet](#opening-the-sheet)
   - [Closing the Sheet](#closing-the-sheet)
   - [Switching Mode Without Closing](#switching-mode-without-closing)
   - [Dirty State Tracking](#dirty-state-tracking)
   - [Accessing the Store Outside React](#accessing-the-store-outside-react)
8. [GlobalSheet Component](#globalsheet-component)
   - [What It Manages](#what-it-manages)
   - [What It Does Not Manage](#what-it-does-not-manage)
   - [Sheet Sizes](#sheet-sizes)
   - [Header Anatomy](#header-anatomy)
   - [Footer Anatomy](#footer-anatomy)
   - [Unsaved Changes Guard](#unsaved-changes-guard)
   - [The Back Arrow](#the-back-arrow)
9. [SheetRenderer — The Registry](#sheetrenderer--the-registry)
   - [How Dispatch Works](#how-dispatch-works)
   - [Registering a New Feature](#registering-a-new-feature)
   - [SheetNotConfigured Fallback](#sheetnotconfigured-fallback)
10. [Content Component Contracts](#content-component-contracts)
    - [ViewSheetProps](#viewsheetprops)
    - [EditSheetProps](#editsheetprops)
    - [AddSheetProps](#addsheetprops)
11. [View Mode — Step-by-Step](#view-mode--step-by-step)
    - [Step 1 — Fetch the Record](#step-1--fetch-the-record)
    - [Step 2 — Handle Loading and Error States](#step-2--handle-loading-and-error-states)
    - [Step 3 — Render Field Groups](#step-3--render-field-groups)
    - [Step 4 — Wire the Action Bar](#step-4--wire-the-action-bar)
12. [Edit Mode — Step-by-Step](#edit-mode--step-by-step)
    - [Step 1 — Fetch and Pre-fill the Form](#step-1--fetch-and-pre-fill-the-form)
    - [Step 2 — Define the Zod Schema](#step-2--define-the-zod-schema)
    - [Step 3 — Sync Dirty State to the Store](#step-3--sync-dirty-state-to-the-store)
    - [Step 4 — Wire the Mutation](#step-4--wire-the-mutation)
    - [Step 5 — Render the Form](#step-5--render-the-form)
13. [Add Mode — Step-by-Step](#add-mode--step-by-step)
    - [Step 1 — Define the Schema and Defaults](#step-1--define-the-schema-and-defaults)
    - [Step 2 — Merge Prefill Values](#step-2--merge-prefill-values)
    - [Step 3 — Wire the Mutation](#step-3--wire-the-mutation-1)
    - [Step 4 — Render the Form](#step-4--render-the-form-1)
14. [Shared Sub-Components](#shared-sub-components)
    - [SheetLoadingSkeleton](#sheetloadingskeleton)
    - [SheetErrorState](#sheetemptystate)
    - [SheetFieldGroup](#sheetfieldgroup)
    - [SheetDetailRow](#sheetdetailrow)
    - [SheetStatusBadge](#sheetstatusbadge)
    - [SheetActionBar](#sheetactionbar)
15. [TanStack Query Patterns](#tanstack-query-patterns)
    - [Fetching a Detail Record](#fetching-a-detail-record)
    - [Mutations — onSuccess Close Pattern](#mutations--onsuccess-close-pattern)
    - [Optimistic Updates](#optimistic-updates)
    - [Cache Invalidation Rules](#cache-invalidation-rules)
16. [React Hook Form Patterns](#react-hook-form-patterns)
    - [Resetting the Form on Data Load](#resetting-the-form-on-data-load)
    - [The formId Bridge](#the-formid-bridge)
    - [Using Controller for Non-Native Inputs](#using-controller-for-non-native-inputs)
    - [Character Counters](#character-counters)
17. [Type Reference](#type-reference)
    - [`SheetMode`](#sheetmode)
    - [`SheetSize`](#sheetsize)
    - [`OpenSheetConfig`](#opensheetconfig)
    - [`SheetStore`](#sheetstore)
    - [`SheetConfig`](#sheetconfig)
    - [`SheetRegistry`](#sheetregistry)
    - [`ViewSheetProps`](#viewsheetprops-1)
    - [`EditSheetProps`](#editsheetprops-1)
    - [`AddSheetProps`](#addsheetprops-1)
    - [`SheetDetailRowProps`](#sheetdetailrowprops)
    - [`SheetFieldGroupProps`](#sheetfieldgroupprops)
    - [`SheetStatusBadgeProps`](#sheetstatusbadgeprops)
    - [`SheetLoadingSkeletonProps`](#sheetloadingskeletonprops)
    - [`SheetErrorStateProps`](#sheetemptystateprops)
    - [`SheetActionBarButtonProps`](#sheetactionbarbuttonprops)
18. [Customization Guide](#customization-guide)
    - [Custom Footer Slot](#custom-footer-slot)
    - [Pre-filling Fields from a Table Row Action](#pre-filling-fields-from-a-table-row-action)
    - [Switching from View to Edit In-Place](#switching-from-view-to-edit-in-place)
    - [Skipping Certain Modes](#skipping-certain-modes)
    - [Adding a Delete Confirmation Dialog](#adding-a-delete-confirmation-dialog)
    - [Assign Popover Pattern](#assign-popover-pattern)
19. [Full Working Example — Inquiry Sheets](#full-working-example--inquiry-sheets)
20. [Dos and Don'ts](#dos-and-donts)
21. [Troubleshooting](#troubleshooting)

---

## Overview

The Global Sheet is a **single mounted panel** driven entirely by a Zustand store. Any component anywhere in the tree — a table row action, a button, even a TanStack Query `onSuccess` callback — can open it with one function call. No prop drilling, no local `open` state, no duplicate overlays.

```
┌──────────────────────────────────────────────────┐
│  Header                                     [X]  │  ← SheetHeader (title + description)
│  Title                                           │
│  Description (optional)                          │
├──────────────────────────────────────────────────┤
│                                                  │
│  ScrollArea                                      │
│  ┌────────────────────────────────────────────┐  │
│  │  SheetActionBar (view mode only)           │  │
│  │  [Assign] [Resolve] [Close] | [Edit]       │  │
│  ├────────────────────────────────────────────┤  │
│  │  SheetFieldGroup — "Status"                │  │
│  │    Status:     ● In Progress               │  │
│  │    Assigned:   Priya Sharma                │  │
│  ├────────────────────────────────────────────┤  │
│  │  SheetFieldGroup — "Contact Information"   │  │
│  │    Name:       Rohan Mehta                 │  │
│  │    Email:      rohan@example.com  [copy]   │  │
│  ├────────────────────────────────────────────┤  │
│  │  SheetFieldGroup — "Message"               │  │
│  │    Body:       I would like to...          │  │
│  └────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────┤
│  [Cancel]  [Save Changes]                        │  ← SheetFooter (edit / add only)
└──────────────────────────────────────────────────┘
```

The three modes share the same outer shell (header, scroll area, footer, close button, unsaved-changes guard) but render different inner content:

| Mode   | Purpose                                         | Has Form | Footer                                    |
| :----- | :---------------------------------------------- | :------- | :---------------------------------------- |
| `view` | Read-only detail panel for a record             | No       | Hidden — actions live in `SheetActionBar` |
| `edit` | Pre-filled form for mutating an existing record | Yes      | Cancel + Save Changes                     |
| `add`  | Blank form for creating a new record            | Yes      | Cancel + Create                           |

---

## Architecture

```
Any component
  └── useSheetStore().open({ sheetKey: "inquiry", mode: "view", id: "abc" })
          │
          ▼
   Zustand store updates
   { isOpen: true, sheetKey: "inquiry", mode: "view", id: "abc", ... }
          │
          ▼
   <GlobalSheet /> re-renders (subscribes to store)
     → <Sheet open={true}>
       → <SheetHeader>  title, description, optional back arrow
       → <ScrollArea>
           → <SheetRenderer sheetKey="inquiry" mode="view" id="abc" />
               → looks up SHEET_REGISTRY["inquiry"].view
               → <InquiryViewSheet id="abc" />
                   → useQuery(["inquiry", "abc"])
                   → isLoading → <SheetLoadingSkeleton />
                   → isError   → <SheetErrorState />
                   → success   → <SheetFieldGroup> + <SheetDetailRow> + <SheetActionBar>
       → <SheetFooter>  (hidden in view mode)
```

**Key design decisions:**

| Decision                         | Rationale                                                                                                                                    |
| :------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| Single mounted `<GlobalSheet />` | Only one overlay at a time, no duplicated state, Zustand is the single source of truth                                                       |
| Zustand over React Context       | Actions callable anywhere — including outside React, such as in TanStack Query `onSuccess` callbacks                                         |
| Config-registry pattern          | Each feature registers a `SheetConfig` object. The renderer dispatches to the right component with no giant switch statement in shared code  |
| `id` stored in store, not data   | Data is always fetched fresh on every open — no risk of showing stale records                                                                |
| `formId` bridge                  | The form lives inside `<ScrollArea>` but the submit button is in `<SheetFooter>` — the HTML `form` attribute wires them without ref drilling |
| Dirty state in store             | `GlobalSheet` can intercept close attempts and show the unsaved-changes guard without knowing anything about the specific form               |

---

## File Structure

```
src/
├── components/
│   ├── ui/
│   │   └── sheet.tsx              ← Shadcn Sheet primitives (do not modify)
│
├── features/
│   └── dashboard/
│       └── sheet/
│           ├── index.ts                ← Barrel exports — always import from here
│           ├── GlobalSheet.tsx         ← Root shell: Sheet + header + scroll area + footer
│           ├── SheetRenderer.tsx       ← Registry dispatch: sheetKey + mode → content component
│           ├── SheetLoadingSkeleton.tsx← Animated pulse skeleton for initial fetches
│           ├── SheetErrorState.tsx     ← Centred error card with retry button
│           ├── SheetFieldGroup.tsx     ← Labelled section wrapper for view mode groups
│           ├── SheetDetailRow.tsx      ← Single label → value read-only row
│           ├── SheetStatusBadge.tsx    ← Coloured badge derived from a status string
│           ├── SheetActionBar.tsx      ← Toolbar of contextual buttons (view mode)
│           ├── SheetSectionLabel.tsx   ← Section heading with separator
│           ├── SheetCharCounter.tsx    ← Character counter for textareas
│           ├── SheetContextBanner.tsx  ← Read-only context summary banner
│           ├── SheetDeleteDialog.tsx   ← Confirmation dialog for deletes
│           ├── SheetUtils.ts           ← formatDate utility + helpers
│           └── useSheetDirty.ts        ← Dirty state hook (convenience wrapper)
│
├── store/
│   └── sheet/
│       └── sheet.store.ts                  ← useSheetStore — Zustand store
│
└── types/
    └── sheet.d.ts                        ← All shared TypeScript types for the sheet system

src/pages/<page-folder>/components/sheet/
├── <Feature>ViewSheet.tsx              ← View mode content component
├── <Feature>EditSheet.tsx              ← Edit mode content component
├── <Feature>AddSheet.tsx               ← Add mode content component
└── index.ts                            ← Barrel export
```

All public sub-component exports are re-exported from the barrel. **Always import from it:**

```ts
import {
  GlobalSheet,
  SheetLoadingSkeleton,
  SheetErrorState,
  SheetFieldGroup,
  SheetDetailRow,
  SheetStatusBadge,
  SheetActionBar,
  SheetSectionLabel,
  SheetCharCounter,
  SheetContextBanner,
  SheetDeleteDialog,
  formatDate,
  useSheetDirty,
} from '@/features/dashboard/sheet';
```

Types are imported separately:

```ts
import type {
  ViewSheetProps,
  EditSheetProps,
  AddSheetProps,
} from '@/types/sheet';
```

The store is imported directly:

```ts
import { useSheetStore } from '@/store/sheet';
```

---

## Modes at a Glance

|                    | View                        | Edit                          | Add               |
| :----------------- | :-------------------------- | :---------------------------- | :---------------- |
| **`mode` value**   | `"view"`                    | `"edit"`                      | `"add"`           |
| **`id` required**  | Yes                         | Yes                           | No                |
| **Initial fetch**  | Yes — `staleTime: 0`        | Yes — to pre-fill form        | No                |
| **Form**           | No                          | Yes                           | Yes               |
| **Footer**         | Hidden                      | Cancel + Save Changes         | Cancel + Create   |
| **Action buttons** | `SheetActionBar` in content | None                          | None              |
| **Dirty guard**    | No                          | Yes                           | Yes               |
| **Back arrow**     | Never                       | When entered via `switchMode` | Never             |
| **`prefill`**      | Unused                      | Unused                        | Optional          |
| **`footerSlot`**   | Unused                      | Optional override             | Optional override |

---

## Quick Start — Opening a Sheet

The minimum required call to open a panel from anywhere:

```ts
import { useSheetStore } from '@/store/sheet';

// Inside any component:
const open = useSheetStore(s => s.open);

// View an existing record
open({
  sheetKey: 'inquiry',
  mode: 'view',
  id: inquiry.id,
  title: 'Inquiry Details',
});

// Edit an existing record
open({
  sheetKey: 'inquiry',
  mode: 'edit',
  id: inquiry.id,
  title: 'Edit Inquiry',
  description: `Editing inquiry from ${inquiry.name}`,
  size: 'lg',
});

// Create a new record
open({
  sheetKey: 'inquiry',
  mode: 'add',
  title: 'New Inquiry',
  size: 'lg',
});
```

That is the entire public API for consumers. `GlobalSheet` handles everything else.

---

## Layout Setup

Mount `<GlobalSheet />` **exactly once**, at the layout level alongside other application-wide singletons like `<Toaster />`. It must be a descendant of `QueryClientProvider` and the Zustand provider (which is implicit since Zustand stores are module-level singletons).

```tsx
// src/layouts/dashboard/Layout.tsx
import { GlobalSheet } from '@/features/dashboard/sheet';
import { Toaster } from '@/components/ui/sonner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <GlobalSheet />
      <Toaster />
    </>
  );
}
```

> **Important:** Never mount `<GlobalSheet />` inside a page component or a feature component. Doing so creates multiple sheet instances that fight over the same store, causing phantom opens and impossible-to-close overlays.

---

## Zustand Store — `useSheetStore`

**File:** `src/store/sheet/sheet.store.ts`
**Import:** `import { useSheetStore } from "@/store/sheet";`

### State Shape

```ts
interface SheetStore {
  // ── Persistent fields (set by open(), cleared by close()) ────────────────
  isOpen: boolean;
  sheetKey: string; // Registry lookup key, e.g. "inquiry"
  mode: SheetMode; // "view" | "edit" | "add"
  id: string | undefined; // Record id — undefined for "add" mode
  title: string; // Displayed in SheetTitle
  description: string | undefined; // Displayed in SheetDescription
  size: SheetSize; // Controls max-width of the panel
  prefill: Record<string, unknown> | undefined; // Optional form defaults for "add"
  footerSlot: React.ReactNode | undefined; // Optional footer override for edit/add

  // ── Runtime flags ─────────────────────────────────────────────────────────
  _isDirty: boolean; // true when any form field has been touched

  // ── Actions ───────────────────────────────────────────────────────────────
  open: (config: OpenSheetConfig) => void;
  close: () => void;
  setDirty: (dirty: boolean) => void;
  switchMode: (mode: SheetMode) => void;
}
```

### Actions

| Action       | Signature                           | Description                                                                                                                                       |
| :----------- | :---------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `open`       | `(config: OpenSheetConfig) => void` | Opens the sheet. Resets `_isDirty` to `false` on every call so a previous session's dirty flag never blocks a fresh open.                         |
| `close`      | `() => void`                        | Closes the sheet and resets every field to its default. Does **not** check `_isDirty` — the guard lives in `GlobalSheet`.                         |
| `setDirty`   | `(dirty: boolean) => void`          | Syncs the form's dirty state from a content component. Skips redundant updates (no-op when value is unchanged).                                   |
| `switchMode` | `(mode: SheetMode) => void`         | Transitions the active sheet to a different mode without closing or reopening. Resets `_isDirty`. Preserves `id`, `title`, `description`, `size`. |

### Opening the Sheet

`open()` accepts an `OpenSheetConfig` object. Only `sheetKey`, `mode`, and `title` are required:

```ts
open({
  sheetKey:    "inquiry",        // Required. Must match a key in SHEET_REGISTRY.
  mode:        "view",           // Required. "view" | "edit" | "add"
  id:          "abc-123",        // Required for "view" and "edit". Omit for "add".
  title:       "Inquiry Details",// Required. Shown in the sheet header.
  description: "From Rohan Mehta · Jan 15, 2026", // Optional. Shown below the title.
  size:        "lg",             // Optional. "default" | "lg" | "xl" | "full"
  prefill:     { email: "rohan@example.com" }, // Optional. "add" mode only.
  footerSlot:  <CustomFooter />, // Optional. Replaces default Cancel/Save buttons.
});
```

### Closing the Sheet

Calling `close()` resets the entire store to its defaults. All state — `id`, `title`, `mode`, `_isDirty`, `prefill`, `footerSlot` — is cleared.

```ts
const close = useSheetStore(s => s.close);
close();
```

`GlobalSheet` calls `close()` in three places:

1. When the user clicks the `[X]` button (and `_isDirty` is false).
2. When the user clicks Cancel in the footer (and `_isDirty` is false).
3. When a mutation's `onSuccess` calls it programmatically after a successful save.

### Switching Mode Without Closing

Use `switchMode` to transition from view → edit (or any mode to any mode) without the panel visually closing and reopening. This avoids the flicker of a close/reopen cycle.

```ts
const switchMode = useSheetStore(s => s.switchMode);

// Inside InquiryViewSheet's "Edit" button:
switchMode('edit');

// Or via open() for a full reconfigure (causes close + reopen):
open({ sheetKey: 'inquiry', mode: 'edit', id, title: 'Edit Inquiry' });
```

When `switchMode("edit")` is used, `GlobalSheet` detects this and shows a back arrow in the header that returns to view mode.

### Dirty State Tracking

`_isDirty` is the bridge between the content component's form state and `GlobalSheet`'s close guard. Every edit and add content component must sync its `form.formState.isDirty` to the store:

```ts
const setDirty = useSheetStore(s => s.setDirty);

// Sync on every formState.isDirty change
useEffect(() => {
  setDirty(isDirty);
}, [isDirty, setDirty]);

// Clean up on unmount — critical so stale dirty flags never leak
useEffect(() => {
  return () => {
    setDirty(false);
  };
}, []);
```

Before programmatically closing after a successful mutation, always clear the dirty flag first so the unsaved-changes guard does not intercept:

```ts
onSuccess: () => {
  setDirty(false); // ← must come before close()
  close();
},
```

### Accessing the Store Outside React

Because Zustand stores are plain objects, you can call actions outside React (e.g. in a utility function or a TanStack Query `onSuccess` that runs at module scope):

```ts
import { useSheetStore } from '@/store/sheet';

// Outside a React component — use .getState()
useSheetStore.getState().close();
useSheetStore.getState().open({ sheetKey: 'inquiry', mode: 'view', id: 'abc' });
```

---

## GlobalSheet Component

**File:** `src/features/dashboard/sheet/GlobalSheet.tsx`
**Import:** `import { GlobalSheet } from "@/features/dashboard/sheet";`

### What It Manages

- The Shadcn `<Sheet>` open/closed state, driven entirely by `useSheetStore`.
- The `<SheetHeader>` with `<SheetTitle>`, optional `<SheetDescription>`, and the built-in close `[X]` button.
- An optional back arrow in the header for view → edit → back-to-view navigation.
- A `<ScrollArea>` that wraps `<SheetRenderer>` so long content scrolls independently of the footer.
- The `<SheetFooter>` with Cancel and Submit buttons for edit/add modes (hidden in view mode).
- The `<UnsavedChangesDialog>` — an `<AlertDialog>` that intercepts any close attempt when `_isDirty` is true.
- A stable `formId` (generated via React's `useId`) passed to `SheetRenderer` and used by the footer's submit button.

### What It Does Not Manage

- **Form state** — owned by the feature's edit/add content component.
- **Data fetching / mutations** — owned by the feature's content component.
- **Whether a record exists** — the content component handles its own loading and error states.
- **The `isSubmitting` flag** — currently hardcoded to `false` in `SheetFooterControls`. To show a spinner on the footer's Save button, add an `isSubmitting` field to `SheetStore` and call `setSubmitting(mutation.isPending)` in a `useEffect` inside the content component.

### Sheet Sizes

The `size` field in `OpenSheetConfig` controls the `max-width` of the panel:

| Size value  | CSS class       | Approximate width   |
| :---------- | :-------------- | :------------------ |
| `"default"` | `sm:max-w-sm`   | ~384px              |
| `"lg"`      | `sm:max-w-lg`   | ~512px              |
| `"xl"`      | `sm:max-w-2xl`  | ~672px              |
| `"full"`    | `sm:max-w-full` | 100% viewport width |

Choose `"default"` for simple view/edit sheets with few fields. Use `"lg"` for forms with multiple sections. Use `"xl"` for complex forms or panels that contain tables. Use `"full"` for editors or anything that needs maximum real estate.

### Header Anatomy

```
┌────────────────────────────────────────────┐
│  [←]  Inquiry Details                 [X]  │
│       From Rohan Mehta · Jan 15, 2026      │
└────────────────────────────────────────────┘
```

- `[X]` is always present — rendered by `SheetContent`'s `showCloseButton={true}`.
- `[←]` (back arrow) appears only in edit mode when the sheet was entered via `switchMode("edit")`. It calls `switchMode("view")` to return to view mode without closing.
- The title truncates with an ellipsis if it overflows. Keep titles short.
- The description is optional. When omitted, the header is slightly more compact.

### Footer Anatomy

```
┌────────────────────────────────────────────┐
│  [Cancel]  [Save Changes]                  │  ← edit mode
│  [Cancel]  [Create]                        │  ← add mode
└────────────────────────────────────────────┘
```

- The footer is **not rendered** in view mode. All view-mode actions belong in `<SheetActionBar>` inside the content area.
- The Submit button has `type="submit"` and `form={formId}`. This is how it submits the `<form id={formId}>` that lives inside `<ScrollArea>`, across the DOM boundary.
- Cancel calls the same close guard as the `[X]` button — if `_isDirty` is true, the unsaved-changes dialog appears first.
- To replace the default buttons entirely, pass `footerSlot` in `open()`.

### Unsaved Changes Guard

When a close is attempted (via `[X]`, Cancel, or the Escape key) and `_isDirty` is true, `GlobalSheet` intercepts the close and renders an `<AlertDialog>`:

```
┌──────────────────────────────────────┐
│  Discard unsaved changes?            │
│                                      │
│  You have unsaved changes that will  │
│  be lost if you close this panel.    │
│  This action cannot be undone.       │
│                                      │
│  [Keep editing]  [Discard changes]   │
└──────────────────────────────────────┘
```

- **Keep editing** — dismisses the dialog; the sheet stays open.
- **Discard changes** — calls `close()` unconditionally.

This guard fires for all three close paths: the `[X]` button, the Cancel button in the footer, and the back arrow in the header when returning from edit to view.

### The Back Arrow

The back arrow is controlled by a local `canGoBack` boolean inside `GlobalSheet`. It is set to `true` when `switchMode` is called via the store from a view-sheet's "Edit" button, and reset to `false` whenever the sheet closes or the back arrow is clicked.

The back arrow applies the same unsaved-changes guard as Cancel. If `_isDirty` is true when the user clicks `[←]`, the discard dialog appears before transitioning back to view mode.

---

## SheetRenderer — The Registry

**File:** `src/features/dashboard/sheet/SheetRenderer.tsx`

`SheetRenderer` is the single dispatch layer between the `GlobalSheet` shell and the feature-specific content components. It consults the `SHEET_REGISTRY` map, extracts the component for the current `(sheetKey, mode)` pair, and renders it with the correctly-typed props.

### How Dispatch Works

```
SheetRenderer receives:
  sheetKey = "inquiry"
  mode     = "view"
  id       = "abc-123"
  formId   = ":r3:"          ← generated by useId() in GlobalSheet

  1. Looks up SHEET_REGISTRY["inquiry"]
  2. Reads .view → InquiryViewSheet
  3. Renders <InquiryViewSheet id="abc-123" />
```

For edit and add modes, `formId` (and optionally `onSuccess`) are forwarded as additional props.

### Registering a New Feature

This is the **only file** that needs to change when a new feature adds sheet support:

**Step 1** — Create the content component files:

```
src/pages/<page-folder>/components/sheet/
├── <Feature>ViewSheet.tsx
├── <Feature>EditSheet.tsx
├── <Feature>AddSheet.tsx
└── index.ts
```

**Step 2** — Import them at the top of `SheetRenderer.tsx`:

```ts
import { ProductViewSheet } from '@/pages/products/components/sheet/ProductViewSheet';
import { ProductEditSheet } from '@/pages/products/components/sheet/ProductEditSheet';
import { ProductAddSheet } from '@/pages/products/components/sheet/ProductAddSheet';
```

**Step 3** — Add an entry to `SHEET_REGISTRY`:

```ts
const SHEET_REGISTRY: SheetRegistry = {
  inquiry: {
    view: InquiryViewSheet,
    edit: InquiryEditSheet,
    add: InquiryAddSheet,
  },
  product: {
    // ← new entry
    view: ProductViewSheet,
    edit: ProductEditSheet,
    add: ProductAddSheet,
  },
};
```

**Step 4** — Open it from anywhere using the registry key:

```ts
open({
  sheetKey: 'product',
  mode: 'view',
  id: product.id,
  title: product.name,
});
```

Any mode can be omitted from the registry entry if the feature does not support it (e.g. a product list where you can view and edit but not add directly from the sheet). The renderer falls back to `<SheetNotConfigured />` in that case.

### SheetNotConfigured Fallback

When a `(sheetKey, mode)` pair is opened but not registered, `SheetRenderer` renders a dev-only warning card:

```
⚠  Sheet not configured
   No "view" component is registered for "product".
   Add it to the SHEET_REGISTRY in SheetRenderer.tsx.
```

In production (`NODE_ENV === "production"`), this renders `null` — the sheet opens but appears empty, with no crash. This protects against accidentally shipping an unregistered key in a click handler.

---

## Content Component Contracts

Each feature implements up to three content components. `SheetRenderer` passes a typed set of props to each one. The props are minimal — the component is responsible for everything else.

### ViewSheetProps

```ts
interface ViewSheetProps {
  id: string; // The record id — use this to call useQuery
}
```

The view component owns: fetching the record, rendering loading/error states, rendering field groups, and rendering the action bar.

### EditSheetProps

```ts
interface EditSheetProps {
  id: string; // The record id — use this to call useQuery for pre-fill
  formId: string; // Wire to <form id={formId}> — footer submit targets this
  onSuccess?: () => void; // Called by GlobalSheet after a successful save
}
```

The edit component owns: fetching for pre-fill, the Zod schema, the RHF form, resetting the form on data load, syncing `isDirty` to the store, the mutation, and rendering the form elements.

### AddSheetProps

```ts
interface AddSheetProps {
  formId: string; // Wire to <form id={formId}>
  prefill?: Record<string, unknown>; // Optional default field values from open()
  onSuccess?: () => void; // Called by GlobalSheet after a successful create
}
```

The add component owns: the Zod schema, the RHF form, merging `prefill` into `defaultValues`, syncing `isDirty` to the store, the mutation, and rendering the form elements.

---

## View Mode — Step-by-Step

### Step 1 — Fetch the Record

Always use `staleTime: 0` on detail queries so the sheet never shows stale data, especially right after an edit mutation updates the same record.

```ts
export function ProductViewSheet({ id }: ViewSheetProps) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsAPI.getProductById(id),
    staleTime: 0, // always fetch fresh when the sheet opens
    enabled: !!id, // guard against undefined id
  });

  const product = data?.data;
  // ...
}
```

### Step 2 — Handle Loading and Error States

Return early with the shared sub-components so the rest of the render tree can assume `product` is defined:

```ts
if (isLoading) return <SheetLoadingSkeleton rows={6} />;

if (isError || !product) {
  return (
    <SheetErrorState
      message="Failed to load product details. Please try again."
      onRetry={() => refetch()}
    />
  );
}
```

Choose `rows` to match the approximate number of field rows in your content — this prevents layout shift when data arrives.

### Step 3 — Render Field Groups

Wrap logically related fields in `<SheetFieldGroup>` sections. Use a 2-column grid inside groups for compact fields, and full-width for long text:

```tsx
return (
  <div className="flex flex-col gap-6 p-6">
    <SheetFieldGroup title="Pricing">
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        <SheetDetailRow label="Price" value={formatCurrency(product.price)} />
        <SheetDetailRow label="Currency" value={product.currency} />
        <SheetDetailRow label="SKU" value={product.sku} copyable />
        <SheetDetailRow
          label="Status"
          value={
            <SheetStatusBadge status={product.status} colorMap={STATUS_MAP} />
          }
        />
      </div>
    </SheetFieldGroup>

    <SheetFieldGroup title="Description">
      <SheetDetailRow label="Body" value={product.description} multiline />
    </SheetFieldGroup>
  </div>
);
```

### Step 4 — Wire the Action Bar

Place `<SheetActionBar>` at the top of the content `div` (before the field groups) so it is immediately visible without scrolling. Wire each button to its own `useMutation`.

```tsx
<InquiryActions inquiry={inquiry} />

<SheetFieldGroup title="Status">
  ...
</SheetFieldGroup>
```

See [SheetActionBar](#sheetactionbar) and [Optimistic Updates](#optimistic-updates) for full guidance.

---

## Edit Mode — Step-by-Step

### Step 1 — Fetch and Pre-fill the Form

Fetch the record with `staleTime: 0`. The data is used to reset the form via `useEffect`. The query also provides the `<ContextBanner>` — the read-only summary at the top of the form.

```ts
const { data, isLoading, isError, refetch } = useQuery({
  queryKey: ['product', id],
  queryFn: () => productsAPI.getProductById(id),
  staleTime: 0,
  enabled: !!id,
});

const product = data?.data;
```

### Step 2 — Define the Zod Schema

Co-locate the schema with the sheet file. Keep schema names generic (`schema`, `FormValues`) since they are file-scoped. Only include editable fields — not the full data type.

```ts
const schema = z.object({
  name: z.string().min(1, 'Name is required.').max(120),
  price: z
    .number({ error: 'Price must be a number.' })
    .positive('Price must be positive.'),
  description: z.string().max(2000).optional(),
  status: z.nativeEnum(ProductStatus, {
    error: 'Please select a valid status.',
  }),
});

type FormValues = z.infer<typeof schema>;
```

### Step 3 — Sync Dirty State to the Store

This is a required pattern for every edit and add sheet. Three `useEffect` calls — sync on change, clean up on unmount, and clear before programmatic close.

```ts
const setDirty = useSheetStore(s => s.setDirty);

// 1. Keep the store in sync with the form's dirty state.
useEffect(() => {
  setDirty(isDirty);
}, [isDirty, setDirty]);

// 2. Always clear the dirty flag on unmount so a stale true value from
//    a previous session never blocks the next sheet from closing.
useEffect(() => {
  return () => {
    setDirty(false);
  };
}, []);
```

Then, in `onSuccess`:

```ts
onSuccess: () => {
  setDirty(false); // 3. Clear before close so the guard does not fire.
  close();
},
```

### Step 4 — Wire the Mutation

```ts
const mutation = useMutation({
  mutationFn: (values: FormValues) =>
    productsAPI.updateProduct({ id, ...values }),

  onSuccess: () => {
    // Invalidate both the list and the detail cache.
    queryClient.invalidateQueries({ queryKey: ['products'] });
    queryClient.invalidateQueries({ queryKey: ['product', id] });

    toast.success('Product updated.');
    setDirty(false);

    if (onSuccess) {
      onSuccess(); // GlobalSheet passes this — it calls close() + resets canGoBack
    } else {
      close();
    }
  },

  onError: (error: Error) => {
    toast.error(
      error?.message ?? 'Failed to update product. Please try again.',
    );
  },
});
```

### Step 5 — Render the Form

The `<form>` element **must** have `id={formId}`. The footer's submit button targets it via `form={formId}`. Do not render a submit button inside the form — doing so creates two triggers and double-submits.

```tsx
return (
  <form
    id={formId}
    onSubmit={handleSubmit(onSubmit)}
    noValidate
    className="flex flex-col gap-6 p-6"
  >
    <ContextBanner product={product} />

    <FieldGroup>
      <Field>
        <FieldLabel htmlFor={`${formId}-name`}>Name</FieldLabel>
        <Input
          id={`${formId}-name`}
          disabled={mutation.isPending}
          aria-invalid={!!errors.name}
          {...register('name')}
        />
        <FieldError errors={[errors.name]} />
      </Field>

      {/* more fields... */}
    </FieldGroup>

    {/* Do NOT add a submit button here. */}
  </form>
);
```

Use `${formId}-<fieldname>` as the `id` for every input so `htmlFor` on `<FieldLabel>` stays unique even if multiple sheet instances ever mount simultaneously.

---

## Add Mode — Step-by-Step

### Step 1 — Define the Schema and Defaults

Add-mode schemas are typically fuller than edit-mode schemas since all fields need initial values. Define a `DEFAULT_VALUES` constant and use `satisfies FormValues` to get TypeScript to verify completeness:

```ts
const schema = z.object({
  name: z.string().min(1, 'Name is required.').max(120),
  email: z.string().min(1).email('Please enter a valid email address.'),
  message: z.string().min(1, 'Message is required.').max(5000),
  status: z.nativeEnum(ProductStatus, { error: 'Select a valid status.' }),
});

type FormValues = z.infer<typeof schema>;

const DEFAULT_VALUES = {
  name: '',
  email: '',
  message: '',
  status: ProductStatus.DRAFT,
} satisfies FormValues;
```

### Step 2 — Merge Prefill Values

`prefill` carries optional caller-supplied defaults from `open({ prefill: { ... } })`. Spread it after `DEFAULT_VALUES` in `useForm`. React Hook Form silently ignores any keys in `prefill` that are not in the schema, so this is always safe:

```ts
const { register, handleSubmit, ... } = useForm<FormValues>({
  resolver: zodResolver(schema),
  defaultValues: {
    ...DEFAULT_VALUES,
    ...(prefill as Partial<FormValues> | undefined),
  },
});
```

### Step 3 — Wire the Mutation

The same pattern as edit mode. Add mode mutations only need to invalidate the list, not a detail entry (no detail exists yet):

```ts
const mutation = useMutation({
  mutationFn: (values: FormValues) => productsAPI.createProduct(values),

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['products'] });
    toast.success('Product created.');
    setDirty(false);

    if (onSuccess) {
      onSuccess();
    } else {
      close();
    }
  },

  onError: (error: Error) => {
    toast.error(
      error?.message ?? 'Failed to create product. Please try again.',
    );
  },
});
```

### Step 4 — Render the Form

The same `<form id={formId}>` pattern as edit mode. Add mode forms typically have more sections — use `<SectionLabel>` + `<Separator>` to visually divide them:

```tsx
return (
  <form
    id={formId}
    onSubmit={handleSubmit(onSubmit)}
    noValidate
    className="flex flex-col gap-6 p-6"
  >
    <SectionLabel>Contact Information</SectionLabel>
    <FieldGroup>{/* name, email, phone */}</FieldGroup>

    <Separator />

    <SectionLabel>Inquiry Details</SectionLabel>
    <FieldGroup>{/* subject, message */}</FieldGroup>

    <Separator />

    <SectionLabel>Admin</SectionLabel>
    <FieldGroup>{/* status, admin_notes */}</FieldGroup>

    {/* No submit button here — it lives in GlobalSheet's footer */}
  </form>
);
```

---

## Shared Sub-Components

All of these are exported from `@/features/dashboard/sheet`.

---

### SheetLoadingSkeleton

Renders a pulsing skeleton that mirrors the visual structure of a typical detail sheet: an action bar placeholder, two stacked field groups, and a multiline text block. Used in all three modes during the initial fetch.

```tsx
<SheetLoadingSkeleton rows={7} />
```

**Props:**

| Prop   | Type     | Default | Description                                              |
| :----- | :------- | :------ | :------------------------------------------------------- |
| `rows` | `number` | `5`     | Total skeleton field rows distributed across two groups. |

**Guideline:** Set `rows` to roughly match the number of `<SheetDetailRow>` entries in your content (not counting the action bar or multiline blocks). This prevents layout shift when the real data arrives.

---

### SheetErrorState

A centred error card shown when a query fails or returns no data. Includes an error icon, a human-readable message, and an optional "Try again" button.

```tsx
<SheetErrorState
  message="Failed to load inquiry details. Please try again."
  onRetry={() => refetch()}
/>
```

**Props:**

| Prop      | Type         | Default                                              | Description                                                                                                   |
| :-------- | :----------- | :--------------------------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| `message` | `string`     | `"Something went wrong while loading this content."` | The body text shown below the icon.                                                                           |
| `onRetry` | `() => void` | —                                                    | If provided, renders a "Try again" button that calls this function. Pass `refetch` from your `useQuery` call. |

---

### SheetFieldGroup

A section wrapper with an optional titled separator. Groups logically related `<SheetDetailRow>` entries under a labelled heading. Used exclusively in view mode.

```tsx
<SheetFieldGroup title="Contact Information">
  <SheetDetailRow label="Name" value={inquiry.name} />
  <SheetDetailRow label="Email" value={inquiry.email} copyable />
</SheetFieldGroup>
```

**Props:**

| Prop        | Type              | Default | Description                                                                                          |
| :---------- | :---------------- | :------ | :--------------------------------------------------------------------------------------------------- |
| `title`     | `string`          | —       | Section heading rendered as uppercase small text with a line through it. Omit for an untitled group. |
| `children`  | `React.ReactNode` | —       | The `<SheetDetailRow>` elements inside this group.                                                   |
| `className` | `string`          | —       | Additional CSS classes on the root `div`.                                                            |

**Layout tip:** Wrap the children in a `div` with a grid for compact side-by-side pairs:

```tsx
<SheetFieldGroup title="Status">
  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
    <SheetDetailRow label="Status"    value={<SheetStatusBadge ... />} />
    <SheetDetailRow label="Assigned"  value={assignedName} fallback="Unassigned" />
  </div>
</SheetFieldGroup>
```

Leave the grid off for multiline or full-width rows like messages and notes.

---

### SheetDetailRow

A single label → value read-only row. The label is displayed as muted small text above the value.

```tsx
<SheetDetailRow label="Email"   value={inquiry.email}   copyable />
<SheetDetailRow label="Phone"   value={inquiry.phone}   fallback="Not provided" />
<SheetDetailRow label="Message" value={inquiry.message} multiline />
<SheetDetailRow label="Status"  value={<SheetStatusBadge ... />} />
```

**Props:**

| Prop        | Type              | Default | Description                                                                                                                                  |
| :---------- | :---------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`     | `string`          | —       | Required. The field name shown above the value.                                                                                              |
| `value`     | `React.ReactNode` | —       | The value to display. Accepts any React node — a string, a `<Badge>`, a formatted date, etc.                                                 |
| `fallback`  | `string`          | `"—"`   | Shown when `value` is `null`, `undefined`, or an empty string.                                                                               |
| `multiline` | `boolean`         | `false` | Wraps the value in a `<p>` with `whitespace-pre-wrap` and `break-words`. Use for messages, notes, and any text that may contain line breaks. |
| `copyable`  | `boolean`         | `false` | Adds a copy-to-clipboard icon button next to the value. Only functional when `value` is a plain `string` — ignored for React node values.    |
| `className` | `string`          | —       | Additional classes on the root `div`.                                                                                                        |

**Copyable interaction:** The copy button shows a `Tick02Icon` for 2 seconds after a successful copy, then reverts to `Copy01Icon`. If the Clipboard API is unavailable, the click is silently ignored.

---

### SheetStatusBadge

Renders a coloured `<Badge>` whose variant is determined by a lookup on the `status` string. The label is auto-formatted from the raw status value (`"IN_PROGRESS"` → `"In Progress"`), so no separate label map is needed.

```tsx
const STATUS_COLOR_MAP = {
  NEW: 'secondary',
  IN_PROGRESS: 'default',
  RESOLVED: 'ghost',
  CLOSED: 'destructive',
} as const satisfies Record<
  InquiryStatus,
  'default' | 'secondary' | 'destructive' | 'outline' | 'ghost'
>;

<SheetStatusBadge status={inquiry.status} colorMap={STATUS_COLOR_MAP} />;
```

**Props:**

| Prop        | Type                           | Default           | Description                                                                                      |
| :---------- | :----------------------------- | :---------------- | :----------------------------------------------------------------------------------------------- |
| `status`    | `string`                       | —                 | Required. The raw status value from the API (e.g. `"IN_PROGRESS"`). Case-insensitive for lookup. |
| `colorMap`  | `Record<string, BadgeVariant>` | Built-in defaults | Maps status strings to Badge variants. Any unmapped status falls back to `"secondary"`.          |
| `className` | `string`                       | —                 | Additional classes on the `<Badge>`.                                                             |

**Built-in defaults:** When `colorMap` is omitted, a built-in map covers common generic statuses: `ACTIVE`, `PENDING`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`, `REJECTED`, `FAILED`, and others. Always supply your own `colorMap` for domain-specific statuses to ensure accurate colour semantics.

**Using `satisfies`:** Always use `as const satisfies Record<YourStatusEnum, BadgeVariant>` when defining your colour map. This catches typos in status keys and variant values at compile time.

---

### SheetActionBar

A horizontal toolbar rendered **inside the sheet content** (not the footer). Intended for view-mode controls that trigger mutations directly without a full form flow — assign, resolve, reopen, close, delete, and edit navigation.

```tsx
<SheetActionBar>
  <SheetActionBar.Button
    icon={UserAdd01Icon}
    label="Assign"
    disabled={!!inquiry.assigned_to}
    onClick={openAssignPopover}
  />
  <SheetActionBar.Button
    icon={CheckmarkCircle02Icon}
    label="Resolve"
    loading={resolveMutation.isPending}
    disabled={anyPending && !resolveMutation.isPending}
    onClick={() => resolveMutation.mutate()}
  />
  <SheetActionBar.Separator />
  <SheetActionBar.Button
    icon={Delete02Icon}
    label="Delete"
    variant="destructive"
    onClick={() => setShowDeleteDialog(true)}
  />
</SheetActionBar>
```

**`SheetActionBar.Button` props:**

| Prop        | Type             | Default     | Description                                                                              |
| :---------- | :--------------- | :---------- | :--------------------------------------------------------------------------------------- |
| `icon`      | `IconSvgElement` | —           | Hugeicons icon component. Rendered at `size-3.5`.                                        |
| `label`     | `string`         | —           | Required. Button text and `aria-label`.                                                  |
| `onClick`   | `() => void`     | —           | Click handler.                                                                           |
| `variant`   | `ButtonVariant`  | `"outline"` | Any Button variant: `"default"`, `"outline"`, `"ghost"`, `"destructive"`, `"secondary"`. |
| `disabled`  | `boolean`        | `false`     | Disables the button.                                                                     |
| `loading`   | `boolean`        | `false`     | Replaces the icon with a `<Spinner>` and disables the button.                            |
| `className` | `string`         | —           | Additional classes.                                                                      |

**`SheetActionBar.Separator`** — A thin vertical divider for visually grouping related actions. No props.

**Disable pattern for concurrent mutations:** When any mutation is pending, disable all _other_ buttons while allowing the active one to show its loading state:

```ts
const anyPending = assignMutation.isPending || resolveMutation.isPending || ...;

<SheetActionBar.Button
  label="Resolve"
  loading={resolveMutation.isPending}
  disabled={anyPending && !resolveMutation.isPending}
/>
```

---

## TanStack Query Patterns

### Fetching a Detail Record

```ts
const { data, isLoading, isError, refetch } = useQuery({
  queryKey: ['inquiry', id], // id must be in the key for correct cache isolation
  queryFn: () => contactsAPI.getInquiryById(id),
  staleTime: 0, // always re-fetch on sheet open
  enabled: !!id, // never run with an undefined id
});
```

The `queryKey` array always includes the `id`. This ensures each record has its own cache entry and changes to one record do not invalidate another's cached data.

### Mutations — onSuccess Close Pattern

```ts
const mutation = useMutation({
  mutationFn: (values: FormValues) => api.update({ id, ...values }),

  onSuccess: () => {
    // 1. Invalidate caches
    queryClient.invalidateQueries({ queryKey: ['products'] }); // list
    queryClient.invalidateQueries({ queryKey: ['product', id] }); // detail

    // 2. Notify user
    toast.success('Product updated.');

    // 3. Clear dirty flag BEFORE closing
    setDirty(false);

    // 4. Close via the onSuccess callback (preferred) or directly
    if (onSuccess) {
      onSuccess(); // GlobalSheet's onSuccess calls close() + resets canGoBack
    } else {
      close();
    }
  },

  onError: (error: Error) => {
    toast.error(error?.message ?? 'Something went wrong.');
  },
});
```

Always prefer calling `onSuccess()` from the `EditSheetProps` over calling `close()` directly. `GlobalSheet` wires `onSuccess` to also reset the `canGoBack` flag, which controls the back arrow. Calling `close()` directly skips that reset.

### Optimistic Updates

Use optimistic updates for simple, low-risk status-flip mutations in the action bar. The pattern is:

1. `onMutate` — cancel in-flight queries, snapshot current cache, apply the optimistic change.
2. `onError` — roll back to the snapshot.
3. `onSettled` — always invalidate to sync with the server.

```ts
const resolveMutation = useMutation({
  mutationFn: () => contactsAPI.resolveInquiry(id),

  onMutate: async () => {
    // Cancel any in-flight re-fetches so they don't overwrite the optimistic update.
    await queryClient.cancelQueries({ queryKey: ['inquiry', id] });

    // Snapshot the previous value for rollback.
    const previous = queryClient.getQueryData(['inquiry', id]);

    // Apply the optimistic change immediately.
    queryClient.setQueryData(
      ['inquiry', id],
      (old: { data: Inquiry } | undefined) =>
        old
          ? { ...old, data: { ...old.data, status: InquiryStatus.RESOLVED } }
          : old,
    );

    return { previous };
  },

  onSuccess: () => toast.success('Inquiry marked as resolved.'),

  onError: (_err, _vars, ctx) => {
    // Roll back to the snapshot on failure.
    queryClient.setQueryData(['inquiry', id], ctx?.previous);
    toast.error('Failed to resolve inquiry.');
  },

  onSettled: () => {
    // Always re-sync with the server, regardless of optimistic success.
    queryClient.invalidateQueries({ queryKey: ['inquiry', id] });
    queryClient.invalidateQueries({ queryKey: ['inquiries'] });
  },
});
```

**When to use optimistic updates:**

- Status flips (resolve, close, reopen) — low risk, server is unlikely to reject.
- Assign / unassign — also low risk.

**When to skip optimistic updates:**

- Delete — show a confirmation dialog instead. Only invalidate on confirmed `onSuccess`.
- Complex multi-field updates — optimistic state is hard to construct accurately; just show a loading spinner.

### Cache Invalidation Rules

| Mutation                             | Queries to invalidate                                 |
| :----------------------------------- | :---------------------------------------------------- |
| Edit a record                        | List query key + detail query key (`["inquiry", id]`) |
| Create a record                      | List query key only (no detail exists yet)            |
| Delete a record                      | List query key + call `close()` (detail is gone)      |
| Status-flip (resolve, close, reopen) | List query key + detail query key                     |
| Assign / unassign                    | List query key + detail query key                     |

---

## React Hook Form Patterns

### Resetting the Form on Data Load

The form is initialised with empty `defaultValues` because data is not available when `useForm` first runs. Reset the form inside a `useEffect` that watches the fetched data:

```ts
useEffect(() => {
  if (product) {
    reset(
      {
        name: product.name,
        description: product.description ?? '',
        status: product.status,
      },
      { keepDirty: false }, // treat the reset values as the new "clean" baseline
    );
  }
}, [product, reset]);
```

`{ keepDirty: false }` is critical. It marks the post-reset form state as clean (`isDirty === false`). Without it, if the user saves and the query re-fetches, the form would still appear dirty after the reset.

### The formId Bridge

The form renders inside `<ScrollArea>`, but the Submit button renders inside `<SheetFooter>`, which is outside the scroll area in the DOM. The HTML `form` attribute connects them without any ref:

```tsx
// Inside the content component — the form
<form id={formId} onSubmit={handleSubmit(onSubmit)}>
  ...
</form>

// Inside GlobalSheet's footer — the submit button
<Button type="submit" form={formId}>
  Save Changes
</Button>
```

`formId` is generated by `useId()` in `GlobalSheet` and passed down through `SheetRenderer` → content component props. It is stable across the entire life of a single sheet session.

### Using Controller for Non-Native Inputs

Any input that is not a native HTML input (e.g. `<Select>`, `<Checkbox>`, `<DatePicker>`) must be wrapped in `<Controller>` from React Hook Form:

```tsx
<Controller
  control={control}
  name="status"
  render={({ field }) => (
    <Select
      value={field.value}
      onValueChange={field.onChange}
      disabled={isPending}
    >
      <SelectTrigger id={`${formId}-status`} aria-invalid={!!errors.status}>
        <SelectValue placeholder="Select a status…" />
      </SelectTrigger>
      <SelectContent>
        {STATUS_OPTIONS.map(opt => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )}
/>
```

Native inputs (`<Input>`, `<Textarea>`) use `{...register("fieldName")}` directly.

### Character Counters

For long-text fields with character limits, render a `<CharCounter>` badge inline next to the label:

```tsx
const adminNotesValue = watch('admin_notes') ?? '';

<Field>
  <div className="flex items-center justify-between gap-2">
    <FieldLabel htmlFor={`${formId}-notes`}>Admin Notes</FieldLabel>
    <CharCounter current={adminNotesValue.length} max={2000} />
  </div>
  <Textarea {...register('admin_notes')} />
  <FieldError errors={[errors.admin_notes]} />
</Field>;
```

The `CharCounter` component (defined inside each sheet file that needs it) renders a `<Badge>` with three visual states:

| State      | Threshold               | Badge variant   |
| :--------- | :---------------------- | :-------------- |
| Normal     | `current <= max * 0.85` | `"outline"`     |
| Near limit | `current > max * 0.85`  | `"secondary"`   |
| Over limit | `current > max`         | `"destructive"` |

The Zod schema enforces the hard limit with `.max(2000, "...")`. The counter is a visual cue only.

---

## Type Reference

### `SheetMode`

```ts
type SheetMode = 'view' | 'edit' | 'add';
```

### `SheetSize`

```ts
type SheetSize = 'default' | 'lg' | 'xl' | 'full';
```

Maps to `sm:max-w-sm`, `sm:max-w-lg`, `sm:max-w-2xl`, and `sm:max-w-full` respectively.

### `OpenSheetConfig`

The payload passed to `useSheetStore().open(...)`.

```ts
interface OpenSheetConfig {
  sheetKey: string; // Registry key, e.g. "inquiry"
  mode: SheetMode; // "view" | "edit" | "add"
  id?: string; // Required for view/edit, omit for add
  title: string; // Shown in SheetTitle
  description?: string; // Shown in SheetDescription
  size?: SheetSize; // Panel width. Default: "default"
  prefill?: Record<string, unknown>; // Add mode: initial field values
  footerSlot?: React.ReactNode; // Override default Cancel/Save buttons
}
```

### `SheetStore`

Full Zustand store shape including all state fields and action methods.

```ts
interface SheetStore extends OpenSheetConfig {
  isOpen: boolean;
  _isDirty: boolean;

  open: (config: OpenSheetConfig) => void;
  close: () => void;
  setDirty: (dirty: boolean) => void;
  switchMode: (mode: SheetMode) => void;
}
```

### `SheetConfig`

A feature's registry entry. Any mode can be omitted.

```ts
interface SheetConfig {
  view?: React.ComponentType<ViewSheetProps>;
  edit?: React.ComponentType<EditSheetProps>;
  add?: React.ComponentType<AddSheetProps>;
}
```

### `SheetRegistry`

The full registry map indexed by `sheetKey` strings.

```ts
type SheetRegistry = Record<string, SheetConfig>;
```

### `ViewSheetProps`

```ts
interface ViewSheetProps {
  id: string;
}
```

### `EditSheetProps`

```ts
interface EditSheetProps {
  id: string;
  formId: string;
  onSuccess?: () => void;
}
```

### `AddSheetProps`

```ts
interface AddSheetProps {
  formId: string;
  prefill?: Record<string, unknown>;
  onSuccess?: () => void;
}
```

### `SheetDetailRowProps`

```ts
interface SheetDetailRowProps {
  label: string;
  value?: React.ReactNode;
  fallback?: string; // Default: "—"
  multiline?: boolean; // Default: false
  copyable?: boolean; // Default: false — only works for string values
  className?: string;
}
```

### `SheetFieldGroupProps`

```ts
interface SheetFieldGroupProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}
```

### `SheetStatusBadgeProps`

```ts
interface SheetStatusBadgeProps {
  status: string;
  colorMap?: Record<
    string,
    'default' | 'secondary' | 'destructive' | 'outline' | 'ghost'
  >;
  className?: string;
}
```

### `SheetLoadingSkeletonProps`

```ts
interface SheetLoadingSkeletonProps {
  rows?: number; // Default: 5
}
```

### `SheetErrorStateProps`

```ts
interface SheetErrorStateProps {
  message?: string;
  onRetry?: () => void;
}
```

### `SheetActionBarButtonProps`

```ts
interface SheetActionBarButtonProps {
  icon?: IconSvgElement; // Hugeicons icon
  label: string;
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary'; // Default: "outline"
  disabled?: boolean; // Default: false
  loading?: boolean; // Default: false — shows Spinner, disables button
  className?: string;
}
```

---

## Customization Guide

### Custom Footer Slot

Replace the default Cancel / Save buttons with any React node by passing `footerSlot` to `open()`. The custom node is rendered inside `<SheetFooter>` with no wrapping — lay it out however you need.

```tsx
open({
  sheetKey: 'inquiry',
  mode: 'edit',
  id: inquiry.id,
  title: 'Edit Inquiry',
  size: 'lg',
  footerSlot: (
    <div className="flex w-full items-center gap-2">
      <Button variant="outline" size="sm" onClick={() => close()}>
        Cancel
      </Button>
      <Button type="submit" form="the-form-id" size="sm">
        Save
      </Button>
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onClick={handleSaveAndAssign}
      >
        Save & Assign
      </Button>
    </div>
  ),
});
```

> **Note:** When using `footerSlot`, you are responsible for wiring Cancel to `close()` and the submit action to the correct form id. `GlobalSheet` will not provide those for you.

### Pre-filling Fields from a Table Row Action

Pass known field values through `prefill` in the `open()` call. The add-mode content component merges them into `defaultValues`:

```tsx
// In a contacts table row action:
const open = useSheetStore(s => s.open);

open({
  sheetKey: 'inquiry',
  mode: 'add',
  title: 'New Inquiry',
  size: 'lg',
  prefill: {
    name: contact.full_name,
    email: contact.email,
    phone: contact.phone,
  },
});
```

The add sheet's `useForm` call spreads this:

```ts
useForm<FormValues>({
  resolver: zodResolver(schema),
  defaultValues: {
    ...DEFAULT_VALUES,
    ...(prefill as Partial<FormValues> | undefined),
  },
});
```

Any key in `prefill` that is not in the schema is silently ignored by React Hook Form.

### Switching from View to Edit In-Place

To avoid the flicker of a close/reopen cycle, call `useSheetStore().open()` with `mode: "edit"` and the same `id`. The store remains open and the renderer swaps the content component. `GlobalSheet` detects this via the `canGoBack` flag and shows a back arrow that returns to view:

```tsx
// Inside InquiryViewSheet's Edit button:
const open = useSheetStore(s => s.open);

<SheetActionBar.Button
  icon={PencilEdit02Icon}
  label="Edit"
  onClick={() =>
    open({
      sheetKey: 'inquiry',
      mode: 'edit',
      id: inquiry.id,
      title: 'Edit Inquiry',
      description: `Editing inquiry from ${inquiry.name}`,
      size: 'lg',
    })
  }
/>;
```

When the user finishes editing and the mutation's `onSuccess` closes the sheet via `onSuccess()`, `GlobalSheet` resets `canGoBack` to `false` — so the back arrow disappears on the next view open.

### Skipping Certain Modes

If a feature only needs view and edit (no add), simply omit the `add` key from the registry entry:

```ts
const SHEET_REGISTRY: SheetRegistry = {
  // Template only supports view and edit — no inline add
  template: {
    view: TemplateViewSheet,
    edit: TemplateEditSheet,
    // add is intentionally omitted
  },
};
```

If someone calls `open({ sheetKey: "template", mode: "add", ... })`, `SheetRenderer` will render `<SheetNotConfigured />` in development and `null` in production. No crash.

### Adding a Delete Confirmation Dialog

Never delete directly on button click. Always gate deletion behind an `<AlertDialog>` confirmation. The pattern used in `InquiryViewSheet`:

```tsx
// Local state inside the view sheet (or its InquiryActions sub-component)
const [showDeleteDialog, setShowDeleteDialog] = useState(false);

const deleteMutation = useMutation({
  mutationFn: () => api.deleteProduct(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
    toast.success("Product deleted.");
    close(); // Close the sheet after deletion
  },
  onError: () => toast.error("Failed to delete product."),
});

// In the action bar:
<SheetActionBar.Button
  icon={Delete02Icon}
  label="Delete"
  variant="destructive"
  onClick={() => setShowDeleteDialog(true)} // Open dialog, do NOT delete yet
/>

// The dialog renders separately (outside SheetActionBar):
<AlertDialog open={showDeleteDialog}>
  <AlertDialogContent size="sm">
    <AlertDialogHeader>
      <AlertDialogTitle>Delete this product?</AlertDialogTitle>
      <AlertDialogDescription>
        This action is permanent and cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={() => setShowDeleteDialog(false)} disabled={deleteMutation.isPending}>
        Cancel
      </AlertDialogCancel>
      <AlertDialogAction
        variant="destructive"
        onClick={() => deleteMutation.mutate()}
        disabled={deleteMutation.isPending}
      >
        {deleteMutation.isPending && <Spinner className="size-3.5" />}
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

Return both the action bar and the dialog as a React fragment from a single component so the local state is co-located with the mutations.

### Assign Popover Pattern

When a view-mode action requires picking from a list (e.g. assigning an inquiry to an admin), use an inline `<Popover>` instead of opening a new sheet. This keeps the user in context:

```tsx
function AssignPopover({ onAssign, isPending, disabled }: AssignPopoverProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  // TODO: Replace stub with real useQuery when /admins endpoint exists.
  const admins = STUB_ADMINS.filter(a => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      `${a.first_name} ${a.last_name}`.toLowerCase().includes(q) ||
      a.email.includes(q)
    );
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled || isPending}
        >
          {isPending ? (
            <Spinner className="size-3.5" />
          ) : (
            <HugeiconsIcon icon={UserAdd01Icon} className="size-3.5" />
          )}
          Assign
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="w-64 gap-2 p-2">
        <Input
          placeholder="Search admins…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="h-8 text-xs"
        />
        <ScrollArea className="max-h-44">
          {admins.map(admin => (
            <button
              key={admin.id}
              type="button"
              onClick={() => {
                onAssign(admin.id);
                setOpen(false);
                setSearch('');
              }}
              className="hover:bg-muted flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 outline-none"
            >
              <Avatar size="sm">
                <AvatarFallback>
                  {getInitials(admin.first_name, admin.last_name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-xs font-medium">
                  {admin.first_name} {admin.last_name}
                </span>
                <span className="text-muted-foreground truncate text-[11px]">
                  {admin.email}
                </span>
              </div>
            </button>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
```

The admin list popover is rendered **inside** `<SheetActionBar>` as a standalone trigger (not as `SheetActionBar.Button`) because it wraps a `<PopoverTrigger>` rather than a plain `onClick`.

---

## Full Working Example — Inquiry Sheets

The inquiry feature ships three sheets that together demonstrate every pattern in this document.

**Files:**

```
src/pages/inquiries/components/sheet/
├── InquiryViewSheet.tsx   ← View mode — full detail + action bar + optimistic mutations
├── InquiryEditSheet.tsx   ← Edit mode — status + admin notes form with context banner
├── InquiryAddSheet.tsx    ← Add mode  — full contact + inquiry + admin form
└── index.ts
```

**Registry entry** (`src/features/dashboard/sheet/SheetRenderer.tsx`):

```ts
import { InquiryViewSheet } from '@/views/dashboard/inquiries/sheets/InquiryViewSheet';
import { InquiryEditSheet } from '@/views/dashboard/inquiries/sheets/InquiryEditSheet';
import { InquiryAddSheet } from '@/views/dashboard/inquiries/sheets/InquiryAddSheet';

const SHEET_REGISTRY: SheetRegistry = {
  inquiry: {
    view: InquiryViewSheet,
    edit: InquiryEditSheet,
    add: InquiryAddSheet,
  },
};
```

**View sheet sections:**

| Section             | Fields                                                                | Notes                                  |
| :------------------ | :-------------------------------------------------------------------- | :------------------------------------- |
| Status              | Current status badge, assigned admin, admin email, resolved timestamp | 2-col grid                             |
| Contact Information | Full name, email (copyable), phone (copyable), subject                | 2-col grid                             |
| Message             | Full message body                                                     | `multiline` — full width               |
| Admin Notes         | Internal notes                                                        | `multiline` — fallback text when empty |
| Timeline            | Received at, resolved at                                              | 2-col grid                             |

**View sheet action bar:**

| Button           | Visibility rule               | Mutation                                                  |
| :--------------- | :---------------------------- | :-------------------------------------------------------- |
| Assign (popover) | `assigned_to` is null         | `assignInquiry` — standard                                |
| Unassign         | `assigned_to` is set          | `unassignInquiry` — optimistic: clears all admin fields   |
| Resolve          | Not terminal AND not NEW      | `resolveInquiry` — optimistic: status → RESOLVED          |
| Reopen           | Terminal (RESOLVED or CLOSED) | `reopenInquiry` — optimistic: status → IN_PROGRESS        |
| Close            | Not CLOSED                    | `closeInquiry` — optimistic: status → CLOSED              |
| Edit             | Always                        | `open({ mode: "edit" })` — panel switches without closing |
| Delete           | Always                        | `deleteInquiry` — gated behind AlertDialog confirmation   |

**Edit sheet fields:**

| Field       | Component                     | Notes                                             |
| :---------- | :---------------------------- | :------------------------------------------------ |
| Status      | `<Select>` via `<Controller>` | Live badge + description preview below the select |
| Admin Notes | `<Textarea>` via `register()` | Character counter (2000 max)                      |

**Add sheet sections:**

| Section             | Fields                          | Required              |
| :------------------ | :------------------------------ | :-------------------- |
| Contact Information | Full Name, Email Address, Phone | Name + Email required |
| Inquiry Details     | Subject, Message                | Message required      |
| Admin               | Initial Status, Admin Notes     | None required         |

**Opening from a table row action:**

```tsx
function InquiryRowActions({ row }: { row: Row<Inquiry> }) {
  const open = useSheetStore(s => s.open);
  const inquiry = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <HugeiconsIcon icon={MoreVerticalIcon} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() =>
            open({
              sheetKey: 'inquiry',
              mode: 'view',
              id: inquiry.id,
              title: inquiry.subject ?? 'Inquiry Details',
              description: `From ${inquiry.name}`,
            })
          }
        >
          View details
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            open({
              sheetKey: 'inquiry',
              mode: 'edit',
              id: inquiry.id,
              title: 'Edit Inquiry',
              description: `Editing inquiry from ${inquiry.name}`,
              size: 'lg',
            })
          }
        >
          Edit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

---

## Dos and Don'ts

| ✅ Do                                                                                   | ❌ Don't                                                                                                                            |
| :-------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| Mount `<GlobalSheet />` **once** at the layout level                                    | Mount it inside a page, feature component, or anywhere else                                                                         |
| Use `staleTime: 0` on all detail queries inside sheets                                  | Rely on the cache — the user expects current data every time the sheet opens                                                        |
| Call `setDirty(false)` before `close()` inside `onSuccess`                              | Call `close()` directly without clearing the dirty flag — the guard will block it                                                   |
| Reset the form with `{ keepDirty: false }` after data loads                             | Omit the option — the form will stay dirty after a successful save re-fetches the data                                              |
| Co-locate the Zod schema with its sheet file                                            | Create a shared `schemas/` folder — hard to trace which schema belongs to which sheet                                               |
| Use `useSheetStore().open()` (passing the full config) when switching from view to edit | Call `switchMode("edit")` — `switchMode` preserves the current config but does not let you change `size`, `title`, or `description` |
| Use the `onSuccess` prop from `EditSheetProps` / `AddSheetProps` to close               | Call `close()` directly from `onSuccess` — you will skip the `canGoBack` reset                                                      |
| Invalidate both the list and detail query keys on edit mutations                        | Only invalidate the detail — the table will silently go stale                                                                       |
| Use `SheetActionBar` for view-mode controls                                             | Add action buttons to the sheet footer in view mode                                                                                 |
| Gate destructive mutations (delete) behind an `<AlertDialog>`                           | Delete on button click without confirmation                                                                                         |
| Use `as const satisfies Record<YourEnum, BadgeVariant>` for `colorMap`                  | Use a plain object literal — you lose compile-time checking                                                                         |
| Keep content components in `src/pages/<page-folder>/components/sheet/`                  | Put them inside `src/features/dashboard/sheet/` — that folder is for the shared infrastructure only                                 |

---

## Troubleshooting

**The sheet opens but shows `<SheetNotConfigured />` in development.**

The `(sheetKey, mode)` pair is not registered in `SHEET_REGISTRY` inside `SheetRenderer.tsx`. Check:

1. The `sheetKey` you passed to `open()` exactly matches a key in `SHEET_REGISTRY`.
2. The `mode` you passed has a corresponding component registered (e.g. `add` is not omitted from the entry).
3. The import at the top of `SheetRenderer.tsx` is correct and points to the right file.

---

**The sheet opens empty in production but works in development.**

In production, `<SheetNotConfigured />` renders `null` instead of the warning card. The same root causes apply — missing or mismatched registry key. Fix the registry and redeploy.

---

**The unsaved-changes dialog appears even though I didn't change anything.**

The form's `isDirty` is `true` even without user input. This is almost always caused by the `defaultValues` not matching the fetched data exactly. Common culprits:

- The initial `defaultValues` in `useForm` differ from the reset values applied in the `useEffect`. Check that the `reset()` call uses exactly the same field values as `defaultValues`.
- A field defaults to `""` but the API returns `null` or `undefined`. Normalise the value: `admin_notes: inquiry.admin_notes ?? ""`.
- A field defaults to `0` but the API returns `"0"` (a string). Ensure types match exactly.

React Hook Form's `isDirty` compares the current values against the `defaultValues` snapshot. Any mismatch — even a type difference — marks the form dirty.

---

**The footer's Save button does nothing when clicked.**

The `form` attribute on the submit button must match the `id` attribute on the `<form>` element exactly. Both are derived from `formId` — check that your content component passes `id={formId}` to the `<form>` tag and that you are not accidentally rendering the form without an `id`.

---

**The form resets to empty values when the sheet reopens.**

The `reset()` call inside `useEffect` is only triggered when the query data changes. If the sheet was previously open with the same `id` and the data is still cached, `useEffect` may not fire. This is prevented by `staleTime: 0` — it forces a refetch on every sheet open, which updates the query data, which triggers the `useEffect`, which calls `reset()`.

If you are still seeing stale values, confirm `staleTime: 0` is set on the `useQuery` call inside your edit sheet.

---

**Optimistic updates flicker back to the old value after the mutation settles.**

`onSettled` invalidates the cache and triggers a re-fetch. If the re-fetch returns the old value, the server may not have committed the change yet. Check the API response time and consider adding a short delay before invalidation, or confirm the mutation's endpoint is returning the updated resource.

Alternatively, confirm your `onMutate` update is applying to the right cache key. A common mistake is applying the optimistic update to `["inquiries"]` (the list) instead of `["inquiry", id]` (the detail).

---

**The back arrow does not appear after clicking Edit from the view sheet.**

The back arrow is controlled by `canGoBack` in `GlobalSheet`, which is set to `true` only when the `mode` changes while the sheet is already open — specifically when `open()` is called for the same `sheetKey` with `mode: "edit"` while the sheet is currently showing `mode: "view"`.

If your Edit button calls a different `open()` configuration (different `sheetKey`, or the sheet is not currently open in view mode), `canGoBack` will remain `false`.

---

**TypeScript error: `Type 'X' is not assignable to type 'never'` in `colorMap`.**

Use `as const satisfies Record<YourStatusEnum, BadgeVariant>` when defining the colour map:

```ts
// ✅ Correct
const STATUS_MAP = {
  NEW:      "secondary",
  RESOLVED: "ghost",
} as const satisfies Record<InquiryStatus, "default" | "secondary" | "destructive" | "outline" | "ghost">;

// ❌ Will error on unmapped keys or wrong variant values
const STATUS_MAP: Record<InquiryStatus, string> = { ... };
```

---

**The dirty flag is still `true` after the sheet closes.**

The cleanup `useEffect` in your content component is either missing or the `setDirty(false)` call is inside the wrong effect. Each edit/add content component must have this exact unmount cleanup:

```ts
useEffect(() => {
  return () => {
    setDirty(false);
  };
}, []);
```

The empty dependency array `[]` ensures this runs once on mount and its cleanup runs once on unmount. Do not add `setDirty` to the dependency array — it is stable but adding it causes the cleanup to re-register on every render.

---

**Two sheets appear on screen at the same time.**

`<GlobalSheet />` has been mounted more than once. Search the codebase for `<GlobalSheet` and ensure only one instance exists, at the root layout level.

---

**The `prefill` values are ignored in the add sheet.**

Check two things:

1. The keys in the `prefill` object match field names in the Zod schema exactly (case-sensitive).
2. The spread in `defaultValues` places `prefill` after `DEFAULT_VALUES`:

```ts
defaultValues: {
  ...DEFAULT_VALUES,
  ...(prefill as Partial<FormValues> | undefined), // ← must come after
},
```

If `DEFAULT_VALUES` is spread after `prefill`, the defaults overwrite the prefilled values.
