import React, { useState } from 'react';
import { Barber } from '../../types/barber';
import { Scissors, Star, Phone, Plus } from 'lucide-react';

interface BarbersViewProps {
  barbers: Barber[];
  onOpenNewAppointment: () => void;
}

export const BarbersView: React.FC<BarbersViewProps> = ({ barbers, onOpenNewAppointment }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = barbers.filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-zinc-100 flex items-center gap-2">
            <Scissors className="w-5 h-5 text-emerald-400 transform -rotate-45" />
            Equipe de Barbeiros
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Gestão de profissionais, cadeiras ativas, comissões e produtividade
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Buscar barbeiro ou especialidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 w-60"
          />
          <button
            onClick={onOpenNewAppointment}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            Novo Agendamento
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((b) => (
          <div
            key={b.id}
            className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 hover:border-emerald-500/40 transition-all shadow-xl flex flex-col justify-between space-y-4 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={b.avatar}
                    alt={b.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-emerald-500/50"
                  />
                  <span
                    className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-zinc-950 ${
                      b.status === 'atendendo'
                        ? 'bg-emerald-500 animate-pulse'
                        : b.status === 'disponivel'
                        ? 'bg-cyan-500'
                        : 'bg-amber-500'
                    }`}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100 text-sm">{b.name}</h3>
                  <p className="text-[11px] text-emerald-400 font-semibold">{b.nickname}</p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">
                Cadeira #{b.chairNumber}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-2 text-xs">
              <div className="flex justify-between items-center text-zinc-400">
                <span>Especialidade:</span>
                <span className="font-medium text-zinc-200 text-[11px] text-right truncate max-w-[130px]">
                  {b.specialty}
                </span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>Avaliação Média:</span>
                <span className="font-bold text-amber-400 flex items-center gap-1 font-mono">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {b.rating} ({b.reviewCount})
                </span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>Cortes Mês:</span>
                <span className="font-bold text-cyan-400 font-mono">
                  {b.appointmentsCount} cortes
                </span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>Faturamento:</span>
                <span className="font-bold text-emerald-400 font-mono">
                  R$ {b.monthlyRevenue.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between gap-2 text-xs">
              <span className="text-[11px] text-zinc-400 flex items-center gap-1 font-mono">
                <Phone className="w-3 h-3 text-emerald-400" />
                {b.phone}
              </span>
              <span className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 text-[10px] font-bold uppercase border border-emerald-500/20">
                {b.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
