import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import ReportPreview from "@/components/landing/ReportPreview";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import CTASection from "@/components/landing/CTASection";
import Contact from "@/components/landing/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <ReportPreview />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />
      <CTASection />
    </>
  );
}
