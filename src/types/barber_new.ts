export interface Barber {
  id: number;
  nome: string;
  especialidade?: string;
  notaMedia: number;
  faturamentoTotal: number;
  atendimentos: number;
  ativo: boolean;
  barbeariaId: number;
  criadoEm: string;
  atualizadoEm: string;

  // Campos usados no frontend (mantidos)
  avatar?: string;
  nickname?: string;
  status?: 'disponivel' | 'atendendo' | 'pausa' | 'folga';
  chairNumber?: number;
  phone?: string;
}


export interface ServiceCatalog {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  duracaoMinutos: number;
  ativo: boolean;
  barbeariaId: number;

  // Campos usados no frontend (mantidos)
  description?: string;
}


export interface Client {
  id: number;
  nome: string;
  telefone?: string;
  email?: string;
  visitas: number;
  gastoTotal: number;
  barbeiroFavoritoId?: number;
  observacoes?: string;
  ultimaVisita?: string;
  barbeariaId: number;
  criadoEm: string;
  atualizadoEm: string;

  // Campos usados no frontend (mantidos)
  avatar?: string;
  preferredBarber?: string;
  isVip?: boolean;
  totalSpent?: number;
  clubMember?: boolean;
  notes?: string;
}


export type AppointmentStatus =
  | 'pendente'
  | 'confirmado'
  | 'ativo'
  | 'aguardando'
  | 'faltou'
  | 'concluido';


  export interface Appointment {
  id: number;
  clienteId: number;
  barbeiroId: number;
  servicoId: number;
  data: string;      // YYYY-MM-DD
  horario: string;   // HH:mm
  status: AppointmentStatus;
  observacoes?: string;
  barbeariaId: number;
  criadoEm: string;

  // Campos usados no frontend (mantidos)
  clientName?: string;
  clientAvatar?: string;
  clientPhone?: string;
  clientIsVip?: boolean;

  time?: string;
  endTime?: string;

  service?: string;
  servicePrice: number;

  barberName?: string;
  barberAvatar?: string;

  notes?: string;
  products?: ProductItem[];
  paymentMethod?: 'Cartão' | 'PIX' | 'Dinheiro' | 'Clube Assinatura';
}


export interface ProductItem {
  id: string;
  name: string;
  price: number;
  category: 'bebida' | 'pomada' | 'barba' | 'outro';
}


export interface BarbershopBranch {
  id: number;
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  criadoEm: string;
  atualizadoEm: string;

  // Campos usados no frontend (mantidos)
  city?: string;
  status?: 'Aberta' | 'Fechada' | 'Manutenção';
  chairsActive?: number;
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
  occupancy: number;
  appointmentsCount: number;
  totalSlots: number;
  status: 'baixa' | 'media' | 'alta' | 'lotado';
}


export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'appointment' | 'alert' | 'vip' | 'system';
}
