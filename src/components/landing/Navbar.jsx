import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [activeLink, setActiveLink] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const location = useLocation();

  const navLinks = [
    { id: "home", label: "Home", href: "/" },
    { id: "features", label: "Features", href: "/#features" },
    { id: "how-it-works", label: "How it Works", href: "/#how-it-works" },
    { id: "pricing", label: "Pricing", href: "/#pricing" },
    { id: "courses", label: "Courses", href: "/#courses" },
  ];

  // Transform scroll position to opacity
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.95, 0.98]);
  const navbarBlur = useTransform(scrollY, [0, 100], [12, 16]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    // Update active link based on current hash
    const hash = location.hash.replace("#", "") || "home";
    setActiveLink(hash);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [location]);

  const handleLinkClick = (id, href) => {
    setActiveLink(id);
    setIsMobileMenuOpen(false);
    
    // Handle anchor links
    if (href.includes("#")) {
      const elementId = href.split("#")[1];
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
    
      {/* Mouse Tracker for Interactive Background */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
          animate={{
            x: mousePosition.x - 300,
            y: mousePosition.y - 300,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          style={{
            background: "radial-gradient(circle, rgba(255, 223, 32, 0.08) 0%, transparent 70%)"
          }}
        />
      </div>

      {/* Fixed Full Width Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="fixed top-0 left-0 right-0 z-50 w-full"
        style={{
          backdropFilter: `blur(${navbarBlur}px)`,
        }}
      >
        {/* Animated Border Gradient */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255, 223, 32, 0.4), transparent)",
          }}
        />

        {/* Main Navbar Container */}
        <motion.div
          className="relative"
          style={{
            backgroundColor: `rgba(255, 255, 255, ${navbarOpacity})`,
          }}
        >
          {/* Top Decorative Gradient */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1 bg-white rounded-md p-10"
            animate={{
              background: [
                "linear-gradient(90deg, #ffdf20, #ffb020, #ff8020, #ff6020)",
                "linear-gradient(90deg, #ff6020, #ffdf20, #ffb020, #ff8020)",
                "linear-gradient(90deg, #ff8020, #ff6020, #ffdf20, #ffb020)",
                "linear-gradient(90deg, #ffb020, #ff8020, #ff6020, #ffdf20)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <div className=" mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3"
              >
                <Link 
                  to="/" 
                  onClick={() => handleLinkClick("home", "/")}
                  className="flex items-center gap-3 group"
                >
                  <motion.div
                    className="relative w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                    style={{ 
                      background: 'linear-gradient(135deg, #ffdf20 0%, #ffb020 100%)' 
                    }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Shine Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                    <span className="relative text-black font-bold text-lg">IL</span>
                  </motion.div>
                  
                  <div className="relative">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      IntelliLearn
                    </h1>
                    <div className="text-xs text-gray-500 tracking-widest">AI-Powered</div>
                    {/* Underline Animation */}
                    <motion.div
                      className="absolute -bottom-1 left-0 h-[2px] rounded-full"
                      style={{ background: '#ffdf20' }}
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </Link>
              </motion.div>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center gap-10 absolute left-1/2 transform -translate-x-1/2">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.id}
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => handleLinkClick(link.id, link.href)}
                      className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                        activeLink === link.id 
                          ? "text-gray-900" 
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {activeLink === link.id && (
                        <motion.div
                          className="absolute inset-0 rounded-xl"
                          style={{ 
                            background: 'linear-gradient(135deg, rgba(255, 223, 32, 0.15), rgba(255, 176, 32, 0.08))',
                            border: '1px solid rgba(255, 223, 32, 0.3)',
                            boxShadow: '0 4px 20px rgba(255, 223, 32, 0.15)'
                          }}
                          layoutId="activeNav"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        {link.label}
                        {activeLink === link.id && (
                          <motion.div
                            className="w-2 h-2 rounded-full"
                            style={{ background: '#ffdf20' }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="hidden lg:flex items-center gap-3">
                {/* Sign In Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/signin">
                    <button
                      onMouseEnter={() => setHoveredButton("signin")}
                      onMouseLeave={() => setHoveredButton(null)}
                      className="relative px-6 py-2.5 rounded-xl text-sm font-medium overflow-hidden group"
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        color: '#333'
                      }}
                    >
                      {/* Hover Gradient */}
                      <motion.div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(135deg, rgba(255, 223, 32, 0.1), rgba(255, 176, 32, 0.05))' }}
                        initial={{ scale: 0 }}
                        animate={{ scale: hoveredButton === "signin" ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      <span className="relative flex items-center gap-2">
                        <AnimatePresence mode="wait">
                          {hoveredButton === "signin" ? (
                            <motion.span
                              key="hover"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              className="flex items-center gap-2"
                            >
                              Sign In
                              <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                animate={{ x: [0, 3, 0] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </motion.svg>
                            </motion.span>
                          ) : (
                            <motion.span
                              key="normal"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              className="flex items-center gap-2"
                            >
                              Sign In
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    </button>
                  </Link>
                </motion.div>

                {/* Sign Up Button - Primary */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/signup">
                    <button
                      onMouseEnter={() => setHoveredButton("signup")}
                      onMouseLeave={() => setHoveredButton(null)}
                      className="relative px-6 py-2.5 rounded-xl text-sm font-semibold overflow-hidden group shadow-lg"
                      style={{
                        background: 'linear-gradient(135deg, #ffdf20 0%, #ffb020 100%)',
                        color: '#000'
                      }}
                    >
                      {/* Hover Gradient */}
                      <motion.div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(135deg, #ffec80, #ffcc00)' }}
                        initial={{ scale: 0 }}
                        animate={{ scale: hoveredButton === "signup" ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Shine Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                      />
                      
                      <span className="relative flex items-center gap-2">
                        <AnimatePresence mode="wait">
                          {hoveredButton === "signup" ? (
                            <motion.span
                              key="hover"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 1.1 }}
                              className="flex items-center gap-2"
                            >
                              Get Started
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
                              className="flex items-center gap-2"
                            >
                              Start Free
                              <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
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
                    </button>
                  </Link>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl"
                style={{ 
                  background: 'rgba(255, 223, 32, 0.1)',
                  border: '1px solid rgba(255, 223, 32, 0.2)'
                }}
              >
                <div className="relative w-6 h-6">
                  <motion.span
                    className="absolute top-1 left-0 w-6 h-0.5 rounded-full"
                    style={{ background: '#333' }}
                    animate={{
                      rotate: isMobileMenuOpen ? 45 : 0,
                      y: isMobileMenuOpen ? 8 : 0
                    }}
                  />
                  <motion.span
                    className="absolute top-3 left-0 w-6 h-0.5 rounded-full"
                    style={{ background: '#333' }}
                    animate={{
                      opacity: isMobileMenuOpen ? 0 : 1,
                      width: isMobileMenuOpen ? 0 : 24
                    }}
                  />
                  <motion.span
                    className="absolute top-5 left-0 w-6 h-0.5 rounded-full"
                    style={{ background: '#333' }}
                    animate={{
                      rotate: isMobileMenuOpen ? -45 : 0,
                      y: isMobileMenuOpen ? -8 : 0
                    }}
                  />
                </div>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden overflow-hidden border-t border-gray-100/50"
                style={{
                  backdropFilter: `blur(${navbarBlur}px)`,
                  backgroundColor: `rgba(255, 255, 255, ${navbarOpacity})`,
                }}
              >
                <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6">
                  <div className="space-y-1">
                    {navLinks.map((link) => (
                      <motion.div
                        key={link.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: link.id * 0.1 }}
                      >
                        <Link
                          to={link.href}
                          onClick={() => handleLinkClick(link.id, link.href)}
                          className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            activeLink === link.id
                              ? "bg-gradient-to-r from-[#ffdf20]/15 to-[#ffb020]/10 text-gray-900 border border-[#ffdf20]/30"
                              : "text-gray-600 hover:bg-gray-50/50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            {link.label}
                            {activeLink === link.id && (
                              <motion.div
                                className="w-2 h-2 rounded-full"
                                style={{ background: '#ffdf20' }}
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            )}
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                    
                    <div className="pt-6 space-y-3">
                      <Link to="/signin">
                        <button className="w-full px-4 py-3 rounded-xl text-sm font-medium border border-gray-200 hover:bg-gray-50/50 transition-colors">
                          Sign In
                        </button>
                      </Link>
                      <Link to="/signup">
                        <button 
                          className="w-full px-4 py-3 rounded-xl text-sm font-semibold shadow-md relative overflow-hidden group"
                          style={{
                            background: 'linear-gradient(135deg, #ffdf20 0%, #ffb020 100%)',
                            color: '#000'
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          <span className="relative">Sign Up Free</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.nav>

      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>
    </>
  );
}