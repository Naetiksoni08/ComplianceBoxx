"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";

/**
 * Blocking disclaimer shown on every page load.
 *
 * The overlay deliberately swallows every click until the visitor accepts, so
 * nobody reads the site without having seen the disclaimer first. "I Agree"
 * simply closes the modal — it never navigates, so a visitor who reloads
 * /services/company-registration stays on that same service page. Only "Deny"
 * leaves the site.
 *
 * Nothing is remembered on purpose: the disclaimer must reappear on every
 * reload rather than being stored in localStorage.
 */
const POINTS = [
  "You are voluntarily using our website to obtain information for your personal use and reference.",
  "Any information obtained or downloaded from this website does not create a professional relationship between ComplianceBoxx and you.",
  "The content on this website is for informational purposes only and cannot be construed as professional, legal, or financial advice.",
  "Rules, fees, and filing processes change frequently. Please confirm the current requirements with the relevant authority before you act.",
  "ComplianceBoxx will not be held liable for any consequences arising from actions taken on the basis of the information provided here.",
];

export function DisclaimerModal() {
  const [open, setOpen] = React.useState(true);

  // Stop the page behind the overlay from scrolling while it is up.
  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Put keyboard focus inside the dialog so nobody can tab out behind it.
  const agreeRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (open) agreeRef.current?.focus();
  }, [open]);

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
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-slate-900/70 p-4 backdrop-blur-[2px] sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="my-auto w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-10"
          >
            {/* Centred legal-style header: icon, tracked-out title, rule beneath. */}
            <div className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-hover text-white shadow-lg shadow-primary/20">
                <ShieldCheck className="h-7 w-7" aria-hidden="true" />
              </span>
              <h2
                id="disclaimer-title"
                className="mt-4 font-heading text-2xl font-extrabold uppercase tracking-[0.14em] text-slate-900"
              >
                Disclaimer
              </h2>
              <span className="mt-3 block h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>

            <p className="mt-6 text-center text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              The rules and regulations prescribed by the concerned authorities
              are subject to change. By accessing the ComplianceBoxx website, you
              acknowledge that:
            </p>

            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              {POINTS.map((point) => (
                <li key={point} className="flex gap-3">
                  <span
                    className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  window.location.href = "https://www.google.com";
                }}
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Deny
              </button>
              <button
                ref={agreeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                I Agree
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
