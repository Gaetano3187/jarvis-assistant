import { useState } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const supabase = createBrowserSupabaseClient();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) window.location.href = '/dashboard';
    else alert(error.message);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🔐 Login</h1>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Accedi</button>
      <p>Non hai un account? <a href="/register">Registrati</a></p>
    </div>
  );
}