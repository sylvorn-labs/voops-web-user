import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs/Tabs';
import { PageHeader } from '@/components/dashboard/page-header/PageHeader';

import type { DetailsLayoutProps } from './types';
import { useUrlTabs } from './useUrlTabs';

export function DetailsLayout({
  header,
  defaultTab,
  tabs,
  children,
}: DetailsLayoutProps) {
  const { activeTab, setActiveTab } = useUrlTabs(
    tabs.map(t => t.value),
    defaultTab,
  );

  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <PageHeader {...header} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        <TabsList variant="default">
          {tabs.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex min-h-0 flex-1 flex-col pt-4">
          {tabs.map(tab => (
            <TabsContent key={tab.value} value={tab.value}>
              {tab.content}
            </TabsContent>
          ))}
        </div>
      </Tabs>

      {children}
    </div>
  );
}
