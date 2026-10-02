"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Phone, ArrowRight, CheckCircle2, Mail } from "lucide-react";

export function AboutCTABanner() {
  return (
    <section
      className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="cta-heading"
      style={{
        background: "linear-gradient(to bottom, hsl(220,30%,8%), hsl(220,35%,6%), hsl(220,40%,4%))",
      }}
    >
      {/* Background decorations - matches Company Registration CTA banner */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 h-[300px] w-[300px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[250px] w-[250px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[200px] rounded-full bg-primary/5 blur-3xl" />

        <div className="absolute inset-0 opacity-5">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="about-cta-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="12" cy="12" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#about-cta-dots)" />
          </svg>
        </div>

        <div className="absolute top-10 right-20 h-24 w-24 border-2 border-primary/20 rounded-2xl rotate-12" aria-hidden="true" />
        <div className="absolute bottom-10 left-20 h-16 w-16 border-2 border-accent/20 rounded-xl -rotate-6" aria-hidden="true" />
        <div className="absolute top-1/3 left-5 h-8 w-8 border-2 border-primary/10 rounded-lg" aria-hidden="true" />
        <div className="absolute bottom-1/3 right-5 h-6 w-6 border-2 border-accent/10 rounded" aria-hidden="true" />
      </div>

      <div className="relative mx-auto max-w-4xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white border border-white/20"
          >
            Ready to Get Started?
          </motion.span>

          <motion.h2
            id="cta-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-[1.15] max-w-3xl mx-auto"
          >
            Let&apos;s Make Your Business{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-accent to-amber-300 bg-clip-text text-transparent">
                100% Compliant
              </span>
              <motion.span
                className="absolute bottom-2 left-0 right-0 h-4 bg-accent/30 -z-10 rounded"
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
            className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto"
          >
            Book a free 15-minute consultation. No obligation, just clear answers about your
            compliance needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/#contact"
              className="group w-full sm:w-auto rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary transition-all duration-200 hover:bg-white/90 hover:shadow-2xl hover:shadow-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Book Free Consultation
              <ArrowRight className="ml-2 inline-block h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="tel:+919911292157"
              className="group w-full sm:w-auto rounded-xl border-2 border-white/50 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:border-white hover:shadow-2xl hover:shadow-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <Phone className="mr-2 inline-block h-5 w-5" aria-hidden="true" />
              Call Us Now
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/70"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" aria-hidden="true" />
              <span>Free initial consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" aria-hidden="true" />
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" aria-hidden="true" />
              <span>Dedicated compliance manager</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-white/60"
          >
            <a
              href="tel:+919911292157"
              className="group flex items-center gap-2 transition-colors hover:text-white"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              <span>Call: +91 99112 92157</span>
            </a>
            <span className="hidden sm:inline-block w-px h-6 bg-white/20" aria-hidden="true" />
            <a
              href="mailto:info@complianceboxx.in"
              className="group flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              <span>Email: info@complianceboxx.in</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}