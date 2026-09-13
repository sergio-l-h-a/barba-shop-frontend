import React, { useState } from 'react';
import { Appointment, AppointmentStatus, ProductItem } from '../types/barber';
import {
  X,
  User,
  Clock,
  Scissors,
  Plus,
  Phone,
  MessageSquare,
  ShoppingBag,
  Sparkles
} from 'lucide-react';

interface AppointmentDetailDrawerProps {
  appointment: Appointment | null;
  onClose: () => void;
  onStatusChange: (id: string, status: AppointmentStatus) => void;
  onAddProduct: (appointmentId: string, product: ProductItem) => void;
  onNotifyWhatsApp: (appointment: Appointment) => void;
}

const availableProducts: ProductItem[] = [
  { id: 'p1', name: 'Pomada Matte Effect BarberPro', price: 55.00, category: 'pomada' },
  { id: 'p2', name: 'Cerveja IPA Artesanal 500ml', price: 18.00, category: 'bebida' },
  { id: 'p3', name: 'Whisky Single Malt (Dose)', price: 35.00, category: 'bebida' },
  { id: 'p4', name: 'Balm para Barba Citrus 100g', price: 42.00, category: 'barba' },
  { id: 'p5', name: 'Shampoo Mentolado Fortificante', price: 48.00, category: 'outro' }
];

export const AppointmentDetailDrawer: React.FC<AppointmentDetailDrawerProps> = ({
  appointment,
  onClose,
  onStatusChange,
  onAddProduct,
  onNotifyWhatsApp
}) => {
  const [showProductSelector, setShowProductSelector] = useState(false);

  if (!appointment) return null;

  const productsTotal = (appointment.products || []).reduce(
    (acc, p) => acc + p.price,
    0
  );
  const totalAmount = appointment.servicePrice + productsTotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-zinc-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-900 border-l border-zinc-800 shadow-2xl flex flex-col justify-between">
          {/* Top Bar */}
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-100">
                  Comanda #{appointment.id.slice(-4)}
                </h3>
                <p className="text-xs text-zinc-400">
                  {appointment.time} &bull; {appointment.barberName}
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

          {/* Drawer Content */}
          <div className="p-5 space-y-5 overflow-y-auto flex-1 text-xs">
            {/* Client Profile Box */}
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-start gap-3">
              {appointment.clientAvatar ? (
                <img
                  src={appointment.clientAvatar}
                  alt={appointment.clientName}
                  className="w-12 h-12 rounded-xl object-cover ring-1 ring-emerald-500/50"
                />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400">
                  <User className="w-6 h-6" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-zinc-100 truncate">
                    {appointment.clientName}
                  </h4>
                  {appointment.clientIsVip && (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold flex items-center gap-1 border border-emerald-500/30">
                      <Sparkles className="w-3 h-3" />
                      VIP
                    </span>
                  )}
                </div>
                <p className="text-zinc-400 font-mono mt-0.5">
                  {appointment.clientPhone}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => onNotifyWhatsApp(appointment)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 font-semibold text-[11px] flex items-center gap-1 border border-emerald-500/30 transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    Enviar WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Service Item */}
            <div>
              <h5 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Serviço Agendado
              </h5>
              <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex items-center justify-between">
                <div>
                  <p className="font-bold text-zinc-100">{appointment.service}</p>
                  <p className="text-[10px] text-zinc-400 flex items-center gap-1 mt-0.5">
                    <Scissors className="w-3 h-3 text-emerald-400" />
                    {appointment.barberName} &bull; <Clock className="w-3 h-3 inline ml-1" /> {appointment.time} às {appointment.endTime}
                  </p>
                </div>
                <span className="font-mono font-bold text-zinc-100 text-sm">
                  R$ {appointment.servicePrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Consumo Extra / Produtos no Bar e Salão */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  Consumo & Produtos Extra ({appointment.products?.length || 0})
                </h5>
                <button
                  onClick={() => setShowProductSelector(!showProductSelector)}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Adicionar Produto
                </button>
              </div>

              {/* Product Selector Dropdown */}
              {showProductSelector && (
                <div className="p-2.5 mb-3 bg-zinc-950 border border-emerald-500/40 rounded-xl space-y-1.5 animate-in slide-in-from-top-2">
                  <p className="text-[10px] font-bold text-emerald-400 uppercase">
                    Selecione um item do Bar/Boutique:
                  </p>
                  {availableProducts.map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => {
                        onAddProduct(appointment.id, prod);
                        setShowProductSelector(false);
                      }}
                      className="w-full p-2 rounded-lg bg-zinc-900 hover:bg-emerald-500/10 hover:border-emerald-500/30 border border-zinc-800 text-left flex items-center justify-between transition-colors"
                    >
                      <span className="text-zinc-200 font-medium">{prod.name}</span>
                      <span className="font-mono font-bold text-emerald-400">
                        R$ {prod.price.toFixed(2)}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Added Products List */}
              {appointment.products && appointment.products.length > 0 ? (
                <div className="space-y-1.5">
                  {appointment.products.map((prod, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex items-center justify-between"
                    >
                      <span className="text-zinc-300 font-medium">{prod.name}</span>
                      <span className="font-mono font-semibold text-emerald-400">
                        R$ {prod.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500 text-[11px] italic p-2 rounded-lg bg-zinc-950/40 text-center">
                  Nenhum produto extra adicionado a esta comanda.
                </p>
              )}
            </div>

            {/* Notes */}
            {appointment.notes && (
              <div>
                <h5 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <MessageSquare className="w-3 h-3 text-emerald-400" />
                  Observações
                </h5>
                <p className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800 text-zinc-300 text-xs">
                  {appointment.notes}
                </p>
              </div>
            )}

            {/* Billing Summary Box */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-emerald-500/40 space-y-2">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal Serviços:</span>
                <span className="font-mono text-zinc-200">
                  R$ {appointment.servicePrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal Produtos:</span>
                <span className="font-mono text-zinc-200">
                  R$ {productsTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Forma de Pagamento:</span>
                <span className="font-semibold text-emerald-400">
                  {appointment.paymentMethod || 'PIX'}
                </span>
              </div>

              <div className="border-t border-zinc-800 pt-2 flex justify-between items-center text-sm">
                <span className="font-extrabold text-zinc-100 uppercase">Total Comanda:</span>
                <span className="font-mono font-extrabold text-xl text-emerald-400">
                  R$ {totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Drawer Actions Footer */}
          <div className="p-4 border-t border-zinc-800 bg-zinc-950/80 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onStatusChange(appointment.id, 'ativo')}
                className="py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-emerald-500/20"
              >
                Colocar na Cadeira (Ativo)
              </button>
              <button
                onClick={() => onStatusChange(appointment.id, 'concluido')}
                className="py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-cyan-500/20"
              >
                Concluir & Pagar
              </button>
            </div>

            <button
              onClick={() => onStatusChange(appointment.id, 'faltou')}
              className="w-full py-2 rounded-xl bg-zinc-900 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 border border-zinc-800 text-xs font-semibold transition-colors"
            >
              Marcar Cliente como No-Show (Faltou)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
