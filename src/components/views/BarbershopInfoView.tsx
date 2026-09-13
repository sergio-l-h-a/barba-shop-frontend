import React from 'react';
import { ServiceCatalog, BarbershopBranch } from '../../types/barber';
import { Store, MapPin, Phone, Scissors, Clock } from 'lucide-react';

interface BarbershopInfoViewProps {
  branches: BarbershopBranch[];
  services: ServiceCatalog[];
}

export const BarbershopInfoView: React.FC<BarbershopInfoViewProps> = ({ branches, services }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-zinc-100 flex items-center gap-2">
          <Store className="w-5 h-5 text-emerald-400" />
          Unidades & Catálogo de Serviços
        </h2>
        <p className="text-xs text-zinc-400 mt-0.5">
          Informações da rede de barbearias e catálogo de preços de serviços
        </p>
      </div>

      {/* Unidades */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">
          Unidades Cadastradas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {branches.map((b) => (
            <div
              key={b.id}
              className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 space-y-3 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-100 text-sm">{b.name}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  {b.status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-zinc-400">
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  {b.address}, {b.city}
                </p>
                <p className="flex items-center gap-1.5 font-mono">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  {b.phone}
                </p>
                <p className="flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  {b.chairsActive} cadeiras ativas na bancada
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Catálogo de Serviços */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">
          Tabela de Serviços Oficial
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s) => (
            <div
              key={s.id}
              className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 flex items-start justify-between gap-4 shadow-xl"
            >
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-zinc-100 text-sm">{s.name}</h4>
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px] font-semibold">
                    {s.category}
                  </span>
                </div>
                <p className="text-xs text-zinc-400">{s.description}</p>
                <p className="text-[11px] text-zinc-500 flex items-center gap-1 mt-2">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  Duração estimada: {s.durationMinutes} minutos
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-lg font-extrabold text-emerald-400 font-mono">
                  R$ {s.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
