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
    id: "company-registration-time",
    question: "How long does company registration take?",
    answer:
      "Private Limited company registration typically takes 7–10 working days once all documents are submitted and DSC/DIN are ready. LLPs and OPCs may be slightly faster at 5–7 days. Timelines can vary based on MCA processing speeds and document completeness — we keep you updated at every stage.",
  },
  {
    id: "online-process",
    question: "Do I need to visit your office, or is everything online?",
    answer:
      "Our entire process is 100% online — from document collection via secure upload to digital signatures and government portal filings. You never need to visit our office. For notarizations or in-person requirements, we coordinate doorstep pickup or guide you to the nearest notary. We serve clients across India remotely.",
  },
  {
    id: "gst-documents",
    question: "What documents do I need for GST registration?",
    answer:
      "Standard documents include: PAN card of the business/owner, Aadhaar card, proof of business address (rent agreement/utility bill + NOC), bank account details (cancelled cheque/statement), and photos of authorized signatories. Additional documents may be needed for specific business types — we provide a customized checklist after your free consultation.",
  },
  {
    id: "ongoing-support",
    question: "Do you provide ongoing compliance support after registration/filing?",
    answer:
      "Yes. We offer annual compliance packages covering ROC/MCA filings, GST returns, TDS returns, and statutory register maintenance. You get a dedicated compliance manager, deadline reminders, and a dashboard to track filing status. Renewals, amendments, and notice responses are all included — so you stay compliant year-round without surprises.",
  },
  {
    id: "pricing",
    question: "What are your charges? Is pricing transparent?",
    answer:
      "Absolutely. We share a fixed, itemized quote upfront — no hidden fees, no surprise add-ons. Government fees are listed separately. Pricing varies by service and entity type (e.g., Pvt Ltd vs LLP vs OPC). Book a free consultation for a personalized quote tailored to your exact requirements.",
  },
  {
    id: "pan-india",
    question: "Do you serve businesses outside Delhi NCR?",
    answer:
      "Yes, we serve clients across India — from Mumbai to Bangalore, Kolkata to Chennai, and everywhere in between. All filings are done electronically on central government portals (MCA, GSTN, Income Tax). For physical documents, we use secure courier with tracking. Our Delhi NCR office is available for in-person meetings if you prefer.",
  },
  {
    id: "missed-deadline",
    question: "What happens if I miss a compliance deadline?",
    answer:
      "Missing deadlines can attract penalties, interest, and in some cases, legal proceedings or director disqualification. If you've missed a filing, contact us immediately — we can often file with late fees, apply for condonation, or regularize the default. Proactive compliance is always cheaper than reactive fixes — which is why our annual packages include deadline tracking.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="faq-heading"
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
            Got Questions?
          </span>
          <motion.h2
            id="faq-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-[1.15]"
          >
            Frequently Asked{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-accent to-amber-500 bg-clip-text text-transparent">
                Questions
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
            Everything you need to know before getting started
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
                  {faq.answer}
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
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Ask Us Directly
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}