'use client';

import { useState, useEffect } from 'react';

interface CountUpOptions {
  duration?: number; // in milliseconds
  decimals?: number;
  delay?: number;
  triggerKey?: number | string;
}

export function useCountUp(
  target: number,
  options: CountUpOptions = {}
): number {
  const { duration = 1600, decimals = 0, delay = 150, triggerKey = 0 } = options;
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(0); // Reset to 0 whenever target or triggerKey changes
    let startTimestamp: number | null = null;
    let animationFrameId: number;
    let delayTimeoutId: NodeJS.Timeout;

    const startAnimation = () => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);

        // Quintic ease-out curve for smooth deceleration
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const current = easeOut * target;

        if (decimals === 0) {
          setValue(Math.round(current));
        } else {
          const factor = Math.pow(10, decimals);
          setValue(Math.round(current * factor) / factor);
        }

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          setValue(target);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    };

    delayTimeoutId = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(delayTimeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration, decimals, delay, triggerKey]);

  return value;
}
