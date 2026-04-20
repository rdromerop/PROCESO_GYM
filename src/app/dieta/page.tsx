'use client';
import React from 'react';
import { DietSection } from '@/components/DietSection';

export default function DietaPage() {
  return (
    <main className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold text-white">Plan de Alimentación</h1>
        <p className="text-zinc-500">Combustible diseñado para perder peso y ganar masa magra.</p>
      </header>
      
      <DietSection />
    </main>
  );
}
