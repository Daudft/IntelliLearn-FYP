import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import authService from "../../services/authService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const response = await authService.forgotPassword({ email });
      setSuccess(true);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
        "Failed to send reset link. Please check your email and try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
      style={{
        background: "radial-gradient(circle at 50% 50%, rgba(10, 10, 10, 0.95) 0%, rgba(0, 0, 0, 1) 100%)"
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
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
          {/* Header Section */}
          <div className="p-8 md:p-12">
            {/* Logo/Brand */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                style={{ 
                  background: 'linear-gradient(135deg, #ffdf20 0%, #ffb020 100%)' 
                }}
              >
                <span className="text-black font-bold text-xl">IL</span>
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
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                  Reset Your{" "}
                  <span className="bg-gradient-to-r from-[#ffdf20] via-yellow-300 to-amber-200 bg-clip-text text-transparent">
                    Password
                  </span>
                </h2>
                <p className="text-gray-300">
                  Enter your email and we'll send you a secure reset link
                </p>
              </div>

              {/* Security Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 mb-8"
              >
                <div className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{ 
                    background: 'rgba(255, 223, 32, 0.1)',
                    color: '#ffdf20',
                    border: '1px solid rgba(255, 223, 32, 0.2)'
                  }}
                >
                  🔒 Secure Password Reset
                </div>
              </motion.div>

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

              {/* Success Message */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-6 rounded-xl border border-green-500/30 bg-green-500/10"
                  >
                    <div className="flex flex-col items-center text-center">
                      <motion.div
                        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                        style={{ 
                          background: 'linear-gradient(135deg, #10b981, #34d399)',
                          color: '#fff'
                        }}
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 1 },
                          scale: { duration: 0.5 }
                        }}
                      >
                        <span className="text-2xl">✓</span>
                      </motion.div>
                      <h4 className="text-lg font-semibold text-green-400 mb-2">
                        Reset Link Sent!
                      </h4>
                      <p className="text-green-300 text-sm">
                        Check your email for password reset instructions
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Didn't receive it? Check spam folder or try again
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setActiveField("email")}
                      onBlur={() => setActiveField(null)}
                      placeholder="Enter your registered email"
                      required
                      disabled={loading || success}
                      className={`w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 transition-all duration-300 ${
                        activeField === "email" 
                          ? "border-2 bg-white/5 border-[#ffdf20]" 
                          : "border border-white/10 bg-white/5 hover:border-white/20"
                      } focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <span className="text-gray-500">@</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading || success}
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
                        Sending Reset Link...
                      </>
                    ) : success ? (
                      <>
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5 }}
                        >
                          ✓
                        </motion.span>
                        Link Sent Successfully
                      </>
                    ) : (
                      <>
                        Send Reset Link
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          animate={{ y: hoveredButton ? [0, -2, 0] : 0 }}
                          transition={{ repeat: Infinity, duration: 1 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </motion.svg>
                      </>
                    )}
                  </span>
                </motion.button>
              </form>

              {/* Additional Instructions */}
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mt-1"
                    style={{ 
                      background: 'rgba(255, 223, 32, 0.1)',
                      border: '1px solid rgba(255, 223, 32, 0.2)'
                    }}
                  >
                    <span className="text-sm text-[#ffdf20]">💡</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white mb-1">Reset Instructions</h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Check your inbox for the reset link</li>
                      <li>• Link expires in 1 hour for security</li>
                      <li>• Check spam folder if you don't see it</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Back to Sign In */}
              <div className="text-center mt-8">
                <Link
                  to="/signin"
                  className="text-sm font-medium hover:text-[#ffdf20] transition-colors inline-flex items-center gap-2"
                  style={{ color: '#ffdf20' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Sign In
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Security Footer */}
          <div className="px-8 py-6 border-t border-white/10 bg-black/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ 
                  background: 'rgba(255, 223, 32, 0.1)',
                  border: '1px solid rgba(255, 223, 32, 0.2)'
                }}
              >
                <span className="text-sm">🔐</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">Security Assurance</h4>
                <p className="text-xs text-gray-400">
                  Your email is encrypted and protected
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
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