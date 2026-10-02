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
    id: "structure-choice",
    question: "Which business structure is best for my startup — Pvt Ltd or LLP?",
    answer:
      "Private Limited is ideal if you plan to raise equity funding, issue ESOPs, or want maximum credibility with investors and banks. LLP is better for professional services firms, consultants, or businesses that want partnership flexibility with limited liability but don't need to raise venture capital. We'll help you choose based on your growth plans, ownership structure, and compliance appetite.",
  },
  {
    id: "minimum-capital",
    question: "What is the minimum capital required to register a company in India?",
    answer:
      "There is no minimum paid-up capital requirement for Private Limited, OPC, or LLP registration since the Companies (Amendment) Act 2015. You can start with any amount (even ₹1). Public Limited Companies still require ₹5 lakh minimum paid-up capital. Government fees vary by authorized capital — we'll guide you on the optimal amount for your business.",
  },
  {
    id: "directors-partners",
    question: "How many directors/partners do I need for each structure?",
    answer:
      "Private Limited: minimum 2 directors (max 15), at least 1 Indian resident. OPC: 1 director (must be Indian resident) + 1 nominee. LLP: minimum 2 designated partners (max unlimited), at least 1 Indian resident. Partnership Firm: minimum 2 partners (max 50). Section 8: minimum 2 directors. Proprietorship: 1 owner. Public Limited: minimum 3 directors, 7 shareholders.",
  },
  {
    id: "conversion-plc-opc",
    question: "Can a Private Limited Company be converted to a One Person Company later, or vice versa?",
    answer:
      "Yes, both conversions are possible under the Companies Act. Private Limited → OPC requires board/shareholder approval, ROC filing, and meeting OPC eligibility (single member, paid-up capital ≤ ₹50 lakh, turnover ≤ ₹2 cr). OPC → Private Limited is more common when the business grows — we handle the full conversion process including fresh incorporation documents and MCA filings.",
  },
  {
    id: "documents-required",
    question: "What documents are required to register a company?",
    answer:
      "Standard documents: PAN card, Aadhaar card, passport-size photos of all directors/partners; proof of registered office address (rent agreement/utility bill + NOC from owner); DSC (Digital Signature Certificate) for all directors; DIN (Director Identification Number) — we obtain this for you. For foreign nationals: apostilled passport, address proof. We provide a customized checklist after your free consultation.",
  },
  {
    id: "timeline",
    question: "How long does the registration process take for each structure?",
    answer:
      "Private Limited / OPC / LLP: typically 7–10 working days after all documents and DSCs are ready. Section 8: 15–20 days (additional license approval). Partnership Firm: 3–5 days (registrar of firms). Proprietorship: 1–2 days (mostly registrations like GST, MSME). Public Limited: 10–15 days. Timelines depend on MCA/GST portal speeds and document completeness — we track every stage.",
  },
  {
    id: "physical-office",
    question: "Do I need a physical office address to register a company?",
    answer:
      "Yes, every company/LLP needs a registered office address in India for official correspondence. It can be a residential address (with NOC from owner), coworking space, or commercial premises. We accept scanned copies of rent agreement/utility bill + NOC. For clients without a space, we can suggest virtual office providers in major cities who offer registered address services.",
  },
  {
    id: "partnership-vs-llp",
    question: "What's the difference between a Partnership Firm and an LLP?",
    answer:
      "Partnership Firm: governed by Indian Partnership Act 1932, unlimited liability for partners, registration optional but recommended, simpler compliance. LLP: governed by LLP Act 2008, limited liability protection (partners not personally liable for business debts), mandatory ROC registration, annual filing (Form 8 & 11), higher credibility with banks/clients. LLP is generally preferred for scalable professional services.",
  },
];

export function CompanyRegistrationFAQ() {
  return (
    <section
      id="company-registration-faq"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="company-reg-faq-heading"
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
            id="company-reg-faq-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-[1.15]"
          >
            Company Registration{" "}
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
            Answers to what business owners ask most before registering
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
          <p className="text-muted-foreground mb-4">Still unsure which structure fits your business?</p>
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