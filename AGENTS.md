# AGENTS.md

> **AI Coding Agent Directives & Operational Regulations**
> This document defines strict rules, conventions, architectural patterns, and prohibitions for AI agents working within `voops-web-user`.

---

## 🤖 1. Agent Role & Persona

- You are operating as an expert React 19, TypeScript, and Tailwind CSS v4 engineer.
- You must write modular, maintainable, fully type-safe, and self-contained code.
- Always maintain existing conventions without introducing ad-hoc or divergent patterns.
- Do not add unnecessary comments, redundant documentation, or boilerplate unless explicitly required.

---

## 📁 2. File Organization & Naming Conventions

### Component Folder Structure

Every component (UI primitive, global component, layout, or page subcomponent) **MUST** reside in its own folder and strictly adhere to the following naming pattern:

```
[kebab-case-name]/
├── [PascalCaseName].tsx             # Component JSX implementation
├── [kebab-case-name].d.ts          # TypeScript interfaces and prop types
├── [kebab-case-name].constants.ts  # (Optional) Static arrays, maps, variant definitions
└── [kebab-case-name].schema.ts     # (Optional) Zod validation schemas
```

#### Examples:

- Folder: `src/components/global/features-matrix/`
  - Implementation: `FeaturesMatrix.tsx`
  - Types: `features-matrix.d.ts`
  - Constants: `features-matrix.constants.ts`
- Folder: `src/pages/login/components/login-form/`
  - Implementation: `LoginForm.tsx`
  - Types: `login-form.d.ts`
  - Schema: `login-form.schema.ts`

### Page Route Structure

- Pages reside in `src/pages/[route-name]/`.
- The main page entry point is always `Page.tsx` exporting a named function matching `[Name]Page` (e.g., `export function LoginPage()`).
- Nested subcomponents belonging exclusively to that page go in `src/pages/[route-name]/components/[component-name]/`.

### Route Registration

- All routes must be registered in `src/Router.tsx`.
- All page components must be lazy-loaded using the `lazyImport` helper:
  ```tsx
  const FeaturePage = lazyImport({
    importer: () => import('@/pages/features/feature/Page'),
    exportName: 'FeaturePage',
  });
  ```

---

## 🧠 3. State Management Directives (Zustand)

Global stores live under `src/stores/[domain]/` and must follow the 3-file pattern:

```
src/stores/[domain]/
├── [domain].d.ts         # Types: State, Actions, Store
├── [domain].store.ts     # Zustand store instance created with create<T>()
└── [domain].selectors.ts # Atomic custom hooks for individual state slices
```

### Store Implementation Rules:

1. **Never** import or call the raw store hook `use[Domain]Store` directly inside UI components.
2. **Always** create and export individual selector hooks in `[domain].selectors.ts`:
   ```tsx
   // auth.selectors.ts
   import { useAuthStore } from './auth.store';

   export const useAuthUser = () => useAuthStore(state => state.user);
   export const useAuthIsAuthenticated = () =>
     useAuthStore(state => state.isAuthenticated);
   export const useAuthLogout = () => useAuthStore(state => state.logout);
   ```
3. UI components must only consume these atomic selectors to minimize unnecessary re-renders.

---

## 🛡️ 4. TypeScript & Import Rules

### Strict Module Syntax (`verbatimModuleSyntax`)

`tsconfig.app.json` has `verbatimModuleSyntax: true` and `erasableSyntaxOnly: true`.

- **MANDATORY**: Type imports must always use `import type { ... }`:
  ```tsx
  // ✅ Correct
  import type { ReactNode } from 'react';
  import type { ButtonProps } from './button.d';

  // ❌ INCORRECT (Will trigger compilation/bundling error)
  import { ReactNode } from 'react';
  ```

### Path Aliases

