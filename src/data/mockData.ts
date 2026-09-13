import {
  Appointment,
  Barber,
  Client,
  CashFlowDataPoint,
  HeatmapCell,
  ServiceCatalog,
  NotificationItem,
  BarbershopBranch
} from '../types/barber';

export const mockBranches: BarbershopBranch[] = [
  {
    id: 'b1',
    name: 'Unidade Jardins - SP',
    city: 'São Paulo',
    address: 'Rua Oscar Freire, 1420',
    status: 'Aberta',
    chairsActive: 6,
    phone: '(11) 98823-4100'
  },
  {
    id: 'b2',
    name: 'Unidade Moema - SP',
    city: 'São Paulo',
    address: 'Av. Lavandisca, 580',
    status: 'Aberta',
    chairsActive: 5,
    phone: '(11) 97120-9988'
  },
  {
    id: 'b3',
    name: 'Unidade Barra da Tijuca - RJ',
    city: 'Rio de Janeiro',
    address: 'Av. das Américas, 3400',
    status: 'Aberta',
    chairsActive: 8,
    phone: '(21) 99312-5500'
  }
];

export const mockBarbers: Barber[] = [
  {
    id: 'barber-1',
    name: 'Matheus "Navalha" Santos',
    nickname: 'Master Barber',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    specialty: 'Fade Premium & Barba Terapia',
    rating: 4.95,
    reviewCount: 342,
    appointmentsCount: 142,
    monthlyRevenue: 14850.00,
    status: 'atendendo',
    chairNumber: 1,
    phone: '(11) 98765-1122'
  },
  {
    id: 'barber-2',
    name: 'Lucas "Fader" Viana',
    nickname: 'Especialista Visagismo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    specialty: 'Degradê Navalhado & Texturização',
    rating: 4.88,
    reviewCount: 289,
    appointmentsCount: 128,
    monthlyRevenue: 12900.00,
    status: 'atendendo',
    chairNumber: 2,
    phone: '(11) 98765-3344'
  },
  {
    id: 'barber-3',
    name: 'Felipe "Cortes" Ramos',
    nickname: 'Barber Stylist',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    specialty: 'Corte Clássico Executivo & Platinado',
    rating: 4.91,
    reviewCount: 215,
    appointmentsCount: 115,
    monthlyRevenue: 11200.00,
    status: 'disponivel',
    chairNumber: 3,
    phone: '(11) 98765-5566'
  },
  {
    id: 'barber-4',
    name: 'Diego "King" Oliveira',
    nickname: 'Mestre da Barba',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    specialty: 'Modelagem de Barba & Pigmentação',
    rating: 4.82,
    reviewCount: 198,
    appointmentsCount: 98,
    monthlyRevenue: 9800.00,
    status: 'pausa',
    chairNumber: 4,
    phone: '(11) 98765-7788'
  }
];

export const mockServices: ServiceCatalog[] = [
  {
    id: 's1',
    name: 'Corte Masculino Premium',
    durationMinutes: 40,
    price: 85.00,
    category: 'Cabelo',
    description: 'Lavagem com shampoo especial, corte no estilo visagista, finalização com pomada e styling.'
  },
  {
    id: 's2',
    name: 'Barba Terapia com Toalha Quente',
    durationMinutes: 35,
    price: 65.00,
    category: 'Barba',
    description: 'Esfoliação facial, vapor de ozônio, toalha quente, alinhamento na navalha e balm hidratante.'
  },
  {
    id: 's3',
    name: 'Combo Master (Corte + Barba)',
    durationMinutes: 70,
    price: 135.00,
    category: 'Combo',
    description: 'Atendimento VIP completo com corte personalizado + barba terapia + drink artesanal cortesia.'
  },
  {
    id: 's4',
    name: 'Platinado / Camuflagem de Fios',
    durationMinutes: 90,
    price: 160.00,
    category: 'Estética',
    description: 'Descoloração global ou tonalização discreta para grisalhos com produtos de alta nutrição.'
  },
  {
    id: 's5',
    name: 'Design de Sobrancelha na Navalha',
    durationMinutes: 15,
    price: 35.00,
    category: 'Estética',
    description: 'Alinhamento higiênico e estético com simetria do rosto.'
  }
];

