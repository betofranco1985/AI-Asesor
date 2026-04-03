interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: { value: number; label: string };
  color: 'emerald' | 'blue' | 'amber' | 'rose' | 'violet' | 'slate';
}

const colorMap = {
  emerald: { bg: 'bg-emerald-50', icon: 'bg-emerald-500', text: 'text-emerald-600' },
  blue:    { bg: 'bg-blue-50',    icon: 'bg-blue-500',    text: 'text-blue-600' },
  amber:   { bg: 'bg-amber-50',   icon: 'bg-amber-500',   text: 'text-amber-600' },
  rose:    { bg: 'bg-rose-50',    icon: 'bg-rose-500',    text: 'text-rose-600' },
  violet:  { bg: 'bg-violet-50',  icon: 'bg-violet-500',  text: 'text-violet-600' },
  slate:   { bg: 'bg-slate-50',   icon: 'bg-slate-500',   text: 'text-slate-600' },
};

export default function KPICard({ title, value, subtitle, icon, trend, color }: KPICardProps) {
  const c = colorMap[color];
  return (
    <div className={`rounded-2xl p-5 ${c.bg} border border-white`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
          {subtitle && <p className="text-slate-500 text-xs mt-1">{subtitle}</p>}
        </div>
        <div className={`w-10 h-10 rounded-xl ${c.icon} flex items-center justify-center text-white`}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className="mt-3 pt-3 border-t border-white/60">
          <span className={`text-xs font-medium ${trend.value >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trend.value >= 0 ? '+' : ''}{trend.value}%
          </span>
          <span className="text-slate-400 text-xs ml-1">{trend.label}</span>
        </div>
      )}
    </div>
  );
}