- **MANDATORY**: Always use `@/` alias for internal imports:
  ```tsx
  // ✅ Correct
  import { supabase } from '@/lib/supabase';
  import { Button } from '@/components/ui/button/Button';

  // ❌ INCORRECT (Avoid relative traversal to parent src directories)
  import { Button } from '../../../components/ui/button/Button';
  ```
- Relative imports (`./...`) are **only** permitted for files within the exact same component folder or immediate sibling subcomponent.

---

## 🎨 5. Styling, Theming & UI Directives

### Tailwind CSS v4 System

- **NO `tailwind.config.js`**: All styling is driven by `@theme inline` in `src/index.css`.
- **Semantic Colors**: Use semantic token classes rather than arbitrary colors:
  - `bg-background`, `text-foreground`, `text-muted-foreground`
  - `bg-primary text-primary-foreground`
  - `bg-secondary text-secondary-foreground`
  - `text-income`, `text-expense`, `text-balance`
  - `border-border`, `ring-ring`
- **Class Merging**: Always use the `cn(...)` utility helper when concatenating classes or applying conditional variants.
- **Dark Mode**: Supports `.dark` class targeting with `@custom-variant dark (&:is(.dark *));`.

### UI Component Guidelines (Radix / CVA)

- UI primitives live in `src/components/ui/[primitive-name]/`.
- Use `class-variance-authority` (`cva`) for variants defined in `[primitive-name].constants.ts`.
- Use `data-slot` attributes on elements (e.g. `data-slot="button"`, `data-slot="input"`).
- Support polymorphic rendering via Radix `Slot.Root` with the `asChild` boolean prop where applicable.

---

## 📝 6. Forms & Validation Directives

When building forms:

1. Define the Zod schema in `[form-name].schema.ts`.
2. Infer types using `z.infer<typeof formSchema>` in `[form-name].d.ts`.
3. Use `react-hook-form` with `zodResolver(formSchema)` from `@hookform/resolvers/zod`.
4. Wrap inputs using the UI Form components from `@/components/ui/form/Form`:
   - `<Form {...form}>`
   - `<FormField control={form.control} name="..." render={({ field }) => ( ... )} />`
   - `<FormItem>`, `<FormLabel>`, `<FormControl>`, `<FormMessage>`

---

## 🖼️ 7. Icon Usage Directives

- **Primary Icon Set**: Use Hugeicons:
  ```tsx
  import { HugeiconsIcon } from '@hugeicons/react';
  import { ArrowRight01Icon } from '@hugeicons/core-free-icons';

  <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />;
  ```
- **Fallback / Secondary Icon Set**: Use `lucide-react` for system/theme indicators (e.g. `Sun`, `Moon`) or `react-icons` when specific brand logos are required.

---

## 🚫 8. Strict Prohibitions & Anti-Patterns

1. **DO NOT** create single monolithic files containing component JSX, type interfaces, constants, and schemas together. Always separate them into the folder pattern.
2. **DO NOT** use `any` or `unknown` without explicit narrowing.
3. **DO NOT** import raw Zustand stores inside components; use selectors from `*.selectors.ts`.
4. **DO NOT** use default exports for components or utilities (except for route lazy-import adapters where default export is constructed inside the utility). All components must use **named exports** (`export function Component()`).
5. **DO NOT** introduce inline style attributes unless calculating dynamic runtime coordinates.
6. **DO NOT** add new external dependencies without checking if an existing package in `package.json` already fulfills the requirement.
7. **DO NOT** mutate or recreate `vendor-groups.ts` unless adding a new major vendor bundle that requires manual chunking.

---

## ✅ 9. Agent Pre-Completion Checklist

Before reporting any task as completed, verify the following:

- [ ] Every new component has a matching `[component].d.ts` file.
- [ ] All types are imported with `import type { ... }`.
- [ ] All internal imports use `@/...` path alias.
- [ ] No ESLint violations (`bun run lint`).
- [ ] TypeScript compilation passes (`bun run build`).
- [ ] Code formatting complies with Prettier (`bun run format`).
