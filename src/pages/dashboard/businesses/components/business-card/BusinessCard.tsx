import { format } from 'date-fns';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  BuildingIcon,
  Calendar03Icon,
  CheckmarkCircle01Icon,
  Delete02Icon,
  Edit02Icon,
} from '@hugeicons/core-free-icons';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card/Card';
import { Badge } from '@/components/ui/badge/Badge';
import { Button } from '@/components/ui/button/Button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar/Avatar';
import { cn } from '@/lib/utils';
import type { BusinessCardProps } from './business-card.d';

export function BusinessCard({
  business,
  isActive,
  onSelect,
  onEdit,
  onDelete,
}: BusinessCardProps) {
  const formattedDate = business.created_at
    ? format(new Date(business.created_at), 'MMM dd, yyyy')
    : 'Unknown';

  return (
    <Card
      className={cn(
        'flex flex-col justify-between transition-all duration-200',
        isActive
          ? 'border-primary/60 bg-card ring-primary/20 shadow-md ring-2'
          : 'border-border/80 hover:border-border hover:shadow-sm',
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="size-11 rounded-xl">
              <AvatarFallback className="bg-primary/10 text-primary rounded-xl text-base font-bold">
                {business.name ? (
                  business.name.slice(0, 2).toUpperCase()
                ) : (
                  <HugeiconsIcon icon={BuildingIcon} size={20} />
                )}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-base leading-none font-semibold tracking-tight">
                {business.name}
              </h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono text-xs">
                  {business.currency_code || 'USD'}
                </Badge>
                {isActive && (
                  <Badge variant="default" className="text-xs">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      className="mr-1 size-3"
                    />
                    Active
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <HugeiconsIcon icon={Calendar03Icon} size={14} />
          <span>Created on {formattedDate}</span>
        </div>
      </CardContent>

      <CardFooter className="border-border/50 flex items-center justify-between border-t pt-4">
        <div>
          {isActive ? (
            <Button
              variant="outline"
              size="sm"
              className="bg-primary/5 text-primary border-primary/20 cursor-default"
              disabled
            >
              Current Workspace
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelect(business)}
            >
              Switch To
            </Button>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            title="Edit Business"
            onClick={() => onEdit(business)}
          >
            <HugeiconsIcon icon={Edit02Icon} size={16} />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-destructive size-8"
            title="Delete Business"
            onClick={() => onDelete(business)}
          >
            <HugeiconsIcon icon={Delete02Icon} size={16} />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
