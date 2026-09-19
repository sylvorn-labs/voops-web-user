import { Link } from 'react-router';
import { Menu } from 'lucide-react';
import {
  Building03Icon,
  Folder02Icon,
  SparklesIcon,
  Tag01Icon,
  UserGroupIcon,
  UserIcon,
  Wallet02Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from 'cn';

import {
  useAuthIsAuthenticated,
  useAuthLogout,
} from '@/stores/auth/auth.selectors';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/global/ThemeToggle';

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  className?: string;
}

const defaultMenuItems: MenuItem[] = [
  { title: 'Home', url: '/' },
  { title: 'About', url: '/about' },
  {
    title: 'Features',
    url: '/features',
    items: [
      {
        title: 'Multi-Business',
        description: 'Single user, manage multiple businesses seamlessly',
        icon: (
          <HugeiconsIcon icon={Building03Icon} className="size-5 shrink-0" />
        ),
        url: '/features',
      },
      {
        title: 'Team Collaboration',
        description: 'Single business, multiple members and role permissions',
        icon: (
          <HugeiconsIcon icon={UserGroupIcon} className="size-5 shrink-0" />
        ),
        url: '/features',
      },
      {
        title: 'Account Analytics',
        description:
          'Single business, multiple accounts for financial analysis',
        icon: <HugeiconsIcon icon={Wallet02Icon} className="size-5 shrink-0" />,
        url: '/features',
      },
      {
        title: 'Category Organization',
        description:
          'Single business, multiple categories for organized transactions',
        icon: <HugeiconsIcon icon={Tag01Icon} className="size-5 shrink-0" />,
        url: '/features',
      },
      {
        title: 'Project Analytics',
        description:
          'Single business, multiple projects with start/end dates & P&L',
        icon: <HugeiconsIcon icon={Folder02Icon} className="size-5 shrink-0" />,
        url: '/features',
      },
      {
        title: 'People Analytics',
        description:
          'Single business, multiple people for person-level analytics',
        icon: <HugeiconsIcon icon={UserIcon} className="size-5 shrink-0" />,
        url: '/features',
      },
    ],
  },
  { title: 'Pricing', url: '/pricing' },
  { title: 'Contact', url: '/contact' },
];

export function Navbar({ className }: NavbarProps) {
  const isAuthenticated = useAuthIsAuthenticated();
  const logout = useAuthLogout();

  return (
    <section className={cn('py-4', className)}>
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-lg shadow-xs">
                <HugeiconsIcon icon={SparklesIcon} className="size-4" />
              </div>
              <span className="text-lg font-bold tracking-tight">Voops</span>
            </Link>

            {/* Menu Items */}
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {defaultMenuItems.map(item => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Desktop Auth Buttons & Theme Toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <Button variant="outline" size="sm" onClick={() => logout()}>
                  Log Out
                </Button>
                <Button size="sm" asChild>
                  <Link to="/">Dashboard</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">Start Now</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-lg shadow-xs">
                <HugeiconsIcon icon={SparklesIcon} className="size-4" />
              </div>
              <span className="text-lg font-bold tracking-tight">Voops</span>
            </Link>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              {/* Mobile Sheet Trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <Link to="/" className="flex items-center gap-2.5">
                        <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-lg shadow-xs">
                          <HugeiconsIcon
                            icon={SparklesIcon}
                            className="size-4"
                          />
                        </div>
                        <span className="text-lg font-bold tracking-tight">
                          Voops
                        </span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-6 p-4">
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col gap-4"
                    >
                      {defaultMenuItems.map(item => renderMobileMenuItem(item))}
                    </Accordion>

                    <div className="flex flex-col gap-3 pt-4">
                      {isAuthenticated ? (
                        <>
                          <Button
                            variant="outline"
                            onClick={() => logout()}
                            className="w-full"
                          >
                            Log Out
                          </Button>
                          <Button asChild className="w-full">
                            <Link to="/">Dashboard</Link>
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button asChild variant="outline" className="w-full">
                            <Link to="/login">Login</Link>
                          </Button>
                          <Button asChild className="w-full">
                            <Link to="/register">Start Now</Link>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const renderMenuItem = (item: MenuItem) => {
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
};

const renderMobileMenuItem = (item: MenuItem) => {
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
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
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
};
