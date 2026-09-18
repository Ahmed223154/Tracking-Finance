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
    name: 'Personal Vault',
    currency: 'IQD',
    color: '#007AFF',
    icon: 'User',
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Primary personal finance, savings, and living ledger',
    allocatedBudget: 0,
  },
  {
    id: 'biz-solar',
    type: 'business',
    name: 'Solar Engineering Consulting',
    currency: 'IQD',
    color: '#FF9500',
    icon: 'Building',
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Clean energy audits, commercial PV design & consulting',
    allocatedBudget: 35000000,
    budgetMode: 'plan',
    steps: [
      {
        id: 'step-solar-1',
        title: 'Phase 1 Site Assessment & LiDAR Drone Surveys',
        targetAmount: 8500000,
        allocatedAmount: 8500000,
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        duration: 14,
        endDate: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        predecessors: [],
        status: 'completed',
      },
      {
        id: 'step-solar-2',
        title: 'CAD Engineering Simulation Licenses & Equipment',
        targetAmount: 14500000,
        allocatedAmount: 6000000,
        startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        duration: 21,
        endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        predecessors: [{ predecessorId: 'step-solar-1', type: 'FS', lag: 1 }],
        status: 'in_progress',
      },
      {
        id: 'step-solar-3',
        title: 'Clean Energy Expo & Strategic Client Acquisition',
        targetAmount: 12000000,
        allocatedAmount: 0,
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        duration: 25,
        endDate: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        predecessors: [{ predecessorId: 'step-solar-2', type: 'FS', lag: 0 }],
        status: 'not_started',
      },
    ],
  },
];

