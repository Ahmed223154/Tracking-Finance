import React, { useState } from 'react';
import {
  AccountProfile,
  TransactionItem,
} from '../../../types/finance';
import {
  X,
  Check,
  Plus,
  ArrowRightLeft,
  Building,
  User,
  Briefcase,
  Store,
  Cpu,
  Trash2,
  Edit2,
  AlertCircle,
  ShieldAlert,
} from 'lucide-react';
import { useI18n } from '../../../context/I18nContext';

interface AccountSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: AccountProfile[];
  activeAccountId: string;
  onSelectAccount: (id: string) => void;
  onCreateAccount: (data: {
    name: string;
    currency?: string;
    color?: string;
    icon?: string;
    description?: string;
  }) => { success: boolean; error?: string };
  onUpdateAccount: (
    id: string,
    updates: { name?: string; color?: string; icon?: string; description?: string }
  ) => { success: boolean; error?: string };
  onDeleteAccount: (id: string) => { success: boolean; error?: string };
  onOpenTransfer: () => void;
  transactions: TransactionItem[];
}

const AVAILABLE_ICONS = [
  { id: 'Building', label: 'Company', icon: Building },
  { id: 'Briefcase', label: 'Consulting', icon: Briefcase },
  { id: 'Store', label: 'Retail', icon: Store },
  { id: 'Cpu', label: 'Tech', icon: Cpu },
  { id: 'User', label: 'Personal', icon: User },
];

const COLOR_PRESETS = [
  '#007AFF', // Blue
  '#FF9500', // Orange
  '#34C759', // Green
  '#AF52DE', // Purple
  '#FF2D55', // Rose
  '#5856D6', // Indigo
  '#00C7BE', // Teal
];

