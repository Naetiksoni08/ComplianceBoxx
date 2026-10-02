"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronUp,
  Clock,
  Phone,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About Us" },
  { href: "/#process", label: "Process" },
  { href: "/#contact", label: "Contact" },
];

const services = [
  { href: "/services/company-registration", label: "Company Registration" },
  { href: "/services/gst-registration-filing", label: "GST Registration & Filing" },
  { href: "/services/roc-mca-compliance", label: "ROC/MCA Compliance" },
  { href: "/services/trademark-registration", label: "Trademark Registration" },
  { href: "/services/fssai-license", label: "FSSAI License" },
  { href: "/services/income-tax-filing", label: "Income Tax Filing & Advisory" },
  { href: "/services/business-licenses-permits", label: "Business Licenses & Permits" },
  { href: "/services/ngo-registration-compliance", label: "NGO Registration & Compliance" },
];

const columnHeaderClass = "text-xs font-semibold tracking-widest uppercase text-accent mb-4 flex items-center gap-2";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      className="relative overflow-hidden"
      style={{
        background: "var(--dark)",
      }}
      aria-labelledby="footer-heading"
    >
      {/* Background decorations - matching CTA banner */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 h-[300px] w-[300px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[250px] w-[250px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[200px] rounded-full bg-primary/5 blur-3xl" />
        
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="footer-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="12" cy="12" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#footer-dots)" />
          </svg>
        </div>

        {/* Abstract geometric shapes */}
        <div className="absolute top-10 right-20 h-24 w-24 border-2 border-primary/20 rounded-2xl rotate-12" aria-hidden="true" />
        <div className="absolute bottom-10 left-20 h-16 w-16 border-2 border-accent/20 rounded-xl -rotate-6" aria-hidden="true" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">
          
          {/* Column 1 — Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-1"
          >
            <Link
              href="/"
              className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg mb-4 inline-flex"
              aria-label="ComplianceBoxx Home"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex h-14 w-14 items-center justify-center"
                aria-hidden="true"
              >
                <Image
                  src="/compliance.png"
                  alt=""
                  width={56}
                  height={56}
                  className="h-full w-full object-contain rounded-full"
                />
              </motion.div>
              <span className="font-heading text-xl font-bold text-white tracking-tight">
                <span className="text-white">Compliance</span>
                <span className="text-primary">Boxx</span>
              </span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Compliance services made simple — helping startups, SMEs, and individuals across India stay 100% compliant, from registration to ongoing filings.
            </p>
          </motion.div>

          {/* Column 2 — Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h3 className={columnHeaderClass}>
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Quick Links
            </h3>
            <nav aria-label="Quick links">
              <ul className="space-y-2.5" role="list">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white hover:text-accent transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Column 3 — Our Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h3 className={columnHeaderClass}>
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Our Services
            </h3>
            <nav aria-label="Our services">
              <ul className="space-y-2.5" role="list">
                {services.map((service, index) => (
                  <motion.li
                    key={service.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                  >
                    <Link
                      href={service.href}
                      className="text-sm text-white/60 hover:text-white hover:text-accent transition-colors duration-200"
                    >
                      {service.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Column 4 — Office Hours & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h3 className={columnHeaderClass}>
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              Office Hours
            </h3>
            <div className="space-y-2 text-sm text-white/70">
              <p>Monday – Saturday</p>
              <p className="font-medium text-white">10:00 AM – 7:00 PM</p>
            </div>
            <div className="mt-6 space-y-3">
              <a
                href="tel:+919911292157"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white hover:text-accent transition-colors duration-200"
              >
                <Phone className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span>+91 99112 92157</span>
              </a>
              <a
                href="mailto:contact@complianceboxx.in"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white hover:text-accent transition-colors duration-200"
              >
                <Mail className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span>contact@complianceboxx.in</span>
              </a>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span>Delhi NCR, India</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="border-t border-white/10 mb-8"
          style={{ transformOrigin: "left center" }}
          aria-hidden="true"
        />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Copyright */}
          <p className="text-sm text-white/50 text-center md:text-left">
            © 2026 ComplianceBoxx. All rights reserved.
          </p>

          {/* Back to Top */}
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="hidden md:inline text-xs font-semibold tracking-widest uppercase text-accent">
              BACK TO TOP
            </span>
            <button
              onClick={scrollToTop}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full",
                "border border-white/20 text-white/70",
                "hover:border-primary hover:bg-primary/20 hover:text-white",
                "transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              )}
              aria-label="Back to top"
            >
              <ChevronUp className="h-5 w-5" aria-hidden="true" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}