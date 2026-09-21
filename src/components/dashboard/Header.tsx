import { Logout, Search } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb/Breadcrumb';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu/DropdownMenu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip/Tooltip';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/Avatar';
import { ThemeToggle } from '@/components/global/theme-toggle/ThemeToggle';
import { useBreadcrumbs } from '@/stores/breadcrumbs/breadcrumbs.selectors';
import { useNavigationItems } from '@/constants/navigation.constants';
import { useAuthLogout, useAuthUser } from '@/stores/auth/auth.selectors';
import { SidebarTrigger } from '@/components/ui/sidebar/Sidebar';
import { useCmdOpen } from '@/stores/cmd/cmd.selectors';
import { Separator } from '@/components/ui/separator/Separator';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { Kbd } from '@/components/ui/kbd/Kbd';

export function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const navItems = useNavigationItems();
  const breadcrumbs = useBreadcrumbs();
  const navigate = useNavigate();
  const logout = useAuthLogout();
  const user = useAuthUser();
  const open = useCmdOpen();

  const displayName =
    (user?.user_metadata?.full_name as string) ||
    (user?.user_metadata?.name as string) ||
    user?.email ||
    'User';
  const displayAvatar =
    (user?.user_metadata?.avatar_url as string) ||
    (user?.user_metadata?.picture as string) ||
    undefined;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/', { replace: true });
      toast.success('Logged out successfully');
    } catch {
      toast.error('Failed to log out');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      open(searchTerm);
      setSearchTerm('');
    }
  };

  return (
    <header className="bg-background sticky top-0 z-50 flex h-12 shrink-0 items-center justify-between px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:rounded-t-full">
      {/* Sidebar Toggle & Breadcrumbs */}
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger />
          </TooltipTrigger>
          <TooltipContent>Toggle sidebar</TooltipContent>
        </Tooltip>
        <Separator orientation="vertical" />
        <div className="hidden items-center gap-2 md:flex">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((breadcrumb, index) => {
                if (breadcrumb.isPage) {
                  return (
                    <BreadcrumbPage
                      key={index}
                      className={breadcrumb.className}
                    >
                      {breadcrumb.label}
                    </BreadcrumbPage>
                  );
                } else if (breadcrumb.href) {
                  return (
                    <BreadcrumbItem
                      key={index}
                      className={breadcrumb.className}
                    >
                      <Link to={breadcrumb.href}>{breadcrumb.label}</Link>
                      <BreadcrumbSeparator />
                    </BreadcrumbItem>
                  );
                } else {
                  return (
                    <BreadcrumbItem
                      key={index}
                      className={breadcrumb.className}
                    >
                      {breadcrumb.label}
                      <BreadcrumbSeparator />
                    </BreadcrumbItem>
                  );
                }
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {/* Search - mobile icon */}
        <div className="md:hidden">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Search"
                onClick={() => open()}
              >
                <HugeiconsIcon icon={Search} className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Dashboard Spotlight</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Search - desktop */}
      <div className="hidden md:block">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative flex items-center">
              <HugeiconsIcon
                icon={Search}
                className="text-muted-foreground absolute left-3 h-4 w-4"
              />
              <form onSubmit={handleSearch}>
                <Input
                  placeholder="Search..."
                  className="pr-12 pl-9"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </form>
              <span className="pointer-events-none absolute right-2 flex items-center gap-1">
                <Kbd className="bg-muted text-muted-foreground">⌘ K</Kbd>
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>Dashboard Spotlight</TooltipContent>
        </Tooltip>
      </div>

      {/* Theme Toggle & Settings Dropdown */}
      <div className="flex items-center gap-1 md:gap-2">
        <ThemeToggle />

        <Separator orientation="vertical" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex cursor-pointer items-center rounded-lg p-0.5 outline-none">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="h-6 w-6 rounded-lg">
                    <AvatarImage src={displayAvatar} alt={displayName} />
                    <AvatarFallback className="rounded-lg">
                      {displayName[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>Profile</TooltipContent>
              </Tooltip>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            {/* Identity label */}
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="relative shrink-0">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={displayAvatar} alt={displayName} />
                    <AvatarFallback className="rounded-lg">
                      {displayName[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{displayName}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {navItems.map(group => (
              <div key={group.heading}>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>{group.heading}</DropdownMenuLabel>
                  {group.items.map(item => (
                    <DropdownMenuItem key={item.tab} onClick={item.onSelect}>
                      <HugeiconsIcon icon={item.icon} />
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </div>
            ))}

            <DropdownMenuItem onClick={handleLogout}>
              <HugeiconsIcon icon={Logout} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
