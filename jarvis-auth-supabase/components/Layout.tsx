import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();

  if (!user) return <>{children}</>;

  return (
    <div>
      <nav style={{ background: '#111', padding: '1rem', color: '#fff' }}>
        <Link href="/dashboard">🏠 Dashboard</Link> |{' '}
        <Link href="/finanze">📊 Finanze</Link> |{' '}
        <Link href="/spese">🛒 Spese</Link> |{' '}
        <Link href="/assistant">🤖 Assistant</Link> |{' '}
        <Link href="/log">📄 Log vocali</Link> |{' '}
        <button onClick={logout}>🔓 Logout</button>
      </nav>
      <main style={{ padding: '2rem' }}>{children}</main>
    </div>
  );
}