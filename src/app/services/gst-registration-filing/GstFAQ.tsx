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
    id: "mandatory",
    question: "Is GST registration mandatory for my business?",
    answer:
      "GST registration is mandatory if your annual turnover exceeds ₹40 lakh (₹20 lakh for special category states) for goods, or ₹20 lakh (₹10 lakh for special category) for services. It's also mandatory regardless of turnover for: inter-state suppliers, e-commerce sellers, casual taxable persons, non-resident taxable persons, and businesses required to deduct TDS/TCS under GST.",
  },
  {
    id: "turnover-limit",
    question: "What is the turnover limit for GST registration?",
    answer:
      "For goods: ₹40 lakh (₹20 lakh for special category states like Northeast, J&K, Himachal, Uttarakhand). For services: ₹20 lakh (₹10 lakh for special category). These are aggregate turnover limits across all business verticals under the same PAN. Composition scheme threshold is ₹1.5 crore (₹75 lakh for special category).",
  },
  {
    id: "return-types",
    question: "What's the difference between GSTR-1, GSTR-3B, and GSTR-9?",
    answer:
      "GSTR-1: monthly/quarterly statement of outward supplies (sales) — due 11th of next month (monthly) or 13th of month following quarter (quarterly). GSTR-3B: monthly summary return for tax payment — due 20th of next month. GSTR-9: annual return consolidating the full year — due 31st December following the financial year. GSTR-1 and 3B are periodic; GSTR-9 is the yearly reconciliation.",
  },
  {
    id: "missed-deadline",
    question: "What happens if I miss a GST filing deadline?",
    answer:
      "Late fees: ₹50 per day (₹25 CGST + ₹25 SGST) for GSTR-3B, ₹200 per day (₹100 + ₹100) for GSTR-1, capped at ₹10,000 (GSTR-3B) or ₹5,000 (GSTR-1). Interest at 18% per annum on unpaid tax. Persistent non-filing can lead to cancellation of registration, blocking of e-way bill generation, and prosecution. File immediately to minimize penalties.",
  },
  {
    id: "voluntary-registration",
    question: "Can I register for GST voluntarily even if I'm below the threshold?",
    answer:
      "Yes, voluntary registration is allowed under Section 25(3). Benefits: claim input tax credit on purchases, issue GST-compliant invoices, supply inter-state without restriction, and build credibility with larger clients who prefer registered vendors. Once voluntarily registered, you must file returns even if turnover stays below threshold.",
  },
  {
    id: "composition-scheme",
    question: "How does the GST Composition Scheme work, and am I eligible?",
    answer:
      "Eligible if aggregate turnover ≤ ₹1.5 crore (₹75 lakh for special category). You pay a fixed % of turnover as tax (1% for traders/manufacturers, 5% for restaurants, 6% for other services) instead of regular GST rates. No input tax credit, no inter-state sales, no e-commerce. File quarterly CMP-08 + annual GSTR-4. Opt-in via Form GST CMP-02 before start of financial year.",
  },
  {
    id: "ecommerce-gst",
    question: "Do I need GST registration to sell on e-commerce platforms?",
    answer:
      "Yes, mandatory under Section 24(ix) — e-commerce operators (Amazon, Flipkart, Meesho, etc.) must collect TCS at 1% (0.5% CGST + 0.5% SGST) on your sales. You need GST registration regardless of turnover. The platform deducts TCS and deposits it; you claim it as credit in your returns. We handle registration, TCS reconciliation, and filing for marketplace sellers.",
  },
  {
    id: "documents-gst",
    question: "What documents are required for GST registration?",
    answer:
      "PAN card of business/owner, Aadhaar card, passport-size photo, proof of business address (rent agreement/utility bill + NOC from owner), bank account details (cancelled cheque/statement), DSC (Digital Signature) for companies/LLPs, authorization letter for signatory. Additional docs for specific cases (e.g., import-export code, SEZ unit proof). We provide a full customized checklist after consultation.",
  },
];

export function GstFAQ() {
  return (
    <section
      id="gst-faq"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="gst-faq-heading"
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
            id="gst-faq-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-[1.15]"
          >
            GST Registration & Filing{" "}
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
            Answers to what businesses ask most about GST compliance
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
          <p className="text-muted-foreground mb-4">Still have GST questions?</p>
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