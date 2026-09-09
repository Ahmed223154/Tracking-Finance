import React, { useState, useEffect } from 'react';
import { useI18n } from '../../../context/I18nContext';
import { TransactionItem, PlanItem, PlanPriority } from '../../../types/finance';
import { WidgetBridge, WidgetDataPayload } from '../../../services/widgetBridge';
import { DeepLinkService } from '../../../services/deepLinkService';
import {
  X,
  LayoutGrid,
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  Target,
  Clock,
  Sparkles,
  Smartphone,
  ExternalLink,
  Copy,
  Check,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Layers,
  Share2,
} from 'lucide-react';

interface IOSWidgetsHubModalProps {
  transactions: TransactionItem[];
  plans: PlanItem[];
  unallocatedBalance: number;
  monthlyCapacity: number;
  onClose: () => void;
  onDeepLinkTriggered: (url: string) => void;
}

export const IOSWidgetsHubModal: React.FC<IOSWidgetsHubModalProps> = ({
  transactions,
  plans,
  unallocatedBalance,
  monthlyCapacity,
  onClose,
  onDeepLinkTriggered,
}) => {
  const { t, language, formatCurrency, isRTL } = useI18n();
  const [activeSubTab, setActiveSubTab] = useState<'widgets' | 'shortcuts' | 'bridge' | 'swift'>('widgets');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Sync and get latest widget payload
  const [widgetData, setWidgetData] = useState<WidgetDataPayload>(() => {
    return WidgetBridge.syncData(transactions, plans, unallocatedBalance, monthlyCapacity, language);
  });

  useEffect(() => {
    const updated = WidgetBridge.syncData(transactions, plans, unallocatedBalance, monthlyCapacity, language);
    setWidgetData(updated);
  }, [transactions, plans, unallocatedBalance, monthlyCapacity, language]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const priorityBadge: Record<PlanPriority, { bg: string; dot: string; text: string }> = {
    critical: { bg: 'bg-rose-50 dark:bg-rose-950/40', dot: 'bg-rose-500', text: 'text-rose-600 dark:text-rose-400' },
    high: { bg: 'bg-amber-50 dark:bg-amber-950/40', dot: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
    medium: { bg: 'bg-blue-50 dark:bg-blue-950/40', dot: 'bg-[#007AFF]', text: 'text-[#007AFF] dark:text-blue-400' },
    low: { bg: 'bg-emerald-50 dark:bg-emerald-950/40', dot: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-[32px] border border-[#E5E5EA] bg-white shadow-2xl dark:border-[#3A3A3C] dark:bg-[#1C1C1E] overflow-hidden text-[#1C1C1E] dark:text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F2F2F7] dark:border-[#2C2C2E] bg-[#FAFAFC] dark:bg-[#252527]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white shadow-md shadow-blue-500/20">
              <LayoutGrid className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-black leading-tight">
                {language === 'ar' ? 'أدوات الشاشة الرئيسية والاختصارات' : 'iOS Widgets & Quick Actions'}
              </h2>
              <p className="text-[11px] text-[#8E8E93]">
                {language === 'ar'
                  ? 'ويدجت تفاعلية، اختصارات 3D Touch، وربط App Group'
                  : 'Interactive WidgetKit 2x2 & 2x4, 3D Touch & App Group'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-[#8E8E93] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 px-6 py-2.5 bg-[#F2F2F7] dark:bg-[#1C1C1E] border-b border-[#E5E5EA] dark:border-[#2C2C2E] text-xs font-bold overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveSubTab('widgets')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 transition-all whitespace-nowrap ${
              activeSubTab === 'widgets'
                ? 'bg-white text-[#007AFF] shadow-xs dark:bg-[#2C2C2E] dark:text-white'
                : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>{language === 'ar' ? 'الويدجت التفاعلية' : 'Home Widgets'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('shortcuts')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 transition-all whitespace-nowrap ${
              activeSubTab === 'shortcuts'
                ? 'bg-white text-[#007AFF] shadow-xs dark:bg-[#2C2C2E] dark:text-white'
                : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            <span>{language === 'ar' ? 'اختصارات 3D Touch' : 'Quick Actions'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('bridge')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 transition-all whitespace-nowrap ${
              activeSubTab === 'bridge'
                ? 'bg-white text-[#007AFF] shadow-xs dark:bg-[#2C2C2E] dark:text-white'
                : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>{language === 'ar' ? 'جسر البيانات المشتركة' : 'App Group Bridge'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('swift')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 transition-all whitespace-nowrap ${
              activeSubTab === 'swift'
                ? 'bg-white text-[#007AFF] shadow-xs dark:bg-[#2C2C2E] dark:text-white'
                : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>{language === 'ar' ? 'أكواد Swift الأصلية' : 'Native SwiftKit'}</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: INTERACTIVE WIDGETS PREVIEW */}
          {activeSubTab === 'widgets' && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 p-3.5 text-xs text-[#007AFF] dark:text-blue-300 border border-blue-100 dark:border-blue-900/50 flex items-center gap-2">
                <Sparkles className="h-4 w-4 shrink-0" />
                <span>
                  {language === 'ar'
                    ? 'جرب النقر على أزرار الويدجت أدناه! سيتم فتح نوافذ المعاملات والخطط مباشرة عبر الروابط العميقة (Deep Links).'
                    : 'Interactive Preview: Tap the buttons or plans below to test direct deep-link routing into the transaction or plan modal!'}
                </span>
              </div>

              {/* Widget Section */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                {/* WIDGET A: Quick Log (Small 2x2 Widget) */}
                <div className="md:col-span-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E93]">
                      {language === 'ar' ? 'أداة الإدخال السريع (صغيرة 2x2)' : 'Widget A: Quick Log (Small 2x2)'}
                    </span>
                    <span className="text-[10px] font-semibold text-[#007AFF]">
                      WidgetKit Small
                    </span>
                  </div>

                  {/* Authentic iOS 2x2 Widget Container */}
                  <div className="relative mx-auto w-48 h-48 rounded-[28px] border border-black/5 dark:border-white/10 bg-gradient-to-b from-white to-[#F9F9FB] dark:from-[#2C2C2E] dark:to-[#222224] p-4 shadow-xl flex flex-col justify-between select-none">
                    {/* Top: Header & Unallocated Balance */}
                    <div>
                      <div className="flex items-center justify-between text-[#8E8E93] text-[10px] font-bold uppercase tracking-wider mb-1">
                        <span>{language === 'ar' ? 'المتاح للادخار' : 'Unallocated'}</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-[#34C759]" />
                      </div>
                      <p className="text-xl font-black text-[#1C1C1E] dark:text-white tracking-tight truncate" title={widgetData.unallocatedBalanceFormatted}>
                        {widgetData.unallocatedBalanceFormatted}
                      </p>
                      <p className="text-[9px] text-[#8E8E93] mt-0.5">
                        {language === 'ar' ? 'جاهز للتخصيص' : 'Available in IQD'}
                      </p>
                    </div>

                    {/* Bottom: Deep-Link Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          onDeepLinkTriggered('myapp://add-expense');
                          onClose();
                        }}
                        className="group flex flex-col items-center justify-center rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/60 p-2.5 transition-all active:scale-95 border border-rose-200/60 dark:border-rose-900/50"
                      >
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-white shadow-xs mb-1">
                          <Plus className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[10px] font-black text-rose-700 dark:text-rose-300">
                          {language === 'ar' ? 'مصروف' : 'Expense'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onDeepLinkTriggered('myapp://add-income');
                          onClose();
                        }}
                        className="group flex flex-col items-center justify-center rounded-2xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/60 p-2.5 transition-all active:scale-95 border border-emerald-200/60 dark:border-emerald-900/50"
                      >
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs mb-1">
                          <Plus className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-300">
                          {language === 'ar' ? 'دخل' : 'Income'}
                        </span>
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] text-center text-[#8E8E93]">
                    Deep links: <code className="text-[#007AFF]">myapp://add-expense</code> & <code className="text-[#007AFF]">myapp://add-income</code>
                  </p>
                </div>

                {/* WIDGET B: Plans Tracker (Medium 2x4 Widget) */}
                <div className="md:col-span-7 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E93]">
                      {language === 'ar' ? 'أداة متابعة الخطط (متوسطة 2x4)' : 'Widget B: Plans Tracker (Medium 2x4)'}
                    </span>
                    <span className="text-[10px] font-semibold text-[#007AFF]">
                      WidgetKit Medium
                    </span>
                  </div>

                  {/* Authentic iOS 2x4 Medium Widget Container */}
                  <div className="relative w-full h-48 rounded-[28px] border border-black/5 dark:border-white/10 bg-gradient-to-b from-white to-[#F9F9FB] dark:from-[#2C2C2E] dark:to-[#222224] p-4 shadow-xl flex flex-col justify-between select-none">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-1.5 border-b border-[#F2F2F7] dark:border-[#38383A]">
                      <div className="flex items-center gap-1.5">
                        <Target className="h-3.5 w-3.5 text-[#007AFF]" />
                        <span className="text-xs font-black text-[#1C1C1E] dark:text-white">
                          {language === 'ar' ? 'أولويات الخطط النشطة' : 'Top Priority Objectives'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          onDeepLinkTriggered('myapp://plans-dashboard');
                          onClose();
                        }}
                        className="text-[10px] font-bold text-[#007AFF] hover:underline"
                      >
                        {language === 'ar' ? 'عرض الكل' : 'View All'} ➔
                      </button>
                    </div>

                    {/* Plans List (Top 2 Active Plans) */}
                    <div className="space-y-2.5">
                      {widgetData.topPlans.length === 0 ? (
                        <div className="py-4 text-center text-xs text-[#8E8E93]">
                          {language === 'ar' ? 'لا توجد خطط نشطة حالياً' : 'No active plans found'}
                        </div>
                      ) : (
                        widgetData.topPlans.map(plan => {
                          const badge = priorityBadge[plan.priority] || priorityBadge.medium;
                          return (
                            <div
                              key={plan.id}
                              onClick={() => {
                                onDeepLinkTriggered(plan.deepLink);
                                onClose();
                              }}
                              className="group p-2 rounded-xl bg-[#F2F2F7]/80 hover:bg-blue-50/80 dark:bg-[#1C1C1E]/60 dark:hover:bg-blue-950/40 cursor-pointer transition-all border border-black/[0.03] dark:border-white/[0.04]"
                            >
                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <span className={`h-2 w-2 rounded-full shrink-0 ${badge.dot}`} />
                                  <span className="font-black text-[#1C1C1E] dark:text-white truncate text-[11px]">
                                    {plan.name}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0 text-[10px]">
                                  <span
                                    className={`px-1.5 py-0.2 rounded font-extrabold text-[9px] ${
                                      plan.isDelayed
                                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300'
                                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300'
                                    }`}
                                  >
                                    {plan.statusFlag}
                                  </span>
                                  <span className="text-[#8E8E93] font-semibold">
                                    {formatCurrency(plan.remainingAmount)} rem
                                  </span>
                                </div>
                              </div>

                              {/* Progress Track */}
                              <div className="mt-1.5 flex items-center gap-2">
                                <div className="h-1.5 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${badge.dot}`}
                                    style={{ width: `${plan.progressPercent}%` }}
                                  />
                                </div>
                                <span className="text-[9px] font-bold text-[#1C1C1E] dark:text-white shrink-0">
                                  {plan.progressPercent}%
                                </span>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    <div className="pt-1 flex items-center justify-between text-[9px] text-[#8E8E93]">
                      <span>Tap any plan to open full details</span>
                      <span>Suite: {widgetData.appGroupSuite}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-center text-[#8E8E93]">
                    Deep link: <code className="text-[#007AFF]">myapp://plan?id={'{planId}'}</code>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 3D TOUCH QUICK ACTIONS */}
          {activeSubTab === 'shortcuts' && (
            <div className="space-y-5">
              <div className="rounded-2xl bg-[#F9F9FB] dark:bg-[#252527] p-4 border border-[#E5E5EA] dark:border-[#38383A] space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1C1C1E] dark:text-white">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span>
                    {language === 'ar'
                      ? 'محاكاة القائمة السريعة عند الضغط المطول على أيقونة التطبيق (3D Touch / Quick Actions)'
                      : 'Simulated iOS Home Screen Long-Press Quick Action Menu'}
                  </span>
                </div>
                <p className="text-xs text-[#8E8E93]">
                  {language === 'ar'
                    ? 'في نظام iOS، عند الضغط المطول على أيقونة التطبيق في الشاشة الرئيسية، تظهر هذه الاختصارات لفتح نموذج المعاملة أو لوحة الخطط مباشرة دون الحاجة للتنقل اليدوي.'
                    : 'On iPhone, long-pressing the app icon triggers UIApplicationShortcutItems, instantly bypassing navigation to open the transaction or plans dashboard.'}
                </p>

                {/* Simulated 3D Touch Popup Card */}
                <div className="py-4 flex flex-col items-center justify-center">
                  <div className="w-72 rounded-[22px] bg-white/90 dark:bg-[#2C2C2E]/95 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl p-2 space-y-1 divide-y divide-gray-100 dark:divide-[#3A3A3C]">
                    {/* Shortcut 1: Add Expense */}
                    <button
                      type="button"
                      onClick={() => {
                        onDeepLinkTriggered('myapp://add-expense');
                        onClose();
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500 text-white shadow-xs">
                          <Plus className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#1C1C1E] dark:text-white">
                            {language === 'ar' ? 'إضافة مصروف' : 'Add Expense'}
                          </p>
                          <p className="text-[10px] text-[#8E8E93]">
                            {language === 'ar' ? 'تسجيل نفقة فورية' : 'Log spending quickly'}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#007AFF]">+</span>
                    </button>

                    {/* Shortcut 2: Add Income */}
                    <button
                      type="button"
                      onClick={() => {
                        onDeepLinkTriggered('myapp://add-income');
                        onClose();
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all text-left pt-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-xs">
                          <Plus className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#1C1C1E] dark:text-white">
                            {language === 'ar' ? 'إضافة دخل' : 'Add Income'}
                          </p>
                          <p className="text-[10px] text-[#8E8E93]">
                            {language === 'ar' ? 'إيداع أو راتب' : 'Deposit or earnings'}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#34C759]">+</span>
                    </button>

                    {/* Shortcut 3: Plans Status */}
                    <button
                      type="button"
                      onClick={() => {
                        onDeepLinkTriggered('myapp://plans-dashboard');
                        onClose();
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-all text-left pt-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#007AFF] text-white shadow-xs">
                          <Target className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#1C1C1E] dark:text-white">
                            {language === 'ar' ? 'حالة الخطط' : 'Plans Status'}
                          </p>
                          <p className="text-[10px] text-[#8E8E93]">
                            {language === 'ar' ? 'لوحة الأهداف والمخطط' : 'Open Plans Dashboard'}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#007AFF]">➔</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* URL Scheme Reference Card */}
              <div className="rounded-2xl border border-[#E5E5EA] dark:border-[#3A3A3C] p-4 bg-white dark:bg-[#2C2C2E] space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
                  Registered URL Schemes
                </h4>
                <div className="space-y-1.5 font-mono text-xs">
                  {[
                    'myapp://add-expense',
                    'myapp://add-income',
                    'myapp://plans-dashboard',
                    'myapp://plan?id={planId}',
                  ].map(scheme => (
                    <div
                      key={scheme}
                      className="flex items-center justify-between p-2 rounded-xl bg-[#F2F2F7] dark:bg-[#1C1C1E] text-xs"
                    >
                      <span className="text-[#007AFF] font-bold">{scheme}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(scheme, scheme)}
                        className="text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white p-1"
                      >
                        {copiedKey === scheme ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: APP GROUP BRIDGE DATA */}
          {activeSubTab === 'bridge' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
                    Shared App Group Payload
                  </h4>
                  <p className="text-[11px] text-[#8E8E93]">
                    Mirrored to <code className="text-[#007AFF]">{widgetData.appGroupSuite}</code> on every save
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(JSON.stringify(widgetData, null, 2), 'payload')}
                  className="flex items-center gap-1 text-xs font-bold text-[#007AFF] hover:underline"
                >
                  {copiedKey === 'payload' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedKey === 'payload' ? 'Copied' : 'Copy JSON'}</span>
                </button>
              </div>

              <div className="rounded-2xl bg-[#1C1C1E] p-4 text-emerald-400 font-mono text-xs overflow-x-auto max-h-72 border border-gray-800">
                <pre>{JSON.stringify(widgetData, null, 2)}</pre>
              </div>

              <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/30 p-3 text-xs text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50">
                <strong>Sync Protocol:</strong> Whenever transactions are added, edited, or deleted, or when plan allocations change, <code>WidgetBridge.syncData()</code> writes directly to the shared UserDefaults suite and triggers <code>WidgetCenter.shared.reloadAllTimelines()</code>.
              </div>
            </div>
          )}

          {/* TAB 4: NATIVE SWIFT WIDGETKIT CODE */}
          {activeSubTab === 'swift' && (
            <div className="space-y-4 text-xs">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
                  Production Swift WidgetKit Extensions
                </h4>
                <p className="text-[11px] text-[#8E8E93]">
                  Located in <code className="text-[#007AFF]">/ios/App/FinanceWidgets/</code> ready to build in Xcode
                </p>
              </div>

              <div className="rounded-2xl border border-[#E5E5EA] dark:border-[#3A3A3C] p-3.5 bg-[#F9F9FB] dark:bg-[#252527] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">QuickLogWidget.swift (WidgetKit Small 2x2)</span>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `// QuickLogWidget.swift
import WidgetKit
import SwiftUI

struct QuickLogEntry: TimelineEntry {
    let date: Date
    let unallocatedBalance: String
}

struct QuickLogWidgetEntryView: View {
    var entry: QuickLogEntry

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("UNALLOCATED")
                .font(.system(size: 10, weight: .bold))
                .foregroundColor(.secondary)
            Text(entry.unallocatedBalance)
                .font(.system(size: 18, weight: .heavy, design: .rounded))
            Spacer()
            HStack(spacing: 8) {
                Link(destination: URL(string: "myapp://add-expense")!) {
                    Text("+ Expense")
                        .font(.system(size: 11, weight: .bold))
                        .frame(maxWidth: .infinity, maxHeight: 34)
                        .background(Color.red.opacity(0.15))
                        .foregroundColor(.red)
                        .cornerRadius(10)
                }
                Link(destination: URL(string: "myapp://add-income")!) {
                    Text("+ Income")
                        .font(.system(size: 11, weight: .bold))
                        .frame(maxWidth: .infinity, maxHeight: 34)
                        .background(Color.green.opacity(0.15))
                        .foregroundColor(.green)
                        .cornerRadius(10)
                }
            }
        }
        .padding()
    }
}`,
                        'quicklog-code'
                      )
                    }
                    className="text-[#007AFF] hover:underline flex items-center gap-1 font-semibold text-[11px]"
                  >
                    {copiedKey === 'quicklog-code' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                    <span>Copy Swift</span>
                  </button>
                </div>
                <pre className="p-2.5 rounded-xl bg-[#1C1C1E] text-gray-300 font-mono text-[10px] overflow-x-auto max-h-40">
{`struct QuickLogWidgetEntryView: View {
    var entry: QuickLogEntry
    var body: some View {
        VStack(alignment: .leading) {
            Text(entry.unallocatedBalance)
            HStack {
                Link("+ Expense", destination: URL(string: "myapp://add-expense")!)
                Link("+ Income", destination: URL(string: "myapp://add-income")!)
            }
        }
    }
}`}
                </pre>
              </div>

              <div className="rounded-2xl border border-[#E5E5EA] dark:border-[#3A3A3C] p-3.5 bg-[#F9F9FB] dark:bg-[#252527] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">PlansTrackerWidget.swift (WidgetKit Medium 2x4)</span>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `// PlansTrackerWidget.swift
import WidgetKit
import SwiftUI

struct PlansTrackerWidgetEntryView: View {
    var entry: PlansTrackerEntry

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Label("Active Plans", systemImage: "target")
                    .font(.system(size: 12, weight: .bold))
                Spacer()
                Link("View All", destination: URL(string: "myapp://plans-dashboard")!)
                    .font(.system(size: 10, weight: .semibold))
            }
            ForEach(entry.topPlans) { plan in
                Link(destination: URL(string: "myapp://plan?id=\\(plan.id)")!) {
                    VStack(alignment: .leading, spacing: 4) {
                        HStack {
                            Text(plan.name).font(.system(size: 12, weight: .bold))
                            Spacer()
                            Text(plan.statusFlag).font(.system(size: 10, weight: .heavy))
                        }
                        ProgressView(value: Double(plan.progressPercent), total: 100)
                    }
                }
            }
        }
        .padding()
    }
}`,
                        'planstracker-code'
                      )
                    }
                    className="text-[#007AFF] hover:underline flex items-center gap-1 font-semibold text-[11px]"
                  >
                    {copiedKey === 'planstracker-code' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                    <span>Copy Swift</span>
                  </button>
                </div>
                <pre className="p-2.5 rounded-xl bg-[#1C1C1E] text-gray-300 font-mono text-[10px] overflow-x-auto max-h-40">
{`struct PlansTrackerWidgetEntryView: View {
    var entry: PlansTrackerEntry
    var body: some View {
        ForEach(entry.topPlans) { plan in
            Link(destination: URL(string: "myapp://plan?id=\\(plan.id)")!) {
                Text(plan.name)
                ProgressView(value: plan.progressPercent, total: 100)
            }
        }
    }
}`}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#F2F2F7] dark:border-[#2C2C2E] bg-[#FAFAFC] dark:bg-[#252527] text-xs">
          <span className="text-[11px] text-[#8E8E93]">
            {language === 'ar' ? 'متوافق مع نظام iOS 16/17/18' : 'iOS 16/17/18 WidgetKit & App Groups Ready'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#007AFF] px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#0062CC] transition-colors"
          >
            {language === 'ar' ? 'تم' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
