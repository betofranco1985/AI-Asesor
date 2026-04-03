import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useFinancialStore } from './store/financialStore';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Ingresos from './pages/Ingresos';
import Egresos from './pages/Egresos';
import Activos from './pages/Activos';
import Pasivos from './pages/Pasivos';
import Analisis from './pages/Analisis';

function AppRoutes() {
  const { user, initialized, initialize } = useAuthStore();
  const { loadUserData, clearUserData } = useFinancialStore();

  // Initialize auth session on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Load / clear user data when auth state changes
  useEffect(() => {
    if (user) {
      loadUserData(user.id);
    } else if (initialized) {
      clearUserData();
    }
  }, [user, initialized, loadUserData, clearUserData]);

  return (
    <Routes>
      {/* Public route */}
      <Route path="/auth" element={
        user ? <Navigate to="/" replace /> : <Auth />
      } />

      {/* Protected routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="ingresos" element={<Ingresos />} />
        <Route path="egresos" element={<Egresos />} />
        <Route path="activos" element={<Activos />} />
        <Route path="pasivos" element={<Pasivos />} />
        <Route path="analisis" element={<Analisis />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
