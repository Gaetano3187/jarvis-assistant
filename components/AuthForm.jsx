import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AuthForm() {
  const [variant, setVariant] = useState('LOGIN'); // oppure 'REGISTER'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toggle = () => setVariant(v => (v === 'LOGIN' ? 'REGISTER' : 'LOGIN'));

  const handleSubmit = async e => {
    e.preventDefault();
    if (variant === 'LOGIN') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-sm mx-auto">
      <input type="email"    value={email}    onChange={e=>setEmail(e.target.value)}    placeholder="Email"     required />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"  required />
      <button type="submit">
        {variant === 'LOGIN' ? 'Accedi' : 'Registrati'}
      </button>

      <p className="text-center text-sm">
        {variant === 'LOGIN'
          ? <>Non hai un account? <span className="underline cursor-pointer" onClick={toggle}>Registrati</span></>
          : <>Hai già un account? <span className="underline cursor-pointer" onClick={toggle}>Accedi</span></>}
      </p>
    </form>
  );
}

