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
    id: "home-based",
    question: "Do I need an FSSAI license to run a home-based food business?",
    answer:
      "Yes. Any food business — including home kitchens, tiffin services, and homemade food sales — needs at least FSSAI Basic Registration if annual turnover is ≤ ₹12 lakh. For higher turnover, State License applies. Online platforms (Swiggy, Zomato, etc.) also require valid FSSAI registration before onboarding. We handle registration for home-based sellers end-to-end.",
  },
  {
    id: "license-types",
    question: "What's the difference between FSSAI Basic Registration, State License, and Central License?",
    answer:
      "Basic Registration: turnover ≤ ₹12 lakh, single state, petty food business. State License: turnover ₹12 lakh – ₹20 crore, single state, mid-sized operations (restaurants, manufacturers). Central License: turnover > ₹20 crore, multi-state operations, importers/exporters, 100% export-oriented units, central government agencies. We determine the correct tier based on your turnover, scale, and operational footprint.",
  },
  {
    id: "determine-type",
    question: "How is the correct license type determined for my business?",
    answer:
      "It's based on three factors: (1) Annual turnover, (2) Geographic scope (single state vs multi-state), (3) Nature of activity (manufacturing, storage, distribution, retail, import/export). The FSSAI portal uses these criteria to auto-suggest the license type during application. We assess your business upfront and apply for the exact tier you need — avoiding rejections or upgrades later.",
  },
  {
    id: "documents",
    question: "What documents are required for FSSAI registration?",
    answer:
      "Standard documents: PAN card, Aadhaar card, passport-size photo of proprietor/partners/directors; proof of business address (rent agreement/utility bill + NOC); list of food products/categories; food safety management plan (for State/Central); water test report (for manufacturing); Form IX nomination (for companies). Additional docs may apply for specific categories. We provide a customized checklist after consultation.",
  },
  {
    id: "timeline",
    question: "How long does it take to get an FSSAI license approved?",
    answer:
      "Basic Registration: typically 7–10 working days. State License: 15–30 days (requires inspection). Central License: 20–35 days (more scrutiny, may require inspection). Timelines depend on document completeness, FSSAI portal speed, and whether an inspection is triggered. We ensure error-free filing and follow up with the department to minimize delays.",
  },
  {
    id: "no-license",
    question: "What happens if I operate a food business without an FSSAI license?",
    answer:
      "Penalty up to ₹5 lakh and/or imprisonment up to 6 months under Section 63 of the FSS Act. Your business can be shut down, products seized, and you may face legal action from consumers or competitors. Online platforms will delist you. The cost of compliance is far lower — we make it simple and fast.",
  },
  {
    id: "renewal-frequency",
    question: "How often do I need to renew my FSSAI license?",
    answer:
      "FSSAI licenses are valid for 1–5 years (chosen at application). Renewal must be filed in Form A (Basic) or Form B (State/Central) at least 30 days before expiry. Late renewal attracts ₹100/day penalty. We track your expiry date and file renewal well in advance so your license never lapses.",
  },
  {
    id: "cloud-kitchen",
    question: "Do cloud kitchens and food delivery businesses need a separate license?",
    answer:
      "No separate category — they fall under State License (if turnover ₹12 lakh – ₹20 crore, single state) or Central License (multi-state or > ₹20 crore). Key requirements: hygiene compliance, food safety display board, proper labeling on delivered food, and traceability records. We specialize in cloud kitchen compliance and ensure you meet aggregator (Swiggy/Zomato) requirements.",
  },
];

export function FssaiFAQ() {
  return (
    <section
      id="fssai-faq"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="fssai-faq-heading"
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
            id="fssai-faq-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-[1.15]"
          >
            FSSAI License{" "}
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
            Answers to what food business owners ask most about FSSAI compliance
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
          <p className="text-muted-foreground mb-4">Not sure which FSSAI license your business needs?</p>
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