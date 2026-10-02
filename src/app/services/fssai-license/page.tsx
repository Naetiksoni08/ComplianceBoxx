import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ServiceHero } from "./ServiceHero";
import { FssaiServices } from "./FssaiServices";
import { FssaiFAQ } from "./FssaiFAQ";
import { FssaiCTABanner } from "./FssaiCTABanner";

export default function FssaiLicensePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Breadcrumb */}
        <nav
          className="py-4 px-4 sm:px-6 lg:px-8 bg-background border-b border-border"
          aria-label="Breadcrumb"
        >
          <div className="mx-auto max-w-7xl">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1.5"
                >
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-1.5 text-muted-foreground">
                <span aria-hidden="true">/</span>
                <Link
                  href="/#services"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Services
                </Link>
              </li>
              <li className="flex items-center gap-1.5 text-foreground font-medium">
                <span aria-hidden="true">/</span>
                <span aria-current="page">FSSAI License</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Service Hero */}
        <ServiceHero />

        {/* FSSAI Services */}
        <FssaiServices />

        {/* FSSAI FAQ */}
        <FssaiFAQ />

        {/* Closing CTA Banner */}
        <FssaiCTABanner />
      </main>
      <Footer />
    </div>
  );
}