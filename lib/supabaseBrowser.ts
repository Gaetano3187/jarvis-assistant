import { createClient } from '@supabase/supabase-js';

// Client da usare SOLO nel browser o nei componenti React
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
