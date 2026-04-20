'use client';
import React from 'react';
import { Home, Calendar, Utensils, User, Settings, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { icon: <Home size={26} />, label: 'Dashboard', href: '/' },
    { icon: <Calendar size={26} />, label: 'Asistencia', href: '/asistencia' },
    { icon: <Utensils size={26} />, label: 'Dieta', href: '/dieta' },
    { icon: <TrendingUp size={26} />, label: 'Progreso', href: '/progreso' },
    { icon: <User size={26} />, label: 'Perfil', href: '/perfil' },
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
          boxShadow: '0 8px 30px -5px rgba(249, 115, 22, 0.2)'
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
          <span style={{ color: '#f97316' }}>DR</span>
          <span className="text-white">GYMPRO</span>
        </span>
      </div>

      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-5 px-6 py-4 rounded-2xl transition-all font-bold text-lg border ${
                isActive 
                  ? 'bg-primary/10 border-primary/30 text-white shadow-[0_0_20px_-5px_rgba(249,115,22,0.3)]' 
                  : 'text-zinc-500 hover:text-white hover:bg-zinc-900/50 border-transparent hover:border-zinc-800'
              }`}
              style={{ textDecoration: 'none' }}
            >
              <span className={`transition-transform duration-300 ${isActive ? 'scale-110 text-primary' : 'text-zinc-600'}`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex-1"></div>

      <div className="flex flex-col mt-auto pt-4 border-t border-zinc-800/50">
        <Link 
          href="/settings"
          className="flex items-center gap-4 px-6 py-3 rounded-xl text-zinc-500 hover:text-white hover:bg-zinc-900/50 transition-all font-bold text-sm border border-transparent hover:border-zinc-800"
          style={{ textDecoration: 'none' }}
        >
          <Settings size={20} />
          Ajustes del Sistema
        </Link>
      </div>
    </aside>
  );
};
