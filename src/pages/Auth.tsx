import { useState } from 'react';
import { DollarSign, Eye, EyeOff, TrendingUp, Shield, BarChart3 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

type Tab = 'login' | 'register';

export default function Auth() {
  const { signIn, signUp, loading } = useAuthStore();

  const [tab, setTab] = useState<Tab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (tab === 'register') {
      if (!fullName.trim()) return setError('Por favor ingresa tu nombre.');
      if (password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres.');
      if (password !== confirmPassword) return setError('Las contraseñas no coinciden.');

      const err = await signUp(email, password, fullName);
      if (err) return setError(translateError(err));
      setSuccess('✅ Cuenta creada. Revisa tu correo para confirmar y luego inicia sesión.');
      setTab('login');
    } else {
      const err = await signIn(email, password);
      if (err) return setError(translateError(err));
    }
  };

  const switchTab = (t: Tab) => {
    setTab(t);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">

      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl" />
        </div>

        {/* Logo */}
        <div className="flex items-center gap-3 relative">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg">
            <DollarSign size={24} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-lg leading-tight">AI Asesor Financiero</p>
            <p className="text-slate-400 text-sm">Tu camino a la libertad financiera</p>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-6 relative">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Toma el control de<br />
            <span className="text-emerald-400">tus finanzas personales</span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Registra tus ingresos, egresos, activos y pasivos. Mide tu índice de libertad financiera y sigue un plan personalizado.
          </p>

          <div className="space-y-4 pt-2">
            {[
              { icon: TrendingUp, text: 'Flujo de efectivo en tiempo real' },
              { icon: BarChart3, text: 'Análisis y gráficos de tu progreso' },
              { icon: Shield, text: 'Tus datos seguros y privados' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Icon size={16} className="text-emerald-400" />
                </div>
                <span className="text-slate-300 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-slate-500 text-sm relative">© 2026 AI Asesor Financiero</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 justify-center mb-8">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
              <DollarSign size={22} className="text-white" />
            </div>
            <p className="text-white font-bold text-lg">AI Asesor Financiero</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-1">
              {tab === 'login' ? 'Bienvenido de vuelta' : 'Crea tu cuenta'}
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              {tab === 'login'
                ? 'Ingresa tus datos para acceder a tu perfil'
                : 'Comienza a gestionar tus finanzas hoy'}
            </p>

            {/* Tab toggle */}
            <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
              {(['login', 'register'] as Tab[]).map(t => (
                <button
                  key={t}
                  onClick={() => switchTab(t)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    tab === t
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {t === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
                </button>
              ))}
            </div>

            {/* Alerts */}
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl px-4 py-3 mb-4">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl px-4 py-3 mb-4">
                {success}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nombre completo</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Juan Pérez"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Correo electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={tab === 'register' ? 'Mínimo 6 caracteres' : '••••••••'}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {tab === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Confirmar contraseña</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Repite tu contraseña"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-sm mt-2"
              >
                {loading
                  ? 'Cargando...'
                  : tab === 'login'
                  ? 'Iniciar Sesión'
                  : 'Crear cuenta gratis'}
              </button>
            </form>

            <p className="text-center text-xs text-slate-400 mt-6">
              {tab === 'login' ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
              <button
                onClick={() => switchTab(tab === 'login' ? 'register' : 'login')}
                className="text-emerald-600 font-medium hover:underline"
              >
                {tab === 'login' ? 'Regístrate aquí' : 'Inicia sesión'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Translate Supabase English errors to Spanish
function translateError(msg: string): string {
  if (msg.includes('Invalid login credentials')) return 'Correo o contraseña incorrectos.';
  if (msg.includes('Email not confirmed')) return 'Debes confirmar tu correo antes de iniciar sesión.';
  if (msg.includes('already registered') || msg.includes('already been registered')) return 'Este correo ya tiene una cuenta. Inicia sesión.';
  if (msg.includes('Password should be')) return 'La contraseña debe tener al menos 6 caracteres.';
  if (msg.includes('Unable to validate')) return 'Datos inválidos. Verifica tu correo y contraseña.';
  if (msg.includes('rate limit')) return 'Demasiados intentos. Espera un momento e intenta de nuevo.';
  return msg;
}
