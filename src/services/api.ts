import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://barbearia-shop-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para injetar o token JWT automaticamente em cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Métodos encapsulados correspondentes aos endpoints da sua API Drizzle
export const apiService = {
  // Barbearias
  getBarbearias: () => api.get('/barbearias').then((res) => res.data),
  getBarbeariaById: (id: number) => api.get(`/barbearias/${id}`).then((res) => res.data),

  // Agendamentos
  getAgendamentos: () => api.get('/agendamentos').then((res) => res.data),
  createAgendamento: (data: any) => api.post('/agendamentos', data).then((res) => res.data),
  updateAgendamento: (id: number, data: any) => api.put(`/agendamentos/${id}`, data).then((res) => res.data),
  deleteAgendamento: (id: number) => api.delete(`/agendamentos/${id}`).then((res) => res.data),

  // Barbeiros
  getBarbeiros: () => api.get('/barbeiros').then((res) => res.data),
  createBarbeiro: (data: any) => api.post('/barbeiros', data).then((res) => res.data),

  // Clientes
  getClientes: () => api.get('/clientes').then((res) => res.data),
  createCliente: (data: any) => api.post('/clientes', data).then((res) => res.data),

  // Serviços
  getServicos: () => api.get('/servicos').then((res) => res.data),

  // Financeiro
  getFinanceiro: () => api.get('/financeiro').then((res) => res.data),

  // Autenticação
  login: (credentials: { email: string; senha: string }) =>
    api.post<{ token: string }>('/usuarios/login', credentials).then((res) => res.data),
};

export default api;