export const INITIAL_INVOICES: BusinessInvoice[] = [
  {
    id: 'inv-1',
    accountId: 'biz-solar',
    type: 'incoming',
    invoiceNumber: 'INV-2026-081',
    title: 'Phase 2 Grid-Tied PV Detailed Design Documentation',
    amount: 14500000,
    currency: 'IQD',
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    estimatedDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    taxPercent: 0,
    taxType: 'add',
    taxAmount: 0,
    totalAmount: 14500000,
    description: 'Clean energy detailed engineering deliverables for Al-Nahrain Clean Energy Corp',
    status: 'approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'inv-2',
    accountId: 'biz-solar',
    type: 'incoming',
    invoiceNumber: 'INV-2026-079',
    title: 'Commercial Rooftop PV Preliminary Feasibility Audit',
    amount: 6200000,
    currency: 'IQD',
    date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    estimatedDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    taxPercent: 0,
    taxType: 'add',
    taxAmount: 0,
    totalAmount: 6200000,
    description: 'Site solar radiation audit for Dijlah Commercial Logistics',
    status: 'submitted',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'inv-3',
    accountId: 'biz-solar',
    type: 'outgoing',
    invoiceNumber: 'BILL-GermanSensors-22',
    title: 'Solar Radiation Sensors Calibration & Courier Delivery',
    amount: 2800000,
    currency: 'IQD',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    estimatedDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    taxPercent: 5,
    taxType: 'add',
    taxAmount: 140000,
    totalAmount: 2940000,
    description: 'Supplier bill for calibrated pyranometer probes from German Pyranometer Labs GmbH',
    status: 'approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const INITIAL_TRANSACTIONS: TransactionItem[] = [
  // Personal transactions
  {
    id: 'tx-1',
    accountId: 'personal',
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
    accountId: 'personal',
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
    accountId: 'personal',
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
    accountId: 'personal',
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
    accountId: 'personal',
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
    accountId: 'personal',
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
    accountId: 'personal',
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
    accountId: 'personal',
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

  // Initial Business Transactions for "Solar Engineering Consulting"
  {
    id: 'tx-biz-1',
    accountId: 'biz-solar',
    type: 'income',
    amount: 18500000,
    currency: 'IQD',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Client Invoicing',
    source: 'Baghdad Clean Energy Project',
    itemDescription: 'Phase 1 Solar Array Grid Design Milestone',
    projectCode: 'PRJ-SOLAR-01',
    clientContract: 'CNT-2026-BAGHDAD',
    notes: 'Approved engineering milestone delivery invoice',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tx-biz-2',
    accountId: 'biz-solar',
    type: 'income',
    amount: 9200000,
    currency: 'IQD',
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Consulting Fee',
    source: 'Basra Industrial Park',
    itemDescription: 'Industrial Rooftop Feasibility Study',
    projectCode: 'PRJ-AUDIT-02',
    clientContract: 'CNT-2026-BASRA',
    notes: 'Energy audit completion retainer',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tx-biz-3',
    accountId: 'biz-solar',
    type: 'expense',
    expenseType: 'opex',
    isTaxDeductible: true,
    amount: 4500000,
    currency: 'IQD',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Payroll & Engineers',
    source: '',
    itemDescription: 'Senior Electrical Subcontractors Payroll',
    projectCode: 'PRJ-SOLAR-01',
    receiptNote: 'Invoice #SUB-409 with signed timesheets',
    notes: 'Contractors payroll for CAD drafting and field inspection',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tx-biz-4',
    accountId: 'biz-solar',
    type: 'expense',
    expenseType: 'opex',
    isTaxDeductible: true,
    amount: 850000,
    currency: 'IQD',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Software & SaaS',
    source: '',
    itemDescription: 'AutoCAD & PVsyst Solar Modeling Licenses',
    receiptNote: 'SaaS receipt #INV-CAD-892',
    notes: 'Monthly engineering cloud suite for solar simulations',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tx-biz-5',
    accountId: 'biz-solar',
    type: 'expense',
    expenseType: 'capex',
    isTaxDeductible: true,
    amount: 3200000,
    currency: 'IQD',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Equipment & Hardware',
    source: '',
    itemDescription: 'Thermal Imaging Drone for Solar Panel Testing',
    projectCode: 'PRJ-SOLAR-01',
    receiptNote: 'Capital Asset Purchase - 3-Year Depreciation Tax Schedule',
    notes: 'DJI Enterprise thermal survey hardware with calibrated FLIR sensor',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tx-biz-6',
    accountId: 'biz-solar',
    type: 'expense',
    expenseType: 'opex',
    isTaxDeductible: true,
    amount: 1100000,
    currency: 'IQD',
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Office & Facilities',
    source: '',
    itemDescription: 'Engineering Office Rent & High-Speed Fiber',
    receiptNote: 'Office lease receipt #R-2026-03',
    notes: 'Monthly commercial workspace share',
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
    startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    targetDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    priority: 'critical',
    plannedMonthlyAmount: 600000,
    planDescription: '6 months of essential living expenses cash cushion',
    isCompleted: false,
    steps: [
      {
        id: 'step-101',
        title: 'Tier 1: 1-Month Basic Living Reserve',
        targetAmount: 2000000,
        allocatedAmount: 2000000,
        completedAmount: 2000000,
        startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        duration: 30,
        endDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        predecessors: [],
        status: 'completed',
        order: 1,
        isCritical: true,
      },
      {
        id: 'step-102',
        title: 'Tier 2: 3-Month Essential Security Cushion',
        targetAmount: 3000000,
        allocatedAmount: 2500000,
        completedAmount: 0,
        startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        duration: 60,
        endDate: new Date(Date.now()).toISOString().split('T')[0],
        predecessors: [{ predecessorId: 'step-101', type: 'FS', lag: 0 }],
        status: 'in_progress',
        order: 2,
        isCritical: true,
      },
      {
        id: 'step-103',
        title: 'Tier 3: 6-Month Full Runway & Liquidity Guard',
        targetAmount: 3000000,
        allocatedAmount: 0,
        completedAmount: 0,
        startDate: new Date(Date.now()).toISOString().split('T')[0],
        duration: 90,
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        predecessors: [{ predecessorId: 'step-102', type: 'FS', lag: 0 }],
        status: 'not_started',
        order: 3,
        isCritical: true,
      },
    ],
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
    startDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    targetDate: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    priority: 'high',
    plannedMonthlyAmount: 1150000,
    planDescription: 'Down payment for a reliable Toyota RAV4 or Prado',
    isCompleted: false,
    steps: [
      {
        id: 'step-201',
        title: 'Dealer Deposit & Allocation Booking',
        targetAmount: 3000000,
        allocatedAmount: 3000000,
        completedAmount: 3000000,
        startDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        duration: 20,
        endDate: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        predecessors: [],
        status: 'completed',
        order: 1,
        isCritical: true,
      },
      {
        id: 'step-202',
        title: 'Financing Pre-Approval & Credit Guarantee',
        targetAmount: 1500000,
        allocatedAmount: 1500000,
        completedAmount: 1500000,
        startDate: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        duration: 25,
        endDate: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        predecessors: [{ predecessorId: 'step-201', type: 'FS', lag: 0 }],
        status: 'completed',
        order: 2,
        isCritical: true,
      },
      {
        id: 'step-203',
        title: 'Vehicle Shipping, Customs & Port Clearance',
        targetAmount: 5500000,
        allocatedAmount: 2000000,
        completedAmount: 0,
        startDate: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        duration: 60,
        endDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        predecessors: [{ predecessorId: 'step-202', type: 'FS', lag: 5 }],
        status: 'in_progress',
        order: 3,
        isCritical: true,
      },
      {
        id: 'step-204',
        title: 'Traffic Directorate Registration & Insurance',
        targetAmount: 2000000,
        allocatedAmount: 0,
        completedAmount: 0,
        startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        duration: 15,
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        predecessors: [{ predecessorId: 'step-203', type: 'FS', lag: 0 }],
        status: 'not_started',
        order: 4,
        isCritical: true,
      },
      {
        id: 'step-205',
        title: 'Showroom Final Handover & Plate Clearance',
        targetAmount: 6000000,
        allocatedAmount: 0,
        completedAmount: 0,
        startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        duration: 20,
        endDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        predecessors: [
          { predecessorId: 'step-204', type: 'FS', lag: 0 },
          { predecessorId: 'step-202', type: 'FF', lag: 100 },
        ],
        status: 'not_started',
        order: 5,
        isCritical: true,
      },
    ],
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
    startDate: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    targetDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
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
      const raw: TransactionItem[] = data ? JSON.parse(data) : INITIAL_TRANSACTIONS;
      // Auto-migrate any untagged transactions to personal account
      return raw.map(t => ({
        ...t,
        accountId: t.accountId || 'personal',
      }));
    } catch {
      return INITIAL_TRANSACTIONS;
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
          // Ensure personal account always exists as index 0
          if (!parsed.some(a => a.id === 'personal')) {
            parsed.unshift(INITIAL_ACCOUNTS[0]);
          }
          // Merge initial steps & budgetMode for biz-solar if missing
          const enriched = parsed.map(acc => {
            if (acc.id === 'biz-solar' && (!acc.steps || acc.steps.length === 0)) {
              const initMatch = INITIAL_ACCOUNTS.find(ia => ia.id === acc.id);
              if (initMatch) {
                return {
                  ...acc,
                  budgetMode: acc.budgetMode || initMatch.budgetMode || 'plan',
                  steps: initMatch.steps,
                };
              }
            }
            return acc;
          });
          return enriched;
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
      return parsed.map((inv: any) => {
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
          accountId: inv.accountId || 'biz-solar',
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
   * 1. Assigns accountId = 'personal' to any transaction, budget, or plan missing an accountId.
   * 2. Creates the default 'personal' workspace profile if missing.
   * 3. Initializes storage structures for up to 5 business accounts.
   * 4. Upgrades legacy invoice structures into BusinessInvoice.
   */
  static runMigration(): void {
    try {
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

      // 5. Invoices migration
      const invoices = this.loadInvoices();
      this.saveInvoices(invoices);
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
        // Merge initial steps for default sample plans if missing
        const enriched = parsed.map(item => {
          if (!item.steps || item.steps.length === 0) {
            const initMatch = INITIAL_PLANS.find(ip => ip.id === item.id);
            if (initMatch?.steps && initMatch.steps.length > 0) {
              return { ...item, steps: initMatch.steps };
            }
          }
          return item;
        });
        return enriched;
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
