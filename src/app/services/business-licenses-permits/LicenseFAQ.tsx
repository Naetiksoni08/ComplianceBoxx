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
    id: "which-licenses",
    question: "Which licenses does my business actually need to start operating?",
    answer:
      "It depends on your business type, location, and scale. At minimum: GST registration (if turnover exceeds threshold), Shop & Establishment license (for any physical premises), Professional Tax registration (in most states). Additional licenses may include: Trade License (municipal), Udyam/MSME (for benefits), IEC (for import/export), DSC (for digital filings). We assess your business and provide a complete license roadmap before you start.",
  },
  {
    id: "shop-establishment-mandatory",
    question: "Is Shop & Establishment registration mandatory even for a small office?",
    answer:
      "Yes. Every commercial establishment — even a single-person office — must register under the state's Shops & Establishment Act within 30 days of starting operations. It's required to legally hire employees, open a current bank account, and avoid penalties. The process is fully online in most states, and we handle it end-to-end.",
  },
  {
    id: "udyam-benefits",
    question: "What's the benefit of Udyam (MSME) registration for my business?",
    answer:
      "Udyam registration officially classifies you as an MSME based on investment/turnover. Benefits: collateral-free loans up to ₹2 crore under CGTMSE, 1% interest subvention on loans, priority sector lending from banks, preference in government tenders, delayed payment protection (buyer pays interest after 45 days), subsidies on patent/trademark filing, ISO certification reimbursement. It's free, online, and lifetime valid.",
  },
  {
    id: "iec-domestic-only",
    question: "Do I need an Import Export Code if I only sell within India?",
    answer:
      "No. IEC is only required for cross-border import/export of goods/services. If you operate purely domestically, you don't need it. However, if you ever plan to sell on international marketplaces (Amazon Global, etc.), source raw materials from abroad, or export — you'll need IEC first. It's a one-time registration with lifetime validity and no renewal.",
  },
  {
    id: "dsc-usage",
    question: "What is a Digital Signature Certificate used for, and do I need one?",
    answer:
      "DSC is a legally valid digital signature issued by licensed CAs. Required for: MCA/ROC filings (company incorporation, annual returns), GST return filing, income tax return filing (mandatory for companies/LLPs), e-tendering, EPFO/ESIC filings. Class 3 DSC is standard for business use. Valid for 1–2 years, renewable. We procure and configure DSC for you.",
  },
  {
    id: "startup-india-eligibility",
    question: "How do I know if my startup qualifies for Startup India recognition?",
    answer:
      "DPIIT recognition requires: (1) Incorporated as Private Limited, LLP, or Partnership Firm, (2) Up to 10 years from incorporation, (3) Turnover ≤ ₹100 crore in any previous FY, (4) Working towards innovation/improvement of products/services/processes, or scalable business model with high employment/wealth creation potential. We assess eligibility and file the recognition application with all required documents.",
  },
  {
    id: "trade-vs-gst",
    question: "Is a Trade License different from GST registration?",
    answer:
      "Yes, completely different. Trade License: municipal-level permission to operate a specific business activity at a specific address (health, safety, zoning). GST Registration: central tax registration for collecting/remitting GST based on turnover. You need BOTH — Trade License from your municipal corporation, GST from the central portal. We handle both applications.",
  },
  {
    id: "license-timeline",
    question: "How long does it take to get these licenses approved?",
    answer:
      "Shop & Establishment: 7–15 days. Udyam: instant online. IEC: 1–2 days. Professional Tax: 7–10 days. DSC: 1–2 days (eKYC). Startup India: 15–30 days for DPIIT review. Trade License: 15–30 days (municipal inspection). Import License: 30–60 days (specialized). Timelines vary by state/authority. We track every application and follow up to minimize delays.",
  },
];

export function LicenseFAQ() {
  return (
    <section
      id="license-faq"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="license-faq-heading"
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
            id="license-faq-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-[1.15]"
          >
            Business Licenses & Permits{" "}
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
            Answers to what business owners ask most about licensing requirements
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
          <p className="text-muted-foreground mb-4">Not sure which licenses your business needs?</p>
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