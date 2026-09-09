import { StorageService } from './storage';

/**
 * Formats a user input string into real-time thousands-separated representation (e.g. 1000000 -> 1,000,000).
 * Preserves decimal points and trailing fractional zeroes (e.g. "1,000." or "1,000.00").
 * Converts Arabic-Indic digits (٠-٩) to Western standard (0-9).
 */
export function formatAmountInput(rawVal: string | number | null | undefined): string {
  if (rawVal === null || rawVal === undefined) return '';
  const str = rawVal.toString();
  if (!str.trim()) return '';

  // Normalize Arabic-Indic numerals (٠١٢٣٤٥٦٧٨٩) to standard (0-9)
  const arabicIndic = '٠١٢٣٤٥٦٧٨٩';
  const normalized = str.replace(/[٠-٩]/g, d => arabicIndic.indexOf(d).toString());

  // Remove existing commas, spaces, and unwanted characters
  const clean = normalized.replace(/,/g, '').replace(/\s/g, '');

  // Allow only digits and at most one decimal point
  const dotIndex = clean.indexOf('.');
  let integerPart = '';
  let decimalPart: string | null = null;

  if (dotIndex !== -1) {
    integerPart = clean.slice(0, dotIndex).replace(/\D/g, '');
    // Take everything after the first dot, keep only digits
    decimalPart = clean.slice(dotIndex + 1).replace(/\D/g, '');
  } else {
    integerPart = clean.replace(/\D/g, '');
  }

  // Format integer part with thousands separators
  let formattedInteger = '';
  if (integerPart) {
    // If integer part has multiple characters and starts with zeros, trim leading zeros (e.g. "05" -> "5", except single "0")
    if (integerPart.length > 1 && integerPart.startsWith('0')) {
      const stripped = integerPart.replace(/^0+(?=\d)/, '');
      formattedInteger = stripped.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }

  // If decimal point was entered, append decimal part
  if (decimalPart !== null) {
    const prefix = formattedInteger || '0';
    return `${prefix}.${decimalPart}`;
  }

  return formattedInteger;
}

/**
 * Parses a formatted string (e.g. "1,000,000.50") into a clean raw JavaScript number (1000000.5).
 * Strips out commas before parsing. Returns NaN if empty or invalid.
 */
export function parseRawAmount(formattedVal: string | number | null | undefined): number {
  if (typeof formattedVal === 'number') {
    return isNaN(formattedVal) ? NaN : formattedVal;
  }
  if (!formattedVal || !formattedVal.toString().trim()) {
    return NaN;
  }
  const arabicIndic = '٠١٢٣٤٥٦٧٨٩';
  const normalized = formattedVal.toString().replace(/[٠-٩]/g, d => arabicIndic.indexOf(d).toString());
  const clean = normalized.replace(/,/g, '').trim();
  return parseFloat(clean);
}

/**
 * Formats an initial numeric value into a formatted string (e.g. 1000000 -> "1,000,000")
 */
export function formatInitialAmount(num: number | null | undefined): string {
  if (num === undefined || num === null || isNaN(num) || num === 0) return '';
  return formatAmountInput(num.toString());
}

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


