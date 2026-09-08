import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations, TRANSLATIONS, translateCategory } from '../services/i18n';
import { StorageService } from '../services/storage';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRTL: boolean;
  dir: 'rtl' | 'ltr';
  formatCurrency: (amount: number, currency?: string) => string;
  formatSignedCurrency: (amount: number, type: 'income' | 'expense' | string, currency?: string) => string;
  translateCat: (name: string) => string;
}

export const defaultI18nContext: I18nContextType = {
  language: 'en',
  setLanguage: () => {},
  t: TRANSLATIONS.en,
  isRTL: false,
  dir: 'ltr',
  formatCurrency: (amount: number, currency: string = 'IQD'): string => {
    const formatted = Math.round(amount).toLocaleString('en-US');
    return `${formatted} ${currency}`;
  },
  formatSignedCurrency: (
    amount: number,
    type: 'income' | 'expense' | string,
    currency: string = 'IQD'
  ): string => {
    const prefix = type.toLowerCase() === 'income' ? '+' : '-';
    const formatted = Math.round(amount).toLocaleString('en-US');
    return `${prefix}${formatted} ${currency}`;
  },
  translateCat: (name: string): string => translateCategory(name, 'en'),
};

export const I18nContext = createContext<I18nContextType>(defaultI18nContext);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      return StorageService.getLanguage();
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    StorageService.setLanguage(lang);
    if (lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
  };

  useEffect(() => {
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
  }, [language]);

  const t = TRANSLATIONS[language];
  const isRTL = language === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';

  const formatCurrency = (amount: number, currency: string = 'IQD'): string => {
    const formatted = Math.round(amount).toLocaleString(language === 'ar' ? 'ar-IQ' : 'en-US');
    const currSymbol = language === 'ar' ? 'د.ع' : currency;
    return `${formatted} ${currSymbol}`;
  };

  const formatSignedCurrency = (
    amount: number,
    type: 'income' | 'expense' | string,
    currency: string = 'IQD'
  ): string => {
    const prefix = type.toLowerCase() === 'income' ? '+' : '-';
    return `${prefix}${formatCurrency(amount, currency)}`;
  };

  const translateCat = (name: string): string => {
    return translateCategory(name, language);
  };

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isRTL,
        dir,
        formatCurrency,
        formatSignedCurrency,
        translateCat,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  return context || defaultI18nContext;
};
