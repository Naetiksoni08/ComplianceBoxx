import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { DisclaimerModal } from "@/components/layout/DisclaimerModal";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "ComplianceBoxx | Professional Compliance Services in Delhi NCR",
  description: "Expert compliance services for company registration, GST, ROC/MCA, trademarks, tax filing, FSSAI, labour law compliance across India. Serving startups, SMEs, and individuals.",
  keywords: ["compliance services", "company registration", "GST registration", "ROC compliance", "trademark registration", "tax filing", "FSSAI license", "Delhi NCR"],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#1E3A8A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/*
          Runs before the first paint. A returning visitor who already accepted
          gets the flag set straight away, so the disclaimer never flashes on
          screen for someone who has seen it before.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('cbx_disclaimer_accepted')==='1')" +
              "{document.documentElement.setAttribute('data-disclaimer-accepted','1');}}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <DisclaimerModal />
      </body>
    </html>
  );
}