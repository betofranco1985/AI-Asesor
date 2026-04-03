import { useFinancialStore } from '../store/financialStore';
import Header from '../components/Layout/Header';
import KPICard from '../components/Dashboard/KPICard';
import FreedomMeter from '../components/Dashboard/FreedomMeter';
import IncomeExpenseStatement from '../components/Dashboard/IncomeExpenseStatement';
import BalanceSheet from '../components/Dashboard/BalanceSheet';
import CashFlowChart from '../components/Charts/CashFlowChart';
import AssetAllocationChart from '../components/Charts/AssetAllocationChart';
import NetWorthChart from '../components/Charts/NetWorthChart';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
} from 'lucide-react';

export default function Dashboard() {
  const { summary, history, assets } = useFinancialStore();

  const cashFlowColor = summary.cashFlow >= 0 ? 'emerald' : 'rose';

  return (
    <div>
      <Header
        title="Dashboard"
        subtitle="Resumen de tu situación financiera"
      />

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          title="Flujo de Efectivo"
          value={`$${summary.cashFlow.toLocaleString()}/mes`}
          subtitle="Ingresos menos egresos"
          icon={<DollarSign size={18} />}
          color={cashFlowColor}
        />
        <KPICard
          title="Ingresos Totales"
          value={`$${summary.totalIncome.toLocaleString()}/mes`}
          subtitle={`Activo $${summary.totalActiveIncome.toLocaleString()} + Pasivo $${summary.totalPassiveIncome.toLocaleString()}`}
          icon={<TrendingUp size={18} />}
          color="blue"
        />
        <KPICard
          title="Egresos Totales"
          value={`$${summary.totalExpenses.toLocaleString()}/mes`}
          subtitle="Gastos fijos + variables"
          icon={<TrendingDown size={18} />}
          color="rose"
        />
        <KPICard
          title="Patrimonio Neto"
          value={`$${summary.netWorth.toLocaleString()}`}
          subtitle="Activos menos pasivos"
          icon={<Wallet size={18} />}
          color="violet"
        />
      </div>

      {/* Middle section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <FreedomMeter
          ratio={summary.freedomRatio}
          passiveIncome={summary.totalPassiveIncome}
          expenses={summary.totalExpenses}
        />
        <IncomeExpenseStatement summary={summary} />
        <BalanceSheet summary={summary} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <CashFlowChart data={history} />
        <NetWorthChart data={history} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AssetAllocationChart assets={assets} />

        {/* Quick tips */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="text-slate-700 font-semibold mb-4">Acciones Recomendadas</h3>
          <ul className="space-y-3">
            {summary.freedomRatio < 100 && (
              <li className="flex gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">!</span>
                <span className="text-slate-600">Incrementa tu ingreso pasivo: necesitas <strong className="text-amber-600">${(summary.totalExpenses - summary.totalPassiveIncome).toLocaleString()}/mes</strong> más para la libertad financiera.</span>
              </li>
            )}
            {summary.debtToAssetRatio > 50 && (
              <li className="flex gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">!</span>
                <span className="text-slate-600">Tu ratio deuda/activos es <strong className="text-rose-600">{summary.debtToAssetRatio.toFixed(0)}%</strong>. Prioriza eliminar deuda de alto interés.</span>
              </li>
            )}
            {summary.cashFlow > 0 && (
              <li className="flex gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                <span className="text-slate-600">Tienes <strong className="text-emerald-600">${summary.cashFlow.toLocaleString()}/mes</strong> de flujo positivo. Invierte en activos generadores de ingreso pasivo.</span>
              </li>
            )}
            <li className="flex gap-3 text-sm">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">i</span>
              <span className="text-slate-600">Regla del 50/30/20: 50% necesidades, 30% deseos, 20% ahorro e inversión.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
