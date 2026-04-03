import { useState } from 'react';
import { Plus, Pencil, Trash2, TrendingUp } from 'lucide-react';
import { useFinancialStore } from '../store/financialStore';
import Header from '../components/Layout/Header';
import Modal from '../components/ui/Modal';
import ConfirmDelete from '../components/ui/ConfirmDelete';
import { FormField, inputCls, selectCls } from '../components/ui/FormField';
import type { Asset, AssetCategory } from '../types/financial';

const CATEGORIES: { value: AssetCategory; label: string; color: string; emoji: string }[] = [
  { value: 'efectivo',       label: 'Efectivo / Ahorro',     color: 'bg-slate-100 text-slate-700',    emoji: '💵' },
  { value: 'acciones',       label: 'Acciones / ETFs',        color: 'bg-blue-100 text-blue-700',      emoji: '📈' },
  { value: 'bonos',          label: 'Bonos / Renta Fija',    color: 'bg-emerald-100 text-emerald-700', emoji: '📄' },
  { value: 'fondos',         label: 'Fondos de inversión',   color: 'bg-teal-100 text-teal-700',       emoji: '🏦' },
  { value: 'criptomonedas',  label: 'Criptomonedas',         color: 'bg-amber-100 text-amber-700',     emoji: '₿' },
  { value: 'inmuebles',      label: 'Inmuebles',             color: 'bg-orange-100 text-orange-700',   emoji: '🏠' },
  { value: 'negocio',        label: 'Negocio propio',        color: 'bg-violet-100 text-violet-700',   emoji: '🏢' },
  { value: 'pension',        label: 'Pensión / Jubilación',  color: 'bg-rose-100 text-rose-700',       emoji: '🎯' },
  { value: 'otro',           label: 'Otro',                  color: 'bg-gray-100 text-gray-700',       emoji: '📦' },
];

const emptyForm = (): Omit<Asset, 'id'> => ({
  name: '', value: 0, monthlyIncome: 0, category: 'acciones', currency: 'USD', annualReturn: 0, notes: '',
});

