'use client';
import React from 'react';
import { ProgressCharts } from '@/components/ProgressCharts';
import { useGymData } from '@/hooks/useGymData';
import { GlassCard } from '@/components/GlassCard';

export default function ProgresoPage() {
  const { weightHistory } = useGymData();

  // Map history to chart format
  const chartData = weightHistory.length > 0 
    ? weightHistory.map(h => ({ ...h, creatine: 5 }))
    : [{ date: 'Inicio', weight: 110, creatine: 5 }];

  return (
    <main className="flex flex-col gap-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Análisis de <span className="text-secondary">Progreso</span></h1>
        <p className="text-zinc-500">Visualiza tu evolución semanal de peso y suplementación.</p>
      </header>
      
      <ProgressCharts data={chartData} />

      <GlassCard title="Historial de Registros" className="card-blue">
        <div className="flex flex-col gap-2 mt-4">
          <div className="grid grid-cols-3 text-xs font-bold text-zinc-500 uppercase tracking-wider px-4 mb-2">
            <span>Fecha</span>
            <span>Peso</span>
            <span>Evolución</span>
          </div>
          {weightHistory.map((record, idx) => (
            <div key={idx} className="grid grid-cols-3 items-center p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/50 hover:border-secondary/30 transition-all">
              <span className="text-sm font-medium text-zinc-400">{record.date}</span>
              <span className="text-lg font-bold text-white">{record.weight} kg</span>
              <span className={`text-sm font-bold flex items-center gap-1 ${record.loss > 0 ? 'text-primary' : record.loss < 0 ? 'text-blue-400' : 'text-zinc-500'}`}>
                {record.loss > 0 ? `-${record.loss} kg 🔥` : record.loss < 0 ? `+${Math.abs(record.loss)} kg` : 'Estable'}
              </span>
            </div>
          ))}
          {weightHistory.length === 0 && (
            <div className="text-center py-8 text-zinc-500 text-sm">
              Aún no hay registros de peso. Comienza ajustando tu peso en el dashboard.
            </div>
          )}
        </div>
      </GlassCard>
    </main>
  );
}
