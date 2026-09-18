import React, { useState, useEffect, useCallback, useMemo } from 'react';
// FinanceApp - Personal Finance Management
// Developer: Ahmed AL KUBAISI (ahmed.mjabbar95@gmail.com)
// Architecture: Native iOS SwiftUI & SwiftData Architecture + PWA / Capacitor
import { TransactionItem, PlanItem, BudgetItem, CategoryItem, PlanStep } from './types/finance';
import { StorageService } from './services/storage';
import { financeStore } from './store/useFinanceStore';
import { useAccountStore } from './store/useAccountStore';
import { IPhoneFrame } from './components/simulator/IPhoneFrame';
import { DashboardTab } from './components/simulator/tabs/DashboardTab';
import { TransactionsTab } from './components/simulator/tabs/TransactionsTab';
import { AnalyticsTab } from './components/simulator/tabs/AnalyticsTab';
import { PlansTab } from './components/simulator/tabs/PlansTab';
import { SettingsTab } from './components/simulator/tabs/SettingsTab';
import { BusinessDashboardTab } from './components/simulator/tabs/BusinessDashboardTab';
import { BusinessSuiteTab } from './components/simulator/tabs/BusinessSuiteTab';
import { AccountSwitcherModal } from './components/simulator/accounts/AccountSwitcherModal';
import { TransferModal } from './components/simulator/accounts/TransferModal';
import { AddTransactionSheet } from './components/simulator/modals/AddTransactionSheet';
import { EditTransactionSheet } from './components/simulator/modals/EditTransactionSheet';
import { AllocateGoalSheet as AllocatePlanSheet } from './components/simulator/modals/AllocateGoalSheet';
import { CreateGoalSheet as CreatePlanSheet } from './components/simulator/modals/CreateGoalSheet';
import { GoalDetailSheet as PlanDetailSheet } from './components/simulator/modals/GoalDetailSheet';
import { BudgetsModal } from './components/simulator/modals/BudgetsModal';
import { FaceIDModal } from './components/simulator/modals/FaceIDModal';
import { QuickAddPopup } from './components/simulator/modals/QuickAddPopup';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CodeExplorer } from './components/code-hub/CodeExplorer';
import { DeployGuide } from './components/code-hub/DeployGuide';
import { FinancialEngine } from './services/financialEngine';
import { Smartphone, FileCode2, BookOpen, ShieldCheck, Building, ArrowRightLeft, Briefcase, ChevronDown, List, PieChart, Settings, Receipt } from 'lucide-react';
import { useI18n, I18nProvider, I18nContext, defaultI18nContext } from './context/I18nContext';
import { WidgetBridge } from './services/widgetBridge';
import { exitAppToHome } from './utils/widgetSync';
import { DeepLinkService } from './services/deepLinkService';
import { ThemeMode, applyTheme, getSavedTheme } from './utils/theme';

