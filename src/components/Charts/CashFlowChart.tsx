import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { MonthlySnapshot } from '../../types/financial';

const monthLabels: Record<string, string> = {
  '01': 'Ene', '02': 'Feb', '03': 'Mar', '04': 'Abr',
  '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Ago',
  '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dic',
};

function formatMonth(m: string) {
  const [year, mon] = m.split('-');
  return `${monthLabels[mon]} ${year.slice(2)}`;
}

interface Props {
  data: MonthlySnapshot[];
}

export default function CashFlowChart({ data }: Props) {
  const formatted = data.map(d => ({
    ...d,
    name: formatMonth(d.month),
  }));

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <h3 className="text-slate-700 font-semibold mb-1">Flujo de Efectivo</h3>
      <p className="text-slate-400 text-xs mb-4">Ingresos vs egresos mensuales</p>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={formatted} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="gradIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradCashFlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
          <Tooltip
            formatter={(value, name) => [
              `$${Number(value).toLocaleString()}`,
              name === 'income' ? 'Ingresos' : name === 'expenses' ? 'Egresos' : 'Flujo Neto',
            ]}
            contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
          />
          <Legend
            formatter={(v) => v === 'income' ? 'Ingresos' : v === 'expenses' ? 'Egresos' : 'Flujo Neto'}
            iconType="circle"
            wrapperStyle={{ fontSize: 12 }}
          />
          <Area type="monotone" dataKey="income" stroke="#10b981" fill="url(#gradIncome)" strokeWidth={2} dot={false} />
          <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="url(#gradExpense)" strokeWidth={2} dot={false} />
          <Area type="monotone" dataKey="cashFlow" stroke="#3b82f6" fill="url(#gradCashFlow)" strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
