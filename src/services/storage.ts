import { TransactionItem, PlanItem, GoalItem, BudgetItem, CategoryItem } from '../types/finance';

const STORAGE_KEYS = {
  TRANSACTIONS: 'finance_app_transactions_v1',
  PLANS: 'finance_app_plans_v2',
  GOALS_LEGACY: 'finance_app_goals_v1',
  BUDGETS: 'finance_app_budgets_v1',
  CATEGORIES: 'finance_app_categories_v1',
  BIOMETRICS: 'finance_app_biometrics_enabled',
  THEME: 'finance_app_theme',
  LANGUAGE: 'finance_app_language',
};

export const INITIAL_TRANSACTIONS: TransactionItem[] = [
  {
    id: 'tx-1',
    type: 'income',
    amount: 6600000,
    currency: 'IQD',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Income',
    source: 'Salary',
    itemDescription: 'Monthly Senior Engineer Salary',
    notes: 'Direct bank transfer from tech firm',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tx-2',
    type: 'expense',
    amount: 1200000,
    currency: 'IQD',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Rent',
    source: '',
    itemDescription: 'Al-Mansour Apartment Rent',
    notes: 'Paid cash to building owner',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tx-3',
    type: 'income',
    amount: 1250000,
    currency: 'IQD',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Income',
    source: 'Freelance',
    itemDescription: 'iOS App Design & Consulting',
    notes: 'Client milestone 2 delivery',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tx-4',
    type: 'expense',
    amount: 480000,
    currency: 'IQD',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Food',
    source: '',
    itemDescription: 'Family Weekly Groceries (Carrefour)',
    notes: 'Fresh produce, meat and household supplies',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tx-5',
    type: 'expense',
    amount: 250000,
    currency: 'IQD',
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Car',
    source: '',
    itemDescription: 'Fuel & Oil Filter Change',
    notes: 'Toyota service center',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tx-6',
    type: 'expense',
    amount: 180000,
    currency: 'IQD',
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Bills',
    source: '',
    itemDescription: 'Private Generator & Fiber Net',
    notes: 'Amperage monthly fee + internet',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tx-7',
    type: 'expense',
    amount: 85000,
    currency: 'IQD',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Gym',
    source: '',
    itemDescription: 'Monthly Fitness Center Pass',
    notes: 'Al-Rabie Sports Club',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tx-8',
    type: 'expense',
    amount: 140000,
    currency: 'IQD',
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Entertainment',
    source: '',
    itemDescription: 'Dinner with Family at Samad',
    notes: 'Traditional Iraqi masgouf dinner',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const INITIAL_PLANS: PlanItem[] = [
  {
    id: 'plan-1',
    name: 'Emergency Reserve Fund',
    targetAmount: 8000000,
    allocatedAmount: 4500000,
    currency: 'IQD',
    startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    targetDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'critical',
    plannedMonthlyAmount: 600000,
    planDescription: '6 months of essential living expenses cash cushion',
    isCompleted: false,
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: null,
  },
  {
    id: 'plan-2',
    name: 'New Family SUV Down Payment',
    targetAmount: 18000000,
    allocatedAmount: 6500000,
    currency: 'IQD',
    startDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    targetDate: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    plannedMonthlyAmount: 1150000,
    planDescription: 'Down payment for a reliable Toyota RAV4 or Prado',
    isCompleted: false,
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: null,
  },
  {
    id: 'plan-3',
    name: 'Dubai Tech & Family Holiday',
    targetAmount: 4000000,
    allocatedAmount: 4000000,
    currency: 'IQD',
    startDate: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    targetDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'medium',
    plannedMonthlyAmount: 400000,
    planDescription: 'Flights and hotel accommodation',
    isCompleted: true,
    createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Backwards compatibility alias
export const INITIAL_GOALS: GoalItem[] = INITIAL_PLANS;

export const INITIAL_BUDGETS: BudgetItem[] = [
  { id: 'b-1', category: 'Food', monthlyLimit: 750000, createdAt: new Date().toISOString() },
  { id: 'b-2', category: 'Rent', monthlyLimit: 1200000, createdAt: new Date().toISOString() },
  { id: 'b-3', category: 'Car', monthlyLimit: 400000, createdAt: new Date().toISOString() },
  { id: 'b-4', category: 'Bills', monthlyLimit: 250000, createdAt: new Date().toISOString() },
  { id: 'b-5', category: 'Entertainment', monthlyLimit: 200000, createdAt: new Date().toISOString() },
];

export const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'c-1', name: 'Food', type: 'expense_category', isDefault: true },
  { id: 'c-2', name: 'Transportation', type: 'expense_category', isDefault: true },
  { id: 'c-3', name: 'Rent', type: 'expense_category', isDefault: true },
  { id: 'c-4', name: 'Bills', type: 'expense_category', isDefault: true },
  { id: 'c-5', name: 'Shopping', type: 'expense_category', isDefault: true },
  { id: 'c-6', name: 'Entertainment', type: 'expense_category', isDefault: true },
  { id: 'c-7', name: 'Travel', type: 'expense_category', isDefault: true },
  { id: 'c-8', name: 'Family', type: 'expense_category', isDefault: true },
  { id: 'c-9', name: 'Car', type: 'expense_category', isDefault: true },
  { id: 'c-10', name: 'Health', type: 'expense_category', isDefault: true },
  { id: 'c-11', name: 'Gym', type: 'expense_category', isDefault: true },
  { id: 'c-12', name: 'Other', type: 'expense_category', isDefault: true },

  { id: 's-1', name: 'Salary', type: 'income_source', isDefault: true },
  { id: 's-2', name: 'Bonus', type: 'income_source', isDefault: true },
  { id: 's-3', name: 'Freelance', type: 'income_source', isDefault: true },
  { id: 's-4', name: 'Business', type: 'income_source', isDefault: true },
  { id: 's-5', name: 'Investment', type: 'income_source', isDefault: true },
  { id: 's-6', name: 'Other', type: 'income_source', isDefault: true },
];

export class StorageService {
  static loadTransactions(): TransactionItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      return data ? JSON.parse(data) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  }

  static saveTransactions(items: TransactionItem[]): void {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(items));
  }

  static deleteTransaction(id: string): TransactionItem[] {
    const current = this.loadTransactions();
    const updated = current.filter(t => t.id !== id);
    this.saveTransactions(updated);
    return updated;
  }

  static deleteTransactionsBatch(ids: string[]): TransactionItem[] {
    const idSet = new Set(ids);
    const current = this.loadTransactions();
    const updated = current.filter(t => !idSet.has(t.id));
    this.saveTransactions(updated);
    return updated;
  }

  static loadPlans(): PlanItem[] {
    try {
      const plansData = localStorage.getItem(STORAGE_KEYS.PLANS);
      if (plansData) {
        return JSON.parse(plansData);
      }
      // Migrate from legacy goals if present
      const legacyData = localStorage.getItem(STORAGE_KEYS.GOALS_LEGACY);
      if (legacyData) {
        const parsed = JSON.parse(legacyData);
        const migrated: PlanItem[] = parsed.map((item: any) => ({
          ...item,
          priority: item.priority || 'medium',
          plannedMonthlyAmount: item.plannedMonthlyAmount || Math.round(item.targetAmount / 12),
          planDescription: item.planDescription || item.goalDescription || '',
        }));
        this.savePlans(migrated);
        return migrated;
      }
      return INITIAL_PLANS;
    } catch {
      return INITIAL_PLANS;
    }
  }

  static savePlans(items: PlanItem[]): void {
    localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(items));
    // Keep legacy key in sync for backwards compatibility
    localStorage.setItem(STORAGE_KEYS.GOALS_LEGACY, JSON.stringify(items));
  }

  static deletePlan(id: string): PlanItem[] {
    const current = this.loadPlans();
    const updated = current.filter(p => p.id !== id);
    this.savePlans(updated);
    return updated;
  }

  static deletePlansBatch(ids: string[]): PlanItem[] {
    const idSet = new Set(ids);
    const current = this.loadPlans();
    const updated = current.filter(p => !idSet.has(p.id));
    this.savePlans(updated);
    return updated;
  }

  // Legacy aliases
  static loadGoals(): GoalItem[] {
    return this.loadPlans();
  }

  static saveGoals(items: GoalItem[]): void {
    this.savePlans(items);
  }

  static deleteGoal(id: string): GoalItem[] {
    return this.deletePlan(id);
  }

  static loadBudgets(): BudgetItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BUDGETS);
      return data ? JSON.parse(data) : INITIAL_BUDGETS;
    } catch {
      return INITIAL_BUDGETS;
    }
  }

  static saveBudgets(items: BudgetItem[]): void {
    localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(items));
  }

  static loadCategories(): CategoryItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return data ? JSON.parse(data) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  }

  static saveCategories(items: CategoryItem[]): void {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(items));
  }

  static getBiometrics(): boolean {
    return localStorage.getItem(STORAGE_KEYS.BIOMETRICS) === 'true';
  }

  static setBiometrics(enabled: boolean): void {
    localStorage.setItem(STORAGE_KEYS.BIOMETRICS, enabled ? 'true' : 'false');
  }

  static getTheme(): string {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'system';
  }

  static setTheme(theme: string): void {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }

  static getLanguage(): 'en' | 'ar' {
    const lang = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    return lang === 'ar' ? 'ar' : 'en';
  }

  static setLanguage(lang: 'en' | 'ar'): void {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  }
}
