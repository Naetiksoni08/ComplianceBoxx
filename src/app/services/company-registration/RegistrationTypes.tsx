"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  User,
  Users,
  Building2,
  Heart,
  FileText,
  Briefcase,
  Home,
  Landmark,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const registrationTypes = [
  {
    id: "opc",
    title: "One Person Company (OPC) Registration",
    description:
      "Ideal for solo entrepreneurs who want the benefits of a private limited company — limited liability and separate legal identity — without needing a co-founder. Perfect for small business owners scaling up from a proprietorship.",
    icon: User,
  },
  {
    id: "partnership",
    title: "Partnership Firm Registration",
    description:
      "A simple, low-compliance structure for two or more people running a business together. Governed by the Indian Partnership Act, ideal for small and family-run businesses that don't need a corporate structure.",
    icon: Users,
  },
  {
    id: "private-limited",
    title: "Private Limited Company Registration",
    description:
      "India's most popular business structure for startups and growing businesses. Offers limited liability, easier fundraising, and higher credibility with investors, banks, and clients.",
    icon: Building2,
  },
  {
    id: "section8",
    title: "Section 8 Company Registration",
    description:
      "For non-profit organizations, charities, and NGOs focused on promoting art, science, education, or social welfare. Enjoys tax exemptions and can't distribute profits to members.",
    icon: Heart,
  },
  {
    id: "llp",
    title: "LLP (Limited Liability Partnership) Registration",
    description:
      "Combines the flexibility of a partnership with the limited liability protection of a company. A popular choice for professional services firms and small businesses with multiple partners.",
    icon: FileText,
  },
  {
    id: "proprietorship",
    title: "Proprietorship Registration",
    description:
      "The simplest way to start a business in India — minimal compliance, full control for a single owner. Best suited for small traders, freelancers, and local businesses just getting started.",
    icon: Briefcase,
  },
  {
    id: "plc-to-opc",
    title: "Private Limited to One Person Company Conversion",
    description:
      "For existing Private Limited Companies looking to simplify their structure — we handle the complete legal conversion process to OPC status when ownership consolidates to a single member.",
    icon: Home,
  },
  {
    id: "public-limited",
    title: "Public Limited Company Registration",
    description:
      "For businesses planning to raise capital from the public or list on a stock exchange. Requires higher compliance but allows unlimited shareholders and greater access to capital markets.",
    icon: Landmark,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function RegistrationTypes() {
  return (
    <section
      id="registration-types"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="registration-types-heading"
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
            Our Registration Services
          </span>
          <motion.h2
            id="registration-types-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-[1.15]"
          >
            Choose the Right Business Structure for{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-accent to-amber-500 bg-clip-text text-transparent">
                You
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
            We handle end-to-end registration for every business structure recognized under Indian company law
          </motion.p>
        </motion.div>

        {/* Registration Types Grid - 6-col grid on lg (each card spans 2), so the last row of 2 cards is truly centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8 [grid-auto-rows:1fr]">
          {registrationTypes.map((type, index) => (
            <motion.article
              key={type.id}
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
                <type.icon className="h-6 w-6" strokeWidth={2} />
              </motion.div>

              {/* Title */}
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 flex-shrink-0">
                {type.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 pb-6">
                {type.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}