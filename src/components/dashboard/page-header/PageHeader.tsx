import type { PageHeaderProps } from './page-header.d';

export function PageHeader({ title, description, opposite }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {opposite}
    </div>
  );
}
