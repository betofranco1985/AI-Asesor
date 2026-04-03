import { useState } from 'react';
import { Plus, Pencil, Trash2, AlertTriangle } from 'lucide-react';
import { useFinancialStore } from '../store/financialStore';
import Header from '../components/Layout/Header';
import Modal from '../components/ui/Modal';
import ConfirmDelete from '../components/ui/ConfirmDelete';
import { FormField, inputCls, selectCls } from '../components/ui/FormField';
import type { Liability, LiabilityCategory } from '../types/financial';

const CATEGORIES: { value: LiabilityCategory; label: string; color: string; emoji: string }[] = [
  { value: 'hipoteca',          label: 'Hipoteca',            color: 'bg-orange-100 text-orange-700',  emoji: '🏠' },
  { value: 'auto',              label: 'Préstamo auto',       color: 'bg-blue-100 text-blue-700',      emoji: '🚗' },
  { value: 'tarjeta',           label: 'Tarjeta de crédito',  color: 'bg-red-100 text-red-700',        emoji: '💳' },
  { value: 'prestamo_personal', label: 'Préstamo personal',   color: 'bg-amber-100 text-amber-700',    emoji: '🤝' },
  { value: 'estudiante',        label: 'Préstamo estudiantil',color: 'bg-violet-100 text-violet-700',  emoji: '🎓' },
  { value: 'negocio',           label: 'Deuda negocio',       color: 'bg-slate-100 text-slate-700',    emoji: '🏢' },
  { value: 'otro',              label: 'Otro',                color: 'bg-gray-100 text-gray-700',      emoji: '📋' },
];

const emptyForm = (): Omit<Liability, 'id'> => ({
  name: '', totalDebt: 0, monthlyPayment: 0, interestRate: 0, category: 'tarjeta', currency: 'USD', notes: '',
});

