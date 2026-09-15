import React, { useState } from 'react';
import { Barber, ServiceCatalog, Appointment } from '../types/barber';
import { X, Calendar, Clock, User, Scissors, DollarSign, Check, Phone } from 'lucide-react';
import { apiService } from '@/services/api';

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  barbers: Barber[];
  services: ServiceCatalog[];
  onAddAppointment: (appointment: Appointment) => void;
}

export const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({
  isOpen,
  onClose,
  barbers,
  services,
  onAddAppointment
}) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedBarberId, setSelectedBarberId] = useState(barbers[0]?.id || '');
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || '');
  const [time, setTime] = useState('15:30');
  const [isVip, setIsVip] = useState(false);
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cartão' | 'PIX' | 'Dinheiro' | 'Clube Assinatura'>('PIX');

  if (!isOpen) return null;

  const selectedBarber = barbers.find((b) => b.id === selectedBarberId) || barbers[0];
  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName.trim() || !clientPhone.trim()) return;

    // calcular horário final
    const [h, m] = time.split(':').map(Number);
    const duration = selectedService.durationMinutes;
    const endMin = (m + duration) % 60;
    const endHour = h + Math.floor((m + duration) / 60);
    const endTime = `${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`;

    // salvar no banco
    await apiService.createAgendamento({
      clientName,
      clientPhone,
      clientIsVip: isVip,
      time,
      endTime,
      service: selectedService.name,
      servicePrice: selectedService.price,
      barberId: selectedBarber.id,
      notes,
      paymentMethod
    });

    // opcional: manter também no estado local
    onAddAppointment({
      id: `apt-${Date.now()}`,
      clientName,
      clientPhone,
      clientIsVip: isVip,
      time,
      endTime,
      service: selectedService.name,
      servicePrice: selectedService.price,
      barberId: selectedBarber.id,
      barberName: selectedBarber.name.split(' ')[0],
      barberAvatar: selectedBarber.avatar,
      status: 'aguardando',
      notes,
      paymentMethod
    });

    onClose();

    setClientName('');
    setClientPhone('');
    setNotes('');
  };


  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-100">
                Novo Agendamento
              </h3>
              <p className="text-xs text-zinc-400">
                Cadastrar cliente no fluxo de caixa da unidade
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* Cliente & Telefone */}
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
                placeholder="Ex: Lucas Gabriel"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                Telefone / WhatsApp *
              </label>
              <input
                type="text"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="(11) 99999-8888"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          {/* Barbeiro & Serviço */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1">
                <Scissors className="w-3.5 h-3.5 text-emerald-400" />
                Barbeiro Responsável
              </label>
              <select
                value={selectedBarberId}
                onChange={(e) => setSelectedBarberId(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
              >
                {barbers.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} (Cadeira {b.chairNumber})
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
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
              >
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} - R$ {s.price.toFixed(2)} ({s.durationMinutes}m)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Horário & Horário de Saída */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                Horário de Início
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500 font-mono"
              >
                {[
                  '08:00', '08:40', '09:20', '10:00', '10:40', '11:20',
                  '13:00', '13:40', '14:20', '15:00', '15:40', '16:20',
                  '17:00', '17:40', '18:20', '19:00'
                ].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Forma de Pagamento
              </label>
              <select
                value={paymentMethod}
                onChange={(e: any) => setPaymentMethod(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="PIX">PIX (Instantâneo)</option>
                <option value="Cartão">Cartão de Crédito/Débito</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Clube Assinatura">Clube Assinante VIP</option>
              </select>
            </div>
          </div>

          {/* VIP Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="vipCheck"
              checked={isVip}
              onChange={(e) => setIsVip(e.target.checked)}
              className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
            />
            <label htmlFor="vipCheck" className="text-xs text-zinc-300 font-medium cursor-pointer">
              Cliente do Clube / VIP (Servir bebida Cortesia)
            </label>
          </div>

          {/* Observações */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Observações / Preferências do Cliente
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Prefere corte baixinho dos lados e Heineken gelada."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Price Preview */}
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-300 font-sans font-semibold">Valor Estimado:</span>
            <span className="text-lg font-extrabold text-emerald-400">
              R$ {selectedService.price.toFixed(2)}
            </span>
          </div>

          {/* Submit */}
          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:text-zinc-100 text-xs font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-extrabold flex items-center gap-1.5 shadow-lg shadow-emerald-500/25 transition-all"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              Confirmar Agendamento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
