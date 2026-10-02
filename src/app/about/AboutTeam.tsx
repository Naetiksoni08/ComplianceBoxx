"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { UserCircle, Briefcase, Mail, Phone, MapPin, Scale, Gavel, GraduationCap } from "lucide-react";

const team = [
  {
    name: "CA Rajesh Kumar",
    role: "Founder & Managing Partner",
    specialty: "Company Law, Taxation & Audit",
    experience: "25+ Years",
    qualifications: ["FCA", "DISA", "LLB"],
    icon: GraduationCap,
    gradient: "from-primary to-blue-600",
  },
  {
    name: "CS Priya Sharma",
    role: "Company Secretary & Compliance Head",
    specialty: "ROC/MCA, Secretarial Audit, FEMA",
    experience: "18+ Years",
    qualifications: ["FCS", "LLB", "ACMA"],
    icon: Scale,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "Adv. Amit Singh",
    role: "Legal Counsel",
    specialty: "Corporate Law, Litigation, IPR",
    experience: "15+ Years",
    qualifications: ["LLM", "Advocate Supreme Court"],
    icon: Gavel,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    name: "CA Neha Gupta",
    role: "Tax & GST Partner",
    specialty: "GST, Income Tax, International Tax",
    experience: "12+ Years",
    qualifications: ["FCA", "GST Practitioner"],
    icon: Briefcase,
    gradient: "from-accent to-amber-500",
  },
];

export function AboutTeam() {
  return (
    <section
      id="team"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="team-heading"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[250px] w-[250px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20"
          >
            Meet the Team
          </motion.span>

          <motion.h2
            id="team-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-[1.15] max-w-3xl mx-auto"
          >
            Experts Who{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-accent to-amber-500 bg-clip-text text-transparent">
                Make It Happen
              </span>
              <motion.span
                className="absolute bottom-2 left-0 right-0 h-4 bg-accent/20 -z-10 rounded"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                aria-hidden="true"
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
          >
            A multidisciplinary team of Chartered Accountants, Company Secretaries, and Advocates —
            each with deep domain expertise and a shared commitment to your compliance success.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-16"
          role="list"
          aria-label="Team members"
        >
          <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group w-full sm:max-w-[calc(50%-2rem)] p-6 rounded-2xl border border-primary-light bg-background shadow-sm transition-all duration-300 hover:shadow-[0_20px_40px_-12px_rgb(30,58,138,0.15)] hover:border-primary/30"
                role="listitem"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="flex-shrink-0 flex h-18 w-18 items-center justify-center rounded-2xl relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br" style={{ background: `var(--${member.gradient})` }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <member.icon className="h-9 w-9 text-primary-foreground strokeWidth={2}" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-primary group-hover:text-primary-hover transition-colors">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground font-medium">{member.role}</p>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{member.specialty}</p>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary">
                        <UserCircle className="h-3 w-3" aria-hidden="true" />
                        {member.experience}
                      </span>
                      {member.qualifications.map((q, i) => (
                        <span key={i} className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent/10 text-accent">
                          {q}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}