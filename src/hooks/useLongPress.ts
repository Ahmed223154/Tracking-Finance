import React, { useRef, useCallback } from 'react';

interface UseLongPressOptions {
  delay?: number;
  moveThreshold?: number;
}

export function useLongPress(
  onLongPress: () => void,
  onClick?: () => void,
  options: UseLongPressOptions = {}
) {
  const { delay = 500, moveThreshold = 8 } = options;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMovedRef = useRef(false);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const longPressTriggeredRef = useRef(false);

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = useCallback(
    (clientX: number, clientY: number) => {
      longPressTriggeredRef.current = false;
      isMovedRef.current = false;
      startPosRef.current = { x: clientX, y: clientY };

      cancel();

      timerRef.current = setTimeout(() => {
        // Only trigger long press if user hasn't scrolled/moved
        if (!isMovedRef.current) {
          longPressTriggeredRef.current = true;
          if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
            try {
              navigator.vibrate(50);
            } catch {
              // vibration not permitted or supported
            }
          }
          onLongPress();
        }
      }, delay);
    },
    [onLongPress, delay, cancel]
  );

  const end = useCallback(() => {
    cancel();
    startPosRef.current = null;
  }, [cancel]);

  const move = useCallback(
    (clientX: number, clientY: number) => {
      if (!startPosRef.current) return;
      const distance = Math.hypot(
        clientX - startPosRef.current.x,
        clientY - startPosRef.current.y
      );
      if (distance > moveThreshold) {
        isMovedRef.current = true;
        cancel();
      }
    },
    [cancel, moveThreshold]
  );

  return {
    onMouseDown: (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      start(e.clientX, e.clientY);
    },
    onMouseUp: () => end(),
    onMouseLeave: () => end(),
    onTouchStart: (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
        start(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    onTouchEnd: () => end(),
    onTouchCancel: () => {
      isMovedRef.current = true;
      end();
    },
    onTouchMove: (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
        move(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    onClick: (e: React.MouseEvent) => {
      // If a long press was triggered, suppress the click event!
      if (longPressTriggeredRef.current) {
        e.preventDefault();
        e.stopPropagation();
        longPressTriggeredRef.current = false;
        return;
      }
      // If user moved their finger / scrolled, suppress the click
      if (isMovedRef.current) {
        isMovedRef.current = false;
        return;
      }
      if (onClick) {
        onClick();
      }
    },
  };
}
