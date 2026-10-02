"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Sparkles, ChevronRight, HelpCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const faqs = [
  {
    id: "missed-deadline",
    question: "What happens if my company misses its ROC annual filing deadline?",
    answer:
      "Late fees of ₹100 per day (₹50 CGST + ₹50 SGST) apply for each day of delay in filing MGT-7 and AOC-4, with no upper cap. Persistent non-filing can lead to director disqualification under Section 164(2) for 5 years, company strike-off under Section 248, and prosecution. File immediately to limit penalties — we can help regularize overdue filings.",
  },
  {
    id: "mandatory-forms",
    question: "Which forms are mandatory for a Private Limited Company every year?",
    answer:
      "Every Private Limited Company must file: MGT-7/MGT-7A (Annual Return) within 60 days of AGM, AOC-4 (Financial Statements) within 30 days of AGM, and DIR-3 KYC for every director by 30th September. If the company held an AGM, minutes must be recorded. Additional forms apply for specific events (director changes, share transfers, etc.).",
  },
  {
    id: "llp-vs-company",
    question: "Do LLPs have different annual compliance requirements than companies?",
    answer:
      "Yes. LLPs file Form 8 (Statement of Account & Solvency) by 30th October and Form 11 (Annual Return) by 30th May. They don't file MGT-7, AOC-4, or hold AGMs. No DIR-3 KYC for designated partners (though DIN KYC is still required). LLPs also have lower statutory register maintenance requirements. We handle both company and LLP compliance tracks.",
  },
  {
    id: "dir3-kyc",
    question: "What is DIR-3 KYC, and why do I need to do it every year?",
    answer:
      "DIR-3 KYC is annual verification of director identity and contact details filed on the MCA portal by 30th September. Every director with an active DIN must file it — missing it deactivates the DIN, preventing any new filings or appointments. Reactivation requires filing KYC + late fee (₹5,000). We send reminders and file it for all your directors automatically.",
  },
  {
    id: "strike-off",
    question: "Can my company be struck off for non-compliance? What does that mean?",
    answer:
      "Yes. If a company fails to file annual returns for 2+ consecutive years, the ROC can strike it off under Section 248. The company ceases to exist legally, assets vest with the government, and directors face disqualification. Restoration is possible via NCLT within 20 years but is costly and time-consuming. Proactive compliance is far cheaper — we track all deadlines.",
  },
  {
    id: "audit-mandatory",
    question: "Is an audit mandatory before filing AOC-4?",
    answer:
      "Yes, for all companies (Private Limited, Public Limited, OPC, Section 8) — statutory audit by a Chartered Accountant is mandatory under Section 139. The audited financial statements (Balance Sheet, P&L, Cash Flow, Notes) plus auditor's report and board report form the AOC-4 filing. LLP audit is only mandatory if turnover > ₹40 lakh or capital > ₹25 lakh.",
  },
  {
    id: "late-penalty",
    question: "What's the penalty for late ROC filing?",
    answer:
      "₹100 per day per form (MGT-7 and AOC-4 each), with no maximum cap. DIR-3 KYC late fee is ₹5,000 for reactivation after deactivation. Late fees are not tax-deductible. Additional penalties apply for non-maintenance of registers, non-holding of AGM, and director disqualification. We ensure zero late fees by tracking every deadline proactively.",
  },
  {
    id: "dormant-company",
    question: "Do dormant/inactive companies still need to file annual returns?",
    answer:
      "Yes. Even companies with zero revenue/operations must file MGT-7 (as 'dormant' status) and AOC-4 (with nil financials) annually. DIR-3 KYC for directors is also mandatory. The only way to stop filings is to formally strike off or dissolve the company via Section 248 or liquidation. We can advise on the best path if your company is truly inactive.",
  },
];

export function RocMcaFAQ() {
  return (
    <section
      id="roc-mca-faq"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="roc-mca-faq-heading"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[250px] w-[250px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Common Questions
          </span>
          <motion.h2
            id="roc-mca-faq-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-[1.15]"
          >
            ROC / MCA Compliance{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-accent to-amber-500 bg-clip-text text-transparent">
                FAQs
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
            Answers to what business owners ask most about annual ROC compliance
          </motion.p>
        </motion.div>

        {/* Accordion List */}
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <AccordionItem value={faq.id} className="border-border">
                <AccordionTrigger
                  icon={<HelpCircle className="h-5 w-5" />}
                  className={cn(
                    "flex items-center gap-4 w-full font-medium transition-all duration-200",
                    index > 0 && "border-t"
                  )}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">Not sure what filings your company needs?</p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Talk to an Expert
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}