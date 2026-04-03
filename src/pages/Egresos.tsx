import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useFinancialStore } from '../store/financialStore';
import Header from '../components/Layout/Header';
import Modal from '../components/ui/Modal';
import ConfirmDelete from '../components/ui/ConfirmDelete';
import { FormField, inputCls, selectCls } from '../components/ui/FormField';
import type { Expense, ExpenseCategory } from '../types/financial';

const CATEGORIES: { value: ExpenseCategory; label: string; color: string }[] = [
  { value: 'vivienda',        label: 'Vivienda',          color: 'bg-blue-100 text-blue-700' },
  { value: 'alimentacion',    label: 'Alimentación',      color: 'bg-emerald-100 text-emerald-700' },
  { value: 'transporte',      label: 'Transporte',        color: 'bg-amber-100 text-amber-700' },
  { value: 'salud',           label: 'Salud',             color: 'bg-rose-100 text-rose-700' },
  { value: 'educacion',       label: 'Educación',         color: 'bg-violet-100 text-violet-700' },
  { value: 'entretenimiento', label: 'Entretenimiento',   color: 'bg-pink-100 text-pink-700' },
  { value: 'deuda',           label: 'Deuda',             color: 'bg-red-100 text-red-700' },
  { value: 'seguros',         label: 'Seguros',           color: 'bg-slate-100 text-slate-700' },
  { value: 'servicios',       label: 'Servicios',         color: 'bg-cyan-100 text-cyan-700' },
  { value: 'otro',            label: 'Otro',              color: 'bg-gray-100 text-gray-700' },
];

const emptyForm = (): Omit<Expense, 'id'> => ({
  name: '', amount: 0, category: 'vivienda', isFixed: true, currency: 'USD', notes: '',
});

export default function Egresos() {
  const { expenses, summary, addExpense, updateExpense, deleteExpense } = useFinancialStore();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Expense, 'id'>>(emptyForm());

  const openAdd = () => { setForm(emptyForm()); setEditing(null); setShowForm(true); };
  const openEdit = (exp: Expense) => { setForm({ ...exp }); setEditing(exp); setShowForm(true); };
  const closeForm = () => setShowForm(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) updateExpense({ ...form, id: editing.id });
    else addExpense(form);
    closeForm();
  };

  const fixedTotal    = expenses.filter(e => e.isFixed).reduce((s, e) => s + e.amount, 0);
  const variableTotal = expenses.filter(e => !e.isFixed).reduce((s, e) => s + e.amount, 0);
  const deletingItem  = expenses.find(e => e.id === deletingId);

  return (
    <div>
      <Header
        title="Egresos"
        subtitle="Controla tus gastos fijos y variables"
        action={
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-rose-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-rose-600 transition-colors"
          >
            <Plus size={16} /> Agregar egreso
          </button>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-rose-50 rounded-2xl p-4">
          <p className="text-xs text-rose-600 font-medium">Total Egresos</p>
          <p className="text-2xl font-bold text-rose-700">${summary.totalExpenses.toLocaleString()}</p>
          <p className="text-xs text-slate-400">por mes</p>
        </div>
        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-xs text-slate-600 font-medium">Gastos Fijos</p>
          <p className="text-2xl font-bold text-slate-700">${fixedTotal.toLocaleString()}</p>
          <p className="text-xs text-slate-400">{((fixedTotal / summary.totalExpenses) * 100).toFixed(0)}% del total</p>
        </div>
        <div className="bg-amber-50 rounded-2xl p-4">
          <p className="text-xs text-amber-600 font-medium">Gastos Variables</p>
          <p className="text-2xl font-bold text-amber-700">${variableTotal.toLocaleString()}</p>
          <p className="text-xs text-slate-400">{((variableTotal / summary.totalExpenses) * 100).toFixed(0)}% del total</p>
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
            {expenses.map(exp => {
              const cat = CATEGORIES.find(c => c.value === exp.category);
              return (
                <tr key={exp.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 text-sm font-medium text-slate-700">{exp.name}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${cat?.color || ''}`}>
                      {cat?.label}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-500">
                    {exp.isFixed ? 'Fijo' : 'Variable'}
                  </td>
                  <td className="px-5 py-3 text-right text-sm font-semibold text-rose-600">
                    ${exp.amount.toLocaleString()}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(exp)}
                        className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => setDeletingId(exp.id)}
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
        {expenses.length === 0 && (
          <div className="py-16 text-center text-slate-400 text-sm">Sin egresos registrados.</div>
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <Modal title={editing ? 'Editar egreso' : 'Agregar egreso'} onClose={closeForm}>
          <form onSubmit={handleSubmit}>
            <FormField label="Nombre">
              <input className={inputCls} value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Ej: Alquiler" required />
            </FormField>
            <FormField label="Monto mensual (USD)">
              <input className={inputCls} type="number" min="0" step="0.01"
                value={form.amount || ''}
                onChange={e => setForm(f => ({ ...f, amount: parseFloat(e.target.value) || 0 }))}
                placeholder="0.00" required />
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Categoría">
                <select className={selectCls} value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value as ExpenseCategory }))}>
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </FormField>
              <FormField label="Tipo">
                <select className={selectCls} value={form.isFixed ? 'fixed' : 'variable'}
                  onChange={e => setForm(f => ({ ...f, isFixed: e.target.value === 'fixed' }))}>
                  <option value="fixed">Fijo</option>
                  <option value="variable">Variable</option>
                </select>
              </FormField>
            </div>
            <FormField label="Notas (opcional)">
              <textarea className={inputCls} rows={2} value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="Detalles adicionales..." />
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
          onConfirm={() => { deleteExpense(deletingItem.id); setDeletingId(null); }}
          onCancel={() => setDeletingId(null)} />
      )}
    </div>
  );
}
