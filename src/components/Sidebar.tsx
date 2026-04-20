'use client';
import React from 'react';
import { Home, Calendar, Utensils, User, Settings, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export const Sidebar = () => {
  const menuItems = [
    { icon: <Home size={22} />, label: 'Dashboard', href: '/' },
    { icon: <Calendar size={22} />, label: 'Asistencia', href: '/asistencia' },
    { icon: <Utensils size={22} />, label: 'Dieta', href: '/dieta' },
    { icon: <TrendingUp size={22} />, label: 'Progreso', href: '/progreso' },
    { icon: <User size={22} />, label: 'Perfil', href: '/perfil' },
  ];

  return (
    <aside className="sidebar flex flex-col gap-8 p-8 h-full animate-slide-in" style={{
      width: '300px',
      borderRight: '1px solid var(--border)',
      background: 'linear-gradient(180deg, #121214 0%, #09090b 100%)',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 50
    }}>
      <div className="logo mb-8 flex flex-col items-center gap-3">
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#0c0c0e',
          border: '1px solid var(--border)',
          boxShadow: '0 8px 30px -5px rgba(74, 222, 128, 0.2)'
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/logo.png" 
            alt="DR Logo" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.innerHTML = '<span style="color:var(--primary);font-weight:bold;font-size:24px">DR</span>';
            }}
          />
        </div>
        <span className="font-bold tracking-tight text-2xl flex items-baseline gap-1" style={{ letterSpacing: '-0.02em' }}>
          <span style={{ color: '#15803d' }}>DR</span>
          <span className="text-white">GYMPRO</span>
        </span>
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all font-medium text-sm border border-transparent hover:border-zinc-800"
            style={{ textDecoration: 'none' }}
          >
            <span className="icon-container">{item.icon}</span>
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
