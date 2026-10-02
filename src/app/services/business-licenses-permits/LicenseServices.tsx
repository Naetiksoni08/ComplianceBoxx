"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Store,
  Building2,
  Globe,
  CreditCard,
  Key,
  Rocket,
  Briefcase,
  FileCheck2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const licenseServices = [
  {
    id: "shop-establishment",
    title: "Shop & Establishment License",
    description:
      "Mandatory registration for any commercial establishment — shops, offices, restaurants — under your state's Shops & Establishment Act, required to legally operate and open a current bank account.",
    icon: Store,
  },
  {
    id: "udyam",
    title: "Udyam (MSME) Registration",
    description:
      "Official recognition as a Micro, Small, or Medium Enterprise, unlocking access to government subsidies, easier loans, priority sector lending, and tender preferences.",
    icon: Building2,
  },
  {
    id: "iec",
    title: "Import Export Code (IEC) Registration",
    description:
      "Mandatory 10-digit code from DGFT required for any business looking to import or export goods and services from India — a one-time registration with lifetime validity.",
    icon: Globe,
  },
  {
    id: "professional-tax",
    title: "Professional Tax Registration",
    description:
      "State-mandated registration for employers and professionals to deduct and deposit professional tax on salaries and income, applicable in most Indian states.",
    icon: CreditCard,
  },
  {
    id: "dsc",
    title: "Digital Signature Certificate (DSC)",
    description:
      "Legally valid digital signatures required for filing ROC forms, GST returns, income tax returns, and e-tendering — issued for individuals and business entities.",
    icon: Key,
  },
  {
    id: "startup-india",
    title: "Startup India Recognition (DPIIT)",
    description:
      "Registration under the Startup India initiative to unlock tax exemptions, easier compliance, and access to government funding schemes for eligible early-stage businesses.",
    icon: Rocket,
  },
  {
    id: "trade-license",
    title: "Trade License",
    description:
      "Municipal corporation license required to legally conduct a specific trade or business activity within a city or local jurisdiction, covering health, safety, and zoning compliance.",
    icon: Briefcase,
  },
  {
    id: "import-license",
    title: "Import License for Restricted/Special Goods",
    description:
      "Specialized licensing support for businesses dealing in restricted or regulated categories of goods that require additional government authorization beyond standard IEC registration.",
    icon: FileCheck2,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function LicenseServices() {
  return (
    <section
      id="license-services"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="license-services-heading"
    >
      {/* Background decorations */}
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
            Our Licensing Services
          </span>
          <motion.h2
            id="license-services-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-[1.15]"
          >
            The Right Permits for Your{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-accent to-amber-500 bg-clip-text text-transparent">
                Business Type
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
            From local shop licenses to national trade codes — we handle the paperwork so you can focus on running your business
          </motion.p>
        </motion.div>

        {/* License Services Grid - 6-col grid on lg (each card spans 2), so the last row of 2 cards is truly centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8 [grid-auto-rows:1fr]">
          {licenseServices.map((service, index) => (
            <motion.article
              key={service.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.08 }}
              className={cn(
                "group relative rounded-2xl bg-card border border-border p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 flex flex-col h-full",
                // Each card spans 2 of 6 columns → 3 cards per row
                "lg:col-span-2",
                // Last row has 2 cards → start card 7 at col 2 so both sit centered (card 8 lands on cols 4-5)
                index === 6 && "lg:col-start-2"
              )}
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
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 flex-shrink-0">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 pb-6">
                {service.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}