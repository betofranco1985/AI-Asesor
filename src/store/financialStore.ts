import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Income,
  Expense,
  Asset,
  Liability,
  FinancialSummary,
  MonthlySnapshot,
} from '../types/financial';

// ─── SAMPLE DATA ─────────────────────────────────────────────────────────────
const sampleIncomes: Income[] = [
  { id: '1', name: 'Salario mensual', amount: 5000, category: 'salario', type: 'activo', currency: 'USD' },
  { id: '2', name: 'Freelance diseño', amount: 800, category: 'freelance', type: 'activo', currency: 'USD' },
  { id: '3', name: 'Alquiler apartamento', amount: 1200, category: 'alquiler', type: 'pasivo', currency: 'USD' },
  { id: '4', name: 'Dividendos acciones', amount: 320, category: 'dividendos', type: 'pasivo', currency: 'USD' },
  { id: '5', name: 'Intereses bonos', amount: 150, category: 'interes', type: 'pasivo', currency: 'USD' },
];

const sampleExpenses: Expense[] = [
  { id: '1', name: 'Hipoteca / Alquiler', amount: 1500, category: 'vivienda', isFixed: true, currency: 'USD' },
  { id: '2', name: 'Supermercado', amount: 600, category: 'alimentacion', isFixed: false, currency: 'USD' },
  { id: '3', name: 'Auto (cuota + seguro)', amount: 450, category: 'transporte', isFixed: true, currency: 'USD' },
  { id: '4', name: 'Salud / Medicina', amount: 200, category: 'salud', isFixed: true, currency: 'USD' },
  { id: '5', name: 'Servicios (luz, agua, internet)', amount: 180, category: 'servicios', isFixed: true, currency: 'USD' },
  { id: '6', name: 'Entretenimiento', amount: 250, category: 'entretenimiento', isFixed: false, currency: 'USD' },
  { id: '7', name: 'Tarjeta de crédito (mínimo)', amount: 300, category: 'deuda', isFixed: true, currency: 'USD' },
];

const sampleAssets: Asset[] = [
  { id: '1', name: 'Fondo de emergencia', value: 15000, monthlyIncome: 30, category: 'efectivo', currency: 'USD', annualReturn: 2.4 },
  { id: '2', name: 'Portafolio acciones ETF', value: 45000, monthlyIncome: 180, category: 'acciones', currency: 'USD', annualReturn: 8.5 },
  { id: '3', name: 'Apartamento en alquiler', value: 180000, monthlyIncome: 1200, category: 'inmuebles', currency: 'USD', annualReturn: 7.2 },
  { id: '4', name: 'Bonos del tesoro', value: 20000, monthlyIncome: 83, category: 'bonos', currency: 'USD', annualReturn: 5 },
  { id: '5', name: 'Crypto (BTC / ETH)', value: 8000, monthlyIncome: 0, category: 'criptomonedas', currency: 'USD', annualReturn: 0 },
  { id: '6', name: 'Plan de pensión', value: 35000, monthlyIncome: 0, category: 'pension', currency: 'USD', annualReturn: 6 },
];

const sampleLiabilities: Liability[] = [
  { id: '1', name: 'Hipoteca casa', totalDebt: 220000, monthlyPayment: 1200, interestRate: 6.5, category: 'hipoteca', currency: 'USD' },
  { id: '2', name: 'Préstamo auto', totalDebt: 18000, monthlyPayment: 380, interestRate: 5.9, category: 'auto', currency: 'USD' },
  { id: '3', name: 'Tarjeta de crédito', totalDebt: 4500, monthlyPayment: 300, interestRate: 22, category: 'tarjeta', currency: 'USD' },
];

