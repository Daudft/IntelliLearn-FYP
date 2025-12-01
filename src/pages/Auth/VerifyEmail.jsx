import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import authService from "../../services/authService";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(5);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    verifyEmail();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (success && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (success && countdown === 0) {
      navigate("/");
    }
  }, [success, countdown, navigate]);

  const verifyEmail = async () => {
    try {
      const response = await authService.verifyEmail({ token });
      
      setSuccess(true);
      setLoading(false);
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
        "Verification failed. The link may be invalid or expired.";
      setError(errorMessage);
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
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-12 text-center"
            >
              <div className="flex justify-center mb-8">
                <motion.div
                  className="relative"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-24 h-24 rounded-full border-4 border-transparent"
                    style={{ 
                      borderTopColor: '#ffdf20',
                      borderRightColor: '#ffdf20',
                      borderBottomColor: 'rgba(255, 223, 32, 0.2)',
                      borderLeftColor: 'rgba(255, 223, 32, 0.2)'
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ffdf20] to-[#ffb020] flex items-center justify-center">
                      <span className="text-black font-bold text-lg">✓</span>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4">
                Verifying Your{" "}
                <span className="bg-gradient-to-r from-[#ffdf20] via-yellow-300 to-amber-200 bg-clip-text text-transparent">
                  Email
                </span>
              </h2>
              
              <p className="text-gray-300 mb-6">
                Please wait while we secure your account with email verification
              </p>
              
              <div className="inline-flex items-center gap-2 text-sm text-gray-400">
                <div className="flex gap-1">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-[#ffdf20]"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-[#ffdf20]"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-[#ffdf20]"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
                Securing your account...
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success State */}
        <AnimatePresence>
          {success && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-12 text-center"
            >
              {/* Success Animation */}
              <div className="flex justify-center mb-8">
                <motion.div
                  className="relative"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    className="w-32 h-32 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(255, 223, 32, 0.2), transparent)',
                      border: '4px solid rgba(255, 223, 32, 0.3)'
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                      style={{
                        background: 'linear-gradient(135deg, #ffdf20 0%, #ffb020 100%)'
                      }}
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        rotate: { duration: 2 },
                        scale: { duration: 1, repeat: Infinity }
                      }}
                    >
                      ✓
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">
                Email{" "}
                <span className="bg-gradient-to-r from-[#10b981] via-emerald-400 to-green-300 bg-clip-text text-transparent">
                  Verified!
                </span>
              </h2>
              
              <p className="text-gray-300 mb-8 max-w-md mx-auto">
                Your email has been successfully verified. Welcome to IntelliLearn!
              </p>

              {/* Countdown Timer */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-500"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-gray-300 text-sm">
                    Redirecting in <span className="text-[#ffdf20] font-bold">{countdown}s</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid md:grid-cols-2 gap-4">
                <motion.button
                  onClick={() => navigate("/dashboard")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-4 rounded-xl font-semibold text-lg relative overflow-hidden"
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
                </motion.button>

                <button
                  onClick={() => navigate("/assessment")}
                  className="py-4 rounded-xl font-semibold text-lg border-2"
                  style={{
                    borderColor: '#ffdf20',
                    color: '#ffdf20',
                    background: 'rgba(255, 223, 32, 0.1)'
                  }}
                >
                  Start Assessment
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error State */}
        <AnimatePresence>
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-12 text-center"
            >
              {/* Error Animation */}
              <div className="flex justify-center mb-8">
                <motion.div
                  className="relative"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    className="w-32 h-32 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(239, 68, 68, 0.2), transparent)',
                      border: '4px solid rgba(239, 68, 68, 0.3)'
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                      style={{
                        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        color: '#fff'
                      }}
                      animate={{
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        rotate: { duration: 0.5 },
                        scale: { duration: 1, repeat: Infinity }
                      }}
                    >
                      ✗
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">
                Verification{" "}
                <span className="bg-gradient-to-r from-[#ef4444] via-red-400 to-red-300 bg-clip-text text-transparent">
                  Failed
                </span>
              </h2>
              
              <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-red-400">{error}</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <motion.button
                  onClick={() => navigate("/signup")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 rounded-xl font-semibold text-lg relative overflow-hidden"
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
                    Sign Up Again
                    <span>📝</span>
                  </span>
                </motion.button>

                <Link
                  to="/signin"
                  className="block w-full py-4 rounded-xl font-semibold text-lg border-2"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: '#fff',
                    background: 'rgba(255, 255, 255, 0.05)'
                  }}
                >
                  Back to Sign In
                </Link>

                <Link
                  to="/"
                  className="block text-sm text-[#ffdf20] hover:text-[#ffec80] transition-colors"
                >
                  ← Return to Home
                </Link>
              </div>

              {/* Help Text */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-gray-500">
                  Need help? Contact us at{" "}
                  <a href="mailto:support@intellilearn.ai" className="text-[#ffdf20] hover:underline">
                    support@intellilearn.ai
                  </a>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
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
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      {/* Back to Home */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute top-6 left-6 z-20"
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#ffdf20] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}