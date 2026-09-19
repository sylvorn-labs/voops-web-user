import { Link } from 'react-router';

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu/NavigationMenu';
import type { NavMenuItemProps } from './nav-menu-item.d';
import { SubMenuLink } from './SubMenuLink';

export function NavMenuItem({ item }: NavMenuItemProps) {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground min-w-[340px] md:min-w-[500px]">
          <div className="grid grid-cols-1 gap-1 p-2 md:grid-cols-2">
            {item.items.map(subItem => (
              <NavigationMenuLink asChild key={subItem.title}>
                <SubMenuLink item={subItem} />
              </NavigationMenuLink>
            ))}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  const isInternal = item.url.startsWith('/') && !item.url.startsWith('/#');

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild>
        {isInternal ? (
          <Link
            to={item.url}
            className="hover:bg-muted hover:text-accent-foreground bg-background group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            {item.title}
          </Link>
        ) : (
          <a
            href={item.url}
            className="hover:bg-muted hover:text-accent-foreground bg-background group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            {item.title}
          </a>
        )}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
