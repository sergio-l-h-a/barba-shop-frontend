import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, CreditCard, DollarSign, PieChart } from 'lucide-react';

export const FinancialView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-zinc-100 flex items-center gap-2">
          <Wallet className="w-5 h-5 text-emerald-400" />
          Gestão Financeira & DRE Simplificado
        </h2>
        <p className="text-xs text-zinc-400 mt-0.5">
          Resumo de entradas, saídas, receitas por tipo de serviço e bar da casa
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 space-y-2">
          <div className="flex justify-between items-center text-xs text-zinc-400 font-semibold">
            <span>Faturamento Bruto</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-400 font-mono">R$ 48.750,00</p>
          <p className="text-[11px] text-emerald-300/80 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +18.4% no mês
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 space-y-2">
          <div className="flex justify-between items-center text-xs text-zinc-400 font-semibold">
            <span>Despesas Operacionais</span>
            <ArrowDownRight className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-2xl font-extrabold text-rose-400 font-mono">R$ 14.900,00</p>
          <p className="text-[11px] text-zinc-400">Aluguel, luz, insumos, produtos</p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 space-y-2">
          <div className="flex justify-between items-center text-xs text-zinc-400 font-semibold">
            <span>Lucro Líquido Estimado</span>
            <CreditCard className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-extrabold text-cyan-400 font-mono">R$ 33.850,00</p>
          <p className="text-[11px] text-cyan-300/80">Margem líquida de 69.4%</p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 space-y-2">
          <div className="flex justify-between items-center text-xs text-zinc-400 font-semibold">
            <span>Receita de Assinaturas (Clube)</span>
            <PieChart className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-amber-400 font-mono">R$ 12.400,00</p>
          <p className="text-[11px] text-amber-300/80">82 assinantes recorrentes</p>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Receita por Categoria */}
        <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 space-y-4">
          <h3 className="font-bold text-zinc-100 text-sm flex items-center gap-2">
            <PieChart className="w-4 h-4 text-emerald-400" />
            Origem do Faturamento
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-zinc-200">Cortes & Cabelo (62%)</span>
                <span className="font-mono text-emerald-400">R$ 30.225,00</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[62%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-zinc-200">Barba & Barbaterapia (22%)</span>
                <span className="font-mono text-emerald-400">R$ 10.725,00</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full w-[22%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-zinc-200">Produtos Boutique & Pomadas (10%)</span>
                <span className="font-mono text-emerald-400">R$ 4.875,00</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[10%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-zinc-200">Bar & Bebidas Artesanais (6%)</span>
                <span className="font-mono text-emerald-400">R$ 2.925,00</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full w-[6%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Meios de Pagamento */}
        <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 space-y-4">
          <h3 className="font-bold text-zinc-100 text-sm flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            Meios de Pagamento Recebidos
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
              <span className="text-zinc-400 font-sans">PIX (Pix QR)</span>
              <p className="text-base font-extrabold text-emerald-400">54%</p>
              <p className="text-[10px] text-zinc-500">R$ 26.325,00</p>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
              <span className="text-zinc-400 font-sans">Cartão de Crédito</span>
              <p className="text-base font-extrabold text-cyan-400">28%</p>
              <p className="text-[10px] text-zinc-500">R$ 13.650,00</p>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
              <span className="text-zinc-400 font-sans">Clube Recorrente</span>
              <p className="text-base font-extrabold text-amber-400">12%</p>
              <p className="text-[10px] text-zinc-500">R$ 5.850,00</p>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
              <span className="text-zinc-400 font-sans">Dinheiro Espécie</span>
              <p className="text-base font-extrabold text-purple-400">6%</p>
              <p className="text-[10px] text-zinc-500">R$ 2.925,00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
