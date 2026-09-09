import React, { useState, useEffect, useMemo } from 'react';
import { PlanItem, TransactionItem, PlanPriority } from '../../../types/finance';
import { FinancialEngine } from '../../../services/financialEngine';
import {
  Target,
  Plus,
  CheckCircle2,
  ChevronRight,
  Coins,
  Wallet,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Award,
  Layers,
  SlidersHorizontal,
  Calendar,
  Clock,
  ShieldAlert,
  ArrowRight,
  Trash2,
  CheckSquare,
  Square,
  Check,
  X,
} from 'lucide-react';
import { useI18n } from '../../../context/I18nContext';
import { PlanCardItem } from '../plans/PlanCardItem';
import { WhatIfSimulatorView } from '../plans/WhatIfSimulatorView';
import { PlansGanttScheduleCard } from '../plans/PlansGanttScheduleCard';

interface PlansTabProps {
  goals: PlanItem[];
  transactions: TransactionItem[];
  onOpenCreateGoal: () => void;
  onOpenAllocate: (plan: PlanItem) => void;
  onOpenDetail: (plan: PlanItem) => void;
  onDeletePlan?: (id: string) => void;
  onDeletePlansBatch?: (ids: string[]) => void;
  initialSubTab?: 'dashboard' | 'plans' | 'whatif';
  onNavigateTab?: (tabIndex: number) => void;
}

