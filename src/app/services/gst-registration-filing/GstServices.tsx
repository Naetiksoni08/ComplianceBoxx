"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Calendar,
  FileCheck2,
  Store,
  Settings,
  AlertCircle,
  RefreshCw,
  Percent,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const gstServices = [
  {
    id: "new-registration",
    title: "New GST Registration",
    description:
      "End-to-end GST registration for new businesses, startups, and traders — we handle the entire application process on the GST portal and get you your GSTIN, typically within 3-7 working days.",
    icon: FileText,
  },
  {
    id: "return-filing",
    title: "GST Return Filing (GSTR-1, GSTR-3B)",
    description:
      "Monthly or quarterly filing of your sales and summary returns, done accurately and on time, every time — so you never miss a deadline or attract late fees.",
    icon: Calendar,
  },
  {
    id: "annual-return",
    title: "GST Annual Return Filing (GSTR-9)",
    description:
      "Comprehensive annual return filing consolidating your full year's GST activity, required for businesses above the prescribed turnover threshold.",
    icon: FileCheck2,
  },
  {
    id: "ecommerce",
    title: "GST Registration for E-commerce Sellers",
    description:
      "Specialized GST registration and compliance support for businesses selling on platforms like Amazon, Flipkart, and Meesho, including TCS reconciliation support.",
    icon: Store,
  },
  {
    id: "amendment",
    title: "GST Amendment & Cancellation",
    description:
      "Need to update your registered address, business details, or close your GST registration entirely? We handle amendments and cancellations with the department on your behalf.",
    icon: Settings,
  },
  {
    id: "notice-handling",
    title: "GST Notice & Reply Handling",
    description:
      "Received a GST department notice or query? We draft and file accurate, timely responses to keep your compliance record clean and avoid penalties.",
    icon: AlertCircle,
  },
  {
    id: "itc-reconciliation",
    title: "Input Tax Credit (ITC) Reconciliation",
    description:
      "We reconcile your purchase records against GSTR-2B to ensure you claim the maximum eligible input tax credit and avoid mismatches during audits.",
    icon: RefreshCw,
  },
  {
    id: "composition-scheme",
    title: "Composition Scheme Registration & Filing",
    description:
      "For small businesses and traders eligible for the GST Composition Scheme — simplified quarterly filing with lower compliance burden and a fixed tax rate.",
    icon: Percent,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function GstServices() {
  return (
    <section
      id="gst-services"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="gst-services-heading"
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
            Our GST Services
          </span>
          <motion.h2
            id="gst-services-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-[1.15]"
          >
            Everything You Need for{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-accent to-amber-500 bg-clip-text text-transparent">
                GST Compliance
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
            From first-time registration to ongoing return filing — we handle it all
          </motion.p>
        </motion.div>

        {/* GST Services Grid - 6-col grid on lg (each card spans 2), so the last row of 2 cards is truly centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8 [grid-auto-rows:1fr]">
          {gstServices.map((service, index) => (
            <motion.article
              key={service.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.08 }}
              className={cn(
                "group relative rounded-2xl bg-card border border-border p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 flex flex-col h-full",
                // Each card spans 2 of 6 columns → 3 cards per row
                "lg:col-span-2",
                // Last row has 2 cards → start card 7 at col 2 so both sit centered (card 8 lands on cols 4-5)
                index === 6 && "lg:col-start-2"
              )}
            >
              {/* Icon */}
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary mb-4 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105"
                whileHover={{ scale: 1.08, rotate: 3 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              >
                <service.icon className="h-6 w-6" strokeWidth={2} />
              </motion.div>

              {/* Title */}
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 flex-shrink-0">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 pb-6">
                {service.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}