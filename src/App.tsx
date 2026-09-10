import React, { useState, useEffect, useCallback } from 'react';
// FinanceApp - Personal Finance Management
// Developer: Ahmed AL KUBAISI (ahmed.mjabbar95@gmail.com)
// Architecture: Native iOS SwiftUI & SwiftData Architecture + PWA / Capacitor
import { TransactionItem, PlanItem, BudgetItem, CategoryItem } from './types/finance';
import { StorageService } from './services/storage';
import { IPhoneFrame } from './components/simulator/IPhoneFrame';
import { DashboardTab } from './components/simulator/tabs/DashboardTab';
import { TransactionsTab } from './components/simulator/tabs/TransactionsTab';
import { AnalyticsTab } from './components/simulator/tabs/AnalyticsTab';
import { PlansTab } from './components/simulator/tabs/PlansTab';
import { SettingsTab } from './components/simulator/tabs/SettingsTab';
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
import { Smartphone, FileCode2, BookOpen, ShieldCheck } from 'lucide-react';
import { useI18n, I18nProvider, I18nContext, defaultI18nContext } from './context/I18nContext';
import { WidgetBridge, syncWidgetData as syncWidgetBridgeLegacy, updateWidgetData } from './services/widgetBridge';
import { syncWidgetData, exitAppToHome } from './utils/widgetSync';
import { DeepLinkService } from './services/deepLinkService';

