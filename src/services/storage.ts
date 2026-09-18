import { TransactionItem, PlanItem, GoalItem, BudgetItem, CategoryItem, AccountProfile, InvoiceItem, BusinessInvoice, BusinessInvoiceStatus, LinkedTransfer } from '../types/finance';
import { getSavedTheme, applyTheme, ThemeMode } from '../utils/theme';

const STORAGE_KEYS = {
  TRANSACTIONS: 'finance_app_transactions_v1',
  PLANS: 'finance_app_plans_v2',
  GOALS_LEGACY: 'finance_app_goals_v1',
  BUDGETS: 'finance_app_budgets_v1',
  CATEGORIES: 'finance_app_categories_v1',
  BIOMETRICS: 'finance_app_biometrics_enabled',
  THEME: 'finance_app_theme',
  LANGUAGE: 'finance_app_language',
  ACCOUNTS: 'finance_app_accounts_v2',
  ACTIVE_ACCOUNT_ID: 'finance_app_active_account_id_v2',
  INVOICES: 'finance_app_invoices_v1',
  TRANSFERS: 'finance_app_transfers_v1',
};

export const INITIAL_ACCOUNTS: AccountProfile[] = [
  {
    id: 'personal',
    type: 'personal',
    name: 'Personal Account',
    currency: 'IQD',
    color: '#007AFF',
    icon: 'User',
    createdAt: new Date().toISOString(),
    description: 'Primary personal finance ledger',
    allocatedBudget: 0,
  },
];

export const INITIAL_INVOICES: BusinessInvoice[] = [];

export const INITIAL_TRANSACTIONS: TransactionItem[] = [];

export const INITIAL_PLANS: PlanItem[] = [];

// Backwards compatibility alias
export const INITIAL_GOALS: GoalItem[] = [];

