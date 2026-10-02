import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { Services } from "@/components/layout/Services";
import { WhyChooseUs } from "@/components/layout/WhyChooseUs";
import { Process } from "@/components/layout/Process";
import { FAQ } from "@/components/layout/FAQ";
import { Contact } from "@/components/layout/Contact";
import { CTABanner } from "@/components/layout/CTABanner";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <WhyChooseUs />
        <Process />
        <FAQ />
        <Contact />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}