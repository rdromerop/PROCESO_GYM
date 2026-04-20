'use client';
import React from 'react';
import { StatCard } from '@/components/StatCard';
import { WeeklyTracker } from '@/components/WeeklyTracker';
import { ProgressCharts } from '@/components/ProgressCharts';
import { DietSection } from '@/components/DietSection';
import { useGymData } from '@/hooks/useGymData';
import { Weight, Ruler, User as UserIcon, Target } from 'lucide-react';

export default function Dashboard() {
  const { stats, records, weightHistory, toggleDay, toggleCreatine, addWeightRecord, streak } = useGymData();
  const [isEditingWeight, setIsEditingWeight] = React.useState(false);
  const [newWeight, setNewWeight] = React.useState(stats.weight);

  const handleWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWeightRecord(newWeight);
    setIsEditingWeight(false);
  };

  // Map history to chart format
  const chartData = weightHistory.length > 0 
    ? weightHistory.map(h => ({ ...h, creatine: 5 })) // Just for viz
    : [{ date: 'Hoy', weight: stats.weight, creatine: 5 }];

  const lastWeightLoss = weightHistory[weightHistory.length - 1]?.loss || 0;

  return (
    <main className="flex flex-col gap-8 animate-fade-in">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-white uppercase tracking-tight">
          ¡Hola, <span className="text-primary">{stats.name}</span>!
        </h1>
        <p className="text-zinc-500">
          {lastWeightLoss > 0 
            ? `🔥 ¡Excelente! Bajaste ${lastWeightLoss} kg respecto al lunes anterior.` 
            : 'Tu proceso diario bajo control.'}
        </p>
      </header>

      {/* Stats Overview */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          label="Peso Actual" 
          value={stats.weight} 
          unit="kg" 
          action={
            isEditingWeight ? (
              <form onSubmit={handleWeightSubmit} className="flex gap-2">
                <input 
                  type="number" 
                  autoFocus
                  className="w-20 p-1 text-sm rounded bg-zinc-800 border-zinc-700"
                  value={newWeight}
                  onChange={(e) => setNewWeight(Number(e.target.value))}
                />
                <button type="submit" className="text-xs bg-primary text-white px-2 rounded font-bold">OK</button>
              </form>
            ) : (
              <button 
                onClick={() => setIsEditingWeight(true)}
                className="text-xs bg-zinc-800 text-zinc-400 hover:text-white px-2 py-1 rounded transition-colors"
                style={{ border: '1px solid var(--border)' }}
              >
                Editar
              </button>
            )
          }
        />
        <StatCard label="Altura" value={stats.height} unit="m" icon={<Ruler size={18} />} />
        <StatCard label="Edad" value={stats.age} unit="años" icon={<UserIcon size={18} />} />
        <StatCard label="Meta" value={stats.targetWeight} unit="kg" icon={<Target size={18} color="var(--primary)" />} />
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 flex flex-col gap-8">
          <WeeklyTracker 
            records={records} 
            onToggle={toggleDay} 
            onToggleCreatine={toggleCreatine}
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
