import NextAuth from 'next-auth';
import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const authOptions = {
  adapter: SupabaseAdapter(supabase),
  providers: [],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers: { GET, POST }, auth } = NextAuth(authOptions);
