import { BusinessCard } from '../business-card/BusinessCard';
import type { BusinessGridProps } from './business-grid.d';

export function BusinessGrid({
  businesses,
  activeBusinessId,
  onSelect,
  onEdit,
  onDelete,
}: BusinessGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {businesses.map(business => (
        <BusinessCard
          key={business.id}
          business={business}
          isActive={business.id === activeBusinessId}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
