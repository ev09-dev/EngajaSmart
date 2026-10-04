import { createClient } from '@supabase/supabase-js';

// Cliente com service_role: ignora RLS. Usar APENAS no servidor.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);