'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface UserStats {
  name: string;
  weight: number;
  height: number;
  age: number;
  targetWeight: number;
}

export interface WeightRecord {
  date: string;
  weight: number;
  loss: number;
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
  const [weightHistory, setWeightHistory] = useState<WeightRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Fetch Profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', 1)
          .single();
        
        if (profile) {
          setStats({
            name: profile.name,
            weight: profile.current_weight,
            height: profile.height,
            age: profile.age,
            targetWeight: profile.target_weight
          });
        }

        // 2. Fetch Records
        const { data: gymRecords } = await supabase
          .from('gym_records')
          .select('*');
        
        if (gymRecords) {
          const recordsMap: Record<string, DayRecord> = {};
          gymRecords.forEach(r => {
            recordsMap[r.date] = {
              date: r.date,
              completed: r.completed,
              creatineGrams: r.creatine_grams,
              calories: r.calories
            };
          });
          setRecords(recordsMap);
        }

        // 3. Fetch Weight History
        const { data: history } = await supabase
          .from('weight_history')
          .select('*')
          .order('date', { ascending: true });
        
        if (history) {
          setWeightHistory(history.map(h => ({
            date: new Date(h.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
            weight: h.weight,
            loss: h.loss
          })));
        }
      } catch (error) {
        console.error('Error fetching data from Supabase:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateStats = async (newStats: Partial<UserStats>) => {
    const updated = { ...stats, ...newStats };
    setStats(updated);

    try {
      await supabase.from('profiles').upsert({
        id: 1,
        name: updated.name,
        current_weight: updated.weight,
        height: updated.height,
        age: updated.age,
        target_weight: updated.targetWeight,
        updated_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating stats in Supabase:', error);
    }
  };

  const addWeightRecord = async (newWeight: number) => {
    const lastRecord = weightHistory[weightHistory.length - 1];
    const loss = lastRecord ? lastRecord.weight - newWeight : 0;
    const dateStr = new Date().toISOString().split('T')[0];
    
    const newRecord: WeightRecord = {
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
      weight: newWeight,
      loss: Number(loss.toFixed(1))
    };

    setWeightHistory(prev => [...prev, newRecord]);

    try {
      await supabase.from('weight_history').insert({
        date: dateStr,
        weight: newWeight,
        loss: Number(loss.toFixed(1))
      });
      
      // Also update current weight in stats
      await updateStats({ weight: newWeight });
    } catch (error) {
      console.error('Error adding weight record to Supabase:', error);
    }
  };

  const toggleDay = async (date: string) => {
    const newRecords = { ...records };
    const currentStatus = newRecords[date]?.completed || false;
    const newStatus = !currentStatus;

    if (newRecords[date]) {
      newRecords[date].completed = newStatus;
    } else {
      newRecords[date] = { date, completed: newStatus, creatineGrams: 0, calories: 0 };
    }
    
    setRecords({ ...newRecords });

    try {
      await supabase.from('gym_records').upsert({
        date: date,
        completed: newStatus,
        creatine_grams: newRecords[date].creatineGrams,
        calories: newRecords[date].calories
      });
    } catch (error) {
      console.error('Error toggling day in Supabase:', error);
    }
  };

  const toggleCreatine = async (date: string) => {
    const newRecords = { ...records };
    const currentGrams = newRecords[date]?.creatineGrams || 0;
    const newGrams = currentGrams === 5 ? 0 : 5;

    if (newRecords[date]) {
      newRecords[date].creatineGrams = newGrams;
    } else {
      newRecords[date] = { date, completed: false, creatineGrams: newGrams, calories: 0 };
    }
    
    setRecords({ ...newRecords });

    try {
      await supabase.from('gym_records').upsert({
        date: date,
        completed: newRecords[date].completed,
        creatine_grams: newGrams,
        calories: newRecords[date].calories
      });
    } catch (error) {
      console.error('Error toggling creatine in Supabase:', error);
    }
  };

  const updateDayData = async (date: string, data: Partial<DayRecord>) => {
    const newRecords = { ...records };
    newRecords[date] = {
      ...(newRecords[date] || { date, completed: false, creatineGrams: 0, calories: 0 }),
      ...data
    };
    setRecords({ ...newRecords });

    try {
      await supabase.from('gym_records').upsert({
        date: date,
        completed: newRecords[date].completed,
        creatine_grams: newRecords[date].creatineGrams,
        calories: newRecords[date].calories
      });
    } catch (error) {
      console.error('Error updating day data in Supabase:', error);
    }
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
        if (dateStr === today.toISOString().split('T')[0]) {
          current.setDate(current.getDate() - 1);
          continue;
        }
        break;
      }
      if (streak > 365) break;
    }
    return streak;
  };

  return {
    stats,
    records,
    weightHistory,
    updateStats,
    addWeightRecord,
    toggleDay,
    toggleCreatine,
    updateDayData,
    streak: calculateStreak(),
    loading
  };
};
