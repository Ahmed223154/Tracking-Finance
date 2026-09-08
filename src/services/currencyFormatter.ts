import { StorageService } from './storage';

export class CurrencyFormatter {
  static format(amount: number, currency?: string, lang?: 'en' | 'ar'): string {
    const currentLang = lang || StorageService.getLanguage();
    const isAr = currentLang === 'ar';
    const currSymbol = currency || (isAr ? 'د.ع' : 'IQD');
    const formatted = Math.round(amount).toLocaleString(isAr ? 'ar-IQ' : 'en-US');
    return `${formatted} ${currSymbol}`;
  }

  static formatSigned(amount: number, type: 'income' | 'expense' | string, currency?: string, lang?: 'en' | 'ar'): string {
    const prefix = type.toLowerCase() === 'income' ? '+' : '-';
    return `${prefix}${this.format(amount, currency, lang)}`;
  }
}

