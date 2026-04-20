'use client';
import React from 'react';
import { StatCard } from '@/components/StatCard';
import { WeeklyTracker } from '@/components/WeeklyTracker';
import { ProgressCharts } from '@/components/ProgressCharts';
import { DietSection } from '@/components/DietSection';
import { useGymData } from '@/hooks/useGymData';
import { Weight, Ruler, User as UserIcon, Target } from 'lucide-react';

export default function Dashboard() {
  const { stats, records, toggleDay, streak } = useGymData();

  // Mock data for charts if records are empty
  const chartData = [
    { date: '14 Abr', weight: 112, creatine: 5 },
    { date: '15 Abr', weight: 111.5, creatine: 5 },
    { date: '16 Abr', weight: 111.2, creatine: 0 },
    { date: '17 Abr', weight: 110.8, creatine: 5 },
    { date: '18 Abr', weight: 110.5, creatine: 5 },
    { date: '19 Abr', weight: 110.2, creatine: 5 },
    { date: '20 Abr', weight: stats.weight, creatine: 5 },
  ];

  return (
    <main className="flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-white">¡Hola, {stats.name}!</h1>
        <p className="text-zinc-500">Aquí está el resumen de tu proceso para hoy.</p>
      </header>

      {/* Stats Overview */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          label="Peso Actual" 
          value={stats.weight} 
          unit="kg" 
          icon={<Weight size={18} />} 
        />
        <StatCard 
          label="Altura" 
          value={stats.height} 
          unit="m" 
          icon={<Ruler size={18} />} 
        />
        <StatCard 
          label="Edad" 
          value={stats.age} 
          unit="años" 
          icon={<UserIcon size={18} />} 
        />
        <StatCard 
          label="Meta" 
          value={stats.targetWeight} 
          unit="kg" 
          icon={<Target size={18} />} 
        />
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 flex flex-col gap-8">
          <WeeklyTracker 
            records={records} 
            onToggle={toggleDay} 
            streak={streak} 
          />
          <ProgressCharts data={chartData} />
        </div>

        <div className="flex flex-col gap-8">
          <DietSection />
        </div>
      </div>
    </main>
  );
}
