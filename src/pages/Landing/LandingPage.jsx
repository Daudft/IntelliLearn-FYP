import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import HowItWorks from "../../components/landing/HowItWorks";
import Footer from "../../components/landing/Footer";

export default function LandingPage() {
  return (
    <div>

      <Navbar />

      {/* WRAPPER FOR HERO — same padding + background as navbar */}
      <div className="bg-[#F1F2F4] px-4 ">
        <Hero />
      </div>

      <Features />
      <HowItWorks />
      <Footer />

    </div>
  );
}
