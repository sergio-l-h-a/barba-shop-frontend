import React from 'react';
import {
  DollarSign,
  CalendarCheck,
  Receipt,
  UserX,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Info
} from 'lucide-react';

interface KPICardsProps {
  todayAppointmentsCount: number;
  totalSlotsToday: number;
}

export const KPICards: React.FC<KPICardsProps> = ({
  todayAppointmentsCount,
  totalSlotsToday
}) => {
  const percentageToday = Math.round(
    (todayAppointmentsCount / totalSlotsToday) * 100
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* KPI 1: Faturamento do Mês */}
      <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 hover:border-emerald-500/40 transition-all duration-300 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all pointer-events-none" />
        
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Faturamento do Mês
          </span>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-2xl font-extrabold text-zinc-100 tracking-tight font-mono">
              R$ 48.750,00
            </h3>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +18.4%
            </span>
          </div>
          
          <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400 border-t border-zinc-800/60 pt-2.5">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <TrendingUp className="w-3 h-3" />
              Meta batida
            </span>
            <span className="text-zinc-500">vs R$ 41.170 (Mês ant.)</span>
          </div>
        </div>
      </div>

      {/* KPI 2: Agendamentos de Hoje */}
      <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 hover:border-emerald-500/40 transition-all duration-300 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all pointer-events-none" />

        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Agendamentos de Hoje
          </span>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
            <CalendarCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-2xl font-extrabold text-zinc-100 tracking-tight font-mono">
              {todayAppointmentsCount}/{totalSlotsToday} <span className="text-xs text-zinc-400 font-sans font-normal">slots</span>
            </h3>
            <span className="text-xs font-bold text-emerald-400 font-mono">
              {percentageToday}% lotado
            </span>
          </div>

          {/* Barra de Progresso Customizada */}
          <div className="mt-2.5 w-full bg-zinc-800 rounded-full h-2.5 overflow-hidden p-0.5 border border-zinc-700/50">
            <div
              className="bg-gradient-to-r from-emerald-500 to-emerald-300 h-full rounded-full transition-all duration-500 shadow-[0_0_12px_#10b981]"
              style={{ width: `${percentageToday}%` }}
            />
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[11px] text-zinc-400">
            <span className="text-zinc-400 flex items-center gap-1">
              <Info className="w-3 h-3 text-emerald-400" />
              Pico de demanda: <strong className="text-zinc-200">16h às 19h</strong>
            </span>
            <span className="text-emerald-400 font-semibold">{totalSlotsToday - todayAppointmentsCount} vago</span>
          </div>
        </div>
      </div>

      {/* KPI 3: Ticket Médio */}
      <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 hover:border-emerald-500/40 transition-all duration-300 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all pointer-events-none" />

        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Ticket Médio
          </span>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
            <Receipt className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-2xl font-extrabold text-zinc-100 tracking-tight font-mono">
              R$ 112,50
            </h3>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +5.2%
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400 border-t border-zinc-800/60 pt-2.5">
            <span>Serviços: <strong className="text-zinc-200">R$ 88</strong></span>
            <span>Produtos: <strong className="text-emerald-400">R$ 24,50</strong></span>
          </div>
        </div>
      </div>

      {/* KPI 4: Taxa de No-Show */}
      <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 hover:border-emerald-500/40 transition-all duration-300 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all pointer-events-none" />

        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Taxa de No-Show
          </span>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
            <UserX className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-2xl font-extrabold text-zinc-100 tracking-tight font-mono">
              4,2%
            </h3>
            
            {/* Indicador visual de alerta */}
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 shadow-sm shadow-emerald-950">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Excelente (&lt;5%)
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400 border-t border-zinc-800/60 pt-2.5">
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              -1.8% de faltas
            </span>
            <span className="text-zinc-500">Lembretes Zap Ativos</span>
          </div>
        </div>
      </div>
    </div>
  );
};
