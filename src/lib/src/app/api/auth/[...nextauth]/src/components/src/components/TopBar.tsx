'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function TopBar() {
  const { data: session } = useSession();

  return (
    <header className="navbar bg-base-100 shadow px-4">
      <div className="flex-1">
        <h1 className="text-xl font-bold">Jarvis Assistant</h1>
      </div>
      <div className="flex-none">
        {session ? (
          <div className="flex items-center gap-2">
            <span>{session.user?.email}</span>
            <button className="btn btn-sm" onClick={() => signOut()}>
              Logout
            </button>
          </div>
        ) : (
          <button className="btn btn-sm" onClick={() => signIn()}>
            Login
          </button>
        )}
      </div>
    </header>
  );
}
