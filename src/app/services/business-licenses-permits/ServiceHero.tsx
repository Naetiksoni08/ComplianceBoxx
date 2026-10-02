"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ListChecks,
  Building2,
  Globe,
  ArrowRight,
  Sparkles,
  Shield,
  CheckCircle2,
  FileText,
  Award,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { StatSeparatorDot } from "@/components/ui/StatSeparatorDot";

const heroStats = [
  { value: "8+ Types", label: "License Types", icon: ListChecks },
  { value: "State & Central", label: "Coverage", icon: Building2 },
  { target: 25, label: "Years Experience", icon: Award, suffix: "+" },
  { target: 100, label: "Online Application", icon: Globe, suffix: "%" },
];

const floatingIcons = [
  { icon: Shield, x: 8, y: 15, delay: 0 },
  { icon: Building2, x: 88, y: 20, delay: 1 },
  { icon: CheckCircle2, x: 15, y: 75, delay: 2 },
  { icon: FileText, x: 85, y: 80, delay: 3 },
];

export function ServiceHero() {
  return (
    <section
      id="service-hero"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="service-hero-heading"
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] rounded-full bg-primary/5 blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[200px] rounded-full bg-primary/3 blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-50" aria-hidden="true">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating Icons */}
        {floatingIcons.map(({ icon: Icon, x, y, delay }) => (
          <motion.div
            key={x + y}
            className="absolute flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary/50"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ opacity: 0, scale: 0.5, rotate: -45, y: 0, x: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: [0, -10, 0], x: [0, 5, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.8 + delay * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
              scale: { duration: 0.8, delay: 0.8 + delay * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
              rotate: { duration: 0.8, delay: 0.8 + delay * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            aria-hidden="true"
          >
            <Icon className="h-6 w-6" />
          </motion.div>
        ))}
      </div>

      {/* Gradient blend at bottom for smooth transition to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Eyebrow Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Business Licenses & Permits
          </motion.span>

          {/* Headline */}
          <motion.h1
            id="service-hero-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-foreground tracking-tight leading-[1.1]"
          >
            Every License Your Business Needs to Operate{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-accent to-amber-500 bg-clip-text text-transparent">
                Legally
              </span>
              <motion.span
                className="absolute bottom-2 left-0 right-0 h-4 bg-accent/20 -z-10 rounded"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                aria-hidden="true"
              />
            </span>
          </motion.h1>

          {/* Supporting Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Beyond core registrations, most businesses need additional state and central
            licenses to legally operate. We identify exactly what your business needs and
            handle the full application process — fully online.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/#contact"
              className="group w-full sm:w-auto rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Book Free Consultation
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
            <Link
              href="#pricing"
              className="group w-full sm:w-auto rounded-xl border-2 border-primary px-8 py-4 text-lg font-semibold text-primary transition-all duration-200 hover:bg-primary-lighter hover:shadow-lg hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Check Pricing
            </Link>
          </motion.div>

          {/* Quick Stat Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-12"
            role="list"
            aria-label="Key statistics"
          >
            <div className="grid grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {heroStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.55 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative flex flex-col items-center gap-3 text-center"
                  role="listitem"
                >
                  {/* Icon Circle */}
                  <motion.div
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary"
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                    aria-hidden="true"
                  >
                    <stat.icon className="h-7 w-7" strokeWidth={2} />
                  </motion.div>

                  {/* Stat Value */}
                  <div className="relative flex w-full items-center justify-center">
                    <span
                      className={cn(
                        "font-heading font-bold text-foreground leading-tight text-balance px-1",
                        stat.target !== undefined && stat.target !== null
                        ? "text-3xl sm:text-4xl leading-none"
                        : "text-2xl sm:text-3xl"
                      )}
                    >
                      {stat.target !== undefined && stat.target !== null ? (
                        <AnimatedCounter
                          target={stat.target}
                          suffix={stat.suffix || ""}
                          duration={1.5}
                          className="inline-block"
                          autoStart
                        />
                      ) : (
                        stat.value
                      )}
                    </span>
                    {index < heroStats.length - 1 && (
                      <StatSeparatorDot delay={0.7 + index * 0.08} />
                    )}
                  </div>

                  {/* Label */}
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