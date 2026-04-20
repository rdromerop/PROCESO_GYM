'use client';
import React from 'react';
import { GlassCard } from './GlassCard';
import { CheckCircle2, Circle, Zap } from 'lucide-react';
import { DayRecord } from '@/hooks/useGymData';

interface WeeklyTrackerProps {
  records: Record<string, DayRecord>;
  onToggle: (date: string) => void;
  onToggleCreatine: (date: string) => void;
  streak: number;
}

export const WeeklyTracker = ({ records, onToggle, onToggleCreatine, streak }: WeeklyTrackerProps) => {
  const [monthOffset, setMonthOffset] = React.useState(0);

  const getMonthNames = () => {
    const names = [];
    for (let i = 0; i < 4; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const name = date.toLocaleDateString('es-ES', { month: 'long' });
      names.push({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        offset: i
      });
    }
    return names;
  };

  const monthNames = getMonthNames();

  const generateWeeks = () => {
    const weeks = [];
    const today = new Date();
    const startOffset = (today.getDay() === 0 ? 6 : today.getDay() - 1);
    const startDate = new Date();
    // Ajustamos la fecha base según el monthOffset (cada mes son 28 días / 4 semanas)
    startDate.setDate(today.getDate() - startOffset - 21 - (monthOffset * 28));

    for (let w = 0; w < 4; w++) {
      const weekDays = [];
      for (let d = 0; d < 7; d++) {
        const current = new Date(startDate);
        current.setDate(startDate.getDate() + (w * 7) + d);
        weekDays.push(current);
      }
      weeks.push({
        number: 4 - w,
        days: weekDays
      });
    }
    return weeks.reverse();
  };

  const weeks = generateWeeks();
  const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Asistencia & <span className="text-primary">Creatina</span>
          </h2>
          <p className="text-zinc-500 text-xs">Visualizando {monthNames[monthOffset].name}</p>
        </div>
        <div className="glass px-4 py-2 rounded-xl flex items-center gap-2 border-secondary/20 bg-secondary/5 shadow-[0_0_15px_-5px_var(--secondary)]">
          <span className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Racha Actual</span>
          <span className="text-xl font-bold text-secondary">{streak} 🔥</span>
        </div>
      </div>

      {/* Menú de Meses */}
      <div className="flex items-center gap-2 p-1 bg-zinc-900/50 rounded-2xl border border-zinc-800/50 w-fit">
        {monthNames.map((m) => (
          <button
            key={m.offset}
            onClick={() => setMonthOffset(m.offset)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              monthOffset === m.offset
                ? 'bg-secondary text-white shadow-lg'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {m.name}
          </button>
        )).reverse()}
      </div>

      <div className="flex flex-col gap-4">
        {weeks.map((week, idx) => (
          <GlassCard key={idx} className="w-full">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-xs text-zinc-500 uppercase font-bold">Semana</span>
                <span className="text-2xl font-bold text-white">0{idx + 1}</span>
              </div>
              
              <div className="flex-1 flex justify-between items-center gap-2">
                {week.days.map((day, dIdx) => {
                  const dateStr = day.toISOString().split('T')[0];
                  const record = records[dateStr];
                  const isCompleted = record?.completed;
                  const hasCreatine = record?.creatineGrams === 5;
                  const isToday = dateStr === new Date().toISOString().split('T')[0];

                  return (
                    <div 
                      key={dateStr} 
                      className="flex flex-col items-center gap-3 transition-all"
                    >
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isToday ? 'text-secondary' : 'text-zinc-600'}`}>
                        {dayLabels[dIdx]}
                      </span>
                      
                      {/* Check Training - Solo círculo con brillo azul intenso */}
                      <button 
                        onClick={() => onToggle(dateStr)}
                        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                          isCompleted 
                            ? 'bg-secondary text-white shadow-[0_0_20px_2px_rgba(14,165,233,0.6)] scale-110' 
                            : 'bg-zinc-900/80 border border-zinc-800 text-transparent hover:border-secondary/40'
                        } ${isToday && !isCompleted ? 'border-secondary' : ''}`}
                      >
                        {isCompleted && <CheckCircle2 size={24} strokeWidth={3} />}
                      </button>

                      {/* Check Creatine - Minimalista */}
                      <button 
                        onClick={() => onToggleCreatine(dateStr)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          hasCreatine 
                            ? 'bg-primary/20 text-primary' 
                            : 'text-zinc-800 hover:text-zinc-700'
                        }`}
                        title="Creatina 5g"
                      >
                        <Zap size={14} fill={hasCreatine ? "currentColor" : "none"} strokeWidth={3} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
