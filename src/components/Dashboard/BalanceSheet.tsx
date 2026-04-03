import type { FinancialSummary } from '../../types/financial';

interface Props {
  summary: FinancialSummary;
}

export default function BalanceSheet({ summary }: Props) {
  const netWorthColor = summary.netWorth >= 0 ? 'text-emerald-600' : 'text-rose-600';

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <h3 className="text-slate-700 font-semibold mb-4">Balance General</h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Assets column */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Activos</p>
          <div className="bg-emerald-50 rounded-xl p-4">
            <p className="text-xs text-emerald-700 mb-1">Total Activos</p>
            <p className="text-2xl font-bold text-emerald-700">
              ${summary.totalAssets.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Liabilities column */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Pasivos</p>
          <div className="bg-rose-50 rounded-xl p-4">
            <p className="text-xs text-rose-700 mb-1">Total Pasivos</p>
            <p className="text-2xl font-bold text-rose-700">
              ${summary.totalLiabilities.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Net Worth */}
      <div className="bg-slate-50 rounded-xl p-4 flex justify-between items-center">
        <span className="font-bold text-slate-700">Patrimonio Neto</span>
        <span className={`text-xl font-bold ${netWorthColor}`}>
          ${summary.netWorth.toLocaleString()}
        </span>
      </div>

      {/* Debt to asset ratio */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Ratio Deuda / Activos</span>
          <span>{summary.debtToAssetRatio.toFixed(1)}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-2 rounded-full bg-rose-400 transition-all"
            style={{ width: `${Math.min(summary.debtToAssetRatio, 100)}%` }}
          />
        </div>
        <p className="text-xs text-slate-400 mt-1">
          {summary.debtToAssetRatio < 30
            ? 'Saludable — deuda baja'
            : summary.debtToAssetRatio < 60
            ? 'Moderado — reducir deuda'
            : 'Alto — priorizar pago de deuda'}
        </p>
      </div>
    </div>
  );
}
