'use client';
import React, { useState } from 'react';
import { useGymData } from '@/hooks/useGymData';
import { GlassCard } from '@/components/GlassCard';
import { User, Weight, Ruler, Calendar as AgeIcon, Target } from 'lucide-react';

export default function PerfilPage() {
  const { stats, updateStats } = useGymData();
  const [formData, setFormData] = React.useState(stats);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStats(formData);
    alert('¡Perfil actualizado con éxito!');
  };

  return (
    <main className="flex flex-col gap-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Mi <span className="text-primary">Perfil</span></h1>
        <p className="text-zinc-500">Configura tus datos personales y metas de entrenamiento.</p>
      </header>

      <div className="max-w-2xl">
        <GlassCard className="card-orange">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Nombre del Atleta</label>
              <div className="flex items-center gap-3">
                <User className="text-primary" size={20} />
                <input 
                  type="text" 
                  className="flex-1 w-full"
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Edad</label>
                <div className="flex items-center gap-3">
                  <AgeIcon className="text-zinc-500" size={20} />
                  <input 
                    type="number" 
                    className="flex-1 w-full"
                    value={formData.age} 
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })} 
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Altura (m)</label>
                <div className="flex items-center gap-3">
                  <Ruler className="text-zinc-600" size={20} />
                  <input 
                    type="number" 
                    step="0.01"
                    className="flex-1 w-full"
                    value={formData.height} 
                    onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })} 
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Peso de Inicio (kg)</label>
                <div className="flex items-center gap-3">
                  <Weight className="text-primary" size={20} />
                  <input 
                    type="number" 
                    className="flex-1 w-full"
                    value={formData.weight} 
                    onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })} 
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Meta de Peso (kg)</label>
                <div className="flex items-center gap-3">
                  <Target className="text-secondary" size={20} />
                  <input 
                    type="number" 
                    className="flex-1 w-full"
                    value={formData.targetWeight} 
                    onChange={(e) => setFormData({ ...formData, targetWeight: Number(e.target.value) })} 
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="primary w-full py-4 text-lg"
            >
              Guardar Configuración
            </button>
          </form>
        </GlassCard>
      </div>
    </main>
  );
}
