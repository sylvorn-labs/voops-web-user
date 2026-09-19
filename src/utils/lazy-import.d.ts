import type { ComponentType } from 'react';

export type ComponentPropsOf<C> = C extends ComponentType<infer P> ? P : never;

export interface LazyImportOptions<
  TModule extends object,
  TExport extends keyof TModule,
> {
  importer: () => Promise<TModule>;
  exportName: TExport;
}
