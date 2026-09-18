import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  AccountProfile,
  BusinessAccount,
  BusinessBudgetMode,
  PlanStep,
  BusinessInvoice,
  BusinessInvoiceStatus,
  LinkedTransfer,
  TransactionItem,
  BusinessMetrics,
  ProjectMarginSummary,
} from '../types/finance';
import { StorageService, INITIAL_ACCOUNTS } from '../services/storage';

// Global shared state bus so all components stay reactive
type Listener = () => void;
let listeners: Listener[] = [];

let globalAccounts: AccountProfile[] = StorageService.loadAccounts();
let globalActiveAccountId: string = StorageService.getActiveAccountId();
let globalInvoices: BusinessInvoice[] = StorageService.loadInvoices();
let globalTransfers: LinkedTransfer[] = StorageService.loadTransfers();

function notify() {
  listeners.forEach(l => l());
}

export function useAccountStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick(t => t + 1);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  const accounts = globalAccounts;
  const activeAccountId = globalActiveAccountId;
  const invoices = globalInvoices;
  const transfers = globalTransfers;

  const activeAccount = useMemo(() => {
    const found = accounts.find(a => a.id === activeAccountId);
    return found || accounts[0] || INITIAL_ACCOUNTS[0];
  }, [accounts, activeAccountId]);

  const isBusinessMode = activeAccount.type === 'business';

  // Set active account ID with persistence
  const setActiveAccount = useCallback((id: string) => {
    if (globalAccounts.some(a => a.id === id)) {
      globalActiveAccountId = id;
      StorageService.setActiveAccountId(id);
      notify();
    }
  }, []);

  // Validate unique account name (case-insensitive)
  const validateAccountName = useCallback((name: string, excludeId?: string): { valid: boolean; error?: string } => {
    const trimmed = name.trim();
    if (!trimmed) {
      return { valid: false, error: 'Account name cannot be empty.' };
    }
    const duplicate = globalAccounts.some(
      a => a.id !== excludeId && a.name.trim().toLowerCase() === trimmed.toLowerCase()
    );
    if (duplicate) {
      return { valid: false, error: `An account named "${trimmed}" already exists.` };
    }
    return { valid: true };
  }, []);

  // Create a new business account (Max 6 total: 1 personal + up to 5 business)
  const createBusinessAccount = useCallback((data: {
    name: string;
    currency?: string;
    color?: string;
    icon?: string;
    description?: string;
    allocatedBudget?: number;
  }): { success: boolean; account?: AccountProfile; error?: string } => {
    if (globalAccounts.length >= 6) {
      return {
        success: false,
        error: 'Maximum 6 accounts allowed (1 Personal + 5 Business accounts).',
      };
    }

    const validation = validateAccountName(data.name);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    const newAccount: AccountProfile = {
      id: `biz-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type: 'business',
      name: data.name.trim(),
      currency: data.currency || activeAccount.currency || 'IQD',
      color: data.color || '#FF9500',
      icon: data.icon || 'Building',
      description: data.description?.trim() || '',
      allocatedBudget: data.allocatedBudget !== undefined ? Math.max(0, data.allocatedBudget) : 35000000,
      createdAt: new Date().toISOString(),
    };

    globalAccounts = [...globalAccounts, newAccount];
    StorageService.saveAccounts(globalAccounts);
    // Switch to new business account
    globalActiveAccountId = newAccount.id;
    StorageService.setActiveAccountId(newAccount.id);
    notify();

    return { success: true, account: newAccount };
  }, [activeAccount.currency, validateAccountName]);

  // Update existing account
  const updateAccount = useCallback((
    id: string,
    updates: Partial<Pick<AccountProfile, 'name' | 'currency' | 'color' | 'icon' | 'description' | 'allocatedBudget' | 'budgetMode' | 'steps'>>
  ): { success: boolean; account?: AccountProfile; error?: string } => {
    const existing = globalAccounts.find(a => a.id === id);
    if (!existing) {
      return { success: false, error: 'Account not found.' };
    }

    if (updates.name !== undefined) {
      const validation = validateAccountName(updates.name, id);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }
    }

    const updatedAccount: AccountProfile = {
      ...existing,
      ...updates,
      name: updates.name !== undefined ? updates.name.trim() : existing.name,
      description: updates.description !== undefined ? updates.description.trim() : existing.description,
      allocatedBudget: updates.allocatedBudget !== undefined ? Math.max(0, updates.allocatedBudget) : existing.allocatedBudget,
      budgetMode: updates.budgetMode !== undefined ? updates.budgetMode : existing.budgetMode,
      steps: updates.steps !== undefined ? updates.steps : existing.steps,
    };

    globalAccounts = globalAccounts.map(a => (a.id === id ? updatedAccount : a));
    StorageService.saveAccounts(globalAccounts);
    notify();

    return { success: true, account: updatedAccount };
  }, [validateAccountName]);

  // Quick updater for allocated budget
  const updateAllocatedBudget = useCallback((
    accountId: string,
    amount: number,
    budgetMode?: BusinessBudgetMode,
    steps?: PlanStep[]
  ) => {
    const target = globalAccounts.find(a => a.id === accountId);
    if (!target) return;
    globalAccounts = globalAccounts.map(a =>
      a.id === accountId
        ? {
            ...a,
            allocatedBudget: Math.max(0, amount),
            ...(budgetMode !== undefined ? { budgetMode } : {}),
            ...(steps !== undefined ? { steps } : {}),
          }
        : a
    );
    StorageService.saveAccounts(globalAccounts);
    notify();
  }, []);

  // Delete business account (Primary Personal Account can NEVER be deleted)
  const deleteAccount = useCallback((id: string): { success: boolean; error?: string } => {
    if (id === 'personal') {
      return { success: false, error: 'The primary Personal Account cannot be deleted.' };
    }

    const target = globalAccounts.find(a => a.id === id);
    if (!target) {
      return { success: false, error: 'Account not found.' };
    }

    // Cascade: remove account from accounts list
    globalAccounts = globalAccounts.filter(a => a.id !== id);
    StorageService.saveAccounts(globalAccounts);

    // Cascade: remove invoices for that account and void their ledger txs
    const targetInvoices = globalInvoices.filter(inv => inv.accountId === id);
    const linkedTxIds = new Set(targetInvoices.map(i => i.linkedTransactionId).filter(Boolean));
    if (linkedTxIds.size > 0) {
      const allTxs = StorageService.loadTransactions();
      const nextTxs = allTxs.filter(t => !linkedTxIds.has(t.id));
      StorageService.saveTransactions(nextTxs);
    }

    globalInvoices = globalInvoices.filter(inv => inv.accountId !== id);
    StorageService.saveInvoices(globalInvoices);

    // If active account was deleted, switch back to personal
    if (globalActiveAccountId === id) {
      globalActiveAccountId = 'personal';
      StorageService.setActiveAccountId('personal');
    }

    notify();
    return { success: true };
  }, []);

  // Add Invoice with atomic ledger synchronization
  const addInvoice = useCallback((
    invoiceData: Omit<BusinessInvoice, 'id' | 'createdAt' | 'updatedAt' | 'taxAmount' | 'totalAmount'> & {
      taxAmount?: number;
      totalAmount?: number;
    },
    onTransactionsUpdated?: (txs: TransactionItem[]) => void
  ) => {
    const amount = Number(invoiceData.amount) || 0;
    const taxPercent = Number(invoiceData.taxPercent) || 0;
    const taxType = invoiceData.taxType === 'deduct' ? 'deduct' : 'add';
    const taxAmount = invoiceData.taxAmount ?? Math.round((amount * (taxPercent / 100)) * 100) / 100;
    const totalAmount =
      invoiceData.totalAmount ??
      (taxType === 'deduct' ? Math.max(0, amount - taxAmount) : amount + taxAmount);
    const invId = `inv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const nowIso = new Date().toISOString();

    let linkedTxId: string | undefined = undefined;

    // If created in 'settled' status directly: log transaction in business ledger
    if (invoiceData.status === 'settled') {
      linkedTxId = `tx-inv-${invId}`;
      const tx: TransactionItem = {
        id: linkedTxId,
        accountId: invoiceData.accountId,
        type: invoiceData.type === 'incoming' ? 'income' : 'expense',
        amount: totalAmount,
        currency: invoiceData.currency || 'IQD',
        date: invoiceData.date || nowIso.split('T')[0],
        category: invoiceData.type === 'incoming' ? 'Invoice Settlement' : 'Vendor Bills',
        source: invoiceData.type === 'incoming' ? (invoiceData.title || invoiceData.invoiceNumber) : '',
        itemDescription: `${invoiceData.type === 'incoming' ? 'Received' : 'Paid'}: ${invoiceData.invoiceNumber} - ${invoiceData.title}`,
        notes: `Settled ${invoiceData.type === 'incoming' ? 'client bill' : 'vendor bill'} ${invoiceData.invoiceNumber}. ${invoiceData.description || ''}`.trim(),
        createdAt: nowIso,
        updatedAt: nowIso,
      };
      const updatedTxs = StorageService.addTransaction(tx);
      if (onTransactionsUpdated) onTransactionsUpdated(updatedTxs);
    }

    const newInvoice: BusinessInvoice = {
      ...invoiceData,
      id: invId,
      taxAmount,
      totalAmount,
      linkedTransactionId: linkedTxId,
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    globalInvoices = [newInvoice, ...globalInvoices];
    StorageService.saveInvoices(globalInvoices);
    notify();
    return newInvoice;
  }, []);

  // Update Invoice with atomic ledger synchronization on status change
  const updateInvoice = useCallback((
    updatedInv: BusinessInvoice,
    onTransactionsUpdated?: (txs: TransactionItem[]) => void
  ) => {
    const existing = globalInvoices.find(i => i.id === updatedInv.id);
    if (!existing) return;

    const amount = Number(updatedInv.amount) || 0;
    const taxPercent = Number(updatedInv.taxPercent) || 0;
    const taxType = updatedInv.taxType === 'deduct' ? 'deduct' : 'add';
    const taxAmount = updatedInv.taxAmount ?? Math.round((amount * (taxPercent / 100)) * 100) / 100;
    const totalAmount =
      updatedInv.totalAmount ??
      (taxType === 'deduct' ? Math.max(0, amount - taxAmount) : amount + taxAmount);
    const nowIso = new Date().toISOString();

    let linkedTxId = existing.linkedTransactionId;
    let currentTxs = StorageService.loadTransactions();

    // Transition to 'settled' (Paid / Received): Automatically log transaction
    if (updatedInv.status === 'settled' && existing.status !== 'settled') {
      linkedTxId = linkedTxId || `tx-inv-${updatedInv.id}`;
      const tx: TransactionItem = {
        id: linkedTxId,
        accountId: updatedInv.accountId,
        type: updatedInv.type === 'incoming' ? 'income' : 'expense',
        amount: totalAmount,
        currency: updatedInv.currency || 'IQD',
        date: updatedInv.date || nowIso.split('T')[0],
        category: updatedInv.type === 'incoming' ? 'Invoice Settlement' : 'Vendor Bills',
        source: updatedInv.type === 'incoming' ? (updatedInv.title || updatedInv.invoiceNumber) : '',
        itemDescription: `${updatedInv.type === 'incoming' ? 'Received' : 'Paid'}: ${updatedInv.invoiceNumber} - ${updatedInv.title}`,
        notes: `Settled ${updatedInv.type === 'incoming' ? 'client bill' : 'vendor bill'} ${updatedInv.invoiceNumber}. ${updatedInv.description || ''}`.trim(),
        createdAt: nowIso,
        updatedAt: nowIso,
      };
      currentTxs = [tx, ...currentTxs.filter(t => t.id !== linkedTxId)];
      StorageService.saveTransactions(currentTxs);
      if (onTransactionsUpdated) onTransactionsUpdated(currentTxs);
    }
    // Reverting from 'settled' to earlier status: Atomically remove/void ledger transaction
    else if (updatedInv.status !== 'settled' && existing.status === 'settled') {
      if (linkedTxId) {
        currentTxs = currentTxs.filter(t => t.id !== linkedTxId);
        StorageService.saveTransactions(currentTxs);
        if (onTransactionsUpdated) onTransactionsUpdated(currentTxs);
        linkedTxId = undefined;
      }
    }
    // Remained 'settled', but amount/meta modified: keep ledger in sync
    else if (updatedInv.status === 'settled' && linkedTxId) {
      currentTxs = currentTxs.map(t => {
        if (t.id === linkedTxId) {
          return {
            ...t,
            amount: totalAmount,
            currency: updatedInv.currency,
            date: updatedInv.date,
            itemDescription: `${updatedInv.type === 'incoming' ? 'Received' : 'Paid'}: ${updatedInv.invoiceNumber} - ${updatedInv.title}`,
            updatedAt: nowIso,
          };
        }
        return t;
      });
      StorageService.saveTransactions(currentTxs);
      if (onTransactionsUpdated) onTransactionsUpdated(currentTxs);
    }

    const finalizedInvoice: BusinessInvoice = {
      ...updatedInv,
      taxAmount,
      totalAmount,
      linkedTransactionId: linkedTxId,
      updatedAt: nowIso,
    };

    globalInvoices = globalInvoices.map(inv =>
      inv.id === updatedInv.id ? finalizedInvoice : inv
    );
    StorageService.saveInvoices(globalInvoices);
    notify();
  }, []);

  // Inline status updater
  const updateInvoiceStatus = useCallback((
    id: string,
    newStatus: BusinessInvoiceStatus,
    onTransactionsUpdated?: (txs: TransactionItem[]) => void
  ) => {
    const existing = globalInvoices.find(i => i.id === id);
    if (!existing) return;
    updateInvoice({ ...existing, status: newStatus }, onTransactionsUpdated);
  }, [updateInvoice]);

  // Delete invoice and cleanly remove any linked transaction
  const deleteInvoice = useCallback((
    id: string,
    onTransactionsUpdated?: (txs: TransactionItem[]) => void
  ) => {
    const existing = globalInvoices.find(i => i.id === id);
    if (existing?.linkedTransactionId) {
      const currentTxs = StorageService.loadTransactions();
      const updatedTxs = currentTxs.filter(t => t.id !== existing.linkedTransactionId);
      StorageService.saveTransactions(updatedTxs);
      if (onTransactionsUpdated) onTransactionsUpdated(updatedTxs);
    }
    globalInvoices = globalInvoices.filter(inv => inv.id !== id);
    StorageService.saveInvoices(globalInvoices);
    notify();
  }, []);

  const markInvoicePaid = useCallback((
    id: string,
    onTransactionsUpdated?: (txs: TransactionItem[]) => void
  ) => {
    const existing = globalInvoices.find(i => i.id === id);
    if (!existing) return;
    updateInvoice({ ...existing, status: 'settled' }, onTransactionsUpdated);
  }, [updateInvoice]);

  // Atomic Inter-Account Fund Transfer
  const transferFunds = useCallback((params: {
    fromAccountId: string;
    toAccountId: string;
    amount: number;
    note?: string;
    date?: string;
    allTransactions: TransactionItem[];
  }): { success: boolean; error?: string; transfer?: LinkedTransfer; updatedTransactions?: TransactionItem[] } => {
    const { fromAccountId, toAccountId, amount, note, date, allTransactions } = params;

    if (fromAccountId === toAccountId) {
      return { success: false, error: 'Source and destination accounts must be different.' };
    }

    if (!amount || amount <= 0) {
      return { success: false, error: 'Transfer amount must be greater than zero.' };
    }

    const sourceAcc = globalAccounts.find(a => a.id === fromAccountId);
    const destAcc = globalAccounts.find(a => a.id === toAccountId);

    if (!sourceAcc || !destAcc) {
      return { success: false, error: 'Selected account not found.' };
    }

    const transferId = `trf-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const txDate = date || new Date().toISOString().split('T')[0];
    const isoNow = new Date().toISOString();

    const sourceTxId = `tx-out-${Date.now()}`;
    const destTxId = `tx-in-${Date.now() + 1}`;

    // 1. Source Ledger: Expense (Transfer Out)
    const sourceTx: TransactionItem = {
      id: sourceTxId,
      accountId: fromAccountId,
      type: 'expense',
      category: 'Transfer Out',
      source: '',
      itemDescription: `Transfer to ${destAcc.name}`,
      amount: amount,
      currency: sourceAcc.currency,
      date: txDate,
      notes: note ? `${note} • Linked to ${destAcc.name}` : `Inter-account transfer to ${destAcc.name}`,
      linkedTransferId: transferId,
      transferType: 'transfer_out',
      counterpartAccountId: toAccountId,
      createdAt: isoNow,
      updatedAt: isoNow,
    };

    // 2. Destination Ledger: Income (Transfer In)
    const destTx: TransactionItem = {
      id: destTxId,
      accountId: toAccountId,
      type: 'income',
      category: 'Transfer In',
      source: 'Transfer In',
      itemDescription: `Transfer from ${sourceAcc.name}`,
      amount: amount,
      currency: destAcc.currency,
      date: txDate,
      notes: note ? `${note} • Linked to ${sourceAcc.name}` : `Inter-account transfer from ${sourceAcc.name}`,
      linkedTransferId: transferId,
      transferType: 'transfer_in',
      counterpartAccountId: fromAccountId,
      createdAt: isoNow,
      updatedAt: isoNow,
    };

    // 3. Persistent LinkedTransfer record
    const linkedRecord: LinkedTransfer = {
      id: transferId,
      sourceAccountId: fromAccountId,
      destinationAccountId: toAccountId,
      amount: amount,
      currency: sourceAcc.currency,
      date: txDate,
      note: note || '',
      sourceTransactionId: sourceTxId,
      destinationTransactionId: destTxId,
      createdAt: isoNow,
    };

    globalTransfers = [linkedRecord, ...globalTransfers];
    StorageService.saveTransfers(globalTransfers);

    const updatedTransactions = [sourceTx, destTx, ...allTransactions];
    StorageService.saveTransactions(updatedTransactions);
    notify();

    return {
      success: true,
      transfer: linkedRecord,
      updatedTransactions,
    };
  }, []);

  // Atomic synchronized deletion of paired transfer transactions
  const deleteLinkedTransferPair = useCallback((
    txId: string,
    allTransactions: TransactionItem[]
  ): { updatedTransactions: TransactionItem[]; deletedIds: string[] } => {
    const target = allTransactions.find(t => t.id === txId);
    if (!target) {
      return { updatedTransactions: allTransactions, deletedIds: [] };
    }

    if (!target.linkedTransferId) {
      const next = allTransactions.filter(t => t.id !== txId);
      StorageService.saveTransactions(next);
      return { updatedTransactions: next, deletedIds: [txId] };
    }

    // Both paired transactions share linkedTransferId
    const pairId = target.linkedTransferId;
    const toDeleteIds = allTransactions.filter(t => t.linkedTransferId === pairId).map(t => t.id);
    const next = allTransactions.filter(t => t.linkedTransferId !== pairId);

    globalTransfers = globalTransfers.filter(trf => trf.id !== pairId);
    StorageService.saveTransfers(globalTransfers);
    StorageService.saveTransactions(next);
    notify();

    return { updatedTransactions: next, deletedIds: toDeleteIds };
  }, []);

  // Calculate clean, actionable business financial metrics for an account
  const calculateBusinessMetrics = useCallback((
    accountId: string,
    transactions: TransactionItem[],
    accInvoices: BusinessInvoice[]
  ): BusinessMetrics => {
    const account = globalAccounts.find(a => a.id === accountId);
    const accountTxs = transactions.filter(t => (t.accountId || 'personal') === accountId);
    const accountInvs = accInvoices.filter(i => i.accountId === accountId);

    // 1. Operating Budget Health
    const isPlanMode = account?.budgetMode === 'plan';
    const planRollup = (account?.steps && account.steps.length > 0)
      ? account.steps.reduce((sum, s) => sum + (Number(s.targetAmount) || 0), 0)
      : 0;
    const allocatedBudget = (isPlanMode && planRollup > 0)
      ? planRollup
      : (account?.allocatedBudget ?? 35000000);

    let totalIncome = 0;
    let totalExpenses = 0;

    for (const tx of accountTxs) {
      if (tx.type === 'income') {
        totalIncome += tx.amount;
      } else {
        totalExpenses += tx.amount;
      }
    }

    const budgetSpent = totalExpenses;
    const budgetRemaining = Math.max(0, allocatedBudget - budgetSpent);
    const budgetProgressPercent =
      allocatedBudget > 0 ? Math.min(100, Math.round((budgetSpent / allocatedBudget) * 100)) : 0;

    // 2. Net Profit
    const netProfit = totalIncome - totalExpenses;

    // 3. Smart Highlights: Pending Inflows & Outflows
    let pendingInflow = 0;
    let pendingOutflow = 0;

    for (const inv of accountInvs) {
      const invTotal = inv.totalAmount || inv.amount;
      if (inv.status === 'submitted' || inv.status === 'approved') {
        if (inv.type === 'incoming') {
          pendingInflow += invTotal;
        } else {
          pendingOutflow += invTotal;
        }
      }
    }

    // 4. Upcoming Due Dates (within 7 to 14 days or overdue)
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const fourteenDaysAhead = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const upcomingDueInvoices = accountInvs.filter(inv => {
      if (inv.status === 'settled') return false;
      const targetDate = inv.estimatedDate || inv.date || todayStr;
      return targetDate <= fourteenDaysAhead;
    });

    const upcomingDueCount = upcomingDueInvoices.length;

    // Legacy compatibility fields
    const netMarginPercent = totalIncome > 0 ? Math.round(((netProfit) / totalIncome) * 1000) / 10 : 0;
    const liquidReserves = Math.max(0, netProfit);
    const monthlyBurnRate = totalExpenses;
    const runwayMonths = monthlyBurnRate > 0 ? Math.round((liquidReserves / monthlyBurnRate) * 10) / 10 : 99;

    return {
      allocatedBudget,
      budgetSpent,
      budgetRemaining,
      budgetProgressPercent,
      totalIncome,
      totalExpenses,
      netProfit,
      pendingInflow,
      pendingOutflow,
      upcomingDueCount,
      upcomingDueInvoices,
      // Legacy compatibility
      grossRevenue: totalIncome,
      operatingExpenses: totalExpenses,
      capitalExpenditures: 0,
      netOperatingProfit: netProfit,
      netMarginPercent,
      liquidReserves,
      monthlyBurnRate,
      runwayMonths,
      totalReceivables: pendingInflow,
      overdueReceivables: 0,
      totalPayables: pendingOutflow,
      overduePayables: 0,
      taxDeductibleTotal: 0,
      projectMargins: [],
    };
  }, []);

  return {
    accounts,
    activeAccountId,
    activeAccount,
    isBusinessMode,
    invoices,
    transfers,
    setActiveAccount,
    createBusinessAccount,
    updateAccount,
    updateAllocatedBudget,
    deleteAccount,
    validateAccountName,
    addInvoice,
    updateInvoice,
    updateInvoiceStatus,
    deleteInvoice,
    markInvoicePaid,
    transferFunds,
    deleteLinkedTransferPair,
    calculateBusinessMetrics,
  };
}
