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
    id: "timeline",
    question: "How long does trademark registration take in India?",
    answer:
      "Typically 12–18 months from filing to registration, assuming no objections or oppositions. The application gets an immediate TM number, and you can use the ™ symbol right away. Examination happens around month 3–4, publication in the Journal at month 6–8, then a 4-month opposition period. If unopposed, registration certificate issues within 2–3 months after that. We track every stage and keep you updated.",
  },
  {
    id: "tm-vs-r",
    question: "What's the difference between ™ and ® symbols?",
    answer:
      "™ means you've filed a trademark application (or claim common-law rights) — it puts others on notice but offers limited legal protection. ® means your trademark is officially registered with the Trademark Registry — it grants full statutory protection, the right to sue for infringement, and nationwide exclusive rights. Using ® before registration is an offense. We'll guide you on correct usage at each stage.",
  },
  {
    id: "before-registration",
    question: "Can I use my brand name before the trademark is officially registered?",
    answer:
      "Yes. Once you file, you receive an application number and can use the ™ symbol immediately. This establishes your claim date. However, full legal enforcement (injunctions, damages) only comes after registration. If someone else registers a similar mark first, they get priority. We recommend filing early and using ™ while the application is pending.",
  },
  {
    id: "objection",
    question: "What happens if someone objects to my trademark application?",
    answer:
      "If the Registrar raises an objection (Section 9/11 — distinctiveness, descriptiveness, or similarity to existing marks), you have 1 month to file a reply with arguments and evidence. A well-drafted response can overcome most objections. If the objection persists, a hearing is scheduled. We draft strong, evidence-backed replies and represent you at hearings to maximize approval chances.",
  },
  {
    id: "classes",
    question: "How many trademark classes do I need to register under?",
    answer:
      "It depends on your goods/services. India follows the Nice Classification (45 classes). You must register in every class where you currently use or plan to use the mark. Most brands file in 1–3 core classes (e.g., Class 25 for clothing, Class 35 for retail). Over-filing increases costs; under-filing leaves gaps. We'll advise on the optimal class strategy for your business.",
  },
  {
    id: "logo-vs-name",
    question: "Can I trademark just a logo, just a name, or do I need both separately?",
    answer:
      "You can register a wordmark (name only), device mark (logo only), or combined mark (name + logo together). Wordmark gives the broadest protection — it covers the name in any font/style. Device mark protects only that exact visual design. Combined mark protects the specific combination. Most businesses file wordmark + logo separately for maximum coverage. We'll recommend the right approach.",
  },
  {
    id: "validity-renewal",
    question: "What is the validity period of a registered trademark, and how do I renew it?",
    answer:
      "A registered trademark is valid for 10 years from the application date (not registration date). Renewal is filed in Form TM-R within 6 months before expiry (with a 6-month grace period after expiry on payment of surcharge). We track your renewal dates and handle the filing so your protection never lapses. Non-renewal means the mark is removed from the register and becomes available to others.",
  },
  {
    id: "infringement",
    question: "What should I do if someone is using a brand name similar to mine?",
    answer:
      "First, check if you have a registered trademark. If registered, you can send a cease-and-desist notice, file for an injunction, and claim damages. If unregistered but you've used it extensively, you may have common-law 'passing off' rights. We'll assess the strength of your case, draft legal notices, and represent you in opposition or infringement proceedings. Early action is critical — delay weakens your position.",
  },
];

export function TrademarkFAQ() {
  return (
    <section
      id="trademark-faq"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="trademark-faq-heading"
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
            id="trademark-faq-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-[1.15]"
          >
            Trademark Registration{" "}
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
            Answers to what brand owners ask most before registering a trademark
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
          <p className="text-muted-foreground mb-4">Not sure if your brand name is available?</p>
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