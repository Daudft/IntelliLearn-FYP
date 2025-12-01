import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function AssessmentResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;
  const language = location.state?.language || "python";
  const timeTaken = location.state?.timeTaken || 0;

  const [animatedScore, setAnimatedScore] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // If no result, redirect to assessment
  if (!result) {
    navigate("/assessment");
    return null;
  }

  const { score, totalQuestions, percentage, proficiencyLevel, topicBreakdown, recommendations } = result;

  const languageIcons = {
    python: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.7 2 6 4.7 6 8v8c0 3.3 2.7 6 6 6s6-2.7 6-6V8c0-3.3-2.7-6-6-6zm0 2c2.2 0 4 1.8 4 4v8c0 2.2-1.8 4-4 4s-4-1.8-4-4V8c0-2.2 1.8-4 4-4z"/>
        <circle cx="12" cy="8" r="1.5" fill="#3776AB"/>
        <circle cx="12" cy="16" r="1.5" fill="#FFD43B"/>
      </svg>
    ),
    javascript: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#F7DF1E">
        <path d="M6 6h12v12H6V6zm2 2v8h8V8H8zm4 6.5c0 .8-.7 1.5-1.5 1.5S9 15.3 9 14.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5z"/>
        <circle cx="15" cy="10.5" r="1.5" fill="#000"/>
      </svg>
    ),
    java: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#007396">
        <path d="M12 2C8.7 2 6 4.7 6 8v8c0 3.3 2.7 6 6 6s6-2.7 6-6V8c0-3.3-2.7-6-6-6zm1 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
        <path d="M13 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="white"/>
      </svg>
    ),
    cpp: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#00599C">
        <path d="M12 2C8.1 2 5 5.1 5 9v6c0 3.9 3.1 7 7 7s7-3.1 7-7V9c0-3.9-3.1-7-7-7zm-2 12l-3-3 3-3v6zm4 0l3-3-3-3v6z"/>
      </svg>
    ),
    react: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#61DAFB">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 5c-3.9 0-7 1.8-7 4s3.1 4 7 4 7-1.8 7-4-3.1-4-7-4z" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M5 12c0-2.2 3.1-4 7-4s7 1.8 7 4" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>
    ),
    node: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#339933">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 7v10m-3-5h6" stroke="white" strokeWidth="2"/>
      </svg>
    )
  };

  // Level styling with enhanced colors
  const getLevelStyles = () => {
    const levelData = {
      Beginner: {
        bg: 'linear-gradient(135deg, #f97316, #fb923c)',
        text: '#fff',
        color: '#f97316',
        icon: (
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
            <defs>
              <linearGradient id="beginnerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316"/>
                <stop offset="100%" stopColor="#fb923c"/>
              </linearGradient>
            </defs>
            <circle cx="16" cy="16" r="14" fill="url(#beginnerGrad)"/>
            <path d="M16 10L18 14L22 14L19 17L20 21L16 19L12 21L13 17L10 14L14 14L16 10Z" fill="white"/>
            <circle cx="16" cy="16" r="4" fill="#f97316"/>
          </svg>
        )
      },
      Intermediate: {
        bg: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
        text: '#fff',
        color: '#3b82f6',
        icon: (
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
            <defs>
              <linearGradient id="intermediateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6"/>
                <stop offset="100%" stopColor="#60a5fa"/>
              </linearGradient>
            </defs>
            <path d="M16 6L20 12L28 13L23 18L24 26L16 22L8 26L9 18L4 13L12 12L16 6Z" fill="url(#intermediateGrad)"/>
            <circle cx="16" cy="16" r="4" fill="white"/>
            <path d="M16 12L18 16L22 16L19 19L20 23L16 21L12 23L13 19L10 16L14 16L16 12Z" fill="#3b82f6"/>
          </svg>
        )
      },
      Advanced: {
        bg: 'linear-gradient(135deg, #10b981, #34d399)',
        text: '#fff',
        color: '#10b981',
        icon: (
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
            <defs>
              <linearGradient id="advancedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981"/>
                <stop offset="100%" stopColor="#34d399"/>
              </linearGradient>
            </defs>
            <circle cx="16" cy="16" r="14" fill="url(#advancedGrad)"/>
            <circle cx="16" cy="16" r="10" stroke="white" strokeWidth="2"/>
            <path d="M16 8L20 14L28 14L22 18L24 26L16 22L8 26L10 18L4 14L12 14L16 8Z" fill="white"/>
            <circle cx="16" cy="16" r="4" fill="#10b981"/>
          </svg>
        )
      }
    };
    
    return levelData[proficiencyLevel] || {
      bg: 'linear-gradient(135deg, #ffdf20, #ffb020)',
      text: '#000',
      color: '#ffdf20',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" fill="#ffdf20"/>
          <path d="M16 8L20 12L24 10L22 14L26 16L22 18L24 22L20 20L16 24L12 20L8 22L10 18L6 16L10 14L8 10L12 12L16 8Z" fill="white"/>
        </svg>
      )
    };
  };

  const levelStyles = getLevelStyles();

  useEffect(() => {
    // Animate score counter
    let start = 0;
    const end = percentage;
    const duration = 2000;
    const incrementTime = 20;

    const timer = setInterval(() => {
      start += 1;
      setAnimatedScore(start);
      if (start >= end) {
        clearInterval(timer);
        setAnimatedScore(end);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [percentage]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Prepare data for custom chart
  const pieData = [
    { name: 'Correct', value: score, color: '#10b981' },
    { name: 'Incorrect', value: totalQuestions - score, color: '#ef4444' }
  ];

  const barData = topicBreakdown ? Object.entries(topicBreakdown).map(([topic, stats]) => ({
    topic,
    correct: stats.correct,
    total: stats.total,
    percentage: Math.round((stats.correct / stats.total) * 100)
  })) : [];

  // Calculate time efficiency
  const timeEfficiency = timeTaken > 0 ? Math.round((totalQuestions / timeTaken) * 60) : 0; // questions per hour
  const accuracy = Math.round((score / totalQuestions) * 100);

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Calculate pie chart angles
  const calculatePieChart = () => {
    const total = pieData.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    
    return pieData.map((item) => {
      const angle = (item.value / total) * 360;
      const data = {
        ...item,
        startAngle: currentAngle,
        endAngle: currentAngle + angle
      };
      currentAngle += angle;
      return data;
    });
  };

  const pieChartData = calculatePieChart();

  // New: Enhanced circular progress component
  const CircularProgress = ({ percentage, size = 200, strokeWidth = 12 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <defs>
            <linearGradient id="circularGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffdf20" />
              <stop offset="50%" stopColor="#ffb020" />
              <stop offset="100%" stopColor="#ff9e00" />
            </linearGradient>
            <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffdf20" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ff9e00" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          
          {/* Animated progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#circularGradient)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, ease: "easeOut" }}
            strokeLinecap="round"
            filter="url(#glow)"
          />
          
          {/* Inner glow */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius - strokeWidth / 2}
            fill="url(#glowGradient)"
            fillOpacity="0.1"
          />
          
          {/* Pulsing rings */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius + 10}
            stroke="#ffdf20"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          >
            <animate
              attributeName="r"
              values={`${radius + 10};${radius + 20};${radius + 10}`}
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.3;0.1;0.3"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div 
            className="text-5xl font-bold text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, type: "spring" }}
          >
            {animatedScore}%
          </motion.div>
          <div className="text-gray-400 text-sm mt-1">
            {score}/{totalQuestions} correct
          </div>
          
          {/* Animated success indicators */}
          <div className="flex gap-1 mt-2">
            {[...Array(Math.floor(percentage / 25))].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full bg-green-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.8 + i * 0.1 }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // New: Enhanced pie chart component
  const EnhancedPieChart = ({ data }) => (
    <div className="relative w-56 h-56">
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <defs>
          <filter id="pieShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="currentColor" floodOpacity="0.3" />
          </filter>
        </defs>
        
        {data.map((slice, index) => (
          <g key={slice.name}>
            <motion.path
              d={`
                M 50,50
                L ${50 + 40 * Math.cos((slice.startAngle - 90) * Math.PI / 180)},${50 + 40 * Math.sin((slice.startAngle - 90) * Math.PI / 180)}
                A 40,40 0 ${slice.endAngle - slice.startAngle > 180 ? 1 : 0},1 ${50 + 40 * Math.cos((slice.endAngle - 90) * Math.PI / 180)},${50 + 40 * Math.sin((slice.endAngle - 90) * Math.PI / 180)}
                Z
              `}
              fill={slice.color}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              filter="url(#pieShadow)"
            />
            
            {/* Label */}
            <motion.text
              x={50 + 50 * Math.cos(((slice.startAngle + slice.endAngle) / 2 - 90) * Math.PI / 180)}
              y={50 + 50 * Math.sin(((slice.startAngle + slice.endAngle) / 2 - 90) * Math.PI / 180)}
              textAnchor="middle"
              dy="0.35em"
              fill="white"
              fontSize="8"
              fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              {slice.value}
            </motion.text>
          </g>
        ))}
        
        {/* Center hole with glow */}
        <circle cx="50" cy="50" r="20" fill="rgba(0, 0, 0, 0.7)">
          <animate attributeName="r" values="20;22;20" dur="2s" repeatCount="indefinite" />
        </circle>
        
        {/* Inner rings */}
        <circle cx="50" cy="50" r="18" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" fill="none" />
        <circle cx="50" cy="50" r="22" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" fill="none" />
      </svg>
      
      {/* Floating indicators */}
      <div className="absolute top-0 left-0 w-full h-full">
        {data.map((slice, index) => (
          <motion.div
            key={slice.name}
            className="absolute w-3 h-3 rounded-full"
            style={{
              backgroundColor: slice.color,
              left: `${50 + 60 * Math.cos(((slice.startAngle + slice.endAngle) / 2 - 90) * Math.PI / 180)}%`,
              top: `${50 + 60 * Math.sin(((slice.startAngle + slice.endAngle) / 2 - 90) * Math.PI / 180)}%`,
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.5
            }}
          />
        ))}
      </div>
    </div>
  );

  // New: Celebration icon component
  const CelebrationIcon = () => (
    <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
      <defs>
        <radialGradient id="celebrationGradient">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFA500" />
        </radialGradient>
        <filter id="sparkleFilter">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
          <feFlood floodColor="#FFD700" floodOpacity="0.8" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      <motion.path
        d="M50 10L55 30L75 30L60 40L65 60L50 50L35 60L40 40L25 30L45 30L50 10Z"
        fill="url(#celebrationGradient)"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, type: "spring" }}
      />
      
      {/* Sparkles */}
      {[...Array(8)].map((_, i) => (
        <motion.circle
          key={i}
          cx={50 + 40 * Math.cos((i * 45 * Math.PI) / 180)}
          cy={50 + 40 * Math.sin((i * 45 * Math.PI) / 180)}
          r="3"
          fill="#FFD700"
          filter="url(#sparkleFilter)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            repeatDelay: 1
          }}
        />
      ))}
    </svg>
  );

  // New: Stats icon component
  const StatsIcon = ({ type, value, label }) => {
    const icons = {
      time: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      efficiency: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M3 22V12L8 7L12 10L16 7L21 12V22" stroke="currentColor" strokeWidth="2"/>
          <rect x="6" y="14" width="12" height="8" rx="1" fill="currentColor" fillOpacity="0.2"/>
        </svg>
      ),
      rate: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M4 12L8 8V16L4 12Z" fill="currentColor"/>
          <path d="M8 12L12 8V16L8 12Z" fill="currentColor" fillOpacity="0.7"/>
          <path d="M12 12L16 8V16L12 12Z" fill="currentColor" fillOpacity="0.5"/>
          <path d="M16 12L20 8V16L16 12Z" fill="currentColor" fillOpacity="0.3"/>
        </svg>
      )
    };

    return (
      <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
        <div className="flex items-center gap-3">
          <div className="text-[#ffdf20]">
            {icons[type]}
          </div>
          <span className="text-gray-400">{label}</span>
        </div>
        <span className="text-white font-bold">{value}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, rgba(10, 10, 10, 0.95) 0%, rgba(0, 0, 0, 1) 100%)"
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-15 transition-all duration-300"
          style={{
            background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 223, 32, 0.2), transparent 80%)`
          }}
        />
        
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, #ffdf20, transparent)' }}
          animate={{ 
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, #ffb020, transparent)' }}
          animate={{ 
            x: [0, -30, 0],
            y: [0, 15, 0],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Celebration Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <CelebrationIcon />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Assessment{" "}
            <span className="bg-gradient-to-r from-[#ffdf20] via-yellow-300 to-amber-200 bg-clip-text text-transparent">
              Complete!
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Great work! Here's your detailed performance analysis
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Score & Level */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Main Score Card */}
            <div className="bg-gradient-to-br from-gray-900/70 via-black/70 to-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Circular Progress */}
                <CircularProgress percentage={percentage} size={200} strokeWidth={12} />

                {/* Score Details */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-4">Performance Summary</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors group">
                      <div className="text-sm text-gray-400 mb-1">Accuracy</div>
                      <div className="text-2xl font-bold text-white group-hover:text-[#ffdf20] transition-colors">
                        {accuracy}%
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors group">
                      <div className="text-sm text-gray-400 mb-1">Time Taken</div>
                      <div className="text-2xl font-bold text-white group-hover:text-[#ffdf20] transition-colors">
                        {formatTime(timeTaken)}
                      </div>
                    </div>
                  </div>

                  {/* Proficiency Level */}
                  <motion.div 
                    className="rounded-xl p-4 group cursor-pointer"
                    style={{
                      background: levelStyles.bg,
                      color: levelStyles.text
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="group-hover:animate-pulse">
                        {levelStyles.icon}
                      </div>
                      <div>
                        <div className="text-sm font-medium">Your Proficiency Level</div>
                        <div className="text-xl font-bold">{proficiencyLevel}</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Topic Breakdown */}
            <div className="bg-gradient-to-br from-gray-900/70 via-black/70 to-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                <span className="inline-flex items-center gap-2">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#ffdf20">
                    <path d="M3 17L9 11L13 15L21 7V3H17L9 11L3 17ZM5 19L9 15L7 13L5 15V19Z"/>
                  </svg>
                  Topic Performance
                </span>
              </h3>
              
              <div className="space-y-6">
                {barData.map((item, index) => (
                  <div key={item.topic} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-white group-hover:text-[#ffdf20] transition-colors">
                        {item.topic}
                      </span>
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        {item.correct}/{item.total} ({item.percentage}%)
                      </span>
                    </div>
                    <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full relative overflow-hidden"
                        style={{ background: levelStyles.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      >
                        {/* Animated shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Charts & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            {/* Custom Pie Chart */}
            <div className="bg-gradient-to-br from-gray-900/70 via-black/70 to-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#ffdf20">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Score Distribution
              </h3>
              <div className="flex flex-col items-center">
                <EnhancedPieChart data={pieChartData} />
                
                <div className="grid grid-cols-2 gap-4 w-full mt-6">
                  <div className="text-center p-3 rounded-xl bg-white/5 hover:bg-green-500/20 transition-colors group">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-green-500"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <div className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                        {score}
                      </div>
                    </div>
                    <div className="text-sm text-gray-400 group-hover:text-green-300 transition-colors">
                      Correct
                    </div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/5 hover:bg-red-500/20 transition-colors group">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-red-500"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                      />
                      <div className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                        {totalQuestions - score}
                      </div>
                    </div>
                    <div className="text-sm text-gray-400 group-hover:text-red-300 transition-colors">
                      Incorrect
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-gray-900/70 via-black/70 to-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#ffdf20">
                  <path d="M3 17V19H5V17H3M3 5V7H5V5H3M13 5V7H15V5H13M3 11V13H5V11H3M7 5V7H9V5H7M3 15V17H5V15H3M9 15V17H11V15H9M19 5V7H21V5H19M11 5V7H13V5H11M19 11V13H21V11H19M19 17V19H21V17H19M15 5V7H17V5H15M7 11V13H9V11H7M19 15V17H21V15H19M15 11V13H17V11H15M7 15V17H9V15H7M11 11V13H13V11H11M11 15V17H13V15H11M15 15V17H17V15H15Z"/>
                </svg>
                Quick Stats
              </h3>
              <div className="space-y-3">
                <StatsIcon 
                  type="time" 
                  value={`${timeEfficiency} q/hour`}
                  label="Time Efficiency"
                />
                <StatsIcon 
                  type="rate" 
                  value={`${Math.round((timeTaken / totalQuestions) * 10) / 10}s/q`}
                  label="Question Rate"
                />
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-[#ffdf20]">
                      {languageIcons[language] || languageIcons.python}
                    </div>
                    <span className="text-gray-400">Language</span>
                  </div>
                  <span className="text-white font-bold capitalize">{language}</span>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-br from-gray-900/70 via-black/70 to-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#ffdf20">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                Recommendations
              </h3>
              <div className="space-y-3">
                {recommendations ? recommendations.map((rec, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start gap-3 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <motion.div 
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ 
                        background: 'rgba(255, 223, 32, 0.1)',
                        border: '1px solid rgba(255, 223, 32, 0.2)'
                      }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="#ffdf20">
                        <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"/>
                      </svg>
                    </motion.div>
                    <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
                      {rec}
                    </span>
                  </motion.div>
                )) : (
                  <>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-2 rounded-full bg-[#ffdf20]"></div>
                      <span className="text-gray-300 text-sm">Complete interactive tutorials</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-2 rounded-full bg-[#ffdf20]"></div>
                      <span className="text-gray-300 text-sm">Practice with coding challenges</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-2 rounded-full bg-[#ffdf20]"></div>
                      <span className="text-gray-300 text-sm">Review weak areas with AI mentor</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <motion.button
            onClick={() => navigate("/dashboard")}
            className="relative overflow-hidden p-6 rounded-2xl font-semibold text-lg group"
            style={{
              background: 'linear-gradient(135deg, #ffdf20 0%, #ffb020 100%)',
              color: '#000'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-yellow-300 opacity-0 group-hover:opacity-20 transition-opacity" />
            
            <span className="relative flex items-center justify-center gap-3">
              Go to Dashboard
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5V21L19 12L8 5Z"/>
              </svg>
            </span>
          </motion.button>

          <motion.button
            onClick={() => navigate("/courses")}
            className="relative p-6 rounded-2xl font-semibold text-lg group overflow-hidden"
            style={{
              border: '2px solid #ffdf20',
              color: '#ffdf20',
              background: 'rgba(255, 223, 32, 0.1)'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#ffdf20] to-[#ffb020] opacity-0 group-hover:opacity-10 transition-opacity" />
            <span className="relative flex items-center justify-center gap-3">
              Browse Courses
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                <path d="M2 17L12 22L22 17"/>
                <path d="M2 12L12 17L22 12"/>
              </svg>
            </span>
          </motion.button>

          <motion.button
            onClick={() => navigate("/assessment")}
            className="relative p-6 rounded-2xl font-semibold text-lg group overflow-hidden"
            style={{
              border: '2px solid rgba(255, 255, 255, 0.2)',
              color: '#fff',
              background: 'rgba(255, 255, 255, 0.05)'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center justify-center gap-3">
              Retake Assessment
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z"/>
              </svg>
            </span>
          </motion.button>
        </motion.div>

        {/* Detailed Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-[#ffdf20] hover:text-[#ffec80] transition-colors flex items-center justify-center gap-2 mx-auto group"
          >
            {showDetails ? 'Hide' : 'Show'} Detailed Analysis
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: showDetails ? 180 : 0 }}
              whileHover={{ scale: 1.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>
        </motion.div>

        {/* Detailed Analysis */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-8 h-8" viewBox="0 0 32 32" fill="#ffdf20">
                  <path d="M16 4C9.38 4 4 9.38 4 16C4 22.62 9.38 28 16 28C22.62 28 28 22.62 28 16C28 9.38 22.62 4 16 4ZM16 24C11.58 24 8 20.42 8 16C8 11.58 11.58 8 16 8C20.42 8 24 11.58 24 16C24 20.42 20.42 24 16 24Z"/>
                  <path d="M20 12L16 16L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 20L16 16L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Detailed Analysis
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Performance Metrics</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <svg className="w-5 h-5 text-[#ffdf20]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"/>
                          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <div className="text-sm text-gray-400">Average Question Time</div>
                      </div>
                      <div className="text-xl font-bold text-white">
                        {Math.round((timeTaken / totalQuestions) * 10) / 10} seconds
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <svg className="w-5 h-5 text-[#ffdf20]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/>
                        </svg>
                        <div className="text-sm text-gray-400">Completion Rate</div>
                      </div>
                      <div className="text-xl font-bold text-white">100%</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Learning Recommendations</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: 'rgba(255, 223, 32, 0.1)' }}
                      >
                        <svg className="w-5 h-5 text-[#ffdf20]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                          <path d="M2 17L12 22L22 17"/>
                          <path d="M2 12L12 17L22 12"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-white group-hover:text-[#ffdf20] transition-colors">
                          Interactive Tutorials
                        </div>
                        <div className="text-sm text-gray-400">Recommended based on your skill gaps</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: 'rgba(255, 223, 32, 0.1)' }}
                      >
                        <svg className="w-5 h-5 text-[#ffdf20]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM8 13H16V15H8V13ZM8 17H16V19H8V17Z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-white group-hover:text-[#ffdf20] transition-colors">
                          Practice Challenges
                        </div>
                        <div className="text-sm text-gray-400">Apply concepts in real scenarios</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ 
              background: i % 3 === 0 ? '#ffdf20' : i % 3 === 1 ? '#ffb020' : '#ffcc00',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, (Math.random() - 0.5) * 50, 0],
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}