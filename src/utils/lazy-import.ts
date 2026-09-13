import type { ComponentType } from 'react';
import { lazy } from 'react';

type ComponentPropsOf<C> = C extends ComponentType<infer P> ? P : never;

export function lazyImport<
  TModule extends object,
  TExport extends keyof TModule,
>({
  importer,
  exportName,
}: {
  importer: () => Promise<TModule>;
  exportName: TExport;
}) {
  return lazy(async () => {
    const module = await importer();

    return {
      default: module[exportName] as ComponentType<
        ComponentPropsOf<TModule[TExport]>
      >,
    };
  });
}
