import { Link } from 'react-router';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion/Accordion';
import type { NavMobileMenuItemProps } from './nav-mobile-menu-item.d';
import { SubMenuLink } from './SubMenuLink';

export function NavMobileMenuItem({ item }: NavMobileMenuItemProps) {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2 space-y-1">
          {item.items.map(subItem => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  const isInternal = item.url.startsWith('/') && !item.url.startsWith('/#');

  return isInternal ? (
    <Link key={item.title} to={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  ) : (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
}
