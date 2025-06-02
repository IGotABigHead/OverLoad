'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/musculation', label: 'Musculation' },
    { href: '/course', label: 'Course' },
    { href: '/natation', label: 'Natation' },
    { href: '/padel', label: 'Padel' },
  ];

  return (
    <>
      {/* Sidebar - Visible only on large screens and above */}
      <aside className={`hidden lg:static lg:block lg:w-64 bg-white shadow-lg z-40`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600 mb-8">Sport App</h1>
          <nav className="space-y-2">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 rounded-md transition-colors ${
                  pathname === link.href
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-blue-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
