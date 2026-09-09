import React, { useState, useEffect } from 'react';
import { Minus, Plus, RotateCcw } from 'lucide-react';
import { formatAmountInput, parseRawAmount } from '../../../services/currencyFormatter';

export interface PresetOption {
  label: string;
  delta?: number; // relative addition to current value
  absolute?: number; // direct value to set (e.g. 0 or base)
  isReset?: boolean;
}

interface HybridPresetInputProps {
  id?: string;
  label: string;
  subLabel?: string;
  value: number;
  unit: string;
  step: number;
  min?: number;
  max?: number;
  presets: PresetOption[];
  isCurrency?: boolean;
  onChange: (nextValue: number) => void;
  accentColor?: 'blue' | 'green' | 'amber' | 'purple';
}

export const HybridPresetInput: React.FC<HybridPresetInputProps> = ({
  id,
  label,
  subLabel,
  value,
  unit,
  step,
  min = 0,
  max = 100000000,
  presets,
  isCurrency = true,
  onChange,
  accentColor = 'blue',
}) => {
  // Local string state to allow natural typing with commas
  const [displayStr, setDisplayStr] = useState<string>(() => {
    return isCurrency ? formatAmountInput(value.toString()) : value.toString();
  });

  // Keep display in sync when numeric value changes from steppers/presets/reset
  useEffect(() => {
    setDisplayStr(isCurrency ? formatAmountInput(value.toString()) : value.toString());
  }, [value, isCurrency]);

  const handleStepMinus = () => {
    const nextVal = Math.max(min, value - step);
    onChange(nextVal);
  };

  const handleStepPlus = () => {
    const nextVal = Math.min(max, value + step);
    onChange(nextVal);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    if (isCurrency) {
      const formatted = formatAmountInput(inputVal);
      setDisplayStr(formatted);
      const parsed = parseRawAmount(formatted);
      if (!isNaN(parsed)) {
        onChange(Math.min(max, Math.max(min, parsed)));
      } else if (formatted === '') {
        onChange(min);
      }
    } else {
      // Direct numeric input (e.g. months)
      const digitsOnly = inputVal.replace(/\D/g, '');
      setDisplayStr(digitsOnly);
      const parsed = parseInt(digitsOnly, 10);
      if (!isNaN(parsed)) {
        onChange(Math.min(max, Math.max(min, parsed)));
      } else if (digitsOnly === '') {
        onChange(min);
      }
    }
  };

  const handleInputBlur = () => {
    // Re-format cleanly on blur
    setDisplayStr(isCurrency ? formatAmountInput(value.toString()) : value.toString());
  };

  const handlePresetClick = (preset: PresetOption) => {
    if (preset.absolute !== undefined) {
      onChange(Math.min(max, Math.max(min, preset.absolute)));
    } else if (preset.delta !== undefined) {
      onChange(Math.min(max, Math.max(min, value + preset.delta)));
    }
  };

  // Color mappings
  const accentBorder = {
    blue: 'focus-within:border-[#007AFF] focus-within:ring-[#007AFF]/20',
    green: 'focus-within:border-[#34C759] focus-within:ring-[#34C759]/20',
    amber: 'focus-within:border-[#FF9500] focus-within:ring-[#FF9500]/20',
    purple: 'focus-within:border-[#AF52DE] focus-within:ring-[#AF52DE]/20',
  }[accentColor];

  const accentBadge = {
    blue: 'text-[#007AFF] bg-blue-50 dark:bg-blue-950/40 dark:text-blue-300',
    green: 'text-[#34C759] bg-green-50 dark:bg-green-950/40 dark:text-green-300',
    amber: 'text-[#FF9500] bg-amber-50 dark:bg-amber-950/40 dark:text-amber-300',
    purple: 'text-[#AF52DE] bg-purple-50 dark:bg-purple-950/40 dark:text-purple-300',
  }[accentColor];

  return (
    <div className="space-y-2.5 rounded-2xl bg-[#F9F9FB] p-3.5 border border-[#E5E5EA] dark:bg-[#1C1C1E] dark:border-[#3A3A3C] transition-all">
      {/* Header Label and Sublabel */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-bold text-[#1C1C1E] dark:text-white block">
            {label}
          </label>
          {subLabel && (
            <span className="text-[10px] text-[#8E8E93] block mt-0.5">
              {subLabel}
            </span>
          )}
        </div>

        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${accentBadge}`}>
          {isCurrency ? `${displayStr || '0'} ${unit}` : `${displayStr || '0'} ${unit}`}
        </span>
      </div>

      {/* Part 1: Stepper [ - ] + Direct Input Box + Stepper [ + ] */}
      <div className="flex items-center gap-2">
        {/* Decrement Button */}
        <button
          type="button"
          onClick={handleStepMinus}
          disabled={value <= min}
          aria-label="Decrease"
          className="flex h-11 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#1C1C1E] shadow-sm border border-[#E5E5EA] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 dark:bg-[#2C2C2E] dark:border-[#48484A] dark:text-white transition-transform"
        >
          <Minus className="h-4 w-4 stroke-[2.5]" />
        </button>

        {/* Precision Editable Input Box */}
        <div
          className={`flex flex-1 items-center justify-between rounded-xl bg-white px-3.5 py-1.5 shadow-sm border border-[#E5E5EA] dark:bg-[#2C2C2E] dark:border-[#48484A] transition-all focus-within:ring-2 ${accentBorder}`}
        >
          <input
            id={id}
            type="text"
            inputMode={isCurrency ? 'decimal' : 'numeric'}
            autoComplete="off"
            value={displayStr}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="w-full bg-transparent text-base font-black text-[#1C1C1E] focus:outline-none dark:text-white text-center sm:text-left"
            placeholder="0"
          />
          <span className="text-xs font-bold text-[#8E8E93] shrink-0 ml-1 select-none pointer-events-none">
            {unit}
          </span>
        </div>

        {/* Increment Button */}
        <button
          type="button"
          onClick={handleStepPlus}
          disabled={value >= max}
          aria-label="Increase"
          className="flex h-11 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#1C1C1E] shadow-sm border border-[#E5E5EA] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 dark:bg-[#2C2C2E] dark:border-[#48484A] dark:text-white transition-transform"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Part 2: Horizontal Quick-Adjustment Preset Pills (Chips) */}
      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
        {presets.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handlePresetClick(p)}
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold shadow-xs transition-all active:scale-95 ${
              p.isReset
                ? 'bg-gray-200/80 text-[#8E8E93] hover:text-[#1C1C1E] dark:bg-[#38383A] dark:text-[#C7C7CC] hover:bg-gray-300 dark:hover:bg-[#48484A]'
                : 'bg-white text-[#3A3A3C] border border-[#E5E5EA] hover:bg-blue-50/60 hover:text-[#007AFF] hover:border-blue-200 dark:bg-[#2C2C2E] dark:border-[#48484A] dark:text-[#E5E5EA] dark:hover:bg-blue-950/40 dark:hover:text-blue-300'
            }`}
          >
            {p.isReset && <RotateCcw className="h-3 w-3" />}
            <span>{p.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
