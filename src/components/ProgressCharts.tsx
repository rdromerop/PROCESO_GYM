'use client';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { GlassCard } from './GlassCard';

interface ProgressChartsProps {
  data: any[];
}

export const ProgressCharts = ({ data }: ProgressChartsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
      <GlassCard title="Pérdida de Peso (kg)" className="card-blue">
        <div style={{ height: '300px', width: '100%', marginTop: '1rem' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#71717a" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#71717a" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#121214', border: '1px solid #27272a', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.4)' }}
                itemStyle={{ color: '#fff' }}
              />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="var(--secondary)" 
                strokeWidth={3} 
                dot={{ fill: 'var(--secondary)', r: 4, strokeWidth: 2, stroke: '#000' }}
                activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard title="Consumo de Creatina (g)" className="card-orange">
        <div style={{ height: '300px', width: '100%', marginTop: '1rem' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#71717a" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#71717a" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#121214', border: '1px solid #27272a', borderRadius: '12px' }}
              />
              <Area 
                type="monotone" 
                dataKey="creatine" 
                stroke="var(--primary)" 
                fillOpacity={1}
                fill="url(#colorOrange)" 
                strokeWidth={3}
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};
