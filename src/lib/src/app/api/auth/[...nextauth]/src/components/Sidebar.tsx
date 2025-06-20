'use client';
import Link from 'next/link';

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/finanze', label: 'Finanze' },
  { href: '/liste/spesa', label: 'Lista Spesa' },
  { href: '/liste/online', label: 'Spesa Online' },
  { href: '/liste/esaurimento', label: 'In Esaurimento' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-base-200 p-4">
      <nav className="menu">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </nav>
    </aside>
  );
}
