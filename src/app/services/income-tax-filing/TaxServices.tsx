"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  User,
  Building2,
  Lightbulb,
  FileText,
  AlertCircle,
  Calculator,
  TrendingUp,
  FileCheck2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const taxServices = [
  {
    id: "individual-filing",
    title: "Individual ITR Filing (Salaried & Freelancers)",
    description:
      "Accurate income tax return filing for salaried employees, freelancers, and consultants — we ensure every eligible deduction and exemption is correctly claimed.",
    icon: User,
  },
  {
    id: "business-filing",
    title: "Business & Firm Income Tax Filing",
    description:
      "Complete income tax return filing for proprietorships, partnerships, LLPs, and companies, including computation of business income and applicable tax liability.",
    icon: Building2,
  },
  {
    id: "tax-planning",
    title: "Tax Planning & Advisory",
    description:
      "Proactive guidance on structuring your income, investments, and expenses to legally minimize your tax liability under the old or new tax regime.",
    icon: Lightbulb,
  },
  {
    id: "tds-filing",
    title: "TDS Return Filing",
    description:
      "Quarterly TDS return filing for businesses deducting tax at source on salaries, contractor payments, rent, and other transactions, including Form 16/16A generation.",
    icon: FileText,
  },
  {
    id: "notice-response",
    title: "Income Tax Notice & Scrutiny Response",
    description:
      "Received a notice from the Income Tax Department? We review, draft, and file accurate responses to resolve queries, mismatches, or scrutiny assessments.",
    icon: AlertCircle,
  },
  {
    id: "advance-tax",
    title: "Advance Tax Calculation & Payment",
    description:
      "We calculate your quarterly advance tax liability and ensure timely payment to avoid interest penalties under Sections 234B and 234C.",
    icon: Calculator,
  },
  {
    id: "capital-gains",
    title: "Capital Gains Tax Advisory",
    description:
      "Expert guidance on calculating and reporting capital gains from property, stocks, or mutual funds, along with exemption planning under applicable sections.",
    icon: TrendingUp,
  },
  {
    id: "tax-audit",
    title: "Tax Audit & Presumptive Taxation Filing",
    description:
      "Support for businesses requiring a tax audit under Section 44AB, and simplified filing under presumptive taxation schemes (44AD/44ADA) for eligible professionals and small businesses.",
    icon: FileCheck2,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function TaxServices() {
  return (
    <section
      id="tax-services"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="tax-services-heading"
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
            Our Income Tax Services
          </span>
          <motion.h2
            id="tax-services-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-[1.15]"
          >
            Tax Filing & Advisory for Every{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-accent to-amber-500 bg-clip-text text-transparent">
                Taxpayer
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
            From salaried individuals to businesses — accurate filing and smart tax planning
          </motion.p>
        </motion.div>

        {/* Tax Services Grid - 6-col grid on lg (each card spans 2), so the last row of 2 cards is truly centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8 [grid-auto-rows:1fr]">
          {taxServices.map((service, index) => (
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