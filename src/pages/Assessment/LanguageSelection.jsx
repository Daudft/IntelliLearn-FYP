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

  const languageColors = {
    python: "#3776AB",
    javascript: "#F7DF1E",
    java: "#007396",
    cpp: "#00599C",
    react: "#61DAFB",
    node: "#339933"
  };

  // Level styling with enhanced colors
  const getLevelStyles = () => {
    switch (proficiencyLevel) {
      case 'Beginner':
        return {
          bg: 'linear-gradient(135deg, #f97316, #fb923c)',
          text: '#fff',
          icon: '🌱',
          color: '#f97316'
        };
      case 'Intermediate':
        return {
          bg: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
          text: '#fff',
          icon: '🚀',
          color: '#3b82f6'
        };
      case 'Advanced':
        return {
          bg: 'linear-gradient(135deg, #10b981, #34d399)',
          text: '#fff',
          icon: '⭐',
          color: '#10b981'
        };
      default:
        return {
          bg: 'linear-gradient(135deg, #ffdf20, #ffb020)',
          text: '#000',
          icon: '📊',
          color: '#ffdf20'
        };
    }
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

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{
        background: "radial-gradient(circle at 50% 50%, rgba(10, 10, 10, 0.95) 0%, rgba(0, 0, 0, 1) 100%)"
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 223, 32, 0.15), transparent 70%)`
          }}
        />
        
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #ffdf20, transparent)' }}
        />
        
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #ffb020, transparent)' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Celebration Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 360, 0]
            }}
            transition={{ duration: 2 }}
          >
            🎉
          </motion.div>
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
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Circular Progress */}
                <div className="relative">
                  <svg className="transform -rotate-90 w-48 h-48">
                    <circle
                      cx="96"
                      cy="96"
                      r="84"
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="12"
                      fill="none"
                    />
                    <motion.circle
                      cx="96"
                      cy="96"
                      r="84"
                      stroke="url(#gradient)"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray="528"
                      initial={{ strokeDashoffset: 528 }}
                      animate={{ strokeDashoffset: 528 - (percentage * 5.28) }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ffdf20" />
                        <stop offset="100%" stopColor="#ffb020" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div 
                      className="text-5xl font-bold text-white"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.5, type: "spring" }}
                    >
                      {animatedScore}%
                    </motion.div>
                    <div className="text-gray-400">
                      {score}/{totalQuestions} correct
                    </div>
                  </div>
                </div>

                {/* Score Details */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-4">Performance Summary</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="text-sm text-gray-400 mb-1">Accuracy</div>
                      <div className="text-2xl font-bold text-white">{accuracy}%</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="text-sm text-gray-400 mb-1">Time Taken</div>
                      <div className="text-2xl font-bold text-white">{formatTime(timeTaken)}</div>
                    </div>
                  </div>

                  {/* Proficiency Level */}
                  <div 
                    className="rounded-xl p-4"
                    style={{
                      background: levelStyles.bg,
                      color: levelStyles.text
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{levelStyles.icon}</span>
                      <div>
                        <div className="text-sm font-medium">Your Proficiency Level</div>
                        <div className="text-xl font-bold">{proficiencyLevel}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Topic Breakdown */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">📊 Topic Performance</h3>
              
              <div className="space-y-6">
                {barData.map((item, index) => (
                  <div key={item.topic}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-white">{item.topic}</span>
                      <span className="text-gray-300">
                        {item.correct}/{item.total} ({item.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: levelStyles.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
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
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Score Distribution</h3>
              <div className="flex flex-col items-center">
                {/* Custom Pie Chart SVG */}
                <div className="relative w-48 h-48 mb-4">
                  <svg width="100%" height="100%" viewBox="0 0 100 100">
                    {pieChartData.map((slice, index) => (
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
                        />
                      </g>
                    ))}
                    <circle cx="50" cy="50" r="20" fill="rgba(0, 0, 0, 0.7)" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xl font-bold text-white">{totalQuestions}</div>
                      <div className="text-xs text-gray-400">Total</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="text-center p-3 rounded-xl bg-white/5">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="text-lg font-bold text-white">{score}</div>
                    </div>
                    <div className="text-sm text-gray-400">Correct</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/5">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="text-lg font-bold text-white">{totalQuestions - score}</div>
                    </div>
                    <div className="text-sm text-gray-400">Incorrect</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4">📈 Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Time Efficiency</span>
                  <span className="text-white font-bold">{timeEfficiency} q/hour</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Question Rate</span>
                  <span className="text-white font-bold">
                    {Math.round((timeTaken / totalQuestions) * 10) / 10}s/q
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Language</span>
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium capitalize"
                    style={{ 
                      background: `${languageColors[language]}20`,
                      color: languageColors[language],
                      border: `1px solid ${languageColors[language]}40`
                    }}
                  >
                    {language}
                  </span>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4">🎯 Recommendations</h3>
              <div className="space-y-3">
                {recommendations ? recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-[#ffdf20]"></div>
                    <span className="text-gray-300 text-sm">{rec}</span>
                  </div>
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
          <button
            onClick={() => navigate("/dashboard")}
            className="relative overflow-hidden p-6 rounded-2xl font-semibold text-lg"
            style={{
              background: 'linear-gradient(135deg, #ffdf20 0%, #ffb020 100%)',
              color: '#000'
            }}
          >
            {/* Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <span className="relative flex items-center justify-center gap-3">
              Go to Dashboard
              <span>🚀</span>
            </span>
          </button>

          <button
            onClick={() => navigate("/courses")}
            className="p-6 rounded-2xl font-semibold text-lg border-2"
            style={{
              borderColor: '#ffdf20',
              color: '#ffdf20',
              background: 'rgba(255, 223, 32, 0.1)'
            }}
          >
            Browse Courses
          </button>

          <button
            onClick={() => navigate("/assessment")}
            className="p-6 rounded-2xl font-semibold text-lg border-2"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.2)',
              color: '#fff',
              background: 'rgba(255, 255, 255, 0.05)'
            }}
          >
            Retake Assessment
          </button>
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
            className="text-[#ffdf20] hover:text-[#ffec80] transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            {showDetails ? 'Hide' : 'Show'} Detailed Analysis
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: showDetails ? 180 : 0 }}
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
              <h3 className="text-2xl font-bold text-white mb-6">📋 Detailed Analysis</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Performance Metrics</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5">
                      <div className="text-sm text-gray-400 mb-1">Average Question Time</div>
                      <div className="text-xl font-bold text-white">
                        {Math.round((timeTaken / totalQuestions) * 10) / 10} seconds
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5">
                      <div className="text-sm text-gray-400 mb-1">Completion Rate</div>
                      <div className="text-xl font-bold text-white">100%</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Learning Recommendations</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: 'rgba(255, 223, 32, 0.1)' }}
                      >
                        <span className="text-[#ffdf20]">📚</span>
                      </div>
                      <div>
                        <div className="font-medium text-white">Interactive Tutorials</div>
                        <div className="text-sm text-gray-400">Recommended based on your skill gaps</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: 'rgba(255, 223, 32, 0.1)' }}
                      >
                        <span className="text-[#ffdf20]">💻</span>
                      </div>
                      <div>
                        <div className="font-medium text-white">Practice Challenges</div>
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
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ 
              background: '#ffdf20',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </div>
  );
}