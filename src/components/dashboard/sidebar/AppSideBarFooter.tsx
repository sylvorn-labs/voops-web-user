import { ChevronsUpDown, Logout } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/DropdownMenu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar/Sidebar';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/Avatar';
import {
  useAuthLogout,
  useAuthSession,
  useAuthUser,
} from '@/stores/auth/auth.selectors';
import { useNavigationItems } from '@/constants/navigation.constants';

export function AppSidebarFooter() {
  const navItems = useNavigationItems();
  const { isMobile } = useSidebar();
  const session = useAuthSession();
  const navigate = useNavigate();
  const user = useAuthUser();
  const logout = useAuthLogout();

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
      navigate('/login', { replace: true });
      toast.success('Logged out successfully');
    } catch {
      toast.error('Failed to log out');
    }
  };

  if (!user || !session) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="relative">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={displayAvatar} alt={displayName} />
                  <AvatarFallback className="rounded-lg">
                    {displayName[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{displayName}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <HugeiconsIcon
                icon={ChevronsUpDown}
                className="ml-auto shrink-0"
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
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
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {navItems.map(group => (
              <DropdownMenuGroup key={group.heading}>
                <DropdownMenuLabel>{group.heading}</DropdownMenuLabel>
                {group.items.map(item => (
                  <DropdownMenuItem key={item.tab} onClick={item.onSelect}>
                    <HugeiconsIcon icon={item.icon} />
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogout}>
              <HugeiconsIcon icon={Logout} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
