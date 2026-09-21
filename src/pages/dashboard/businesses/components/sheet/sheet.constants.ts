import { CURRENCY_OPTIONS } from '@/constants/currency.constants';
import type { BusinessFormValues } from './sheet.d';

export const BUSINESS_FORM_DEFAULT_VALUES: BusinessFormValues = {
  name: '',
  currency_code: 'INR',
  opening_balance: 0,
  current_balance: 0,
};

export { CURRENCY_OPTIONS };
