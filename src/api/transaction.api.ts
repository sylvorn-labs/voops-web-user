import { supabase } from '@/lib/supabase';
import type {
  CreateTransactionRequest,
  CreateTransactionResponse,
  DeleteTransactionResponse,
  ITransactionAPI,
  ListTransactionsParams,
  Transaction,
  TransactionListItem,
  UpdateTransactionRequest,
} from '@/types/api/transaction.d';
import type { ApiResponse, PaginatedResponse } from '@/types/api.d';

function formatTransaction(
  raw: Record<string, unknown>,
  currentUserEmail?: string | null,
  currentUserId?: string | null,
): Transaction {
  const paidFrom = raw.paid_from_account as { name?: string } | null;
  const receivedIn = raw.received_in_account as { name?: string } | null;
  const category = raw.category as {
    name?: string;
    color?: string | null;
  } | null;
  const project = raw.project as { name?: string } | null;
  const fromParty = raw.from_party as { name?: string } | null;
  const toParty = raw.to_party as { name?: string } | null;

  const paidFromId = raw.paid_from_account_id
    ? String(raw.paid_from_account_id)
    : null;
  const receivedInId = raw.received_in_account_id
    ? String(raw.received_in_account_id)
    : null;
  const fromPartyId = raw.from_party_id ? String(raw.from_party_id) : null;
  const toPartyId = raw.to_party_id ? String(raw.to_party_id) : null;
  const createdBy = String(raw.created_by || '');

  let createdByEmail: string | null = null;
  if (createdBy) {
    if (currentUserId && createdBy === currentUserId && currentUserEmail) {
      createdByEmail = currentUserEmail;
    } else {
      createdByEmail = `user-${createdBy.slice(0, 8)}@example.com`;
    }
  }

  return {
    id: String(raw.id),
    business_id: String(raw.business_id),
    type: raw.type as Transaction['type'],
    amount: Number(raw.amount || 0),
    occurred_on: String(raw.occurred_on || ''),
    description: raw.description ? String(raw.description) : null,
    created_by: createdBy,
    created_by_email: createdByEmail,
    paid_from_account_id: paidFromId,
    received_in_account_id: receivedInId,
    account_id: paidFromId || receivedInId,
    account_name: paidFrom?.name || receivedIn?.name || null,
    category_id: raw.category_id ? String(raw.category_id) : null,
    category_name: category?.name || null,
    category_color: category?.color || null,
    project_id: raw.project_id ? String(raw.project_id) : null,
    project_name: project?.name || null,
    from_party_id: fromPartyId,
    to_party_id: toPartyId,
    party_id: toPartyId || fromPartyId,
    party_name: toParty?.name || fromParty?.name || null,
    attachment_url: raw.attachment_url ? String(raw.attachment_url) : null,
    is_archived: Boolean(raw.is_archived),
    created_at: String(raw.created_at),
    updated_at: String(raw.updated_at),
    deleted_at: raw.deleted_at ? String(raw.deleted_at) : null,
  };
}

const TXN_SELECT_QUERY = `
  *,
  paid_from_account:accounts!paid_from_account_id(name),
  received_in_account:accounts!received_in_account_id(name),
  category:categories(name, color),
  project:projects(name),
  from_party:parties!from_party_id(name),
  to_party:parties!to_party_id(name)
`;

export class TransactionAPI implements ITransactionAPI {
  private static instance: TransactionAPI;

  private constructor() {}

  public static getInstance(): TransactionAPI {
    if (!TransactionAPI.instance) {
      TransactionAPI.instance = new TransactionAPI();
    }
    return TransactionAPI.instance;
  }

