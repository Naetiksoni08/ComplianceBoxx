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
    id: "who-must-file",
    question: "Who is required to file an income tax return in India?",
    answer:
      "Any individual with gross total income exceeding the basic exemption limit (₹2.5 lakh old regime, ₹3 lakh new regime for FY 2023-24) must file. Also mandatory if you: have foreign assets/income, deposited > ₹1 crore in current account, spent > ₹2 lakh on foreign travel, or want to claim a refund. Companies and firms must file regardless of income.",
  },
  {
    id: "old-vs-new-regime",
    question: "What's the difference between the old and new tax regime — which should I choose?",
    answer:
      "Old regime: lower base rates but allows 70+ deductions (80C, 80D, HRA, LTA, home loan interest). New regime: lower slab rates (0% up to ₹3 lakh, 5% up to ₹7 lakh, etc.) but almost no deductions. New regime is default from FY 2023-24. Choose old if your deductions > ₹3.75 lakh; otherwise new is usually better. We'll compute both and recommend the optimal one.",
  },
  {
    id: "deadline-penalty",
    question: "What is the deadline for filing ITR, and what happens if I miss it?",
    answer:
      "Due date for individuals/HUFs (non-audit): 31st July of assessment year. Belated return can be filed by 31st December with late fee (₹1,000 if income ≤ ₹5 lakh, ₹5,000 otherwise). Beyond that, only updated return (ITR-U) within 24 months with additional tax (25-50%). Missed filing also means loss carry-forward is disallowed. File on time to avoid penalties.",
  },
  {
    id: "freelancer-advance-tax",
    question: "Do freelancers and consultants need to pay advance tax?",
    answer:
      "Yes, if your estimated tax liability for the year exceeds ₹10,000 after TDS. Freelancers/consultants with no TDS or partial TDS must pay advance tax in four installments: 15% by 15th June, 45% by 15th September, 75% by 15th December, 100% by 15th March. Interest under 234B/234C applies on shortfall. We calculate and remind you of each installment.",
  },
  {
    id: "documents-needed",
    question: "What documents do I need to file my income tax return?",
    answer:
      "PAN, Aadhaar, Form 16 (salary), Form 16A/26AS (TDS), bank statements, interest certificates, capital gains statements (property/mutual funds), rent receipts (HRA), investment proofs (80C, 80D, etc.), home loan interest certificate, business income/expense records (if applicable). We provide a personalized checklist based on your income sources.",
  },
  {
    id: "notice-triggers",
    question: "What triggers an income tax notice, and how should I respond?",
    answer:
      "Common triggers: TDS mismatch (Form 26AS vs return), high-value transactions not reported, inconsistent ITR data, random scrutiny selection, or assessment queries. Don't panic — most are routine. We review the notice, gather supporting documents, draft a precise response, and file it within the deadline (usually 15-30 days). Timely, accurate response resolves most notices.",
  },
  {
    id: "tax-audit-mandatory",
    question: "Is a tax audit mandatory for my business?",
    answer:
      "Tax audit (Section 44AB) is mandatory if: business turnover > ₹1 crore (or ₹10 crore if 95%+ digital transactions), professional gross receipts > ₹50 lakh. Presumptive taxation (44AD/44ADA) opt-out also triggers audit. If you opt for presumptive and declare income < 8%/6% of turnover, audit applies. We assess your eligibility and handle audit coordination with a CA.",
  },
  {
    id: "revise-return",
    question: "Can I revise my income tax return after filing it?",
    answer:
      "Yes, you can file a revised return under Section 139(5) anytime before 31st December of the assessment year or before completion of assessment, whichever is earlier. No limit on number of revisions. Use this to correct errors, claim missed deductions, or report omitted income. We'll file the revised return with clear annotations of what changed.",
  },
];

export function TaxFAQ() {
  return (
    <section
      id="tax-faq"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="tax-faq-heading"
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
            id="tax-faq-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-[1.15]"
          >
            Income Tax Filing{" "}
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
            Answers to what taxpayers ask most about ITR filing and tax planning
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
          <p className="text-muted-foreground mb-4">Not sure which regime or filing type applies to you?</p>
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