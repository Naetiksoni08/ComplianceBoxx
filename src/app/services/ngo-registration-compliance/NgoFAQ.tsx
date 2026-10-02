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
    id: "choose-structure",
    question: "Which structure should I choose — Trust, Society, or Section 8 Company?",
    answer:
      "Trust: simplest, 2+ trustees, ideal for family/religious charitable work, registered with Sub-Registrar. Society: 7+ members, democratic governance, registered under Societies Registration Act, common for clubs/associations. Section 8: company-like structure, 2+ directors, registered with MCA, best for larger NGOs needing credibility, CSR funding, and perpetual succession. We'll advise based on your scale, governance preference, and funding sources.",
  },
  {
    id: "80g-vs-12a",
    question: "What's the difference between 80G and 12A registration?",
    answer:
      "12A: exempts your NGO's own income from income tax — you don't pay tax on surplus. 80G: allows donors to claim 50% deduction on donations to your NGO. 12A is mandatory for any tax exemption; 80G is optional but critical for fundraising. Both require separate applications to the Income Tax Department, periodic renewal (now 5-year validity), and compliance with conditions. We handle both together for new NGOs.",
  },
  {
    id: "fcra-needed",
    question: "Do I need FCRA registration to accept donations from abroad?",
    answer:
      "Yes. Any NGO receiving foreign contributions (funds, articles, securities) must have FCRA registration or prior permission from the Ministry of Home Affairs. Registration requires 3 years of existence and ₹15 lakh+ spent on core activities. Prior permission is for newer NGOs. We also handle ongoing FCRA compliance: annual return FC-4, designated bank account, utilisation certificates, and quarterly intimations.",
  },
  {
    id: "registration-timeline",
    question: "How long does NGO registration typically take?",
    answer:
      "Trust: 15–30 days (trust deed + Sub-Registrar). Society: 30–60 days (Memorandum + Rules + Registrar). Section 8: 30–45 days (name approval + licence + incorporation). 12A/80G: 3–6 months (Income Tax Department review). FCRA: 6–12 months (MHA scrutiny). Timelines vary by state/authority workload. We track every application and follow up proactively.",
  },
  {
    id: "annual-compliance",
    question: "What annual compliance is required after registering an NGO?",
    answer:
      "Trust: annual return + audited accounts to Sub-Registrar. Society: annual list of governing body + audited accounts to Registrar. Section 8: MGT-7, AOC-4, board meetings, statutory registers (like companies). 12A/80G: renewal every 5 years with updated docs. FCRA: annual FC-4 return, quarterly intimation of foreign receipts, utilisation certificate. We manage the full compliance calendar for you.",
  },
  {
    id: "switch-structure",
    question: "Can an existing NGO switch from one structure to another later?",
    answer:
      "Direct conversion isn't provided for in law, but you can form a new entity (e.g., Section 8) and transfer assets/operations, then wind up the old one. This requires careful planning: asset transfer, registration cancellations, fresh 12A/80G/FCRA applications. We've helped organisations restructure — it's feasible but needs advance planning to maintain tax exemptions and donor continuity.",
  },
  {
    id: "documents-required",
    question: "What documents are required to register a trust or society?",
    answer:
      "Trust: trust deed on stamp paper, PAN/TAN application, ID/address proof of settlers & trustees, photos, property proof (if immovable asset). Society: memorandum of association, rules & regulations, PAN application, ID/address proof of 7+ members, affidavit, property proof. Section 8: DIN/DSC for directors, MOA/AOA, licence application, projected financials. We provide a complete customized checklist for your chosen structure.",
  },
  {
    id: "minimum-members",
    question: "Is there a minimum number of members/trustees required?",
    answer:
      "Trust: minimum 2 trustees (no upper limit). Society: minimum 7 members for national-level, some states allow 5 for state-level. Section 8 Company: minimum 2 directors, 2 members. Cooperative Society: minimum 10 members (state) or 50+ from multiple states (multi-state). No maximum for any. We'll help you meet the minimum and structure the governing body correctly.",
  },
];

export function NgoFAQ() {
  return (
    <section
      id="ngo-faq"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="ngo-faq-heading"
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
            id="ngo-faq-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-[1.15]"
          >
            NGO Registration & Compliance{" "}
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
            Answers to what organisations ask most about setting up and running an NGO in India
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
          <p className="text-muted-foreground mb-4">Not sure which structure fits your organisation?</p>
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