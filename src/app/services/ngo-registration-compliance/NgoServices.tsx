"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  HandHeart,
  Users,
  Building2,
  Gavel,
  FileText,
  Globe,
  RefreshCw,
  ClipboardList,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ngoServices = [
  {
    id: "trust-registration",
    title: "Trust Registration",
    description:
      "Drafting of the trust deed and registration with the Sub-Registrar, for charitable and religious trusts alike — including guidance on trustees, objects, and asset structuring.",
    icon: HandHeart,
  },
  {
    id: "society-registration",
    title: "Society Registration",
    description:
      "Registration under the Societies Registration Act — memorandum of association, rules and regulations, and coordination with the Registrar of Societies.",
    icon: Users,
  },
  {
    id: "cooperative-registration",
    title: "Cooperative Society Registration",
    description:
      "Registration under state and multi-state Cooperative Societies Acts, including bye-law drafting and coordination with the Registrar of Cooperative Societies.",
    icon: Building2,
  },
  {
    id: "welfare-structuring",
    title: "Welfare Society & Section 8 Structuring",
    description:
      "Guidance on choosing and setting up the right structure for welfare-focused organisations, including Section 8 company incorporation where that fits better than a society.",
    icon: Gavel,
  },
  {
    id: "80g-registration",
    title: "80G Registration & Renewal",
    description:
      "Registration and periodic renewal so donors to your organisation can claim tax deductions — including the documentation and reporting this requires.",
    icon: FileText,
  },
  {
    id: "12a-registration",
    title: "12A Registration & Renewal",
    description:
      "Registration and renewal for income tax exemption on your organisation's own income, and support with the compliance this status requires going forward.",
    icon: RefreshCw,
  },
  {
    id: "fcra-registration",
    title: "FCRA Registration & Compliance",
    description:
      "Registration and prior permission for receiving foreign contributions, along with ongoing compliance — annual returns (FC-4), bank account requirements, and utilisation reporting.",
    icon: Globe,
  },
  {
    id: "ongoing-compliance",
    title: "Ongoing Compliance & Annual Filings",
    description:
      "Annual returns, audited financial statements, board resolutions, and statutory registers — kept current so your registrations stay in good standing year after year.",
    icon: ClipboardList,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function NgoServices() {
  return (
    <section
      id="ngo-services"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="ngo-services-heading"
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
            Our NGO Services
          </span>
          <motion.h2
            id="ngo-services-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-[1.15]"
          >
            Every Structure, Every Exemption,{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-accent to-amber-500 bg-clip-text text-transparent">
                Handled
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
            From choosing the right entity to securing tax exemptions and staying compliant year after year
          </motion.p>
        </motion.div>

        {/* NGO Services Grid - 6-col grid on lg (each card spans 2), so the last row of 2 cards is truly centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8 [grid-auto-rows:1fr]">
          {ngoServices.map((service, index) => (
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