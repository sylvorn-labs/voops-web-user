import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/Form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/Select';
import { SheetFieldGroup } from '@/components/dashboard/sheet/SheetFieldGroup';
import { useSheetDirty } from '@/components/dashboard/sheet/useSheetDirty';
import { useCreateMember } from '@/hooks/api/member.hook';
import { useActiveBusinessId } from '@/stores/business/business.selectors';
import { Input } from '@/components/ui/input/Input';
import type { AddSheetProps } from '@/types/sheet.d';

import {
  MEMBER_FORM_DEFAULT_VALUES,
  MEMBER_INVITE_ROLE_OPTIONS,
} from '@/pages/members/components/schema/member.constants';
import { memberFormSchema } from '@/pages/members/components/schema/member.schema';
import type { MemberFormValues } from '@/pages/members/components/schema/member.d';

export function MemberAddSheet({ formId, prefill, onSuccess }: AddSheetProps) {
  const activeBusinessId = useActiveBusinessId();
  const createMutation = useCreateMember();

  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      ...MEMBER_FORM_DEFAULT_VALUES,
      ...(prefill as Partial<MemberFormValues>),
    },
  });

  useSheetDirty(form.formState.isDirty);

  const onSubmit = (values: MemberFormValues) => {
    if (!activeBusinessId) return;

    createMutation.mutate(
      {
        business_id: activeBusinessId,
        email: values.email,
        role: values.role,
      },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-6 p-6"
      >
        <SheetFieldGroup title="Member Invitation">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="e.g. colleague@company.com"
                      disabled={createMutation.isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Role & Permissions</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={createMutation.isPending}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MEMBER_INVITE_ROLE_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </SheetFieldGroup>
      </form>
    </Form>
  );
}
