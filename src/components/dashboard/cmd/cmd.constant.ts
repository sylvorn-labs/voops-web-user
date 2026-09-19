import {
  ArrowRight01Icon,
  Coupon01Icon,
  CustomerSupportIcon,
  DashboardCircleIcon,
  DatabaseIcon,
  Layers01Icon,
  Mail01Icon,
  PinLocation01Icon,
  Settings02Icon,
  ShieldUserIcon,
  ShoppingBag01Icon,
  ShoppingBasket01Icon,
  StarIcon,
  Store01Icon,
  TruckDeliveryIcon,
  UserGroupIcon,
  Wallet01Icon,
  Analytics02Icon,
  SquareLock02Icon,
  Laptop,
  Moon,
  Sun,
} from '@hugeicons/core-free-icons';

import { useNavigate } from 'react-router';

import { useCmdClose } from '@/stores/cmd/cmd.selectors';
import { useSetTheme } from '@/stores/theme/theme.selectors';

import type { CommandGroup, CommandType } from './cmd';

export function useCommands(): CommandGroup[] {
  const setTheme = useSetTheme();
  const navigate = useNavigate();
  const close = useCmdClose();

  return [
    {
      heading: 'Navigation',
      items: [
        {
          label: 'Dashboard',
          icon: DashboardCircleIcon,
          onSelect: () => {
            navigate('/dashboard');
            close();
          },
        },
        {
          label: 'Products',
          icon: ShoppingBasket01Icon,
          onSelect: () => {
            navigate('/dashboard/products');
            close();
          },
        },
        {
          label: 'Categories',
          icon: Layers01Icon,
          onSelect: () => {
            navigate('/dashboard/categories');
            close();
          },
        },
        {
          label: 'Reviews',
          icon: StarIcon,
          onSelect: () => {
            navigate('/dashboard/reviews');
            close();
          },
        },
        {
          label: 'Contact Inquiries',
          icon: CustomerSupportIcon,
          onSelect: () => {
            navigate('/dashboard/contact-inquiries');
            close();
          },
        },
        {
          label: 'Coupons',
          icon: Coupon01Icon,
          onSelect: () => {
            navigate('/dashboard/coupons');
            close();
          },
        },
        {
          label: 'Orders',
          icon: ShoppingBag01Icon,
          onSelect: () => {
            navigate('/dashboard/orders');
            close();
          },
        },
        {
          label: 'Payments',
          icon: Wallet01Icon,
          onSelect: () => {
            navigate('/dashboard/payments');
            close();
          },
        },
        {
          label: 'Customers',
          icon: UserGroupIcon,
          onSelect: () => {
            navigate('/dashboard/users');
            close();
          },
        },
        {
          label: 'Admins',
          icon: ShieldUserIcon,
          onSelect: () => {
            navigate('/dashboard/admins');
            close();
          },
        },
        {
          label: 'Pickup Locations',
          icon: PinLocation01Icon,
          onSelect: () => {
            navigate('/dashboard/pickup-locations');
            close();
          },
        },
        {
          label: 'Stores',
          icon: Store01Icon,
          onSelect: () => {
            navigate('/dashboard/stores');
            close();
          },
        },
        {
          label: 'Analytics',
          icon: Analytics02Icon,
          onSelect: () => {
            navigate('/dashboard/analytics/sales');
            close();
          },
        },
        {
          label: 'Sales & Financials Analytics',
          icon: Analytics02Icon,
          onSelect: () => {
            navigate('/dashboard/analytics/sales');
            close();
          },
        },
        {
          label: 'Logistics & Fulfillment Analytics',
          icon: TruckDeliveryIcon,
          onSelect: () => {
            navigate('/dashboard/analytics/logistics');
            close();
          },
        },
        {
          label: 'Products & Inventory Analytics',
          icon: ShoppingBasket01Icon,
          onSelect: () => {
            navigate('/dashboard/analytics/products');
            close();
          },
        },
        {
          label: 'Customers & Discovery Analytics',
          icon: UserGroupIcon,
          onSelect: () => {
            navigate('/dashboard/analytics/customers');
            close();
          },
        },
        {
          label: 'Marketing & Retention Analytics',
          icon: Coupon01Icon,
          onSelect: () => {
            navigate('/dashboard/analytics/marketing');
            close();
          },
        },
      ],
    },
    {
      heading: 'Products',
      items: [
        {
          label: 'All Products',
          icon: ShoppingBasket01Icon,
          onSelect: () => {
            navigate('/dashboard/products');
            close();
          },
        },
        {
          label: 'Active Products',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/products?isActive=true');
            close();
          },
        },
        {
          label: 'Inactive Products',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/products?isActive=false');
            close();
          },
        },
        {
          label: 'Best Seller Products',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/products?isBestSeller=true');
            close();
          },
        },
        {
          label: 'New Arrival Products',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/products?isNewArrival=true');
            close();
          },
        },
        {
          label: 'Featured Products',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/products?isFeatured=true');
            close();
          },
        },
        {
          label: 'Archived Products',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/products?isDeleted=true');
            close();
          },
        },
      ],
    },
    {
      heading: 'Categories',
      items: [
        {
          label: 'All Categories',
          icon: Layers01Icon,
          onSelect: () => {
            navigate('/dashboard/categories');
            close();
          },
        },
        {
          label: 'Active Categories',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/categories?isActive=true');
            close();
          },
        },
        {
          label: 'Inactive Categories',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/categories?isActive=false');
            close();
          },
        },
        {
          label: 'Archived Categories',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/categories?isDeleted=true');
            close();
          },
        },
      ],
    },
    {
      heading: 'Reviews',
      items: [
        {
          label: 'All Reviews',
          icon: StarIcon,
          onSelect: () => {
            navigate('/dashboard/reviews');
            close();
          },
        },
        {
          label: 'Verified Reviews',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/reviews?isVerified=true');
            close();
          },
        },
        {
          label: 'Unverified Reviews',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/reviews?isVerified=false');
            close();
          },
        },
        {
          label: 'Archived Reviews',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/reviews?isDeleted=true');
            close();
          },
        },
      ],
    },
    {
      heading: 'Coupons',
      items: [
        {
          label: 'All Coupons',
          icon: Coupon01Icon,
          onSelect: () => {
            navigate('/dashboard/coupons');
            close();
          },
        },
        {
          label: 'Active Coupons',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/coupons?isActive=true');
            close();
          },
        },
        {
          label: 'Inactive Coupons',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/coupons?isActive=false');
            close();
          },
        },
        {
          label: 'Archived Coupons',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/coupons?isDeleted=true');
            close();
          },
        },
      ],
    },
    {
      heading: 'Pickup Locations',
      items: [
        {
          label: 'All Pickup Locations',
          icon: PinLocation01Icon,
          onSelect: () => {
            navigate('/dashboard/pickup-locations');
            close();
          },
        },
        {
          label: 'Active Pickup Locations',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/pickup-locations?isActive=true');
            close();
          },
        },
        {
          label: 'Inactive Pickup Locations',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/pickup-locations?isActive=false');
            close();
          },
        },
      ],
    },
    {
      heading: 'Stores',
      items: [
        {
          label: 'All Stores',
          icon: Store01Icon,
          onSelect: () => {
            navigate('/dashboard/stores');
            close();
          },
        },
        {
          label: 'Active Stores',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/stores?isActive=true');
            close();
          },
        },
        {
          label: 'Inactive Stores',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/stores?isActive=false');
            close();
          },
        },
        {
          label: 'Archived Stores',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/stores?isDeleted=true');
            close();
          },
        },
      ],
    },
    {
      heading: 'Customers',
      items: [
        {
          label: 'All Customers',
          icon: UserGroupIcon,
          onSelect: () => {
            navigate('/dashboard/users');
            close();
          },
        },
        {
          label: 'Banned Customers',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/users?banned=true');
            close();
          },
        },
        {
          label: 'Verified Customers',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/users?isVerified=true');
            close();
          },
        },
        {
          label: 'Unverified Customers',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/users?isVerified=false');
            close();
          },
        },
      ],
    },
    {
      heading: 'Admins',
      items: [
        {
          label: 'All Admins',
          icon: ShieldUserIcon,
          onSelect: () => {
            navigate('/dashboard/admins');
            close();
          },
        },
        {
          label: 'Super Admins',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/admins?isSuperAdmin=true');
            close();
          },
        },
        {
          label: 'Banned Admins',
          icon: ArrowRight01Icon,
          onSelect: () => {
            navigate('/dashboard/admins?banned=true');
            close();
          },
        },
      ],
    },
    {
      heading: 'Account',
      items: [
        {
          label: 'Account Overview',
          icon: UserGroupIcon,
          onSelect: () => {
            navigate('/dashboard/settings?tab=overview');
            close();
          },
        },
        {
          label: 'Profile Settings',
          icon: UserGroupIcon,
          onSelect: () => {
            navigate('/dashboard/settings?tab=profile');
            close();
          },
        },
        {
          label: 'Security Settings',
          icon: SquareLock02Icon,
          onSelect: () => {
            navigate('/dashboard/settings?tab=security');
            close();
          },
        },
        {
          label: 'Sessions',
          icon: Laptop,
          onSelect: () => {
            navigate('/dashboard/settings?tab=sessions');
            close();
          },
        },
      ],
    },
    {
      heading: 'System',
      items: [
        {
          label: 'System Settings',
          icon: Settings02Icon,
          onSelect: () => {
            navigate('/dashboard/system-settings');
            close();
          },
        },
        {
          label: 'Authentication Settings',
          icon: SquareLock02Icon,
          onSelect: () => {
            navigate('/dashboard/system-settings?tab=betterAuth');
            close();
          },
        },
        {
          label: 'SMTP Settings',
          icon: Mail01Icon,
          onSelect: () => {
            navigate('/dashboard/system-settings?tab=smtp');
            close();
          },
        },
        {
          label: 'Storage Settings',
          icon: DatabaseIcon,
          onSelect: () => {
            navigate('/dashboard/system-settings?tab=storage');
            close();
          },
        },
        {
          label: 'Razorpay Settings',
          icon: Wallet01Icon,
          onSelect: () => {
            navigate('/dashboard/system-settings?tab=razorpay');
            close();
          },
        },
        {
          label: 'Shiprocket Settings',
          icon: TruckDeliveryIcon,
          onSelect: () => {
            navigate('/dashboard/system-settings?tab=shiprocket');
            close();
          },
        },
      ],
    },
    {
      heading: 'Theme',
      items: [
        {
          label: 'Light',
          icon: Sun,
          onSelect: () => {
            setTheme('light');
            close();
          },
        },
        {
          label: 'Dark',
          icon: Moon,
          onSelect: () => {
            setTheme('dark');
            close();
          },
        },
        {
          label: 'System',
          icon: Laptop,
          onSelect: () => {
            setTheme('system');
            close();
          },
        },
      ],
    },
  ];
}

export function useFlatCommands(): CommandType[] {
  const COMMANDS = useCommands();

  return COMMANDS.flatMap(group => group.items);
}
