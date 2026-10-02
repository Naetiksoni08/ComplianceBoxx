"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  FileText,
  Send,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: "consultation",
    number: "01",
    title: "Free Consultation",
    description: "Share your requirements, get expert advice on what you need — no cost, no obligation.",
    icon: MessageSquare,
  },
  {
    id: "documents",
    number: "02",
    title: "Document Collection",
    description: "We guide you through simple documentation, 100% online, no paperwork hassle.",
    icon: FileText,
  },
  {
    id: "filing",
    number: "03",
    title: "Filing & Processing",
    description: "Our experts handle the entire filing process with government portals, tracked in real-time.",
    icon: Send,
  },
  {
    id: "approval",
    number: "04",
    title: "Approval & Ongoing Support",
    description: "Get your compliance certificate/approval, plus continued support for renewals and updates.",
    icon: ShieldCheck,
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="process-heading"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[250px] w-[250px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Our Process
          </span>
          <motion.h2
            id="process-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-[1.15]"
          >
            Getting Compliant is Just{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-accent to-amber-500 bg-clip-text text-transparent">
                4 Steps Away
              </span>
              <motion.span
                className="absolute bottom-2 left-0 right-0 h-4 bg-accent/20 -z-10 rounded"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                aria-hidden="true"
              />
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-5 text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            Simple, fast, and fully online. We handle the complexity — you focus on your business.
          </motion.p>
        </motion.div>

        {/* Steps Container */}
        <div className="relative">
          {/* Desktop: Horizontal connecting line */}
          <motion.div
            className="hidden lg:absolute top-[60px] left-[7.5%] right-[7.5%] h-0.5"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: "left center" }}
            aria-hidden="true"
          >
            <div className="w-full h-full bg-dashed border-t border-primary/20" />
          </motion.div>

          {/* Steps Grid - equal height cards */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-0 items-stretch relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative flex flex-col h-full px-4"
              >
                {/* Step Number Badge */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="mb-4 text-5xl lg:text-6xl font-heading font-extrabold text-accent/20 leading-none text-center"
                  aria-hidden="true"
                >
                  {step.number}
                </motion.div>

                {/* Step Card - stretches to fill wrapper */}
                <motion.article
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.45 + index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ y: -4, boxShadow: "0 20px 40px -12px rgb(30 58 138 / 0.15)" }}
                  className="group relative h-full flex flex-col rounded-2xl bg-card border border-border p-6 lg:p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
                >
                  {/* Icon */}
                  <motion.div
                    className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-light text-primary mb-4 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105 flex-shrink-0"
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    transition={{ duration: 0.2 }}
                    aria-hidden="true"
                  >
                    <step.icon className="h-7 w-7" strokeWidth={2} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 flex-shrink-0">
                    {step.title}
                  </h3>

                  {/* Description - takes remaining space */}
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {step.description}
                  </p>
                </motion.article>

                {/* Connecting Arrow (Desktop) */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:flex lg:absolute lg:top-[52px] lg:right-[-12px] lg:w-8 lg:h-8 lg:items-center lg:justify-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                    aria-hidden="true"
                  >
                    <motion.div
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </motion.div>
                  </motion.div>
                )}

                {/* Vertical Connecting Line (Mobile) */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="lg:hidden absolute left-[calc(50%-1px)] top-full bottom-0 w-px"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ transformOrigin: "top center" }}
                    aria-hidden="true"
                  >
                    <div className="h-full bg-dashed border-l border-primary/20" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-16 lg:mt-20 text-center"
        >
          <p className="text-lg text-muted-foreground mb-4">Ready to get started?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Book Free Consultation
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}