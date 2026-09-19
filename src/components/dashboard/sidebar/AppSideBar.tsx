import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar/Sidebar';

import { AppSidebarContent } from './AppSideBarContent';
import { AppSideBarHeader } from './AppSideBarHeader';
import { AppSidebarFooter } from './AppSideBarFooter';

export function AppSideBar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <AppSideBarHeader />
      </SidebarHeader>
      <SidebarContent>
        <AppSidebarContent />
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