export default function Activos() {
  const { assets, summary, addAsset, updateAsset, deleteAsset } = useFinancialStore();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Asset | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Asset, 'id'>>(emptyForm());

  const openAdd = () => { setForm(emptyForm()); setEditing(null); setShowForm(true); };
  const openEdit = (a: Asset) => { setForm({ ...a }); setEditing(a); setShowForm(true); };
  const closeForm = () => setShowForm(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) updateAsset({ ...form, id: editing.id });
    else addAsset(form);
    closeForm();
  };

  const totalMonthlyIncome = assets.reduce((s, a) => s + a.monthlyIncome, 0);
  const deletingItem = assets.find(a => a.id === deletingId);

  return (
    <div>
      <Header
        title="Activos"
        subtitle="Inversiones y bienes que generan valor"
        action={
          <button onClick={openAdd}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors">
            <Plus size={16} /> Agregar activo
          </button>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-2xl p-4">
          <p className="text-xs text-blue-600 font-medium">Total Activos</p>
          <p className="text-2xl font-bold text-blue-700">${summary.totalAssets.toLocaleString()}</p>
          <p className="text-xs text-slate-400">{assets.length} activos registrados</p>
        </div>
        <div className="bg-emerald-50 rounded-2xl p-4">
          <p className="text-xs text-emerald-600 font-medium">Ingreso Pasivo Generado</p>
          <p className="text-2xl font-bold text-emerald-700">${totalMonthlyIncome.toLocaleString()}</p>
          <p className="text-xs text-slate-400">por mes</p>
        </div>
        <div className="bg-violet-50 rounded-2xl p-4">
          <p className="text-xs text-violet-600 font-medium">Rendimiento Promedio</p>
          <p className="text-2xl font-bold text-violet-700">
            {assets.length > 0
              ? (assets.reduce((s, a) => s + (a.annualReturn || 0), 0) / assets.length).toFixed(1)
              : 0}%
          </p>
          <p className="text-xs text-slate-400">anual estimado</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Activo</th>
              <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Categoría</th>
              <th className="text-right text-xs font-semibold text-slate-500 px-5 py-3">Valor actual</th>
              <th className="text-right text-xs font-semibold text-slate-500 px-5 py-3">Ingreso/mes</th>
              <th className="text-right text-xs font-semibold text-slate-500 px-5 py-3">Retorno anual</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {assets.map(asset => {
              const cat = CATEGORIES.find(c => c.value === asset.category);
              return (
                <tr key={asset.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{cat?.emoji}</span>
                      <span className="text-sm font-medium text-slate-700">{asset.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${cat?.color || ''}`}>
                      {cat?.label}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right text-sm font-semibold text-blue-600">
                    ${asset.value.toLocaleString()}
                  </td>
                  <td className="px-5 py-3 text-right text-sm">
                    {asset.monthlyIncome > 0
                      ? <span className="font-semibold text-emerald-600">${asset.monthlyIncome.toLocaleString()}</span>
                      : <span className="text-slate-300">—</span>
                    }
                  </td>
                  <td className="px-5 py-3 text-right text-sm">
                    {asset.annualReturn
                      ? <span className="flex items-center justify-end gap-1 text-emerald-600 font-medium">
                          <TrendingUp size={12} />{asset.annualReturn}%
                        </span>
                      : <span className="text-slate-300">—</span>
                    }
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(asset)}
                        className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => setDeletingId(asset.id)}
                        className="w-8 h-8 rounded-lg hover:bg-rose-50 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {assets.length === 0 && (
          <div className="py-16 text-center text-slate-400 text-sm">Sin activos registrados.</div>
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <Modal title={editing ? 'Editar activo' : 'Agregar activo'} onClose={closeForm}>
          <form onSubmit={handleSubmit}>
            <FormField label="Nombre del activo">
              <input className={inputCls} value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Ej: Portafolio ETF S&P500" required />
            </FormField>
            <FormField label="Categoría">
              <select className={selectCls} value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value as AssetCategory }))}>
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.emoji} {c.label}</option>)}
              </select>
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Valor actual (USD)">
                <input className={inputCls} type="number" min="0" step="0.01"
                  value={form.value || ''}
                  onChange={e => setForm(f => ({ ...f, value: parseFloat(e.target.value) || 0 }))}
                  placeholder="0.00" required />
              </FormField>
              <FormField label="Ingreso mensual (USD)" hint="Ingreso pasivo generado">
                <input className={inputCls} type="number" min="0" step="0.01"
                  value={form.monthlyIncome || ''}
                  onChange={e => setForm(f => ({ ...f, monthlyIncome: parseFloat(e.target.value) || 0 }))}
                  placeholder="0.00" />
              </FormField>
            </div>
            <FormField label="Retorno anual estimado (%)" hint="Ej: 8 para 8% anual">
              <input className={inputCls} type="number" min="0" step="0.1"
                value={form.annualReturn || ''}
                onChange={e => setForm(f => ({ ...f, annualReturn: parseFloat(e.target.value) || 0 }))}
                placeholder="0.0" />
            </FormField>
            <FormField label="Notas (opcional)">
              <textarea className={inputCls} rows={2} value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="Ticker, broker, detalles..." />
            </FormField>
            <div className="flex gap-3 justify-end pt-2">
              <button type="button" onClick={closeForm}
                className="px-4 py-2 text-sm rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                Cancelar
              </button>
              <button type="submit"
                className="px-4 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors font-medium">
                {editing ? 'Guardar cambios' : 'Agregar'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deletingItem && (
        <ConfirmDelete name={deletingItem.name}
          onConfirm={() => { deleteAsset(deletingItem.id); setDeletingId(null); }}
          onCancel={() => setDeletingId(null)} />
      )}
    </div>
  );
}
