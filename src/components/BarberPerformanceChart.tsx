import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';
import { useBarberPerformance } from '../hooks/useBarberPerformance';

import { Scissors, Star, DollarSign, Users, Award } from 'lucide-react';

export const BarberPerformanceChart: React.FC = () => {
  const [metric, setMetric] = useState<'revenue' | 'appointments' | 'rating'>('revenue');
  const { data: barbers, loading, error } = useBarberPerformance();
  
  // Format data for chart
  const chartData = barbers.map((b) => ({
    name: b.name.split(' ')[0] + ' ' + (b.nickname || ''),
    fullName: b.name,
    avatar: b.avatar,
    revenue: b.monthlyRevenue,
    appointments: b.appointmentsCount,
    rating: b.rating,
    specialty: b.specialty,
    status: b.status,
    chairNumber: b.chairNumber
  }));

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(val);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-zinc-900/95 border border-zinc-700/80 p-3 rounded-xl shadow-2xl backdrop-blur-md text-xs space-y-2">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-1.5">
            <img
              src={data.avatar}
              alt={data.fullName}
              className="w-7 h-7 rounded-lg object-cover ring-1 ring-emerald-500"
            />
            <div>
              <p className="font-bold text-zinc-100">{data.fullName}</p>
              <p className="text-[10px] text-zinc-400">{data.specialty}</p>
            </div>
          </div>

          <div className="space-y-1 font-mono text-xs">
            <div className="flex items-center justify-between gap-3 text-emerald-400">
              <span>Faturamento:</span>
              <span className="font-bold">{formatCurrency(data.revenue)}</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-cyan-400">
              <span>Atendimentos:</span>
              <span className="font-bold">{data.appointments} cortes</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-amber-400">
              <span>Avaliação:</span>
              <span className="font-bold flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
                {data.rating.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  
  if (loading) return <div>Carregando desempenho...</div>;
  if (error) return <div>Erro ao carregar: {error}</div>;

  return (
    <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 shadow-xl flex flex-col justify-between h-full">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Scissors className="w-4 h-4 transform -rotate-45" />
            </div>
            <h3 className="text-base font-bold text-zinc-100">
              Desempenho dos Barbeiros
            </h3>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Ranking individual de produção, receita e nota dos clientes
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="bg-zinc-950 p-1 rounded-xl border border-zinc-800 flex items-center gap-1 self-start sm:self-auto">
          <button
            onClick={() => setMetric('revenue')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              metric === 'revenue'
                ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Faturamento</span>
          </button>
          <button
            onClick={() => setMetric('appointments')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              metric === 'appointments'
                ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Atendimentos</span>
          </button>
          <button
            onClick={() => setMetric('rating')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              metric === 'rating'
                ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Avaliação</span>
          </button>
        </div>
      </div>

      {/* Horizontal Bar Chart Render */}
      <div className="w-full h-52 sm:h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
            <XAxis
              type="number"
              stroke="#71717a"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#27272a' }}
              tickFormatter={(val) => {
                if (metric === 'revenue') return `R$${(val / 1000).toFixed(0)}k`;
                if (metric === 'rating') return val.toFixed(1);
                return val;
              }}
              domain={metric === 'rating' ? [4, 5] : [0, 'auto']}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#d4d4d8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#27272a' }}
              width={110}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey={metric} radius={[0, 8, 8, 0]} barSize={22}>
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    index === 0
                      ? '#10b981' // Top barber emerald
                      : index === 1
                      ? '#34d399'
                      : index === 2
                      ? '#059669'
                      : '#047857'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Barber Cards Mini List */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-zinc-800/80">
        {barbers.map((b, idx) => (
          <div
            key={b.id}
            className="p-2 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex items-center gap-2"
          >
            <div className="relative shrink-0">
              <img
                src={b.avatar}
                alt={b.name}
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-zinc-700"
              />
              {idx === 0 && (
                <Award className="w-3.5 h-3.5 text-amber-400 absolute -top-1 -right-1 fill-amber-400 drop-shadow" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold text-zinc-200 truncate">
                {b.name.split(' ')[0]}
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                <span className="text-emerald-400 font-mono font-semibold">
                  {formatCurrency(b.monthlyRevenue)}
                </span>
                <span>&bull;</span>
                <span className="flex items-center text-amber-400 font-bold">
                  <Star className="w-2.5 h-2.5 fill-amber-400 inline mr-0.5" />
                  {b.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
