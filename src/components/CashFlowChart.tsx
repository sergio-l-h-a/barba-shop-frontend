import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { cashFlowDailyData, cashFlowMonthlyData } from '../data/mockData';
import { TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';

export const CashFlowChart: React.FC = () => {
  const [viewMode, setViewMode] = useState<'daily' | 'monthly'>('daily');
  const [showExpenses, setShowExpenses] = useState(false);

  const data = viewMode === 'daily' ? cashFlowDailyData : cashFlowMonthlyData;

  const totalRealized = data.reduce((acc, cur) => acc + cur.realized, 0);
  const totalProjected = data.reduce((acc, cur) => acc + (cur.projected || cur.realized), 0);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(val);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-900/95 border border-zinc-700/80 p-3 rounded-xl shadow-2xl backdrop-blur-md text-xs space-y-2">
          <p className="font-bold text-zinc-100 border-b border-zinc-800 pb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            {label}
          </p>

          <div className="space-y-1 font-mono">
            {payload.map((item: any, idx: number) => {
              if (item.value === 0 && item.dataKey === 'realized') return null;
              return (
                <div key={idx} className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.name}:
                  </span>
                  <span className="font-bold text-zinc-100">
                    {formatCurrency(item.value)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 shadow-xl flex flex-col justify-between h-full">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-zinc-100">
              Fluxo de Caixa & Projeção
            </h3>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Linha sólida = Receita Realizada &bull; Linha tracejada = Previsão Projetada
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setShowExpenses(!showExpenses)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all border ${
              showExpenses
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-zinc-800/60 text-zinc-400 border-zinc-700/50 hover:text-zinc-200'
            }`}
          >
            {showExpenses ? 'Ocultar Despesas' : '+ Ver Despesas'}
          </button>

          <div className="bg-zinc-950 p-1 rounded-xl border border-zinc-800 flex items-center gap-1">
            <button
              onClick={() => setViewMode('daily')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'daily'
                  ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Visão Diária
            </button>
            <button
              onClick={() => setViewMode('monthly')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'monthly'
                  ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Visão Mensal
            </button>
          </div>
        </div>
      </div>

      {/* Mini summary row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-zinc-950/60 rounded-xl border border-zinc-800/80 mb-4">
        <div>
          <p className="text-[10px] text-zinc-400 font-semibold uppercase">Realizado</p>
          <p className="text-sm font-extrabold text-emerald-400 font-mono">
            {formatCurrency(totalRealized)}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-400 font-semibold uppercase">Projetado Total</p>
          <p className="text-sm font-extrabold text-zinc-100 font-mono flex items-center gap-1">
            {formatCurrency(totalProjected)}
            <ArrowUpRight className="w-3 h-3 text-emerald-400 inline" />
          </p>
        </div>
        <div className="hidden sm:block">
          <p className="text-[10px] text-zinc-400 font-semibold uppercase">Taxa de Conversão</p>
          <p className="text-sm font-extrabold text-cyan-400 font-mono">92.4%</p>
        </div>
      </div>

      {/* Recharts Render */}
      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRealized" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#27272a"
              vertical={false}
            />

            <XAxis
              dataKey="period"
              stroke="#71717a"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#27272a' }}
            />

            <YAxis
              stroke="#71717a"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#27272a' }}
              tickFormatter={(val) => `R$${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: '10px', fontSize: '11px' }}
            />

            {/* Realized Area / Line */}
            <Area
              type="monotone"
              dataKey="realized"
              name="Realizado (Confirmado)"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRealized)"
            />

            {/* Projected Line (Dashed) */}
            <Line
              type="monotone"
              dataKey="projected"
              name="Projetado (Agenda)"
              stroke="#34d399"
              strokeWidth={2}
              strokeDasharray="6 6"
              dot={{ r: 3, fill: '#34d399' }}
            />

            {/* Expenses Area (Optional toggle) */}
            {showExpenses && (
              <Area
                type="monotone"
                dataKey="expenses"
                name="Despesas Operacionais"
                stroke="#f43f5e"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorExpenses)"
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
