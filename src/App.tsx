import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { KPICards } from './components/KPICards';
import { CashFlowChart } from './components/CashFlowChart';
import { BarberPerformanceChart } from './components/BarberPerformanceChart';
import { LiveAppointmentsList } from './components/LiveAppointmentsList';
import { HeatmapMatrix } from './components/HeatmapMatrix';
import { NewAppointmentModal } from './components/NewAppointmentModal';
import { AppointmentDetailDrawer } from './components/AppointmentDetailDrawer';
import { NotificationToast, ToastProps } from './components/NotificationToast';

import { BarbersView } from './components/views/BarbersView';
import { ClientsView } from './components/views/ClientsView';
import { FinancialView } from './components/views/FinancialView';
import { BarbershopInfoView } from './components/views/BarbershopInfoView';
import { SettingsView } from './components/views/SettingsView';

import {
  initialAppointments,
  mockBarbers,
  mockClients,
  mockServices,
  mockNotifications,
  mockBranches
} from './data/mockData';

import {
  Appointment,
  AppointmentStatus,
  ProductItem,
  BarbershopBranch
} from './types/barber';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [barbers] = useState(mockBarbers);
  const [clients] = useState(mockClients);
  const [services] = useState(mockServices);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [branches] = useState(mockBranches);
  const [selectedBranch, setSelectedBranch] = useState<BarbershopBranch>(mockBranches[0]);
  const [isOpenState, setIsOpenState] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileOpen] = useState(false);

  // Modals & Drawers
  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] = useState(false);
  const [selectedAppointmentForDrawer, setSelectedAppointmentForDrawer] =
    useState<Appointment | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<Omit<ToastProps, 'onClose'>[]>([]);

  const addToast = (
    title: string,
    message?: string,
    type: 'success' | 'warning' | 'info' = 'success'
  ) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Keyboard shortcut Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>(
          'input[placeholder*="Buscar"]'
        );
        searchInput?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleStatusChange = (id: string, newStatus: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );

    const apt = appointments.find((a) => a.id === id);
    const clientName = apt?.clientName || 'Cliente';

    if (newStatus === 'ativo') {
      addToast(
        'Atendimento Iniciado',
        `${clientName} está agora na cadeira de atendimento.`,
        'success'
      );
    } else if (newStatus === 'concluido') {
      addToast(
        'Atendimento Concluído!',
        `Comanda de ${clientName} encerrada com sucesso.`,
        'info'
      );
    } else if (newStatus === 'faltou') {
      addToast(
        'Marcado como Faltou (No-Show)',
        `${clientName} foi registrado como ausente na agenda.`,
        'warning'
      );
    }

    if (selectedAppointmentForDrawer && selectedAppointmentForDrawer.id === id) {
      setSelectedAppointmentForDrawer((prev) =>
        prev ? { ...prev, status: newStatus } : null
      );
    }
  };

  const handleAddProductToComanda = (appointmentId: string, product: ProductItem) => {
    setAppointments((prev) =>
      prev.map((a) => {
        if (a.id === appointmentId) {
          const currentProds = a.products || [];
          return {
            ...a,
            products: [...currentProds, product]
          };
        }
        return a;
      })
    );

    addToast(
      'Item Adicionado!',
      `${product.name} (R$ ${product.price.toFixed(2)}) lançado na comanda.`,
      'success'
    );

    if (selectedAppointmentForDrawer && selectedAppointmentForDrawer.id === appointmentId) {
      setSelectedAppointmentForDrawer((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          products: [...(prev.products || []), product]
        };
      });
    }
  };

  const handleAddAppointment = (newApt: Appointment) => {
    setAppointments((prev) => [newApt, ...prev]);
    addToast(
      'Agendamento Realizado!',
      `${newApt.clientName} agendado para às ${newApt.time} com ${newApt.barberName}.`,
      'success'
    );
  };

  const handleNotifyWhatsApp = (apt: Appointment) => {
    const text = encodeURIComponent(
      `Olá ${apt.clientName}! Confirmamos o seu agendamento hoje na ${selectedBranch.name} às ${apt.time} com o barbeiro ${apt.barberName}. Estamos te aguardando!`
    );
    window.open(`https://wa.me/55${apt.clientPhone.replace(/\D/g, '')}?text=${text}`, '_blank');
    addToast(
      'Lembrete WhatsApp',
      `Notificação enviada para ${apt.clientName}.`,
      'info'
    );
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row antialiased selection:bg-emerald-500 selection:text-zinc-950 font-sans">
      {/* Toast Notification Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-auto">
        {toasts.map((toast) => (
          <NotificationToast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </div>

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        branches={branches}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
        onOpenNewAppointmentModal={() => setIsNewAppointmentModalOpen(true)}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          selectedBranch={selectedBranch}
          onOpenMobileMenu={() => setMobileOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isOpenState={isOpenState}
          setIsOpenState={setIsOpenState}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 overflow-y-auto max-w-[1600px] mx-auto w-full">
          {/* TAB 1: HOME / DASHBOARD */}
          {(activeTab === 'dashboard' || activeTab === 'agendamentos') && (
            <>
              {/* Top Banner Greeting */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-zinc-800/80">
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-100">
                    Visão Geral de Operação & Caixas
                  </h1>
                  <p className="text-xs text-zinc-400">
                    Acompanhamento em tempo real da {selectedBranch.name}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={() => setIsNewAppointmentModalOpen(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all"
                  >
                    + Adicionar Atendimento
                  </button>
                </div>
              </div>

              {/* 4 Cards de KPIs */}
              <KPICards
                todayAppointmentsCount={appointments.length}
                totalSlotsToday={45}
              />

              {/* Área de Gráficos (Centro) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Gráfico 1: Fluxo de Caixa (Linha sólida vs tracejada) */}
                <div className="lg:col-span-7">
                  <CashFlowChart />
                </div>

                {/* Gráfico 2: Desempenho dos Barbeiros (Barras Horizontais) */}
                <div className="lg:col-span-5">
                  <BarberPerformanceChart />
                </div>
              </div>

              {/* Seção Inferior: Fila em Tempo Real + Heatmap */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Lista de Agendamentos de Hoje */}
                <div className="lg:col-span-7">
                  <LiveAppointmentsList
                    appointments={appointments}
                    onStatusChange={handleStatusChange}
                    onSelectAppointment={(apt) =>
                      setSelectedAppointmentForDrawer(apt)
                    }
                    onNotifyWhatsApp={handleNotifyWhatsApp}
                  />
                </div>

                {/* Heatmap (Matriz de Horários) */}
                <div className="lg:col-span-5">
                  <HeatmapMatrix />
                </div>
              </div>
            </>
          )}

          {/* TAB 2: BARBEARIA */}
          {activeTab === 'barbearia' && (
            <BarbershopInfoView branches={branches} services={services} />
          )}

          {/* TAB 3: BARBEIROS */}
          {activeTab === 'barbeiros' && (
            <BarbersView
              barbers={barbers}
              onOpenNewAppointment={() => setIsNewAppointmentModalOpen(true)}
            />
          )}

          {/* TAB 4: CLIENTES */}
          {activeTab === 'clientes' && <ClientsView clients={clients} />}

          {/* TAB 5: FINANCEIRO */}
          {activeTab === 'financeiro' && <FinancialView />}

          {/* TAB 6: CONFIGURAÇÕES */}
          {activeTab === 'configuracoes' && <SettingsView />}
        </main>
      </div>

      {/* New Appointment Modal */}
      <NewAppointmentModal
        isOpen={isNewAppointmentModalOpen}
        onClose={() => setIsNewAppointmentModalOpen(false)}
        barbers={barbers}
        services={services}
        onAddAppointment={handleAddAppointment}
      />

      {/* Appointment Comanda Detail Slide-over Drawer */}
      <AppointmentDetailDrawer
        appointment={selectedAppointmentForDrawer}
        onClose={() => setSelectedAppointmentForDrawer(null)}
        onStatusChange={handleStatusChange}
        onAddProduct={handleAddProductToComanda}
        onNotifyWhatsApp={handleNotifyWhatsApp}
      />
    </div>
  );
}

export default App;
