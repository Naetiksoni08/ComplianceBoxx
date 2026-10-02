"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  FileText,
  Gavel,
  Shield,
  Users,
  Scale,
  Briefcase,
  Sparkles,
  ArrowRight,
  HeartHandshake,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "company-registration",
    title: "Business/Company Registration",
    description: "MCA name Approval, MOA/AOA Drafting, Private Limited, LLP, OPC, Partnership — end-to-end incorporation with DIN, DSC & PAN/TAN.",
    icon: Building2,
    href: "/services/company-registration",
  },
  {
    id: "gst",
    title: "GST Registration & Filing",
    description: "New registration, monthly/quarterly returns, amendments, cancellations & GST advisory.",
    icon: FileText,
    href: "/services/gst-registration-filing",
  },
  {
    id: "roc-mca",
    title: "ROC / MCA Annual Compliance",
    description: "Annual returns (MGT-7, AOC-4), board meetings, statutory registers, event-based filings.",
    icon: Gavel,
    href: "/services/roc-mca-compliance",
  },
  {
    id: "trademark",
    title: "Trademark Registration",
    description: "Search, filing, objection replies, opposition handling, renewals & brand protection.",
    icon: Shield,
    href: "/services/trademark-registration",
  },
  {
    id: "fssai",
    title: "FSSAI License",
    description: "Basic, State & Central license registration, renewal, modification for food businesses.",
    icon: Users,
    href: "/services/fssai-license",
  },
  {
    id: "tax-filing",
    title: "Income Tax Filing & Advisory",
    description: "ITR filing for companies/LLPs/individuals, TDS returns, tax planning & notice handling.",
    icon: Scale,
    href: "/services/income-tax-filing",
  },
  {
    id: "licenses",
    title: "Business Licenses & Permits",
    description: "Trade license, MSME/UDYAM, import-export code, pollution NOC, fire safety & more.",
    icon: Sparkles,
    href: "/services/business-licenses-permits",
  },
  {
    id: "ngo-registration",
    title: "NGO Registration & Compliance",
    description: "Trust, society, cooperative & Section 8 registration — plus 80G, 12A, FCRA and ongoing compliance filings.",
    icon: HeartHandshake,
    href: "/services/ngo-registration-compliance",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function Services() {
  return (
    <section
      id="services"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="services-heading"
    >
      {/* Background accent blobs */}
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
            Our Services
          </span>
          <motion.h2
            id="services-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-[1.15]"
          >
            Everything Your Business Needs to Stay{" "}
            <span className="text-primary">Compliant</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-5 text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            From incorporation to ongoing statutory compliance — we handle the paperwork so you can
            focus on growth. Transparent pricing, expert support, fully online.
          </motion.p>
        </motion.div>

        {/* Services Grid - Flexbox for centered last row */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.08 }}
              className="group relative rounded-2xl bg-card border border-border p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 w-full sm:max-w-[calc(50%-1.5rem)] lg:max-w-[calc(33.333%-1.333rem)]"
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
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                {service.description}
              </p>

              {/* Learn More Link */}
              <Link
                href={service.href}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors duration-200 group-hover:underline"
              >
                Learn More
                <motion.span
                  className="inline-block"
                  animate={{ x: ["0", "4", "0"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-16 lg:mt-20 text-center"
        >
          <p className="text-muted-foreground mb-4">Don't see what you need?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Get in Touch
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}