import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type {
  Income,
  Expense,
  Asset,
  Liability,
  FinancialSummary,
  MonthlySnapshot,
} from '../types/financial';

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

const uid = () => Math.random().toString(36).slice(2, 10);

const emptySummary: FinancialSummary = {
  totalActiveIncome: 0,
  totalPassiveIncome: 0,
  totalIncome: 0,
  totalExpenses: 0,
  cashFlow: 0,
  totalAssets: 0,
  totalLiabilities: 0,
  netWorth: 0,
  freedomRatio: 0,
  debtToAssetRatio: 0,
};

// ─── AUTO-SAVE (debounced) ────────────────────────────────────────────────────
let saveTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleSave(userId: string, state: {
  incomes: Income[];
  expenses: Expense[];
  assets: Asset[];
  liabilities: Liability[];
  history: MonthlySnapshot[];
}) {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    await supabase.from('user_financial_data').upsert({
      user_id: userId,
      incomes: state.incomes,
      expenses: state.expenses,
      assets: state.assets,
      liabilities: state.liabilities,
      history: state.history,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });
  }, 800);
}

// ─── STORE ───────────────────────────────────────────────────────────────────
interface FinancialState {
  userId: string | null;
  incomes: Income[];
  expenses: Expense[];
  assets: Asset[];
  liabilities: Liability[];
  history: MonthlySnapshot[];
  summary: FinancialSummary;
  dataLoading: boolean;

  // Load / clear data for a user
  loadUserData: (userId: string) => Promise<void>;
  clearUserData: () => void;

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

export const useFinancialStore = create<FinancialState>((set) => ({
  userId: null,
  incomes: [],
  expenses: [],
  assets: [],
  liabilities: [],
  history: [],
  summary: emptySummary,
  dataLoading: false,

  // ── Load user data from Supabase ─────────────────────────────────────────
  loadUserData: async (userId) => {
    set({ dataLoading: true, userId });

    const { data, error } = await supabase
      .from('user_financial_data')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      // First time — start with empty data
      set({
        incomes: [],
        expenses: [],
        assets: [],
        liabilities: [],
        history: [],
        summary: emptySummary,
        dataLoading: false,
      });
      return;
    }

    const incomes: Income[]         = data.incomes    || [];
    const expenses: Expense[]       = data.expenses   || [];
    const assets: Asset[]           = data.assets     || [];
    const liabilities: Liability[]  = data.liabilities|| [];
    const history: MonthlySnapshot[]= data.history    || [];

    set({
      incomes,
      expenses,
      assets,
      liabilities,
      history,
      summary: computeSummary(incomes, expenses, assets, liabilities),
      dataLoading: false,
    });
  },

  clearUserData: () => {
    if (saveTimer) clearTimeout(saveTimer);
    set({
      userId: null,
      incomes: [],
      expenses: [],
      assets: [],
      liabilities: [],
      history: [],
      summary: emptySummary,
    });
  },

  // ── Income CRUD ──────────────────────────────────────────────────────────
  addIncome: (income) => set((s) => {
    const incomes = [...s.incomes, { ...income, id: uid() }];
    const next = { incomes, summary: computeSummary(incomes, s.expenses, s.assets, s.liabilities) };
    if (s.userId) scheduleSave(s.userId, { ...s, ...next });
    return next;
  }),
  updateIncome: (income) => set((s) => {
    const incomes = s.incomes.map(i => i.id === income.id ? income : i);
    const next = { incomes, summary: computeSummary(incomes, s.expenses, s.assets, s.liabilities) };
    if (s.userId) scheduleSave(s.userId, { ...s, ...next });
    return next;
  }),
  deleteIncome: (id) => set((s) => {
    const incomes = s.incomes.filter(i => i.id !== id);
    const next = { incomes, summary: computeSummary(incomes, s.expenses, s.assets, s.liabilities) };
    if (s.userId) scheduleSave(s.userId, { ...s, ...next });
    return next;
  }),

  // ── Expense CRUD ─────────────────────────────────────────────────────────
  addExpense: (expense) => set((s) => {
    const expenses = [...s.expenses, { ...expense, id: uid() }];
    const next = { expenses, summary: computeSummary(s.incomes, expenses, s.assets, s.liabilities) };
    if (s.userId) scheduleSave(s.userId, { ...s, ...next });
    return next;
  }),
  updateExpense: (expense) => set((s) => {
    const expenses = s.expenses.map(e => e.id === expense.id ? expense : e);
    const next = { expenses, summary: computeSummary(s.incomes, expenses, s.assets, s.liabilities) };
    if (s.userId) scheduleSave(s.userId, { ...s, ...next });
    return next;
  }),
  deleteExpense: (id) => set((s) => {
    const expenses = s.expenses.filter(e => e.id !== id);
    const next = { expenses, summary: computeSummary(s.incomes, expenses, s.assets, s.liabilities) };
    if (s.userId) scheduleSave(s.userId, { ...s, ...next });
    return next;
  }),

  // ── Asset CRUD ───────────────────────────────────────────────────────────
  addAsset: (asset) => set((s) => {
    const assets = [...s.assets, { ...asset, id: uid() }];
    const next = { assets, summary: computeSummary(s.incomes, s.expenses, assets, s.liabilities) };
    if (s.userId) scheduleSave(s.userId, { ...s, ...next });
    return next;
  }),
  updateAsset: (asset) => set((s) => {
    const assets = s.assets.map(a => a.id === asset.id ? asset : a);
    const next = { assets, summary: computeSummary(s.incomes, s.expenses, assets, s.liabilities) };
    if (s.userId) scheduleSave(s.userId, { ...s, ...next });
    return next;
  }),
  deleteAsset: (id) => set((s) => {
    const assets = s.assets.filter(a => a.id !== id);
    const next = { assets, summary: computeSummary(s.incomes, s.expenses, assets, s.liabilities) };
    if (s.userId) scheduleSave(s.userId, { ...s, ...next });
    return next;
  }),

  // ── Liability CRUD ───────────────────────────────────────────────────────
  addLiability: (liability) => set((s) => {
    const liabilities = [...s.liabilities, { ...liability, id: uid() }];
    const next = { liabilities, summary: computeSummary(s.incomes, s.expenses, s.assets, liabilities) };
    if (s.userId) scheduleSave(s.userId, { ...s, ...next });
    return next;
  }),
  updateLiability: (liability) => set((s) => {
    const liabilities = s.liabilities.map(l => l.id === liability.id ? liability : l);
    const next = { liabilities, summary: computeSummary(s.incomes, s.expenses, s.assets, liabilities) };
    if (s.userId) scheduleSave(s.userId, { ...s, ...next });
    return next;
  }),
  deleteLiability: (id) => set((s) => {
    const liabilities = s.liabilities.filter(l => l.id !== id);
    const next = { liabilities, summary: computeSummary(s.incomes, s.expenses, s.assets, liabilities) };
    if (s.userId) scheduleSave(s.userId, { ...s, ...next });
    return next;
  }),
}));

export { computeSummary };
