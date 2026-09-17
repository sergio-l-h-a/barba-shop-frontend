import React, { useState, useEffect } from 'react';
import { Barber, ServiceCatalog, Appointment } from '../types/barber_new';
import { X, Calendar, Clock, User, Scissors, DollarSign, Check, Phone } from 'lucide-react';
import { apiService } from '@/services/api';

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAppointment: (appointment: Appointment) => void;
  barbeariaId: number; // importante para o backend
}

export const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({
  isOpen,
  onClose,
  onAddAppointment,
  barbeariaId
}) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedBarberId, setSelectedBarberId] = useState<number | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [time, setTime] = useState('15:30');
  const [isVip, setIsVip] = useState(false);
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cartão' | 'PIX' | 'Dinheiro' | 'Clube Assinatura'>('PIX');

  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [services, setServices] = useState<ServiceCatalog[]>([]);

  useEffect(() => {
    apiService.getBarbeiros().then(setBarbers);
    apiService.getServicos().then(setServices);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName.trim() || !clientPhone.trim()) return;

    // 1. Criar cliente no backend
    const clienteCriado = await apiService.createCliente({
      nome: clientName,
      telefone: clientPhone,
      observacoes: notes,
      barbeariaId
    });

    const clienteId = clienteCriado.id;

    // 2. Criar agendamento no backend
    await apiService.createAgendamento({
      clienteId,
      barbeiroId: Number(selectedBarberId),
      servicoId: Number(selectedServiceId),
      data: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      horario: time,
      status: 'pendente',
      observacoes: notes,
      barbeariaId
    });

    // 3. Atualizar estado local (opcional)
    const selectedBarber = barbers.find((b) => b.id === selectedBarberId);
    const selectedService = services.find((s) => s.id === selectedServiceId);

    onAddAppointment({
      id: Date.now(), // ID temporário, o backend deve retornar o real
      clientName,
      clientPhone,
      clientIsVip: isVip,
      time,
      endTime: '', // pode ser calculado depois
      service: selectedService?.nome || '',
      servicePrice: selectedService?.preco || 0,
      barbeiroId: selectedBarber?.id || 0,
      barberName: selectedBarber?.nome || '',
      barberAvatar: selectedBarber?.avatar || '',
      status: 'pendente',
      notes,
      paymentMethod,
      clienteId: 0,
      servicoId: 0,
      data: '',
      horario: '',
      barbeariaId: 0,
      criadoEm: ''
    });

    // 4. Limpar modal
    setClientName('');
    setClientPhone('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-100">Novo Agendamento</h3>
              <p className="text-xs text-zinc-400">Cadastrar cliente no fluxo de caixa da unidade</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">

          {/* Cliente */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                Nome do Cliente *
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                Telefone *
              </label>
              <input
                type="text"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 font-mono"
              />
            </div>
          </div>

          {/* Barbeiro & Serviço */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1">
                <Scissors className="w-3.5 h-3.5 text-emerald-400" />
                Barbeiro
              </label>
              <select
                value={selectedBarberId || ''}
                onChange={(e) => setSelectedBarberId(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100"
              >
                <option value="">Selecione...</option>
                {barbers.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                Serviço
              </label>
              <select
                value={selectedServiceId || ''}
                onChange={(e) => setSelectedServiceId(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100"
              >
                <option value="">Selecione...</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nome} - R$ {Number(s.preco).toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Horário */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Horário
            </label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 font-mono"
            >
              {[
                '08:00', '08:40', '09:20', '10:00', '10:40', '11:20',
                '13:00', '13:40', '14:20', '15:00', '15:40', '16:20',
                '17:00', '17:40', '18:20', '19:00'
              ].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Observações */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Observações
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-100"
            />
          </div>

          {/* Botões */}
          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-500 text-zinc-950 text-xs font-extrabold flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Confirmar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
