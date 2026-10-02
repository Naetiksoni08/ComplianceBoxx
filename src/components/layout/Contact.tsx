"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Check,
  Sparkles,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The lead handler is a standalone PHP file placed next to the exported site.
 * When the app is served from a different origin during development (or when
 * the PHP file is not deployed yet), fall back to the deployed path so the
 * form still works in production.
 */
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "/contact.php";

const serviceOptions = [
  { value: "", label: "Select a service" },
  { value: "company-registration", label: "Company Registration" },
  { value: "gst", label: "GST Registration & Filing" },
  { value: "roc-mca", label: "ROC / MCA Compliance" },
  { value: "trademark", label: "Trademark Registration" },
  { value: "fssai", label: "FSSAI License" },
  { value: "labour-law", label: "Labour Law Compliance" },
  { value: "tax-filing", label: "Income Tax Filing & Advisory" },
  { value: "licenses", label: "Business Licenses & Permits" },
  { value: "other", label: "Other" },
];

/**
 * Dialing codes offered next to the phone field. ComplianceBoxx handles a lot
 * of NRI clients, so the customer picks their own country instead of everyone
 * being forced into +91 — which is what broke the WhatsApp deep link before.
 */
const countryOptions = [
  { code: "IN", dial: "+91", flag: "🇮🇳", label: "India" },
  { code: "AE", dial: "+971", flag: "🇦🇪", label: "United Arab Emirates" },
  { code: "SA", dial: "+966", flag: "🇸🇦", label: "Saudi Arabia" },
  { code: "QA", dial: "+974", flag: "🇶🇦", label: "Qatar" },
  { code: "KW", dial: "+965", flag: "🇰🇼", label: "Kuwait" },
  { code: "US", dial: "+1", flag: "🇺🇸", label: "United States" },
  { code: "CA", dial: "+1", flag: "🇨🇦", label: "Canada" },
  { code: "GB", dial: "+44", flag: "🇬🇧", label: "United Kingdom" },
  { code: "AU", dial: "+61", flag: "🇦🇺", label: "Australia" },
  { code: "NZ", dial: "+64", flag: "🇳🇿", label: "New Zealand" },
  { code: "SG", dial: "+65", flag: "🇸🇬", label: "Singapore" },
  { code: "MY", dial: "+60", flag: "🇲🇾", label: "Malaysia" },
  { code: "DE", dial: "+49", flag: "🇩🇪", label: "Germany" },
  { code: "CH", dial: "+41", flag: "🇨🇭", label: "Switzerland" },
  { code: "FR", dial: "+33", flag: "🇫🇷", label: "France" },
  { code: "NL", dial: "+31", flag: "🇳🇱", label: "Netherlands" },
  { code: "BD", dial: "+880", flag: "🇧🇩", label: "Bangladesh" },
  { code: "LK", dial: "+94", flag: "🇱🇰", label: "Sri Lanka" },
  { code: "NP", dial: "+977", flag: "🇳🇵", label: "Nepal" },
];

type SubmitState = "idle" | "submitting" | "success";

