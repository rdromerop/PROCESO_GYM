import React from 'react';
import { GlassCard } from './GlassCard';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
}

export const StatCard = ({ label, value, unit, icon }: StatCardProps) => {
  return (
    <GlassCard className="min-w-[140px]">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-sm font-medium text-zinc-500">{label}</span>
        {icon && <div className="text-zinc-600">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold tracking-tight text-white">{value}</span>
        {unit && <span className="text-sm font-medium text-zinc-500">{unit}</span>}
      </div>
    </GlassCard>
  );
};
