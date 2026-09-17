import { useEffect, useState } from 'react';

export interface BarberPerformance {
  id: number;
  name: string;
  nickname?: string;
  avatar: string;
  monthlyRevenue: number;
  appointmentsCount: number;
  rating: number;
  specialty: string;
  status: string;
  chairNumber: number;
}

export function useBarberPerformance() {
  const [data, setData] = useState<BarberPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/barbers/performance');
        if (!res.ok) throw new Error('Erro ao carregar desempenho dos barbeiros');

        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { data, loading, error };
}
