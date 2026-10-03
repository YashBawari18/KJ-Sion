'use client';

import { useState, useEffect, useRef } from 'react';

interface CountUpOptions {
  duration?: number; // ms
  decimals?: number;
  delay?: number;
  triggerKey?: number | string;
}

export function useCountUp(
  target: number,
  options: CountUpOptions = {}
): number {
  const { duration = 1600, decimals = 0, delay = 150, triggerKey = 0 } = options;

  // Start at target so there's no flash of 0 on re-render
  const [value, setValue] = useState(target);
  const prevTriggerKey = useRef(triggerKey);
  const prevTarget = useRef(target);
  const animationFrameId = useRef<number>(0);
  const delayTimeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only animate when triggerKey changes (replay) or on first mount
    const isFirstMount = prevTarget.current === target && prevTriggerKey.current === triggerKey;

    // Always track latest values
    const shouldAnimate =
      triggerKey !== prevTriggerKey.current || prevTarget.current !== target || value === target;

    prevTriggerKey.current = triggerKey;
    prevTarget.current = target;

    // Cancel any ongoing animation
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    if (delayTimeoutId.current) clearTimeout(delayTimeoutId.current);

    // If the current value already equals target, just run the animation from 0 only if triggerKey changed
    const startFrom = shouldAnimate ? 0 : value;

    // Reset only when we should animate
    if (shouldAnimate) setValue(0);

    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Quartic ease-out
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const current = startFrom + easeOut * (target - startFrom);

      if (decimals === 0) {
        setValue(Math.round(current));
      } else {
        const factor = Math.pow(10, decimals);
        setValue(Math.round(current * factor) / factor);
      }

      if (progress < 1) {
        animationFrameId.current = requestAnimationFrame(step);
      } else {
        // Lock in exact target at the end — never stays at 0
        setValue(target);
      }
    };

    delayTimeoutId.current = setTimeout(() => {
      animationFrameId.current = requestAnimationFrame(step);
    }, delay);

    return () => {
      if (delayTimeoutId.current) clearTimeout(delayTimeoutId.current);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      // On cleanup, lock in the target so component always shows the final value
      setValue(target);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerKey]); // Only re-run animation when triggerKey changes (replay button)

  return value;
}
