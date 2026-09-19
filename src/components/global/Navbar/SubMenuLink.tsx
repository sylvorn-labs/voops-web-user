import { Link } from 'react-router';

import type { SubMenuLinkProps } from './SubMenuLink.d';

export function SubMenuLink({ item }: SubMenuLinkProps) {
  const isInternal = item.url.startsWith('/') && !item.url.startsWith('/#');

  const content = (
    <>
      <div className="text-primary mt-0.5">{item.icon}</div>
      <div>
        <div className="text-sm leading-none font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-muted-foreground mt-1 line-clamp-2 text-xs leading-snug">
            {item.description}
          </p>
        )}
      </div>
    </>
  );

  return isInternal ? (
    <Link
      className="hover:bg-muted hover:text-accent-foreground flex flex-row items-start gap-3 rounded-md p-2.5 leading-none no-underline transition-colors outline-none select-none"
      to={item.url}
    >
      {content}
    </Link>
  ) : (
    <a
      className="hover:bg-muted hover:text-accent-foreground flex flex-row items-start gap-3 rounded-md p-2.5 leading-none no-underline transition-colors outline-none select-none"
      href={item.url}
    >
      {content}
    </a>
  );
}
