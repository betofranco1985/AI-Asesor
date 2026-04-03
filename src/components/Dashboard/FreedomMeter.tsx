interface FreedomMeterProps {
  ratio: number; // 0–100+
  passiveIncome: number;
  expenses: number;
}

export default function FreedomMeter({ ratio, passiveIncome, expenses }: FreedomMeterProps) {
  const clamped = Math.min(ratio, 100);

  const getColor = () => {
    if (ratio >= 100) return '#10b981'; // emerald
    if (ratio >= 75)  return '#3b82f6'; // blue
    if (ratio >= 50)  return '#f59e0b'; // amber
    return '#ef4444';                   // red
  };

  const getLabel = () => {
    if (ratio >= 100) return 'Financieramente Libre 🎉';
    if (ratio >= 75)  return 'Casi ahí, sigue adelante';
    if (ratio >= 50)  return 'Buen progreso';
    if (ratio >= 25)  return 'En camino';
    return 'Inicio del camino';
  };

  const color = getColor();
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col items-center">
      <h3 className="text-slate-600 text-sm font-semibold mb-4 self-start">Índice de Libertad Financiera</h3>

      <div className="relative flex items-center justify-center mb-4">
        <svg width="140" height="140" viewBox="0 0 120 120">
          {/* Background track */}
          <circle
            cx="60" cy="60" r="52"
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="10"
          />
          {/* Progress arc */}
          <circle
            cx="60" cy="60" r="52"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 60 60)"
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-bold text-slate-800">{ratio.toFixed(0)}%</span>
        </div>
      </div>

      <p className="text-sm font-semibold text-center mb-4" style={{ color }}>{getLabel()}</p>

      <div className="w-full space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">Ingreso pasivo</span>
          <span className="font-semibold text-emerald-600">${passiveIncome.toLocaleString()}/mes</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Egresos totales</span>
          <span className="font-semibold text-slate-700">${expenses.toLocaleString()}/mes</span>
        </div>
        <div className="h-px bg-slate-100 my-1" />
        <p className="text-xs text-slate-400 text-center">
          Necesitas {ratio < 100
            ? `$${(expenses - passiveIncome).toLocaleString()}/mes más en ingreso pasivo`
            : 'mantener tu ingreso pasivo'}
        </p>
      </div>
    </div>
  );
}
