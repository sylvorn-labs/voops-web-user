import type { ComponentType } from 'react';
import { lazy } from 'react';

import type {
  ComponentPropsOf,
  LazyImportOptions,
} from './lazy-import.d';

export function lazyImport<
  TModule extends object,
  TExport extends keyof TModule,
>({ importer, exportName }: LazyImportOptions<TModule, TExport>) {
  return lazy(async () => {
    const module = await importer();

    return {
      default: module[exportName] as ComponentType<
        ComponentPropsOf<TModule[TExport]>
      >,
    };
  });
}
