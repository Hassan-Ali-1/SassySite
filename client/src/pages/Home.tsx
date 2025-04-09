import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import CalculatorSelection from "@/components/sections/CalculatorSelection";
import AboutSection from "@/components/sections/AboutSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import CalculatorModal from "@/components/layout/CalculatorModal";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <CalculatorSelection />
        <AboutSection />
        <FAQSection />
        <CTASection />
      </main>
      <CalculatorModal />
      <Footer />
    </>
  );
}
