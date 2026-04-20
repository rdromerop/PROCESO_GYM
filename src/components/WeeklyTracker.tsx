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
  const generateWeeks = () => {
    const weeks = [];
    const today = new Date();
    const startOffset = (today.getDay() === 0 ? 6 : today.getDay() - 1);
    const startDate = new Date();
    startDate.setDate(today.getDate() - startOffset - 21);

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
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          Asistencia & <span className="text-secondary">Creatina</span>
        </h2>
        <div className="glass px-4 py-2 rounded-xl flex items-center gap-2 border-primary/20 bg-primary/5 shadow-[0_0_15px_-5px_var(--primary)]">
          <span className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Racha Actual</span>
          <span className="text-xl font-bold text-primary">{streak} 🔥</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {weeks.map((week, idx) => (
          <GlassCard key={idx} className={`w-full ${idx === 0 ? 'card-orange' : ''}`}>
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
                      className="flex flex-col items-center gap-2 transition-all"
                    >
                      <span className={`text-xs font-bold ${isToday ? 'text-primary' : 'text-zinc-500'}`}>
                        {dayLabels[dIdx]}
                      </span>
                      
                      {/* Check Training */}
                      <button 
                        onClick={() => onToggle(dateStr)}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all ${
                          isCompleted 
                            ? 'bg-primary border-primary text-white shadow-[0_0_15px_-3px_rgba(249,115,22,0.5)]' 
                            : 'border-zinc-800 text-zinc-800 hover:border-zinc-700'
                        } ${isToday && !isCompleted ? 'border-primary/50' : ''}`}
                      >
                        {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={20} />}
                      </button>

                      {/* Check Creatine */}
                      <button 
                        onClick={() => onToggleCreatine(dateStr)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                          hasCreatine 
                            ? 'bg-secondary/20 border-secondary text-secondary' 
                            : 'border-zinc-800 text-zinc-800 hover:border-zinc-700'
                        }`}
                        title="Creatina 5g"
                      >
                        <Zap size={14} fill={hasCreatine ? "currentColor" : "none"} />
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
