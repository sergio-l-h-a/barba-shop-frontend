import React, { useState } from 'react';
import { useHeatmap } from '../hooks/useHeatmap';

import { HeatmapCell } from '../types/barber';
import { Flame, Info, Sparkles, TrendingUp } from 'lucide-react';

export const HeatmapMatrix: React.FC = () => {
  const [hoveredCell, setHoveredCell] = useState<HeatmapCell | null>(null);
  const { data: heatmapData, loading, error } = useHeatmap();

  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const hours = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];

  const getCellData = (day: string, hour: string): HeatmapCell => {
    return (
      heatmapData.find((c) => c.day === day && c.hour === hour) || {
        day,
        dayIndex: 0,
        hour,
        occupancy: 0,
        appointmentsCount: 0,
        totalSlots: 10,
        status: 'baixa'
      }
    );
  };

  const getCellColorClass = (occupancy: number) => {
    if (occupancy >= 90) {
      return 'bg-emerald-500 text-zinc-950 font-extrabold border-emerald-400 shadow-md shadow-emerald-500/25 ring-1 ring-emerald-300';
    }
    if (occupancy >= 70) {
      return 'bg-emerald-600/90 text-zinc-100 font-bold border-emerald-500/60 shadow-sm';
    }
    if (occupancy >= 45) {
      return 'bg-emerald-800/60 text-emerald-200 border-emerald-700/50';
    }
    if (occupancy >= 20) {
      return 'bg-emerald-950/70 text-emerald-400/90 border-emerald-900/40';
    }
    return 'bg-zinc-950 text-zinc-600 border-zinc-800/60';
  };

  return (
    <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 shadow-xl flex flex-col justify-between h-full relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Flame className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-zinc-100">
              Heatmap de Horários de Pico
            </h3>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Taxa de ocupação da barbearia por dia e horário da semana
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] text-emerald-400 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Pico Máximo: <strong>Sex & Sáb (16h - 18h)</strong></span>
        </div>
      </div>

      {/* Grid Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-center border-separate border-spacing-1.5">
          <thead>
            <tr>
              <th className="p-2 text-[10px] text-zinc-500 font-bold uppercase tracking-wider text-left w-16">
                Hora
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="p-2 text-xs font-bold text-zinc-300 bg-zinc-950/60 rounded-xl border border-zinc-800/60 min-w-[70px]"
                >
                  {day.slice(0, 3)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                <td className="p-1 text-xs font-mono font-bold text-zinc-400 text-left">
                  {hour}
                </td>
                {days.map((day) => {
                  const cell = getCellData(day, hour);
                  return (
                    <td
                      key={day + hour}
                      onMouseEnter={() => setHoveredCell(cell)}
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all duration-200 transform hover:scale-105 hover:z-10 ${getCellColorClass(
                        cell.occupancy
                      )}`}
                    >
                      <div className="flex flex-col items-center justify-center">
                        <span className="font-mono text-xs">{cell.occupancy}%</span>
                        <span className="text-[9px] opacity-75 font-sans">
                          {cell.appointmentsCount} agend.
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dynamic Detail Box on Hover */}
      {hoveredCell ? (
        <div className="mt-3 p-3 rounded-xl bg-zinc-950 border border-emerald-500/40 text-xs flex items-center justify-between text-zinc-200 animate-in fade-in duration-150 shadow-lg">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>
              <strong className="text-emerald-400">{hoveredCell.day} às {hoveredCell.hour}</strong>: Ocupação de{' '}
              <strong className="text-zinc-100">{hoveredCell.occupancy}%</strong> ({hoveredCell.appointmentsCount} de {hoveredCell.totalSlots} cadeiras ocupadas)
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
            {hoveredCell.occupancy >= 80 ? 'Demanda Crítica' : 'Ocupação Normal'}
          </span>
        </div>
      ) : (
        /* Legend Footer */
        <div className="mt-3 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400">
          <div className="flex items-center gap-1 text-zinc-500">
            <Info className="w-3.5 h-3.5" />
            <span>Passe o mouse sobre as células para detalhes</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px]">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-zinc-950 border border-zinc-800 inline-block" />
              0-20%
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-emerald-950 border border-emerald-900 inline-block" />
              21-45%
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-emerald-800 border border-emerald-700 inline-block" />
              46-70%
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-emerald-500 border border-emerald-400 inline-block" />
              90-100% (Pico)
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