const sampleHistory: MonthlySnapshot[] = [
  { month: '2025-04', income: 7300, expenses: 3480, cashFlow: 3820, netWorth: 59000, passiveIncome: 1670 },
  { month: '2025-05', income: 7300, expenses: 3600, cashFlow: 3700, netWorth: 61200, passiveIncome: 1670 },
  { month: '2025-06', income: 7800, expenses: 3550, cashFlow: 4250, netWorth: 64500, passiveIncome: 1700 },
  { month: '2025-07', income: 7800, expenses: 3480, cashFlow: 4320, netWorth: 67800, passiveIncome: 1700 },
  { month: '2025-08', income: 8100, expenses: 3700, cashFlow: 4400, netWorth: 71000, passiveIncome: 1730 },
  { month: '2025-09', income: 7470, expenses: 3480, cashFlow: 3990, netWorth: 73200, passiveIncome: 1670 },
  { month: '2025-10', income: 7470, expenses: 3550, cashFlow: 3920, netWorth: 75500, passiveIncome: 1670 },
  { month: '2025-11', income: 7470, expenses: 3900, cashFlow: 3570, netWorth: 77000, passiveIncome: 1670 },
  { month: '2025-12', income: 8200, expenses: 4200, cashFlow: 4000, netWorth: 79500, passiveIncome: 1700 },
  { month: '2026-01', income: 7470, expenses: 3480, cashFlow: 3990, netWorth: 81800, passiveIncome: 1670 },
  { month: '2026-02', income: 7470, expenses: 3480, cashFlow: 3990, netWorth: 83500, passiveIncome: 1670 },
  { month: '2026-03', income: 7470, expenses: 3480, cashFlow: 3990, netWorth: 85000, passiveIncome: 1670 },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function computeSummary(
  incomes: Income[],
  expenses: Expense[],
  assets: Asset[],
  liabilities: Liability[]
): FinancialSummary {
  const totalActiveIncome = incomes
    .filter(i => i.type === 'activo')
    .reduce((s, i) => s + i.amount, 0);

  const totalPassiveIncome = incomes
    .filter(i => i.type === 'pasivo')
    .reduce((s, i) => s + i.amount, 0);

  const totalIncome = totalActiveIncome + totalPassiveIncome;
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const cashFlow = totalIncome - totalExpenses;

  const totalAssets = assets.reduce((s, a) => s + a.value, 0);
  const totalLiabilities = liabilities.reduce((s, l) => s + l.totalDebt, 0);
  const netWorth = totalAssets - totalLiabilities;

  const freedomRatio = totalExpenses > 0
    ? (totalPassiveIncome / totalExpenses) * 100
    : 0;

  const debtToAssetRatio = totalAssets > 0
    ? (totalLiabilities / totalAssets) * 100
    : 0;

  return {
    totalActiveIncome,
    totalPassiveIncome,
    totalIncome,
    totalExpenses,
    cashFlow,
    totalAssets,
    totalLiabilities,
    netWorth,
    freedomRatio,
    debtToAssetRatio,
  };
}

// ─── STORE ───────────────────────────────────────────────────────────────────
interface FinancialState {
  incomes: Income[];
  expenses: Expense[];
  assets: Asset[];
  liabilities: Liability[];
  history: MonthlySnapshot[];
  summary: FinancialSummary;

  // Income CRUD
  addIncome: (income: Omit<Income, 'id'>) => void;
  updateIncome: (income: Income) => void;
  deleteIncome: (id: string) => void;

  // Expense CRUD
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;

  // Asset CRUD
  addAsset: (asset: Omit<Asset, 'id'>) => void;
  updateAsset: (asset: Asset) => void;
  deleteAsset: (id: string) => void;

  // Liability CRUD
  addLiability: (liability: Omit<Liability, 'id'>) => void;
  updateLiability: (liability: Liability) => void;
  deleteLiability: (id: string) => void;
}

const uid = () => Math.random().toString(36).slice(2, 10);

export const useFinancialStore = create<FinancialState>()(
  persist(
    (set) => ({
      incomes: sampleIncomes,
      expenses: sampleExpenses,
      assets: sampleAssets,
      liabilities: sampleLiabilities,
      history: sampleHistory,
      summary: computeSummary(sampleIncomes, sampleExpenses, sampleAssets, sampleLiabilities),

      addIncome: (income) => set((s) => {
        const incomes = [...s.incomes, { ...income, id: uid() }];
        return { incomes, summary: computeSummary(incomes, s.expenses, s.assets, s.liabilities) };
      }),
      updateIncome: (income) => set((s) => {
        const incomes = s.incomes.map(i => i.id === income.id ? income : i);
        return { incomes, summary: computeSummary(incomes, s.expenses, s.assets, s.liabilities) };
      }),
      deleteIncome: (id) => set((s) => {
        const incomes = s.incomes.filter(i => i.id !== id);
        return { incomes, summary: computeSummary(incomes, s.expenses, s.assets, s.liabilities) };
      }),

      addExpense: (expense) => set((s) => {
        const expenses = [...s.expenses, { ...expense, id: uid() }];
        return { expenses, summary: computeSummary(s.incomes, expenses, s.assets, s.liabilities) };
      }),
      updateExpense: (expense) => set((s) => {
        const expenses = s.expenses.map(e => e.id === expense.id ? expense : e);
        return { expenses, summary: computeSummary(s.incomes, expenses, s.assets, s.liabilities) };
      }),
      deleteExpense: (id) => set((s) => {
        const expenses = s.expenses.filter(e => e.id !== id);
        return { expenses, summary: computeSummary(s.incomes, expenses, s.assets, s.liabilities) };
      }),

      addAsset: (asset) => set((s) => {
        const assets = [...s.assets, { ...asset, id: uid() }];
        return { assets, summary: computeSummary(s.incomes, s.expenses, assets, s.liabilities) };
      }),
      updateAsset: (asset) => set((s) => {
        const assets = s.assets.map(a => a.id === asset.id ? asset : a);
        return { assets, summary: computeSummary(s.incomes, s.expenses, assets, s.liabilities) };
      }),
      deleteAsset: (id) => set((s) => {
        const assets = s.assets.filter(a => a.id !== id);
        return { assets, summary: computeSummary(s.incomes, s.expenses, assets, s.liabilities) };
      }),

      addLiability: (liability) => set((s) => {
        const liabilities = [...s.liabilities, { ...liability, id: uid() }];
        return { liabilities, summary: computeSummary(s.incomes, s.expenses, s.assets, liabilities) };
      }),
      updateLiability: (liability) => set((s) => {
        const liabilities = s.liabilities.map(l => l.id === liability.id ? liability : l);
        return { liabilities, summary: computeSummary(s.incomes, s.expenses, s.assets, liabilities) };
      }),
      deleteLiability: (id) => set((s) => {
        const liabilities = s.liabilities.filter(l => l.id !== id);
        return { liabilities, summary: computeSummary(s.incomes, s.expenses, s.assets, liabilities) };
      }),
    }),
    { name: 'ai-asesor-financiero' }
  )
);

export { computeSummary };
