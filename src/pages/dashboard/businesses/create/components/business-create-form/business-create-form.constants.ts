import { CURRENCY_OPTIONS } from '@/constants/currency.constants';
import type { BusinessCreateFormValues } from './business-create-form.d';

export const BUSINESS_CREATE_DEFAULT_VALUES: BusinessCreateFormValues = {
  name: '',
  currency_code: 'USD',
};

export { CURRENCY_OPTIONS };
