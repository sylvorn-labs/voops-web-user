export interface PlatformItem {
  title: string;
  subtitle: string;
  description: string;
  buttonText?: string;
  url?: string;
  badgeSrc?: string;
  badgeAlt?: string;
  statusText?: string;
}

export interface DownloadProps {
  id?: string;
  heading?: string;
  description?: string;
  platforms?: {
    desktop?: PlatformItem;
    ios?: PlatformItem;
    android?: PlatformItem;
  };
  className?: string;
}
