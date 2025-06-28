export function checkSupabaseEnv() {
  const missing = [] as string[];
  if (!process.env.SUPABASE_URL) missing.push('SUPABASE_URL');
  if (!process.env.SUPABASE_ANON_KEY) missing.push('SUPABASE_ANON_KEY');

  if (missing.length > 0) {
    console.warn(
      `\u26A0\uFE0F Attenzione: le seguenti variabili di ambiente non sono state trovate: ${missing.join(', ')}`
    );
  } else {
    console.log('✅ Variabili Supabase correttamente configurate.');
  }
}
