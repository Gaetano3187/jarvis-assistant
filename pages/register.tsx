import { useState } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const supabase = createBrowserSupabaseClient();

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (!error) alert('Registrazione riuscita! Controlla la mail.');
    else alert(error.message);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📝 Registrati</h1>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Registrati</button>
    </div>
  );
}