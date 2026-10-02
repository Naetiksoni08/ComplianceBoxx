"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  CheckCircle2,
  Users,
  Clock,
  Building2,
  FileText,
  Gavel,
  Scale,
  Target,
  Sparkles,
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { StatSeparatorDot } from "@/components/ui/StatSeparatorDot";

const stats = [
  { target: 10000, label: "Clients Served", icon: Users, suffix: "+" },
  { target: 25, label: "Years Experience", icon: Clock, suffix: "+" },
  { target: 100, label: "Online Process", icon: CheckCircle2, suffix: "%" },
  { target: null, label: "Service Coverage", icon: Target, value: "Delhi NCR" },
];

const floatingIcons = [
  { icon: Shield, x: 8, y: 12, delay: 0 },
  { icon: FileText, x: 88, y: 18, delay: 1 },
  { icon: Gavel, x: 15, y: 78, delay: 2 },
  { icon: Scale, x: 85, y: 82, delay: 3 },
  { icon: Building2, x: 50, y: 8, delay: 4 },
  { icon: CheckCircle2, x: 92, y: 62, delay: 5 },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="hero-heading"
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
        {/* Left Content - Now centered full-width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Eyebrow Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Trusted by 500+ Businesses Across India
          </motion.span>

          {/* Headline */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-foreground tracking-tight leading-[1.1]"
          >
            Your Business, 100%{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-accent to-amber-500 bg-clip-text text-transparent">
                Compliant
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

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Complete compliance solutions for startups, SMEs & individuals — company
            registration, GST, ROC/MCA, trademarks, tax filing, FSSAI & labour law.
            Expert guidance, fully online, Pan-India.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/#contact"
              className="group w-full sm:w-auto rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Book Free Consultation
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
            <a
              href="/#services"
              className="group w-full sm:w-auto rounded-xl border-2 border-primary px-8 py-4 text-lg font-semibold text-primary transition-all duration-200 hover:bg-primary-lighter hover:shadow-lg hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Explore Services
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-12"
            role="list"
            aria-label="Trust indicators"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.55 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative flex flex-col items-center gap-3 text-center"
                  role="listitem"
                >
                  {/* Icon Circle */}
                  <motion.div
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                    aria-hidden="true"
                  >
                    <stat.icon className="h-7 w-7" strokeWidth={2} />
                  </motion.div>

                  {/* Stat Value */}
                  <div className="relative flex w-full items-center justify-center">
                    <span className="text-3xl sm:text-4xl font-heading font-bold text-foreground leading-none">
                      {stat.target !== null ? (
                        <AnimatedCounter
                          target={stat.target}
                          suffix={stat.suffix}
                          duration={1.8}
                          className="inline-block"
                          autoStart
                        />
                      ) : (
                        stat.value
                      )}
                    </span>
                    {index < stats.length - 1 && (
                      <StatSeparatorDot trigger="mount" delay={0.7 + index * 0.08} />
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