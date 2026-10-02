import { AboutHero } from "@/app/about/AboutHero";
import { AboutValues } from "@/app/about/AboutValues";
import { AboutCTABanner } from "@/app/about/AboutCTABanner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "About ComplianceBoxx | 25+ Years of Compliance Expertise",
  description: "Learn about ComplianceBoxx - your trusted partner for company registration, GST, ROC/MCA compliance, trademarks, tax filing, and more. 25+ years experience, 10,000+ clients served.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        <AboutHero />
        <AboutValues />
        <AboutCTABanner />
      </main>
      <Footer />
    </div>
  );
}