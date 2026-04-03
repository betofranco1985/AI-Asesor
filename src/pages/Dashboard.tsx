import { Link } from 'react-router-dom';
import { useFinancialStore } from '../store/financialStore';
import { useAuthStore } from '../store/authStore';
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
  PlusCircle,
} from 'lucide-react';

export default function Dashboard() {
  const { summary, history, assets, incomes, expenses, dataLoading } = useFinancialStore();
  const { user } = useAuthStore();

  const displayName = user?.user_metadata?.full_name?.split(' ')[0] || 'bienvenido';
  const isEmpty = incomes.length === 0 && expenses.length === 0 && assets.length === 0;

  if (dataLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Cargando tus datos...</p>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div>
        <Header title={`Hola, ${displayName}`} subtitle="Comienza a registrar tu información financiera" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { to: '/ingresos', label: 'Agregar Ingresos', desc: 'Salario, freelance, alquiler, dividendos...', color: 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100', icon: '💵' },
            { to: '/egresos',  label: 'Agregar Egresos',  desc: 'Vivienda, comida, transporte, deudas...', color: 'bg-rose-50 border-rose-200 hover:bg-rose-100',     icon: '📤' },
            { to: '/activos',  label: 'Agregar Activos',  desc: 'Acciones, inmuebles, bonos, crypto...', color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',      icon: '📈' },
            { to: '/pasivos',  label: 'Agregar Pasivos',  desc: 'Hipoteca, préstamos, tarjetas...', color: 'bg-amber-50 border-amber-200 hover:bg-amber-100',    icon: '💳' },
          ].map(({ to, label, desc, color, icon }) => (
            <Link key={to} to={to}
              className={`rounded-2xl p-6 border-2 border-dashed ${color} transition-colors flex flex-col items-center text-center gap-3`}>
              <span className="text-4xl">{icon}</span>
              <div>
                <p className="font-semibold text-slate-700">{label}</p>
                <p className="text-slate-500 text-xs mt-1">{desc}</p>
              </div>
              <PlusCircle size={20} className="text-slate-400" />
            </Link>
          ))}
        </div>
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-5 flex gap-4">
          <span className="text-2xl">💡</span>
          <div>
            <p className="font-semibold text-blue-700">¿Por dónde empezar?</p>
            <p className="text-blue-600 text-sm mt-1">
              Empieza por <strong>Ingresos</strong> y <strong>Egresos</strong> para ver tu flujo de efectivo.
              Luego agrega tus <strong>Activos</strong> (inversiones, inmuebles) y <strong>Pasivos</strong> (deudas) para calcular tu patrimonio neto.
              El dashboard se irá completando solo.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const cashFlowColor = summary.cashFlow >= 0 ? 'emerald' : 'rose';

  return (
    <div>
      <Header
        title={`Hola, ${displayName}`}
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
