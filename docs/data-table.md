# DataTable Component

A fully-featured, type-safe data table built on top of [TanStack Table v8](https://tanstack.com/table/v8) and [Shadcn UI](https://ui.shadcn.com/). Supports two operating modes:

- **Client mode** — all data is loaded at once; TanStack Table handles search, sorting, filtering, and pagination in-memory.
- **Server mode** — every interaction (search, sort, filter, page change) updates the URL and triggers a fresh API request via TanStack Query. Zero client-side data processing.

---

## Table of Contents

1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Dependencies](#dependencies)
4. [Modes at a Glance](#modes-at-a-glance)
5. [Client Mode — Quick Start](#client-mode--quick-start)
6. [Client Mode — Step-by-Step Guide](#client-mode--step-by-step-guide)
   - [Step 1 — Define Your Data Type](#step-1--define-your-data-type)
   - [Step 2 — Define Your Columns](#step-2--define-your-columns)
   - [Step 3 — Fetch Data with React Query](#step-3--fetch-data-with-react-query)
   - [Step 4 — Wire It All Together](#step-4--wire-it-all-together)
7. [Server Mode — Quick Start](#server-mode--quick-start)
8. [Server Mode — Step-by-Step Guide](#server-mode--step-by-step-guide)
   - [Step 1 — Define Your Data Type](#server-step-1--define-your-data-type)
   - [Step 2 — Define Your Columns](#server-step-2--define-your-columns)
   - [Step 3 — Create the Query Function](#server-step-3--create-the-query-function)
   - [Step 4 — Create the Data Hook](#server-step-4--create-the-data-hook)
   - [Step 5 — Wire It All Together](#server-step-5--wire-it-all-together)
9. [DataTable Props API](#datatable-props-api)
   - [Shared Props (Both Modes)](#shared-props-both-modes)
   - [Server Mode Props](#server-mode-props)
10. [Type Reference](#type-reference)
    - [`DataTableFilterableColumn<TData>`](#datatablefilterablecolumntdata)
    - [`DataTableFilterOption`](#datatablefilteroption)
    - [`DataTableSearchableColumn<TData>`](#datatatablesearchablecolumntdata)
    - [`DataTableDateRangeColumn<TData>`](#datatabledaterangecolumntdata)
    - [`DataTableDateFieldOption`](#datatabledatefieldoption)
    - [`DataTableAsyncFilterableColumn<TData>`](#datatableasyncfilterablecolumntdata)
    - [`DataTableRowAction<TData>`](#datatablerowactiontdata)
    - [`BulkActionConfig<T>`](#bulkactionconfigt)
    - [`PaginatedResponse<TData>`](#paginatedresponsetdata)
    - [`ServerTableParams`](#servertableparams)
    - [`SortDirection`](#sortdirection)
11. [Hook Reference](#hook-reference)
    - [`useServerTable`](#useservertable)
    - [`useServerTableParams`](#useservertableparams)
12. [Features In Detail](#features-in-detail)
    - [Search](#search)
    - [Sorting](#sorting)
    - [Filtering](#filtering)
    - [Pagination](#pagination)
    - [URL Sync](#url-sync)
    - [Column Visibility](#column-visibility)
    - [Sticky Actions Column](#sticky-actions-column)
    - [Row Selection](#row-selection)
    - [Loading States](#loading-states)
13. [Sub-Component Reference](#sub-component-reference)
    - [DataTableColumnHeader](#datatablecolumnheader)
    - [DataTableFacetedFilter](#datatablefacetedfilter)
    - [DataTableBulkActions](#datatablebulkactions)
    - [DataTableViewOptions](#datatableviewoptions)
    - [DataTableToolbar](#datatabletoolbar)
    - [DataTablePagination](#datatablepagination)
    - [DataTableDateRangeFilter](#datatabledaterangefilter)
    - [DataTableAsyncFilter](#dataTableAsyncFilter)
14. [Customization Guide](#customization-guide)
    - [Custom Cell Renderers](#custom-cell-renderers)
    - [Custom Column Widths](#custom-column-widths)
    - [Pinning a Column (Non-Hideable)](#pinning-a-column-non-hideable)
    - [Disabling Sorting on a Column](#disabling-sorting-on-a-column)
    - [Default Sort Order](#default-sort-order)
    - [Default Hidden Columns](#default-hidden-columns)
    - [Custom Empty State](#custom-empty-state)
    - [Custom Filter Function](#custom-filter-function)
    - [Adding a Row Actions Column](#adding-a-row-actions-column)
15. [Full Working Example](#full-working-example)
16. [Troubleshooting](#troubleshooting)

---

## Overview

The `DataTable` is a **generic, headless-first** component. It separates concerns cleanly:

- **You define** the data shape (TypeScript interface) and the column definitions.
- **The component manages** all table UI state (sorting, filtering, pagination, visibility, selection).
- **React Query handles** data fetching, caching, and loading states.
- **The URL** (in server mode) is the single source of truth for all table state.

```
┌──────────────────────────────────────────────────────────┐
│  DataTableToolbar                                        │
│  ┌─────────────────┐  ┌──────────┐  ┌──────┐  ┌──────┐  │
│  │ 🔍 Search...    │  │ Filter ▾ │  │ Reset│  │ View │  │
│  └─────────────────┘  └──────────┘  └──────┘  └──────┘  │
├──────────────────────────────────────────────────────────┤
│  Table                                                   │
│  ┌────┬───────────┬──────────┬────────┬─────────────┐   │
│  │ ☐  │ Name  ↕   │ Email ↕  │ Role ↕ │ Status ↕    │   │
│  ├────┼───────────┼──────────┼────────┼─────────────┤   │
│  │ ☐  │ Row data  │ ...      │ ...    │ ...         │   │
│  └────┴───────────┴──────────┴────────┴─────────────┘   │
├──────────────────────────────────────────────────────────┤
│  DataTablePagination                                     │
│  42 rows total     Rows: [20 ▾]     Page 1 of 3   ◀◀ ◀ ▶ ▶▶ │
└──────────────────────────────────────────────────────────┘
```

---

## File Structure

```
src/features/dashboard/data-table/
├── index.ts                        ← Barrel exports — always import from here
├── types.ts                       ← Shared TypeScript interfaces and server-mode types
├── DataTable.tsx                  ← Main component — use this in your pages
├── DataTableColumnHeader.tsx      ← Sortable/hideable column header button
├── DataTableFacetedFilter.tsx     ← Popover filter with checkboxes per column
├── DataTableDateRangeFilter.tsx   ← Calendar-based date range picker
├── DataTableAsyncFilter.tsx       ← Async dropdown filter (options fetched on open)
├── DataTablePagination.tsx         ← Page controls + rows-per-page selector
├── DataTableToolbar.tsx            ← Search input + filter pills + date range + view toggle
├── DataTableViewOptions.tsx        ← "View" dropdown to show/hide columns
├── data-table-row-actions.tsx      ← Row action button renderer
├── data-table-row-context-menu.tsx ← Row context menu renderer
├── use-server-table.ts            ← Composite hook: URL sync + TanStack Query
└── use-server-table-params.ts     ← URL ↔ ServerTableParams sync hook
```

All public exports are re-exported from `index.ts`. **Always import from the barrel:**

```
import { DataTable, DataTableColumnHeader } from "@/features/dashboard/data-table";
import type { DataTableFilterableColumn, ServerTableParams } from "@/features/dashboard/data-table";
```

The hooks are exported from the data-table barrel:

```
import { useServerTable, useServerTableParams } from "@/features/dashboard/data-table";
```

---

## Dependencies

All dependencies are already installed in the project. For reference:

| Package                                           | Purpose                                                                                                                  |
| :------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------- |
| `@tanstack/react-table`                           | Headless table engine (sorting, filtering, pagination, etc.)                                                             |
| `@tanstack/react-query`                           | Server-state management, data fetching, and caching                                                                      |
| `react-router`                                    | `useSearchParams` for URL sync                                                                                           |
| `@hugeicons/react` + `@hugeicons/core-free-icons` | Icon set                                                                                                                 |
| Shadcn UI components                              | `Table`, `Button`, `Input`, `Checkbox`, `Badge`, `Select`, `Popover`, `Command`, `DropdownMenu`, `Separator`, `Skeleton` |

---

## Modes at a Glance

|                  | Client Mode                              | Server Mode                                     |
| :--------------- | :--------------------------------------- | :---------------------------------------------- |
| **`mode` prop**  | `"client"` (default, omit entirely)      | `"server"`                                      |
| **Data source**  | Full dataset passed as `data` prop       | One API page at a time via `queryFn`            |
| **Search**       | In-memory `globalFilter` across all rows | `q` query param → API request                   |
| **Sort**         | In-memory sort by TanStack Table         | `sort_by` + `sort_dir` query params → API       |
| **Filter**       | In-memory faceted filter                 | Per-key query params (e.g. `&status=NEW`) → API |
| **Pagination**   | In-memory page slice                     | `page` + `limit` query params → API             |
| **URL sync**     | No                                       | Yes — URL is the single source of truth         |
| **Back/forward** | No                                       | Yes — browser history works correctly           |
| **Deep links**   | No                                       | Yes — share a URL and get the exact same view   |
| **Hooks needed** | Just `useQuery`                          | `useServerTable` (wraps everything)             |
| **Best for**     | Small/static datasets, mock data         | Real paginated APIs                             |

---

## Client Mode — Quick Start

The shortest path to a working data table with in-memory search, sort, filter, and pagination:

```
// 1. Define your type
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

// 2. Define columns
const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "price",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
    cell: ({ row }) => `$${row.getValue<number>("price").toFixed(2)}`,
  },
];

// 3. Render
export function ProductsTable() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
    />
  );
}
```

---

## Client Mode — Step-by-Step Guide

### Step 1 — Define Your Data Type

Create a TypeScript interface that matches the shape of a single row in your table. Keep it in a `columns.tsx` file co-located with your table component.

```
// src/pages/dashboard-products/columns.tsx

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: "electronics" | "clothing" | "food";
  status: "in_stock" | "low_stock" | "out_of_stock";
  createdAt: string;
}
```

---

### Step 2 — Define Your Columns

Column definitions control how each cell is rendered, whether a column is sortable, hideable, and how it filters. Use `DataTableColumnHeader` for any column that should support sorting.

```
// src/pages/dashboard-products/columns.tsx

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/features/dashboard/data-table";

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
    // Prevent this column from being hidden via the View menu
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const price = row.getValue<number>("price");
      return <span>${price.toFixed(2)}</span>;
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.getValue("category")}
      </Badge>
    ),
    // Required for faceted filtering to work on this column in client mode
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue<Product["status"]>("status");
      return <Badge className="capitalize">{status.replace("_", " ")}</Badge>;
    },
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) =>
      new Date(row.getValue("createdAt")).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
  },
];
```

> **Important (client mode):** Any column registered in `filterableColumns` **must** define a `filterFn` that accepts an array of strings. Use the pattern above: `(row, id, value: string[]) => value.includes(row.getValue(id))`. In server mode, filtering is handled by the API — you can omit `filterFn`.

---

### Step 3 — Fetch Data with React Query

Create a custom hook that uses `useQuery` to fetch your data. Keep it alongside your columns file.

```
// src/pages/dashboard-products/use-products.ts

import { useQuery } from "@tanstack/react-query";
import type { Product } from "./columns";

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch("/api/products");
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}
```

---

### Step 4 — Wire It All Together

Create a wrapper component that connects your React Query hook to the `DataTable`. Define your `filterableColumns` and `searchableColumns` config here.

```
// src/pages/dashboard-products/ProductsTable.tsx

"use client";

import { DataTable } from "@/features/dashboard/data-table";
import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/features/dashboard/data-table";
import { productColumns } from "./columns";
import type { Product } from "./columns";
import { useProducts } from "./use-products";

const filterableColumns: DataTableFilterableColumn<Product>[] = [
  {
    id: "category",
    title: "Category",
    options: [
      { label: "Electronics", value: "electronics" },
      { label: "Clothing",    value: "clothing"    },
      { label: "Food",        value: "food"        },
    ],
  },
  {
    id: "status",
    title: "Status",
    options: [
      { label: "In Stock",      value: "in_stock"      },
      { label: "Low Stock",     value: "low_stock"     },
      { label: "Out of Stock",  value: "out_of_stock"  },
    ],
  },
];

const searchableColumns: DataTableSearchableColumn<Product>[] = [
  { id: "name", title: "name" },
];

export function ProductsTable() {
  const { data, isLoading } = useProducts();

  const handleRowSelectionChange = (selectedRows: Product[]) => {
    console.log("Selected:", selectedRows);
  };

  return (
    <DataTable
      columns={productColumns}
      data={data ?? []}
      filterableColumns={filterableColumns}
      searchableColumns={searchableColumns}
      isLoading={isLoading}
      enableRowSelection={true}
      onRowSelectionChange={handleRowSelectionChange}
      defaultPageSize={10}
    />
  );
}
```

Then render it in your page:

```
// src/pages/dashboard-products/page.tsx

import { ProductsTable } from "./ProductsTable";

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
      <ProductsTable />
    </div>
  );
}
```

---

## Server Mode — Quick Start

The shortest path to a fully server-driven table with URL sync:

```
// use-products.ts
import { useServerTable } from "@/features/dashboard/data-table";
import { productsAPI } from "@/api/products";
import type { Product } from "./columns";
import type { ServerTableParams } from "@/features/dashboard/data-table";

export function useProducts() {
  return useServerTable<Product>({
    queryKey: ["products"],
    queryFn: async (params: ServerTableParams) => {
      const res = await productsAPI.list({
        page:     params.page,
        limit:    params.limit,
        q:        params.q,
        sort_by:  params.sort_by,
        sort_dir: params.sort_dir,
      });
      return res.data; // PaginatedResponse<Product>
    },
    defaults: { limit: 20 },
  });
}

// ProductsTable.tsx
export function ProductsTable() {
  const table = useProducts();
  const columns = useMemo(() => createProductColumns(), []);

  return (
    <DataTable
      mode="server"
      columns={columns}
      data={table.data}
      totalRows={table.totalRows}
      isLoading={table.isLoading}
      isFetching={table.isFetching}
      onSearchChange={table.onSearchChange}
      onPageChange={table.onPageChange}
      onPageSizeChange={table.onPageSizeChange}
      onSortChange={table.onSortChange}
      onFilterChange={table.onFilterChange}
      currentPage={table.params.page}
      currentPageSize={table.params.limit}
      currentSearch={table.params.q}
      currentSortBy={table.params.sort_by}
      currentSortDir={table.params.sort_dir}
      currentFilters={table.params.filters}
      pageSizeOptions={[10, 20, 30, 50]}
    />
  );
}
```

---

## Server Mode — Step-by-Step Guide

### Server Step 1 — Define Your Data Type

Same as client mode. Define an interface that matches one row from the API.

```
// src/pages/dashboard-inquiries/columns.tsx

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject?: string;
  status: "NEW" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  created_at: string;
}
```

---

### Server Step 2 — Define Your Columns

The column definitions are the same as client mode with one key difference: **`filterFn` is not needed** on columns whose filtering is handled by the API. You can still define one for local column filtering if needed, but it won't run in server mode.

```
// src/pages/dashboard-inquiries/columns.tsx

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/features/dashboard/data-table";
import type { Inquiry } from "./columns";

export function createInquiryColumns(): ColumnDef<Inquiry>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      // No filterFn needed — the API handles status filtering via &status=NEW
      enableSorting: true,
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Received" />
      ),
      cell: ({ row }) =>
        new Date(row.getValue("created_at")).toLocaleDateString("en-US", {
          year: "numeric", month: "short", day: "numeric",
        }),
      enableSorting: true,
    },
  ];
}
```

---

### Server Step 3 — Create the Query Function

Write an `async` function that accepts `ServerTableParams` and returns `PaginatedResponse<TData>`. This is where you translate the generic table params into your API's specific request shape.

```
// src/pages/dashboard-inquiries/use-contacts.ts

import type { ServerTableParams, PaginatedResponse } from "@/features/dashboard/data-table";
import type { Inquiry, GetInquiriesRequest } from "@/types/api/contacts";
import { contactsAPI } from "@/api/contacts";
import { InquiryStatus } from "@/types/api/contacts";

async function fetchInquiries(
  params: ServerTableParams,
): Promise<PaginatedResponse<Inquiry>> {
  const request: GetInquiriesRequest = {
    page:       params.page,
    limit:      params.limit,
    q:          params.q,
    sort_by:    params.sort_by,
    sort_dir:   params.sort_dir,
    start_date: params.start_date,
    end_date:   params.end_date,
    // params.filters holds arbitrary key → string[] maps from the URL.
    // Map each filter key to the API's expected field.
    // The current API accepts a single status value — pass the first selected.
    status: params.filters?.status?.[0] as InquiryStatus | undefined,
    assigned_to: params.filters?.assigned_to?.[0],
  };

  const response = await contactsAPI.getInquiries(request);
  // Unwrap ApiResponse<GetInquiriesResponse> → GetInquiriesResponse
  // GetInquiriesResponse already matches PaginatedResponse<Inquiry>
  return response.data;
}
```

The `PaginatedResponse<TData>` interface matches the API envelope exactly:

```
{
  "items": [...],       → items: TData[]
  "total": 42,          → total: number
  "page": 1,            → page: number
  "limit": 20,          → limit: number
  "total_pages": 3      → total_pages: number
}
```

---

### Server Step 4 — Create the Data Hook

Pass your query function to `useServerTable`. This is the only file you need to touch to configure caching behaviour.

```
// src/pages/dashboard-inquiries/use-contacts.ts (continued)

import { useServerTable } from "@/features/dashboard/data-table";

export function useContacts() {
  return useServerTable<Inquiry>({
    queryKey: ["inquiries"],
    queryFn: fetchInquiries,
    defaults: {
      page:  1,
      limit: 20,
    },
    queryOptions: {
      staleTime:            15_000,        // Re-fetch after 15 s
      gcTime:               5 * 60_000,    // Keep cache for 5 min
      refetchOnWindowFocus: false,
    },
  });
}
```

---

### Server Step 5 — Wire It All Together

Spread the hook's return value onto `<DataTable mode="server">`. Define `filterableColumns` and `searchableColumns` at module scope so they are stable references.

```
// src/pages/dashboard-inquiries/ContactsTable.tsx

"use client";

import { useMemo } from "react";
import { DataTable } from "@/features/dashboard/data-table";
import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/features/dashboard/data-table";
import { InquiryStatus, type Inquiry } from "@/types/api/contacts";
import { createInquiryColumns } from "./columns";
import { useContacts } from "./use-contacts";

// Defined at module scope — stable references, never cause re-renders
const filterableColumns: DataTableFilterableColumn<Inquiry>[] = [
  {
    id: "status",
    title: "Status",
    options: [
      { label: "New",         value: InquiryStatus.NEW         },
      { label: "In Progress", value: InquiryStatus.IN_PROGRESS },
      { label: "Resolved",    value: InquiryStatus.RESOLVED    },
      { label: "Closed",      value: InquiryStatus.CLOSED      },
    ],
  },
];

// In server mode, searchableColumns only affects the placeholder text.
// The actual search is powered by the `q` API param.
const searchableColumns: DataTableSearchableColumn<Inquiry>[] = [
  { id: "name",    title: "name"    },
  { id: "email",   title: "email"   },
  { id: "subject", title: "subject" },
];

export function ContactsTable() {
  const contacts = useContacts();

  const columns = useMemo(() => createInquiryColumns(), []);

  return (
    <DataTable
      mode="server"

      // Column definitions
      columns={columns}
      filterableColumns={filterableColumns}
      searchableColumns={searchableColumns}

      // Data from TanStack Query
      data={contacts.data}
      totalRows={contacts.totalRows}

      // Loading states
      isLoading={contacts.isLoading}
      isFetching={contacts.isFetching}

      // Controlled state (read from URL)
      currentPage={contacts.params.page}
      currentPageSize={contacts.params.limit}
      currentSearch={contacts.params.q}
      currentSortBy={contacts.params.sort_by}
      currentSortDir={contacts.params.sort_dir}
      currentFilters={contacts.params.filters}

      // Change callbacks (write back to URL → trigger re-fetch)
      onSearchChange={contacts.onSearchChange}
      onPageChange={contacts.onPageChange}
      onPageSizeChange={contacts.onPageSizeChange}
      onSortChange={contacts.onSortChange}
      onFilterChange={contacts.onFilterChange}

      pageSizeOptions={[10, 20, 30, 50]}
      defaultPageSize={20}
    />
  );
}
```

---

## DataTable Props API

### Shared Props (Both Modes)

| Prop                      | Type                                      | Default                | Required | Description                                                                                                                                            |
| :------------------------ | :---------------------------------------- | :--------------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `columns`                 | `ColumnDef<TData, TValue>[]`              | —                      | ✅       | TanStack column definitions.                                                                                                                           |
| `data`                    | `TData[]`                                 | —                      | ✅       | Current page of rows. Pass `[]` while loading.                                                                                                         |
| `mode`                    | `"client" \| "server"`                    | `"client"`             | —        | Selects the operating mode. Omit entirely for client mode.                                                                                             |
| `filterableColumns`       | `DataTableFilterableColumn<TData>[]`      | `[]`                   | —        | Columns that render a faceted filter pill in the toolbar.                                                                                              |
| `searchableColumns`       | `DataTableSearchableColumn<TData>[]`      | `[]`                   | —        | When provided, shows a search input in the toolbar.                                                                                                    |
| `dateRangeColumns`        | `DataTableDateRangeColumn<TData>[]`       | `[]`                   | —        | Columns that render a date range picker in the toolbar.                                                                                                |
| `asyncFilterableColumns`  | `DataTableAsyncFilterableColumn<TData>[]` | `[]`                   | —        | Columns that render an async dropdown filter (options fetched on open).                                                                                |
| `defaultPageSize`         | `number`                                  | `10`                   | —        | The initial rows-per-page value.                                                                                                                       |
| `pageSizeOptions`         | `number[]`                                | `[10, 20, 30, 40, 50]` | —        | Options shown in the "Rows per page" dropdown.                                                                                                         |
| `isLoading`               | `boolean`                                 | `false`                | —        | When `true`, renders full skeleton rows instead of data.                                                                                               |
| `enableRowSelection`      | `boolean`                                 | `true`                 | —        | When `true`, prepends a checkbox column for row selection.                                                                                             |
| `onRowSelectionChange`    | `(selectedRows: TData[]) => void`         | —                      | —        | Fired whenever row selection changes. Receives full row objects.                                                                                       |
| `bulkActions`             | `BulkActionConfig<TData>[]`               | —                      | —        | Bulk actions shown in a toolbar dropdown while rows are selected. Each action receives the full selection as `TData[]`. Requires `enableRowSelection`. |
| `className`               | `string`                                  | —                      | —        | Additional CSS classes on the root wrapper `div`.                                                                                                      |
| `onRowClick`              | `(row: TData) => void`                    | —                      | —        | Fired when a row is single-clicked. Receives the full row object. Rows show a pointer cursor. Does not fire when clicking the row checkbox.            |
| `defaultColumnVisibility` | `VisibilityState`                         | `{}`                   | —        | Columns hidden on first render. Users can still toggle them back on via the view-options menu.                                                         |

### Server Mode Props

These props are **only available when `mode="server"`**. TypeScript will error if you pass them in client mode.

| Prop                | Type                                                                         | Required | Description                                                                                                                                                                                      |
| :------------------ | :--------------------------------------------------------------------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `totalRows`         | `number`                                                                     | ✅       | Total row count across all pages from `response.total`. Used to compute the correct page count in the pagination footer.                                                                         |
| `isFetching`        | `boolean`                                                                    | —        | `true` while a background re-fetch is in flight. Renders a semi-transparent overlay over the table instead of a full skeleton so existing data stays visible during page changes, searches, etc. |
| `currentPage`       | `number`                                                                     | —        | Current 1-based page number — pass `params.page` from `useServerTable`.                                                                                                                          |
| `currentPageSize`   | `number`                                                                     | —        | Current rows-per-page value — pass `params.limit`.                                                                                                                                               |
| `currentSearch`     | `string`                                                                     | —        | Current search query string — pass `params.q`.                                                                                                                                                   |
| `currentSortBy`     | `string`                                                                     | —        | Current sort column id — pass `params.sort_by`.                                                                                                                                                  |
| `currentSortDir`    | `SortDirection`                                                              | —        | Current sort direction — pass `params.sort_dir`.                                                                                                                                                 |
| `currentFilters`    | `Record<string, string[]>`                                                   | —        | Active filter values per column key — pass `params.filters`.                                                                                                                                     |
| `currentStartDate`  | `string`                                                                     | —        | Current start date in `yyyy-MM-dd` format — pass `params.start_date`.                                                                                                                            |
| `currentEndDate`    | `string`                                                                     | —        | Current end date in `yyyy-MM-dd` format — pass `params.end_date`.                                                                                                                                |
| `onSearchChange`    | `(value: string) => void`                                                    | —        | Debounced (400 ms) search callback — pass `table.onSearchChange`.                                                                                                                                |
| `onPageChange`      | `(page: number) => void`                                                     | —        | Page navigation callback — pass `table.onPageChange`.                                                                                                                                            |
| `onPageSizeChange`  | `(limit: number) => void`                                                    | —        | Page size change callback — pass `table.onPageSizeChange`.                                                                                                                                       |
| `onSortChange`      | `(sortBy: string \| undefined, sortDir: SortDirection \| undefined) => void` | —        | Sort change callback — pass `table.onSortChange`.                                                                                                                                                |
| `onFilterChange`    | `(filters: Record<string, string[]>) => void`                                | —        | Filter change callback — pass `table.onFilterChange`.                                                                                                                                            |
| `onDateRangeChange` | `(start: string \| undefined, end: string \| undefined) => void`             | —        | Date range change callback — pass `table.onDateRangeChange`.                                                                                                                                     |
| `currentDateField`  | `string`                                                                     | —        | Currently selected date field id, used when a `dateRangeColumns` entry declares `fields`. Defaults to the first configured field.                                                                |
| `onDateFieldChange` | `(field: string) => void`                                                    | —        | Called when the user picks a different date field for the range filter.                                                                                                                          |
| `onReset`           | `() => void`                                                                 | —        | Reset callback — pass `table.onReset`. Clears all filters, search, sort, and date range.                                                                                                         |

---

## Type Reference

### `DataTableFilterableColumn<TData>`

Configures a faceted filter button in the toolbar for a specific column.

```
interface DataTableFilterableColumn<TData> {
  // Must match the accessorKey of a ColumnDef in your columns array
  id: Extract<keyof TData, string> | string;

  // Label shown on the filter button
  title: string;

  // The list of selectable filter options
  options: DataTableFilterOption[];
}
```

---

### `DataTableFilterOption`

A single option inside a faceted filter.

```
interface DataTableFilterOption {
  // Display label shown in the filter popover
  label: string;

  // The actual value compared against row data (client mode)
  // or sent as a URL query param (server mode)
  value: string;

  // Optional icon rendered next to the label in the popover
  icon?: React.ComponentType<{ className?: string }>;
}
```

---

### `DataTableSearchableColumn<TData>`

Registers a column so its `title` contributes to the search input placeholder text.

- **Client mode:** The search runs as a TanStack Table `globalFilter` across all columns in memory. These entries only affect the placeholder.
- **Server mode:** The typed text is debounced and sent to the API as the `q` query param. These entries only affect the placeholder.

```
interface DataTableSearchableColumn<TData> {
  id: Extract<keyof TData, string> | string;
  title: string; // Used to build the placeholder: "Search name, email, subject..."
}
```

---

### `DataTableDateRangeColumn<TData>`

Configures a date range filter button in the toolbar. Opens a calendar popover where the user selects a `from` and `to` date. When both are selected the button label shows the formatted range (e.g. "Jan 1, 2026 - Jan 31, 2026").

The selected dates are formatted as `yyyy-MM-dd` and sent to the API via `params.start_date` and `params.end_date`.

```
interface DataTableDateRangeColumn<TData> {
  // Field name passed to onDateRangeChange — used in the toolbar key
  id: Extract<keyof TData, string> | string;

  // Label shown on the trigger button
  title: string;

  // Optional list of date fields the range can be applied to. When provided,
  // the picker renders a field selector above the calendar and reports changes
  // via onDateFieldChange. When omitted the picker behaves exactly as before.
  fields?: DataTableDateFieldOption[];
}
```

**Example config:**

```
const dateRangeColumns: DataTableDateRangeColumn<Work>[] = [
  { id: "created_at", title: "Date Range" },
];
```

> `DataTableDateRangeColumn` is server mode only. The date range picker requires server-side data fetching to update the table results based on the selected range.

---

### `DataTableDateFieldOption`

A selectable target field for a date-range filter. Used when one range picker can be applied to several date columns (e.g. "Created", "Assigned", "Est. Completion"). The chosen `value` is handed back through `onDateFieldChange` and the consumer decides which API param pair the range maps to.

```
interface DataTableDateFieldOption {
  label: string;         // Display label shown in the field selector
  value: string;         // Identifier returned via onDateFieldChange
  allowFuture?: boolean; // Allow future dates for this field. Default: false
}
```

**Example — multi-field date range config:**

```
const dateRangeColumns: DataTableDateRangeColumn<Work>[] = [
  {
    id: "created_at",
    title: "Date Range",
    fields: [
      { label: "Created",           value: "created_at" },
      { label: "Assigned",          value: "assigned_at" },
      { label: "Est. Completion",   value: "est_completion_at" },
      { label: "Actual Completion", value: "actual_completion_at", allowFuture: true },
    ],
  },
];
```

---

### `DataTableAsyncFilterableColumn<TData>`

Configures a dropdown filter whose options are fetched asynchronously. This is ideal for filters that require data from another API — for example, a `category_id` filter that needs to fetch the list of categories.

Unlike `DataTableFilterableColumn` (static options defined upfront), the popover loads its options from an API. The popover search box drives a **server-side** search, and results **page** (infinite scroll) instead of being bounded by a single fetch — every listing endpoint already supports `q` + `page`/`limit`, so large option sets load lazily.

A loading spinner is shown while an initial page loads; a bottom spinner appears while fetching more pages. Once fetched, results are cached per-search in local component state and reused on subsequent opens. Already-selected values that are not on the current page still render (so they can be deselected).

The selected values are integrated into the same `currentFilters`/`onFilterChange` pipeline as `DataTableFilterableColumn` — they appear as URL params like `?category_id=uuid-1,uuid-2` and are read from `params.filters` in your `queryFn`.

```
interface DataTableAsyncFilterableColumn<TData> {
  // The filter key — maps to params.filters[category_id]
  id: string;

  // Label shown on the trigger button
  title: string;

  // (Legacy) One-shot fetch of ALL options, filtered client-side in the
  // popover. Still supported for backward compatibility. Ignored when
  // fetchSearchOptions is provided.
  fetchOptions?: () => Promise<DataTableFilterOption[]>;

  // (Preferred) Attached, server-driven search + pagination call. The popover
  // search box drives `search`; scrolling loads further `page`s. Takes priority
  // over fetchOptions.
  fetchSearchOptions?: (
    args: { search?: string; page: number; limit: number }
  ) => Promise<DataTableAsyncFilterPage>;

  // Options per page for fetchSearchOptions. Default: 20.
  pageSize?: number;

  // Placeholder for the popover search input. Default: `Search ${title}...`.
  searchPlaceholder?: string;
}
```

**Example config (attached search + pagination):**

```
const asyncFilterableColumns: DataTableAsyncFilterableColumn<Work>[] = [
  {
    id: "category_id",
    title: "Category",
    pageSize: 20,
    fetchSearchOptions: async ({ search, page, limit }) => {
      const response = await workCategoryAPI.list({
        q: search,
        page,
        limit,
      });
      return {
        options: response.items.map((c) => ({
          label: c.name,
          value: c.id,
        })),
        total: response.total,
        hasMore: page * limit < response.total,
      };
    },
  },
];
```

**Example config (legacy one-shot fetch — still works):**

```
const asyncFilterableColumns: DataTableAsyncFilterableColumn<Work>[] = [
  {
    id: "category_id",
    title: "Category",
    fetchOptions: async () => {
      const response = await workCategoryAPI.list({ limit: 100 });
      return response.items.map((c) => ({
        label: c.name,
        value: c.id,
      }));
    },
  },
];
```

In your `queryFn`, read the selected category IDs from `params.filters`:

```
async function fetchWorks(params: ServerTableParams) {
  return workAPI.list({
    // params.filters.category_id is string[] — pass to API
    category_id: params.filters?.category_id?.[0],
    start_date: params.start_date,
    end_date: params.end_date,
  });
}
```

> `DataTableAsyncFilterableColumn` is server mode only. The fetch-on-open pattern requires a server-side query to update table results based on the selected filter.

---

### `DataTableAsyncFilterPage`

The paginated result returned by `fetchSearchOptions`. It mirrors the shape every listing endpoint supports (`q` + `page`/`limit`), so the popover can load large option sets lazily and page them on scroll.

```
interface DataTableAsyncFilterPage {
  // Options for the requested page.
  options: DataTableFilterOption[];
  // Total number of matching options across all pages.
  total: number;
  // Whether more pages are available after the current one.
  hasMore: boolean;
}
```

---

### `DataTableRowAction<TData>`

A utility type for building row action menus. See [Adding a Row Actions Column](#adding-a-row-actions-column).

```
interface DataTableRowAction<TData> {
  row: Row<TData>;
}
```

---

### `BulkActionConfig<T>`

Configuration for a single bulk action item, shown in the toolbar dropdown that appears when one or more rows are selected. Unlike `RowActionConfig` (which acts on a single row), bulk actions operate on the **entire selection** — the `onClick` handler receives an array of rows.

```
interface BulkActionConfig<T> {
  id:             string;                              // Unique React key
  label:          string | ((rows: T[]) => string);    // Menu label
  icon?:          IconSvgElement;                      // Optional Hugeicons icon
  variant?:       "default" | "destructive";           // "destructive" renders red
  permission?:    PermissionCode | PermissionNode
                  | (PermissionCode | PermissionNode)[]; // Optional PermissionGuard
  separatorBefore?: boolean;                            // Separator before this item
  onClick:        (rows: T[]) => void;                 // Called with selected rows
}
```

---

### `PaginatedResponse<TData>`

The typed envelope returned by every paginated API endpoint. Your `queryFn` must resolve to this shape. It matches the Go backend response exactly.

```
interface PaginatedResponse<TData> {
  items:       TData[];  // The current page of rows
  total:       number;   // Total rows across ALL pages
  page:        number;   // Current page (1-based)
  limit:       number;   // Rows per page
  total_pages: number;   // Total number of pages
}
```

Example API response that satisfies this type (after unwrapping `ApiResponse.data`):

```
{
  "items": [{ "id": "abc", "name": "Jenil Desai", ... }],
  "total": 42,
  "page": 1,
  "limit": 20,
  "total_pages": 3
}
```

---

### `ServerTableParams`

The single source of truth for all server-driven table state. This object is read from and written to the URL search params by `useServerTableParams`. Pass it directly to your API call inside `queryFn`.

```
interface ServerTableParams {
  page:        number;             // 1-based page number. Default: 1
  limit:       number;             // Rows per page. Default: 20
  q?:          string;             // Full-text search → ?q=jenil
  sort_by?:    string;             // Column/field name → ?sort_by=created_at
  sort_dir?:   SortDirection;      // "asc" | "desc"  → ?sort_dir=desc
  start_date?: string;             // ISO-8601 date  → ?start_date=2026-01-01
  end_date?:   string;             // ISO-8601 date  → ?end_date=2026-12-31
  filters?:    Record<string, string[]>;
  // Arbitrary extra filters serialised as individual URL params.
  // { status: ["NEW", "IN_PROGRESS"] } → ?status=NEW,IN_PROGRESS
  // { assigned_to: ["uuid"] }          → ?assigned_to=uuid
}
```

**URL shape produced:**

```
/dashboard/inquiries
/dashboard/inquiries?q=jenil
/dashboard/inquiries?page=2&limit=20
/dashboard/inquiries?sort_by=created_at&sort_dir=desc
/dashboard/inquiries?status=NEW,IN_PROGRESS
/dashboard/inquiries?start_date=2026-01-01&end_date=2026-12-31
/dashboard/inquiries?page=2&q=jenil&sort_by=created_at&sort_dir=desc&status=NEW
```

`page` and `limit` are omitted from the URL when they equal their defaults (1 and 20 respectively) to keep URLs clean.

---

### `SortDirection`

```
type SortDirection = "asc" | "desc";
```

---

## Hook Reference

### `useServerTable`

**Location:** `src/hooks/use-server-table.ts`
**Import:** `import { useServerTable } from "@/features/dashboard/data-table";`

The primary hook for server-driven tables. Composes `useServerTableParams` (URL sync) and `useQuery` (data fetching) into a single call. Everything you need to drive a `<DataTable mode="server" />` is in the return value.

#### Options

```
interface UseServerTableOptions<TData> {
  // Base query key. The current ServerTableParams is appended automatically
  // so TanStack Query re-fetches whenever any param changes.
  queryKey: string[];

  // Async function that receives the current params and returns
  // PaginatedResponse<TData>. Unwrap ApiResponse here before returning.
  queryFn: (params: ServerTableParams) => Promise<PaginatedResponse<TData>>;

  // Default param values when a key is absent from the URL.
  // Only non-default values are written to the URL.
  defaults?: Partial<ServerTableParams>;

  // URL search-param keys that are NOT table state and must survive every
  // table interaction (including "reset"). They are never parsed into
  // filters and are re-written on each navigation.
  // @example ["tab"]
  preserveKeys?: string[];

  // Extra TanStack Query options.
  queryOptions?: {
    staleTime?:            number;           // Default: 30_000 (30 s)
    gcTime?:               number;           // Default: 300_000 (5 min)
    refetchOnWindowFocus?: boolean;          // Default: false
    refetchInterval?:      number | false;   // Default: false
    retry?:                number | boolean; // Default: 1
    enabled?:              boolean;          // Default: true
  };
}
```

#### Return Value

```
interface UseServerTableReturn<TData> {
  // ── Data ──────────────────────────────────────────────────────────────────
  data:       TData[];  // Current page items → pass to data prop
  totalRows:  number;   // API total count   → pass to totalRows prop
  totalPages: number;   // API total pages   → for custom pagination UI

  // ── Query state ───────────────────────────────────────────────────────────
  isLoading:  boolean;  // True on first fetch (no cache). Shows full skeleton.
  isFetching: boolean;  // True on every re-fetch. Shows subtle overlay.
  isError:    boolean;
  error:      Error | null;

  // ── URL-driven params ─────────────────────────────────────────────────────
  params: ServerTableParams; // Pass individual fields to current* props

  // ── Change handlers (write to URL → trigger re-fetch) ────────────────────
  onSearchChange:    (value: string) => void;    // Debounced 400 ms
  onPageChange:      (page: number) => void;
  onPageSizeChange:  (limit: number) => void;
  onSortChange:      (sortBy: string | undefined, sortDir: SortDirection | undefined) => void;
  onFilterChange:    (filters: Record<string, string[]>) => void;
  onDateRangeChange: (startDate: string | undefined, endDate: string | undefined) => void;
  onReset:           () => void;  // Resets all params to defaults
}
```

#### Data flow

```
User types "jenil" in search box
  → localSearch updates immediately (input stays responsive)
  → 400 ms debounce fires → onSearchChange("jenil")
  → router.replace("?q=jenil") → URL updates
  → useSearchParams() change → params re-derived
  → TanStack Query sees new queryKey → re-fetches API
  → GET /contact?q=jenil&page=1&limit=20
  → data updates → table re-renders
```

---

### `useServerTableParams`

**Location:** `src/hooks/use-server-table-params.ts`
**Import:** `import { useServerTableParams } from "@/features/dashboard/data-table";`

Low-level hook that synchronises `ServerTableParams` with the Next.js App Router URL. Used internally by `useServerTable`. Use this directly only if you need to build custom table controls outside of `DataTable` (e.g. a date-range picker in the page header that should also reset the table page).

#### Usage

```
const {
  params,
  setParams,
  setSearch,
  setPage,
  setLimit,
  setSort,
  setFilters,
  setDateRange,
  reset,
} = useServerTableParams({ limit: 20 }, ["tab"]); // preserveKeys
```

The optional `preserveKeys` array lists URL search-param keys that are not table state (e.g. the active `tab`). They are excluded from `params.filters`, re-applied on every navigation, and preserved even when `reset()` is called — so surrounding page state survives all table interactions.

#### Return Value

| Member         | Type                                                                         | Description                                                                                                                         |
| :------------- | :--------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| `params`       | `ServerTableParams`                                                          | Current fully-parsed params, derived from the URL on every `searchParams` change.                                                   |
| `setParams`    | `(next: Partial<ServerTableParams>, resetPage?: boolean) => void`            | Merge a partial update and push to the URL. Resets `page` to 1 unless `resetPage` is `false` or `next.page` is explicitly provided. |
| `setSearch`    | `(value: string) => void`                                                    | Debounced (400 ms) search setter. Trims the value; empty string clears `q` from the URL.                                            |
| `setPage`      | `(page: number) => void`                                                     | Navigate to a specific 1-based page.                                                                                                |
| `setLimit`     | `(limit: number) => void`                                                    | Update rows-per-page and reset to page 1.                                                                                           |
| `setSort`      | `(sortBy: string \| undefined, sortDir: SortDirection \| undefined) => void` | Set sort column and direction. Pass both as `undefined` to clear sorting. Resets to page 1.                                         |
| `setFilters`   | `(filters: Record<string, string[]>) => void`                                | Merge filter values and reset to page 1. Pass an empty array for a key to remove it from the URL.                                   |
| `setDateRange` | `(startDate: string \| undefined, endDate: string \| undefined) => void`     | Set the `start_date` / `end_date` params and reset to page 1.                                                                       |
| `reset`        | `() => void`                                                                 | Clear all params and navigate to the clean URL.                                                                                     |

#### Important: `defaults` stability

Pass a **stable reference** for `defaults` — an object literal at module scope or the result of `useMemo`. The hook intentionally excludes `defaults` from its internal `useMemo` dependency array to prevent re-parsing the URL on every render when the caller writes an inline object literal.

```
// ✅ Correct — module-scope constant, stable across renders
const TABLE_DEFAULTS = { limit: 20 };
export function useContacts() {
  return useServerTableParams(TABLE_DEFAULTS);
}

// ✅ Also correct — useServerTable handles this for you
export function useContacts() {
  return useServerTable({ queryKey: ["inquiries"], queryFn, defaults: { limit: 20 } });
}

// ⚠️ Avoid — new object on every render (harmless but wasteful)
const { params } = useServerTableParams({ limit: 20 });
```

---

## Features In Detail

### Search

### Sorting

### Filtering

### Date Range Filtering

### Async Dropdown Filtering

### Pagination

**Client mode:** The global search input uses TanStack Table's `globalFilter` with `globalFilterFn: "auto"`. It performs a case-insensitive string match across all columns of every row in memory. The `searchableColumns` prop only affects the placeholder text.

**Server mode:** The search input uses a local uncontrolled state that updates the input immediately. After a 400 ms debounce the value is written to the URL as `?q=<value>` and TanStack Query fires a new API request. The input resets correctly when the user clicks Reset, or when the browser back/forward buttons navigate to a URL without `?q`.

```
// Client mode
const searchableColumns: DataTableSearchableColumn<User>[] = [
  { id: "name",  title: "name"  },
  { id: "email", title: "email" },
];
// Placeholder: "Search name, email…"
// Searches ALL columns in memory, not just name and email.

// Server mode — same config, different behaviour
// Placeholder: "Search name, email…"
// Sends: GET /users?q=<value>  — server decides what to search.
```

To disable search entirely, omit `searchableColumns` or pass an empty array.

---

### Sorting

Sorting is per-column and opt-in. Wrap any column's `header` with `DataTableColumnHeader` to add a sort dropdown:

```
{
  accessorKey: "email",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Email" />
  ),
}
```

Clicking the header button opens a dropdown with **Ascending**, **Descending**, and **Hide Column** options. The current sort direction is reflected by an arrow icon.

**Client mode:** TanStack Table sorts all rows in memory.

**Server mode:** Clicking a sortable header writes `?sort_by=email&sort_dir=asc` to the URL and triggers a re-fetch. Pass these values back to the API in your `queryFn` via `params.sort_by` and `params.sort_dir`.

To disable sorting on a specific column:

```
{
  accessorKey: "avatar",
  enableSorting: false,
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Avatar" />
    // Renders as plain text when enableSorting is false
  ),
}
```

---

### Filtering

Filtering uses `DataTableFacetedFilter` — a popover with checkboxes, one per option. Selections within a column use **OR** logic (any selected value passes).

**Client mode:** Add `filterFn` to the column definition. The filter runs in memory against all rows.

```
{
  accessorKey: "status",
  filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
}
```

**Server mode:** No `filterFn` is needed. When the user selects options, the component calls `onFilterChange` with the full filter map. This writes each active filter as a URL param (e.g. `?status=NEW,IN_PROGRESS`) and triggers a re-fetch. Read them in your `queryFn` via `params.filters`:

```
async function queryFn(params: ServerTableParams) {
  return api.list({
    status: params.filters?.status?.[0] as Status | undefined,
  });
}
```

The filter button shows how many options are currently selected and lists their labels inline (up to 2) or collapses to a count badge (3+). In client mode, the popover also shows how many rows match each option, powered by TanStack's `getFacetedUniqueValues`.

---

### Date Range Filtering

A calendar-based range picker for filtering records by a `from` and `to` date. Configured via `dateRangeColumns` and rendered by `DataTableDateRangeFilter`.

**Server mode only.** The selected dates are written to the URL as `?start_date=2026-01-01&end_date=2026-01-31` and passed to your `queryFn` via `params.start_date` and `params.end_date`. The button label dynamically shows the selected range once both dates are chosen, or "End date" when only the start is set.

```
// 1. Declare the config — field name + button label
const dateRangeColumns: DataTableDateRangeColumn<Work>[] = [
  { id: "created_at", title: "Date Range" },
];

// 2. Pass to DataTable (server mode)
<DataTable
  mode="server"
  dateRangeColumns={dateRangeColumns}
  onDateRangeChange={works.onDateRangeChange}
  currentStartDate={works.params.start_date}
  currentEndDate={works.params.end_date}
  // ... rest of props
/>

// 3. Forward to API in your queryFn
async function fetchWorks(params: ServerTableParams) {
  return workAPI.list({
    start_date: params.start_date,
    end_date: params.end_date,
    // ...
  });
}
```

The calendar disables future dates (`disabled: date > new Date()`) and closes automatically once both `from` and `to` dates are selected. A clear button inside the popover and an × icon on the trigger button reset the range.

**Selectable date fields.** When a `dateRangeColumns` entry provides `fields`, the picker renders a field selector above the calendar. The chosen field is reported via `onDateFieldChange` (and read from `currentDateField`); the consumer maps it to the relevant API date params. A field with `allowFuture: true` enables picking future dates for that field, otherwise future dates are disabled as usual.

```
<DataTable
  mode="server"
  dateRangeColumns={dateRangeColumns}
  currentDateField={dateField}              // e.g. "created_at"
  onDateFieldChange={setDateField}
  onDateRangeChange={works.onDateRangeChange}
  currentStartDate={works.params.start_date}
  currentEndDate={works.params.end_date}
  // ...
/>
```

---

### Async Dropdown Filtering

A dropdown filter that fetches its options asynchronously. Use this when the filter options are not known upfront — for example, a `category` filter that needs to load available categories from an API.

There are two ways to supply options:

1. **Attached search + pagination (preferred for large sets).** Provide `fetchSearchOptions`. The popover's search box drives a server-side `q` and scrolling loads further `page`s, so option sets of any size load lazily. A spinner shows while the initial page loads and a bottom spinner appears while fetching more.
2. **Legacy one-shot fetch.** Provide `fetchOptions` to load all options in a single call; the popover filters them client-side. Still supported for backward compatibility and ignored when `fetchSearchOptions` is set.

```
// 1a. Attached search + pagination (preferred)
const asyncFilterableColumns: DataTableAsyncFilterableColumn<Work>[] = [
  {
    id: "category_id",
    title: "Category",
    pageSize: 20,
    fetchSearchOptions: async ({ search, page, limit }) => {
      const res = await workCategoryAPI.list({ q: search, page, limit });
      return {
        options: res.items.map((c) => ({ label: c.name, value: c.id })),
        total: res.total,
        hasMore: page * limit < res.total,
      };
    },
  },
];

// 1b. Legacy one-shot fetch (still works)
const asyncFilterableColumns: DataTableAsyncFilterableColumn<Work>[] = [
  {
    id: "category_id",
    title: "Category",
    fetchOptions: async () => {
      const res = await workCategoryAPI.list({ limit: 100 });
      return res.items.map((c) => ({
        label: c.name,
        value: c.id,
      }));
    },
  },
];

// 2. Pass to DataTable (server mode)
<DataTable
  mode="server"
  asyncFilterableColumns={asyncFilterableColumns}
  onFilterChange={works.onFilterChange}
  currentFilters={works.params.filters}
  // ... rest of props
/>

// 3. Read from params.filters in your queryFn
async function fetchWorks(params: ServerTableParams) {
  return workAPI.list({
    category_id: params.filters?.category_id?.[0],
  });
}
```

The selected values flow through the same `currentFilters`/`onFilterChange` pipeline as `DataTableFacetedFilter` — they appear as URL params (`?category_id=uuid-1,uuid-2`) and can be read from `params.filters` in your `queryFn`. Already-selected values that are not on the current page still render (with a checked checkbox) so they can be deselected.

---

### Pagination

Pagination is always enabled and renders below the table. It includes:

- **Row count** — "42 rows total" (server mode uses the API's `total`) or "3 of 42 rows selected" when rows are selected.
- **Rows per page** — A `Select` dropdown, controlled by `pageSizeOptions`.
- **Page indicator** — "Page 2 of 3".
- **Navigation buttons** — First ◀◀, Previous ◀, Next ▶, Last ▶▶.

**Client mode:** All pagination logic runs inside TanStack Table.

**Server mode:** Navigation buttons call `onPageChange(newPage)` which writes `?page=N` to the URL and triggers a re-fetch. The "Rows per page" selector calls `onPageSizeChange(newLimit)` which writes `?limit=N` and resets to page 1. The footer uses `totalRows` from the API (not the in-memory row count) for the total display and to derive the correct page count.

---

### URL Sync

URL sync is exclusive to server mode and requires no extra configuration — it is built into `useServerTable` via `useServerTableParams`.

**What lives in the URL:**

| URL param      | Example                  | Maps to                 |
| :------------- | :----------------------- | :---------------------- |
| `page`         | `?page=3`                | `params.page`           |
| `limit`        | `?limit=50`              | `params.limit`          |
| `q`            | `?q=jenil`               | `params.q`              |
| `sort_by`      | `?sort_by=created_at`    | `params.sort_by`        |
| `sort_dir`     | `?sort_dir=desc`         | `params.sort_dir`       |
| `start_date`   | `?start_date=2026-01-01` | `params.start_date`     |
| `end_date`     | `?end_date=2026-12-31`   | `params.end_date`       |
| `<filter_key>` | `?status=NEW,CLOSED`     | `params.filters.status` |

**What this enables:**

- **Browser back/forward** works correctly — every table state change is a history entry.
- **Deep links** — share a URL like `/dashboard/inquiries?q=jenil&status=NEW` and the recipient sees the exact same filtered view.
- **Page refresh** restores state — the URL is the state; nothing is stored in component state.
- **Server Components** can optionally read the same `searchParams` for SSR if needed.

`page` is omitted when it equals `1`, and `limit` is omitted when it equals `20`, to keep clean-state URLs tidy.

---

### Column Visibility

Two mechanisms control column visibility (both modes):

1. **View menu (toolbar)** — The "View" button in the toolbar opens a dropdown listing all hideable columns with checkboxes. Toggling one immediately shows or hides that column.
2. **Column header** — The "Hide Column" option in the `DataTableColumnHeader` sort dropdown hides the column instantly.

To prevent a column from being hidden, set `enableHiding: false` in the column definition:

```
{
  accessorKey: "name",
  enableHiding: false, // Does not appear in the View menu
}
```

The auto-added row selection column (`id: "select"`) always has `enableHiding: false`.

---

### Row Selection

When `enableRowSelection={true}` (default), a checkbox column is automatically prepended. No changes to your `columns` array are needed.

- **Header checkbox** — Selects/deselects all rows on the current page.
- **Row checkbox** — Selects/deselects an individual row.
- **Indeterminate state** — The header shows a dash when some but not all rows are selected.

```
<DataTable
  enableRowSelection={true}
  onRowSelectionChange={(selectedRows) => {
    // selectedRows is TData[] — fully typed
    setSelectedItems(selectedRows);
  }}
/>
```

> **Note:** In server mode, row selection is scoped to the currently visible page. Navigating to a new page clears the selection.

---

### Bulk Actions

When `enableRowSelection` is on and one or more rows are selected, a "Bulk Actions" dropdown button appears in the toolbar beside the View menu. Provide it via the `bulkActions` prop. Each action receives the **full array** of selected rows.

```
<DataTable
  enableRowSelection
  onRowSelectionChange={(rows) => setSelected(rows)}
  bulkActions={[
    {
      id: "bulk-delete",
      label: "Delete",
      variant: "destructive",
      separatorBefore: true,
      onClick: (rows) => deleteMany(rows.map((r) => r.id)),
    },
    {
      id: "bulk-export",
      label: "Export selected",
      onClick: (rows) => exportCsv(rows),
    },
  ]}
/>
```

The button label shows the live selection count (e.g. `Bulk Actions (3)`) and disappears automatically once nothing is selected. See [DataTableBulkActions](#datatablebulkactions) for the standalone component.

---

### Sticky Actions Column

When a column has `id: "actions"` (the standard convention used by the `DataTableRowActions` column), the `DataTable` automatically pins it to the **right edge** so it stays visible when the table scrolls horizontally — on smaller screens or when a table has many columns.

This is built on TanStack's column pinning. The pinned header and cells are given `position: sticky`, an opaque background, a lift shadow, and a `z-index` so rows scrolled underneath are hidden. No page changes are required; the behaviour is enabled automatically.

```
// columns.tsx — nothing special needed
{
  id: "actions",
  header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
  cell: ({ row }) => <DataTableRowActions row={row} actions={actions} />,
}
```

`position: sticky` is inert when the table does not overflow, so the actions column renders normally on wide screens. Pinning is pure client-side state and does not affect the server-mode URL params.

---

### Row Click

When `onRowClick` is provided, a single left-click on any row fires the callback with that row's data. The row displays a pointer cursor to indicate it's clickable.

```
function MyTable() {
  const router = useRouter();

  return (
    <DataTable
      columns={columns}
      data={data}
      onRowClick={(product) => router.push(`/dashboard/products/${product.id}`)}
    />
  );
}
```

**Clicking the row checkbox does NOT fire `onRowClick`** — the checkbox cell uses `e.stopPropagation()` to prevent the event from reaching the row handler. If you have other interactive elements inside a cell (e.g. action buttons) and want to prevent row click, call `e.stopPropagation()` on their `onClick` handlers.

---

### Loading States

The component has two distinct loading states:

**`isLoading`** — `true` only on the very first fetch when there is no cached data yet. The entire table body is replaced with animated `Skeleton` rows. The number of skeleton rows matches `defaultPageSize` (client mode) or `currentPageSize` (server mode) so the layout does not shift when data arrives.

**`isFetching`** (server mode only) — `true` during every background re-fetch: page changes, search updates, sort and filter toggles. Instead of a full skeleton, a semi-transparent overlay (`bg-background/50 backdrop-blur-[1px]`) is applied over the table body so users can see the previous page's data while the next page loads. This prevents jarring layout shifts on every interaction.

```
// isLoading from useServerTable is automatically true only on first fetch.
// isFetching is true on every subsequent background request.

<DataTable
  isLoading={table.isLoading}   // Full skeleton on initial load
  isFetching={table.isFetching} // Subtle overlay on page changes / filter updates
/>
```

Always pass `data={table.data}` (which returns `[]` from `useServerTable` when loading), never `data={table.data ?? []}` — the hook already guarantees an array.

---

## Sub-Component Reference

You can use these sub-components individually if you need to build a custom table layout.

### DataTableColumnHeader

Renders a ghost button for a column header that opens a dropdown to sort ascending, sort descending, or hide the column.

```
import { DataTableColumnHeader } from "@/features/dashboard/data-table";

// Inside a ColumnDef:
header: ({ column }) => (
  <DataTableColumnHeader
    column={column}
    title="Email Address"
    className="text-red-500" // Optional extra classes on the wrapper div
  />
),
```

**Props:**

| Prop        | Type                    | Description                                           |
| :---------- | :---------------------- | :---------------------------------------------------- |
| `column`    | `Column<TData, TValue>` | The TanStack column instance from the header context. |
| `title`     | `string`                | The display label for the column.                     |
| `className` | `string`                | Optional extra classes.                               |

If `column.getCanSort()` returns `false` (because `enableSorting: false` is set on the column), the component renders a plain `<div>` with the title — no dropdown, no button.

---

### DataTableFacetedFilter

A standalone popover filter for a single column. Renders a dashed-border button that, when clicked, opens a searchable list of checkboxes.

```
import { DataTableFacetedFilter } from "@/features/dashboard/data-table";

<DataTableFacetedFilter
  column={table.getColumn("status")}
  title="Status"
  options={[
    { label: "Active",   value: "active"   },
    { label: "Inactive", value: "inactive" },
  ]}
/>
```

**Props:**

| Prop      | Type                                 | Description                                         |
| :-------- | :----------------------------------- | :-------------------------------------------------- |
| `column`  | `Column<TData, TValue> \| undefined` | The TanStack column instance.                       |
| `title`   | `string`                             | Label on the trigger button and search placeholder. |
| `options` | `DataTableFilterOption[]`            | The list of selectable options.                     |

**Adding icons to filter options:**

```
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";

const options: DataTableFilterOption[] = [
  {
    label: "Active",
    value: "active",
    icon: ({ className }) => (
      <HugeiconsIcon icon={CheckmarkCircle01Icon} className={className} />
    ),
  },
  {
    label: "Inactive",
    value: "inactive",
    icon: ({ className }) => (
      <HugeiconsIcon icon={Cancel01Icon} className={className} />
    ),
  },
];
```

> In client mode the popover shows match counts beside each option (e.g. "3"). In server mode, the table only holds the current page in memory so counts are not shown — the API would need to supply them separately.

---

### DataTableBulkActions

The "Bulk Actions" button and dropdown that appears in the toolbar when one or more rows are selected. Used internally by `DataTableToolbar` via the `bulkActions` prop. Each action receives the **full array** of selected rows.

```
import { DataTableBulkActions } from "@/features/dashboard/data-table";

<DataTableBulkActions
  table={table}
  actions={[
    { id: "delete", label: "Delete", variant: "destructive", onClick: (rows) => ... },
    { id: "export", label: "Export", onClick: (rows) => ... },
  ]}
/>
```

**Props:**

| Prop      | Type                        | Description                                        |
| :-------- | :-------------------------- | :------------------------------------------------- |
| `table`   | `Table<TData>`              | The TanStack table instance from `useReactTable`.  |
| `actions` | `BulkActionConfig<TData>[]` | The bulk action configs to render in the dropdown. |

The trigger button shows the live selection count (e.g. `Bulk Actions (3)`). Actions support `permission` guards, `variant: "destructive"`, icons, and `separatorBefore` — same conventions as `RowActionConfig`.

---

### DataTableViewOptions

The "View" button and dropdown for toggling column visibility. Automatically reads all hideable columns from the table instance.

```
import { DataTableViewOptions } from "@/features/dashboard/data-table";

<DataTableViewOptions table={table} />
```

**Props:**

| Prop        | Type           | Description                                       |
| :---------- | :------------- | :------------------------------------------------ |
| `table`     | `Table<TData>` | The TanStack table instance from `useReactTable`. |
| `className` | `string`       | Optional extra classes on the trigger button.     |

Column labels in the dropdown are derived in this order:

1. If `column.columnDef.header` is a plain `string`, that string is used.
2. Otherwise, the `column.id` is converted from camelCase/snake_case to Title Case automatically (e.g., `lastActive` → `Last Active`).

---

### DataTableToolbar

The full toolbar row: search input on the left, filter pills, reset button, and the View menu on the right (plus the bulk-actions menu when rows are selected). Used internally by `DataTable`.

In server mode, the toolbar accepts two additional props to wire up the debounced URL-aware search.

```
import { DataTableToolbar } from "@/features/dashboard/data-table";

// Client mode — no extra props needed
<DataTableToolbar
  table={table}
  filterableColumns={filterableColumns}
  searchableColumns={searchableColumns}
/>

// Server mode — pass the handler and controlled value
<DataTableToolbar
  table={table}
  filterableColumns={filterableColumns}
  searchableColumns={searchableColumns}
  onSearchChange={table.onSearchChange}
  currentSearch={table.params.q}
/>
```

**Props:**

| Prop                     | Type                                                             | Description                                                                                                                                                                                                       |
| :----------------------- | :--------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `table`                  | `Table<TData>`                                                   | The TanStack table instance.                                                                                                                                                                                      |
| `filterableColumns`      | `DataTableFilterableColumn<TData>[]`                             | Filter pill configs.                                                                                                                                                                                              |
| `searchableColumns`      | `DataTableSearchableColumn<TData>[]`                             | Affects the search placeholder text.                                                                                                                                                                              |
| `dateRangeColumns`       | `DataTableDateRangeColumn<TData>[]`                              | **Server mode only.** Date range filter configs.                                                                                                                                                                  |
| `asyncFilterableColumns` | `DataTableAsyncFilterableColumn<TData>[]`                        | **Server mode only.** Async filter configs.                                                                                                                                                                       |
| `bulkActions`            | `BulkActionConfig<TData>[]`                                      | Bulk actions shown in a dropdown beside the View menu while rows are selected.                                                                                                                                    |
| `onSearchChange`         | `(value: string) => void`                                        | **Server mode only.** Debounced search callback from `useServerTable`. When provided, the toolbar uses local uncontrolled state for the input and fires this callback instead of calling `table.setGlobalFilter`. |
| `currentSearch`          | `string`                                                         | **Server mode only.** The URL-driven search value. Used to initialise the input on first render and to reset it when the Reset button is clicked or the user navigates back.                                      |
| `onFilterChange`         | `(filters: Record<string, string[]>) => void`                    | **Server mode only.** Filter change callback from `useServerTable`. Handles both faceted and async filter changes.                                                                                                |
| `currentFilters`         | `Record<string, string[]>`                                       | **Server mode only.** The URL-driven filter values.                                                                                                                                                               |
| `onDateRangeChange`      | `(start: string \| undefined, end: string \| undefined) => void` | **Server mode only.** Date range change callback from `useServerTable`.                                                                                                                                           |
| `currentStartDate`       | `string`                                                         | **Server mode only.** Current `start_date` value.                                                                                                                                                                 |
| `currentEndDate`         | `string`                                                         | **Server mode only.** Current `end_date` value.                                                                                                                                                                   |
| `onReset`                | `() => void`                                                     | **Server mode only.** Reset all table state. Clears search, filters, date range, and sort.                                                                                                                        |
| `className`              | `string`                                                         | Optional extra classes on the root div.                                                                                                                                                                           |

---

### DataTablePagination

The pagination footer row. Used internally by `DataTable`. Supports both client and server modes.

```
import { DataTablePagination } from "@/features/dashboard/data-table";

// Client mode
<DataTablePagination
  table={table}
  pageSizeOptions={[5, 10, 25]}
/>

// Server mode
<DataTablePagination
  mode="server"
  table={table}
  pageSizeOptions={[10, 20, 50]}
  totalRows={42}
  onPageChange={(page) => setPage(page)}
  onPageSizeChange={(limit) => setLimit(limit)}
/>
```

**Props:**

| Prop               | Type                      | Description                                                                                                |
| :----------------- | :------------------------ | :--------------------------------------------------------------------------------------------------------- |
| `table`            | `Table<TData>`            | The TanStack table instance.                                                                               |
| `mode`             | `"client" \| "server"`    | Default: `"client"`.                                                                                       |
| `pageSizeOptions`  | `number[]`                | Options for the "Rows per page" select. Default: `[10, 20, 30, 40, 50]`.                                   |
| `totalRows`        | `number`                  | **Server mode only.** API-reported total row count. Used for the total display and page count calculation. |
| `onPageChange`     | `(page: number) => void`  | **Server mode only.** Called when the user clicks a navigation button. 1-based.                            |
| `onPageSizeChange` | `(limit: number) => void` | **Server mode only.** Called when the user changes the rows-per-page selector.                             |
| `className`        | `string`                  | Optional extra classes on the root div.                                                                    |

---

### DataTableDateRangeFilter

A standalone date range picker built on `Popover` + `Calendar`. Renders a dashed-border trigger button that opens a calendar configured in `mode="range"` for start/end date selection.

```
import { DataTableDateRangeFilter } from "@/features/dashboard/data-table";
import type { DateRange } from "react-day-picker";

<DataTableDateRangeFilter
  title="Date Range"
  value={dateRange}
  onDateChange={(range: DateRange) => {
    setDateRange(range);
    onDateRangeChange?.(
      range.from ? format(range.from, "yyyy-MM-dd") : undefined,
      range.to ? format(range.to, "yyyy-MM-dd") : undefined,
    );
  }}
/>
```

**Props:**

| Prop            | Type                         | Description                                                                                          |
| :-------------- | :--------------------------- | :--------------------------------------------------------------------------------------------------- |
| `title`         | `string`                     | Label shown on the trigger button before a range is selected.                                        |
| `value`         | `DateRange`                  | Controlled date range from `react-day-picker`: `{ from: Date \| undefined, to: Date \| undefined }`. |
| `onDateChange`  | `(range: DateRange) => void` | Called when the user selects a `from` and/or `to` date.                                              |
| `fields`        | `DataTableDateFieldOption[]` | Optional date fields the range can target. Renders a field selector above the calendar when set.     |
| `selectedField` | `string`                     | Currently selected field value (defaults to the first field).                                        |
| `onFieldChange` | `(field: string) => void`    | Called when the user picks a different date field.                                                   |

The component manages its own open/close state internally. It does not close the popover until both `from` and `to` dates are selected, so the user can adjust the range in a single session. A clear button inside the popover and an × icon on the trigger reset both dates.

When `fields` is provided, a field selector renders above the calendar. Choosing a field calls `onFieldChange`, and the active field's `allowFuture` flag controls whether future dates are disabled (`allowFuture: true` enables future dates; otherwise dates after today are disabled as usual).

> This component is also used internally by `DataTableToolbar` when `dateRangeColumns` is configured. For standalone usage outside the toolbar, import and place it directly.

---

### DataTableAsyncFilter

A standalone async dropdown filter. Options are fetched via a `fetchOptions` function when the popover first opens. Shows a spinner and "Loading..." text while fetching, then renders the same searchable checkbox list as `DataTableFacetedFilter`.

```
import { DataTableAsyncFilter } from "@/features/dashboard/data-table";

<DataTableAsyncFilter
  title="Category"
  fetchOptions={async () => {
    const res = await workCategoryAPI.list({ limit: 100 });
    return res.items.map((c) => ({ label: c.name, value: c.id }));
  }}
  selectedValues={getAsyncFilterValues("category_id")}
  onSelectionChange={(values) => handleAsyncFilterChange("category_id", values)}
/>
```

**Props:**

| Prop                | Type                                     | Description                                         |
| :------------------ | :--------------------------------------- | :-------------------------------------------------- |
| `title`             | `string`                                 | Label on the trigger button and search placeholder. |
| `fetchOptions`      | `() => Promise<DataTableFilterOption[]>` | Async function called once on first popover open.   |
| `selectedValues`    | `Set<string>`                            | Currently selected values.                          |
| `onSelectionChange` | `(values: Set<string>) => void`          | Called when the user toggles an option.             |

The component caches the fetched options in local state. Subsequent opens reuse the cache without re-fetching. To force a re-fetch (e.g., after adding a new category), manage the cache outside the component or re-create the component key.

> This component is also used internally by `DataTableToolbar` when `asyncFilterableColumns` is configured. For standalone usage outside the toolbar, import and place it directly.

---

## Customization Guide

### Custom Cell Renderers

Any column's `cell` property accepts a render function with full access to the row data:

```
{
  accessorKey: "price",
  header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
  cell: ({ row }) => {
    const price = row.getValue<number>("price");
    const isExpensive = price > 500;
    return (
      <span className={isExpensive ? "font-bold text-destructive" : ""}>
        ${price.toFixed(2)}
      </span>
    );
  },
}
```

Access the full row object via `row.original` to reach fields not exposed by `getValue`:

```
cell: ({ row }) => {
  const product = row.original; // Fully typed as Product
  return <span>{product.name} — {product.category}</span>;
},
```

---

### Custom Column Widths

Set a `size` in the column definition (in pixels). The table applies this as an inline `style` when the size differs from the TanStack default of `150`:

```
{
  accessorKey: "id",
  size: 80,
  header: "ID",
  cell: ({ row }) => <span className="font-mono text-xs">{row.getValue("id")}</span>,
}
```

---

### Pinning a Column (Non-Hideable)

To make a column always visible and excluded from the View menu:

```
{
  accessorKey: "name",
  enableHiding: false,
  header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
}
```

---

### Disabling Sorting on a Column

```
{
  accessorKey: "avatar",
  enableSorting: false,
  header: "Avatar",
  cell: ({ row }) => <img src={row.getValue("avatar")} className="size-8 rounded-full" />,
}
```

---

### Default Sort Order

**Client mode:** Pre-sort your data before passing it in, or extend `DataTable.tsx` to accept a `defaultSorting` prop passed into `useReactTable`'s `initialState`:

```
// Simplest approach: pre-sort the data
const sortedData = useMemo(
  () => [...(data ?? [])].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  [data]
);
<DataTable columns={columns} data={sortedData} />
```

**Server mode:** Pass `sort_by` and `sort_dir` in `defaults` to `useServerTable`. This sets the initial URL params so the first request is already sorted:

```
useServerTable({
  queryKey: ["inquiries"],
  queryFn: fetchInquiries,
  defaults: {
    limit:    20,
    sort_by:  "created_at",
    sort_dir: "desc",
  },
});
```

---

### Default Hidden Columns

`DataTable` accepts a `defaultColumnVisibility` prop (see [Shared Props](#shared-props-both-modes)). Columns listed as `false` are hidden on first render but remain toggleable via the view-options menu.

```
<DataTable
  columns={columns}
  data={data}
  defaultColumnVisibility={{ assigned_to: false, admin_notes: false }}
/>
```

---

### Custom Empty State

When there is no data and `isLoading` is `false`, the table renders a default empty state. To replace it, modify the empty state block in `DataTable.tsx`:

```
// Inside the TableBody empty branch in DataTable.tsx:
<TableRow>
  <TableCell colSpan={visibleColumnCount} className="h-40 text-center">
    <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
      <YourCustomIllustration className="size-16 opacity-30" />
      <p className="text-sm font-medium">No inquiries found</p>
      <p className="text-xs">Try adjusting your filters or search query.</p>
    </div>
  </TableCell>
</TableRow>
```

---

### Custom Filter Function

**Client mode only.** The built-in array-includes filter is fine for enum-like values. For more complex scenarios:

**Range filter (numbers):**

```
{
  accessorKey: "price",
  filterFn: (row, id, value: [number, number]) => {
    const price = row.getValue<number>(id);
    const [min, max] = value;
    return price >= min && price <= max;
  },
}
```

**Date range filter:**

```
{
  accessorKey: "createdAt",
  filterFn: (row, id, value: [Date, Date]) => {
    const date = new Date(row.getValue<string>(id));
    const [start, end] = value;
    return date >= start && date <= end;
  },
}
```

**Built-in TanStack filter functions** (pass as a string):

```
{ filterFn: "equals"        }  // Strict equality
{ filterFn: "includesString"}  // Case-insensitive string contains
{ filterFn: "inNumberRange" }  // [min, max] for numbers
{ filterFn: "auto"          }  // Infers based on cell value type
```

> In server mode, filtering is handled by the API. You can still define `filterFn` on a column but it will not be called because `manualFiltering: true` is set internally.

---

### Adding a Row Actions Column

A common pattern is a "..." button at the end of each row that opens a dropdown with actions like View, Edit, or Delete.

```
// In columns.tsx

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoreHorizontalIcon } from "@hugeicons/core-free-icons";

export const productColumns: ColumnDef<Product>[] = [
  // ... your other columns ...
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    size: 60,
    cell: ({ row }) => {
      const product = row.original;

      const handleEdit = () => {
        console.log("Edit", product.id);
      };

      const handleDelete = () => {
        console.log("Delete", product.id);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <span className="sr-only">Open menu</span>
              <HugeiconsIcon icon={MoreHorizontalIcon} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleDelete}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
```

> **Note:** Do not define event handlers inside JSX (e.g., `onClick={() => ...}`). Always extract them as named arrow functions above the return statement, as shown above. See the project's Frontend Rules for details.

For server mode, pass action callbacks into a column factory so mutations can trigger query invalidation:

```
export function createInquiryColumns(actions: InquiryColumnActions = {}): ColumnDef<Inquiry>[] {
  return [
    // ... columns ...
    {
      id: "actions",
      enableSorting: false,
      enableHiding: false,
      size: 60,
      cell: ({ row }) => (
        <InquiryActions inquiry={row.original} {...actions} />
      ),
    },
  ];
}
```

---

## Full Working Example

The production `ContactsTable` in `src/pages/dashboard-inquiries/` is the canonical server mode example. Use it as a reference.

**`columns.tsx`** — Data type + column definitions with status badges, icons, and a row actions dropdown.

**`use-contacts.ts`** — `useServerTable<Inquiry>` hook. Contains the `fetchInquiries` query function that maps `ServerTableParams` to `GetInquiriesRequest` and unwraps the `ApiResponse` envelope.

**`ContactsTable.tsx`** — The wrapper component. Declares `filterableColumns` and `searchableColumns` at module scope, calls `useContacts()`, and spreads the return value onto `<DataTable mode="server" />`.

**`page.tsx`** — The Next.js page that renders `ContactsTable` inside the dashboard layout.

---

## Troubleshooting

**The filter button appears in server mode but nothing happens.**

In server mode, filtering is entirely URL-driven. Make sure:

1. `onFilterChange={table.onFilterChange}` is passed to `<DataTable>`.
2. Your `queryFn` reads `params.filters` and maps the relevant keys to your API request.
3. The `filterableColumns[].id` values match the keys you read from `params.filters` (e.g., `id: "status"` → `params.filters?.status`).

---

**The filter button appears in client mode but filtering does nothing.**

You are missing the `filterFn` on the column definition. Every column registered in `filterableColumns` must have:

```
filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
```

---

**The search input is unresponsive or lags in server mode.**

This should not happen — the toolbar uses local uncontrolled state for the input value in server mode so keystrokes are reflected immediately. If the input feels laggy, check that you are not re-creating the `onSearchChange` function on every render. It must come from `useServerTable` (or `useServerTableParams`), which returns a stable debounced reference.

---

**The page resets to 1 on every filter or sort change.**

This is intentional. Whenever a filter, sort, or search changes in server mode, the page resets to 1 because the old page index is no longer meaningful for the new result set. If you want to preserve the page across a specific kind of update, pass `resetPage: false` to `setParams` in `useServerTableParams`.

---

**The pagination shows the wrong total in server mode.**

Make sure `totalRows={table.totalRows}` is passed to `<DataTable>`, and that your `queryFn` returns the `total` field from the API response. The `useServerTable` hook exposes `totalRows` directly from `response.total`.

---

**Browser back/forward does not restore table state.**

Ensure your page component and `ContactsTable` are both Client Components (`"use client"`). `useSearchParams()` requires a Client Component context. If you see a `useSearchParams() should be wrapped in a suspense boundary` warning in development, wrap the table in `<Suspense>` in your page:

```
// page.tsx
import { Suspense } from "react";
import { ContactsTable } from "./ContactsTable";

export default function ContactsPage() {
  return (
    <Suspense>
      <ContactsTable />
    </Suspense>
  );
}
```

---

**The "View" menu does not list a column.**

The column is either missing an `accessorKey`/`accessorFn`, or it has `enableHiding: false`. Only columns with an accessor and `enableHiding` not set to `false` appear in the View menu. `id`-only columns like `actions` and `select` are always excluded.

---

**`isFetching` overlay flickers on fast connections.**

This is cosmetic and not a bug. The overlay has no minimum display time, so on fast connections it may flash briefly. If it is distracting, wrap the `isFetching` prop with a debounced boolean that only turns true after a short delay (e.g. 150 ms).

---

**TypeScript error: `Type 'string' is not assignable to type 'never'` in filterFn.**

Explicitly type the `value` parameter in your `filterFn`:

```
filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
//                          ^^^^^^^^ must be explicit
```

---

**TypeScript error: server-mode props are not accepted.**

Make sure you have `mode="server"` as a literal string on `<DataTable>`. The props `totalRows`, `isFetching`, `currentPage`, `onSearchChange`, etc. are only available on the `DataTableServerProps` branch of the discriminated union. Without `mode="server"`, TypeScript will report them as invalid props.

---

**The React Compiler shows a warning about `useReactTable`.**

This is a known, expected warning. TanStack Table's `useReactTable` returns functions that cannot be safely memoized by the React Compiler, so the compiler skips memoizing the `DataTable` component entirely. This does **not** affect correctness or performance in practice. No action is needed.

---

**Faceted filter counts are wrong or missing (client mode).**

The counts beside each filter option come from `getFacetedUniqueValues`. Both row models below must be present in `useReactTable`:

```
getFacetedRowModel:      getFacetedRowModel(),
getFacetedUniqueValues:  getFacetedUniqueValues(),
```

Both are already included in `DataTable.tsx`. In server mode, counts are intentionally not shown because only the current page is in memory.

---

**The Reset button does not clear the date range or async filter.**

Make sure `onReset={table.onReset}` is passed to `<DataTable mode="server">`. The Reset button calls `onReset` which clears the URL entirely (all params including `start_date`, `end_date`, and all filter keys). Without `onReset`, the button falls back to individual callbacks which do not clear the URL.

---

**The async filter shows no options or stale options.**

The `fetchOptions` function is called once on the first popover open and the result is cached in local component state. If options were added or removed on the server (e.g., a new category was created), the cached list will not reflect those changes until the component remounts. To force a refresh, change the `key` prop on the parent component, or manage the options cache externally.

---