export const INITIAL_BUDGETS: BudgetItem[] = [];

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
      if (!data) return [];
      const raw: TransactionItem[] = JSON.parse(data);
      if (!Array.isArray(raw)) return [];
      const legacyTxIds = new Set([
        'tx-1', 'tx-2', 'tx-3', 'tx-4', 'tx-5', 'tx-6', 'tx-7', 'tx-8',
        'tx-biz-1', 'tx-biz-2', 'tx-biz-3', 'tx-biz-4', 'tx-biz-5', 'tx-biz-6'
      ]);
      // Auto-migrate any untagged transactions to personal account & filter legacy mock
      return raw
        .filter(t => !legacyTxIds.has(t.id) && t.accountId !== 'biz-solar')
        .map(t => ({
          ...t,
          accountId: t.accountId || 'personal',
        }));
    } catch {
      return [];
    }
  }

  static saveTransactions(items: TransactionItem[]): void {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(items));
  }

  static addTransaction(item: TransactionItem): TransactionItem[] {
    const current = this.loadTransactions();
    const updated = [item, ...current];
    this.saveTransactions(updated);
    return updated;
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

  static loadAccounts(): AccountProfile[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
      if (data) {
        const parsed: AccountProfile[] = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filter out legacy hardcoded 'biz-solar' account
          const cleaned = parsed.filter(a => a.id !== 'biz-solar');
          // Ensure personal account always exists as index 0
          if (!cleaned.some(a => a.id === 'personal')) {
            cleaned.unshift(INITIAL_ACCOUNTS[0]);
          }
          return cleaned;
        }
      }
      return INITIAL_ACCOUNTS;
    } catch {
      return INITIAL_ACCOUNTS;
    }
  }

  static saveAccounts(accounts: AccountProfile[]): void {
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
  }

  static getActiveAccountId(): string {
    try {
      const active = localStorage.getItem(STORAGE_KEYS.ACTIVE_ACCOUNT_ID);
      if (active === 'biz-solar') return 'personal';
      return active || 'personal';
    } catch {
      return 'personal';
    }
  }

  static setActiveAccountId(id: string): void {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_ACCOUNT_ID, id);
  }

  static loadInvoices(): BusinessInvoice[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INVOICES);
      if (!data) return INITIAL_INVOICES;
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return INITIAL_INVOICES;
      const legacyInvIds = new Set(['inv-1', 'inv-2', 'inv-3']);
      const valid = parsed.filter((i: any) => !legacyInvIds.has(i.id) && i.accountId !== 'biz-solar');
      return valid.map((inv: any) => {
        const type: 'incoming' | 'outgoing' =
          inv.type || (inv.direction === 'payable' ? 'outgoing' : 'incoming');
        let status: BusinessInvoiceStatus = 'not_submitted';
        if (inv.status === 'paid' || inv.status === 'settled') status = 'settled';
        else if (inv.status === 'sent' || inv.status === 'submitted') status = 'submitted';
        else if (inv.status === 'approved') status = 'approved';
        else status = 'not_submitted';

        const amount = Number(inv.amount) || 0;
        const taxPercent = Number(inv.taxPercent) || 0;
        const taxType: 'add' | 'deduct' = inv.taxType === 'deduct' ? 'deduct' : 'add';
        const taxAmount = Number(inv.taxAmount) || (amount * taxPercent / 100);
        const totalAmount = Number(inv.totalAmount) || (taxType === 'deduct' ? Math.max(0, amount - taxAmount) : (amount + taxAmount));

        return {
          id: inv.id || `inv-${Date.now()}`,
          accountId: inv.accountId || 'personal',
          type,
          invoiceNumber: inv.invoiceNumber || 'INV-2026-001',
          title: inv.title || inv.clientOrVendorName || inv.itemsSummary || 'Invoice',
          amount,
          currency: inv.currency || 'IQD',
          date: inv.date || inv.issueDate || new Date().toISOString().split('T')[0],
          estimatedDate: inv.estimatedDate || inv.dueDate || new Date().toISOString().split('T')[0],
          taxPercent,
          taxType,
          taxAmount,
          totalAmount,
          description: inv.description || inv.notes || inv.itemsSummary || '',
          attachments: inv.attachments || undefined,
          status,
          linkedTransactionId: inv.linkedTransactionId || undefined,
          createdAt: inv.createdAt || new Date().toISOString(),
          updatedAt: inv.updatedAt || new Date().toISOString(),
          direction: type === 'incoming' ? 'receivable' : 'payable',
          clientOrVendorName: inv.clientOrVendorName || inv.title,
          dueDate: inv.estimatedDate || inv.dueDate,
          issueDate: inv.date || inv.issueDate,
        };
      });
    } catch {
      return INITIAL_INVOICES;
    }
  }

  static saveInvoices(invoices: BusinessInvoice[]): void {
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
  }

  /**
   * Automated backward compatibility migration
   * 1. Purges legacy hardcoded mock/seed data.
   * 2. Assigns accountId = 'personal' to any transaction, budget, or plan missing an accountId.
   * 3. Creates the default 'personal' workspace profile if missing.
   */
  static runMigration(): void {
    try {
      // 0. Purge legacy mock/demo data
      const SEED_PURGED_KEY = 'finance_app_seed_purged_v3';
      if (!localStorage.getItem(SEED_PURGED_KEY)) {
        // Clean transactions
        const txData = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
        if (txData) {
          const txs = JSON.parse(txData);
          if (Array.isArray(txs)) {
            const legacyTxIds = new Set([
              'tx-1', 'tx-2', 'tx-3', 'tx-4', 'tx-5', 'tx-6', 'tx-7', 'tx-8',
              'tx-biz-1', 'tx-biz-2', 'tx-biz-3', 'tx-biz-4', 'tx-biz-5', 'tx-biz-6'
            ]);
            const cleanedTxs = txs.filter((t: any) => !legacyTxIds.has(t.id) && t.accountId !== 'biz-solar');
            localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(cleanedTxs));
          }
        }
        // Clean accounts
        const accData = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
        if (accData) {
          const accs = JSON.parse(accData);
          if (Array.isArray(accs)) {
            const cleanedAccs = accs.filter((a: any) => a.id !== 'biz-solar');
            if (!cleanedAccs.some((a: any) => a.id === 'personal')) {
              cleanedAccs.unshift(INITIAL_ACCOUNTS[0]);
            }
            localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(cleanedAccs));
          }
        }
        // Clean plans
        const planData = localStorage.getItem(STORAGE_KEYS.PLANS);
        if (planData) {
          const plans = JSON.parse(planData);
          if (Array.isArray(plans)) {
            const legacyPlanIds = new Set(['plan-1', 'plan-2', 'plan-3']);
            const cleanedPlans = plans.filter((p: any) => !legacyPlanIds.has(p.id));
            localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(cleanedPlans));
          }
        }
        // Clean invoices
        const invData = localStorage.getItem(STORAGE_KEYS.INVOICES);
        if (invData) {
          const invs = JSON.parse(invData);
          if (Array.isArray(invs)) {
            const legacyInvIds = new Set(['inv-1', 'inv-2', 'inv-3']);
            const cleanedInvs = invs.filter((i: any) => !legacyInvIds.has(i.id) && i.accountId !== 'biz-solar');
            localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(cleanedInvs));
          }
        }
        // Clean budgets
        const budData = localStorage.getItem(STORAGE_KEYS.BUDGETS);
        if (budData) {
          const buds = JSON.parse(budData);
          if (Array.isArray(buds)) {
            const legacyBudgetIds = new Set(['b-1', 'b-2', 'b-3', 'b-4', 'b-5']);
            const cleanedBuds = buds.filter((b: any) => !legacyBudgetIds.has(b.id));
            localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(cleanedBuds));
          }
        }
        // Reset active account if it was biz-solar
        if (localStorage.getItem(STORAGE_KEYS.ACTIVE_ACCOUNT_ID) === 'biz-solar') {
          localStorage.setItem(STORAGE_KEYS.ACTIVE_ACCOUNT_ID, 'personal');
        }
        localStorage.setItem(SEED_PURGED_KEY, 'true');
      }

      // 1. Transactions migration
      const txData = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      if (txData) {
        const txs = JSON.parse(txData);
        if (Array.isArray(txs)) {
          let modified = false;
          const updated = txs.map((t: any) => {
            if (!t.accountId) {
              modified = true;
              return { ...t, accountId: 'personal' };
            }
            return t;
          });
          if (modified) {
            localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updated));
          }
        }
      }

      // 2. Plans migration
      const plansData = localStorage.getItem(STORAGE_KEYS.PLANS);
      if (plansData) {
        const plans = JSON.parse(plansData);
        if (Array.isArray(plans)) {
          let modified = false;
          const updated = plans.map((p: any) => {
            if (!p.accountId) {
              modified = true;
              return { ...p, accountId: 'personal' };
            }
            return p;
          });
          if (modified) {
            localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(updated));
          }
        }
      }

      // 3. Budgets migration
      const budgetsData = localStorage.getItem(STORAGE_KEYS.BUDGETS);
      if (budgetsData) {
        const budgets = JSON.parse(budgetsData);
        if (Array.isArray(budgets)) {
          let modified = false;
          const updated = budgets.map((b: any) => {
            if (!b.accountId) {
              modified = true;
              return { ...b, accountId: 'personal' };
            }
            return b;
          });
          if (modified) {
            localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(updated));
          }
        }
      }

      // 4. Accounts profile check & default personal setup
      const accountsData = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
      let accounts: AccountProfile[] = accountsData ? JSON.parse(accountsData) : INITIAL_ACCOUNTS;
      if (!Array.isArray(accounts) || accounts.length === 0) {
        accounts = INITIAL_ACCOUNTS;
      }
      if (!accounts.some(a => a.id === 'personal')) {
        accounts.unshift(INITIAL_ACCOUNTS[0]);
      }
      localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
    } catch (err) {
      console.warn('Migration warning:', err);
    }
  }

  static loadTransfers(): LinkedTransfer[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TRANSFERS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static saveTransfers(transfers: LinkedTransfer[]): void {
    localStorage.setItem(STORAGE_KEYS.TRANSFERS, JSON.stringify(transfers));
  }

  static loadPlans(): PlanItem[] {
    try {
      const plansData = localStorage.getItem(STORAGE_KEYS.PLANS);
      if (plansData) {
        const parsed: PlanItem[] = JSON.parse(plansData);
        if (Array.isArray(parsed)) {
          const legacyPlanIds = new Set(['plan-1', 'plan-2', 'plan-3']);
          return parsed.filter(p => !legacyPlanIds.has(p.id));
        }
      }
      return [];
    } catch {
      return [];
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
      if (data) {
        const parsed: BudgetItem[] = JSON.parse(data);
        if (Array.isArray(parsed)) {
          const legacyBudgetIds = new Set(['b-1', 'b-2', 'b-3', 'b-4', 'b-5']);
          return parsed.filter(b => !legacyBudgetIds.has(b.id));
        }
      }
      return [];
    } catch {
      return [];
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

  static getTheme(): ThemeMode {
    return getSavedTheme();
  }

  static setTheme(theme: ThemeMode | string): void {
    applyTheme(theme as ThemeMode);
  }

  static getLanguage(): 'en' | 'ar' {
    const lang = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    return lang === 'ar' ? 'ar' : 'en';
  }

  static setLanguage(lang: 'en' | 'ar'): void {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  }
}

// Run backward compatibility migration on initialization
StorageService.runMigration();