  public async list(
    params: ListTransactionsParams,
  ): Promise<PaginatedResponse<TransactionListItem>> {
    const page = params.page ?? 1;
    const limit = params.limit ?? 20;
    const offset = (page - 1) * limit;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    let query = supabase
      .from('transactions')
      .select(TXN_SELECT_QUERY, { count: 'exact' })
      .eq('business_id', params.business_id)
      .is('deleted_at', null);

    if (params.search && params.search.trim() !== '') {
      const q = params.search.trim();
      query = query.ilike('description', `%${q}%`);
    }

    if (params.type) {
      if (Array.isArray(params.type)) {
        if (params.type.length > 0) {
          query = query.in('type', params.type);
        }
      } else {
        query = query.eq('type', params.type);
      }
    }

    if (params.account_id) {
      if (Array.isArray(params.account_id)) {
        if (params.account_id.length > 0) {
          const ids = params.account_id.join(',');
          query = query.or(
            `paid_from_account_id.in.(${ids}),received_in_account_id.in.(${ids})`,
          );
        }
      } else {
        query = query.or(
          `paid_from_account_id.eq.${params.account_id},received_in_account_id.eq.${params.account_id}`,
        );
      }
    }

    if (params.category_id) {
      if (Array.isArray(params.category_id)) {
        if (params.category_id.length > 0) {
          query = query.in('category_id', params.category_id);
        }
      } else {
        query = query.eq('category_id', params.category_id);
      }
    }

    if (params.project_id) {
      if (Array.isArray(params.project_id)) {
        if (params.project_id.length > 0) {
          query = query.in('project_id', params.project_id);
        }
      } else {
        query = query.eq('project_id', params.project_id);
      }
    }

    if (params.party_id) {
      if (Array.isArray(params.party_id)) {
        if (params.party_id.length > 0) {
          const ids = params.party_id.join(',');
          query = query.or(`from_party_id.in.(${ids}),to_party_id.in.(${ids})`);
        }
      } else {
        query = query.or(
          `from_party_id.eq.${params.party_id},to_party_id.eq.${params.party_id}`,
        );
      }
    }

    if (params.is_archived !== undefined) {
      query = query.eq('is_archived', params.is_archived);
    }

    const dateField = params.dateField ?? 'occurred_on';
    if (params.startDate) {
      query = query.gte(dateField, params.startDate);
    }

    if (params.endDate) {
      query = query.lte(dateField, params.endDate);
    }

    const sortBy = params.sortBy ?? 'occurred_on';
    const sortOrder = params.sortOrder ?? 'desc';
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    query = query.range(offset, offset + limit - 1);

    const { data, count, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    const total = count ?? 0;
    const totalPages = Math.ceil(total / limit);
    const items = (data || []).map(row =>
      formatTransaction(row, user?.email, user?.id),
    );

    return {
      success: true,
      data: {
        items,
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  public async getById(id: string): Promise<ApiResponse<Transaction>> {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('transactions')
      .select(TXN_SELECT_QUERY)
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: formatTransaction(data, user?.email, user?.id),
    };
  }

  public async create(
    payload: CreateTransactionRequest,
  ): Promise<ApiResponse<CreateTransactionResponse>> {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User must be authenticated to create a transaction');
    }

    const isDebit = payload.type === 'debit';

    const insertData: Record<string, unknown> = {
      business_id: payload.business_id,
      type: payload.type,
      amount: payload.amount,
      occurred_on: payload.occurred_on || new Date().toISOString().slice(0, 10),
      description: payload.description?.trim() || null,
      created_by: user.id,
      paid_from_account_id: isDebit ? payload.account_id : null,
      received_in_account_id: isDebit ? null : payload.account_id,
      category_id: payload.category_id || null,
      project_id: payload.project_id || null,
      from_party_id: isDebit ? null : payload.party_id || null,
      to_party_id: isDebit ? payload.party_id || null : null,
      attachment_url: payload.attachment_url?.trim() || null,
      is_archived: payload.is_archived ?? false,
    };

    const { data: inserted, error } = await supabase
      .from('transactions')
      .insert(insertData)
      .select('id')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: { id: inserted.id },
    };
  }

  public async update(
    id: string,
    payload: UpdateTransactionRequest,
  ): Promise<ApiResponse<Transaction>> {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // First fetch current record to keep valid account/party alignment if type/account changed
    const { data: current, error: fetchErr } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchErr || !current) {
      throw new Error(fetchErr?.message || 'Transaction not found');
    }

    const type = payload.type ?? (current.type as Transaction['type']);
    const isDebit = type === 'debit';

    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (payload.type !== undefined) updateData.type = payload.type;
    if (payload.amount !== undefined) updateData.amount = payload.amount;
    if (payload.occurred_on !== undefined)
      updateData.occurred_on = payload.occurred_on;
    if (payload.description !== undefined)
      updateData.description = payload.description?.trim() || null;
    if (payload.attachment_url !== undefined)
      updateData.attachment_url = payload.attachment_url?.trim() || null;
    if (payload.is_archived !== undefined)
      updateData.is_archived = payload.is_archived;

    const accountId =
      payload.account_id ??
      (current.paid_from_account_id || current.received_in_account_id);

    if (accountId) {
      updateData.paid_from_account_id = isDebit ? accountId : null;
      updateData.received_in_account_id = isDebit ? null : accountId;
    }

    if (payload.category_id !== undefined)
      updateData.category_id = payload.category_id || null;
    if (payload.project_id !== undefined)
      updateData.project_id = payload.project_id || null;

    const partyId =
      payload.party_id !== undefined
        ? payload.party_id
        : current.to_party_id || current.from_party_id;

    if (partyId !== undefined) {
      updateData.to_party_id = isDebit ? partyId || null : null;
      updateData.from_party_id = isDebit ? null : partyId || null;
    }

    const { data: updated, error } = await supabase
      .from('transactions')
      .update(updateData)
      .eq('id', id)
      .is('deleted_at', null)
      .select(TXN_SELECT_QUERY)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: formatTransaction(updated, user?.email, user?.id),
    };
  }

  public async toggleArchive(
    id: string,
    is_archived: boolean,
  ): Promise<ApiResponse<Transaction>> {
    return this.update(id, { is_archived });
  }

  public async delete(
    id: string,
  ): Promise<ApiResponse<DeleteTransactionResponse>> {
    const { data: deleted, error } = await supabase
      .from('transactions')
      .update({
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select('id')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: { id: deleted.id },
    };
  }
}
