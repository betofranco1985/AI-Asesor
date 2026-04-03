import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  Building2,
  CreditCard,
  BarChart3,
  DollarSign,
  LogOut,
  User,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useFinancialStore } from '../../store/financialStore';

const nav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/ingresos', label: 'Ingresos', icon: TrendingUp },
  { to: '/egresos', label: 'Egresos', icon: TrendingDown },
  { to: '/activos', label: 'Activos', icon: Building2 },
  { to: '/pasivos', label: 'Pasivos', icon: CreditCard },
  { to: '/analisis', label: 'Análisis', icon: BarChart3 },
];

export default function Sidebar() {
  const { user, signOut } = useAuthStore();
  const { clearUserData } = useFinancialStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    clearUserData();
    await signOut();
    navigate('/auth');
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuario';
  const initials = displayName
    .split(' ')
    .map((w: string) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

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

      {/* User info + logout */}
      <div className="px-3 py-4 border-t border-slate-700 space-y-2">
        {/* User card */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-800">
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
            {initials || <User size={14} />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{displayName}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-rose-400 transition-colors"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
