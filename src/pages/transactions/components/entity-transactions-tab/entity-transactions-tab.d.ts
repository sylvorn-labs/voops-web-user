export type TransactionEntityType =
  'category' | 'account' | 'project' | 'party';

export interface EntityTransactionsTabProps {
  entityType: TransactionEntityType;
  entityId: string;
}