export const mockClients: Client[] = [
  {
    id: 'c1',
    name: 'Rodrigo Albuquerque',
    phone: '(11) 99881-2233',
    email: 'rodrigo.albuquerque@email.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    totalVisits: 28,
    lastVisit: 'Hoje',
    preferredBarber: 'Matheus "Navalha" Santos',
    isVip: true,
    totalSpent: 3840.00,
    clubMember: true,
    notes: 'Gosta de café espresso duplo e corte degradê zero alto.'
  },
  {
    id: 'c2',
    name: 'Gabriel Costa e Silva',
    phone: '(11) 98112-4455',
    email: 'gabriel.costa@tech.io',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    totalVisits: 14,
    lastVisit: 'Hoje',
    preferredBarber: 'Lucas "Fader" Viana',
    isVip: true,
    totalSpent: 1890.00,
    clubMember: true,
    notes: 'Prefere Heineken bem gelada durante o atendimento.'
  },
  {
    id: 'c3',
    name: 'Marcelo Prado',
    phone: '(11) 97223-1199',
    email: 'mprado@advocacia.com.br',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    totalVisits: 8,
    lastVisit: 'Hoje',
    preferredBarber: 'Felipe "Cortes" Ramos',
    isVip: false,
    totalSpent: 920.00,
    clubMember: false,
    notes: 'Atendimento executivo rápido antes das reuniões.'
  },
  {
    id: 'c4',
    name: 'André Martins',
    phone: '(11) 98901-7788',
    email: 'andre.martins@design.com',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    totalVisits: 19,
    lastVisit: 'Hoje',
    preferredBarber: 'Diego "King" Oliveira',
    isVip: true,
    totalSpent: 2650.00,
    clubMember: true
  },
  {
    id: 'c5',
    name: 'Thiago "Titi" Mendes',
    phone: '(11) 99012-3344',
    email: 'thiago.mendes@mkt.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    totalVisits: 5,
    lastVisit: 'Hoje',
    preferredBarber: 'Matheus "Navalha" Santos',
    isVip: false,
    totalSpent: 620.00,
    clubMember: false
  },
  {
    id: 'c6',
    name: 'Alexandre Magno',
    phone: '(11) 98455-6677',
    email: 'alexandre.magno@corretora.com',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80',
    totalVisits: 31,
    lastVisit: 'Ontem',
    preferredBarber: 'Lucas "Fader" Viana',
    isVip: true,
    totalSpent: 4520.00,
    clubMember: true
  }
];

