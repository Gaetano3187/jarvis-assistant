import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white">
      <header className="p-4 border-b dark:border-gray-700 flex justify-between">
        <h1 className="text-xl font-bold">Jarvis Assistant</h1>
        <nav className="space-x-4">
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
        </nav>
      </header>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
