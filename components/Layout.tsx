import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import VoiceCommand from './VoiceCommand';


export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();

  if (!user) return <>{children}</>;

  return (
    <div>     
        <nav className="bg-black text-white p-4 flex flex-wrap gap-2 justify-center text-sm sm:text-base">
	<Link href="/dashboard">🏠 Dashboard</Link> |{' '}
        <Link href="/finanze">📊 Finanze</Link> |{' '}
        <Link href="/spese">🛒 Spese</Link> |{' '}
        <Link href="/assistant">🤖 Assistant</Link> |{' '}
        <Link href="/log">📄 Log vocali</Link> |{' '}
	<Link href="/profile">👤 Profilo</Link> | 
        <button onClick={logout}>🔓 Logout</button>
      </nav>
      <main className="p-4 sm:p-8 max-w-screen-lg mx-auto">
  <VoiceCommand />
  {children}
</main>

    </div>
  );
}