function FinanceAppMain() {
  const { t, language } = useI18n();
  // Top-level active view
  const [activeMainView, setActiveMainView] = useState<'simulator' | 'code' | 'guide'>('simulator');

  // Simulator state: 5 Native iOS Tabs (0: Dashboard, 1: Plans, 2: Transactions, 3: Analytics, 4: Settings)
  const [activeTab, setActiveTab] = useState<number>(0);
  const [plansSubTab, setPlansSubTab] = useState<'dashboard' | 'plans' | 'whatif'>('dashboard');
  const [transactions, setTransactions] = useState<TransactionItem[]>(() => StorageService.loadTransactions());
  const [plans, setPlans] = useState<PlanItem[]>(() => StorageService.loadPlans());
  const [budgets, setBudgets] = useState<BudgetItem[]>(() => StorageService.loadBudgets());
  const [categories, setCategories] = useState<CategoryItem[]>(() => StorageService.loadCategories());
  const [biometricsEnabled, setBiometricsEnabled] = useState<boolean>(() => StorageService.getBiometrics());
  const [theme, setTheme] = useState<string>(() => StorageService.getTheme());

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
  const [detailPlan, setDetailPlan] = useState<PlanItem | null>(null);
  const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false);
  const [isBudgetsOpen, setIsBudgetsOpen] = useState(false);
  const [isFaceIDOpen, setIsFaceIDOpen] = useState(false);

  // Reconcile pending transactions logged via Home Screen AppIntents
  const reconcileWidgetTransactions = useCallback(async () => {
    try {
      const pending = await WidgetBridge.flushPendingTransactions();
      if (pending && pending.length > 0) {
        const newItems: TransactionItem[] = pending.map((p, idx) => ({
          id: p.id || `tx-intent-${Date.now()}-${idx}`,
          amount: Math.abs(Number(p.amount)) || 0,
          currency: 'IQD',
          type: p.type === 'income' ? 'income' : 'expense',
          category: p.category || (p.type === 'income' ? 'Salary' : 'Other'),
          source: p.type === 'income' ? p.category || 'Salary' : '',
          itemDescription: p.note || (p.type === 'income' ? 'Quick Income' : 'Quick Expense'),
          notes: p.note ? `${p.note} (via iOS Widget Intent)` : 'Logged via iOS Home Screen Widget Intent',
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

  // Sync with App Group UserDefaults / localStorage for iOS Home Screen Widgets
  useEffect(() => {
    const totalBalance = FinancialEngine.actualBalance(transactions);
    const unallocated = FinancialEngine.unallocatedBalance(transactions, plans);
    const avgSavings = FinancialEngine.historicalMonthlyAverageSavings(transactions);

    const priorityOrder: Record<string, number> = { essential: 4, high: 3, medium: 2, low: 1 };
    const activePlans = plans.filter(p => !p.isCompleted);
    const priorityPlan = activePlans.sort((a, b) => (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0))[0] || plans[0];
    const priorityPlanName = priorityPlan ? priorityPlan.name : 'No Active Plan';
    const planTarget = priorityPlan?.targetAmount || 0;
    const planAllocated = priorityPlan?.allocatedAmount || 0;
    const priorityPlanProgress = planTarget > 0 ? Math.min(1.0, Math.max(0.0, planAllocated / planTarget)) : 0.0;

    syncWidgetData(totalBalance, unallocated, priorityPlanName, priorityPlanProgress);
    WidgetBridge.syncData(transactions, plans, unallocated, avgSavings, language);
    syncWidgetBridgeLegacy(totalBalance, unallocated, plans);
  }, [transactions, plans, language]);

  // Listen for Capacitor appUrlOpen native deep link event
  useEffect(() => {
    let removeListener: (() => void) | undefined;
    import('@capacitor/app')
      .then(({ App: CapApp }) => {
        const handleCapUrl = (urlStr: string) => {
          if (!urlStr) return;
          if (
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
        setAddInitialType('expense');
        setIsAddOpen(true);
      } else if (action.type === 'add-income') {
        setActiveMainView('simulator');
        setAddInitialType('income');
        setIsAddOpen(true);
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
    StorageService.setTheme(theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  // Unified Transaction Actions
  const handleAddTransaction = (newTx: Omit<TransactionItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const item: TransactionItem = {
      ...newTx,
      id: 'tx-' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTransactions(prev => [item, ...prev]);
  };

  const handleQuickAddSave = async (newTx: Omit<TransactionItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    handleAddTransaction(newTx);
    const updated: TransactionItem[] = [
      {
        ...newTx,
        id: 'tx-' + Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      ...transactions,
    ];
    const totalBalance = FinancialEngine.actualBalance(updated);
    const unallocated = FinancialEngine.unallocatedBalance(updated, plans);
    const avgSavings = FinancialEngine.historicalMonthlyAverageSavings(updated);

    const priorityOrder: Record<string, number> = { essential: 4, high: 3, medium: 2, low: 1 };
    const activePlans = plans.filter(p => !p.isCompleted);
    const priorityPlan = activePlans.sort((a, b) => (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0))[0] || plans[0];
    const priorityPlanName = priorityPlan ? priorityPlan.name : 'No Active Plan';
    const planTarget = priorityPlan?.targetAmount || 0;
    const planAllocated = priorityPlan?.allocatedAmount || 0;
    const priorityPlanProgress = planTarget > 0 ? Math.min(1.0, Math.max(0.0, planAllocated / planTarget)) : 0.0;

    await syncWidgetData(totalBalance, unallocated, priorityPlanName, priorityPlanProgress);
    WidgetBridge.syncData(updated, plans, unallocated, avgSavings, language);
    await syncWidgetBridgeLegacy(totalBalance, unallocated, plans);
    setQuickInputModal(prev => ({ ...prev, isOpen: false }));
  };

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
    newPlan: Omit<PlanItem, 'id' | 'createdAt' | 'updatedAt' | 'completedAt' | 'allocatedAmount' | 'isCompleted'>
  ) => {
    const item: PlanItem = {
      ...newPlan,
      id: 'plan-' + Date.now(),
      allocatedAmount: 0,
      isCompleted: false,
      completedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPlans(prev => [item, ...prev]);
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
          return {
            ...p,
            isCompleted: nextCompleted,
            completedAt: nextCompleted ? new Date().toISOString() : null,
            updatedAt: new Date().toISOString(),
          };
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
            >
              {/* Tab 0: Dashboard */}
              {activeTab === 0 && (
                <DashboardTab
                  transactions={transactions}
                  goals={plans}
                  onOpenAdd={() => {
                    setAddInitialType('expense');
                    setIsAddOpen(true);
                  }}
                  onNavigateTab={tabIndex => setActiveTab(tabIndex)}
                  onSelectGoal={plan => setDetailPlan(plan)}
                />
              )}

              {/* Tab 1: Financial Plans (3 Sub-Views: Plans Dashboard, My Plans, What-If Simulator) */}
              {activeTab === 1 && (
                <PlansTab
                  goals={plans}
                  transactions={transactions}
                  initialSubTab={plansSubTab}
                  onOpenCreateGoal={() => setIsCreatePlanOpen(true)}
                  onOpenAllocate={plan => setAllocatingPlan(plan)}
                  onOpenDetail={plan => setDetailPlan(plan)}
                  onDeletePlan={handleDeletePlan}
                  onDeletePlansBatch={handleDeletePlansBatch}
                  onNavigateTab={tabIndex => setActiveTab(tabIndex)}
                />
              )}

              {/* Tab 2: Transactions */}
              {activeTab === 2 && (
                <TransactionsTab
                  transactions={transactions}
                  onOpenAdd={() => setIsAddOpen(true)}
                  onEditTransaction={item => setEditingTransaction(item)}
                  onDeleteTransaction={id => handleDeleteTransaction(id)}
                  onDeleteTransactionsBatch={handleDeleteTransactionsBatch}
                />
              )}

              {/* Tab 3: Analytics / Budgets */}
              {activeTab === 3 && (
                <AnalyticsTab transactions={transactions} />
              )}

              {/* Tab 4: Settings (Arabic / English Language Toggle & Developer Credits) */}
              {activeTab === 4 && (
                <SettingsTab
                  transactions={transactions}
                  goals={plans}
                  budgets={budgets}
                  categories={categories}
                  biometricsEnabled={biometricsEnabled}
                  onToggleBiometrics={enabled => setBiometricsEnabled(enabled)}
                  onOpenBudgets={() => setIsBudgetsOpen(true)}
                  onAddCategory={handleAddCategory}
                  onDeleteCategory={handleDeleteCategory}
                  theme={theme}
                  onChangeTheme={t => setTheme(t)}
                  onTriggerFaceID={() => setIsFaceIDOpen(true)}
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
            unallocatedBalance={unallocatedBalance}
            onClose={() => setAllocatingPlan(null)}
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
          onOpenAllocate={() => {
            setAllocatingPlan(detailPlan);
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
      {(() => {
        const curBalance = FinancialEngine.actualBalance(transactions);
        const curUnallocated = FinancialEngine.unallocatedBalance(transactions, plans);
        const priorityOrder: Record<string, number> = { essential: 4, high: 3, medium: 2, low: 1 };
        const activePlans = plans.filter(p => !p.isCompleted);
        const priorityPlan = activePlans.sort((a, b) => (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0))[0] || plans[0];
        const planName = priorityPlan ? priorityPlan.name : 'No Active Plan';
        const planTarget = priorityPlan?.targetAmount || 0;
        const planAllocated = priorityPlan?.allocatedAmount || 0;
        const planProgress = planTarget > 0 ? Math.min(1.0, Math.max(0.0, planAllocated / planTarget)) : 0.0;

        return (
          <QuickAddPopup
            isOpen={quickInputModal.isOpen}
            initialType={quickInputModal.type}
            categories={categories}
            currentBalance={curBalance}
            currentUnallocated={curUnallocated}
            priorityPlanName={planName}
            priorityPlanProgress={planProgress}
            onClose={() => setQuickInputModal(prev => ({ ...prev, isOpen: false }))}
            onSave={handleQuickAddSave}
          />
        );
      })()}
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
