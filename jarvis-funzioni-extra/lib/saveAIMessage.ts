import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

export async function saveAIMessage(userId: string, prompt: string, reply: string) {
  const supabase = createBrowserSupabaseClient();
  await supabase.from('ai_logs').insert([{ user_id: userId, prompt, reply }]);
}