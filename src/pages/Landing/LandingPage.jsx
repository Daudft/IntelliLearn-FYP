import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import HowItWorks from "../../components/landing/HowItWorks";
import Footer from "../../components/landing/Footer";

export default function LandingPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = (currentScroll / totalScroll) * 100;
      setScrollProgress(progress);
    };

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-1/4 -left-40 w-[800px] h-[800px] rounded-full blur-3xl"
            style={{ 
              background: 'radial-gradient(circle, rgba(255, 223, 32, 0.1) 0%, transparent 70%)',
              x: mousePosition.x * 0.5,
              y: mousePosition.y * 0.5
            }}
          />
          
          <motion.div
            className="absolute bottom-1/4 -right-40 w-[600px] h-[600px] rounded-full blur-3xl"
            style={{ 
              background: 'radial-gradient(circle, rgba(255, 176, 32, 0.08) 0%, transparent 70%)',
              x: -mousePosition.x * 0.3,
              y: -mousePosition.y * 0.3
            }}
          />
        </div>

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
          }}
        />
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50"
        style={{ 
          scaleX: scrollYProgress,
          background: 'linear-gradient(90deg, #ffdf20, #ffb020, #ff8020)'
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10">
        <Navbar />
        
        {/* Smooth Spacing Container */}
        <div className="space-y-5 md:space-y-8 px-4 sm:px-6 lg:px-8 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Hero />
          </motion.div>

          {/* Animated Transition Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Connecting Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-20 w-px bg-gradient-to-b from-transparent via-[#ffdf20]/30 to-transparent"></div>
            
            {/* Section Badge */}
            <div className="flex justify-center -mt-10 mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ffdf20]/10 to-[#ffdf20]/5 backdrop-blur-sm px-6 py-3 rounded-full border border-[#ffdf20]/20">
                <div className="w-2 h-2 rounded-full bg-[#ffdf20] animate-pulse"></div>
                <span className="text-sm font-semibold" style={{ color: '#ffdf20' }}>
                  POWERFUL FEATURES
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Features />
          </motion.div>

          {/* Transition Between Sections */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative py-12"
          >
            {/* Decorative Element */}
            <div className="flex justify-center">
              <motion.div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 223, 32, 0.2) 0%, transparent 70%)',
                  border: '1px solid rgba(255, 223, 32, 0.3)'
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="w-2 h-2 rounded-full bg-[#ffdf20]"></div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <HowItWorks />
          </motion.div>

          {/* Final Transition */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative py-12"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-[#ffdf20]/20 to-transparent"></div>
            </div>
            
            {/* Call to Action Badge */}
            <div className="flex justify-center">
              <motion.div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ffdf20]/10 to-[#ffdf20]/5 backdrop-blur-sm px-6 py-3 rounded-full border border-[#ffdf20]/20"
                animate={{
                  y: [0, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="text-sm font-semibold" style={{ color: '#ffdf20' }}>
                  READY TO BEGIN?
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        className="fixed bottom-8 right-8 z-40 hidden lg:block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="relative">
          <motion.div
            className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10"
            style={{ background: 'rgba(255, 223, 32, 0.1)' }}
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <motion.div
              className="w-6 h-6 rounded-full"
              style={{ background: '#ffdf20' }}
              animate={{
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
          </motion.div>
          
          {/* Progress Circle */}
          <svg className="absolute inset-0 w-12 h-12" viewBox="0 0 50 50">
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="rgba(255, 223, 32, 0.3)"
              strokeWidth="2"
            />
            <motion.circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="#ffdf20"
              strokeWidth="2"
              strokeDasharray="125.6"
              strokeDashoffset={125.6 - (scrollProgress / 100) * 125.6}
              strokeLinecap="round"
              transform="rotate(-90 25 25)"
            />
          </svg>
        </div>
      </motion.div>

      {/* Back to Top Button */}
      {scrollProgress > 10 && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 left-8 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/10 hover:border-[#ffdf20]/30 transition-colors"
          style={{ background: 'rgba(255, 223, 32, 0.1)' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </div>
  );
}