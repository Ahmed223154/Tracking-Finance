import React, { useState, useEffect, useRef, memo } from 'react';

interface SmoothSimulatorSliderProps {
  id?: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  colorClass: string;
  textColorClass: string;
  unitLabel?: string;
  minLabel?: string;
  midLabel?: string;
  maxLabel?: string;
  onChange: (value: number) => void;
  formatValue: (val: number) => string;
}

/**
 * High-performance slider component designed for 60fps fluid drag interactions on mobile touchscreens.
 * Decouples immediate local thumb position/labels from heavy forecast recalculations,
 * uses a 120ms debounce for simulation updates with immediate flush on pointer/touch release,
 * and sets touch-action: none to avoid iOS Safari gesture stutter.
 */
export const SmoothSimulatorSlider: React.FC<SmoothSimulatorSliderProps> = memo(({
  id,
  label,
  value,
  min,
  max,
  step,
  colorClass,
  textColorClass,
  unitLabel,
  minLabel,
  midLabel,
  maxLabel,
  onChange,
  formatValue,
}) => {
  const [localValue, setLocalValue] = useState<number>(value);
  const timeoutRef = useRef<number | null>(null);
  const latestValRef = useRef<number>(value);
  latestValRef.current = localValue;

  // Synchronize when external value changes (e.g. on Reset or Plan switch)
  useEffect(() => {
    setLocalValue(value);
    latestValRef.current = value;
  }, [value]);

  // Clean up any pending timer on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVal = Number(e.target.value);
    // 60fps immediate local update for thumb and label
    setLocalValue(nextVal);
    latestValRef.current = nextVal;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce the heavy simulation calculation by 120ms
    timeoutRef.current = window.setTimeout(() => {
      onChange(nextVal);
      timeoutRef.current = null;
    }, 120);
  };

  const handleCommitImmediate = () => {
    // Immediately calculate final projected values on pointer up / touch end
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    onChange(latestValRef.current);
  };

  return (
    <div className="space-y-1.5 touch-none select-none">
      <div className="flex justify-between text-xs font-semibold">
        <span className="text-[#1C1C1E] dark:text-[#E5E5EA]">{label}</span>
        <span className={`font-black ${textColorClass}`}>
          +{formatValue(localValue)}{unitLabel || ''}
        </span>
      </div>

      <div className="relative py-1 touch-none">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue}
          onChange={handleChange}
          onPointerUp={handleCommitImmediate}
          onTouchEnd={handleCommitImmediate}
          onMouseUp={handleCommitImmediate}
          className={`w-full ${colorClass} h-2.5 bg-[#E5E5EA] dark:bg-[#38383A] rounded-lg cursor-pointer touch-none select-none`}
          style={{ touchAction: 'none' }}
        />
      </div>

      {(minLabel || midLabel || maxLabel) && (
        <div className="flex justify-between text-[10px] text-[#8E8E93] select-none">
          <span>{minLabel}</span>
          {midLabel && <span>{midLabel}</span>}
          <span>{maxLabel}</span>
        </div>
      )}
    </div>
  );
});

SmoothSimulatorSlider.displayName = 'SmoothSimulatorSlider';
