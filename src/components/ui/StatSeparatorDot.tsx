"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type StatSeparatorDotProps = {
  delay?: number;
  trigger?: "view" | "mount";
  className?: string;
};

export function StatSeparatorDot({
  delay = 0,
  trigger = "view",
  className,
}: StatSeparatorDotProps) {
  const animated =
    trigger === "view"
      ? ({ whileInView: { scale: 1, opacity: 1 }, viewport: { once: true } } as const)
      : ({ animate: { scale: 1, opacity: 1 } } as const);

  return (
    <motion.span
      className={cn(
        "pointer-events-none absolute top-1/2 left-full hidden h-2 w-2 translate-x-3 -translate-y-1/2 rounded-full bg-accent ring-4 ring-accent/15 lg:block",
        className
      )}
      initial={{ scale: 0, opacity: 0 }}
      {...animated}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      aria-hidden="true"
    />
  );
}