import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const FeatureItem = ({ feature, index, active, setActive }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-30% 0px -30% 0px", once: true });
  
  useEffect(() => {
    if (isInView) setActive(index);
  }, [isInView, index, setActive]);
  
  const isActive = active === index;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative pl-10 py-8 cursor-pointer group transition-all duration-500 border-l-2 ${
        isActive 
          ? "border-[#ffdf20] bg-gradient-to-r from-[#ffdf20]/5 to-transparent" 
          : "border-white/10 hover:border-[#ffdf20]/30 hover:bg-white/5"
      }`}
      onClick={() => setActive(index)}
    >
      {/* Animated Indicator */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 flex items-center justify-center"
        animate={{
          scale: isActive ? 1.2 : 1,
          borderColor: isActive ? "#ffdf20" : "#ffffff40",
          backgroundColor: isActive ? "#ffdf20" : "transparent"
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-2 h-2 rounded-full bg-black"
          />
        )}
      </motion.div>

      {/* Feature Number */}
      <div className={`text-sm font-bold mb-2 tracking-wider transition-colors duration-300 ${
        isActive ? "text-[#ffdf20]" : "text-white/40 group-hover:text-[#ffdf20]/70"
      }`}>
        0{index + 1}
      </div>
      
      {/* Feature Title */}
      <motion.h3 
        className={`text-2xl md:text-3xl font-bold mb-4 transition-colors duration-300 ${
          isActive ? "text-white" : "text-white/70 group-hover:text-white"
        }`}
        animate={{ 
          x: isActive ? 10 : 0 
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {feature.title}
      </motion.h3>
      
      {/* Feature Description */}
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.p
            key={feature.desc}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="text-gray-300 leading-relaxed max-w-md pr-4"
          >
            {feature.desc}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Hover Line Effect */}
      <motion.div
        className="absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-[#ffdf20] to-transparent"
        initial={{ width: 0 }}
        animate={{ width: isActive ? "100%" : 0 }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
};

export default function Features() {
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

const features = [
    {
      title: "Adaptive Assessments",
      desc: "Intelligent skill evaluations that dynamically adjust difficulty based on your performance in real-time, providing accurate insights into your capabilities.",
      img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1632&auto=format&fit=crop",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="adaptiveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="100%" stopColor="#FFD166" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#FFD166" floodOpacity="0.4" />
            </filter>
          </defs>
          <path 
            d="M24 8C15.16 8 8 15.16 8 24C8 32.84 15.16 40 24 40C32.84 40 40 32.84 40 24C40 15.16 32.84 8 24 8ZM24 36C17.38 36 12 30.62 12 24C12 17.38 17.38 12 24 12C30.62 12 36 17.38 36 24C36 30.62 30.62 36 24 36Z" 
            fill="url(#adaptiveGradient)"
            filter="url(#shadow)"
          />
          <path 
            d="M24 16C19.58 16 16 19.58 16 24C16 28.42 19.58 32 24 32C28.42 32 32 28.42 32 24C32 19.58 28.42 16 24 16ZM26 28L22 24L24.58 21.42L26 22.84L29.16 26L26 28Z" 
            fill="white"
            fillOpacity="0.9"
          />
          <circle cx="18" cy="20" r="2" fill="white" fillOpacity="0.8" />
          <circle cx="30" cy="20" r="2" fill="white" fillOpacity="0.8" />
          <path 
            d="M18 28C19.1046 28 20 27.1046 20 26C20 24.8954 19.1046 24 18 24C16.8954 24 16 24.8954 16 26C16 27.1046 16.8954 28 18 28Z" 
            fill="white"
            fillOpacity="0.8"
          />
        </svg>
      ),
      stats: "Accuracy: 95%"
    },
    {
      title: "Personalized Task Generation",
      desc: "AI-driven learning tasks specifically curated for your unique strengths and improvement areas, ensuring optimal skill development.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit=crop",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="taskGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06D6A0" />
              <stop offset="100%" stopColor="#118AB2" />
            </linearGradient>
            <filter id="taskShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#06D6A0" floodOpacity="0.4" />
            </filter>
          </defs>
          <path 
            d="M36 12H28V8C28 6.9 27.1 6 26 6H14C12.9 6 12 6.9 12 8V12H4C2.9 12 2 12.9 2 14V40C2 41.1 2.9 42 4 42H36C37.1 42 38 41.1 38 40V14C38 12.9 37.1 12 36 12ZM16 10H24V12H16V10ZM36 40H6V16H36V40Z" 
            fill="url(#taskGradient)"
            filter="url(#taskShadow)"
          />
          <path 
            d="M26 24H14C12.9 24 12 24.9 12 26C12 27.1 12.9 28 14 28H26C27.1 28 28 27.1 28 26C28 24.9 27.1 24 26 24Z" 
            fill="white"
            fillOpacity="0.9"
          />
          <path 
            d="M26 32H14C12.9 32 12 32.9 12 34C12 35.1 12.9 36 14 36H26C27.1 36 28 35.1 28 34C28 32.9 27.1 32 26 32Z" 
            fill="white"
            fillOpacity="0.9"
          />
          <path 
            d="M20 18H14C12.9 18 12 18.9 12 20C12 21.1 12.9 22 14 22H20C21.1 22 22 21.1 22 20C22 18.9 21.1 18 20 18Z" 
            fill="white"
            fillOpacity="0.9"
          />
          <circle cx="30" cy="26" r="4" fill="white" fillOpacity="0.9" stroke="#06D6A0" strokeWidth="1.5" />
          <path d="M32 24L30 26L32 28" stroke="#06D6A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      stats: "Customization: 100%"
    },
    {
      title: "AI Mentor Support",
      desc: "24/7 intelligent guidance with personalized suggestions and actionable tips from your AI mentor to accelerate learning progress.",
      img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1074&auto=format&fit=crop",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7209B7" />
              <stop offset="100%" stopColor="#3A0CA3" />
            </linearGradient>
            <filter id="aiShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#7209B7" floodOpacity="0.4" />
            </filter>
            <radialGradient id="aiGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.8" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="24" cy="24" r="20" fill="url(#aiGradient)" filter="url(#aiShadow)" />
          <circle cx="24" cy="24" r="16" fill="url(#aiGlow)" fillOpacity="0.2" />
          
          {/* Brain-inspired design */}
          <path 
            d="M16 20C16 17.79 17.79 16 20 16C22.21 16 24 17.79 24 20C24 17.79 25.79 16 28 16C30.21 16 32 17.79 32 20C32 24 28 26 24 30C20 26 16 24 16 20Z" 
            fill="white"
            fillOpacity="0.9"
          />
          
          {/* Circuit patterns */}
          <path d="M14 30L18 30" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M30 30L34 30" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M24 34L24 38" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* AI nodes */}
          <circle cx="20" cy="22" r="1.5" fill="#7209B7" />
          <circle cx="28" cy="22" r="1.5" fill="#7209B7" />
          <circle cx="24" cy="28" r="1.5" fill="#7209B7" />
          
          {/* Connection lines */}
          <path d="M20 22L24 28" stroke="white" strokeWidth="1" strokeOpacity="0.7" />
          <path d="M28 22L24 28" stroke="white" strokeWidth="1" strokeOpacity="0.7" />
        </svg>
      ),
      stats: "Availability: Always"
    },
    {
      title: "Progress Tracking",
      desc: "Comprehensive visual analytics showing your learning journey with detailed metrics, milestones, and performance insights.",
      img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1170&auto=format&fit=crop",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF9E00" />
              <stop offset="100%" stopColor="#FF5400" />
            </linearGradient>
            <filter id="progressShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#FF9E00" floodOpacity="0.4" />
            </filter>
          </defs>
          
          {/* Chart background */}
          <rect x="8" y="8" width="32" height="32" rx="8" fill="url(#progressGradient)" filter="url(#progressShadow)" />
          
          {/* Grid lines */}
          <path d="M16 32L32 32" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
          <path d="M16 24L32 24" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
          <path d="M16 16L32 16" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
          <path d="M16 16L16 32" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
          <path d="M24 16L24 32" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
          <path d="M32 16L32 32" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
          
          {/* Progress line */}
          <path 
            d="M16 28L20 24L24 26L28 20L32 24" 
            stroke="white" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
          
          {/* Data points */}
          <circle cx="16" cy="28" r="2" fill="white" />
          <circle cx="20" cy="24" r="2" fill="white" />
          <circle cx="24" cy="26" r="2" fill="white" />
          <circle cx="28" cy="20" r="2" fill="white" />
          <circle cx="32" cy="24" r="2" fill="white" />
          
          {/* Trending up arrow */}
          <path 
            d="M36 14L40 10L44 14" 
            stroke="#FF5400" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M40 10L40 18" 
            stroke="#FF5400" 
            strokeWidth="2" 
            strokeLinecap="round" 
          />
          
          {/* Stats indicator */}
          <circle cx="38" cy="36" r="4" fill="white" stroke="#FF5400" strokeWidth="1.5" />
          <text 
            x="38" 
            y="38.5" 
            textAnchor="middle" 
            fontSize="8" 
            fontWeight="bold" 
            fill="#FF5400"
          >
            ↑
          </text>
        </svg>
      ),
      stats: "Data Points: 50+"
    },
  ];
  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
      setMousePosition({ x, y });
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-gradient-to-b from-black via-gray-900 to-black border border-white/10 my-5 rounded-3xl overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Dynamic Grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
          }}
        />

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-1/4 -left-40 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(255, 223, 32, 0.15) 0%, transparent 70%)' }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(255, 223, 32, 0.1) 0%, transparent 70%)' }}
          animate={{
            x: [0, -80, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10  mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ffdf20]/10 to-[#ffdf20]/5 backdrop-blur-sm px-6 py-3 rounded-full border border-[#ffdf20]/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#ffdf20] animate-pulse"></div>
            <span className="text-sm font-semibold" style={{ color: '#ffdf20' }}>
              POWERFUL FEATURES
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Elevate Your{" "}
            <span className="bg-gradient-to-r from-[#ffdf20] via-yellow-300 to-amber-200 bg-clip-text text-transparent">
              Learning Experience
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advanced tools and intelligent features designed to optimize your skill development journey
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Features List */}
          <div className="space-y-1">
            {features.map((feature, index) => (
              <FeatureItem
                key={index}
                feature={feature}
                index={index}
                active={active}
                setActive={setActive}
              />
            ))}

            {/* Feature Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-4 mt-12 p-6 bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/10"
            >
              {[
                { value: "95%", label: "Accuracy" },
                { value: "24/7", label: "Support" },
                { value: "100%", label: "Personalized" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div 
                    className="text-2xl font-bold mb-1"
                    style={{ color: '#ffdf20' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Interactive Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Main Card */}
            <div 
              className="relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x * 0.2}deg) rotateX(${-mousePosition.y * 0.2}deg)`
              }}
            >
              {/* Image Container */}
              <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                <AnimatePresence mode="wait">
                  {features.map((feature, index) => (
                    active === index && (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0"
                      >
                        <img
                          src={feature.img}
                          alt={feature.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>

                {/* Floating Icon */}
                <motion.div
                  className="absolute top-6 left-6 w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl"
                  style={{ backgroundColor: '#ffdf20' }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                >
                  <span className="text-2xl">{features[active].icon}</span>
                </motion.div>

                {/* Current Feature Info */}
                <div className="absolute bottom-6 left-6 right-6">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white">
                        {features[active].title}
                      </h3>
                      <div 
                        className="text-sm font-bold px-3 py-1 rounded-full"
                        style={{ 
                          backgroundColor: '#ffdf20',
                          color: '#000'
                        }}
                      >
                        {features[active].stats}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">
                      {features[active].desc}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Feature Indicators */}
              <div className="p-6 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-400">Active Feature</div>
                  <div className="flex gap-2">
                    {features.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActive(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === active 
                            ? 'w-8 bg-gradient-to-r from-[#ffdf20] to-yellow-400' 
                            : 'bg-white/30 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Feature Progress</span>
                    <span>{Math.round(((active + 1) / features.length) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: '#ffdf20' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${((active + 1) / features.length) * 100}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#ffdf20]/20 to-transparent rounded-full blur-xl" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-tr from-[#ffdf20]/10 to-transparent rounded-full blur-xl" />
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Ready to experience all these features in action?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg"
            style={{
              background: '#ffdf20',
              color: '#000'
            }}
          >
            Start Free Trial
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}