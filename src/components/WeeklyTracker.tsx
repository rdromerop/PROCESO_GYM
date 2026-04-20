'use client';
import React from 'react';
import { GlassCard } from './GlassCard';
import { CheckCircle2, Circle } from 'lucide-react';

interface WeeklyTrackerProps {
  records: Record<string, { completed: boolean }>;
  onToggle: (date: string) => void;
  streak: number;
}

export const WeeklyTracker = ({ records, onToggle, streak }: WeeklyTrackerProps) => {
  // Generate 4 weeks (28 days) ending today
  const generateWeeks = () => {
    const weeks = [];
    const today = new Date();
    // Start from the most recent Monday
    const startOffset = (today.getDay() === 0 ? 6 : today.getDay() - 1);
    const startDate = new Date();
    startDate.setDate(today.getDate() - startOffset - 21); // Show last 4 weeks

    for (let w = 0; w < 4; w++) {
      const weekDays = [];
      for (let d = 0; d < 7; d++) {
        const current = new Date(startDate);
        current.setDate(startDate.getDate() + (w * 7) + d);
        weekDays.push(current);
      }
      weeks.push({
        number: 4 - w, // Display as Week 4 (current), Week 3, etc.
        days: weekDays
      });
    }
    return weeks.reverse(); // Current week first
  };

  const weeks = generateWeeks();
  const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Progreso Semanal</h2>
        <div className="glass px-4 py-2 rounded-lg flex items-center gap-2">
          <span className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Racha Actual</span>
          <span className="text-xl font-bold text-white">{streak} 🔥</span>
        </div>
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
                  const isCompleted = records[dateStr]?.completed;
                  const isToday = dateStr === new Date().toISOString().split('T')[0];

                  return (
                    <div 
                      key={dateStr} 
                      className="flex flex-col items-center gap-2 cursor-pointer transition-all hover:scale-105"
                      onClick={() => onToggle(dateStr)}
                    >
                      <span className={`text-xs font-bold ${isToday ? 'text-white' : 'text-zinc-500'}`}>
                        {dayLabels[dIdx]}
                      </span>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all ${
                        isCompleted 
                          ? 'bg-zinc-100 border-zinc-100 text-black' 
                          : 'border-zinc-800 text-zinc-800'
                      } ${isToday ? 'border-zinc-500' : ''}`}>
                        {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={20} />}
                      </div>
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
