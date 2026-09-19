import { Link } from 'react-router';
import { Menu } from 'lucide-react';
import { SparklesIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from 'cn';

import {
  useAuthIsAuthenticated,
  useAuthLogout,
} from '@/stores/auth/auth.selectors';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/global/ThemeToggle';
import { defaultMenuItems } from './Navbar.constants';
import type { NavbarProps } from './Navbar.d';
import { NavMenuItem } from './NavMenuItem';
import { NavMobileMenuItem } from './NavMobileMenuItem';

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
                  {defaultMenuItems.map(item => (
                    <NavMenuItem key={item.title} item={item} />
                  ))}
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
                      {defaultMenuItems.map(item => (
                        <NavMobileMenuItem key={item.title} item={item} />
                      ))}
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
