import { Outlet } from 'react-router';

import { KeyboardShortcuts } from '@/components/dashboard/kbd-shortcuts/KbdShortcuts';
import { CommandPalette } from '@/components/dashboard/cmd/CommandPalette';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar/Sidebar';
import { AppSideBar } from '@/components/dashboard/sidebar/AppSideBar';
import { GlobalSheet } from '@/components/dashboard/sheet/GlobalSheet';
import { Header } from '@/components/dashboard/Header';
import { AuthGuard } from '@/guards/AuthGuard';

export function DashboardLayout() {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSideBar />
        <SidebarInset>
          <Header />
          <div className="min-h-screen flex-1 md:min-h-min">
            <Outlet />
          </div>
          <KeyboardShortcuts />
          <CommandPalette />
          <GlobalSheet />
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
