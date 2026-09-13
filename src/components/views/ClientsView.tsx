import React, { useState } from 'react';
import { Client } from '../../types/barber';
import { Users, Search, Sparkles, Mail, Crown } from 'lucide-react';

interface ClientsViewProps {
  clients: Client[];
}

export const ClientsView: React.FC<ClientsViewProps> = ({ clients }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [onlyVip, setOnlyVip] = useState(false);

  const filtered = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVip = onlyVip ? c.isVip || c.clubMember : true;
    return matchesSearch && matchesVip;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-zinc-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            CRM & Base de Clientes
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Gerencie o histórico de visitas, programa de fidelidade VIP e preferências
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setOnlyVip(!onlyVip)}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
              onlyVip
                ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-100'
            }`}
          >
            <Crown className="w-4 h-4" />
            Apenas Assinantes VIP
          </button>

          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nome, telefone ou e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 w-64"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 hover:border-emerald-500/40 transition-all shadow-xl space-y-4 relative overflow-hidden"
          >
            {c.isVip && (
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
            )}

            <div className="flex items-center gap-3">
              <img
                src={c.avatar}
                alt={c.name}
                className="w-12 h-12 rounded-xl object-cover ring-1 ring-emerald-500/40"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-zinc-100 text-sm truncate">{c.name}</h3>
                  {c.isVip && (
                    <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-extrabold flex items-center gap-0.5 border border-emerald-500/30 shrink-0">
                      <Sparkles className="w-2.5 h-2.5" />
                      VIP
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-zinc-400 font-mono mt-0.5">{c.phone}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-zinc-400">
                <span className="font-sans">Total de Visitas:</span>
                <span className="font-bold text-cyan-400">{c.totalVisits} visitas</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span className="font-sans">Total Gasto:</span>
                <span className="font-bold text-emerald-400">R$ {c.totalSpent.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span className="font-sans">Barbeiro Favorito:</span>
                <span className="font-sans font-medium text-zinc-200 truncate max-w-[130px]">
                  {c.preferredBarber.split(' ')[0]}
                </span>
              </div>
            </div>

            {c.notes && (
              <p className="text-[11px] text-zinc-400 italic bg-zinc-950/40 p-2 rounded-lg border border-zinc-800/50">
                "{c.notes}"
              </p>
            )}

            <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-emerald-400" />
                {c.email}
              </span>
              <span>Última: {c.lastVisit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
