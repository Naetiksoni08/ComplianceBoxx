"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Award, Users, CheckCircle2, Target, Sparkles } from "lucide-react";
import { StatSeparatorDot } from "@/components/ui/StatSeparatorDot";

const stats = [
  { value: "25+", label: "Years Experience", icon: Award },
  { value: "10,000+", label: "Clients Served", icon: Users },
  { value: "100%", label: "Online Process", icon: CheckCircle2 },
  { value: "Pan-India", label: "Service Coverage", icon: Target },
];

export function AboutHero() {
  return (
    <section
      id="about-hero"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="about-hero-heading"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[250px] w-[250px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute inset-0 opacity-20">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#dots)" />
          </svg>
        </div>
      </div>

      <div className="relative mx-auto max-w-4xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            About ComplianceBoxx
          </motion.span>

          <motion.h1
            id="about-hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground tracking-tight leading-[1.1]"
          >
            Your Trusted Partner in{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-accent to-amber-500 bg-clip-text text-transparent">
                Compliance
              </span>
              <motion.span
                className="absolute bottom-2 left-0 right-0 h-4 bg-accent/20 -z-10 rounded"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                aria-hidden="true"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Founded in Delhi NCR over 25 years ago, ComplianceBoxx began as a family-run practice
            built on personal accountability — not a faceless portal. Today, we serve 1,400+ clients
            across India with the same care we&apos;d want for our own business. Every filing, every
            deadline, every conversation is handled by a named compliance manager you can reach on
            call, WhatsApp, or email.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-12"
            role="list"
            aria-label="Key statistics"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.value}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.55 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative flex flex-col items-center gap-3 text-center"
                  role="listitem"
                >
                  <motion.div
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                    aria-hidden="true"
                  >
                    <stat.icon className="h-7 w-7" strokeWidth={2} />
                  </motion.div>

                  <div className="relative flex w-full items-center justify-center">
                    <span className="text-3xl sm:text-4xl font-heading font-bold text-foreground leading-none">
                      {stat.value}
                    </span>
                    {index < stats.length - 1 && (
                      <StatSeparatorDot trigger="mount" delay={0.7 + index * 0.08} />
                    )}
                  </div>

                  <span className="text-sm text-muted-foreground leading-snug max-w-xs">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}