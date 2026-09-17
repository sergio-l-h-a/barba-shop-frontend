import React, { useState } from 'react';
import {
  LayoutDashboard,
  Store,
  Scissors,
  Users,
  Calendar,
  Wallet,
  Settings,
  Plus,
  ChevronDown,
  Building2,
  Sparkles,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { BarbershopBranch } from '../types/barber_new';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  branches: BarbershopBranch[];
  selectedBranch: BarbershopBranch;
  setSelectedBranch: (branch: BarbershopBranch) => void;
  onOpenNewAppointmentModal: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  branches,
  selectedBranch,
  setSelectedBranch,
  onOpenNewAppointmentModal,
  isCollapsed,
  setIsCollapsed,
  mobileOpen,
  setMobileOpen
}) => {
  const [showBranchDropdown, setShowBranchDropdown] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard, badge: 'Ao vivo' },
    { id: 'barbearia', label: 'Barbearia', icon: Store },
    { id: 'barbeiros', label: 'Barbeiros', icon: Scissors, badge: '4' },
    { id: 'clientes', label: 'Clientes', icon: Users, badge: '2.4k' },
    { id: 'agendamentos', label: 'Agendamentos', icon: Calendar, badge: '38' },
    { id: 'financeiro', label: 'Financeiro', icon: Wallet },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-zinc-950/80 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen bg-zinc-950/95 border-r border-zinc-800/80 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top Header Logo */}
        <div className="p-4 border-b border-zinc-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-600 to-emerald-950 p-0.5 shadow-lg shadow-emerald-900/30 shrink-0">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <Scissors className="w-5 h-5 text-emerald-400 transform -rotate-45" />
              </div>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-zinc-100 via-zinc-200 to-emerald-400 bg-clip-text text-transparent truncate">
                    NAVALHA & ESTILO
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400/90 font-medium">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>Executive Dark</span>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 transition-colors"
            title={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Branch Selector */}
        {!isCollapsed ? (
          <div className="p-3 mx-3 my-2 bg-zinc-900/70 border border-zinc-800/80 rounded-xl relative">
            <button
              onClick={() => setShowBranchDropdown(!showBranchDropdown)}
              className="w-full flex items-center justify-between gap-2 text-left"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
                    Unidade Ativa
                  </p>
                  <p className="text-xs font-semibold text-zinc-100 truncate">
                    {selectedBranch.nome}
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                  showBranchDropdown ? 'rotate-180' : ''
                }`}
              />
            </button>

            {showBranchDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 p-1.5 space-y-1 backdrop-blur-xl">
                {branches.map((branch) => (
                  <button
                    key={branch.id}
                    onClick={() => {
                      setSelectedBranch(branch);
                      setShowBranchDropdown(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      selectedBranch.id === branch.id
                        ? 'bg-emerald-500/15 text-emerald-300 font-medium border border-emerald-500/30'
                        : 'text-zinc-300 hover:bg-zinc-800/80 hover:text-zinc-100'
                    }`}
                  >
                    <span className="truncate">{branch.nome}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                      {branch.chairsActive} cadeiras
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="py-2 flex justify-center">
            <div
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-emerald-400"
              title={selectedBranch.nome}
            >
              <Building2 className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Quick Action Button */}
        <div className="px-3 py-1">
          <button
            onClick={onOpenNewAppointmentModal}
            className={`w-full py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all active:scale-[0.98] group ${
              isCollapsed ? 'px-0' : ''
            }`}
          >
            <Plus className="w-4 h-4 text-zinc-950 transition-transform group-hover:rotate-90 duration-300" />
            {!isCollapsed && <span>Novo Agendamento</span>}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group relative ${
                  isActive
                    ? 'bg-zinc-900 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-950/50'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-emerald-400 rounded-r-full shadow-[0_0_8px_#10b981]" />
                )}
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? 'text-emerald-400'
                      : 'text-zinc-400 group-hover:text-zinc-200'
                  }`}
                />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                          isActive
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer User Info */}
        <div className="p-3 border-t border-zinc-800/80 bg-zinc-950/60">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-zinc-900/50 border border-zinc-800/60">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Carlos Eduardo"
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-emerald-500/40"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-zinc-950" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-zinc-100 truncate flex items-center gap-1">
                  Carlos Eduardo
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline shrink-0" />
                </p>
                <p className="text-[10px] text-zinc-400 truncate">Gerente Master</p>
              </div>
            )}
            {!isCollapsed && (
              <button
                className="text-zinc-500 hover:text-rose-400 p-1 rounded-lg transition-colors"
                title="Sair do sistema"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