export const PlansTab: React.FC<PlansTabProps> = ({
  goals: plans,
  transactions,
  onOpenCreateGoal,
  onOpenAllocate,
  onOpenDetail,
  onDeletePlan,
  onDeletePlansBatch,
  initialSubTab = 'dashboard',
  onNavigateTab,
}) => {
  const { t, language, formatCurrency } = useI18n();
  const [subTab, setSubTab] = useState<'dashboard' | 'plans' | 'whatif'>(initialSubTab);
  const [confirmDeletePlan, setConfirmDeletePlan] = useState<PlanItem | null>(null);

  // Batch selection state for plans
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [confirmBulkDelete, setConfirmBulkDelete] = useState(false);

  useEffect(() => {
    if (initialSubTab) {
      setSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  const activePlans = useMemo(() => plans.filter(p => !p.isCompleted), [plans]);
  const completedPlans = useMemo(() => plans.filter(p => p.isCompleted), [plans]);

  const unallocatedBalance = useMemo(
    () => FinancialEngine.unallocatedBalance(transactions, plans),
    [transactions, plans]
  );
  const avgSavings = useMemo(
    () => FinancialEngine.historicalMonthlyAverageSavings(transactions),
    [transactions]
  );
  const capacityAnalysis = useMemo(
    () => FinancialEngine.analyzeFinancialCapacity(transactions, plans),
    [transactions, plans]
  );

  const priorityBadges: Record<PlanPriority, { labelEn: string; labelAr: string; color: string; badge: string }> = {
    critical: {
      labelEn: 'Critical',
      labelAr: 'حرجة',
      color: 'text-rose-600 dark:text-rose-400',
      badge: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300',
    },
    high: {
      labelEn: 'High',
      labelAr: 'عالية',
      color: 'text-amber-600 dark:text-amber-400',
      badge: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300',
    },
    medium: {
      labelEn: 'Medium',
      labelAr: 'متوسطة',
      color: 'text-blue-600 dark:text-blue-400',
      badge: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300',
    },
    low: {
      labelEn: 'Low',
      labelAr: 'منخفضة',
      color: 'text-gray-600 dark:text-gray-400',
      badge: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-300',
    },
  };

  // Batch selection helpers
  const handleToggleSelectPlan = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleLongPressSelectPlan = (id: string) => {
    if (!isSelectMode) {
      setIsSelectMode(true);
      setSelectedIds(new Set([id]));
    } else {
      handleToggleSelectPlan(id);
    }
  };

  const areAllPlansSelected = plans.length > 0 && plans.every(p => selectedIds.has(p.id));
  const handleToggleSelectAllPlans = () => {
    if (areAllPlansSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(plans.map(p => p.id)));
    }
  };

  const handleExitSelectMode = () => {
    setIsSelectMode(false);
    setSelectedIds(new Set());
  };

  const handleExecuteBulkDeletePlans = () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;

    if (onDeletePlansBatch) {
      onDeletePlansBatch(ids);
    } else if (onDeletePlan) {
      ids.forEach(id => onDeletePlan(id));
    }

    setConfirmBulkDelete(false);
    handleExitSelectMode();
  };

  return (
    <div id="plans-tab-view" className="space-y-4 px-4 pt-2 pb-24 text-[#1C1C1E] dark:text-[#F2F2F7]">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest">
            {subTab === 'dashboard' ? t.financialPositionTitle : subTab === 'whatif' ? t.whatIfTab : t.targetsHeading}
          </span>
          <h2 className="text-xl font-bold tracking-tight text-[#1C1C1E] dark:text-white">
            {subTab === 'dashboard' ? t.plansDashboardTab : subTab === 'whatif' ? t.whatIfTitle : t.plansTitle}
          </h2>
        </div>
        <button
          onClick={onOpenCreateGoal}
          className="flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-[#007AFF] text-white shadow-md shadow-blue-500/25 hover:bg-[#0062CC] transition-colors"
          title={t.createPlan}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Sub-navigation Switcher */}
      <div className="flex rounded-2xl bg-[#E5E5EA] p-1 text-xs font-bold dark:bg-[#2C2C2E]">
        <button
          onClick={() => setSubTab('dashboard')}
          className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 transition-all ${
            subTab === 'dashboard'
              ? 'bg-white text-[#007AFF] shadow-sm dark:bg-[#1C1C1E] dark:text-blue-400'
              : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>{t.plansDashboardTab}</span>
        </button>
        <button
          onClick={() => setSubTab('plans')}
          className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 transition-all ${
            subTab === 'plans'
              ? 'bg-white text-[#007AFF] shadow-sm dark:bg-[#1C1C1E] dark:text-blue-400'
              : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
          }`}
        >
          <Target className="h-3.5 w-3.5" />
          <span>{t.allPlansTab} ({activePlans.length})</span>
        </button>
        <button
          onClick={() => setSubTab('whatif')}
          className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 transition-all ${
            subTab === 'whatif'
              ? 'bg-white text-[#007AFF] shadow-sm dark:bg-[#1C1C1E] dark:text-blue-400'
              : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
          }`}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>{t.whatIfTab}</span>
        </button>
      </div>

      {/* VIEW 1: DEDICATED PLANS DASHBOARD */}
      {subTab === 'dashboard' && (
        <div className="space-y-3.5 animate-in fade-in duration-200">
          {/* Monthly Capacity & Position Card */}
          <div className="rounded-[28px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
                {t.financialPositionTitle}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${
                  capacityAnalysis.healthStatus === 'healthy'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : capacityAnalysis.healthStatus === 'tight'
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                    : 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                }`}
              >
                {capacityAnalysis.healthStatus === 'healthy'
                  ? t.healthHealthy
                  : capacityAnalysis.healthStatus === 'tight'
                  ? t.healthTight
                  : t.healthOvercommitted}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#F2F2F7] p-3 dark:bg-[#1C1C1E]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
                  {t.monthlyCapacityLabel}
                </span>
                <p className="mt-1 font-black text-lg text-[#34C759]">
                  {formatCurrency(capacityAnalysis.monthlyCapacity)}
                </p>
                <span className="text-[10px] text-[#8E8E93]">
                  {language === 'ar' ? 'صافي تدفق الشهر' : 'Net monthly cashflow'}
                </span>
              </div>

              <div className="rounded-2xl bg-[#F2F2F7] p-3 dark:bg-[#1C1C1E]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
                  {t.totalPlannedMonthlyLabel}
                </span>
                <p className="mt-1 font-black text-lg text-[#007AFF]">
                  {formatCurrency(capacityAnalysis.totalPlannedMonthlyCommitment)}
                </p>
                <span className="text-[10px] text-[#8E8E93]">
                  {activePlans.length} {language === 'ar' ? 'خطط نشطة' : 'active plans'}
                </span>
              </div>
            </div>

            {/* Capacity Variance Indicator */}
            <div className="flex items-center justify-between rounded-xl bg-[#F2F2F7] px-3.5 py-2.5 dark:bg-[#1C1C1E]">
              <span className="text-xs font-semibold text-[#8E8E93]">
                {capacityAnalysis.capacityVariance >= 0 ? t.capacitySurplus : t.capacityDeficit}
              </span>
              <span
                className={`text-sm font-black ${
                  capacityAnalysis.capacityVariance >= 0 ? 'text-[#34C759]' : 'text-[#FF3B30]'
                }`}
              >
                {capacityAnalysis.capacityVariance >= 0 ? '+' : ''}
                {formatCurrency(capacityAnalysis.capacityVariance)}
              </span>
            </div>
          </div>

          {/* Overall Portfolio Progress Card */}
          <div className="rounded-[28px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
                {language === 'ar' ? 'إجمالي التقدم في جميع الخطط' : 'Total Portfolio Progress'}
              </span>
              <span className="text-sm font-black text-[#007AFF]">
                {capacityAnalysis.overallProgressPercent}%
              </span>
            </div>

            <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#E5E5EA] dark:bg-[#38383A]">
              <div
                className="h-full rounded-full bg-[#007AFF] transition-all duration-500"
                style={{ width: `${capacityAnalysis.overallProgressPercent}%` }}
              />
            </div>

            <div className="flex justify-between text-xs font-semibold text-[#8E8E93]">
              <span>{t.allocatedProgress}: <strong className="text-[#1C1C1E] dark:text-white">{formatCurrency(capacityAnalysis.totalAllocatedAmount)}</strong></span>
              <span>{t.targetAmount}: <strong className="text-[#1C1C1E] dark:text-white">{formatCurrency(capacityAnalysis.totalTargetAmount)}</strong></span>
            </div>
          </div>

          {/* Plans Schedule / Timeline (Gantt Chart Card) */}
          <PlansGanttScheduleCard
            plans={plans}
            unallocatedBalance={unallocatedBalance}
            monthlyCapacity={capacityAnalysis.monthlyCapacity}
            onOpenDetail={onOpenDetail}
            onOpenAllocate={onOpenAllocate}
          />

          {/* Priority Distribution Breakdown */}
          <div className="rounded-[28px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
              {language === 'ar' ? 'توزيع الخطط حسب الأولوية' : 'Plans Priority Distribution'}
            </span>

            <div className="grid grid-cols-2 gap-2.5">
              {(['critical', 'high', 'medium', 'low'] as PlanPriority[]).map(pri => {
                const item = capacityAnalysis.priorityDistribution[pri];
                const badgeInfo = priorityBadges[pri];
                return (
                  <div key={pri} className="rounded-2xl border border-[#E5E5EA] bg-[#F2F2F7] p-3 dark:border-[#3A3A3C] dark:bg-[#1C1C1E]">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${badgeInfo.badge}`}>
                        {language === 'ar' ? badgeInfo.labelAr : badgeInfo.labelEn}
                      </span>
                      <span className="text-xs font-black text-[#1C1C1E] dark:text-white">
                        {item.count}
                      </span>
                    </div>
                    <div className="mt-2 text-xs font-bold text-[#1C1C1E] dark:text-white">
                      {formatCurrency(item.allocated)} / {formatCurrency(item.target)}
                    </div>
                    <div className="text-[10px] text-[#8E8E93]">
                      {t.plannedMonthlyRate}: {formatCurrency(item.plannedMonthly)}/mo
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Center & Recommendations */}
          <div className="rounded-[28px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#007AFF]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1C1E] dark:text-white">
                {t.actionCenterTitle}
              </h3>
            </div>

            {capacityAnalysis.actionItems.length === 0 ? (
              <p className="text-xs text-[#8E8E93]">
                {language === 'ar' ? 'كل الخطط المالية تسير على ما يرام وبانتظام ممتاز.' : 'All financial plans are progressing smoothly.'}
              </p>
            ) : (
              <div className="space-y-2.5">
                {capacityAnalysis.actionItems.map(item => (
                  <div
                    key={item.id}
                    className={`rounded-2xl p-3 border text-xs ${
                      item.type === 'critical'
                        ? 'bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-950/40 dark:border-rose-900/50 dark:text-rose-200'
                        : item.type === 'warning'
                        ? 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-900/50 dark:text-amber-200'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-900/50 dark:text-emerald-200'
                    }`}
                  >
                    <div className="font-bold mb-1 flex items-center gap-1.5">
                      {item.type === 'critical' && <ShieldAlert className="h-4 w-4 text-rose-600 shrink-0" />}
                      {item.type === 'warning' && <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />}
                      {item.type === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />}
                      <span>{item.title}</span>
                    </div>
                    <p className="leading-relaxed opacity-90">{item.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: ALL PLANS LIST & CARDS */}
      {subTab === 'plans' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Available to Allocate Banner */}
          <div className="flex items-center justify-between rounded-[24px] bg-white p-4 border border-[#E5E5EA] shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
                {t.availableToAllocate}
              </div>
              <div className="mt-0.5 font-black text-xl text-[#34C759]">
                {formatCurrency(unallocatedBalance)}
              </div>
            </div>
            <div className="rounded-xl bg-green-50 p-2.5 text-[#34C759] dark:bg-green-950/40">
              <Wallet className="h-5 w-5" />
            </div>
          </div>

          {/* Active Plans Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
                {t.activePlansSection} ({activePlans.length})
              </h3>

              {plans.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    if (isSelectMode) {
                      handleExitSelectMode();
                    } else {
                      setIsSelectMode(true);
                    }
                  }}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-sm transition-all ${
                    isSelectMode
                      ? 'bg-[#007AFF] text-white hover:bg-[#0062CC]'
                      : 'border border-[#E5E5EA] bg-white text-[#3A3A3C] hover:bg-[#F2F2F7] dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white'
                  }`}
                >
                  <CheckSquare className="h-3.5 w-3.5" />
                  <span>
                    {isSelectMode
                      ? (language === 'ar' ? 'إلغاء' : 'Done')
                      : (language === 'ar' ? 'تحديد' : 'Select')}
                  </span>
                </button>
              )}
            </div>

            {/* Multi-Select Action Bar (Active in Select Mode) */}
            {isSelectMode && (
              <div className="flex items-center justify-between rounded-2xl border border-blue-200 bg-blue-50/80 px-3.5 py-2.5 dark:border-blue-900/60 dark:bg-blue-950/40 shadow-sm animate-in fade-in duration-150">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleToggleSelectAllPlans}
                    className="flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-[#007AFF] shadow-sm hover:bg-blue-50 dark:bg-[#1C1C1E] dark:text-blue-300"
                  >
                    {areAllPlansSelected ? (
                      <>
                        <CheckSquare className="h-3.5 w-3.5" />
                        {language === 'ar' ? 'إلغاء تحديد الكل' : 'Deselect All'}
                      </>
                    ) : (
                      <>
                        <Square className="h-3.5 w-3.5" />
                        {language === 'ar' ? 'تحديد الكل' : 'Select All'}
                      </>
                    )}
                  </button>
                  <span className="text-xs font-bold text-[#1C1C1E] dark:text-white">
                    {selectedIds.size} {language === 'ar' ? 'محدد' : 'selected'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={selectedIds.size === 0}
                    onClick={() => setConfirmBulkDelete(true)}
                    className="flex items-center gap-1.5 rounded-xl bg-[#FF3B30] px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>
                      {language === 'ar' ? 'حذف المحدد' : 'Delete Selected'}
                      {selectedIds.size > 0 && ` (${selectedIds.size})`}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleExitSelectMode}
                    className="rounded-full p-1 text-[#8E8E93] hover:bg-white/50 dark:hover:bg-[#1C1C1E] transition-colors"
                    title={t.cancel}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {activePlans.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-[#D1D1D6] p-8 text-center text-xs text-[#8E8E93] dark:border-[#3A3A3C] bg-white dark:bg-[#2C2C2E]">
                <Target className="mx-auto mb-2 h-8 w-8 text-[#8E8E93]" />
                <p className="font-bold text-sm text-[#1C1C1E] dark:text-white">{t.noActivePlans}</p>
                <p className="mt-1 text-[#8E8E93]">{t.noActivePlansDesc}</p>
                <button
                  onClick={onOpenCreateGoal}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-[#007AFF] px-4 py-2 font-semibold text-xs text-white shadow-md shadow-blue-500/25 hover:bg-[#0062CC]"
                >
                  <Plus className="h-3.5 w-3.5" /> {t.createPlan}
                </button>
              </div>
            ) : (
              activePlans.map(plan => (
                <PlanCardItem
                  key={plan.id}
                  plan={plan}
                  unallocatedBalance={unallocatedBalance}
                  avgSavings={avgSavings}
                  monthlyCapacity={capacityAnalysis.monthlyCapacity}
                  priorityBadges={priorityBadges}
                  onOpenDetail={onOpenDetail}
                  onOpenAllocate={onOpenAllocate}
                  onRequestDelete={p => setConfirmDeletePlan(p)}
                  isSelectMode={isSelectMode}
                  isSelected={selectedIds.has(plan.id)}
                  onToggleSelect={() => handleToggleSelectPlan(plan.id)}
                  onLongPressSelect={() => handleLongPressSelectPlan(plan.id)}
                />
              ))
            )}
          </div>

          {/* Completed Plans Section */}
          {completedPlans.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
                  {t.completedPlansSection} ({completedPlans.length})
                </h3>
              </div>

              <div className="space-y-2">
                {completedPlans.map(plan => {
                  const isSelected = selectedIds.has(plan.id);
                  return (
                    <div
                      key={plan.id}
                      onClick={() => {
                        if (isSelectMode) {
                          handleToggleSelectPlan(plan.id);
                        } else {
                          onOpenDetail(plan);
                        }
                      }}
                      className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 transition-all ${
                        isSelected
                          ? 'border-[#007AFF] bg-blue-50/60 dark:bg-blue-950/30'
                          : 'border-[#E5E5EA] bg-white opacity-80 hover:opacity-100 dark:border-[#3A3A3C] dark:bg-[#2C2C2E]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isSelectMode ? (
                          <div
                            onClick={e => {
                              e.stopPropagation();
                              handleToggleSelectPlan(plan.id);
                            }}
                            className="p-0.5"
                          >
                            {isSelected ? (
                              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#007AFF] text-white shadow-sm">
                                <Check className="h-3.5 w-3.5 stroke-[3]" />
                              </div>
                            ) : (
                              <div className="h-5 w-5 rounded-full border-2 border-[#C7C7CC] dark:border-[#545458]" />
                            )}
                          </div>
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-xs text-[#1C1C1E] dark:text-white line-through">
                            {plan.name}
                          </h4>
                          <span className="text-[10px] text-[#8E8E93]">
                            {formatCurrency(plan.targetAmount)} • {language === 'ar' ? 'مكتمل' : 'Completed'}
                          </span>
                        </div>
                      </div>
                      {!isSelectMode && (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setConfirmDeletePlan(plan);
                            }}
                            className="rounded-lg p-1.5 text-[#C7C7CC] hover:text-[#FF3B30] transition-colors"
                            title={t.delete}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                          <ChevronRight className="h-4 w-4 text-[#8E8E93]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: DEDICATED WHAT-IF PLANNING SIMULATOR */}
      {subTab === 'whatif' && (
        <WhatIfSimulatorView
          plans={plans}
          transactions={transactions}
          unallocatedBalance={unallocatedBalance}
          avgSavings={avgSavings}
          monthlyCapacity={capacityAnalysis.monthlyCapacity}
          onOpenAllocate={onOpenAllocate}
          onOpenDetail={onOpenDetail}
        />
      )}

      {/* Plan Deletion Confirmation Modal - User Requirement 7 */}
      {confirmDeletePlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xs rounded-[28px] bg-white p-6 text-center shadow-2xl dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C] space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-[#FF3B30] dark:bg-rose-950/40">
              <Trash2 className="h-6 w-6" />
            </div>

            <h3 className="font-bold text-base text-[#1C1C1E] dark:text-white">
              {language === 'ar' ? 'حذف الخطة المالية؟' : 'Delete Financial Plan?'}
            </h3>

            <p className="text-xs text-[#8E8E93] leading-relaxed">
              {language === 'ar' ? (
                <>
                  هل أنت متأكد من حذف الخطة <strong className="text-[#1C1C1E] dark:text-white">"{confirmDeletePlan.name}"</strong>؟
                  {confirmDeletePlan.allocatedAmount > 0 && (
                    <span className="block mt-1 text-[#34C759] font-bold">
                      سيتم إعادة المبلغ المخصص ({formatCurrency(confirmDeletePlan.allocatedAmount)}) إلى رصيدك المتاح.
                    </span>
                  )}
                </>
              ) : (
                <>
                  Are you sure you want to delete <strong className="text-[#1C1C1E] dark:text-white">"{confirmDeletePlan.name}"</strong>?
                  {confirmDeletePlan.allocatedAmount > 0 && (
                    <span className="block mt-1 text-[#34C759] font-bold">
                      The allocated amount ({formatCurrency(confirmDeletePlan.allocatedAmount)}) will be returned to your unallocated pool.
                    </span>
                  )}
                </>
              )}
            </p>

            <div className="mt-4 flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDeletePlan(null)}
                className="flex-1 rounded-xl bg-[#F2F2F7] py-2.5 text-xs font-semibold text-[#8E8E93] transition-colors hover:bg-[#E5E5EA] dark:bg-[#38383A] dark:text-[#D1D1D6]"
              >
                {t.cancel}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onDeletePlan && confirmDeletePlan) {
                    onDeletePlan(confirmDeletePlan.id);
                  }
                  setConfirmDeletePlan(null);
                }}
                className="flex-1 rounded-xl bg-[#FF3B30] py-2.5 text-xs font-semibold text-white shadow-md shadow-red-500/25 transition-colors hover:bg-red-600"
              >
                {t.delete}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Plans Confirmation Modal */}
      {confirmBulkDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xs rounded-[28px] bg-white p-6 text-center shadow-2xl dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C] space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-[#FF3B30] dark:bg-rose-950/40">
              <Trash2 className="h-6 w-6" />
            </div>

            <h3 className="font-bold text-base text-[#1C1C1E] dark:text-white">
              {language === 'ar' ? 'حذف الخطط المحددة؟' : 'Delete Selected Plans?'}
            </h3>

            <p className="text-xs text-[#8E8E93] leading-relaxed">
              {language === 'ar' ? (
                <>
                  هل أنت متأكد من رغبتك في حذف <strong className="text-[#1C1C1E] dark:text-white">{selectedIds.size}</strong> خطط مالية؟
                  <span className="block mt-1 text-[#34C759] font-bold">
                    سيتم إعادة أي مبالغ مخصصة تلقائياً إلى رصيدك المتاح، وتحديث خططك والتحليلات فوراً.
                  </span>
                </>
              ) : (
                <>
                  Are you sure you want to delete <strong className="text-[#1C1C1E] dark:text-white">{selectedIds.size}</strong> plans?
                  <span className="block mt-1 text-[#34C759] font-bold">
                    Any allocated amounts will be safely restored to your available funds immediately.
                  </span>
                </>
              )}
            </p>

            <div className="mt-4 flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setConfirmBulkDelete(false)}
                className="flex-1 rounded-xl bg-[#F2F2F7] py-2.5 text-xs font-semibold text-[#8E8E93] transition-colors hover:bg-[#E5E5EA] dark:bg-[#38383A] dark:text-[#D1D1D6]"
              >
                {t.cancel}
              </button>
              <button
                type="button"
                onClick={handleExecuteBulkDeletePlans}
                className="flex-1 rounded-xl bg-[#FF3B30] py-2.5 text-xs font-semibold text-white shadow-md shadow-red-500/25 transition-colors hover:bg-red-600"
              >
                {language === 'ar' ? `حذف (${selectedIds.size})` : `Delete (${selectedIds.size})`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Backwards compatibility alias
export const GoalsTab = PlansTab;
