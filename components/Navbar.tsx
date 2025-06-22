import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import { useTheme } from './ThemeProvider';

interface NavbarProps {
  userEmail: string;
}

export default function Navbar({ userEmail }: NavbarProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <nav className="flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-2 shadow">
      <Link href="/" className="text-lg font-bold">
        Jarvis Assistant
      </Link>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700 dark:text-gray-200">{userEmail}</span>
        <button
          onClick={toggleTheme}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
