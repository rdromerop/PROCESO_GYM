import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const GlassCard = ({ children, className = '', title }: GlassCardProps) => {
  return (
    <div className={`glass rounded-xl p-6 flex flex-col gap-4 ${className}`} style={{
      backgroundColor: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '1.5rem',
      height: '100%'
    }}>
      {title && <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">{title}</h3>}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};
