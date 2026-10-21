import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';

interface AutoCounterProps {
  value: number | string;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  delay?: number;
}

export const AutoCounter: React.FC<AutoCounterProps> = ({
  value,
  duration = 1.4,
  className = '',
  prefix: manualPrefix,
  suffix: manualSuffix,
  delay = 0,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Parse string values like "100%", "~2", "$100B+", "400+", "1.4B", "5"
  const rawString = String(value);
  const match = rawString.match(/^([^0-9.]*)(\d+(?:\.\d+)?)(.*)$/);

  const prefix = manualPrefix ?? (match ? match[1] : '');
  const targetNumber = match ? parseFloat(match[2]) : 0;
  const suffix = manualSuffix ?? (match ? match[3] : '');
  const isDecimal = match && match[2].includes('.');

  const [displayNumber, setDisplayNumber] = useState<number>(0);

  useEffect(() => {
    if (!isInView || isNaN(targetNumber)) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const timeout = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        
        // Ease out quad
        const easedProgress = 1 - (1 - progress) * (1 - progress);
        const current = targetNumber * easedProgress;

        setDisplayNumber(current);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          setDisplayNumber(targetNumber);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, targetNumber, duration, delay]);

  const formattedNumber = isDecimal
    ? displayNumber.toFixed(1)
    : Math.round(displayNumber).toString();

  // If the value isn't a parseable number, fallback to raw value
  if (!match) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={`inline-block tabular-nums ${className}`}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
};
