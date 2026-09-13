import React, { useState } from 'react';
import {
  Appointment,
  AppointmentStatus
} from '../types/barber';
import {
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
  Play,
  Check,
  UserX,
  Phone,
  Search,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface LiveAppointmentsListProps {
  appointments: Appointment[];
  onStatusChange: (id: string, newStatus: AppointmentStatus) => void;
  onSelectAppointment: (appointment: Appointment) => void;
  onNotifyWhatsApp: (appointment: Appointment) => void;
}

export const LiveAppointmentsList: React.FC<LiveAppointmentsListProps> = ({
  appointments,
  onStatusChange,
  onSelectAppointment,
  onNotifyWhatsApp
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAppointments = appointments.filter((apt) => {
    const matchesFilter =
      filterStatus === 'todos' ? true : apt.status === filterStatus;
    const matchesSearch =
      apt.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.barberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.service.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'ativo':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-extrabold border border-emerald-500/40 shadow-sm shadow-emerald-950 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            Ativo (Em Cadeira)
          </span>
        );
      case 'aguardando':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-extrabold border border-amber-500/30">
            <Clock className="w-3 h-3 text-amber-400" />
            Aguardando
          </span>
        );
      case 'concluido':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-400 text-xs font-bold border border-cyan-500/30">
            <CheckCircle2 className="w-3 h-3 text-cyan-400" />
            Concluído
          </span>
        );
      case 'faltou':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-400 text-xs font-extrabold border border-rose-500/30">
            <AlertCircle className="w-3 h-3 text-rose-400" />
            Faltou (No-Show)
          </span>
        );
      case 'confirmado':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700/50">
            Confirmado
          </span>
        );
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 shadow-xl flex flex-col justify-between h-full">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-zinc-100">
              Fila de Agendamentos de Hoje
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
              {appointments.length} Total
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Status em tempo real das cadeiras, recepção e histórico de atendimento
          </p>
        </div>

        {/* Filter Tabs & Search */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filtrar cliente ou barbeiro..."
              className="bg-zinc-950 border border-zinc-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 w-44 sm:w-52"
            />
          </div>

          <div className="bg-zinc-950 p-1 rounded-xl border border-zinc-800 flex items-center gap-1 overflow-x-auto">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'ativo', label: 'Ativos' },
              { id: 'aguardando', label: 'Em Espera' },
              { id: 'concluido', label: 'Concluídos' },
              { id: 'faltou', label: 'Faltaram' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filterStatus === tab.id
                    ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-zinc-800/80 bg-zinc-950/50">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-zinc-800/80 text-zinc-400 uppercase font-semibold text-[10px] tracking-wider bg-zinc-900/60">
              <th className="py-3 px-4">Horário</th>
              <th className="py-3 px-4">Cliente</th>
              <th className="py-3 px-4">Serviço & Comanda</th>
              <th className="py-3 px-4">Barbeiro</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Ações Rápidas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-zinc-500">
                  Nenhum agendamento encontrado para este filtro.
                </td>
              </tr>
            ) : (
              filteredAppointments.map((apt) => (
                <tr
                  key={apt.id}
                  className="hover:bg-zinc-800/40 transition-colors group cursor-pointer"
                  onClick={() => onSelectAppointment(apt)}
                >
                  {/* Horário */}
                  <td className="py-3.5 px-4 font-mono font-bold text-zinc-200 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{apt.time}</span>
                      <span className="text-[10px] text-zinc-500 font-normal">
                        ({apt.endTime})
                      </span>
                    </div>
                  </td>

                  {/* Cliente */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      {apt.clientAvatar ? (
                        <img
                          src={apt.clientAvatar}
                          alt={apt.clientName}
                          className="w-8 h-8 rounded-lg object-cover ring-1 ring-zinc-700 shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-zinc-100 truncate group-hover:text-emerald-400 transition-colors">
                            {apt.clientName}
                          </p>
                          {apt.clientIsVip && (
                            <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-extrabold flex items-center gap-0.5 shrink-0 border border-emerald-500/30">
                              <Sparkles className="w-2.5 h-2.5" />
                              VIP
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-zinc-400 font-mono">
                          {apt.clientPhone}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Serviço & Preço */}
                  <td className="py-3.5 px-4">
                    <div>
                      <p className="font-medium text-zinc-200">{apt.service}</p>
                      <div className="flex items-center gap-2 text-[10px] text-zinc-400 mt-0.5">
                        <span className="font-mono font-bold text-emerald-400">
                          R$ {apt.servicePrice.toFixed(2)}
                        </span>
                        {apt.products && apt.products.length > 0 && (
                          <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-cyan-300 font-mono">
                            +{apt.products.length} itens extra
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Barbeiro */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={apt.barberAvatar}
                        alt={apt.barberName}
                        className="w-7 h-7 rounded-lg object-cover ring-1 ring-zinc-700"
                      />
                      <span className="font-semibold text-zinc-300">
                        {apt.barberName}
                      </span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {getStatusBadge(apt.status)}
                  </td>

                  {/* Action Buttons */}
                  <td
                    className="py-3.5 px-4 text-right whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      {apt.status === 'aguardando' && (
                        <button
                          onClick={() => onStatusChange(apt.id, 'ativo')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-[11px] flex items-center gap-1 shadow-md shadow-emerald-500/20 transition-all"
                          title="Iniciar atendimento agora"
                        >
                          <Play className="w-3 h-3 fill-zinc-950" />
                          <span>Iniciar</span>
                        </button>
                      )}

                      {apt.status === 'ativo' && (
                        <button
                          onClick={() => onStatusChange(apt.id, 'concluido')}
                          className="px-2.5 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-[11px] flex items-center gap-1 shadow-md shadow-cyan-500/20 transition-all"
                          title="Finalizar e encerrar comanda"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Concluir</span>
                        </button>
                      )}

                      {(apt.status === 'confirmado' || apt.status === 'aguardando') && (
                        <button
                          onClick={() => onStatusChange(apt.id, 'faltou')}
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 border border-zinc-700/50 transition-colors"
                          title="Marcar como No-Show (Faltou)"
                        >
                          <UserX className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => onNotifyWhatsApp(apt)}
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-emerald-500/20 text-zinc-400 hover:text-emerald-400 border border-zinc-700/50 transition-colors"
                        title="Enviar lembrete via WhatsApp"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onSelectAppointment(apt)}
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700/50 transition-colors"
                        title="Ver Comanda Completa"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
