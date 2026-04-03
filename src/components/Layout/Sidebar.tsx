import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  Building2,
  CreditCard,
  BarChart3,
  DollarSign,
} from 'lucide-react';

const nav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/ingresos', label: 'Ingresos', icon: TrendingUp },
  { to: '/egresos', label: 'Egresos', icon: TrendingDown },
  { to: '/activos', label: 'Activos', icon: Building2 },
  { to: '/pasivos', label: 'Pasivos', icon: CreditCard },
  { to: '/analisis', label: 'Análisis', icon: BarChart3 },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700">
        <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center">
          <DollarSign size={20} className="text-white" />
        </div>
        <div>
          <p className="font-bold text-sm leading-tight">AI Asesor</p>
          <p className="text-slate-400 text-xs">Libertad Financiera</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-700">
        <p className="text-slate-500 text-xs">
          Datos guardados localmente
        </p>
      </div>
    </aside>
  );
}
