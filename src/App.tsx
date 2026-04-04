import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Ingresos from './pages/Ingresos';
import Egresos from './pages/Egresos';
import Activos from './pages/Activos';
import Pasivos from './pages/Pasivos';
import Analisis from './pages/Analisis';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="ingresos" element={<Ingresos />} />
          <Route path="egresos" element={<Egresos />} />
          <Route path="activos" element={<Activos />} />
          <Route path="pasivos" element={<Pasivos />} />
          <Route path="analisis" element={<Analisis />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
