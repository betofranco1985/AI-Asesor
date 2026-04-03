import type { FinancialSummary } from '../../types/financial';

interface Props {
  summary: FinancialSummary;
}

function Row({ label, value, sub, bold, color }: {
  label: string; value: number; sub?: string; bold?: boolean; color?: string
}) {
  const cls = bold ? 'font-bold' : 'font-medium';
  const valColor = color || (value >= 0 ? 'text-slate-700' : 'text-rose-600');
  return (
    <div className={`flex justify-between items-center py-1.5 ${bold ? 'border-t border-slate-200 mt-1 pt-2' : ''}`}>
      <div>
        <span className={`text-sm ${cls} text-slate-600`}>{label}</span>
        {sub && <span className="text-xs text-slate-400 ml-2">{sub}</span>}
      </div>
      <span className={`text-sm ${cls} ${valColor}`}>
        ${value.toLocaleString()}
      </span>
    </div>
  );
}

export default function IncomeExpenseStatement({ summary }: Props) {
  const cashFlowColor = summary.cashFlow >= 0 ? 'text-emerald-600' : 'text-rose-600';

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <h3 className="text-slate-700 font-semibold mb-4">Estado de Resultados</h3>

      {/* Income section */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Ingresos</p>
        <Row label="Ingreso activo" value={summary.totalActiveIncome} sub="(trabajo / negocio)" />
        <Row label="Ingreso pasivo" value={summary.totalPassiveIncome} sub="(inversiones)" />
        <Row label="Total Ingresos" value={summary.totalIncome} bold color="text-emerald-600" />
      </div>

      {/* Expense section */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Egresos</p>
        <Row label="Total Egresos" value={summary.totalExpenses} color="text-rose-600" />
      </div>

      {/* Cash flow */}
      <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
        <span className="font-bold text-slate-700">Flujo de Efectivo</span>
        <span className={`text-xl font-bold ${cashFlowColor}`}>
          {summary.cashFlow >= 0 ? '+' : ''}${summary.cashFlow.toLocaleString()}/mes
        </span>
      </div>
    </div>
  );
}
