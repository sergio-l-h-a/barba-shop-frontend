import { useEffect, useState } from "react";

export interface FinancialData {
  grossRevenue: number;
  operationalExpenses: number;
  netProfit: number;
  subscriptionsRevenue: number;

  hairRevenue: number;
  beardRevenue: number;
  productsRevenue: number;
  barRevenue: number;

  pixPercent: number;
  creditPercent: number;
  clubPercent: number;
  cashPercent: number;

  pixValue: number;
  creditValue: number;
  clubValue: number;
  cashValue: number;
}

export function useFinancial() {
  const [data, setData] = useState<FinancialData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/financial");
      const json = await res.json();
      setData(json);
      setLoading(false);
    }
    load();
  }, []);

  return { data, loading };
}
