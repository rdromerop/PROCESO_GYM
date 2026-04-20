import React from 'react';
import { GlassCard } from './GlassCard';
import { Apple, Coffee, UtensilsCrossed, Zap } from 'lucide-react';

export const DietSection = () => {
  const snacks = [
    { name: 'Frutos Secos', calories: '150 kcal', icon: <Apple size={16} /> },
    { name: 'Yogur Griego', calories: '120 kcal', icon: <Coffee size={16} /> },
    { name: 'Manzana con Crema de Maní', calories: '200 kcal', icon: <Apple size={16} /> },
    { name: 'Proteína en Polvo', calories: '110 kcal', icon: <Zap size={16} /> },
  ];

  const meals = [
    { time: '08:00', name: 'Desayuno Proteico', desc: '4 huevos, avena y frutillas' },
    { time: '13:00', name: 'Almuerzo Magro', desc: 'Pechuga de pollo, arroz integral y brócoli' },
    { time: '17:00', name: 'Pre-Entreno', desc: 'Banana y Café negro' },
    { time: '21:00', name: 'Cena Ligera', desc: 'Pescado blanco y ensalada verde' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <GlassCard title="Plan de Alimentación" className="lg:col-span-2">
        <div className="flex flex-col gap-4 mt-2">
          {meals.map((meal, idx) => (
            <div key={idx} className="flex gap-4 p-3 rounded-lg hover:bg-zinc-900 transition-colors">
              <div className="text-sm font-bold text-zinc-500 w-12 pt-1">{meal.time}</div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-white">{meal.name}</span>
                <span className="text-sm text-zinc-500">{meal.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard title="Snacks Permitidos">
        <div className="flex flex-col gap-3 mt-2">
          {snacks.map((snack, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-900/50">
              <div className="flex items-center gap-3">
                <div className="text-zinc-500">{snack.icon}</div>
                <span className="text-sm font-medium text-white">{snack.name}</span>
              </div>
              <span className="text-xs font-bold text-zinc-600">{snack.calories}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
