"use client";

import { motion } from "framer-motion";
import {
  Tag,
  Globe,
  Headphones,
  MapPin,
  Award,
  Sparkles,
} from "lucide-react";

const whyUsPoints = [
  {
    id: "experience",
    title: "25+ Years of Expertise",
    description: "Deep domain knowledge across company law, taxation, and regulatory compliance.",
    icon: Award,
  },
  {
    id: "transparent",
    title: "Transparent Pricing",
    description: "Fixed quotes upfront — no hidden fees, no surprise charges, ever.",
    icon: Tag,
  },
  {
    id: "online",
    title: "End-to-End Online Process",
    description: "From document collection to filing — everything digital, trackable, paperless.",
    icon: Globe,
  },
  {
    id: "support",
    title: "Dedicated Support",
    description: "A named compliance manager for every client — reachable on call, WhatsApp, email.",
    icon: Headphones,
  },
  {
    id: "pan-india",
    title: "Pan-India Service, Delhi NCR Based",
    description: "Physically accessible for notarizations, visits, and in-person consultations when needed.",
    icon: MapPin,
  },
];

export function WhyChooseUs() {
  return (
    <section
      id="about"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="about-heading"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[250px] w-[250px] rounded-full bg-accent/5 blur-3xl" />
        {/* Subtle dot pattern */}
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

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
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
            Why ComplianceBoxx?
          </motion.span>

          {/* Headline */}
          <motion.h2
            id="about-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-[1.15] max-w-3xl mx-auto"
          >
            Compliance Expertise You Can{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-accent to-amber-500 bg-clip-text text-transparent">
                Trust
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

          {/* Supporting Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
          >
            Founded in Delhi NCR, we're a family-run practice built on personal accountability — not
            a faceless portal. Every filing, every deadline, every client conversation is handled
            with the same care we'd want for our own business.
          </motion.p>

          {/* Why Us Points - Flexbox layout for centered last row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-16"
            role="list"
            aria-label="Why choose ComplianceBoxx"
          >
            <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
              {whyUsPoints.map((point, index) => (
                <motion.li
                  key={point.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="group flex flex-col gap-4 w-full sm:max-w-[calc(50%-1.5rem)] lg:max-w-[calc(33.333%-2rem)] p-6 rounded-2xl border border-primary-light shadow-sm transition-all duration-300 relative overflow-hidden hover:scale-[1.03] hover:shadow-[0_20px_40px_-12px_rgb(30,58,138,0.15)] hover:border-primary/30 hover:border-t-2 hover:border-t-primary"
                  role="listitem"
                >
                  {/* Subtle corner gradient background */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                  
                  {/* Top accent line - appears on hover */}
                  <div className="absolute top-0 left-0 right-0 h-0 bg-gradient-to-r from-primary to-primary/50 transition-all duration-300 group-hover:h-1" aria-hidden="true" />
                  
                  <motion.div
                    className="flex h-14 w-14 items-center justify-center rounded-xl relative overflow-hidden transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105 group-hover:ring-2 group-hover:ring-primary/20"
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ duration: 0.2 }}
                    aria-hidden="true"
                  >
                    {/* Icon gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary group-hover:to-primary/50 transition-all duration-300" aria-hidden="true" />
                    <div className="absolute inset-0 rounded-xl border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                    <point.icon className="relative h-7 w-7 strokeWidth={2} z-10" />
                  </motion.div>
                  <div className="flex-1 text-center">
                    <h3 className="font-heading font-semibold text-primary transition-colors duration-200">
                      {point.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </div>
          </motion.div>

          {/* Learn More Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-12 text-center"
          >
            <a
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Learn More
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              >
                →
              </motion.span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}