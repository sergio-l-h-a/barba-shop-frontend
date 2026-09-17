import React, { useState, useEffect } from 'react';
import {
  Search,
  Bell,
  Menu,
  Clock,
  ChevronDown,
  User,
  Settings as SettingsIcon,
  LogOut
} from 'lucide-react';
import { NotificationItem, BarbershopBranch } from '../types/barber_new';

interface HeaderProps {
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: number) => void;
  selectedBranch: BarbershopBranch;
  onOpenMobileMenu: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isOpenState: boolean;
  setIsOpenState: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  notifications,
  onMarkNotificationRead,
  selectedBranch: _selectedBranch,
  onOpenMobileMenu,
  searchQuery,
  setSearchQuery,
  isOpenState,
  setIsOpenState
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 px-4 py-3 md:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-zinc-800 md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar cliente, barbeiro, serviço ou comanda... (Ctrl + K)"
            className="w-full bg-zinc-900/90 border border-zinc-800/90 rounded-xl pl-10 pr-16 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition-all shadow-inner"
          />
          <span className="hidden sm:inline-flex items-center gap-0.5 absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-500 bg-zinc-800/80 px-1.5 py-0.5 rounded border border-zinc-700/50 font-mono">
            Ctrl K
          </span>
        </div>
      </div>

      {/* Right Controls: Status Badge, Clock, Notifications, User Profile */}
      <div className="flex items-center gap-3">
        {/* Status Badge: Barbearia Aberta */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800/90 shadow-sm">
          <button
            onClick={() => setIsOpenState(!isOpenState)}
            className="flex items-center gap-2 text-xs font-semibold cursor-pointer group"
            title="Clique para alternar o status operacional"
          >
            <span className="relative flex h-2.5 w-2.5">
              {isOpenState && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              )}
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isOpenState ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              />
            </span>
            <span
              className={
                isOpenState
                  ? 'text-emerald-400 group-hover:underline'
                  : 'text-rose-400 group-hover:underline'
              }
            >
              {isOpenState ? 'Barbearia Aberta' : 'Barbearia Fechada'}
            </span>
          </button>
          <span className="text-zinc-700">|</span>
          <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-mono">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>08:00 - 20:00</span>
          </div>
        </div>

        {/* Live Clock / Date */}
        <div className="hidden lg:flex flex-col text-right">
          <span className="text-xs font-bold text-zinc-200 font-mono">
            {currentTime || '14:30'}
          </span>
          <span className="text-[10px] text-zinc-500">
            Hoje, {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
          </span>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2 rounded-xl bg-zinc-900/80 border border-zinc-800/90 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/60 transition-all"
            title="Notificações"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-zinc-950 font-extrabold text-[10px] rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl z-50 p-3 space-y-2 backdrop-blur-xl">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-zinc-100">
                    Notificações do Sistema
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                  {unreadCount} novas
                </span>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => onMarkNotificationRead(n.id)}
                    className={`p-2.5 rounded-xl border transition-colors cursor-pointer text-left ${
                      n.read
                        ? 'bg-zinc-950/40 border-zinc-800/60 opacity-60'
                        : 'bg-zinc-800/50 border-emerald-500/30 hover:border-emerald-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-zinc-200">
                        {n.title}
                      </span>
                      <span className="text-[10px] text-zinc-500">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                      {n.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800/90 hover:bg-zinc-800/80 transition-all text-left"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="Carlos Eduardo"
              className="w-7 h-7 rounded-lg object-cover ring-1 ring-emerald-500/50"
            />
            <div className="hidden md:flex flex-col">
              <span className="text-xs font-bold text-zinc-100 leading-none">
                Carlos E.
              </span>
              <span className="text-[10px] text-emerald-400 font-medium leading-tight">
                Gerente
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl z-50 p-2 space-y-1 backdrop-blur-xl">
              <div className="p-2 border-b border-zinc-800 text-left">
                <p className="text-xs font-bold text-zinc-100">Carlos Eduardo</p>
                <p className="text-[10px] text-zinc-400">carlos.gerente@navalhaestilo.com.br</p>
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
                  Acesso Total Admin
                </span>
              </div>

              <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl transition-colors">
                <User className="w-4 h-4 text-emerald-400" />
                <span>Meu Perfil</span>
              </button>

              <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl transition-colors">
                <SettingsIcon className="w-4 h-4 text-zinc-400" />
                <span>Configurações da Unidade</span>
              </button>

              <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors">
                <LogOut className="w-4 h-4 text-rose-400" />
                <span>Encerrar Sessão</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