export const initialAppointments: Appointment[] = [
  {
    id: 'apt-101',
    clientName: 'Rodrigo Albuquerque',
    clientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    clientPhone: '(11) 99881-2233',
    clientIsVip: true,
    time: '14:00',
    endTime: '15:10',
    service: 'Combo Master (Corte + Barba)',
    servicePrice: 135.00,
    barberId: 'barber-1',
    barberName: 'Matheus "Navalha"',
    barberAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'ativo',
    notes: 'Cliente VIP Assinante. Servir Whisky Bourbon.',
    products: [
      { id: 'p1', name: 'Pomada Matte Effect BarberPro', price: 55.00, category: 'pomada' },
      { id: 'p2', name: 'Cerveja IPA Artesanal', price: 18.00, category: 'bebida' }
    ],
    paymentMethod: 'Clube Assinatura'
  },
  {
    id: 'apt-102',
    clientName: 'Gabriel Costa e Silva',
    clientAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    clientPhone: '(11) 98112-4455',
    clientIsVip: true,
    time: '14:30',
    endTime: '15:10',
    service: 'Corte Masculino Premium',
    servicePrice: 85.00,
    barberId: 'barber-2',
    barberName: 'Lucas "Fader"',
    barberAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'ativo',
    notes: 'Degradê na navalha bem marcado.',
    paymentMethod: 'PIX'
  },
  {
    id: 'apt-103',
    clientName: 'Marcelo Prado',
    clientAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    clientPhone: '(11) 97223-1199',
    clientIsVip: false,
    time: '15:00',
    endTime: '15:35',
    service: 'Barba Terapia com Toalha Quente',
    servicePrice: 65.00,
    barberId: 'barber-3',
    barberName: 'Felipe "Cortes"',
    barberAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'aguardando',
    notes: 'Aguardando na recepção jogando sinuca.',
    paymentMethod: 'Cartão'
  },
  {
    id: 'apt-104',
    clientName: 'André Martins',
    clientAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    clientPhone: '(11) 98901-7788',
    clientIsVip: true,
    time: '15:15',
    endTime: '16:25',
    service: 'Combo Master (Corte + Barba)',
    servicePrice: 135.00,
    barberId: 'barber-4',
    barberName: 'Diego "King"',
    barberAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    status: 'aguardando',
    notes: 'Acabou de chegar. Servido um café expresso.',
    paymentMethod: 'PIX'
  },
  {
    id: 'apt-105',
    clientName: 'Lucas Ferreira',
    clientAvatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
    clientPhone: '(11) 97654-9988',
    clientIsVip: false,
    time: '13:00',
    endTime: '13:40',
    service: 'Corte Masculino Premium',
    servicePrice: 85.00,
    barberId: 'barber-1',
    barberName: 'Matheus "Navalha"',
    barberAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'concluido',
    products: [{ id: 'p3', name: 'Balm para Barba Citrus', price: 42.00, category: 'barba' }],
    paymentMethod: 'Cartão'
  },
  {
    id: 'apt-106',
    clientName: 'Bruno Camargo',
    clientAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    clientPhone: '(11) 99123-8877',
    clientIsVip: false,
    time: '13:30',
    endTime: '14:05',
    service: 'Barba Terapia com Toalha Quente',
    servicePrice: 65.00,
    barberId: 'barber-2',
    barberName: 'Lucas "Fader"',
    barberAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'concluido',
    paymentMethod: 'Dinheiro'
  },
  {
    id: 'apt-107',
    clientName: 'Thiago Mendes',
    clientAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    clientPhone: '(11) 99012-3344',
    clientIsVip: false,
    time: '12:00',
    endTime: '12:40',
    service: 'Corte Masculino Premium',
    servicePrice: 85.00,
    barberId: 'barber-3',
    barberName: 'Felipe "Cortes"',
    barberAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'faltou',
    notes: 'Não respondeu ao lembrete do WhatsApp. Tentado contato 2x.',
    paymentMethod: 'Cartão'
  },
  {
    id: 'apt-108',
    clientName: 'Erick Vasconcelos',
    clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    clientPhone: '(11) 98833-2211',
    clientIsVip: false,
    time: '16:00',
    endTime: '17:10',
    service: 'Combo Master (Corte + Barba)',
    servicePrice: 135.00,
    barberId: 'barber-1',
    barberName: 'Matheus "Navalha"',
    barberAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'confirmado',
    paymentMethod: 'PIX'
  },
  {
    id: 'apt-109',
    clientName: 'Fábio de Souza',
    clientAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    clientPhone: '(11) 97711-4433',
    clientIsVip: true,
    time: '16:30',
    endTime: '17:10',
    service: 'Corte Masculino Premium',
    servicePrice: 85.00,
    barberId: 'barber-2',
    barberName: 'Lucas "Fader"',
    barberAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'confirmado',
    paymentMethod: 'Clube Assinatura'
  }
];

export const cashFlowDailyData: CashFlowDataPoint[] = [
  { period: 'Seg (08/05)', realized: 1850, projected: 1850, expenses: 420 },
  { period: 'Ter (09/05)', realized: 2100, projected: 2100, expenses: 380 },
  { period: 'Qua (10/05)', realized: 2450, projected: 2450, expenses: 510 },
  { period: 'Qui (11/05)', realized: 2900, projected: 2900, expenses: 490 },
  { period: 'Sex (12/05)', realized: 3850, projected: 3850, expenses: 620 },
  { period: 'Sáb (13/05)', realized: 4600, projected: 4600, expenses: 750 },
  { period: 'Hoje (14/05)', realized: 3120, projected: 3950, expenses: 410 },
  { period: 'Amanhã (15/05)', realized: 0, projected: 3200, expenses: 350 },
  { period: 'Ter (16/05)', realized: 0, projected: 2800, expenses: 350 },
  { period: 'Qua (17/05)', realized: 0, projected: 3100, expenses: 380 },
  { period: 'Qui (18/05)', realized: 0, projected: 3650, expenses: 420 },
  { period: 'Sex (19/05)', realized: 0, projected: 4400, expenses: 580 }
];