export default function Pasivos() {
  const { liabilities, summary, addLiability, updateLiability, deleteLiability } = useFinancialStore();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Liability | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Liability, 'id'>>(emptyForm());

  const openAdd = () => { setForm(emptyForm()); setEditing(null); setShowForm(true); };
  const openEdit = (l: Liability) => { setForm({ ...l }); setEditing(l); setShowForm(true); };
  const closeForm = () => setShowForm(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) updateLiability({ ...form, id: editing.id });
    else addLiability(form);
    closeForm();
  };

  const totalMonthlyPayments = liabilities.reduce((s, l) => s + l.monthlyPayment, 0);
  const avgInterest = liabilities.length > 0
    ? liabilities.reduce((s, l) => s + l.interestRate, 0) / liabilities.length
    : 0;
  const deletingItem = liabilities.find(l => l.id === deletingId);

  const getInterestColor = (rate: number) => {
    if (rate > 15) return 'text-rose-600';
    if (rate > 8) return 'text-amber-600';
    return 'text-emerald-600';
  };

  return (
    <div>
      <Header
        title="Pasivos"
        subtitle="Deudas y obligaciones financieras"
        action={
          <button onClick={openAdd}
            className="flex items-center gap-2 bg-rose-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-rose-600 transition-colors">
            <Plus size={16} /> Agregar pasivo
          </button>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-rose-50 rounded-2xl p-4">
          <p className="text-xs text-rose-600 font-medium">Total Deuda</p>
          <p className="text-2xl font-bold text-rose-700">${summary.totalLiabilities.toLocaleString()}</p>
          <p className="text-xs text-slate-400">{liabilities.length} deudas activas</p>
        </div>
        <div className="bg-amber-50 rounded-2xl p-4">
          <p className="text-xs text-amber-600 font-medium">Pagos Mensuales</p>
          <p className="text-2xl font-bold text-amber-700">${totalMonthlyPayments.toLocaleString()}</p>
          <p className="text-xs text-slate-400">por mes</p>
        </div>
        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-xs text-slate-600 font-medium">Tasa Promedio</p>
          <p className={`text-2xl font-bold ${getInterestColor(avgInterest)}`}>{avgInterest.toFixed(1)}%</p>
          <p className="text-xs text-slate-400">anual</p>
        </div>
      </div>

      {/* High-interest warning */}
      {liabilities.some(l => l.interestRate > 15) && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-4 flex gap-3">
          <AlertTriangle size={18} className="text-rose-500 shrink-0 mt-0.5" />
          <p className="text-sm text-rose-700">
            Tienes deudas con tasa de interés alta (&gt;15%). Prioriza eliminarlas con el método avalancha (mayor tasa primero).
          </p>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Deuda</th>
              <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Categoría</th>
              <th className="text-right text-xs font-semibold text-slate-500 px-5 py-3">Deuda total</th>
              <th className="text-right text-xs font-semibold text-slate-500 px-5 py-3">Pago/mes</th>
              <th className="text-right text-xs font-semibold text-slate-500 px-5 py-3">Tasa</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {liabilities.map(lib => {
              const cat = CATEGORIES.find(c => c.value === lib.category);
              return (
                <tr key={lib.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{cat?.emoji}</span>
                      <span className="text-sm font-medium text-slate-700">{lib.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${cat?.color || ''}`}>
                      {cat?.label}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right text-sm font-semibold text-rose-600">
                    ${lib.totalDebt.toLocaleString()}
                  </td>
                  <td className="px-5 py-3 text-right text-sm font-medium text-slate-600">
                    ${lib.monthlyPayment.toLocaleString()}/mes
                  </td>
                  <td className={`px-5 py-3 text-right text-sm font-bold ${getInterestColor(lib.interestRate)}`}>
                    {lib.interestRate}%
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(lib)}
                        className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => setDeletingId(lib.id)}
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
        {liabilities.length === 0 && (
          <div className="py-16 text-center text-slate-400 text-sm">Sin pasivos registrados. ¡Excelente!</div>
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <Modal title={editing ? 'Editar pasivo' : 'Agregar pasivo'} onClose={closeForm}>
          <form onSubmit={handleSubmit}>
            <FormField label="Nombre de la deuda">
              <input className={inputCls} value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Ej: Tarjeta Visa" required />
            </FormField>
            <FormField label="Categoría">
              <select className={selectCls} value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value as LiabilityCategory }))}>
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.emoji} {c.label}</option>)}
              </select>
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Deuda total (USD)">
                <input className={inputCls} type="number" min="0" step="0.01"
                  value={form.totalDebt || ''}
                  onChange={e => setForm(f => ({ ...f, totalDebt: parseFloat(e.target.value) || 0 }))}
                  placeholder="0.00" required />
              </FormField>
              <FormField label="Pago mensual (USD)">
                <input className={inputCls} type="number" min="0" step="0.01"
                  value={form.monthlyPayment || ''}
                  onChange={e => setForm(f => ({ ...f, monthlyPayment: parseFloat(e.target.value) || 0 }))}
                  placeholder="0.00" required />
              </FormField>
            </div>
            <FormField label="Tasa de interés anual (%)" hint="Ej: 22 para 22% anual">
              <input className={inputCls} type="number" min="0" step="0.01"
                value={form.interestRate || ''}
                onChange={e => setForm(f => ({ ...f, interestRate: parseFloat(e.target.value) || 0 }))}
                placeholder="0.00" required />
            </FormField>
            <FormField label="Notas (opcional)">
              <textarea className={inputCls} rows={2} value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="Banco, condiciones, fecha de vencimiento..." />
            </FormField>
            <div className="flex gap-3 justify-end pt-2">
              <button type="button" onClick={closeForm}
                className="px-4 py-2 text-sm rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                Cancelar
              </button>
              <button type="submit"
                className="px-4 py-2 text-sm rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition-colors font-medium">
                {editing ? 'Guardar cambios' : 'Agregar'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deletingItem && (
        <ConfirmDelete name={deletingItem.name}
          onConfirm={() => { deleteLiability(deletingItem.id); setDeletingId(null); }}
          onCancel={() => setDeletingId(null)} />
      )}
    </div>
  );
}