export function Contact() {
  const [formState, setFormState] = React.useState<SubmitState>("idle");
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [country, setCountry] = React.useState("IN");
  const [errors, setErrors] = React.useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const resetTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedCountry = countryOptions.find((c) => c.code === country) ?? countryOptions[0];

  /** Join the dial code with the typed digits to get E.164 (+919311251825). */
  const buildPhone = React.useCallback(
    (digits: string) => {
      const national = digits.replace(/\D+/g, "");
      return national === "" ? "" : `${selectedCountry.dial}${national}`;
    },
    [selectedCountry]
  );

  React.useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    if (!formData.name.trim()) newErrors.name = true;
    const phoneDigits = formData.phone.replace(/\D+/g, "");
    if (phoneDigits.length < 6 || phoneDigits.length > 15) newErrors.phone = true;
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = true;
    if (!formData.service) newErrors.service = true;
    if (!formData.message.trim()) newErrors.message = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validateForm()) return;

    setFormState("submitting");

    try {
      const payload = new URLSearchParams({
        name: formData.name,
        phone: buildPhone(formData.phone),
        email: formData.email,
        service: formData.service,
        message: formData.message,
        source_page: window.location.pathname,
        // Honeypot — a real person never sees this, so it must stay empty.
        website: "",
      });

      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });

      let data: { ok?: boolean; error?: string; fields?: Record<string, string> } = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok || !data.ok) {
        // Surface server-side field errors against the matching inputs.
        if (data.fields) {
          const mapped: Record<string, boolean> = {};
          for (const key of Object.keys(data.fields)) mapped[key] = true;
          setErrors(mapped);
        }
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setFormState("success");
      setFormData({ name: "", phone: "", email: "", service: "", message: "" });
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setFormState("idle"), 6000);
    } catch (error) {
      setFormState("idle");
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We could not send your message. Please try again."
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
    if (submitError) setSubmitError(null);
  };

  const contactInfo = [
    {
      id: "address",
      icon: MapPin,
      title: "Office Address",
      content: "A-3/87, Office No. 101, Garg Complex Block J, Guru Nanak Pura, Laxmi Nagar Delhi – 110092",
      href: null,
    },
    {
      id: "phone",
      icon: Phone,
      title: "Phone",
      content: "+91 9911292157",
      href: "tel:+919911292157",
    },
    {
      id: "email",
      icon: Mail,
      title: "Email",
      content: "contact@complianceboxx.in",
      href: "mailto:contact@complianceboxx.in",
    },
    {
      id: "hours",
      icon: Clock,
      title: "Business Hours",
      content: "Mon–Sat: 10:00 AM – 7:00 PM",
      href: null,
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="contact-heading"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-[250px] w-[250px] rounded-full bg-accent/5 blur-3xl" />
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
            Get in Touch
          </span>
          <motion.h2
            id="contact-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-[1.15]"
          >
            Let's Get Your Business{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-accent to-amber-500 bg-clip-text text-transparent">
                Compliant
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
            Reach out for a free consultation — we typically respond within a few hours.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-10 lg:gap-12">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-card border border-border shadow-xl shadow-primary/5 p-6 lg:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="grid gap-5">
                {/* Submit-level error (network / server problem) */}
                <AnimatePresence>
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      role="alert"
                      className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
                    >
                      <AlertCircle
                        className="mt-0.5 h-5 w-5 shrink-0 text-red-600"
                        aria-hidden="true"
                      />
                      <div className="text-sm">
                        <p className="font-semibold text-red-800">Could not send your message</p>
                        <p className="mt-0.5 text-red-700">{submitError}</p>
                        <p className="mt-1.5 text-red-700">
                          Or reach us directly on{" "}
                          <a
                            href="tel:+919911292157"
                            className="font-semibold underline underline-offset-2"
                          >
                            +91 99112 92157
                          </a>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Full Name */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name <span className="text-primary" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={formState !== "idle"}
                    className={cn(
                      "w-full rounded-xl border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
                      errors.name
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-border hover:border-primary/50 focus:border-primary"
                    )}
                    placeholder="Your full name"
                    aria-invalid={errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        id="name-error"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="mt-1.5 text-sm text-red-500"
                        role="alert"
                      >
                        Full name is required
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Phone & Email Row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.35 }}
                  >
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number <span className="text-primary" aria-hidden="true">*</span>
                    </label>
                    <div className="flex">
                      <div className="relative shrink-0">
                        <select
                          id="country"
                          value={country}
                          onChange={(e) => {
                            setCountry(e.target.value);
                            if (errors.phone) setErrors((prev) => ({ ...prev, phone: false }));
                          }}
                          disabled={formState !== "idle"}
                          aria-label="Country code"
                          className={cn(
                            "h-full appearance-none rounded-l-xl border border-r-0 bg-background py-3 pl-3 pr-8 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
                            errors.phone
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                              : "border-border hover:border-primary/50 focus:border-primary"
                          )}
                        >
                          {countryOptions.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.dial}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel-national"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={formState !== "idle"}
                        className={cn(
                          "w-full min-w-0 rounded-r-xl border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
                          errors.phone
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-border hover:border-primary/50 focus:border-primary"
                        )}
                        placeholder="99112 92157"
                        aria-invalid={errors.phone}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {selectedCountry.flag} {selectedCountry.label} — we will call{" "}
                      {buildPhone("XXXXXXXXXX") || `${selectedCountry.dial} your number`}
                    </p>
                    <AnimatePresence>
                      {errors.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="mt-1.5 text-sm text-red-500"
                          role="alert"
                        >
                          Phone number is required
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email <span className="text-primary" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={formState !== "idle"}
                      className={cn(
                        "w-full rounded-xl border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
                        errors.email
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border-border hover:border-primary/50 focus:border-primary"
                      )}
                      placeholder="you@company.com"
                      aria-invalid={errors.email}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="mt-1.5 text-sm text-red-500"
                          role="alert"
                        >
                          Valid email is required
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Service Dropdown */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.45 }}
                >
                  <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                    Service Needed <span className="text-primary" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    disabled={formState !== "idle"}
                    className={cn(
                      "w-full rounded-xl border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed appearance-none",
                      errors.service
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-border hover:border-primary/50 focus:border-primary"
                    )}
                    aria-invalid={errors.service}
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <AnimatePresence>
                    {errors.service && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="mt-1.5 text-sm text-red-500"
                        role="alert"
                      >
                        Please select a service
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message <span className="text-primary" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={formState !== "idle"}
                    rows={5}
                    className={cn(
                      "w-full rounded-xl border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed resize-y min-h-[120px]",
                      errors.message
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-border hover:border-primary/50 focus:border-primary"
                    )}
                    placeholder="Briefly describe your compliance needs..."
                    aria-invalid={errors.message}
                  />
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="mt-1.5 text-sm text-red-500"
                        role="alert"
                      >
                        Message is required
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={formState !== "idle"}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.55 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-full rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
                    formState === "idle" && "hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30",
                    formState === "submitting" && "cursor-wait",
                    formState === "success" && "bg-green-600 hover:bg-green-600"
                  )}
                >
                  <AnimatePresence mode="wait">
                    {formState === "idle" && (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-2"
                      >
                        Send Message
                        <Send className="h-5 w-5" aria-hidden="true" />
                      </motion.span>
                    )}
                    {formState === "submitting" && (
                      <motion.span
                        key="submitting"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <motion.span
                          className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          aria-hidden="true"
                        />
                        Sending...
                      </motion.span>
                    )}
                    {formState === "success" && (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <motion.span
                          initial={{ rotate: -90, scale: 0 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="inline-block"
                        >
                          <Check className="h-5 w-5" aria-hidden="true" />
                        </motion.span>
                        Enquiry Sent!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.form>
          </motion.div>

          {/* Right: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6"
          >
            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
              role="list"
              aria-label="Contact information"
            >
              {contactInfo.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                  className="group flex gap-4 rounded-xl bg-card border border-border p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
                  role="listitem"
                >
                  <motion.div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105"
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ duration: 0.2 }}
                    aria-hidden="true"
                  >
                    <item.icon className="h-5 w-5" strokeWidth={2} />
                  </motion.div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 break-all"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm text-muted-foreground">{item.content}</p>
                    )}
                  </div>
                </motion.article>
              ))}
            </motion.div>

            {/* WhatsApp/Call CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="rounded-xl bg-primary/5 border border-primary/20 p-5"
            >
              <p className="text-sm text-muted-foreground mb-3">Prefer to talk directly?</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/919911292157"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                >
                  <MessageCircle className="h-4.5 w-4.5" aria-hidden="true" />
                  WhatsApp Us
                </a>
                <a
                  href="tel:+919911292157"
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 border-primary px-4 py-3 text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary-lighter hover:shadow-lg hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Phone className="h-4.5 w-4.5" aria-hidden="true" />
                  Call Now
                </a>
              </div>
            </motion.div>

            {/* Google Maps Embed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative rounded-2xl border border-primary/20 overflow-hidden"
              style={{ aspectRatio: "16/9" }}
              aria-label="ComplianceBoxx office location map"
            >
<iframe
                src="https://www.google.com/maps?q=Jiya+and+Associates+Laxmi+Nagar+Delhi&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ComplianceBoxx Office Location — Jiya and Associates, Laxmi Nagar, Delhi"
                className="absolute inset-0 w-full h-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}