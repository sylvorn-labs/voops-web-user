import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  BuildingIcon,
  CheckmarkCircle01Icon,
  ChevronsUpDown,
  Plus,
} from '@hugeicons/core-free-icons';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/DropdownMenu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar/Sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar/Avatar';
import { listBusinessesOptions } from '@/hooks/api/business.hook';
import {
  useActiveBusinessId,
  useSetActiveBusinessId,
} from '@/stores/business/business.selectors';

export function AppSideBarHeader() {
  const { data, isLoading } = useQuery(listBusinessesOptions());
  const { isMobile } = useSidebar();
  const navigate = useNavigate();

  const businessId = useActiveBusinessId();
  const setActiveBusinessId = useSetActiveBusinessId();

  const businesses = useMemo(
    () => data?.data?.items ?? [],
    [data?.data?.items],
  );

  // Auto-select first business if none is selected and businesses exist
  useEffect(() => {
    if (!businessId && businesses.length > 0) {
      setActiveBusinessId(businesses[0].id);
    }
  }, [businessId, businesses, setActiveBusinessId]);

  const selectedBusiness = useMemo(() => {
    if (isLoading || !businesses.length) return null;
    return businesses.find(b => b.id === businessId) ?? businesses[0] ?? null;
  }, [businesses, businessId, isLoading]);

  const handleSelectBusiness = (id: string) => {
    setActiveBusinessId(id);
  };

  const handleAddBusiness = () => {
    navigate('/dashboard/businesses/create');
  };

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
                <Avatar>
                  <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground rounded-lg font-semibold">
                    {selectedBusiness ? (
                      selectedBusiness.name.slice(0, 2).toUpperCase()
                    ) : (
                      <HugeiconsIcon icon={BuildingIcon} size={18} />
                    )}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {selectedBusiness?.name ?? 'No Business Selected'}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {selectedBusiness
                    ? selectedBusiness.currency_code || 'Active Business'
                    : 'Select a business'}
                </span>
              </div>
              <HugeiconsIcon icon={ChevronsUpDown} className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Businesses
            </DropdownMenuLabel>
            {businesses.map(business => (
              <DropdownMenuItem
                key={business.id}
                className="cursor-pointer gap-2 p-2"
                onClick={() => handleSelectBusiness(business.id)}
              >
                <span className="flex items-center gap-2 truncate">
                  {business.name}
                </span>
                {business.id === (selectedBusiness?.id ?? businessId) && (
                  <HugeiconsIcon
                    icon={CheckmarkCircle01Icon}
                    size={16}
                    className="text-primary ml-auto"
                  />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer gap-2 p-2"
              onClick={handleAddBusiness}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <HugeiconsIcon icon={Plus} size={16} />
              </div>
              <div className="text-muted-foreground font-medium">
                Add Business
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
