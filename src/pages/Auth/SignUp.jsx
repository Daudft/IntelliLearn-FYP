import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import authService from "../../services/authService";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [lang, setLang] = useState("python");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const navigate = useNavigate();

  const codeSamples = {
    python: {
      code: `
# 🚀 Welcome to IntelliLearn!
from intellilearn.auth import create_user
from intellilearn.ai import LearningPathGenerator

class NewUser:
    def __init__(self, name, email, password):
        self.name = "${formData.name || "New Learner"}"
        self.email = "${formData.email || "learner@intellilearn.ai"}"
        self.skills = ["AI", "Programming", "Problem Solving"]
        self.learning_path = None
    
    def register(self):
        """AI-powered user registration"""
        try:
            # Create secure user profile
            user_profile = create_user(
                name=self.name,
                email=self.email,
                password="●●●●●●●●●●",
                preferences={
                    "ai_assistant": True,
                    "personalized_content": True,
                    "progress_tracking": True
                }
            )
            
            # Generate personalized learning path
            self.learning_path = LearningPathGenerator(
                user_profile,
                algorithm="adaptive_ai"
            ).generate()
            
            return {
                "status": "SUCCESS",
                "message": "🎯 Welcome! Your AI learning journey begins now.",
                "next_steps": [
                    "Complete initial assessment",
                    "Meet your AI mentor",
                    "Start first learning module"
                ]
            }
            
        except Exception as e:
            return {"status": "ERROR", "message": str(e)}

# Initialize new user
new_user = NewUser("${formData.name || "User"}", 
                   "${formData.email || "email@example.com"}", 
                   "secure_password")
result = new_user.register()

print(f"📚 {result['message']}")
`,
      features: ["AI Integration", "Personalized Learning", "Secure Registration"]
    },
    java: {
      code: `
// 🎓 Intelligent Learning Platform
package com.intellilearn.registration;

import ai.learningpath.Generator;
import security.auth.UserBuilder;

public class RegistrationFlow {
    private static final String USER_NAME = "${formData.name || "Java Developer"}";
    private static final String USER_EMAIL = "${formData.email || "dev@intellilearn.ai"}";
    
    public class UserProfile {
        private String name;
        private String email;
        private String[] interests;
        private LearningPath learningPath;
        
        public UserProfile(String name, String email) {
            this.name = name;
            this.email = email;
            this.interests = detectInterests();
            this.learningPath = createLearningPath();
        }
        
        private String[] detectInterests() {
            // AI-powered interest detection
            return new String[] {
                "Software Development",
                "Machine Learning",
                "System Design",
                "Cloud Computing"
            };
        }
        
        private LearningPath createLearningPath() {
            return new Generator.Builder()
                .withUserProfile(this)
                .withAIRecommendations()
                .withSkillGapAnalysis()
                .build()
                .generate();
        }
    }
    
    public void completeRegistration() {
        UserProfile profile = new UserProfile(USER_NAME, USER_EMAIL);
        System.out.println("✅ Registration successful!");
        System.out.println("🎯 Welcome " + profile.name + "!");
        System.out.println("📊 Your personalized learning path is ready.");
    }
}
`,
      features: ["Type Safety", "Enterprise Grade", "AI Recommendations"]
    },
    javascript: {
      code: `
// ⚡ Modern Learning Experience
import { createUser, generateLearningPath } from '@intellilearn/sdk';

const registerUser = async ({ name, email, password }) => {
  // AI-enhanced registration process
  const registrationData = {
    name: "${formData.name || 'New Coder'}",
    email: "${formData.email || 'coder@intellilearn.ai'}",
    password: "••••••••••",
    preferences: {
      learningStyle: 'adaptive',
      aiMentor: true,
      notifications: true,
      skillTracking: true
    }
  };
  
  try {
    // Secure user creation
    const user = await createUser(registrationData);
    
    // Generate AI-powered learning journey
    const learningJourney = await generateLearningPath({
      userId: user.id,
      algorithm: 'neural_adaptive',
      features: ['personalized', 'gamified', 'community_driven']
    });
    
    return {
      success: true,
      message: '🎉 Welcome to your learning revolution!',
      data: {
        user,
        learningJourney,
        nextSteps: [
          'Complete AI assessment',
          'Set learning goals',
          'Join community',
          'Start first module'
        ]
      }
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Execute registration
const result = await registerUser();
console.log(result.message);
`,
      features: ["Real-time", "Modern API", "Adaptive Learning"]
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // Calculate password strength
    let strength = 0;
    if (formData.password.length >= 8) strength += 25;
    if (/[A-Z]/.test(formData.password)) strength += 25;
    if (/[0-9]/.test(formData.password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength += 25;
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!acceptedTerms) {
      setError("Please accept the Terms & Conditions");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await authService.signup(formData);

      // Show success animation before redirect
      setTimeout(() => {
        navigate("/signin", {
          state: {
            message: "Registration successful! Please sign in."
          }
        });
      }, 1500);

    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength >= 75) return "#10b981"; // green
    if (passwordStrength >= 50) return "#f59e0b"; // yellow
    if (passwordStrength >= 25) return "#f97316"; // orange
    return "#ef4444"; // red
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

        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #ffdf20, transparent)' }}
        />

        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
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
                Begin Your{" "}
                <span className="bg-gradient-to-r from-[#ffdf20] via-yellow-300 to-amber-200 bg-clip-text text-transparent">
                  Learning Journey
                </span>
              </h2>
              <p className="text-gray-400 mb-8">
                Join thousands of learners transforming their skills with AI-powered education
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

              <form onSubmit={handleSignUp} className="space-y-5">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setActiveField("name")}
                      onBlur={() => setActiveField(null)}
                      placeholder="Enter your full name"
                      required
                      className={`w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 transition-all duration-300 ${activeField === "name"
                          ? "border-2 bg-white/5 border-[#ffdf20]"
                          : "border border-white/10 bg-white/5 hover:border-white/20"
                        } focus:outline-none`}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    </div>
                  </div>
                </div>

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
                      className={`w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 transition-all duration-300 ${activeField === "email"
                          ? "border-2 bg-white/5 border-[#ffdf20]"
                          : "border border-white/10 bg-white/5 hover:border-white/20"
                        } focus:outline-none`}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setActiveField("password")}
                      onBlur={() => setActiveField(null)}
                      placeholder="Create a strong password"
                      required
                      minLength={6}
                      className={`w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 transition-all duration-300 ${activeField === "password"
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

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Password strength</span>
                        <span style={{ color: getPasswordStrengthColor() }}>
                          {passwordStrength >= 75 ? "Strong" :
                            passwordStrength >= 50 ? "Medium" :
                              passwordStrength >= 25 ? "Weak" : "Very Weak"}
                        </span>
                      </div>
                      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${passwordStrength}%` }}
                          style={{ backgroundColor: getPasswordStrengthColor() }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <ul className="text-xs text-gray-500 mt-2 space-y-1">
                        <li className={formData.password.length >= 8 ? "text-green-500" : ""}>
                          • At least 8 characters
                        </li>
                        <li className={/[A-Z]/.test(formData.password) ? "text-green-500" : ""}>
                          • Contains uppercase letter
                        </li>
                        <li className={/[0-9]/.test(formData.password) ? "text-green-500" : ""}>
                          • Contains number
                        </li>
                        <li className={/[^A-Za-z0-9]/.test(formData.password) ? "text-green-500" : ""}>
                          • Contains special character
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="passwordConfirm"
                      value={formData.passwordConfirm}
                      onChange={handleChange}
                      onFocus={() => setActiveField("passwordConfirm")}
                      onBlur={() => setActiveField(null)}
                      placeholder="Confirm your password"
                      required
                      minLength={6}
                      className={`w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 transition-all duration-300 ${activeField === "passwordConfirm"
                          ? "border-2 bg-white/5 border-[#ffdf20]"
                          : "border border-white/10 bg-white/5 hover:border-white/20"
                        } focus:outline-none`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#ffdf20]"
                    >
                      {showConfirmPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-[#ffdf20] focus:ring-[#ffdf20] focus:ring-2"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-400">
                    I agree to the{" "}
                    <a href="#" className="text-[#ffdf20] hover:underline">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#ffdf20] hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {/* Create Account Button */}
                <motion.button
                  type="submit"
                  disabled={loading || !acceptedTerms}
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
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          animate={{ y: hoveredButton ? [0, -2, 0] : 0 }}
                          transition={{ repeat: Infinity, duration: 1 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </motion.svg>
                      </>
                    )}
                  </span>
                </motion.button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-8">
                <div className="flex-1 h-px bg-gray-800"></div>
                <span className="px-4 text-sm text-gray-500">or sign up with</span>
                <div className="flex-1 h-px bg-gray-800"></div>
              </div>

              {/* Alternative Sign Up */}
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

              {/* Sign In Link */}
              <p className="text-center text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-semibold hover:text-[#ffdf20] transition-colors"
                  style={{ color: '#ffdf20' }}
                >
                  Sign In
                </Link>
              </p>
            </motion.div>
          </div>

          {/* Right Side - Code Preview */}
          <div className="hidden md:flex w-1/2 flex-col p-8 md:p-12 lg:p-16 border-l border-white/10">
            {/* Language Tabs */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Registration</h3>
              <div className="flex gap-2">
                {Object.keys(codeSamples).map((language) => (
                  <motion.button
                    key={language}
                    onClick={() => setLang(language)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${lang === language
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
                  <span>Registration completed! Welcome to IntelliLearn 🎉</span>
                </div>
              </div>
            </motion.div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {/* Personalized Learning */}
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#ffdf20]/30 hover:bg-[#ffdf20]/5 transition-all duration-300 group">
                <div className="flex justify-center mb-2">
                  <svg className="w-8 h-8 text-[#ffdf20] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 32 32" fill="none">
                    <defs>
                      <linearGradient id="personalizedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffdf20" />
                        <stop offset="100%" stopColor="#ffb020" />
                      </linearGradient>
                      <filter id="personalizedGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    <path
                      d="M16 6C10.48 6 6 10.48 6 16C6 21.52 10.48 26 16 26C21.52 26 26 21.52 26 16C26 10.48 21.52 6 16 6Z"
                      fill="url(#personalizedGrad)"
                      filter="url(#personalizedGlow)"
                    />
                    <path
                      d="M16 10C12.69 10 10 12.69 10 16C10 19.31 12.69 22 16 22C19.31 22 22 19.31 22 16C22 12.69 19.31 10 16 10Z"
                      fill="white"
                      fillOpacity="0.9"
                    />
                    <path
                      d="M16 13C14.34 13 13 14.34 13 16C13 17.66 14.34 19 16 19C17.66 19 19 17.66 19 16C19 14.34 17.66 13 16 13Z"
                      fill="#ffdf20"
                    />
                    {/* Data points */}
                    <circle cx="12" cy="12" r="1.5" fill="white">
                      <animate attributeName="r" values="1.5;2;1.5" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="20" cy="12" r="1.5" fill="white">
                      <animate attributeName="r" values="1.5;2;1.5" dur="2s" repeatCount="indefinite" begin="0.5s" />
                    </circle>
                    <circle cx="16" cy="20" r="1.5" fill="white">
                      <animate attributeName="r" values="1.5;2;1.5" dur="2s" repeatCount="indefinite" begin="1s" />
                    </circle>
                  </svg>
                </div>
                <div className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                  Personalized Learning
                </div>
              </div>

              {/* AI Mentor */}
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#06b6d4]/30 hover:bg-[#06b6d4]/5 transition-all duration-300 group">
                <div className="flex justify-center mb-2">
                  <svg className="w-8 h-8 text-[#06b6d4] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 32 32" fill="none">
                    <defs>
                      <linearGradient id="aiMentorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#0891b2" />
                      </linearGradient>
                      <filter id="aiMentorGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    <path
                      d="M16 6C10.48 6 6 10.48 6 16C6 21.52 10.48 26 16 26C21.52 26 26 21.52 26 16C26 10.48 21.52 6 16 6Z"
                      fill="url(#aiMentorGrad)"
                      filter="url(#aiMentorGlow)"
                    />
                    {/* Brain-inspired design */}
                    <path
                      d="M12 14C12 12.9 12.9 12 14 12C15.1 12 16 12.9 16 14C16 12.9 16.9 12 18 12C19.1 12 20 12.9 20 14C20 16 18 17 16 19C14 17 12 16 12 14Z"
                      fill="white"
                      fillOpacity="0.9"
                    />
                    {/* Connection nodes */}
                    <circle cx="14" cy="14" r="1" fill="#06b6d4">
                      <animate attributeName="r" values="1;1.5;1" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="18" cy="14" r="1" fill="#06b6d4">
                      <animate attributeName="r" values="1;1.5;1" dur="1.5s" repeatCount="indefinite" begin="0.3s" />
                    </circle>
                    <circle cx="16" cy="18" r="1" fill="#06b6d4">
                      <animate attributeName="r" values="1;1.5;1" dur="1.5s" repeatCount="indefinite" begin="0.6s" />
                    </circle>
                    {/* Connection lines */}
                    <path d="M14 14L16 16" stroke="white" strokeWidth="1" strokeOpacity="0.7">
                      <animate attributeName="stroke-opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                    </path>
                    <path d="M18 14L16 16" stroke="white" strokeWidth="1" strokeOpacity="0.7">
                      <animate attributeName="stroke-opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.5s" />
                    </path>
                  </svg>
                </div>
                <div className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                  AI Mentor
                </div>
              </div>

              {/* Progress Tracking */}
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#10b981]/30 hover:bg-[#10b981]/5 transition-all duration-300 group">
                <div className="flex justify-center mb-2">
                  <svg className="w-8 h-8 text-[#10b981] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 32 32" fill="none">
                    <defs>
                      <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                      <filter id="progressGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    <rect
                      x="8" y="8" width="16" height="16" rx="4"
                      fill="url(#progressGrad)"
                      filter="url(#progressGlow)"
                    />
                    {/* Chart line */}
                    <path
                      d="M12 20L16 16L20 18L24 14"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    >
                      <animate
                        attributeName="stroke-dasharray"
                        values="0,100; 100,0"
                        dur="1.5s"
                        fill="freeze"
                      />
                    </path>
                    {/* Data points */}
                    <circle cx="12" cy="20" r="1.5" fill="white">
                      <animate attributeName="r" values="1.5;2;1.5" dur="1s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="16" cy="16" r="1.5" fill="white">
                      <animate attributeName="r" values="1.5;2;1.5" dur="1s" repeatCount="indefinite" begin="0.3s" />
                    </circle>
                    <circle cx="20" cy="18" r="1.5" fill="white">
                      <animate attributeName="r" values="1.5;2;1.5" dur="1s" repeatCount="indefinite" begin="0.6s" />
                    </circle>
                    <circle cx="24" cy="14" r="1.5" fill="white">
                      <animate attributeName="r" values="1.5;2;1.5" dur="1s" repeatCount="indefinite" begin="0.9s" />
                    </circle>
                    {/* Trend arrow */}
                    <path
                      d="M26 10L28 8L30 10"
                      stroke="#10b981"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M28 8L28 12"
                      stroke="#10b981"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                  Progress Tracking
                </div>
              </div>

              {/* Community */}
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#8b5cf6]/30 hover:bg-[#8b5cf6]/5 transition-all duration-300 group">
                <div className="flex justify-center mb-2">
                  <svg className="w-8 h-8 text-[#8b5cf6] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 32 32" fill="none">
                    <defs>
                      <linearGradient id="communityGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#7c3aed" />
                      </linearGradient>
                      <filter id="communityGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    <path
                      d="M16 6C10.48 6 6 10.48 6 16C6 21.52 10.48 26 16 26C21.52 26 26 21.52 26 16C26 10.48 21.52 6 16 6Z"
                      fill="url(#communityGrad)"
                      filter="url(#communityGlow)"
                    />
                    {/* People figures */}
                    <circle cx="12" cy="14" r="2" fill="white" />
                    <circle cx="20" cy="14" r="2" fill="white" />
                    <circle cx="16" cy="18" r="2" fill="white" />
                    {/* Connection lines */}
                    <path d="M12 14L16 18" stroke="white" strokeWidth="1.5" strokeOpacity="0.8">
                      <animate attributeName="stroke-opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                    </path>
                    <path d="M20 14L16 18" stroke="white" strokeWidth="1.5" strokeOpacity="0.8">
                      <animate attributeName="stroke-opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" begin="0.5s" />
                    </path>
                    {/* Pulsing rings */}
                    <circle cx="16" cy="16" r="10" stroke="white" strokeWidth="1" fill="none" opacity="0.3">
                      <animate attributeName="r" values="10;12;10" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                </div>
                <div className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                  Community
                </div>
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