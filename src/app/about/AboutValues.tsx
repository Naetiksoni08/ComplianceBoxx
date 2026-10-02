"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Shield, Lightbulb, Handshake, Target, Heart } from "lucide-react";

const values = [
  {
    id: "integrity",
    title: "Integrity First",
    description:
      "We never compromise on ethics or cut corners. Every filing is accurate, every deadline met, every advice given in your best interest — even when it means extra work for us.",
    icon: Shield,
    gradient: "from-primary to-blue-600",
  },
  {
    id: "transparency",
    title: "Radical Transparency",
    description:
      "Fixed quotes upfront. No hidden fees, no surprise charges, no ambiguous scope. You know exactly what you&apos;re paying for, when it&apos;ll be done, and what comes next.",
    icon: Lightbulb,
    gradient: "from-accent to-amber-500",
  },
  {
    id: "partnership",
    title: "True Partnership",
    description:
      "You get a named compliance manager — not a ticket number. They know your business, anticipate deadlines, and are reachable on call, WhatsApp, or email. We grow when you grow.",
    icon: Handshake,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "excellence",
    title: "Quiet Excellence",
    description:
      "We don&apos;t chase headlines. We chase clean filings, zero penalties, and peace of mind for our clients. 25+ years of spotless records speak louder than any marketing.",
    icon: Target,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: "care",
    title: "Genuine Care",
    description:
      "Family-run means we treat your compliance like our own. From startup incorporation to multi-state licences, we&apos;re invested in your success — not just the transaction.",
    icon: Heart,
    gradient: "from-rose-500 to-pink-600",
  },
];

export function AboutValues() {
  return (
    <section
      id="values"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30"
      aria-labelledby="values-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20"
          >
            Our Principles
          </motion.span>

          <motion.h2
            id="values-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-[1.15] max-w-3xl mx-auto"
          >
            The Values That Guide{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-accent to-amber-500 bg-clip-text text-transparent">
                Every Decision
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
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
          >
            These aren&apos;t wall posters — they&apos;re how we operate daily. Every team member, every client interaction, every filing reflects these principles.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-16"
          role="list"
          aria-label="Our values"
        >
          <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.li
                key={value.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group flex flex-col gap-4 w-full sm:max-w-[calc(50%-1.5rem)] lg:max-w-[calc(33.333%-2rem)] p-6 rounded-2xl border border-primary-light shadow-sm transition-all duration-300 relative overflow-hidden hover:scale-[1.03] hover:shadow-[0_20px_40px_-12px_rgb(30,58,138,0.15)] hover:border-primary/30 hover:border-t-2 hover:border-t-primary"
                role="listitem"
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                <div className="absolute top-0 left-0 right-0 h-0 bg-gradient-to-r from-primary to-primary/50 transition-all duration-300 group-hover:h-1" aria-hidden="true" />

                <motion.div
                  className="flex h-14 w-14 items-center justify-center rounded-xl relative overflow-hidden transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105 group-hover:ring-2 group-hover:ring-primary/20"
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  transition={{ duration: 0.2 }}
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary group-hover:to-primary/50 transition-all duration-300" aria-hidden="true" />
                  <div className="absolute inset-0 rounded-xl border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                  <value.icon className="relative h-7 w-7 strokeWidth={2} z-10" />
                </motion.div>

                <div className="flex-1 text-center">
                  <h3 className="font-heading font-semibold text-primary transition-colors duration-200">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}