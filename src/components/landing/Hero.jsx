import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  const [hoveredButton, setHoveredButton] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  // Primary brand colors
  const primaryColor = "#ffdf20"; // Vibrant yellow
  const darkTextColor = "#1a1a1a"; // Near-black for contrast
  const lightTextColor = "#ffffff"; // White
  const darkBgColor = "#0a0a0a"; // Dark background for overlay

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "AI-Powered Assessments",
      description: "Real-time skill evaluation with intelligent questioning",
      icon: "⚡",
    },
    {
      title: "Personalized Learning",
      description: "Custom curriculum that adapts to your progress",
      icon: "🎯",
    },
    {
      title: "Smart Tracking",
      description: "Visual analytics and milestone achievements",
      icon: "📈",
    }
  ];

  return (
    <section className="relative w-full overflow-hidden rounded-3xl">
      {/* Enhanced Background with Strong Overlay */}
      <div className="absolute inset-0">
        {/* Background Image with Enhanced Overlay */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <img
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="Modern technology background"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        
        {/* Dark Overlay for Text Readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${darkBgColor} 0%, rgba(10, 10, 10, 0.95) 30%, rgba(10, 10, 10, 0.85) 70%, ${darkBgColor} 100%)`
          }}
        ></div>
        
        {/* Subtle Accent Gradients */}
        <div 
          className="absolute top-0 right-0 w-1/3 h-1/3 opacity-20"
          style={{
            background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)`
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10  mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Badge with Primary Color */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full"
              style={{ backgroundColor: `${primaryColor}20`, border: `1px solid ${primaryColor}40` }}
            >
              <div 
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: primaryColor }}
              ></div>
              <span 
                className="text-sm font-semibold"
                style={{ color: primaryColor }}
              >
                AI-Powered Learning Platform
              </span>
            </motion.div>

            {/* Headline with Strong Contrast */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span 
                  className="block"
                  style={{ color: lightTextColor }}
                >
                  Elevate Your
                </span>
                <span className="block mt-2">
                  <span 
                    className="font-bold"
                    style={{ color: primaryColor }}
                  >
                    Skills & Expertise
                  </span>
                  <span 
                    className="block mt-1"
                    style={{ color: lightTextColor }}
                  >
                    with Smart AI
                  </span>
                </span>
              </h1>

              {/* Subtitle with Good Contrast */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-lg md:text-xl leading-relaxed"
                style={{ color: '#e5e5e5' }}
              >
                Experience personalized learning journeys powered by advanced AI algorithms. 
                Get real-time feedback and track your progress effortlessly.
              </motion.p>
            </div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="grid grid-cols-3 gap-4 py-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`text-center p-4 rounded-xl transition-all duration-300 ${
                    activeFeature === index 
                      ? 'border-2' 
                      : 'border border-white/10'
                  }`}
                  style={{
                    backgroundColor: activeFeature === index ? `${primaryColor}15` : 'rgba(255, 255, 255, 0.05)',
                    borderColor: activeFeature === index ? primaryColor : 'rgba(255, 255, 255, 0.1)'
                  }}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <div 
                    className="text-sm font-semibold mb-1"
                    style={{ color: activeFeature === index ? primaryColor : lightTextColor }}
                  >
                    {feature.title}
                  </div>
                  <div 
                    className="text-xs"
                    style={{ color: '#a0a0a0' }}
                  >
                    {feature.description}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons with Primary Color */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link to="/signup" className="flex-1">
                <motion.button
                  onMouseEnter={() => setHoveredButton(true)}
                  onMouseLeave={() => setHoveredButton(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative w-full font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-3 text-lg overflow-hidden shadow-lg"
                  style={{
                    backgroundColor: primaryColor,
                    color: darkTextColor
                  }}
                >
                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0"
                    style={{ backgroundColor: '#ffec80' }}
                    initial={{ x: "-100%" }}
                    animate={{ x: hoveredButton ? "100%" : "-100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  <span className="relative flex items-center gap-3">
                    <AnimatePresence mode="wait">
                      {hoveredButton ? (
                        <motion.span
                          key="hover"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="flex items-center gap-3"
                        >
                          Get Started Free
                          <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                          >
                            →
                          </motion.span>
                        </motion.span>
                      ) : (
                        <motion.span
                          key="normal"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="flex items-center gap-3"
                        >
                          Start Learning Today
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
                </motion.button>
              </Link>

              <Link to="/demo" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group w-full font-medium px-8 py-4 rounded-xl flex items-center justify-center gap-3 text-lg border transition-all"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: `${primaryColor}40`,
                    color: lightTextColor
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Watch Demo
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="pt-8 border-t"
              style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * i }}
                      className="relative"
                    >
                      <img
                        src={`https://i.pravatar.cc/60?img=${i}`}
                        className="w-10 h-10 rounded-full border-2"
                        style={{ borderColor: darkBgColor }}
                        alt={`User ${i}`}
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="text-center sm:text-left">
                  <p 
                    className="font-medium"
                    style={{ color: lightTextColor }}
                  >
                    <span 
                      className="font-bold text-xl"
                      style={{ color: primaryColor }}
                    >
                      2,500+
                    </span>{" "}
                    professionals trust our platform
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className="w-4 h-4"
                          style={{ color: primaryColor }}
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span 
                      className="text-sm"
                      style={{ color: '#a0a0a0' }}
                    >
                      4.9/5 from 500+ reviews
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Main Card */}
            <div 
              className="relative rounded-2xl p-8 shadow-2xl"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Progress Chart */}
              <div className="space-y-6">
                <h3 
                  className="text-xl font-bold mb-6"
                  style={{ color: lightTextColor }}
                >
                  Learning Progress
                </h3>
                
                {[
                  { skill: "Web Development", progress: 85, color: primaryColor },
                  { skill: "Data Science", progress: 72, color: "#4ade80" },
                  { skill: "UI/UX Design", progress: 91, color: "#8b5cf6" }
                ].map((item, index) => (
                  <div key={item.skill} className="space-y-2">
                    <div className="flex justify-between">
                      <span 
                        className="text-sm"
                        style={{ color: '#e5e5e5' }}
                      >
                        {item.skill}
                      </span>
                      <span 
                        className="text-sm font-bold"
                        style={{ color: item.color }}
                      >
                        {item.progress}%
                      </span>
                    </div>
                    <div 
                      className="h-2 rounded-full overflow-hidden"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div 
                className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t"
                style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <div className="text-center">
                  <div 
                    className="text-2xl font-bold"
                    style={{ color: primaryColor }}
                  >
                    47
                  </div>
                  <div 
                    className="text-sm"
                    style={{ color: '#a0a0a0' }}
                  >
                    Skills
                  </div>
                </div>
                <div className="text-center">
                  <div 
                    className="text-2xl font-bold"
                    style={{ color: primaryColor }}
                  >
                    98%
                  </div>
                  <div 
                    className="text-sm"
                    style={{ color: '#a0a0a0' }}
                  >
                    Success Rate
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 w-16 h-16 rounded-xl"
              style={{ backgroundColor: `${primaryColor}20` }}
            />
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 w-20 h-20 rounded-xl"
              style={{ backgroundColor: `${primaryColor}15` }}
            />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span 
              className="text-sm"
              style={{ color: '#a0a0a0' }}
            >
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 rounded-full flex justify-center pt-2"
              style={{ border: `2px solid ${primaryColor}40` }}
            >
              <div 
                className="w-1.5 h-2 rounded-full"
                style={{ backgroundColor: primaryColor }}
              ></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}