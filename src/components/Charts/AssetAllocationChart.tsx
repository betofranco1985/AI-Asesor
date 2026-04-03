import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { Asset } from '../../types/financial';

const CATEGORY_LABELS: Record<string, string> = {
  efectivo: 'Efectivo',
  acciones: 'Acciones',
  bonos: 'Bonos',
  fondos: 'Fondos',
  criptomonedas: 'Crypto',
  inmuebles: 'Inmuebles',
  negocio: 'Negocio',
  pension: 'Pensión',
  otro: 'Otro',
};

const COLORS = [
  '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6',
  '#ef4444', '#06b6d4', '#f97316', '#6366f1',
];

interface Props {
  assets: Asset[];
}

export default function AssetAllocationChart({ assets }: Props) {
  const grouped: Record<string, number> = {};
  for (const a of assets) {
    grouped[a.category] = (grouped[a.category] || 0) + a.value;
  }

  const data = Object.entries(grouped).map(([key, value]) => ({
    name: CATEGORY_LABELS[key] || key,
    value,
  }));

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <h3 className="text-slate-700 font-semibold mb-1">Distribución de Activos</h3>
      <p className="text-slate-400 text-xs mb-4">Porcentaje por categoría</p>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Valor']}
            contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
