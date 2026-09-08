import React, { useState } from 'react';
import { TransactionItem, GoalItem, BudgetItem, CategoryItem } from '../../../types/finance';
import { ShieldCheck, Tag, ChartBar, FileSpreadsheet, Code2, Moon, Sun, Smartphone, Download, Database, Check, Globe, Languages } from 'lucide-react';
import { useI18n } from '../../../context/I18nContext';

interface SettingsTabProps {
  transactions: TransactionItem[];
  goals: GoalItem[];
  budgets: BudgetItem[];
  categories: CategoryItem[];
  biometricsEnabled: boolean;
  onToggleBiometrics: (enabled: boolean) => void;
  onOpenBudgets: () => void;
  onAddCategory: (name: string, type: 'income_source' | 'expense_category') => void;
  onDeleteCategory: (name: string, type: 'income_source' | 'expense_category') => void;
  theme: string;
  onChangeTheme: (theme: string) => void;
  onTriggerFaceID: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  transactions,
  goals,
  budgets,
  categories,
  biometricsEnabled,
  onToggleBiometrics,
  onOpenBudgets,
  onAddCategory,
  onDeleteCategory,
  theme,
  onChangeTheme,
  onTriggerFaceID,
}) => {
  const { t, language, setLanguage, isRTL, translateCat } = useI18n();
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatType, setNewCatType] = useState<'income_source' | 'expense_category'>('expense_category');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // CSV Export
  const handleExportCSV = () => {
    let csv = 'ID,Type,Amount,Currency,Date,Category,Source,Description,Notes\n';
    transactions.forEach(t => {
      const row = [
        t.id,
        t.type,
        t.amount,
        t.currency,
        t.date,
        `"${(t.category || '').replace(/"/g, '""')}"`,
        `"${(t.source || '').replace(/"/g, '""')}"`,
        `"${(t.itemDescription || '').replace(/"/g, '""')}"`,
        `"${(t.notes || '').replace(/"/g, '""')}"`,
      ].join(',');
      csv += row + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'FinanceApp_Transactions.csv';
    link.click();
    URL.revokeObjectURL(url);
    showNotice(language === 'ar' ? 'تم تنزيل ملف CSV' : 'CSV Downloaded');
  };

  // JSON Export
  const handleExportJSON = () => {
    const data = {
      exportDate: new Date().toISOString(),
      currency: 'IQD',
      language,
      transactions,
      goals,
      budgets,
    };
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'FinanceApp_Backup.json';
    link.click();
    URL.revokeObjectURL(url);
    showNotice(language === 'ar' ? 'تم تنزيل ملف النسخ الاحتياطي JSON' : 'JSON Downloaded');
  };

  const showNotice = (msg: string) => {
    setCopiedNotification(msg);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  const expenseCategories = categories.filter(c => c.type === 'expense_category');
  const incomeSources = categories.filter(c => c.type === 'income_source');

  return (
    <div id="settings-tab-view" className="space-y-4 px-4 pt-2 pb-24 text-[#1C1C1E] dark:text-[#F2F2F7]">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest">{t.preferencesHeading}</span>
          <h2 className="text-xl font-bold tracking-tight text-[#1C1C1E] dark:text-white">{t.settingsTitle}</h2>
        </div>
        {copiedNotification && (
          <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-950 dark:text-green-300">
            <Check className="h-3 w-3" /> {copiedNotification}
          </span>
        )}
      </div>

      {/* Language Section - Requested Feature */}
      <div id="language-setting-card" className="rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#007AFF] dark:bg-blue-950/40">
              <Languages className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-[#1C1C1E] dark:text-white flex items-center gap-2">
                <span>{t.languageHeading}</span>
              </div>
              <div className="text-[11px] text-[#8E8E93]">
                {t.languageSubtitle}
              </div>
            </div>
          </div>
        </div>

        {/* Language Selection Buttons */}
        <div className="mt-3.5 flex rounded-xl bg-[#E5E5EA] p-1 text-xs font-semibold dark:bg-[#1C1C1E]">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 transition-all ${
              language === 'en'
                ? 'bg-white text-[#007AFF] font-bold shadow-sm dark:bg-[#2C2C2E] dark:text-white'
                : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
            }`}
          >
            <span>🇺🇸</span>
            <span>English</span>
          </button>
          <button
            type="button"
            onClick={() => setLanguage('ar')}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 transition-all ${
              language === 'ar'
                ? 'bg-white text-[#007AFF] font-bold shadow-sm dark:bg-[#2C2C2E] dark:text-white'
                : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
            }`}
          >
            <span>🇮🇶</span>
            <span>العربية</span>
          </button>
        </div>

        {/* Quick Language Toggle Banner */}
        <div className="mt-3 flex items-center justify-between rounded-xl bg-[#F2F2F7] px-3.5 py-2.5 dark:bg-[#38383A]">
          <div className="text-[11px] text-[#8E8E93]">
            {language === 'ar'
              ? 'التطبيق معرّب بالكامل مع دعم اتجاه اليمين لليسار (RTL).'
              : 'App fully localized in Arabic with native RTL layout.'}
          </div>
          <button
            type="button"
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            className="shrink-0 rounded-lg bg-[#007AFF] px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-[#0062CC] active:scale-95"
          >
            {language === 'ar' ? 'English' : 'العربية'}
          </button>
        </div>
      </div>

      {/* Security Section */}
      <div className="rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">{t.securityHeading}</h3>
        <div className="mt-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#007AFF] dark:bg-blue-950/40">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-[#1C1C1E] dark:text-white">{t.faceIdLabel}</div>
              <div className="text-[11px] text-[#8E8E93]">
                {t.faceIdDesc}
              </div>
            </div>
          </div>

          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={biometricsEnabled}
              onChange={e => {
                onToggleBiometrics(e.target.checked);
                if (e.target.checked) {
                  onTriggerFaceID();
                }
              }}
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-[#E5E5EA] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all after:content-[''] peer-checked:bg-[#34C759] peer-checked:after:translate-x-full peer-focus:outline-none dark:bg-[#38383A]"></div>
          </label>
        </div>

        {biometricsEnabled && (
          <button
            onClick={onTriggerFaceID}
            className="mt-3.5 w-full rounded-xl bg-[#F2F2F7] py-2.5 text-center text-xs font-semibold text-[#007AFF] hover:bg-[#E5E5EA] dark:bg-[#38383A] dark:text-[#007AFF]"
          >
            {t.testFaceIdBtn}
          </button>
        )}
      </div>

      {/* Budgets Management */}
      <div className="rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">{t.budgetsHeading}</h3>
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="text-xs text-[#8E8E93]">
            {t.budgetsDesc}
          </div>
          <button
            onClick={onOpenBudgets}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[#007AFF] px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-blue-500/25 hover:bg-[#0062CC]"
          >
            <ChartBar className="h-3.5 w-3.5" /> {t.manageBudgetsBtn}
          </button>
        </div>
      </div>

      {/* Custom Categories & Sources */}
      <div className="rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">{t.categoriesHeading}</h3>
            <p className="text-xs text-[#8E8E93]">{t.categoriesDesc}</p>
          </div>
          <button
            onClick={() => setShowCategoryManager(!showCategoryManager)}
            className="text-xs font-semibold text-[#007AFF]"
          >
            {showCategoryManager ? t.hideBtn : t.configureBtn}
          </button>
        </div>

        {showCategoryManager && (
          <div className="mt-4 space-y-4 border-t border-[#F2F2F7] pt-3.5 dark:border-[#38383A]">
            {/* Add custom */}
            <div className="space-y-2.5">
              <div className="flex gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setNewCatType('expense_category')}
                  className={`flex-1 rounded-xl py-1.5 font-semibold transition-colors ${newCatType === 'expense_category' ? 'bg-[#007AFF] text-white shadow-sm' : 'bg-[#E5E5EA] text-[#3A3A3C] dark:bg-[#38383A] dark:text-[#8E8E93]'}`}
                >
                  {t.expenseCategoryType}
                </button>
                <button
                  type="button"
                  onClick={() => setNewCatType('income_source')}
                  className={`flex-1 rounded-xl py-1.5 font-semibold transition-colors ${newCatType === 'income_source' ? 'bg-[#007AFF] text-white shadow-sm' : 'bg-[#E5E5EA] text-[#3A3A3C] dark:bg-[#38383A] dark:text-[#8E8E93]'}`}
                >
                  {t.incomeSourceType}
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={t.newCategoryPlaceholder}
                  value={newCatName}
                  onChange={e => setNewCatName(e.target.value)}
                  className="flex-1 rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2 text-xs focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E]"
                />
                <button
                  onClick={() => {
                    if (newCatName.trim()) {
                      onAddCategory(newCatName.trim(), newCatType);
                      setNewCatName('');
                    }
                  }}
                  className="rounded-xl bg-[#007AFF] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0062CC]"
                >
                  {t.addCategoryBtn}
                </button>
              </div>
            </div>

            {/* List */}
            <div className="space-y-2">
              <div className="font-semibold text-xs text-[#8E8E93]">
                {t.currentExpenseCats} ({expenseCategories.length}):
              </div>
              <div className="flex flex-wrap gap-1.5">
                {expenseCategories.map(c => (
                  <span
                    key={c.id || c.name}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#F2F2F7] px-3 py-1 text-xs font-semibold text-[#1C1C1E] dark:bg-[#38383A] dark:text-white"
                  >
                    {translateCat(c.name)}
                    {!c.isDefault && (
                      <button
                        onClick={() => onDeleteCategory(c.name, 'expense_category')}
                        className="text-[#8E8E93] hover:text-[#FF3B30]"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Data Export */}
      <div className="rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">{t.dataHeading}</h3>
        <p className="mt-1 text-xs text-[#8E8E93]">{t.dataDesc}</p>

        <div className="mt-3.5 grid grid-cols-2 gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center justify-center gap-2 rounded-xl border border-[#E5E5EA] bg-white p-3 text-xs font-semibold text-[#1C1C1E] hover:bg-[#F2F2F7] dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"
          >
            <FileSpreadsheet className="h-4 w-4 text-[#34C759]" /> {t.exportCsvBtn}
          </button>
          <button
            onClick={handleExportJSON}
            className="flex items-center justify-center gap-2 rounded-xl border border-[#E5E5EA] bg-white p-3 text-xs font-semibold text-[#1C1C1E] hover:bg-[#F2F2F7] dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"
          >
            <Download className="h-4 w-4 text-[#007AFF]" /> {t.exportJsonBtn}
          </button>
        </div>
      </div>

      {/* Appearance */}
      <div className="rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">{t.appearanceHeading}</h3>
        <div className="mt-3 flex rounded-xl bg-[#E5E5EA] p-1 text-xs font-semibold dark:bg-[#1C1C1E]">
          <button
            onClick={() => onChangeTheme('system')}
            className={`flex-1 rounded-lg py-1.5 transition-all ${theme === 'system' ? 'bg-white text-[#1C1C1E] shadow-sm dark:bg-[#2C2C2E] dark:text-white' : 'text-[#8E8E93]'}`}
          >
            {t.themeSystem}
          </button>
          <button
            onClick={() => onChangeTheme('light')}
            className={`flex-1 rounded-lg py-1.5 transition-all ${theme === 'light' ? 'bg-white text-[#1C1C1E] shadow-sm dark:bg-[#2C2C2E] dark:text-white' : 'text-[#8E8E93]'}`}
          >
            {t.themeLight}
          </button>
          <button
            onClick={() => onChangeTheme('dark')}
            className={`flex-1 rounded-lg py-1.5 transition-all ${theme === 'dark' ? 'bg-white text-[#1C1C1E] shadow-sm dark:bg-[#2C2C2E] dark:text-white' : 'text-[#8E8E93]'}`}
          >
            {t.themeDark}
          </button>
        </div>
      </div>

      {/* Developer & App Information - User Requirement 8 */}
      <div id="developer-app-info-card" className="rounded-[24px] border border-[#E5E5EA] bg-white p-5 text-xs shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] space-y-2.5">
        <h3 className="font-bold uppercase tracking-wider text-[#8E8E93]">
          {language === 'ar' ? 'معلومات التطبيق والمطور' : 'App & Developer Info'}
        </h3>
        <div className="flex justify-between py-1 border-b border-[#F2F2F7] dark:border-[#38383A]">
          <span className="text-[#8E8E93]">{language === 'ar' ? 'المطور' : 'Developer'}</span>
          <span className="font-bold text-[#1C1C1E] dark:text-white">Ahmed AL KUBAISI</span>
        </div>
        <div className="flex justify-between py-1 border-b border-[#F2F2F7] dark:border-[#38383A]">
          <span className="text-[#8E8E93]">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</span>
          <a
            href="mailto:ahmed.mjabbar95@gmail.com"
            className="font-medium text-[#007AFF] hover:underline"
          >
            ahmed.mjabbar95@gmail.com
          </a>
        </div>
        <div className="flex justify-between py-1 border-b border-[#F2F2F7] dark:border-[#38383A]">
          <span className="text-[#8E8E93]">{language === 'ar' ? 'الإصدار' : 'Version'}</span>
          <span className="rounded-md bg-blue-50 px-2 py-0.5 font-bold text-[#007AFF] dark:bg-blue-950/40">
            2.1.0
          </span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-[#8E8E93]">{language === 'ar' ? 'بيئة التطبيق' : 'Architecture'}</span>
          <span className="font-semibold text-[#1C1C1E] dark:text-white">Swift 5.9 / SwiftData / SwiftUI</span>
        </div>
      </div>

      {/* Device & Engine Metadata */}
      <div className="rounded-[24px] border border-[#E5E5EA] bg-white p-5 text-xs shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] space-y-2.5">
        <h3 className="font-bold uppercase tracking-wider text-[#8E8E93]">{t.environmentHeading}</h3>
        <div className="flex justify-between py-1 border-b border-[#F2F2F7] dark:border-[#38383A]">
          <span className="text-[#8E8E93]">{t.primaryCurrency}</span>
          <span className="font-semibold text-[#1C1C1E] dark:text-white">{language === 'ar' ? 'دينار عراقي (IQD / د.ع)' : 'IQD (Iraqi Dinar)'}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-[#F2F2F7] dark:border-[#38383A]">
          <span className="text-[#8E8E93]">{t.targetDevice}</span>
          <span className="font-semibold text-[#1C1C1E] dark:text-white">iPhone 13 Pro Max (iOS 17+)</span>
        </div>
        <div className="flex justify-between py-1 border-b border-[#F2F2F7] dark:border-[#38383A]">
          <span className="text-[#8E8E93]">{t.packageFormat}</span>
          <span className="font-semibold text-[#1C1C1E] dark:text-white">Swift Playgrounds 4 (.swiftpm)</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-[#8E8E93]">{t.localPersistence}</span>
          <span className="font-semibold text-[#007AFF]">SwiftData (Offline SQLite)</span>
        </div>
      </div>
    </div>
  );
};

