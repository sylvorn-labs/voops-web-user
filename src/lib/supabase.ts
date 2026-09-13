import { createClient } from '@supabase/supabase-js';

import { CONFIG } from '@/configs/config';

export const supabase = createClient(CONFIG.supabaseUrl, CONFIG.supabaseKey);
