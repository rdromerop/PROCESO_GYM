'use client';
import React from 'react';
import { WeeklyTracker } from '@/components/WeeklyTracker';
import { useGymData } from '@/hooks/useGymData';

export default function AsistenciaPage() {
  const { records, toggleDay, toggleCreatine, streak } = useGymData();

  return (
    <main className="flex flex-col gap-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Hábito de <span className="text-primary">Entrenamiento</span></h1>
        <p className="text-zinc-500">Mantén tu racha activa marcando tus días de entrenamiento y toma de creatina.</p>
      </header>
      
      <div className="max-w-4xl">
        <WeeklyTracker 
          records={records} 
          onToggle={toggleDay} 
          onToggleCreatine={toggleCreatine}
          streak={streak} 
        />
      </div>
    </main>
  );
}
