import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { formatAmountInput, parseRawAmount } from '../../services/currencyFormatter';

export interface AmountInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: string;
  onChangeValue?: (formattedValue: string, rawNumeric: number) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currencySymbol?: string;
  id?: string;
}

export const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
  (
    {
      value,
      onChangeValue,
      onChange,
      currencySymbol,
      className = '',
      placeholder,
      disabled,
      required,
      id,
      ...rest
    },
    ref
  ) => {
    const innerRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => innerRef.current!);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target;
      const rawVal = input.value;
      const cursor = input.selectionStart ?? rawVal.length;

      // Count non-comma characters before the cursor
      const nonCommaBefore = rawVal.slice(0, cursor).replace(/,/g, '').length;

      const formatted = formatAmountInput(rawVal);
      const rawNum = parseRawAmount(formatted);

      // Calculate new cursor position in formatted string
      let newCursor = formatted.length;
      if (formatted === '') {
        newCursor = 0;
      } else {
        let count = 0;
        for (let i = 0; i < formatted.length; i++) {
          if (formatted[i] !== ',') {
            count++;
          }
          if (count === nonCommaBefore) {
            newCursor = i + 1;
            break;
          }
        }
      }

      if (onChangeValue) {
        onChangeValue(formatted, rawNum);
      }

      if (onChange) {
        // Update input target value so standard onChange handler receives formatted string
        input.value = formatted;
        onChange(e);
      }

      // Preserve cursor position across React re-renders
      requestAnimationFrame(() => {
        if (innerRef.current && document.activeElement === innerRef.current) {
          try {
            innerRef.current.setSelectionRange(newCursor, newCursor);
          } catch {
            // Ignored if element unmounted or not focusable
          }
        }
      });
    };

    return (
      <input
        ref={innerRef}
        id={id}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={className}
        {...rest}
      />
    );
  }
);

AmountInput.displayName = 'AmountInput';
