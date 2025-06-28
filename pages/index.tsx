import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Mock login: basta che i campi non siano vuoti
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  return (
    <>
      <Head>
        <title>Jarvis Assistant</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Video di sfondo a schermo intero */}
      <video
        className="fixed inset-0 z-0 h-full w-full object-cover"
        src="/bg.mp4"
        autoPlay
        loop
        muted
      />

      {/* Overlay + contenuto */}
      <div className="relative z-10 flex min-h-screen items-center justify-center bg-black/60 px-4">
        {!isLoggedIn ? (
          <div className="w-full max-w-sm rounded-lg bg-gray-900/80 p-8 backdrop-blur-md">
            <img
              src="/logo.png"
              alt="Logo"
              className="mx-auto mb-6 h-16 w-16 object-contain"
            />

            <input
              type="text"
              placeholder="Nome utente"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-4 w-full rounded-md border border-gray-700 bg-gray-800 p-3 text-sm text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-6 w-full rounded-md border border-gray-700 bg-gray-800 p-3 text-sm text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />

            <button
              onClick={handleLogin}
              className="w-full rounded-md bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Accedi
            </button>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2">
            <Link
              href="/finanze"
              className="flex h-40 w-72 flex-col items-center justify-center rounded-xl bg-gray-900/80 p-6 text-center text-gray-100 shadow-lg backdrop-blur-md transition hover:bg-gray-800"
            >
              <span className="mb-2 text-4xl">📊</span>
              <span className="text-lg font-semibold">Sezione Finanze</span>
            </Link>

            <Link
              href="/spese"
              className="flex h-40 w-72 flex-col items-center justify-center rounded-xl bg-gray-900/80 p-6 text-center text-gray-100 shadow-lg backdrop-blur-md transition hover:bg-gray-800"
            >
              <span className="mb-2 text-4xl">🛒</span>
              <span className="text-lg font-semibold">Sezione Spese</span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
