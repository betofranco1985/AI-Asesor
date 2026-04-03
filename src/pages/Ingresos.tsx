import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useFinancialStore } from '../store/financialStore';
import Header from '../components/Layout/Header';
import Modal from '../components/ui/Modal';
import ConfirmDelete from '../components/ui/ConfirmDelete';
import { FormField, inputCls, selectCls } from '../components/ui/FormField';
import type { Income, IncomeCategory, IncomeType } from '../types/financial';

const CATEGORIES: { value: IncomeCategory; label: string }[] = [
  { value: 'salario',     label: 'Salario' },
  { value: 'freelance',   label: 'Freelance' },
  { value: 'negocio',     label: 'Negocio propio' },
  { value: 'dividendos',  label: 'Dividendos' },
  { value: 'alquiler',    label: 'Alquiler' },
  { value: 'interes',     label: 'Intereses' },
  { value: 'regalias',    label: 'Regalías' },
  { value: 'otro',        label: 'Otro' },
];

const TYPE_COLOR: Record<IncomeType, string> = {
  activo:  'bg-blue-100 text-blue-700',
  pasivo:  'bg-emerald-100 text-emerald-700',
};

const emptyForm = (): Omit<Income, 'id'> => ({
  name: '', amount: 0, category: 'salario', type: 'activo', currency: 'USD', notes: '',
});

export default function Ingresos() {
  const { incomes, summary, addIncome, updateIncome, deleteIncome } = useFinancialStore();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Income | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Income, 'id'>>(emptyForm());

  const openAdd = () => { setForm(emptyForm()); setEditing(null); setShowForm(true); };
  const openEdit = (inc: Income) => { setForm({ ...inc }); setEditing(inc); setShowForm(true); };
  const closeForm = () => setShowForm(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateIncome({ ...form, id: editing.id });
    } else {
      addIncome(form);
    }
    closeForm();
  };

  const activeTotal  = incomes.filter(i => i.type === 'activo').reduce((s, i) => s + i.amount, 0);
  const passiveTotal = incomes.filter(i => i.type === 'pasivo').reduce((s, i) => s + i.amount, 0);
  const deletingItem = incomes.find(i => i.id === deletingId);

  return (
    <div>
      <Header
        title="Ingresos"
        subtitle="Gestiona tus fuentes de ingreso activo y pasivo"
        action={
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-600 transition-colors"
          >
            <Plus size={16} /> Agregar ingreso
          </button>
        }
      />

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-emerald-50 rounded-2xl p-4">
          <p className="text-xs text-emerald-600 font-medium">Total Ingresos</p>
          <p className="text-2xl font-bold text-emerald-700">${summary.totalIncome.toLocaleString()}</p>
          <p className="text-xs text-slate-400">por mes</p>
        </div>
        <div className="bg-blue-50 rounded-2xl p-4">
          <p className="text-xs text-blue-600 font-medium">Ingreso Activo</p>
          <p className="text-2xl font-bold text-blue-700">${activeTotal.toLocaleString()}</p>
          <p className="text-xs text-slate-400">{((activeTotal / summary.totalIncome) * 100).toFixed(0)}% del total</p>
        </div>
        <div className="bg-violet-50 rounded-2xl p-4">
          <p className="text-xs text-violet-600 font-medium">Ingreso Pasivo</p>
          <p className="text-2xl font-bold text-violet-700">${passiveTotal.toLocaleString()}</p>
          <p className="text-xs text-slate-400">{((passiveTotal / summary.totalIncome) * 100).toFixed(0)}% del total</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Nombre</th>
              <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Categoría</th>
              <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Tipo</th>
              <th className="text-right text-xs font-semibold text-slate-500 px-5 py-3">Monto/mes</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {incomes.map(inc => (
              <tr key={inc.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3 text-sm font-medium text-slate-700">{inc.name}</td>
                <td className="px-5 py-3 text-sm text-slate-500 capitalize">
                  {CATEGORIES.find(c => c.value === inc.category)?.label}
                </td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${TYPE_COLOR[inc.type]}`}>
                    {inc.type === 'activo' ? 'Activo' : 'Pasivo'}
                  </span>
                </td>
                <td className="px-5 py-3 text-right text-sm font-semibold text-emerald-600">
                  ${inc.amount.toLocaleString()}
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => openEdit(inc)}
                      className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setDeletingId(inc.id)}
                      className="w-8 h-8 rounded-lg hover:bg-rose-50 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {incomes.length === 0 && (
          <div className="py-16 text-center text-slate-400 text-sm">
            Sin ingresos registrados. Agrega uno para empezar.
          </div>
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <Modal title={editing ? 'Editar ingreso' : 'Agregar ingreso'} onClose={closeForm}>
          <form onSubmit={handleSubmit}>
            <FormField label="Nombre">
              <input
                className={inputCls}
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Ej: Salario mensual"
                required
              />
            </FormField>
            <FormField label="Monto mensual (USD)">
              <input
                className={inputCls}
                type="number"
                min="0"
                step="0.01"
                value={form.amount || ''}
                onChange={e => setForm(f => ({ ...f, amount: parseFloat(e.target.value) || 0 }))}
                placeholder="0.00"
                required
              />
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Categoría">
                <select
                  className={selectCls}
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value as IncomeCategory }))}
                >
                  {CATEGORIES.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </FormField>
              <FormField label="Tipo" hint="Activo = trabajo, Pasivo = inversión">
                <select
                  className={selectCls}
                  value={form.type}
                  onChange={e => setForm(f => ({ ...f, type: e.target.value as IncomeType }))}
                >
                  <option value="activo">Activo (trabajo)</option>
                  <option value="pasivo">Pasivo (inversión)</option>
                </select>
              </FormField>
            </div>
            <FormField label="Notas (opcional)">
              <textarea
                className={inputCls}
                rows={2}
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="Detalles adicionales..."
              />
            </FormField>
            <div className="flex gap-3 justify-end pt-2">
              <button type="button" onClick={closeForm}
                className="px-4 py-2 text-sm rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                Cancelar
              </button>
              <button type="submit"
                className="px-4 py-2 text-sm rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors font-medium">
                {editing ? 'Guardar cambios' : 'Agregar'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete confirm */}
      {deletingItem && (
        <ConfirmDelete
          name={deletingItem.name}
          onConfirm={() => { deleteIncome(deletingItem.id); setDeletingId(null); }}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  );
}
