"use client";

import * as React from "react";
import { motion, useAnimationFrame } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  formatter?: (value: number) => string;
  autoStart?: boolean;
}

export function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1.5,
  className = "",
  formatter,
  autoStart = false,
}: AnimatedCounterProps) {
  const [count, setCount] = React.useState(0);
  const [hasStarted, setHasStarted] = React.useState(false);
  const [isComplete, setIsComplete] = React.useState(false);
  const startTime = React.useRef<number | null>(null);

  // Auto-start on mount for above-the-fold content
  React.useEffect(() => {
    if (autoStart && !hasStarted) {
      startTime.current = performance.now();
      setHasStarted(true);
    }
  }, [autoStart, hasStarted]);

  useAnimationFrame((time) => {
    if (!hasStarted || isComplete || startTime.current === null) return;

    const elapsed = (time - startTime.current) / 1000;
    const progress = Math.min(elapsed / duration, 1);

    const eased = 1 - Math.pow(1 - progress, 3);

    const current = Math.max(0, Math.round(target * eased));
    setCount(current);

    if (progress >= 1) {
      setCount(target);
      setIsComplete(true);
    }
  });

  const formattedValue = formatter
    ? formatter(count)
    : count.toLocaleString();

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {prefix}
      {formattedValue}
      {suffix}
    </motion.span>
  );
}