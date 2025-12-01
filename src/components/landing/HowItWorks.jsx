import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function HowItWorks() {
  const containerRef = useRef(null);
  const [hoveredStep, setHoveredStep] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

const steps = [
    {
      number: "01",
      title: "Take Initial Assessment",
      desc: "Begin with our AI-powered assessment that intelligently analyzes your current skill levels, learning patterns, and knowledge gaps to create a personalized baseline.",
      icon: (
        <svg className="w-14 h-14" viewBox="0 0 56 56" fill="none">
          <defs>
            <linearGradient id="assessmentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffdf20" />
              <stop offset="100%" stopColor="#ff9e00" />
            </linearGradient>
            <filter id="step1Shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#ffdf20" floodOpacity="0.3" />
            </filter>
            <radialGradient id="step1Glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.6" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Main circle with gradient */}
          <circle cx="28" cy="28" r="24" fill="url(#assessmentGradient)" filter="url(#step1Shadow)" />
          
          {/* Glow effect */}
          <circle cx="28" cy="28" r="20" fill="url(#step1Glow)" />
          
          {/* Assessment chart lines */}
          <path d="M20 36H36" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 32H28" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 28H32" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 24H36" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 20H24" stroke="white" strokeWidth="3" strokeLinecap="round" />
          
          {/* Vertical axis */}
          <path d="M20 20L20 36" stroke="white" strokeWidth="3" strokeLinecap="round" />
          
          {/* Data points */}
          <circle cx="20" cy="36" r="2" fill="white" stroke="#ffdf20" strokeWidth="1.5" />
          <circle cx="28" cy="32" r="2" fill="white" stroke="#ffdf20" strokeWidth="1.5" />
          <circle cx="32" cy="28" r="2" fill="white" stroke="#ffdf20" strokeWidth="1.5" />
          <circle cx="36" cy="24" r="2" fill="white" stroke="#ffdf20" strokeWidth="1.5" />
          <circle cx="24" cy="20" r="2" fill="white" stroke="#ffdf20" strokeWidth="1.5" />
          
          {/* AI processing indicator */}
          <circle cx="42" cy="14" r="6" fill="#ffdf20" stroke="white" strokeWidth="2">
            <animate attributeName="r" values="6;7;6" dur="2s" repeatCount="indefinite" />
          </circle>
          <path d="M44 12L42 14L44 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      color: "#ffdf20",
      duration: "2-3 min",
      features: ["Adaptive Questions", "Skill Mapping", "Personalized Baseline"]
    },
    {
      number: "02",
      title: "Receive Personalized Tasks",
      desc: "Get AI-generated learning tasks specifically tailored to your skill profile, focusing on areas that will accelerate your growth and development.",
      icon: (
        <svg className="w-14 h-14" viewBox="0 0 56 56" fill="none">
          <defs>
            <linearGradient id="tasksGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffb020" />
              <stop offset="100%" stopColor="#ff7700" />
            </linearGradient>
            <filter id="step2Shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#ffb020" floodOpacity="0.3" />
            </filter>
          </defs>
          
          {/* Main container */}
          <rect x="12" y="12" width="32" height="32" rx="10" fill="url(#tasksGradient)" filter="url(#step2Shadow)" />
          
          {/* Document lines */}
          <rect x="18" y="20" width="20" height="3" rx="1.5" fill="white" fillOpacity="0.9" />
          <rect x="18" y="26" width="16" height="3" rx="1.5" fill="white" fillOpacity="0.9" />
          <rect x="18" y="32" width="24" height="3" rx="1.5" fill="white" fillOpacity="0.9" />
          <rect x="18" y="38" width="14" height="3" rx="1.5" fill="white" fillOpacity="0.9" />
          
          {/* AI customization badge */}
          <circle cx="42" cy="22" r="8" fill="#ff7700" stroke="white" strokeWidth="2">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 42 22"
              to="360 42 22"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <path d="M42 18L42 26" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M38 22L46 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Check marks for completion */}
          <path d="M24 46L28 50L34 44" stroke="#ffb020" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
          <path d="M32 46L36 50L42 44" stroke="#ffb020" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        </svg>
      ),
      color: "#ffb020",
      duration: "Instant",
      features: ["Smart Task Generation", "Priority Focus Areas", "Difficulty Scaling"]
    },
    {
      number: "03",
      title: "Learn With AI Mentor",
      desc: "Engage with your intelligent AI mentor that provides real-time guidance, explanations, and support throughout your learning journey.",
      icon: (
        <svg className="w-14 h-14" viewBox="0 0 56 56" fill="none">
          <defs>
            <linearGradient id="mentorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff8020" />
              <stop offset="100%" stopColor="#ff5500" />
            </linearGradient>
            <filter id="step3Shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#ff8020" floodOpacity="0.3" />
            </filter>
            <radialGradient id="mentorGlow">
              <stop offset="0%" stopColor="white" stopOpacity="0.8" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Main AI brain shape */}
          <path 
            d="M28 16C22 16 16 22 16 28C16 34 22 40 28 40C34 40 40 34 40 28C40 22 34 16 28 16Z" 
            fill="url(#mentorGradient)" 
            filter="url(#step3Shadow)"
          />
          
          {/* Inner glow */}
          <circle cx="28" cy="28" r="10" fill="url(#mentorGlow)" opacity="0.4" />
          
          {/* Brain lobes */}
          <path d="M22 24C22 22 24 20 26 20C28 20 30 22 30 24C30 26 28 28 26 28C24 28 22 26 22 24Z" fill="white" fillOpacity="0.9" />
          <path d="M26 32C26 30 28 28 30 28C32 28 34 30 34 32C34 34 32 36 30 36C28 36 26 34 26 32Z" fill="white" fillOpacity="0.9" />
          
          {/* Connection nodes */}
          <circle cx="24" cy="26" r="2" fill="#ff8020" />
          <circle cx="32" cy="26" r="2" fill="#ff8020" />
          <circle cx="28" cy="34" r="2" fill="#ff8020" />
          
          {/* Connection lines */}
          <path d="M24 26L28 28" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          <path d="M32 26L28 28" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          <path d="M28 28L28 34" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          
          {/* Speech bubble */}
          <path d="M42 22L48 18L44 22L48 26L42 22Z" fill="#ff8020" stroke="white" strokeWidth="1.5" />
          <circle cx="45" cy="22" r="2" fill="white">
            <animate attributeName="r" values="2;2.5;2" dur="1.5s" repeatCount="indefinite" />
          </circle>
          
          {/* Pulsing circles for activity */}
          <circle cx="18" cy="18" r="2" fill="#ff5500" opacity="0.6">
            <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      ),
      color: "#ff8020",
      duration: "24/7 Support",
      features: ["Real-time Feedback", "Step-by-step Guidance", "Progress Monitoring"]
    },
    {
      number: "04",
      title: "Track Your Progress",
      desc: "Monitor your growth through comprehensive analytics, milestone achievements, and visual progress tracking that shows your improvement over time.",
      icon: (
        <svg className="w-14 h-14" viewBox="0 0 56 56" fill="none">
          <defs>
            <linearGradient id="progressGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6020" />
              <stop offset="100%" stopColor="#ff3300" />
            </linearGradient>
            <filter id="step4Shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#ff6020" floodOpacity="0.3" />
            </filter>
          </defs>
          
          {/* Main dashboard container */}
          <rect x="12" y="12" width="32" height="32" rx="12" fill="url(#progressGradient2)" filter="url(#step4Shadow)" />
          
          {/* Grid lines */}
          <path d="M18 28L38 28" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="2 2" />
          <path d="M18 36L38 36" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="2 2" />
          <path d="M24 20L24 40" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="2 2" />
          <path d="M32 20L32 40" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="2 2" />
          
          {/* Progress line with gradient */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ffdf20" />
            </linearGradient>
          </defs>
          <path 
            d="M18 36L22 30L26 32L30 24L34 28L38 22" 
            stroke="url(#lineGradient)" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          >
            <animate attributeName="stroke-dasharray" values="0 100; 100 0" dur="2s" fill="freeze" />
          </path>
          
          {/* Data points with glow */}
          {[
            { cx: 18, cy: 36 },
            { cx: 22, cy: 30 },
            { cx: 26, cy: 32 },
            { cx: 30, cy: 24 },
            { cx: 34, cy: 28 },
            { cx: 38, cy: 22 }
          ].map((point, i) => (
            <g key={i}>
              <circle cx={point.cx} cy={point.cy} r="4" fill="white" stroke="#ff6020" strokeWidth="1.5">
                <animate attributeName="r" values="4;5;4" dur="1s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={point.cx} cy={point.cy} r="2" fill="#ff6020" />
            </g>
          ))}
          
          {/* Milestone flag */}
          <path d="M40 18L44 14L42 18L44 22L40 18Z" fill="#ff3300" stroke="white" strokeWidth="1.5" />
          <text x="42" y="16" textAnchor="middle" fontSize="6" fontWeight="bold" fill="white">✓</text>
          
          {/* Progress percentage */}
          <circle cx="44" cy="36" r="6" fill="#ff3300" stroke="white" strokeWidth="2" />
          <text x="44" y="38" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white">95%</text>
        </svg>
      ),
      color: "#ff6020",
      duration: "Continuous",
      features: ["Visual Analytics", "Milestone Tracking", "Performance Insights"]
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scaleProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section 
      ref={containerRef}
      className=" w-full bg-gradient-to-b from-black via-gray-900 to-black border border-white/10 my-5 rounded-3xl overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Dynamic Grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Animated Background Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(255, 223, 32, 0.1) 0%, transparent 70%)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {steps.map((_, index) => {
            if (index === steps.length - 1) return null;
            const startX = 25 + index * 25;
            const endX = 25 + (index + 1) * 25;
            return (
              <motion.path
                key={index}
                d={`M ${startX}% 50 Q ${(startX + endX)/2}% 50, ${endX}% 50`}
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="10,5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 1.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              />
            );
          })}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffdf20" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ff6020" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
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
              4-STEP PROCESS
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            How It{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-[#ffdf20] via-yellow-300 to-amber-200 bg-clip-text text-transparent">
                Works
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#ffdf20] to-amber-500"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A seamless journey from assessment to mastery, powered by intelligent AI guidance
          </p>
        </motion.div>

        {/* Steps Visualization */}
        <div className="relative">
          {/* Progress Indicator */}
          <div className="hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-white/10 rounded-full">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#ffdf20] via-amber-500 to-orange-500"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 2 }}
              viewport={{ once: true }}
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
                onClick={() => setActiveStep(index)}
              >
                {/* Step Connector */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute left-full top-1/2 transform -translate-y-1/2 w-16 h-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                      <motion.path
                        d="M0,50 Q50,50 100,50"
                        stroke={step.color}
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        viewport={{ once: true }}
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="4"
                        fill={step.color}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                        viewport={{ once: true }}
                      />
                    </svg>
                  </motion.div>
                )}

                {/* Step Card */}
                <motion.div
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                    activeStep === index 
                      ? 'border-[#ffdf20] shadow-2xl' 
                      : 'border-white/10 hover:border-[#ffdf20]/50'
                  }`}
                  style={{
                    backgroundColor: hoveredStep === index ? 'rgba(255, 223, 32, 0.05)' : 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)'
                  }}
                  animate={{
                    scale: activeStep === index ? 1.05 : hoveredStep === index ? 1.02 : 1,
                    y: hoveredStep === index ? -5 : 0
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative">
                      <motion.div
                        className="text-6xl font-bold opacity-10"
                        style={{ color: step.color }}
                        animate={{ scale: hoveredStep === index ? 1.1 : 1 }}
                      >
                        {step.number}
                      </motion.div>
                      <div className="absolute top-0 left-0 text-sm font-bold tracking-widest" style={{ color: step.color }}>
                        STEP {step.number}
                      </div>
                    </div>
                    
                    {/* Duration Badge */}
                    <div className="text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-black/20 to-black/10">
                      <span style={{ color: step.color }}>{step.duration}</span>
                    </div>
                  </div>

                  {/* Step Icon */}
                  <motion.div
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-6"
                    style={{ 
                      backgroundColor: `${step.color}20`,
                      border: `2px solid ${step.color}40`
                    }}
                    animate={{
                      rotate: hoveredStep === index ? [0, 10, -10, 0] : 0,
                      scale: hoveredStep === index ? 1.1 : 1
                    }}
                    transition={{ rotate: { duration: 0.5 } }}
                  >
                    {step.icon}
                  </motion.div>

                  {/* Step Title */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <AnimatePresence mode="wait">
                    {hoveredStep === index || activeStep === index ? (
                      <motion.p
                        key="detailed"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-gray-300 text-sm mb-4"
                      >
                        {step.desc}
                      </motion.p>
                    ) : (
                      <motion.p
                        key="brief"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-gray-400 text-sm mb-4"
                      >
                        {step.desc.substring(0, 80)}...
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Features List */}
                  <div className="space-y-2">
                    {step.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-xs text-gray-400"
                      >
                        <div 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: step.color }}
                        />
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Active Step Indicator */}
                <AnimatePresence>
                  {activeStep === index && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-3 -right-3 w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: '#ffdf20' }}
                    >
                      <div className="w-2 h-2 rounded-full bg-black"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Step Navigation */}
          <div className="flex justify-center gap-4 mt-12">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeStep === index 
                    ? 'w-8 bg-gradient-to-r from-[#ffdf20] to-amber-500' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="max-w-3xl mx-auto p-8 rounded-3xl border-2 border-dashed border-white/10 bg-gradient-to-r from-black/40 via-black/20 to-black/40">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Join thousands of learners who have transformed their skills with our AI-powered platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl font-semibold text-lg"
                style={{
                  background: '#ffdf20',
                  color: '#000'
                }}
              >
                Begin First Assessment
                <span className="ml-2">→</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl font-semibold text-lg border-2"
                style={{
                  borderColor: '#ffdf20',
                  color: '#ffdf20',
                  backgroundColor: 'transparent'
                }}
              >
                Watch Demo Video
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animated Counter */}
      <div className="absolute bottom-8 right-8 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">
              {activeStep + 1}
              <span className="text-gray-400 text-lg">/4</span>
            </div>
            <div className="text-sm text-gray-400">Current Step</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}