function FinanceAppMain() {
  const { t, language } = useI18n();
  // Top-level active view
  const [activeMainView, setActiveMainView] = useState<'simulator' | 'code' | 'guide'>('simulator');

  // Multi-Entity Business & Personal Account Store
  const {
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
    transferFunds,
    addInvoice,
    updateInvoice,
    updateInvoiceStatus,
    deleteInvoice,
    markInvoicePaid,
    calculateBusinessMetrics,
  } = useAccountStore();

  const [isAccountSwitcherOpen, setIsAccountSwitcherOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  // Simulator state: 5 Native iOS Tabs (0: Dashboard, 1: Plans/Suite, 2: Transactions, 3: Analytics, 4: Settings)
  const [activeTab, setActiveTab] = useState<number>(0);
  const [plansSubTab, setPlansSubTab] = useState<'dashboard' | 'plans' | 'whatif'>('dashboard');
  const [transactions, setTransactions] = useState<TransactionItem[]>(() => StorageService.loadTransactions());
  const [plans, setPlans] = useState<PlanItem[]>(() => StorageService.loadPlans());
  const [budgets, setBudgets] = useState<BudgetItem[]>(() => StorageService.loadBudgets());
  const [categories, setCategories] = useState<CategoryItem[]>(() => StorageService.loadCategories());
  const [biometricsEnabled, setBiometricsEnabled] = useState<boolean>(() => StorageService.getBiometrics());
  const [theme, setTheme] = useState<ThemeMode>(() => getSavedTheme());

  // Filter transactions scoped to active account
  const currentAccountTransactions = useMemo(() => {
    return transactions.filter(t => (t.accountId || 'personal') === activeAccountId);
  }, [transactions, activeAccountId]);

  // Compute live business metrics for the active business
  const businessMetrics = useMemo(() => {
    return calculateBusinessMetrics(activeAccountId, transactions, invoices);
  }, [calculateBusinessMetrics, activeAccountId, transactions, invoices]);

  // Modal sheets
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addInitialType, setAddInitialType] = useState<'expense' | 'income'>('expense');
  const [quickInputModal, setQuickInputModal] = useState<{
    isOpen: boolean;
    type: 'expense' | 'income';
  }>({
    isOpen: false,
    type: 'expense',
  });
  const [editingTransaction, setEditingTransaction] = useState<TransactionItem | null>(null);
  const [allocatingPlan, setAllocatingPlan] = useState<PlanItem | null>(null);
  const [allocatingStepId, setAllocatingStepId] = useState<string | undefined>(undefined);
  const [detailPlan, setDetailPlan] = useState<PlanItem | null>(null);
  const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false);
  const [isBudgetsOpen, setIsBudgetsOpen] = useState(false);
  const [isFaceIDOpen, setIsFaceIDOpen] = useState(false);

  // Reconcile pending transactions logged via Home Screen AppIntents (strictly isolated to Personal Account)
  const reconcileWidgetTransactions = useCallback(async () => {
    try {
      const pending = await WidgetBridge.flushPendingTransactions();
      if (pending && pending.length > 0) {
        const newItems: TransactionItem[] = pending.map((p, idx) => ({
          id: p.id || `tx-intent-${Date.now()}-${idx}`,
          accountId: 'personal', // Widget Isolation Guard
          amount: Math.abs(Number(p.amount)) || 0,
          currency: 'IQD',
          type: p.type === 'income' ? 'income' : 'expense',
          category: p.category || (p.type === 'income' ? 'Salary' : 'Other'),
          source: p.type === 'income' ? p.category || 'Salary' : '',
          itemDescription: p.note || (p.type === 'income' ? 'Quick Income' : 'Quick Expense'),
          notes: p.note ? `${p.note} (via iOS Widget Intent)` : 'Logged via iOS Home Screen Widget Intent [Personal Vault]',
          date: p.date ? p.date.split('T')[0] : new Date().toISOString().split('T')[0],
          createdAt: p.date || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }));

        setTransactions(prev => {
          const existingIds = new Set(prev.map(t => t.id));
          const toAdd = newItems.filter(item => !existingIds.has(item.id));
          if (toAdd.length === 0) return prev;
          const merged = [...toAdd, ...prev];
          StorageService.saveTransactions(merged);
          return merged;
        });
      }
    } catch {
      // Ignore
    }
  }, []);

  // Poll and reconcile on app start, window focus, visibility change, and custom event
  useEffect(() => {
    reconcileWidgetTransactions();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        reconcileWidgetTransactions();
      }
    };

    const handleFocus = () => {
      reconcileWidgetTransactions();
    };

    const handlePendingUpdated = () => {
      reconcileWidgetTransactions();
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('widget-pending-transactions-updated', handlePendingUpdated);

    let capCleanup: (() => void) | undefined;
    import('@capacitor/app')
      .then(({ App: CapApp }) => {
        const listener = CapApp.addListener('appStateChange', state => {
          if (state.isActive) {
            reconcileWidgetTransactions();
          }
        });
        capCleanup = () => {
          listener.then(handle => handle.remove()).catch(() => {});
        };
      })
      .catch(() => {});

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('widget-pending-transactions-updated', handlePendingUpdated);
      if (capCleanup) capCleanup();
    };
  }, [reconcileWidgetTransactions]);

  // Listen for Capacitor appUrlOpen native deep link event
  useEffect(() => {
    let removeListener: (() => void) | undefined;
    import('@capacitor/app')
      .then(({ App: CapApp }) => {
        const handleCapUrl = (urlStr: string) => {
          if (!urlStr) return;
          if (urlStr.includes('add-expense') || urlStr.endsWith('add-expense') || urlStr.includes('type=expense')) {
            setActiveMainView('simulator');
            setQuickInputModal({ isOpen: true, type: 'expense' });
          } else if (urlStr.includes('add-income') || urlStr.endsWith('add-income') || urlStr.includes('type=income')) {
            setActiveMainView('simulator');
            setQuickInputModal({ isOpen: true, type: 'income' });
          } else if (
            urlStr.startsWith('trackingfinance://quick-add') ||
            urlStr.startsWith('financeapp://quick-add') ||
            urlStr.startsWith('myapp://quick-add')
          ) {
            let qType: 'expense' | 'income' = 'expense';
            try {
              const urlPart = urlStr.replace(/^[a-zA-Z0-9]+:\/\/[^?]*\?/, '');
              const params = new URLSearchParams(urlPart);
              if (params.get('type') === 'income') {
                qType = 'income';
              }
            } catch {
              if (urlStr.includes('type=income')) qType = 'income';
            }
            setActiveMainView('simulator');
            setQuickInputModal({ isOpen: true, type: qType });
          }
        };

        const listenerPromise = CapApp.addListener('appUrlOpen', data => {
          if (data?.url) {
            handleCapUrl(data.url);
          }
        });

        removeListener = () => {
          listenerPromise.then(handle => handle.remove()).catch(() => {});
        };
      })
      .catch(() => {});

    return () => {
      if (removeListener) removeListener();
    };
  }, []);

  // Deep Linking & iOS 3D Touch Quick Actions Listener
  useEffect(() => {
    const cleanup = DeepLinkService.addListener(action => {
      if (action.type === 'quick-add') {
        setActiveMainView('simulator');
        setQuickInputModal({ isOpen: true, type: action.modalType });
      } else if (action.type === 'add-expense') {
        setActiveMainView('simulator');
        setQuickInputModal({ isOpen: true, type: 'expense' });
      } else if (action.type === 'add-income') {
        setActiveMainView('simulator');
        setQuickInputModal({ isOpen: true, type: 'income' });
      } else if (action.type === 'plans-dashboard') {
        setActiveMainView('simulator');
        setActiveTab(1);
        setPlansSubTab('dashboard');
      } else if (action.type === 'plan-detail') {
        setActiveMainView('simulator');
        const found = plans.find(p => p.id === action.planId);
        if (found) {
          setActiveTab(1);
          setDetailPlan(found);
        } else {
          setActiveTab(1);
        }
      }
    });

    return cleanup;
  }, [plans]);

  // Sync to local storage
  useEffect(() => {
    StorageService.saveTransactions(transactions);
  }, [transactions]);

  useEffect(() => {
    StorageService.savePlans(plans);
    financeStore.setPlans(plans);
  }, [plans]);

  useEffect(() => {
    StorageService.saveBudgets(budgets);
  }, [budgets]);

  useEffect(() => {
    StorageService.saveCategories(categories);
  }, [categories]);

  useEffect(() => {
    StorageService.setBiometrics(biometricsEnabled);
  }, [biometricsEnabled]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Listen for system/external theme changes
  useEffect(() => {
    const handleThemeChanged = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode: ThemeMode }>;
      if (customEvent.detail?.mode && customEvent.detail.mode !== theme) {
        setTheme(customEvent.detail.mode);
      }
    };
    window.addEventListener('app-theme-changed', handleThemeChanged);
    return () => window.removeEventListener('app-theme-changed', handleThemeChanged);
  }, [theme]);

  // Unified Transaction Actions
  const handleAddTransaction = (newTx: Omit<TransactionItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const item: TransactionItem = {
      ...newTx,
      id: 'tx-' + Date.now(),
      accountId: newTx.accountId || activeAccountId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    StorageService.addTransaction(item);
    setTransactions(prev => [item, ...prev]);
  };

  const handleQuickAddSave = (newTx: Omit<TransactionItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    handleAddTransaction({
      ...newTx,
      accountId: 'personal', // Strict Widget Isolation Guard
    });
    setQuickInputModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleExecuteTransfer = useCallback((params: {
    fromAccountId: string;
    toAccountId: string;
    amount: number;
    note?: string;
    date?: string;
    allTransactions: TransactionItem[];
  }) => {
    const res = transferFunds({
      ...params,
      allTransactions: transactions,
    });
    if (res.success && res.updatedTransactions) {
      setTransactions(res.updatedTransactions);
      StorageService.saveTransactions(res.updatedTransactions);
    }
    return res;
  }, [transferFunds, transactions]);

  const handleUpdateTransaction = (updated: TransactionItem) => {
    setTransactions(prev => prev.map(t => (t.id === updated.id ? updated : t)));
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => {
      const next = prev.filter(t => t.id !== id);
      StorageService.saveTransactions(next);
      return next;
    });
  };

  const handleDeleteTransactionsBatch = (ids: string[]) => {
    setTransactions(prev => {
      const next = prev.filter(t => !ids.includes(t.id));
      StorageService.saveTransactions(next);
      return next;
    });
  };

  // Unified Financial Plans Actions
  const handleCreatePlan = (
    newPlan: Omit<PlanItem, 'id' | 'createdAt' | 'updatedAt' | 'completedAt' | 'allocatedAmount' | 'isCompleted'> & {
      steps?: PlanStep[];
    }
  ) => {
    // Atomic plan creation with initial steps and automatic budget rollup integrity
    const item = financeStore.createPlan(newPlan);
    setPlans(prev => [item, ...prev.filter(p => p.id !== item.id)]);
  };

  const handleUpdatePlan = (updated: PlanItem) => {
    setPlans(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    if (detailPlan && detailPlan.id === updated.id) {
      setDetailPlan(updated);
    }
  };

  const handleDeletePlan = (planId: string) => {
    setPlans(prev => {
      const next = prev.filter(p => p.id !== planId);
      StorageService.savePlans(next);
      return next;
    });
    if (detailPlan && detailPlan.id === planId) {
      setDetailPlan(null);
    }
  };

  const handleDeletePlansBatch = (ids: string[]) => {
    setPlans(prev => {
      const next = prev.filter(p => !ids.includes(p.id));
      StorageService.savePlans(next);
      return next;
    });
    if (detailPlan && ids.includes(detailPlan.id)) {
      setDetailPlan(null);
    }
  };

  const handleToggleCompletePlan = (planId: string) => {
    setPlans(prev =>
      prev.map(p => {
        if (p.id === planId) {
          const nextCompleted = !p.isCompleted;
          const updated = {
            ...p,
            isCompleted: nextCompleted,
            completedAt: nextCompleted ? new Date().toISOString() : null,
            updatedAt: new Date().toISOString(),
          };
          if (detailPlan && detailPlan.id === planId) {
            setDetailPlan(updated);
          }
          return updated;
        }
        return p;
      })
    );
  };

  // Budget Actions
  const handleSaveBudget = (category: string, monthlyLimit: number) => {
    setBudgets(prev => {
      const existingIdx = prev.findIndex(b => b.category === category);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = { ...updated[existingIdx], monthlyLimit };
        return updated;
      } else {
        return [...prev, { id: 'b-' + Date.now(), category, monthlyLimit, createdAt: new Date().toISOString() }];
      }
    });
  };

  const handleDeleteBudget = (id: string) => {
    setBudgets(prev => prev.filter(b => b.id !== id));
  };

  // Category Actions
  const handleAddCategory = (name: string, type: 'income_source' | 'expense_category') => {
    if (!categories.some(c => c.name.toLowerCase() === name.toLowerCase() && c.type === type)) {
      setCategories(prev => [...prev, { id: 'cat-' + Date.now(), name, type, isDefault: false }]);
    }
  };

  const handleDeleteCategory = (name: string, type: 'income_source' | 'expense_category') => {
    setCategories(prev => prev.filter(c => !(c.name === name && c.type === type)));
  };

  const unallocatedBalance = FinancialEngine.unallocatedBalance(transactions, plans);

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E] transition-colors dark:bg-[#1C1C1E] dark:text-[#F2F2F7]">
      {/* Top Application Bar - Desktop & Preview Viewports */}
      <header className="hidden sm:block sticky top-0 z-40 border-b border-[#D1D1D6] bg-white/95 backdrop-blur-xl dark:border-[#38383A] dark:bg-[#1C1C1E]/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#007AFF] font-bold text-white shadow-md shadow-blue-500/25 text-xs">
              AK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-sm text-[#1C1C1E] dark:text-white leading-tight">
                  FinanceApp
                </h1>
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-[#007AFF] dark:bg-blue-950/40">
                  v2.1.0
                </span>
                <span className="text-[11px] text-[#8E8E93] hidden md:inline">
                  • Developer: Ahmed AL KUBAISI
                </span>
              </div>
              <div className="text-[10px] text-[#8E8E93]">
                {language === 'ar' ? 'إدارة الخطط المالية والميزانيات' : 'Financial Plans, Budgets & Simulator'}
              </div>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2.5">
            {/* Center Navigation Switcher */}
            <div className="flex items-center rounded-xl bg-[#E5E5EA] p-0.5 text-xs font-semibold dark:bg-[#2C2C2E]">
              <button
                onClick={() => setActiveMainView('simulator')}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition-all ${activeMainView === 'simulator' ? 'bg-white text-[#007AFF] shadow-sm dark:bg-[#1C1C1E] dark:text-blue-400' : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'}`}
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span>{language === 'ar' ? 'التطبيق' : 'App Preview'}</span>
              </button>
              <button
                onClick={() => setActiveMainView('code')}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition-all ${activeMainView === 'code' ? 'bg-white text-[#007AFF] shadow-sm dark:bg-[#1C1C1E] dark:text-blue-400' : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'}`}
              >
                <FileCode2 className="h-3.5 w-3.5" />
                <span>{language === 'ar' ? 'الكود' : 'Swift Code'}</span>
              </button>
              <button
                onClick={() => setActiveMainView('guide')}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition-all ${activeMainView === 'guide' ? 'bg-white text-[#007AFF] shadow-sm dark:bg-[#1C1C1E] dark:text-blue-400' : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'}`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>{language === 'ar' ? 'الدليل' : 'Deploy Guide'}</span>
              </button>
            </div>

            {/* Account Switcher Pill */}
            <button
              type="button"
              onClick={() => setIsAccountSwitcherOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E5E5EA] bg-white text-xs font-semibold text-[#1C1C1E] dark:border-[#38383A] dark:bg-[#2C2C2E] dark:text-white hover:border-[#007AFF] shadow-xs transition-colors"
            >
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: activeAccount.color || '#007AFF' }}
              />
              <span className="max-w-[120px] truncate">{activeAccount.name}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${isBusinessMode ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'}`}>
                {isBusinessMode ? (language === 'ar' ? 'أعمال' : 'Biz') : (language === 'ar' ? 'شخصي' : 'Pers')}
              </span>
              <ChevronDown className="h-3 w-3 text-[#8E8E93]" />
            </button>

            {/* Quick Transfer Button */}
            <button
              type="button"
              onClick={() => setIsTransferModalOpen(true)}
              title={language === 'ar' ? 'تحويل بين المحافظ' : 'Transfer Funds'}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-[#E5E5EA] bg-white text-xs font-semibold text-[#8E8E93] hover:text-[#007AFF] dark:border-[#38383A] dark:bg-[#2C2C2E] shadow-xs transition-colors"
            >
              <ArrowRightLeft className="h-3.5 w-3.5 text-[#007AFF]" />
              <span className="hidden md:inline">{language === 'ar' ? 'تحويل' : 'Transfer'}</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => {
                setAddInitialType('expense');
                setIsAddOpen(true);
              }}
              className="flex items-center gap-1 rounded-xl bg-[#007AFF] px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-[#0062CC] active:scale-95"
            >
              <span>+ {t.addTransaction}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="sm:py-6">
        {activeMainView === 'simulator' && (
          <div className="flex flex-col items-center justify-center sm:px-4">
            <IPhoneFrame
              activeTab={activeTab}
              onTabChange={tabIndex => setActiveTab(tabIndex)}
              theme={theme}
              tabsOverride={
                isBusinessMode
                  ? [
                      { id: 0, label: language === 'ar' ? 'الرئيسية' : 'Dashboard', icon: Building },
                      { id: 1, label: language === 'ar' ? 'الفواتير' : 'Invoices', icon: Receipt },
                      { id: 2, label: t.tabTransactions, icon: List },
                      { id: 3, label: t.tabAnalytics, icon: PieChart },
                      { id: 4, label: t.tabSettings, icon: Settings },
                    ]
                  : undefined
              }
              workspaceBar={
                <div className="px-3.5 pt-1 pb-2 flex items-center justify-between">
                  {/* Account Switcher Trigger */}
                  <button
                    type="button"
                    onClick={() => setIsAccountSwitcherOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#38383A] shadow-xs active:scale-95 transition-all text-xs font-bold"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: activeAccount.color || '#007AFF' }}
                    />
                    <span className="max-w-[130px] truncate text-[#1C1C1E] dark:text-white">
                      {activeAccount.name}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      isBusinessMode
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                    }`}>
                      {isBusinessMode ? (language === 'ar' ? 'أعمال' : 'Business') : (language === 'ar' ? 'شخصي' : 'Personal')}
                    </span>
                    <ChevronDown className="h-3 w-3 text-[#8E8E93]" />
                  </button>

                  {/* Inter-Account Transfer Quick Action */}
                  <button
                    type="button"
                    onClick={() => setIsTransferModalOpen(true)}
                    title={language === 'ar' ? 'تحويل بين المحافظ' : 'Transfer Funds'}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#38383A] shadow-xs hover:border-[#007AFF] text-[#8E8E93] hover:text-[#007AFF] active:scale-95 transition-all text-xs font-semibold"
                  >
                    <ArrowRightLeft className="h-3.5 w-3.5 text-[#007AFF]" />
                    <span className="text-[10px] font-bold text-[#1C1C1E] dark:text-white">
                      {language === 'ar' ? 'تحويل' : 'Transfer'}
                    </span>
                  </button>
                </div>
              }
            >
              {/* Tab 0: Dashboard (Personal or Business) */}
              {activeTab === 0 && (
                isBusinessMode ? (
                  <BusinessDashboardTab
                    account={activeAccount}
                    transactions={currentAccountTransactions}
                    invoices={invoices.filter(inv => inv.accountId === activeAccountId)}
                    metrics={businessMetrics}
                    onOpenAdd={type => {
                      setAddInitialType(type);
                      setIsAddOpen(true);
                    }}
                    onOpenTransfer={() => setIsTransferModalOpen(true)}
                    onNavigateTab={tabIndex => setActiveTab(tabIndex)}
                    onOpenInvoices={() => setActiveTab(1)}
                    onUpdateAllocatedBudget={(newBudget, mode, steps) => {
                      updateAllocatedBudget(activeAccountId, newBudget, mode, steps);
                    }}
                  />
                ) : (
                  <DashboardTab
                    transactions={currentAccountTransactions}
                    goals={plans}
                    onOpenAdd={() => {
                      setAddInitialType('expense');
                      setIsAddOpen(true);
                    }}
                    onNavigateTab={tabIndex => setActiveTab(tabIndex)}
                    onSelectGoal={plan => setDetailPlan(plan)}
                  />
                )
              )}

              {/* Tab 1: Financial Plans (Personal) or Business Invoices (Business) */}
              {activeTab === 1 && (
                isBusinessMode ? (
                  <BusinessSuiteTab
                    account={activeAccount}
                    transactions={currentAccountTransactions}
                    invoices={invoices.filter(inv => inv.accountId === activeAccountId)}
                    metrics={businessMetrics}
                    onAddInvoice={data => {
                      addInvoice(data, updatedTxs => {
                        setTransactions(updatedTxs);
                        StorageService.saveTransactions(updatedTxs);
                      });
                    }}
                    onUpdateInvoice={inv => {
                      updateInvoice(inv, updatedTxs => {
                        setTransactions(updatedTxs);
                        StorageService.saveTransactions(updatedTxs);
                      });
                    }}
                    onUpdateInvoiceStatus={(id, status) => {
                      updateInvoiceStatus(id, status, updatedTxs => {
                        setTransactions(updatedTxs);
                        StorageService.saveTransactions(updatedTxs);
                      });
                    }}
                    onDeleteInvoice={id => {
                      deleteInvoice(id, updatedTxs => {
                        setTransactions(updatedTxs);
                        StorageService.saveTransactions(updatedTxs);
                      });
                    }}
                    onMarkInvoicePaid={id => {
                      markInvoicePaid(id, updatedTxs => {
                        setTransactions(updatedTxs);
                        StorageService.saveTransactions(updatedTxs);
                      });
                    }}
                    onNavigateTab={tabIndex => setActiveTab(tabIndex)}
                  />
                ) : (
                  <PlansTab
                    goals={plans}
                    transactions={currentAccountTransactions}
                    initialSubTab={plansSubTab}
                    onOpenCreateGoal={() => setIsCreatePlanOpen(true)}
                    onOpenAllocate={(plan, stepId) => {
                      setAllocatingPlan(plan);
                      setAllocatingStepId(stepId);
                    }}
                    onOpenDetail={plan => setDetailPlan(plan)}
                    onDeletePlan={handleDeletePlan}
                    onDeletePlansBatch={handleDeletePlansBatch}
                    onNavigateTab={tabIndex => setActiveTab(tabIndex)}
                  />
                )
              )}

              {/* Tab 2: Transactions */}
              {activeTab === 2 && (
                <TransactionsTab
                  transactions={currentAccountTransactions}
                  onOpenAdd={() => setIsAddOpen(true)}
                  onEditTransaction={item => setEditingTransaction(item)}
                  onDeleteTransaction={id => handleDeleteTransaction(id)}
                  onDeleteTransactionsBatch={handleDeleteTransactionsBatch}
                />
              )}

              {/* Tab 3: Analytics / Budgets */}
              {activeTab === 3 && (
                <AnalyticsTab transactions={currentAccountTransactions} />
              )}

              {/* Tab 4: Settings */}
              {activeTab === 4 && (
                <SettingsTab
                  transactions={currentAccountTransactions}
                  goals={plans}
                  budgets={budgets}
                  categories={categories}
                  biometricsEnabled={biometricsEnabled}
                  onToggleBiometrics={enabled => setBiometricsEnabled(enabled)}
                  onOpenBudgets={() => setIsBudgetsOpen(true)}
                  onAddCategory={handleAddCategory}
                  onDeleteCategory={handleDeleteCategory}
                  theme={theme}
                  onChangeTheme={t => {
                    setTheme(t);
                    applyTheme(t);
                  }}
                  onTriggerFaceID={() => setIsFaceIDOpen(true)}
                  onOpenAccountSwitcher={() => setIsAccountSwitcherOpen(true)}
                  activeAccountName={activeAccount.name}
                  accountCount={accounts.length}
                />
              )}
            </IPhoneFrame>
          </div>
        )}

        {activeMainView === 'code' && <CodeExplorer />}

        {activeMainView === 'guide' && <DeployGuide />}
      </main>

      {/* Sheets & Dialogs */}
      {isAddOpen && (
        <AddTransactionSheet
          categories={categories}
          initialType={addInitialType}
          accounts={accounts}
          activeAccountId={activeAccountId}
          onClose={() => setIsAddOpen(false)}
          onSave={handleAddTransaction}
          onAddCategory={handleAddCategory}
        />
      )}

      {editingTransaction && (
        <EditTransactionSheet
          transaction={editingTransaction}
          categories={categories}
          onClose={() => setEditingTransaction(null)}
          onSave={handleUpdateTransaction}
          onDelete={handleDeleteTransaction}
        />
      )}

      {allocatingPlan && (
        <ErrorBoundary fallbackTitle="Error loading Allocate Funds">
          <AllocatePlanSheet
            plan={allocatingPlan}
            goal={allocatingPlan}
            initialStepId={allocatingStepId}
            unallocatedBalance={unallocatedBalance}
            onClose={() => {
              setAllocatingPlan(null);
              setAllocatingStepId(undefined);
            }}
            onUpdatePlan={handleUpdatePlan}
            onUpdateGoal={handleUpdatePlan}
          />
        </ErrorBoundary>
      )}

      {isCreatePlanOpen && (
        <CreatePlanSheet
          onClose={() => setIsCreatePlanOpen(false)}
          onCreate={handleCreatePlan}
        />
      )}

      {detailPlan && (
        <PlanDetailSheet
          goal={detailPlan}
          plan={detailPlan}
          transactions={transactions}
          allGoals={plans}
          allPlans={plans}
          onClose={() => setDetailPlan(null)}
          onOpenAllocate={(stepId) => {
            setAllocatingPlan(detailPlan);
            setAllocatingStepId(stepId);
            setDetailPlan(null);
          }}
          onToggleComplete={() => handleToggleCompletePlan(detailPlan.id)}
          onDeleteGoal={() => handleDeletePlan(detailPlan.id)}
          onDeletePlan={() => handleDeletePlan(detailPlan.id)}
          onUpdatePlan={handleUpdatePlan}
        />
      )}

      {isBudgetsOpen && (
        <BudgetsModal
          budgets={budgets}
          transactions={transactions}
          categories={categories}
          onClose={() => setIsBudgetsOpen(false)}
          onSaveBudget={handleSaveBudget}
          onDeleteBudget={handleDeleteBudget}
        />
      )}

      <FaceIDModal
        isOpen={isFaceIDOpen}
        onSuccess={() => setIsFaceIDOpen(false)}
        onCancel={() => setIsFaceIDOpen(false)}
      />

      {/* Floating Popup Window for Widget Quick Add */}
      <QuickAddPopup
        isOpen={quickInputModal.isOpen}
        initialType={quickInputModal.type}
        categories={categories}
        onClose={() => setQuickInputModal(prev => ({ ...prev, isOpen: false }))}
        onSave={handleQuickAddSave}
      />

      {/* Multi-Entity Account Switcher Modal */}
      <AccountSwitcherModal
        isOpen={isAccountSwitcherOpen}
        onClose={() => setIsAccountSwitcherOpen(false)}
        accounts={accounts}
        activeAccountId={activeAccountId}
        transactions={transactions}
        onSelectAccount={id => {
          setActiveAccount(id);
          setActiveTab(0);
        }}
        onCreateAccount={createBusinessAccount}
        onUpdateAccount={updateAccount}
        onDeleteAccount={deleteAccount}
        onOpenTransfer={() => setIsTransferModalOpen(true)}
      />

      {/* Inter-Account Transfer Modal */}
      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        accounts={accounts}
        activeAccountId={activeAccountId}
        transactions={transactions}
        onExecuteTransfer={handleExecuteTransfer}
      />
    </div>
  );
}

export default function App() {
  const ctx = React.useContext(I18nContext);
  if (ctx && ctx !== defaultI18nContext) {
    return <FinanceAppMain />;
  }

  return (
    <I18nProvider>
      <FinanceAppMain />
    </I18nProvider>
  );
}
