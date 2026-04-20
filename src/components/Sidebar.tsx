import React from 'react';
import { Home, Calendar, Utensils, User, Settings, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export const Sidebar = () => {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', href: '/' },
    { icon: <Calendar size={20} />, label: 'Asistencia', href: '/asistencia' },
    { icon: <Utensils size={20} />, label: 'Dieta', href: '/dieta' },
    { icon: <TrendingUp size={20} />, label: 'Progreso', href: '/progreso' },
    { icon: <User size={20} />, label: 'Perfil', href: '/perfil' },
  ];

  return (
    <aside className="sidebar flex flex-col gap-6 p-6 h-full" style={{
      width: '260px',
      borderRight: '1px solid var(--border)',
      backgroundColor: 'var(--background)',
      position: 'fixed',
      left: 0,
      top: 0
    }}>
      <div className="logo mb-4 flex items-center gap-2">
        <div style={{
          width: '32px',
          height: '32px',
          backgroundColor: 'white',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <TrendingUp size={20} color="black" />
        </div>
        <span className="font-bold text-white tracking-tight">GYM TRACKER</span>
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all font-medium text-sm"
            style={{ textDecoration: 'none' }}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex-1"></div>

      <div className="flex flex-col gap-2 mt-auto">
        <Link 
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white transition-all font-medium text-sm"
          style={{ textDecoration: 'none' }}
        >
          <Settings size={20} />
          Ajustes
        </Link>
      </div>
    </aside>
  );
};
