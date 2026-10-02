"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Search,
  FileText,
  Image,
  AlertCircle,
  Scale,
  RotateCcw,
  Briefcase,
  Eye,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const trademarkServices = [
  {
    id: "search",
    title: "Trademark Search & Availability Check",
    description:
      "Before filing, we conduct a thorough search of existing trademarks to check your brand name or logo's availability and reduce the risk of objection or rejection.",
    icon: Search,
  },
  {
    id: "filing",
    title: "Trademark Application Filing",
    description:
      "End-to-end filing of your trademark application with the Trademark Registry under the correct class, along with proper documentation and representation of your mark.",
    icon: FileText,
  },
  {
    id: "logo-wordmark",
    title: "Logo & Wordmark Registration",
    description:
      "Registration for both your brand name (wordmark) and visual logo design, so your complete brand identity is legally protected.",
    icon: Image,
  },
  {
    id: "objection",
    title: "Trademark Objection & Examination Reply",
    description:
      "If the Registrar raises an objection during examination, we draft and file a strong, timely response to keep your application moving forward.",
    icon: AlertCircle,
  },
  {
    id: "opposition",
    title: "Trademark Opposition Handling",
    description:
      "If a third party opposes your trademark application, we represent your case and file the necessary counter-statements to protect your rights.",
    icon: Scale,
  },
  {
    id: "renewal",
    title: "Trademark Renewal",
    description:
      "Trademarks are valid for 10 years and must be renewed to stay protected — we track your renewal deadline and handle the complete renewal filing.",
    icon: RotateCcw,
  },
  {
    id: "assignment",
    title: "Trademark Assignment & Licensing",
    description:
      "Legal support for transferring trademark ownership or licensing your brand to another party, with proper documentation filed with the Registry.",
    icon: Briefcase,
  },
  {
    id: "watch",
    title: "Trademark Infringement Watch & Advisory",
    description:
      "Ongoing monitoring support to help identify potential infringement of your registered trademark, with advisory on the right legal action to take.",
    icon: Eye,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function TrademarkServices() {
  return (
    <section
      id="trademark-services"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="trademark-services-heading"
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
            Our Trademark Services
          </span>
          <motion.h2
            id="trademark-services-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-[1.15]"
          >
            From Brand Search to Registered{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-accent to-amber-500 bg-clip-text text-transparent">
                Protection
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
            Everything you need to secure and protect your brand identity legally
          </motion.p>
        </motion.div>

        {/* Trademark Services Grid - 6-col grid on lg (each card spans 2), so the last row of 2 cards is truly centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8 [grid-auto-rows:1fr]">
          {trademarkServices.map((service, index) => (
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