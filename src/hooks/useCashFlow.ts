import { useEffect, useState } from 'react';

export interface CashFlowItem {
  period: string;
  realized: number;
  projected: number;
  expenses: number;
}

export function useCashFlow(viewMode: 'daily' | 'monthly') {
  const [data, setData] = useState<CashFlowItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/cashflow?mode=${viewMode}`);
        if (!res.ok) throw new Error('Erro ao carregar fluxo de caixa');

        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [viewMode]);

  return { data, loading, error };
}
