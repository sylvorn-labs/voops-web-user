import type { User, Session } from '@supabase/supabase-js';

export interface UserSettingsTabProps {
  user: User | null;
  session: Session | null;
}
