import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend,
} from 'recharts';
import { useFinancialStore } from '../store/financialStore';
import Header from '../components/Layout/Header';
import FreedomMeter from '../components/Dashboard/FreedomMeter';

const monthLabels: Record<string, string> = {
  '01': 'Ene', '02': 'Feb', '03': 'Mar', '04': 'Abr',
  '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Ago',
  '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dic',
};
const formatMonth = (m: string) => {
  const [y, mo] = m.split('-');
  return `${monthLabels[mo]} ${y.slice(2)}`;
};

function ScoreCard({ label, score, description }: { label: string; score: number; description: string }) {
  const color = score >= 80 ? '#10b981' : score >= 60 ? '#3b82f6' : score >= 40 ? '#f59e0b' : '#ef4444';
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-slate-600">{label}</p>
        <span className="text-lg font-bold" style={{ color }}>{score}/100</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
        <div className="h-2 rounded-full transition-all" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
      <p className="text-xs text-slate-400">{description}</p>
    </div>
  );
}

export default function Analisis() {
  const { summary, history, incomes, expenses, liabilities } = useFinancialStore();

  // ─── Financial health scores ──────────────────────────────────────────────
  const savingsRate = summary.totalIncome > 0
    ? Math.min((summary.cashFlow / summary.totalIncome) * 100, 100)
    : 0;

  const debtScore = Math.max(0, 100 - summary.debtToAssetRatio * 1.5);

  const passiveRatio = summary.totalIncome > 0
    ? Math.min((summary.totalPassiveIncome / summary.totalIncome) * 100, 100)
    : 0;

  const freedomScore = Math.min(summary.freedomRatio, 100);

  const radarData = [
    { subject: 'Ahorro', value: Math.max(0, savingsRate) },
    { subject: 'Libertad', value: freedomScore },
    { subject: 'Ingreso Pasivo', value: passiveRatio },
    { subject: 'Bajo endeudamiento', value: debtScore },
    { subject: 'Flujo positivo', value: summary.cashFlow > 0 ? Math.min((summary.cashFlow / summary.totalIncome) * 100 * 5, 100) : 0 },
  ];

  // ─── Income breakdown ─────────────────────────────────────────────────────
  const incomeByCategory = incomes.reduce<Record<string, number>>((acc, i) => {
    acc[i.category] = (acc[i.category] || 0) + i.amount;
    return acc;
  }, {});
  const incomeChartData = Object.entries(incomeByCategory).map(([k, v]) => ({ name: k, value: v }));

  // ─── Expense breakdown ────────────────────────────────────────────────────
  const expByCategory = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});
  const expChartData = Object.entries(expByCategory).map(([k, v]) => ({ name: k, value: v }));

  // ─── Passive income trend ─────────────────────────────────────────────────
  const passiveTrend = history.map(h => ({
    name: formatMonth(h.month),
    pasivo: h.passiveIncome,
    egresos: h.expenses,
  }));

  // ─── Recommendations ──────────────────────────────────────────────────────
  const highInterestDebt = liabilities.filter(l => l.interestRate > 15);
  const passiveGap = summary.totalExpenses - summary.totalPassiveIncome;

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4', '#f97316', '#6366f1'];

  return (
    <div>
      <Header
        title="Análisis Financiero"
        subtitle="Diagnóstico completo de tu salud financiera"
      />

      {/* Freedom meter + radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <FreedomMeter
          ratio={summary.freedomRatio}
          passiveIncome={summary.totalPassiveIncome}
          expenses={summary.totalExpenses}
        />

        {/* Health Radar */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="text-slate-700 font-semibold mb-1">Radar Financiero</h3>
          <p className="text-slate-400 text-xs mb-3">Indicadores de salud financiera</p>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.25} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Scores */}
        <div className="space-y-3">
          <ScoreCard
            label="Tasa de Ahorro"
            score={Math.round(Math.max(0, savingsRate))}
            description={`Ahorras el ${savingsRate.toFixed(1)}% de tus ingresos. Meta: >20%`}
          />
          <ScoreCard
            label="Índice de Libertad"
            score={Math.round(freedomScore)}
            description={`Ingreso pasivo cubre el ${summary.freedomRatio.toFixed(0)}% de tus gastos`}
          />
          <ScoreCard
            label="Salud de Deuda"
            score={Math.round(Math.max(0, debtScore))}
            description={`Ratio deuda/activos: ${summary.debtToAssetRatio.toFixed(1)}%. Meta: <30%`}
          />
        </div>
      </div>

      {/* Passive income vs expenses trend */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-4">
        <h3 className="text-slate-700 font-semibold mb-1">Ingreso Pasivo vs Egresos</h3>
        <p className="text-slate-400 text-xs mb-4">Cuando la línea verde supere la roja, serás financieramente libre</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={passiveTrend} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false}
              tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              formatter={(v, name) => [`$${Number(v).toLocaleString()}`, name === 'pasivo' ? 'Ingreso Pasivo' : 'Egresos']}
              contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
            />
            <Legend formatter={v => v === 'pasivo' ? 'Ingreso Pasivo' : 'Egresos'} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="egresos" fill="#fca5a5" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pasivo" fill="#6ee7b7" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Income and expense breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="text-slate-700 font-semibold mb-4">Ingresos por Fuente</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={incomeChartData} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false}
                tickFormatter={v => `$${v.toLocaleString()}`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Monto']}
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {incomeChartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="text-slate-700 font-semibold mb-4">Egresos por Categoría</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={expChartData} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false}
                tickFormatter={v => `$${v.toLocaleString()}`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Monto']}
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {expChartData.map((_, i) => <Cell key={i} fill={COLORS[(i + 4) % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Personalized recommendations */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="text-slate-700 font-semibold mb-4">Plan de Acción Personalizado</h3>
        <div className="space-y-4">
          {highInterestDebt.length > 0 && (
            <div className="flex gap-4 p-4 bg-rose-50 rounded-xl">
              <span className="text-2xl">🔥</span>
              <div>
                <p className="font-semibold text-rose-700 text-sm">Elimina deuda de alto interés</p>
                <p className="text-rose-600 text-xs mt-1">
                  Tienes {highInterestDebt.length} deuda(s) con tasa &gt;15%:{' '}
                  {highInterestDebt.map(d => `${d.name} (${d.interestRate}%)`).join(', ')}.
                  Usa el método avalancha: paga el mínimo en todas y el excedente en la de mayor tasa.
                </p>
              </div>
            </div>
          )}

          {passiveGap > 0 && (
            <div className="flex gap-4 p-4 bg-amber-50 rounded-xl">
              <span className="text-2xl">📈</span>
              <div>
                <p className="font-semibold text-amber-700 text-sm">Aumenta tu ingreso pasivo</p>
                <p className="text-amber-600 text-xs mt-1">
                  Necesitas <strong>${passiveGap.toLocaleString()}/mes</strong> más en ingreso pasivo para alcanzar la libertad financiera.
                  Considera: ETFs de dividendos, REITs, bonos corporativos, o bienes raíces en alquiler.
                </p>
              </div>
            </div>
          )}

          {summary.cashFlow > 0 && (
            <div className="flex gap-4 p-4 bg-emerald-50 rounded-xl">
              <span className="text-2xl">💰</span>
              <div>
                <p className="font-semibold text-emerald-700 text-sm">Invierte tu flujo de efectivo positivo</p>
                <p className="text-emerald-600 text-xs mt-1">
                  Tienes <strong>${summary.cashFlow.toLocaleString()}/mes</strong> de flujo positivo.
                  Regla del 50/30/20: destina al menos el 20% (${(summary.cashFlow * 0.2).toLocaleString()}) a inversiones que generen ingreso pasivo.
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-4 p-4 bg-blue-50 rounded-xl">
            <span className="text-2xl">🎯</span>
            <div>
              <p className="font-semibold text-blue-700 text-sm">Estrategia de diversificación</p>
              <p className="text-blue-600 text-xs mt-1">
                Para la libertad financiera, apunta a: 40% acciones/ETFs, 20% inmuebles, 20% bonos/renta fija,
                10% negocio propio, 10% efectivo/liquidez. Revisa tu asignación actual en la sección Activos.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-violet-50 rounded-xl">
            <span className="text-2xl">📚</span>
            <div>
              <p className="font-semibold text-violet-700 text-sm">Conceptos clave (Kiyosaki)</p>
              <p className="text-violet-600 text-xs mt-1">
                Un <strong>activo</strong> pone dinero en tu bolsillo cada mes. Un <strong>pasivo</strong> saca dinero de tu bolsillo.
                La clave de la libertad financiera es acumular activos que generen ingreso pasivo suficiente para cubrir todos tus gastos.
                Tu ratio actual: <strong>{summary.freedomRatio.toFixed(0)}%</strong> del camino.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
