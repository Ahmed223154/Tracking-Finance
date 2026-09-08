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
  const { delay = 500, moveThreshold = 10 } = options;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPressRef = useRef(false);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);

  const start = useCallback(
    (clientX: number, clientY: number) => {
      isLongPressRef.current = false;
      startPosRef.current = { x: clientX, y: clientY };

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        isLongPressRef.current = true;
        if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
          try {
            navigator.vibrate(50);
          } catch {
            // vibration not permitted or supported
          }
        }
        onLongPress();
      }, delay);
    },
    [onLongPress, delay]
  );

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const end = useCallback(
    (triggerClick = true) => {
      cancel();
      if (triggerClick && !isLongPressRef.current && onClick) {
        onClick();
      }
      isLongPressRef.current = false;
    },
    [cancel, onClick]
  );

  const move = useCallback(
    (clientX: number, clientY: number) => {
      if (!startPosRef.current) return;
      const distance = Math.hypot(
        clientX - startPosRef.current.x,
        clientY - startPosRef.current.y
      );
      if (distance > moveThreshold) {
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
    onMouseUp: () => end(true),
    onMouseLeave: () => end(false),
    onTouchStart: (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
        start(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    onTouchEnd: () => end(true),
    onTouchCancel: () => end(false),
    onTouchMove: (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
        move(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
  };
}
