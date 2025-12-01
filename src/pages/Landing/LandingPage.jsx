import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import HowItWorks from "../../components/landing/HowItWorks";
import Footer from "../../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="bg-[#F1F2F4] min-h-screen px-4">

      <Navbar />
      <Hero />

      {/* DARK SECTIONS */}
      <Features />
      <HowItWorks />

      <Footer />

    </div>
  );
}
