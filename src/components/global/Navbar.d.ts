import type { ReactNode } from 'react';

export interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: ReactNode;
  items?: MenuItem[];
}

export interface NavbarProps {
  className?: string;
}
