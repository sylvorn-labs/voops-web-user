import { Link, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon } from '@hugeicons/core-free-icons';

import { PageHeader } from '@/components/dashboard/page-header/PageHeader';
import { Button } from '@/components/ui/button/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/Card';
import { Skeleton } from '@/components/ui/skeleton/Skeleton';
import { getBusinessByIdOptions } from '@/hooks/api/business.hook';
import { BusinessUpdateForm } from './components/business-update-form/BusinessUpdateForm';

export function BusinessUpdatePage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery(
    getBusinessByIdOptions(id ?? ''),
  );

  const business = data?.data;

  return (
    <div className="space-y-8 p-6 lg:p-10">
      <PageHeader
        title="Update Business"
        description="Modify business details and currency preferences."
        opposite={
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard/businesses">
              <HugeiconsIcon icon={ArrowLeft01Icon} className="mr-1 size-4" />
              Back to Businesses
            </Link>
          </Button>
        }
      />

      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Business Details</CardTitle>
            <CardDescription>
              Update the settings for this business workspace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Skeleton className="h-9 w-20 rounded-xl" />
                  <Skeleton className="h-9 w-28 rounded-xl" />
                </div>
              </div>
            ) : isError || !business ? (
              <div className="py-8 text-center">
                <p className="text-destructive font-medium">
                  Business not found or unable to load details.
                </p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link to="/dashboard/businesses">Return to Businesses</Link>
                </Button>
              </div>
            ) : (
              <BusinessUpdateForm business={business} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
