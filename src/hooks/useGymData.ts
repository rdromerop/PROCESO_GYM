'use client';
import { useState, useEffect } from 'react';

export interface UserStats {
  name: string;
  weight: number;
  height: number;
  age: number;
  targetWeight: number;
}

export interface DayRecord {
  date: string;
  completed: boolean;
  creatineGrams: number;
  calories: number;
}

export const useGymData = () => {
  const [stats, setStats] = useState<UserStats>({
    name: 'Rodrigo',
    weight: 110,
    height: 1.85,
    age: 22,
    targetWeight: 85,
  });

  const [records, setRecords] = useState<Record<string, DayRecord>>({});

  useEffect(() => {
    const savedStats = localStorage.getItem('gym-stats');
    const savedRecords = localStorage.getItem('gym-records');
    
    if (savedStats) setStats(JSON.parse(savedStats));
    if (savedRecords) setRecords(JSON.parse(savedRecords));
  }, []);

  const updateStats = (newStats: Partial<UserStats>) => {
    const updated = { ...stats, ...newStats };
    setStats(updated);
    localStorage.setItem('gym-stats', JSON.stringify(updated));
  };

  const toggleDay = (date: string) => {
    const newRecords = { ...records };
    if (newRecords[date]) {
      newRecords[date].completed = !newRecords[date].completed;
    } else {
      newRecords[date] = {
        date,
        completed: true,
        creatineGrams: 0,
        calories: 0
      };
    }
    setRecords(newRecords);
    localStorage.setItem('gym-records', JSON.stringify(newRecords));
  };

  const updateDayData = (date: string, data: Partial<DayRecord>) => {
    const newRecords = { ...records };
    newRecords[date] = {
      ...(newRecords[date] || { date, completed: false, creatineGrams: 0, calories: 0 }),
      ...data
    };
    setRecords(newRecords);
    localStorage.setItem('gym-records', JSON.stringify(newRecords));
  };

  // Streak logic
  const calculateStreak = () => {
    const today = new Date();
    let streak = 0;
    let current = new Date();
    
    while (true) {
      const dateStr = current.toISOString().split('T')[0];
      if (records[dateStr]?.completed) {
        streak++;
        current.setDate(current.getDate() - 1);
      } else {
        // Allow skip if it's today and not checked yet
        if (dateStr === today.toISOString().split('T')[0]) {
          current.setDate(current.getDate() - 1);
          continue;
        }
        break;
      }
      if (streak > 365) break; // safety
    }
    return streak;
  };

  return {
    stats,
    records,
    updateStats,
    toggleDay,
    updateDayData,
    streak: calculateStreak(),
  };
};
