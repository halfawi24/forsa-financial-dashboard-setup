'use client';

import { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
}

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  decimals = 0
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    const startValue = displayValue;
    const difference = value - startValue;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsedTime / duration, 1);

      const currentValue = startValue + difference * progress;
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration, displayValue]);

  const formattedValue = displayValue.toFixed(decimals);

  return (
    <span>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}
