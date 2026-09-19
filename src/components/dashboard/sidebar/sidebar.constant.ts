import {
  Coupon01Icon,
  CustomerSupportIcon,
  DashboardCircleIcon,
  Layers01Icon,
  PinLocation01Icon,
  Settings02Icon,
  ShieldUserIcon,
  ShoppingBag01Icon,
  ShoppingBasket01Icon,
  StarIcon,
  Store01Icon,
  UserGroupIcon,
  Wallet01Icon,
} from '@hugeicons/core-free-icons';

import type { SidebarMenuGroup } from './sidebar';

export const BASE = '/dashboard';

export const SIDEBAR_MENU_GROUPS: SidebarMenuGroup[] = [
  {
    label: 'General',
    items: [
      {
        name: 'Dashboard',
        tooltip: 'View dashboard',
        route: `${BASE}`,
        hugeicon: DashboardCircleIcon,
        items: [
          { name: 'Overview', route: `${BASE}` },
          {
            name: 'Sales & Financials',
            route: `${BASE}/analytics/sales`,
          },
          {
            name: 'Logistics & Fulfillment',
            route: `${BASE}/analytics/logistics`,
          },
          {
            name: 'Products & Inventory',
            route: `${BASE}/analytics/products`,
          },
          {
            name: 'Customers & Discovery',
            route: `${BASE}/analytics/customers`,
          },
          {
            name: 'Marketing & Retention',
            route: `${BASE}/analytics/marketing`,
          },
        ],
      },
    ],
  },
  {
    label: 'Catalog',
    items: [
      {
        name: 'Products',
        tooltip: 'Manage products',
        route: `${BASE}/products`,
        hugeicon: ShoppingBasket01Icon,
        items: [
          { name: 'All', route: `${BASE}/products` },
          { name: 'Active', route: `${BASE}/products?isActive=true` },
          { name: 'Inactive', route: `${BASE}/products?isActive=false` },
          { name: 'Best Sellers', route: `${BASE}/products?isBestSeller=true` },
          { name: 'Featured', route: `${BASE}/products?isFeatured=true` },
          { name: 'New Arrivals', route: `${BASE}/products?isNewArrival=true` },
          { name: 'Archived', route: `${BASE}/products?isDeleted=true` },
        ],
      },
      {
        name: 'Categories',
        tooltip: 'Manage categories',
        route: `${BASE}/categories`,
        hugeicon: Layers01Icon,
        items: [
          { name: 'All', route: `${BASE}/categories` },
          { name: 'Active', route: `${BASE}/categories?isActive=true` },
          { name: 'Inactive', route: `${BASE}/categories?isActive=false` },
          { name: 'Archived', route: `${BASE}/categories?isDeleted=true` },
        ],
      },
    ],
  },
  {
    label: 'Marketing',
    items: [
      {
        name: 'Coupons',
        tooltip: 'Manage coupons',
        route: `${BASE}/coupons`,
        hugeicon: Coupon01Icon,
        items: [
          { name: 'All', route: `${BASE}/coupons` },
          { name: 'Active', route: `${BASE}/coupons?isActive=true` },
          { name: 'Inactive', route: `${BASE}/coupons?isActive=false` },
          { name: 'Archived', route: `${BASE}/coupons?isDeleted=true` },
        ],
      },
    ],
  },
  {
    label: 'Engagement',
    items: [
      {
        name: 'Reviews',
        tooltip: 'Moderate customer reviews',
        route: `${BASE}/reviews`,
        hugeicon: StarIcon,
        items: [
          { name: 'All', route: `${BASE}/reviews` },
          { name: 'Verified', route: `${BASE}/reviews?isVerified=true` },
          { name: 'Unverified', route: `${BASE}/reviews?isVerified=false` },
          { name: 'Archived', route: `${BASE}/reviews?isDeleted=true` },
        ],
      },
      {
        name: 'Contact Inquiries',
        tooltip: 'Manage contact inquiries',
        route: `${BASE}/contact-inquiries`,
        hugeicon: CustomerSupportIcon,
        items: [
          { name: 'All', route: `${BASE}/contact-inquiries` },
          {
            name: 'Archived',
            route: `${BASE}/contact-inquiries?isDeleted=true`,
          },
        ],
      },
    ],
  },
  {
    label: 'Operations',
    items: [
      {
        name: 'Orders',
        tooltip: 'Manage orders',
        route: `${BASE}/orders`,
        hugeicon: ShoppingBag01Icon,
        items: [
          { name: 'All', route: `${BASE}/orders` },
          { name: 'Soft Deleted', route: `${BASE}/orders?isDeleted=true` },
        ],
      },
      {
        name: 'Payments',
        tooltip: 'Manage payments',
        route: `${BASE}/payments`,
        hugeicon: Wallet01Icon,
        items: [{ name: 'All', route: `${BASE}/payments` }],
      },
      {
        name: 'Pickup Locations',
        tooltip: 'Manage pickup locations',
        route: `${BASE}/pickup-locations`,
        hugeicon: PinLocation01Icon,
        items: [
          { name: 'All', route: `${BASE}/pickup-locations` },
          { name: 'Active', route: `${BASE}/pickup-locations?isActive=true` },
          {
            name: 'Inactive',
            route: `${BASE}/pickup-locations?isActive=false`,
          },
        ],
      },
      {
        name: 'Stores',
        tooltip: 'Manage stores',
        route: `${BASE}/stores`,
        hugeicon: Store01Icon,
        items: [
          { name: 'All', route: `${BASE}/stores` },
          { name: 'Active', route: `${BASE}/stores?isActive=true` },
          { name: 'Inactive', route: `${BASE}/stores?isActive=false` },
          { name: 'Archived', route: `${BASE}/stores?isDeleted=true` },
        ],
      },
    ],
  },
  {
    label: 'People',
    items: [
      {
        name: 'Customers',
        tooltip: 'Manage customers',
        route: `${BASE}/users`,
        hugeicon: UserGroupIcon,
        items: [
          { name: 'All', route: `${BASE}/users` },
          { name: 'Banned', route: `${BASE}/users?banned=true` },
          { name: 'Verified', route: `${BASE}/users?isVerified=true` },
          { name: 'Unverified', route: `${BASE}/users?isVerified=false` },
        ],
      },
      {
        name: 'Admins',
        tooltip: 'Manage admins',
        route: `${BASE}/admins`,
        hugeicon: ShieldUserIcon,
        items: [
          { name: 'All', route: `${BASE}/admins` },
          { name: 'Super Admins', route: `${BASE}/admins?isSuperAdmin=true` },
          { name: 'Banned', route: `${BASE}/admins?banned=true` },
        ],
      },
    ],
  },
  {
    label: 'System',
    items: [
      {
        name: 'System Settings',
        tooltip: 'Manage system settings',
        route: `${BASE}/system-settings`,
        hugeicon: Settings02Icon,
        items: [
          {
            name: 'Authentication',
            route: `${BASE}/system-settings?tab=betterAuth`,
          },
          {
            name: 'SMTP',
            route: `${BASE}/system-settings?tab=smtp`,
          },
          {
            name: 'Storage',
            route: `${BASE}/system-settings?tab=storage`,
          },
          {
            name: 'Razorpay',
            route: `${BASE}/system-settings?tab=razorpay`,
          },
          {
            name: 'Shiprocket',
            route: `${BASE}/system-settings?tab=shiprocket`,
          },
        ],
      },
    ],
  },
];