export const cashFlowMonthlyData: CashFlowDataPoint[] = [
  { period: 'Dez', realized: 42500, projected: 42500, expenses: 14200 },
  { period: 'Jan', realized: 39800, projected: 39800, expenses: 13800 },
  { period: 'Fev', realized: 41200, projected: 41200, expenses: 14100 },
  { period: 'Mar', realized: 44600, projected: 44600, expenses: 15200 },
  { period: 'Abr', realized: 46200, projected: 46200, expenses: 15800 },
  { period: 'Mai (Atual)', realized: 38750, projected: 48750, expenses: 14900 },
  { period: 'Jun (Projetado)', realized: 0, projected: 51200, expenses: 16100 }
];

export const heatmapData: HeatmapCell[] = [
  // Segunda (dayIndex 0)
  { day: 'Segunda', dayIndex: 0, hour: '08:00', occupancy: 20, appointmentsCount: 2, totalSlots: 10, status: 'baixa' },
  { day: 'Segunda', dayIndex: 0, hour: '10:00', occupancy: 45, appointmentsCount: 4, totalSlots: 10, status: 'media' },
  { day: 'Segunda', dayIndex: 0, hour: '12:00', occupancy: 60, appointmentsCount: 6, totalSlots: 10, status: 'media' },
  { day: 'Segunda', dayIndex: 0, hour: '14:00', occupancy: 50, appointmentsCount: 5, totalSlots: 10, status: 'media' },
  { day: 'Segunda', dayIndex: 0, hour: '16:00', occupancy: 70, appointmentsCount: 7, totalSlots: 10, status: 'alta' },
  { day: 'Segunda', dayIndex: 0, hour: '18:00', occupancy: 85, appointmentsCount: 8, totalSlots: 10, status: 'alta' },

  // Terça (dayIndex 1)
  { day: 'Terça', dayIndex: 1, hour: '08:00', occupancy: 30, appointmentsCount: 3, totalSlots: 10, status: 'baixa' },
  { day: 'Terça', dayIndex: 1, hour: '10:00', occupancy: 50, appointmentsCount: 5, totalSlots: 10, status: 'media' },
  { day: 'Terça', dayIndex: 1, hour: '12:00', occupancy: 75, appointmentsCount: 7, totalSlots: 10, status: 'alta' },
  { day: 'Terça', dayIndex: 1, hour: '14:00', occupancy: 65, appointmentsCount: 6, totalSlots: 10, status: 'media' },
  { day: 'Terça', dayIndex: 1, hour: '16:00', occupancy: 80, appointmentsCount: 8, totalSlots: 10, status: 'alta' },
  { day: 'Terça', dayIndex: 1, hour: '18:00', occupancy: 90, appointmentsCount: 9, totalSlots: 10, status: 'lotado' },

  // Quarta (dayIndex 2)
  { day: 'Quarta', dayIndex: 2, hour: '08:00', occupancy: 35, appointmentsCount: 3, totalSlots: 10, status: 'baixa' },
  { day: 'Quarta', dayIndex: 2, hour: '10:00', occupancy: 60, appointmentsCount: 6, totalSlots: 10, status: 'media' },
  { day: 'Quarta', dayIndex: 2, hour: '12:00', occupancy: 80, appointmentsCount: 8, totalSlots: 10, status: 'alta' },
  { day: 'Quarta', dayIndex: 2, hour: '14:00', occupancy: 70, appointmentsCount: 7, totalSlots: 10, status: 'alta' },
  { day: 'Quarta', dayIndex: 2, hour: '16:00', occupancy: 85, appointmentsCount: 8, totalSlots: 10, status: 'alta' },
  { day: 'Quarta', dayIndex: 2, hour: '18:00', occupancy: 95, appointmentsCount: 9, totalSlots: 10, status: 'lotado' },

  // Quinta (dayIndex 3)
  { day: 'Quinta', dayIndex: 3, hour: '08:00', occupancy: 40, appointmentsCount: 4, totalSlots: 10, status: 'media' },
  { day: 'Quinta', dayIndex: 3, hour: '10:00', occupancy: 70, appointmentsCount: 7, totalSlots: 10, status: 'alta' },
  { day: 'Quinta', dayIndex: 3, hour: '12:00', occupancy: 85, appointmentsCount: 8, totalSlots: 10, status: 'alta' },
  { day: 'Quinta', dayIndex: 3, hour: '14:00', occupancy: 80, appointmentsCount: 8, totalSlots: 10, status: 'alta' },
  { day: 'Quinta', dayIndex: 3, hour: '16:00', occupancy: 95, appointmentsCount: 9, totalSlots: 10, status: 'lotado' },
  { day: 'Quinta', dayIndex: 3, hour: '18:00', occupancy: 100, appointmentsCount: 10, totalSlots: 10, status: 'lotado' },

  // Sexta (dayIndex 4)
  { day: 'Sexta', dayIndex: 4, hour: '08:00', occupancy: 60, appointmentsCount: 6, totalSlots: 10, status: 'media' },
  { day: 'Sexta', dayIndex: 4, hour: '10:00', occupancy: 85, appointmentsCount: 8, totalSlots: 10, status: 'alta' },
  { day: 'Sexta', dayIndex: 4, hour: '12:00', occupancy: 95, appointmentsCount: 9, totalSlots: 10, status: 'lotado' },
  { day: 'Sexta', dayIndex: 4, hour: '14:00', occupancy: 90, appointmentsCount: 9, totalSlots: 10, status: 'lotado' },
  { day: 'Sexta', dayIndex: 4, hour: '16:00', occupancy: 100, appointmentsCount: 10, totalSlots: 10, status: 'lotado' },
  { day: 'Sexta', dayIndex: 4, hour: '18:00', occupancy: 100, appointmentsCount: 10, totalSlots: 10, status: 'lotado' },

  // Sábado (dayIndex 5)
  { day: 'Sábado', dayIndex: 5, hour: '08:00', occupancy: 75, appointmentsCount: 7, totalSlots: 10, status: 'alta' },
  { day: 'Sábado', dayIndex: 5, hour: '10:00', occupancy: 100, appointmentsCount: 10, totalSlots: 10, status: 'lotado' },
  { day: 'Sábado', dayIndex: 5, hour: '12:00', occupancy: 100, appointmentsCount: 10, totalSlots: 10, status: 'lotado' },
  { day: 'Sábado', dayIndex: 5, hour: '14:00', occupancy: 100, appointmentsCount: 10, totalSlots: 10, status: 'lotado' },
  { day: 'Sábado', dayIndex: 5, hour: '16:00', occupancy: 100, appointmentsCount: 10, totalSlots: 10, status: 'lotado' },
  { day: 'Sábado', dayIndex: 5, hour: '18:00', occupancy: 95, appointmentsCount: 9, totalSlots: 10, status: 'lotado' }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Cliente VIP Chegou',
    message: 'Rodrigo Albuquerque deu entrada na recepção (Atendimento 14:00).',
    time: 'Há 5 min',
    read: false,
    type: 'vip'
  },
  {
    id: 'n2',
    title: 'Novo Agendamento On-line',
    message: 'Fábio de Souza agendou Corte Premium às 16:30.',
    time: 'Há 18 min',
    read: false,
    type: 'appointment'
  },
  {
    id: 'n3',
    title: 'Estoque Baixo',
    message: 'Pomada Matte BarberPro está com apenas 3 unidades no estoque.',
    time: 'Há 1 hora',
    read: true,
    type: 'alert'
  },
  {
    id: 'n4',
    title: 'Meta do Dia Atingida',
    message: 'Faturamento de hoje ultrapassou R$ 3.000,00 com 84% da agenda lotada.',
    time: 'Há 2 horas',
    read: true,
    type: 'system'
  }
];
