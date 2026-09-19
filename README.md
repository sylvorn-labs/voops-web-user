# Voops Web User

> Modern, high-performance web client application for **Voops** — built with React 19, Vite, TypeScript, Tailwind CSS v4, Zustand, and Supabase.

---

## 📖 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Design Patterns & Code Standards](#design-patterns--code-standards)
  - [Component Architecture](#component-architecture)
  - [State Management (Zustand)](#state-management-zustand)
  - [Routing & Lazy Loading](#routing--lazy-loading)
  - [Form Handling & Validation](#form-handling--validation)
  - [Styling & Theming (Tailwind v4)](#styling--theming-tailwind-v4)
  - [Icon Systems](#icon-systems)
  - [Build & Bundle Optimization](#build--bundle-optimization)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Development Server](#development-server)
  - [Production Build & Preview](#production-build--preview)
- [Available Scripts](#available-scripts)
- [Contributing Guidelines](#contributing-guidelines)

---

## 🌟 Overview

`voops-web-user` is the user-facing web application for Voops. It provides landing pages, authentication flows (sign up, sign in, email verification, password reset), resource centers (docs, changelog, blog, roadmap), and business analytics/feature presentations.

---

## ⚡ Tech Stack

| Category                 | Technology                                                                                  | Purpose                                                         |
| :----------------------- | :------------------------------------------------------------------------------------------ | :-------------------------------------------------------------- |
| **Framework & Runtime**  | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) (~6.0)        | Core UI runtime and type-safe development                       |
| **Build Tool & Bundler** | [Vite 8](https://vite.dev/)                                                                 | Ultra-fast HMR and optimized production bundling                |
| **Package Manager**      | [Bun](https://bun.sh/)                                                                      | Fast dependency resolution and script runner                    |
| **Styling & CSS**        | [Tailwind CSS v4](https://tailwindcss.com/), `tw-animate-css`                               | Atomic CSS with CSS theme variables & OKLCH color mixing        |
| **UI Components**        | [Radix UI](https://www.radix-ui.com/), [shadcn/ui](https://ui.shadcn.com/) (Radix Vega)     | Accessible, unstyled primitives with custom design tokens       |
| **State Management**     | [Zustand 5](https://zustand-demo.pmnd.rs/)                                                  | Lightweight global stores with granular selector pattern        |
| **Data Fetching**        | [TanStack Query v5](https://tanstack.com/query/latest), [Axios](https://axios-http.com/)    | Server state caching, background refetching, HTTP requests      |
| **Backend & Auth**       | [Supabase Client](https://supabase.com/docs/reference/javascript) (`@supabase/supabase-js`) | Authentication and backend API integration                      |
| **Routing**              | [React Router v8](https://reactrouter.com/)                                                 | Declarative client-side routing with route-level code splitting |
| **Forms & Validation**   | [React Hook Form](https://react-hook-form.com/), [Zod 4](https://zod.dev/)                  | High-performance uncontrolled forms with schema validation      |
| **Iconography**          | [Hugeicons](https://hugeicons.com/), [Lucide](https://lucide.dev/), `@thesvg/react`         | Primary scalable stroke icons and auxiliary vector assets       |
| **Animations**           | [Motion](https://motion.dev/)                                                               | Smooth transitions and declarative UI animations                |
| **Code Quality**         | [ESLint](https://eslint.org/) (Flat Config), [Prettier](https://prettier.io/)               | Linting, React Hooks rules, Tailwind class sorting              |

---

## 🏗️ Project Architecture

```
voops-web-user/
├── public/                 # Static assets (favicons, public images)
├── src/
│   ├── api/                # API client definitions and endpoints
│   ├── components/         # Reusable UI component modules
│   │   ├── auth/           # Auth-specific shared components (e.g. AuthBrandLogo, AuthSocialButtons)
│   │   ├── global/         # Global widgets (Navbar, Footer, Faq, Gallery, Download, etc.)
│   │   └── ui/             # Shadcn / Radix primitives (Button, Input, Form, Card, Sheet, etc.)
│   ├── configs/            # Application runtime configuration and env mappings
│   ├── layouts/            # Page layout wrappers (MainLayout, AuthLayout, ResourceLayout)
│   ├── lib/                # Shared singletons and utility modules (Supabase client, cn helper)
│   ├── pages/              # Route-level pages (Home, Login, Register, Features, Pricing, etc.)
│   ├── providers/          # Top-level React context providers (QueryClientProvider, Router)
│   ├── stores/             # Zustand stores separated by domain (e.g. auth store, theme store)
│   ├── types/              # Ambient type declarations (e.g. vite-env.d.ts)
│   ├── utils/              # Generic utility helpers (e.g. lazyImport)
│   ├── App.tsx             # Root component wrapped in providers
│   ├── Router.tsx          # Central application routing configuration
│   ├── index.css           # Tailwind v4 theme definitions and font faces
│   └── main.tsx            # Application entry point
├── components.json         # Shadcn UI configuration (Radix Vega, Hugeicons)
├── eslint.config.js        # ESLint flat configuration
├── prettier.config.ts      # Prettier formatting rules with Tailwind plugin
├── tsconfig.app.json       # TypeScript configuration for application code
├── vendor-groups.ts        # Manual chunk definitions for Vite rollup output
└── vite.config.ts          # Vite build and plugin setup
```

---

## 📐 Design Patterns & Code Standards

### Component Architecture

Every component and feature is organized into a dedicated folder using the **Component Triad/Quad pattern**:

```
my-feature/
├── MyFeature.tsx             # Main component implementation (PascalCase)
├── my-feature.d.ts           # Type definitions, interfaces, and prop types
├── my-feature.constants.ts   # (Optional) Static data, variant maps, menu items
└── my-feature.schema.ts      # (Optional) Zod validation schemas for forms
```

#### Naming Conventions:

- **Folders**: `kebab-case` (e.g., `theme-toggle`, `features-matrix`, `forgot-password`).
- **React Components**: `PascalCase.tsx` (e.g., `ThemeToggle.tsx`, `FeaturesMatrix.tsx`).
- **Type Definitions**: `kebab-case.d.ts` (e.g., `theme-toggle.d.ts`).
- **Constants**: `kebab-case.constants.ts` / `.tsx`.
- **Zod Schemas**: `kebab-case.schema.ts`.

---

### State Management (Zustand)

Global state is organized by feature domain under `src/stores/[domain]/` using an **Atomic Selector Pattern**:

```
src/stores/auth/
├── auth.d.ts            # State & Actions type definitions
├── auth.store.ts        # Store creation with `create<AuthStore>()`
└── auth.selectors.ts    # Granular selector hooks
```

#### Rules for Zustand:

1. **Never** access multiple unrelated properties directly from `useAuthStore()` inside rendering components.
2. **Always** consume state through exported atomic selector hooks (e.g., `useAuthUser()`, `useAuthIsAuthenticated()`). This prevents unnecessary re-renders.

```tsx
// ✅ Correct - Granular selector prevents re-rendering on session token changes
import { useAuthUser } from '@/stores/auth/auth.selectors';

export function UserAvatar() {
  const user = useAuthUser();
  return <span>{user?.email}</span>;
}
```

---

### Routing & Lazy Loading

- Route definitions are managed in [`src/Router.tsx`](src/Router.tsx).
- All pages are code-split using the custom [`lazyImport`](src/utils/lazy-import.ts) utility to support named exports:

```tsx
const LoginPage = lazyImport({
  importer: () => import('@/pages/login/Page'),
  exportName: 'LoginPage',
});
```

- Each page module lives in `src/pages/[route-name]/Page.tsx` and exports a named component (e.g., `export function LoginPage()`).

---

### Form Handling & Validation

Forms utilize **React Hook Form** together with **Zod** schemas:

1. Define schema in `[form-name].schema.ts`.
2. Infer TypeScript types in `[form-name].d.ts` using `z.infer<typeof schema>`.
3. Connect with `zodResolver(schema)` inside the component.

```tsx
// login-form.schema.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});
```

---

### Styling & Theming (Tailwind v4)

This project uses **Tailwind CSS v4** with `@theme inline` in [`src/index.css`](src/index.css):

- No legacy `tailwind.config.js` is used.
- Dark mode is activated using class-based strategy (`.dark`).
- Design tokens include standard shadcn variables plus Voops brand tokens:
  - `--color-brand-1` through `--color-brand-10`
  - `--color-income`, `--color-expense`, `--color-balance`
  - `--color-warning`, `--color-info`
- Always use the `cn()` utility (`import { cn } from 'cn'` or `@/lib/utils`) for conditional classes.

---

### Icon Systems

- **Primary Icon Library**: `@hugeicons/react` with `@hugeicons/core-free-icons`.
  ```tsx
  import { HugeiconsIcon } from '@hugeicons/react';
  import { AlertCircleIcon } from '@hugeicons/core-free-icons';

  <HugeiconsIcon icon={AlertCircleIcon} className="size-5" />;
  ```
- **Utility / Supplementary Icons**: `lucide-react`, `react-icons`, `@thesvg/react`.

---

### Build & Bundle Optimization

Production chunks are manually organized in [`vendor-groups.ts`](vendor-groups.ts) via Vite's `rollupOptions.output.manualChunks`:

- `ui-vendor`: Radix UI, CVA, cmdk, Sonner
- `react-vendor`: React, React-DOM, React Router, Scheduler
- `query-vendor`: TanStack React Query
- `form-vendor`: React Hook Form, Resolvers, Input OTP
- `icon-vendor`: Hugeicons
- `supabase-vendor`: Supabase JS client
- `state-vendor`: Zustand

---

## 🚀 Getting Started

### Prerequisites

- **Bun** (version 1.0+ recommended) or **Node.js** (v20+ with npm / pnpm)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/sylvorn-labs/voops-web-user.git
cd voops-web-user
bun install
```

### Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Configure your environment variables:

```env
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your-supabase-publishable-anon-key"
```

### Development Server

Start the local development server with HMR:

```bash
bun run dev
```

The application will be accessible at `http://localhost:5173`.

### Production Build & Preview

To run type checking and create an optimized production build:

```bash
bun run build
```

To preview the production build locally:

```bash
bun run preview
```

---

## 🛠️ Available Scripts

| Command           | Description                                                                        |
| :---------------- | :--------------------------------------------------------------------------------- |
| `bun run dev`     | Runs the Vite development server with Hot Module Replacement (HMR)                 |
| `bun run build`   | Performs TypeScript compilation (`tsc -b`) and bundles production assets with Vite |
| `bun run lint`    | Runs ESLint across all TypeScript and TSX files                                    |
| `bun run format`  | Runs Prettier with the Tailwind CSS class-sorting plugin                           |
| `bun run preview` | Spins up a local static server to preview the `dist/` build output                 |

---

## 🤝 Contributing Guidelines

1. **Path Aliases**: Always use `@/...` to reference files inside `src/`.
2. **Type Safety**: Maintain strict TypeScript typing. Do not use `any`. Type-only imports must use `import type { ... }`.
3. **Component Modularity**: Follow the triad folder structure (`Component.tsx`, `component.d.ts`, `component.constants.ts`).
4. **Code Quality**: Run `bun run lint` and `bun run format` before submitting PRs.
