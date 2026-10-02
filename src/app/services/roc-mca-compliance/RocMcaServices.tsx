"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  FileCheck2,
  UserCheck,
  FileSignature,
  Users,
  ClipboardList,
  UserPlus,
  SearchCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const rocMcaServices = [
  {
    id: "annual-return",
    title: "Annual Return Filing (MGT-7 / MGT-7A)",
    description:
      "Mandatory annual return filing disclosing your company's shareholding structure, directors, and key details — required for every registered company within 60 days of the AGM.",
    icon: FileText,
  },
  {
    id: "financial-statement",
    title: "Financial Statement Filing (AOC-4)",
    description:
      "Filing of your company's audited financial statements, board report, and auditor's report with the ROC — a core annual compliance requirement for every private and public limited company.",
    icon: FileCheck2,
  },
  {
    id: "director-kyc",
    title: "Director KYC (DIR-3 KYC)",
    description:
      "Annual KYC verification for every director holding a DIN, mandatory to keep director status active — missing this leads to DIN deactivation.",
    icon: UserCheck,
  },
  {
    id: "llp-filing",
    title: "LLP Annual Filing (Form 8 & Form 11)",
    description:
      "Annual statement of accounts and annual return filing specifically for Limited Liability Partnerships, covering financial disclosures and partner details.",
    icon: FileSignature,
  },
  {
    id: "agm-compliance",
    title: "Annual General Meeting (AGM) Compliance",
    description:
      "We assist with AGM notice drafting, agenda preparation, and minutes documentation to ensure your company meets statutory meeting requirements.",
    icon: Users,
  },
  {
    id: "statutory-registers",
    title: "Statutory Register & Minutes Maintenance",
    description:
      "Ongoing maintenance of mandatory statutory registers (members, directors, charges) and board/general meeting minutes as required under the Companies Act.",
    icon: ClipboardList,
  },
  {
    id: "director-changes",
    title: "Director Appointment, Resignation & KYC Updates",
    description:
      "Filing of ROC forms for any changes in your company's board — appointments, resignations, or updates to director details.",
    icon: UserPlus,
  },
  {
    id: "health-check",
    title: "ROC Compliance Health Check",
    description:
      "A comprehensive audit of your company's compliance history to identify and fix any pending or missed filings before they escalate into penalties or disqualification.",
    icon: SearchCheck,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function RocMcaServices() {
  return (
    <section
      id="roc-mca-services"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="roc-mca-services-heading"
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
            Our ROC/MCA Compliance Services
          </span>
          <motion.h2
            id="roc-mca-services-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-[1.15]"
          >
            Complete Annual Compliance, Handled{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-accent to-amber-500 bg-clip-text text-transparent">
                End-to-End
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
            Every mandatory filing your company or LLP needs to stay in good standing with the MCA
          </motion.p>
        </motion.div>

        {/* ROC/MCA Services Grid - 6-col grid on lg (each card spans 2), so the last row of 2 cards is truly centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8 [grid-auto-rows:1fr]">
          {rocMcaServices.map((service, index) => (
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