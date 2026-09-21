import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FloppyDiskIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { SplitLayout } from '@/components/dashboard/SpiltLayout';
import { DataCard } from '@/components/dashboard/data-card/DataCard';
import { DataCardField } from '@/components/dashboard/data-card/DataCardField';
import { DataCardIdField } from '@/components/dashboard/data-card/DataCardIdField';
import {
  DataCardPropertyRow,
  DataCardTimestampGroup,
} from '@/components/dashboard/data-card/DataCardPropertyRow';
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
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { useUpdateMember } from '@/hooks/api/member.hook';

import { MemberRoleBadge } from '@/pages/members/list/components/member-role-badge/MemberRoleBadge';
import { MEMBER_ROLE_OPTIONS } from '@/pages/members/components/schema/member.constants';
import {
  memberEditFormSchema,
  type MemberEditFormValues,
} from '@/pages/members/components/schema/member.schema';
import type { MemberBasicTabProps } from './member-basic-tab.d';

export function MemberBasicTab({ member }: MemberBasicTabProps) {
  const updateMutation = useUpdateMember();

  const form = useForm<MemberEditFormValues>({
    resolver: zodResolver(memberEditFormSchema),
    defaultValues: {
      role: member.role,
    },
  });

  useEffect(() => {
    form.reset({
      role: member.role,
    });
  }, [member, form]);

  const onSubmit = (values: MemberEditFormValues) => {
    updateMutation.mutate({
      id: member.id,
      data: {
        role: values.role,
      },
    });
  };

  const isDirty = form.formState.isDirty;

  const leftContent = (
    <div className="flex flex-col gap-6">
      <DataCard
        title="Member Permissions & Role"
        description="Configure workspace access level and administrative permissions for this user."
        action={
          <Button
            size="sm"
            type="submit"
            form="member-details-form"
            disabled={!isDirty || updateMutation.isPending}
          >
            <HugeiconsIcon icon={FloppyDiskIcon} className="mr-1 size-3.5" />
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        }
      >
        <Form {...form}>
          <form
            id="member-details-form"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-5"
          >
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input value={member.email} disabled readOnly />
              </FormControl>
            </FormItem>

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={updateMutation.isPending}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MEMBER_ROLE_OPTIONS.map(option => (
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
          </form>
        </Form>
      </DataCard>
    </div>
  );

  const rightContent = (
    <DataCard
      title="System Information"
      description="Read-only metadata and workspace audit records."
    >
      <div className="flex flex-col gap-4">
        <DataCardIdField id={member.id} label="Member ID" />

        <div className="flex flex-col gap-3 border-t pt-3">
          <DataCardField label="Email Address" value={member.email} copyable />
          <DataCardField
            label="Workspace ID"
            value={member.business_id}
            copyable
          />
          <DataCardPropertyRow
            label="Assigned Role"
            value={<MemberRoleBadge role={member.role} />}
          />
          <DataCardPropertyRow
            label="Invited By"
            value={
              <span className="text-foreground text-sm font-medium">
                {member.invited_by_email || 'Workspace Owner'}
              </span>
            }
          />
          <DataCardPropertyRow
            label="Joined Date"
            value={
              <span className="text-foreground text-sm font-medium">
                {new Date(member.joined_at).toLocaleString()}
              </span>
            }
          />
        </div>

        <DataCardTimestampGroup
          createdAt={member.created_at}
          updatedAt={member.updated_at}
        />
      </div>
    </DataCard>
  );

  return <SplitLayout left={leftContent} right={rightContent} />;
}
