import { Link } from 'react-router';
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
import { BusinessCreateForm } from './components/business-create-form/BusinessCreateForm';

export function BusinessCreatePage() {
  return (
    <div className="space-y-8 p-6 lg:p-10">
      <PageHeader
        title="Create Business"
        description="Set up a new business workspace to manage transactions, accounts, and teams."
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
              Enter the name and default operating currency for this business.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BusinessCreateForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
