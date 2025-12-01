import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import authService from "../../services/authService";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [lang, setLang] = useState("python");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();

  const codeSamples = {
    python: {
      code: `
# 🔐 AI-Powered Authentication
from intellilearn.auth import authenticate

email = "${formData.email || "learner@intellilearn.ai"}"
password = "●●●●●●●●●●"

def sign_in(email, password):
    """Intelligent authentication with AI analysis"""
    try:
        # AI-powered credential verification
        user = authenticate(
            email=email,
            password=password,
            device_fingerprint=True,
            behavior_analysis=True
        )
        
        # Generate personalized learning path
        learning_path = user.generate_learning_path()
        
        return {
            "status": "SUCCESS",
            "message": "Welcome back to your learning journey!",
            "next_steps": learning_path
        }
    except AuthenticationError as e:
        return {"status": "ERROR", "message": str(e)}

# Execute authentication
result = sign_in(email, password)
print(f"🎯 {result['message']}")
`,
      features: ["AI Analysis", "Secure Login", "Personalized Path"]
    },
    java: {
      code: `
// 🚀 Enterprise-Grade Authentication
package com.intellilearn.auth;

public class IntelligentAuth {
    private static final String EMAIL = "${formData.email || "user@intellilearn.ai"}";
    private static final String PASSWORD = "**********";
    
    public class AuthenticationResult {
        boolean success;
        String message;
        LearningPath learningPath;
        
        public AuthenticationResult(boolean success, String message) {
            this.success = success;
            this.message = message;
            this.learningPath = generateLearningPath();
        }
        
        private LearningPath generateLearningPath() {
            // AI-generated personalized curriculum
            return new LearningPath.Builder()
                .withAdaptiveLearning()
                .withSkillGapAnalysis()
                .withProgressTracking()
                .build();
        }
    }
    
    public AuthenticationResult authenticate() {
        // Secure authentication with AI insights
        if (validateCredentials(EMAIL, PASSWORD)) {
            return new AuthenticationResult(
                true, 
                "🎯 Authentication successful! Redirecting to your dashboard..."
            );
        }
        return new AuthenticationResult(false, "Invalid credentials");
    }
}
`,
      features: ["Enterprise Secure", "Type Safety", "AI Integration"]
    },
    javascript: {
      code: `
// ⚡ Modern Authentication Flow
import { intelligentAuth, generateLearningPath } from '@intellilearn/sdk';

const authenticateUser = async ({ email, password }) => {
  // AI-powered authentication
  const authResponse = await intelligentAuth.authenticate({
    email: "${formData.email || 'developer@intellilearn.ai'}",
    password: "••••••••••",
    features: ['behavior_analysis', 'risk_assessment', 'personalization']
  });
  
  if (authResponse.success) {
    // Generate personalized learning experience
    const userProfile = await authResponse.getUserProfile();
    const learningPath = await generateLearningPath(userProfile);
    
    return {
      success: true,
      message: '🚀 Welcome back! Your AI mentor is ready.',
      data: {
        user: userProfile,
        recommendations: learningPath.recommendations,
        progress: userProfile.progress
      }
    };
  }
  
  return { success: false, message: authResponse.error };
};

// Execute authentication
const result = await authenticateUser();
console.log(result.message);
`,
      features: ["Async/Await", "Real-time", "Modern API"]
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authService.signin(formData);
      
      const userId = response.user.id;
      const assessmentStatus = await authService.checkAssessmentStatus(userId);

      if (assessmentStatus.hasCompletedAssessment) {
        const resultData = await authService.getUserResult(userId);
        navigate("/assessment/result", { state: { result: resultData.result } });
      } else {
        navigate("/assessment");
      }
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
      style={{
        background: "radial-gradient(circle at 50% 50%, rgba(10, 10, 10, 0.9) 0%, rgba(0, 0, 0, 1) 100%)"
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-20"
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full"
      >
        <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row">

          {/* Left Side - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16">
            {/* Logo/Brand */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8 flex items-center gap-3"
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                style={{ 
                  background: 'linear-gradient(135deg, #ffdf20 0%, #ffb020 100%)' 
                }}
              >
                <span className="text-black font-bold text-lg">IL</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">IntelliLearn</h1>
                <p className="text-xs text-gray-400 tracking-widest">AI-Powered Learning</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                Welcome Back,{" "}
                <span className="bg-gradient-to-r from-[#ffdf20] via-yellow-300 to-amber-200 bg-clip-text text-transparent">
                  Learner
                </span>
              </h2>
              <p className="text-gray-400 mb-8">
                Sign in to continue your personalized AI-powered learning journey
              </p>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                        <span className="text-red-400">!</span>
                      </div>
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSignIn} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setActiveField("email")}
                      onBlur={() => setActiveField(null)}
                      placeholder="Enter your email"
                      required
                      className={`w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 transition-all duration-300 ${
                        activeField === "email" 
                          ? "border-2 bg-white/5 border-[#ffdf20]" 
                          : "border border-white/10 bg-white/5 hover:border-white/20"
                      } focus:outline-none`}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <span className="text-gray-500">@</span>
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-300">
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium hover:text-[#ffdf20] transition-colors"
                      style={{ color: '#ffdf20' }}
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setActiveField("password")}
                      onBlur={() => setActiveField(null)}
                      placeholder="Enter your password"
                      required
                      className={`w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 transition-all duration-300 ${
                        activeField === "password" 
                          ? "border-2 bg-white/5 border-[#ffdf20]" 
                          : "border border-white/10 bg-white/5 hover:border-white/20"
                      } focus:outline-none`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#ffdf20]"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                {/* Sign In Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  onMouseEnter={() => setHoveredButton(true)}
                  onMouseLeave={() => setHoveredButton(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full py-4 rounded-xl font-semibold text-lg overflow-hidden shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
                  
                  <span className="relative flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        <motion.div
                          className="w-5 h-5 rounded-full border-2 border-transparent border-t-black"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Authenticating...
                      </>
                    ) : (
                      <>
                        Sign In
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          animate={{ x: hoveredButton ? 5 : 0 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </motion.svg>
                      </>
                    )}
                  </span>
                </motion.button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-8">
                <div className="flex-1 h-px bg-gray-800"></div>
                <span className="px-4 text-sm text-gray-500">or continue with</span>
                <div className="flex-1 h-px bg-gray-800"></div>
              </div>

              {/* Alternative Sign In */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                  <span>G</span>
                  <span className="text-sm">Google</span>
                </button>
                <button className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                  <span>G</span>
                  <span className="text-sm">GitHub</span>
                </button>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold hover:text-[#ffdf20] transition-colors"
                  style={{ color: '#ffdf20' }}
                >
                  Create Account
                </Link>
              </p>
            </motion.div>
          </div>

          {/* Right Side - Code Preview */}
          <div className="hidden md:flex w-1/2 flex-col p-8 md:p-12 lg:p-16 border-l border-white/10">
            {/* Language Tabs */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">AI Authentication</h3>
              <div className="flex gap-2">
                {Object.keys(codeSamples).map((language) => (
                  <motion.button
                    key={language}
                    onClick={() => setLang(language)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      lang === language
                        ? "bg-gradient-to-r from-[#ffdf20] to-[#ffb020] text-black"
                        : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {language.charAt(0).toUpperCase() + language.slice(1)}
                  </motion.button>
                ))}
              </div>
              
              {/* Features */}
              <div className="flex flex-wrap gap-2 mt-4">
                {codeSamples[lang].features.map((feature, index) => (
                  <motion.span
                    key={feature}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-3 py-1 rounded-full text-xs"
                    style={{ 
                      background: 'rgba(255, 223, 32, 0.1)',
                      color: '#ffdf20',
                      border: '1px solid rgba(255, 223, 32, 0.2)'
                    }}
                  >
                    {feature}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Code Editor */}
            <motion.div
              key={lang}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative flex-1 rounded-2xl overflow-hidden border border-white/10"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(20, 20, 20, 0.9))'
              }}
            >
              {/* Editor Header */}
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-black/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm text-gray-400">{lang}.py</div>
              </div>

              {/* Code Content */}
              <div className="p-6 h-full overflow-auto">
                <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap"
                  style={{ 
                    color: '#ffdf20',
                    textShadow: '0 0 10px rgba(255, 223, 32, 0.3)'
                  }}
                >
                  {codeSamples[lang].code}
                </pre>
              </div>

              {/* Terminal Output */}
              <div className="px-4 py-3 border-t border-white/10 bg-black/70">
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <span>➜</span>
                  <span>Authentication completed successfully</span>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xl font-bold text-white">2.5K+</div>
                <div className="text-xs text-gray-400">Active Learners</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xl font-bold text-white">98%</div>
                <div className="text-xs text-gray-400">Success Rate</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xl font-bold text-white">24/7</div>
                <div className="text-xs text-gray-400">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
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
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </div>
  );
}