export const AccountSwitcherModal: React.FC<AccountSwitcherModalProps> = ({
  isOpen,
  onClose,
  accounts,
  activeAccountId,
  onSelectAccount,
  onCreateAccount,
  onUpdateAccount,
  onDeleteAccount,
  onOpenTransfer,
  transactions,
}) => {
  const { language, formatCurrency } = useI18n();
  const [isCreating, setIsCreating] = useState(false);
  const [editingAccountId, setEditingAccountId] = useState<string | null>(null);

  // Form states
  const [nameInput, setNameInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLOR_PRESETS[1]);
  const [selectedIcon, setSelectedIcon] = useState('Building');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const getAccountBalance = (accId: string) => {
    const accTxs = transactions.filter(t => (t.accountId || 'personal') === accId);
    let income = 0;
    let expense = 0;
    for (const tx of accTxs) {
      if (tx.type === 'income') income += tx.amount;
      else expense += tx.amount;
    }
    return income - expense;
  };

  const resetForm = () => {
    setNameInput('');
    setDescInput('');
    setSelectedColor(COLOR_PRESETS[1]);
    setSelectedIcon('Building');
    setErrorMessage(null);
    setIsCreating(false);
    setEditingAccountId(null);
  };

  const handleStartCreate = () => {
    resetForm();
    setIsCreating(true);
  };

  const handleStartEdit = (acc: AccountProfile) => {
    setNameInput(acc.name);
    setDescInput(acc.description || '');
    setSelectedColor(acc.color || COLOR_PRESETS[1]);
    setSelectedIcon(acc.icon || 'Building');
    setErrorMessage(null);
    setIsCreating(false);
    setEditingAccountId(acc.id);
  };

  const handleSaveCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      setErrorMessage(language === 'ar' ? 'يرجى إدخال اسم الحساب' : 'Please enter an account name.');
      return;
    }

    const res = onCreateAccount({
      name: nameInput.trim(),
      color: selectedColor,
      icon: selectedIcon,
      description: descInput.trim(),
    });

    if (!res.success) {
      setErrorMessage(res.error || 'Failed to create account');
    } else {
      resetForm();
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAccountId) return;
    if (!nameInput.trim()) {
      setErrorMessage(language === 'ar' ? 'يرجى إدخال اسم الحساب' : 'Please enter an account name.');
      return;
    }

    const res = onUpdateAccount(editingAccountId, {
      name: nameInput.trim(),
      color: selectedColor,
      icon: selectedIcon,
      description: descInput.trim(),
    });

    if (!res.success) {
      setErrorMessage(res.error || 'Failed to update account');
    } else {
      resetForm();
    }
  };

  const handleDelete = (accId: string) => {
    const acc = accounts.find(a => a.id === accId);
    if (!acc) return;
    const confirmMsg =
      language === 'ar'
        ? `هل أنت متأكد من حذف حساب "${acc.name}"؟ سيتم حذف جميع الفواتير والمعاملات الخاصة به.`
        : `Delete account "${acc.name}"? All associated business transactions and invoices will be removed.`;
    if (window.confirm(confirmMsg)) {
      const res = onDeleteAccount(accId);
      if (!res.success) {
        setErrorMessage(res.error || 'Failed to delete');
      } else {
        if (editingAccountId === accId) resetForm();
      }
    }
  };

  const renderIcon = (iconName: string, className = 'h-4 w-4') => {
    switch (iconName) {
      case 'Building':
        return <Building className={className} />;
      case 'Briefcase':
        return <Briefcase className={className} />;
      case 'Store':
        return <Store className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'User':
      default:
        return <User className={className} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-lg rounded-t-[32px] sm:rounded-[28px] bg-white dark:bg-[#1C1C1E] shadow-2xl border border-[#E5E5EA] dark:border-[#38383A] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F2F2F7] dark:border-[#2C2C2E]">
          <div>
            <h2 className="text-base font-bold text-[#1C1C1E] dark:text-white flex items-center gap-2">
              <span>{language === 'ar' ? 'إدارة مساحات العمل والحسابات' : 'Switch & Manage Workspaces'}</span>
              <span className="text-[11px] font-semibold text-[#8E8E93] bg-[#F2F2F7] dark:bg-[#2C2C2E] px-2 py-0.5 rounded-full">
                {accounts.length} / 6
              </span>
            </h2>
            <p className="text-[11px] text-[#8E8E93] mt-0.5">
              {language === 'ar'
                ? 'حساب شخصي + حتى 5 حسابات تجارية مستقلة'
                : '1 Personal Vault + up to 5 Independent Businesses'}
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="p-1.5 rounded-full bg-[#F2F2F7] dark:bg-[#2C2C2E] text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Error notice */}
        {errorMessage && (
          <div className="mx-5 mt-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Content Area */}
        <div className="p-5 overflow-y-auto space-y-4 no-scrollbar">
          {/* Create or Edit Form */}
          {(isCreating || editingAccountId) ? (
            <form
              onSubmit={isCreating ? handleSaveCreate : handleSaveEdit}
              className="p-4 rounded-2xl bg-[#F2F2F7] dark:bg-[#2C2C2E] space-y-3.5 border border-[#E5E5EA] dark:border-[#3A3A3C]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1C1C1E] dark:text-white uppercase tracking-wider">
                  {isCreating
                    ? language === 'ar'
                      ? 'إنشاء حساب تجاري جديد'
                      : 'Create Business Account'
                    : language === 'ar'
                    ? 'تعديل بيانات الحساب'
                    : 'Edit Account Profile'}
                </span>
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs text-[#8E8E93] hover:text-[#007AFF]"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
              </div>

              {/* Account Name */}
              <div>
                <label className="block text-[11px] font-semibold text-[#8E8E93] mb-1">
                  {language === 'ar' ? 'اسم الحساب (فريد وغير مكرر)' : 'Account Name (Must be unique)'} *
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  placeholder={language === 'ar' ? 'مثال: شركة التجارة والخدمات' : 'e.g. Trading & Commercial Services'}
                  maxLength={40}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1C1C1E] text-sm text-[#1C1C1E] dark:text-white border border-[#D1D1D6] dark:border-[#38383A] focus:border-[#007AFF] outline-none"
                  autoFocus
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] font-semibold text-[#8E8E93] mb-1">
                  {language === 'ar' ? 'وصف أو نشاط الحساب' : 'Business Activity / Notes'}
                </label>
                <input
                  type="text"
                  value={descInput}
                  onChange={e => setDescInput(e.target.value)}
                  placeholder="e.g. Clean energy audits, commercial contracts"
                  maxLength={70}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1C1C1E] text-sm text-[#1C1C1E] dark:text-white border border-[#D1D1D6] dark:border-[#38383A] focus:border-[#007AFF] outline-none"
                />
              </div>

              {/* Icon Selector */}
              <div>
                <label className="block text-[11px] font-semibold text-[#8E8E93] mb-1.5">
                  {language === 'ar' ? 'الأيقونة الرمزية' : 'Badge Icon'}
                </label>
                <div className="flex gap-2">
                  {AVAILABLE_ICONS.map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedIcon(item.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                        selectedIcon === item.id
                          ? 'bg-white dark:bg-[#1C1C1E] border-[#007AFF] text-[#007AFF] shadow-sm'
                          : 'border-transparent text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
                      }`}
                    >
                      {renderIcon(item.id, 'h-3.5 w-3.5')}
                      <span className="text-[10px]">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Presets */}
              <div>
                <label className="block text-[11px] font-semibold text-[#8E8E93] mb-1.5">
                  {language === 'ar' ? 'اللون المميز للحساب' : 'Accent Color'}
                </label>
                <div className="flex items-center gap-2">
                  {COLOR_PRESETS.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`h-7 w-7 rounded-full transition-transform flex items-center justify-center ${
                        selectedColor === c ? 'scale-110 ring-2 ring-offset-2 ring-[#007AFF]' : 'opacity-85 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c }}
                    >
                      {selectedColor === c && <Check className="h-3.5 w-3.5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#007AFF] text-white text-xs font-bold hover:bg-[#0062CC] transition-colors shadow-md shadow-blue-500/20"
                >
                  {isCreating
                    ? language === 'ar'
                      ? 'حفظ وإنشاء الحساب'
                      : 'Create Account'
                    : language === 'ar'
                    ? 'حفظ التغييرات'
                    : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : null}

          {/* Accounts List */}
          <div className="space-y-2">
            {accounts.map(acc => {
              const isActive = acc.id === activeAccountId;
              const balance = getAccountBalance(acc.id);
              const isPersonal = acc.type === 'personal';

              return (
                <div
                  key={acc.id}
                  className={`group relative flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                    isActive
                      ? 'border-[#007AFF] bg-blue-50/50 dark:bg-blue-950/20 shadow-sm ring-1 ring-[#007AFF]/30'
                      : 'border-[#E5E5EA] dark:border-[#38383A] bg-white dark:bg-[#1C1C1E] hover:border-[#D1D1D6]'
                  }`}
                >
                  {/* Click to activate */}
                  <button
                    onClick={() => {
                      onSelectAccount(acc.id);
                      onClose();
                    }}
                    className="flex items-center gap-3 flex-1 text-left min-w-0"
                  >
                    <div
                      className="h-10 w-10 rounded-2xl flex items-center justify-center text-white shadow-sm shrink-0"
                      style={{ backgroundColor: acc.color || '#007AFF' }}
                    >
                      {renderIcon(acc.icon, 'h-5 w-5')}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-sm text-[#1C1C1E] dark:text-white truncate">
                          {acc.name}
                        </span>
                        <span
                          className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                            isPersonal
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}
                        >
                          {isPersonal
                            ? language === 'ar'
                              ? 'حساب شخصي'
                              : 'Personal Vault'
                            : language === 'ar'
                            ? 'حساب تجاري'
                            : 'Business Entity'}
                        </span>
                        {isPersonal && (
                          <span className="text-[9px] text-[#8E8E93] bg-[#F2F2F7] dark:bg-[#2C2C2E] px-1.5 py-0.5 rounded">
                            {language === 'ar' ? 'الافتراضي' : 'Default'}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-semibold text-[#8E8E93]">
                          {language === 'ar' ? 'الرصيد:' : 'Balance:'}{' '}
                          <span className={balance >= 0 ? 'text-[#34C759]' : 'text-rose-500 font-bold'}>
                            {formatCurrency(balance)}
                          </span>
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Right side controls */}
                  <div className="flex items-center gap-1 ml-2">
                    {isActive ? (
                      <div className="h-6 w-6 rounded-full bg-[#007AFF] text-white flex items-center justify-center shrink-0">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          onSelectAccount(acc.id);
                          onClose();
                        }}
                        className="px-2.5 py-1 rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E] text-[11px] font-semibold text-[#1C1C1E] dark:text-white hover:bg-[#E5E5EA] transition-colors"
                      >
                        {language === 'ar' ? 'تفعيل' : 'Switch'}
                      </button>
                    )}

                    {/* Edit button */}
                    <button
                      onClick={() => handleStartEdit(acc)}
                      title="Edit Account"
                      className="p-1.5 rounded-lg text-[#8E8E93] hover:text-[#007AFF] hover:bg-[#F2F2F7] dark:hover:bg-[#2C2C2E] transition-colors"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>

                    {/* Delete button (Forbidden for personal account) */}
                    {!isPersonal && (
                      <button
                        onClick={() => handleDelete(acc.id)}
                        title="Delete Business Account"
                        className="p-1.5 rounded-lg text-[#8E8E93] hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Create Business Account Button */}
          {!isCreating && !editingAccountId && accounts.length < 6 && (
            <button
              onClick={handleStartCreate}
              className="w-full py-3 rounded-2xl border-2 border-dashed border-[#D1D1D6] dark:border-[#3A3A3C] flex items-center justify-center gap-2 text-xs font-bold text-[#007AFF] hover:bg-[#F2F2F7] dark:hover:bg-[#2C2C2E] transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>
                {language === 'ar'
                  ? 'إضافة حساب تجاري جديد (حتى 5 شركات)'
                  : 'Add Independent Business Account (Max 5)'}
              </span>
            </button>
          )}

          {/* Quick Transfer Banner */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-900/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-[#007AFF] text-white flex items-center justify-center">
                <ArrowRightLeft className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1C1C1E] dark:text-white">
                  {language === 'ar' ? 'تحويل الأموال بين الحسابات' : 'Cross-Account Transfers'}
                </p>
                <p className="text-[10px] text-[#8E8E93]">
                  {language === 'ar'
                    ? 'تحويل فوري متزامن بين الحساب الشخصي والشركات'
                    : 'Move capital seamlessly between personal & business ledgers'}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenTransfer();
              }}
              className="px-3 py-1.5 rounded-xl bg-[#007AFF] text-white text-xs font-bold hover:bg-[#0062CC] transition-colors shadow-sm"
            >
              {language === 'ar' ? 'تحويل' : 'Transfer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
