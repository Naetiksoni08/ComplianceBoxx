"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Phone } from "lucide-react";

/**
 * Blocking disclaimer shown once per browser.
 *
 * The overlay deliberately swallows every click until the visitor accepts, so
 * nobody can read the site without having seen the disclaimer first. Declining
 * sends them to Google instead, which is the usual pattern for sites where the
 * content is general guidance rather than a binding service contract.
 *
 * The choice is remembered in localStorage. A tiny inline script in the root
 * layout sets the same flag before React hydrates, which stops the modal
 * flashing on screen for returning visitors.
 */
const STORAGE_KEY = "cbx_disclaimer_accepted";

export function DisclaimerModal() {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "1") {
        setOpen(false);
      }
    } catch {
      // Private browsing with storage disabled: show the modal every visit.
    }
  }, []);

  // Stop the page behind the overlay from scrolling.
  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Move focus onto the dialog so keyboard users cannot tab out behind it.
  const acceptRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (open) acceptRef.current?.focus();
  }, [open]);

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Storage blocked; the modal will simply reappear next visit.
    }
    setOpen(false);
  };

  const decline = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-disclaimer-root=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="disclaimer-title"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-[2px]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-7"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-lighter text-primary">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2
                id="disclaimer-title"
                className="font-heading text-lg font-bold text-slate-900"
              >
                Please read this first
              </h2>
            </div>

            <div className="mt-4 space-y-3 text-[13px] leading-relaxed text-slate-600">
              <p>
                The information on this website is provided for{" "}
                <strong className="font-semibold text-slate-800">
                  general guidance only
                </strong>
                . It is not legal, tax, or financial advice, and reading it does
                not create a professional relationship with ComplianceBoxx.
              </p>
              <p>
                Rules, fees, and filing processes change often. Please confirm
                current requirements with the relevant authority or a qualified
                professional before acting on anything you read here.
              </p>
              <p>
                We work to keep every detail accurate, but ComplianceBoxx is not
                responsible for decisions or losses arising from reliance on
                this website.
              </p>
            </div>

            <a
              href="tel:+919911292157"
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary transition-colors hover:text-primary/80"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              Need help deciding? Call +91 99112 92157
            </a>

            <div className="mt-6 flex gap-3">
              <button
                ref={acceptRef}
                type="button"
                onClick={accept}
                className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={decline}
                className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Decline
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}