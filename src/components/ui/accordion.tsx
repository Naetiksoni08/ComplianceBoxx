"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;
const AccordionItem = AccordionPrimitive.Item;
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    className?: string;
    icon?: React.ReactNode;
  }
>(({ className, children, icon, ...props }, ref) => (
  <AccordionPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex items-center justify-between px-6 py-5 font-medium text-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=open]:text-primary data-[state=open]:border-primary data-[state=open]:bg-primary-lighter/30 hover:bg-primary/5 hover:border-primary/30",
      className
    )}
    {...props}
  >
    <span className="flex items-center gap-3">
      {icon && <span className="flex-shrink-0 text-muted-foreground transition-colors duration-200" aria-hidden="true">{icon}</span>}
      <span className="text-base text-left">{children}</span>
    </span>
    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-180" />
  </AccordionPrimitive.Trigger>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & {
    className?: string;
  }
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm text-muted-foreground leading-relaxed transition-all duration-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="px-6 pt-4 pb-5">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };