export type AppointmentStatus = 'ativo' | 'aguardando' | 'faltou' | 'concluido' | 'pendente' | 'confirmado';

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  category: 'bebida' | 'pomada' | 'barba' | 'outro';
}

export interface Appointment {
  id: string;
  clientName: string;
  clientAvatar?: string;
  clientPhone: string;
  clientIsVip?: boolean;
  time: string;
  endTime: string;
  service: string;
  servicePrice: number;
  barberId: string;
  barberName: string;
  barberAvatar: string;
  status: AppointmentStatus;
  notes?: string;
  products?: ProductItem[];
  paymentMethod?: 'Cartão' | 'PIX' | 'Dinheiro' | 'Clube Assinatura';
}

export interface Barber {
  id: number;
  name: string;
  nickname?: string;
  avatar: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  appointmentsCount: number;
  monthlyRevenue: number;
  status: 'disponivel' | 'atendendo' | 'pausa' | 'folga';
  chairNumber: number;
  phone: string;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  totalVisits: number;
  lastVisit: string;
  preferredBarber: string;
  isVip: boolean;
  totalSpent: number;
  clubMember: boolean;
  notes?: string;
}

export interface CashFlowDataPoint {
  period: string;
  realized: number;
  projected: number;
  expenses: number;
}

export interface HeatmapCell {
  day: string;
  dayIndex: number;
  hour: string;
  occupancy: number; // 0 to 100
  appointmentsCount: number;
  totalSlots: number;
  status: 'baixa' | 'media' | 'alta' | 'lotado';
}

export interface ServiceCatalog {
  id: number;
  name: string;
  durationMinutes: number;
  price: number;
  category: 'Cabelo' | 'Barba' | 'Combo' | 'Estética';
  description: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'appointment' | 'alert' | 'vip' | 'system';
}

export interface BarbershopBranch {
  id: string;
  name: string;
  city: string;
  address: string;
  status: 'Aberta' | 'Fechada' | 'Manutenção';
  chairsActive: number;
  phone: string;
}
