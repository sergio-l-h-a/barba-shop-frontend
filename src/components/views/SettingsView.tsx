import React, { useState } from 'react';
import { Settings, Bell, MessageSquare, Shield, Check } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [whatsappReminder, setWhatsappReminder] = useState(true);
  const [autoReceipt, setAutoReceipt] = useState(true);
  const [darkThemeGlow, setDarkThemeGlow] = useState(true);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-extrabold text-zinc-100 flex items-center gap-2">
          <Settings className="w-5 h-5 text-emerald-400" />
          Configurações do Sistema
        </h2>
        <p className="text-xs text-zinc-400 mt-0.5">
          Ajustes de notificações, integrações de WhatsApp API e preferências de tema
        </p>
      </div>

      <div className="space-y-4">
        {/* Lembretes de WhatsApp */}
        <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 flex items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <h3 className="font-bold text-zinc-100 text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Lembretes Automáticos via WhatsApp
            </h3>
            <p className="text-xs text-zinc-400">
              Enviar mensagem automática para o cliente 2 horas antes do agendamento para reduzir No-Show.
            </p>
          </div>
          <button
            onClick={() => setWhatsappReminder(!whatsappReminder)}
            className={`w-12 h-6 rounded-full transition-colors relative p-1 shrink-0 ${
              whatsappReminder ? 'bg-emerald-500' : 'bg-zinc-800'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full bg-zinc-950 transition-transform block ${
                whatsappReminder ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Comanda Digital & Recibo PIX */}
        <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 flex items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <h3 className="font-bold text-zinc-100 text-sm flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-400" />
              Recibo Digital e Comanda Automática
            </h3>
            <p className="text-xs text-zinc-400">
              Gerar link de comprovante e enviar no celular do cliente ao concluir comanda.
            </p>
          </div>
          <button
            onClick={() => setAutoReceipt(!autoReceipt)}
            className={`w-12 h-6 rounded-full transition-colors relative p-1 shrink-0 ${
              autoReceipt ? 'bg-emerald-500' : 'bg-zinc-800'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full bg-zinc-950 transition-transform block ${
                autoReceipt ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Efeitos Visuais Dark Mode Glow */}
        <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 flex items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <h3 className="font-bold text-zinc-100 text-sm flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              Efeitos Visuais Premium Emerald
            </h3>
            <p className="text-xs text-zinc-400">
              Ativar efeitos de iluminação e brilho verde esmeralda nas métricas de KPI.
            </p>
          </div>
          <button
            onClick={() => setDarkThemeGlow(!darkThemeGlow)}
            className={`w-12 h-6 rounded-full transition-colors relative p-1 shrink-0 ${
              darkThemeGlow ? 'bg-emerald-500' : 'bg-zinc-800'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full bg-zinc-950 transition-transform block ${
                darkThemeGlow ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Todas as alterações são salvas automaticamente na sua conta de Gerente.</span>
        </div>
      </div>
    </div>
  );
};
