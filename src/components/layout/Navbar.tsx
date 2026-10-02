"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, FileText, Gavel, Building2, Shield, Users, Calculator, Sparkles, Briefcase, HeartHandshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About Us" },
  { href: "/#process", label: "Process" },
  { href: "/#contact", label: "Contact" },
];

const services = [
  { href: "/services/company-registration", label: "Company Registration", icon: Building2, description: "Private Limited, LLP, OPC" },
  { href: "/services/gst-registration-filing", label: "GST Registration & Filing", icon: FileText, description: "Registration, Returns" },
  { href: "/services/roc-mca-compliance", label: "ROC / MCA Annual Compliance", icon: Gavel, description: "Annual Filings, Compliance" },
  { href: "/services/trademark-registration", label: "Trademark Registration", icon: Shield, description: "Search, Filing, Renewal" },
  { href: "/services/fssai-license", label: "FSSAI License", icon: Users, description: "Basic, State, Central" },
  { href: "/services/income-tax-filing", label: "Income Tax Filing & Advisory", icon: Calculator, description: "ITR, TDS, Planning" },
  { href: "/services/business-licenses-permits", label: "Business Licenses & Permits", icon: Briefcase, description: "Trade, MSME, IEC" },
  { href: "/services/ngo-registration-compliance", label: "NGO Registration & Compliance", icon: HeartHandshake, description: "Trust, Society, Sec 8" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isServicesOpen, setIsServicesOpen] = React.useState(false);
  const [hoveredService, setHoveredService] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  const handleServiceClick = (href: string) => {
    handleMobileLinkClick();
    window.location.href = href;
  };

  // Color classes based on scroll state
  const logoTextClass = cn(
    "font-heading text-xl font-bold tracking-tight transition-colors duration-300",
    isScrolled ? "text-slate-900" : "text-white"
  );

  const navLinkClass = cn(
    "rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-primary-lighter focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    isScrolled
      ? "text-slate-600 hover:text-primary hover:bg-primary-lighter"
      : "text-white/90 hover:text-white hover:bg-white/10"
  );

  const getInTouchClass = cn(
    "rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    isScrolled
      ? "text-slate-600 hover:text-primary hover:bg-primary-lighter"
      : "text-white/90 hover:text-white hover:bg-white/10"
  );

  const mobileMenuIconClass = cn(
    "md:hidden flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 hover:bg-primary-lighter focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    isScrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white"
  );

  const servicesButtonClass = cn(
    "flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    isServicesOpen
      ? "text-primary bg-primary-lighter"
      : isScrolled
        ? "text-slate-600 hover:text-primary hover:bg-primary-lighter"
        : "text-white/90 hover:text-white hover:bg-white/10"
  );

  const mobileNavLinkClass = cn(
    "rounded-xl px-3 py-3 text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    isScrolled
      ? "text-foreground/80 hover:text-primary hover:bg-primary-lighter"
      : "text-white/90 hover:text-white hover:bg-white/10"
  );

  const mobileServicesButtonClass = cn(
    "flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    isServicesOpen
      ? "text-primary bg-primary-lighter"
      : isScrolled
        ? "text-slate-600 hover:text-primary hover:bg-primary-lighter"
        : "text-white/90 hover:text-white hover:bg-white/10"
  );

  const mobileGetInTouchClass = cn(
    "block w-full rounded-xl px-4 py-3 text-center text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    isScrolled
      ? "text-foreground/80 hover:text-primary hover:bg-primary-lighter"
      : "text-white/90 hover:text-white hover:bg-white/10"
  );

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-primary-light"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-1">
              <Link
                href="/"
                className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
                aria-label="ComplianceBoxx Home"
                onClick={handleMobileLinkClick}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="flex h-14 w-14 items-center justify-center"
                  aria-hidden="true"
                >
                  <Image
                    src={isScrolled ? "/compliance2.png" : "/compliance.png"}
                    alt=""
                    width={56}
                    height={56}
                    className="h-full w-full object-contain"
                  />
                </motion.div>
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="font-heading text-xl font-bold tracking-tight"
                >
                  <span className={cn("transition-colors duration-300", isScrolled ? "text-slate-900" : "text-white")}>
                    Compliance
                  </span>
                  <span className="text-primary">
                    Boxx
                  </span>
                </motion.span>
              </Link>
            </div>

            <div className="hidden md:flex md:items-center md:gap-1">
              {navLinks.map((link, index) => (
                <motion.span
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {link.label === "Services" ? (
                    <div className="relative" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
                      <button
                        className={servicesButtonClass}
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        aria-expanded={isServicesOpen}
                        aria-haspopup="true"
                        aria-label="Services menu"
                      >
                        {link.label}
                        <ChevronDown
                          className={cn("h-4 w-4 transition-transform duration-200", isServicesOpen && "rotate-180")}
                          aria-hidden="true"
                        />
                      </button>

                      <AnimatePresence>
                        {isServicesOpen && (
                          <div className="relative pt-2" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
                            {/* Upward caret */}
                            <div className="absolute left-12 top-0 w-6 h-6 bg-white rotate-45 border-l border-t border-slate-100 -translate-y-1/2" aria-hidden="true" />
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                              className="absolute left-0 top-full z-50 w-[680px] rounded-2xl bg-white p-5 shadow-2xl border border-slate-100 ring-1 ring-slate-100"
                              role="menu"
                            >
                            {/* Dropdown Header */}
                            <div className="mb-3 pb-3 border-b border-slate-100">
                              <span className="text-xs font-semibold tracking-widest uppercase text-slate-900 flex items-center gap-1.5">
                                <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                                Our Services
                              </span>
                            </div>

                            {/* Services Grid - 2 columns */}
                            <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                              {services.map((service, i) => (
                                <motion.button
                                  key={service.href}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.15, delay: 0.03 * i }}
                                  className={cn(
                                    "group relative flex items-start gap-3 rounded-xl px-3 py-2 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full",
                                    hoveredService === service.href
                                      ? "bg-primary/5"
                                      : "hover:bg-primary/5"
                                  )}
                                  onMouseEnter={() => setHoveredService(service.href)}
                                  onMouseLeave={() => setHoveredService(null)}
                                  onClick={() => handleServiceClick(service.href)}
                                  role="menuitem"
                                >
                                  <div className={cn(
                                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-200",
                                    hoveredService === service.href
                                      ? "bg-primary text-white scale-105 shadow-[0_8px_20px_-4px_rgb(30,58,138,0.4)]"
                                      : "bg-primary text-white"
                                  )}>
                                    <service.icon className="h-5 w-5" aria-hidden="true" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <span className={cn(
                                      "block font-semibold text-sm leading-snug break-words transition-colors duration-200",
                                      hoveredService === service.href
                                        ? "text-primary"
                                        : "text-slate-900 group-hover:text-primary"
                                    )}>
                                      {service.label}
                                    </span>
                                    <span className="block text-xs mt-1 text-slate-500">
                                      {service.description}
                                    </span>
                                  </div>
                                  <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: hoveredService === service.href ? 1 : 0, x: hoveredService === service.href ? 0 : -10 }}
                                    transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    className="flex items-center text-primary"
                                  >
                                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                  </motion.div>
                                </motion.button>
                              ))}
                            </div>

                            {/* Dropdown Footer */}
                            <div className="mt-3 pt-3 border-t border-slate-100 rounded-b-2xl bg-slate-50">
                              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  <span className="text-xs text-slate-500">Not sure which service you need?</span>
                                  <Link
                                    href="/#services"
                                    onClick={handleMobileLinkClick}
                                    className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors duration-200 flex items-center gap-1"
                                  >
                                    View All Services
                                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                  </Link>
                                </div>
                                <Link
                                  href="/#contact"
                                  onClick={handleMobileLinkClick}
                                  className="text-sm font-semibold text-white bg-primary px-4 py-2 rounded-xl hover:bg-primary-hover transition-colors duration-200 whitespace-nowrap"
                                >
                                  Book Free Consultation
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={navLinkClass}
                      onClick={handleMobileLinkClick}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.span>
              ))}
            </div>

            <div className="hidden md:flex md:items-center md:gap-3">
              <Link
                href="/#contact"
                className={getInTouchClass}
                onClick={handleMobileLinkClick}
              >
                Get in Touch
              </Link>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/#contact" onClick={handleMobileLinkClick}>
                  <Button size="xl" className="bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all duration-200 hover:shadow-primary/40">
                    Book Free Consultation
                  </Button>
                </Link>
              </motion.div>
            </div>

            <button
              className={mobileMenuIconClass}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:hidden overflow-hidden bg-white border-t border-primary-light"
            >
              <div className="px-4 py-4 space-y-3">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 + index * 0.05 }}
                  >
{link.label === "Services" ? (
                        <div className="space-y-2">
                          <button
                            className={mobileServicesButtonClass}
                            onClick={() => setIsServicesOpen(!isServicesOpen)}
                            aria-expanded={isServicesOpen}
                          >
                            {link.label}
                            <ChevronDown
                              className={cn("h-5 w-5 transition-transform duration-200", isServicesOpen && "rotate-180")}
                              aria-hidden="true"
                            />
                          </button>
                          <AnimatePresence>
                            {isServicesOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="mt-2 space-y-2"
                              >
                                {/* Mobile Dropdown Header */}
                                <div className="pb-2 border-b border-primary-light">
                                  <span className="text-xs font-semibold tracking-widest uppercase text-accent flex items-center gap-1.5">
                                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                                    Our Services
                                  </span>
                                </div>
                                {/* Mobile Services Grid - single column on mobile */}
                                <div className="space-y-1">
                                  {services.map((service, i) => (
                                    <motion.button
                                      key={service.href}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.15, delay: 0.02 * i }}
                                      className={cn(
                                        "group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                        "text-muted-foreground hover:bg-primary-lighter hover:text-primary"
                                      )}
                                      onClick={() => handleServiceClick(service.href)}
                                      role="menuitem"
                                    >
                                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                                        <service.icon className="h-4.5 w-4.5" aria-hidden="true" />
                                      </div>
                                      <div className="min-w-0">
                                        <span className="block font-medium text-sm truncate">{service.label}</span>
                                        <span className="block text-xs mt-0.5 text-muted-foreground truncate">{service.description}</span>
                                      </div>
                                    </motion.button>
                                  ))}
                                </div>
                                {/* Mobile Dropdown Footer */}
                                <div className="pt-2 border-t border-primary-light">
                                  <Link
                                    href="/services"
                                    onClick={handleMobileLinkClick}
                                    className="flex items-center justify-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors duration-200"
                                  >
                                    View All Services
                                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                  </Link>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                    ) : (
                      <Link
                        href={link.href}
                        className={mobileNavLinkClass}
                        onClick={handleMobileLinkClick}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="pt-2 space-y-3"
                >
                  <Link
                    href="/contact"
                    className={mobileGetInTouchClass}
                    onClick={handleMobileLinkClick}
                  >
                    Get in Touch
                  </Link>
                  <Button
                    size="xl"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg shadow-primary/30"
                    asChild
                    onClick={handleMobileLinkClick}
                  >
                    <Link href="/contact">Book Free Consultation</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <div className="h-16 md:h-16" aria-hidden="true" />
    </>
  );
}