// ─── INCOME ──────────────────────────────────────────────────────────────────
export type IncomeCategory =
  | 'salario'
  | 'freelance'
  | 'negocio'
  | 'dividendos'
  | 'alquiler'
  | 'interes'
  | 'regalias'
  | 'otro';

export type IncomeType = 'activo' | 'pasivo';

export interface Income {
  id: string;
  name: string;
  amount: number; // monthly
  category: IncomeCategory;
  type: IncomeType;
  currency: string;
  notes?: string;
}

// ─── EXPENSES ────────────────────────────────────────────────────────────────
export type ExpenseCategory =
  | 'vivienda'
  | 'alimentacion'
  | 'transporte'
  | 'salud'
  | 'educacion'
  | 'entretenimiento'
  | 'deuda'
  | 'seguros'
  | 'servicios'
  | 'otro';

export interface Expense {
  id: string;
  name: string;
  amount: number; // monthly
  category: ExpenseCategory;
  isFixed: boolean;
  currency: string;
  notes?: string;
}

// ─── ASSETS ──────────────────────────────────────────────────────────────────
export type AssetCategory =
  | 'efectivo'
  | 'acciones'
  | 'bonos'
  | 'fondos'
  | 'criptomonedas'
  | 'inmuebles'
  | 'negocio'
  | 'pension'
  | 'otro';

export interface Asset {
  id: string;
  name: string;
  value: number;        // current value
  monthlyIncome: number; // passive income generated
  category: AssetCategory;
  currency: string;
  annualReturn?: number; // %
  notes?: string;
}

// ─── LIABILITIES ─────────────────────────────────────────────────────────────
export type LiabilityCategory =
  | 'hipoteca'
  | 'auto'
  | 'tarjeta'
  | 'prestamo_personal'
  | 'estudiante'
  | 'negocio'
  | 'otro';

export interface Liability {
  id: string;
  name: string;
  totalDebt: number;
  monthlyPayment: number;
  interestRate: number; // annual %
  category: LiabilityCategory;
  currency: string;
  dueDate?: string;     // ISO date
  notes?: string;
}

// ─── SUMMARY ─────────────────────────────────────────────────────────────────
export interface FinancialSummary {
  totalActiveIncome: number;
  totalPassiveIncome: number;
  totalIncome: number;
  totalExpenses: number;
  cashFlow: number;           // income - expenses
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;           // assets - liabilities
  freedomRatio: number;       // passiveIncome / expenses * 100
  debtToAssetRatio: number;   // liabilities / assets * 100
}

// ─── HISTORY ─────────────────────────────────────────────────────────────────
export interface MonthlySnapshot {
  month: string; // e.g. "2025-01"
  income: number;
  expenses: number;
  cashFlow: number;
  netWorth: number;
  passiveIncome: number;
}
