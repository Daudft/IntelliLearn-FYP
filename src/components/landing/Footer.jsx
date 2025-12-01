import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [hoveredButton, setHoveredButton] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#" },
        { label: "How It Works", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Courses", href: "#" },
        { label: "AI Assessment", href: "#" },
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Press", href: "#" },
        { label: "Partners", href: "#" },
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Help Center", href: "#" },
        { label: "Community", href: "#" },
        { label: "API Status", href: "#" },
        { label: "Learning Resources", href: "#" },
      ]
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <footer 
      className="relative w-full bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden rounded-3xl my-5 border border-white/10"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Dynamic Gradient */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 223, 32, 0.15), transparent 70%)`
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(255, 223, 32, 0.08) 0%, transparent 70%)' }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10  mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Main CTA Section */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ffdf20]/10 to-[#ffdf20]/5 backdrop-blur-sm px-6 py-3 rounded-full border border-[#ffdf20]/20 mb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="w-2 h-2 rounded-full bg-[#ffdf20] animate-pulse"></div>
            <span className="text-sm font-semibold" style={{ color: '#ffdf20' }}>
              TRANSFORM YOUR LEARNING
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to Transform{" "}
            <br />
            <span className="relative">
              <span className="bg-gradient-to-r from-[#ffdf20] via-yellow-300 to-amber-200 bg-clip-text text-transparent">
                Your Skills
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 h-1"
                style={{ background: 'linear-gradient(90deg, #ffdf20, #ffb020)' }}
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </span>
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Join thousands of learners who are accelerating their growth with AI-powered personalized learning journeys.
          </motion.p>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href="/signup">
              <motion.button
                onMouseEnter={() => setHoveredButton(true)}
                onMouseLeave={() => setHoveredButton(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-4 text-lg font-semibold rounded-xl overflow-hidden group shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #ffdf20 0%, #ffb020 100%)',
                  color: '#000'
                }}
              >
                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, #ffec80, #ffcc00)' }}
                  initial={{ x: "-100%" }}
                  animate={{ x: hoveredButton ? "0%" : "-100%" }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                />
                
                <span className="relative flex items-center gap-3">
                  <AnimatePresence mode="wait">
                    {hoveredButton ? (
                      <motion.span
                        key="hover"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="flex items-center gap-3"
                      >
                        Start Free Today
                        <motion.span
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          🚀
                        </motion.span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="normal"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="flex items-center gap-3"
                      >
                        Get Started Free
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          animate={{ y: [0, 2, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </motion.svg>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </motion.button>
            </a>

            <a href="/demo">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-lg font-medium rounded-xl border-2"
                style={{
                  borderColor: '#ffdf20',
                  color: '#ffdf20',
                  backgroundColor: 'transparent'
                }}
              >
                Watch Demo
              </motion.button>
            </a>
          </motion.div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          className="max-w-2xl mx-auto mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-3">Stay Updated</h3>
            <p className="text-gray-400">Get the latest learning tips and platform updates</p>
          </div>
          
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#ffdf20] transition-colors"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl font-semibold"
                style={{
                  background: 'linear-gradient(135deg, #ffdf20 0%, #ffb020 100%)',
                  color: '#000'
                }}
              >
                {isSubmitted ? 'Subscribed!' : 'Subscribe'}
              </motion.button>
            </div>
            
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center"
                style={{ color: '#ffdf20' }}
              >
                Thanks for subscribing! 🎉
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-[#ffdf20]/20 to-transparent mb-16"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        />

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                style={{ 
                  background: 'linear-gradient(135deg, #ffdf20 0%, #ffb020 100%)' 
                }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-black font-bold text-xl">IL</span>
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-white">IntelliLearn</h3>
                <p className="text-sm text-gray-400 mt-1">AI-Powered Learning Platform</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 max-w-md">
              We're revolutionizing education with intelligent AI that adapts to each learner's unique journey.
            </p>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="text-gray-400">✉️</span>
              <a 
                href="mailto:support@intellilearn.ai" 
                className="text-white hover:text-[#ffdf20] transition-colors"
              >
                support@intellilearn.ai
              </a>
            </div>
            
          </motion.div>

          {/* Link Columns */}
          {footerLinks.map((column, colIndex) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + colIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + colIndex * 0.1 + linkIndex * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-[#ffdf20] transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#ffdf20] transition-colors"></span>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Footer */}
        <motion.div
          className="pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} IntelliLearn. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-[#ffdf20] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-[#ffdf20] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-[#ffdf20] transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-[#ffdf20] transition-colors">
                GDPR
              </a>
            </div>
          </div>
        </motion.div>
      </div>


    </footer>
  );
}
