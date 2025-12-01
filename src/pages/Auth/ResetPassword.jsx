import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import authService from "../../services/authService";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    passwordConfirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [activeField, setActiveField] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const getPasswordStrengthColor = () => {
    if (passwordStrength >= 75) return "#10b981"; // green
    if (passwordStrength >= 50) return "#f59e0b"; // yellow
    if (passwordStrength >= 25) return "#f97316"; // orange
    return "#ef4444"; // red
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (formData.password !== formData.passwordConfirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (passwordStrength < 50) {
      setError("Please use a stronger password");
      setLoading(false);
      return;
    }

    try {
      const response = await authService.resetPassword({
        token,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
      });

      // Show success animation
      setIsSuccess(true);
      
      // Redirect after delay
      setTimeout(() => {
        navigate("/signin", {
          state: { message: "Password reset successful! Please sign in with your new password." }
        });
      }, 2000);
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
        "Failed to reset password. The link may be expired or invalid.";
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Success Animation */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="absolute inset-0 z-20 flex items-center justify-center"
            >
              <div className="text-center">
                <motion.div
                  className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 223, 32, 0.2), transparent)',
                    border: '4px solid rgba(255, 223, 32, 0.3)'
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ duration: 1.5 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #ffdf20 0%, #ffb020 100%)'
                    }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <span className="text-3xl">✓</span>
                  </motion.div>
                </motion.div>
                <motion.h3
                  className="text-2xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Password Reset Successful!
                </motion.h3>
                <motion.p
                  className="text-gray-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Redirecting to sign in...
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden ${isSuccess ? 'opacity-20' : ''}`}>
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
                <p className="text-gray-400">
                  Create a new strong password to secure your account
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

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* New Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setActiveField("password")}
                      onBlur={() => setActiveField(null)}
                      placeholder="Enter new password"
                      required
                      minLength={6}
                      disabled={isSuccess}
                      className={`w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 transition-all duration-300 ${
                        activeField === "password" 
                          ? "border-2 bg-white/5 border-[#ffdf20]" 
                          : "border border-white/10 bg-white/5 hover:border-white/20"
                      } focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isSuccess}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#ffdf20] disabled:opacity-50"
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
                      placeholder="Confirm your new password"
                      required
                      minLength={6}
                      disabled={isSuccess}
                      className={`w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 transition-all duration-300 ${
                        activeField === "passwordConfirm" 
                          ? "border-2 bg-white/5 border-[#ffdf20]" 
                          : "border border-white/10 bg-white/5 hover:border-white/20"
                      } focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isSuccess}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#ffdf20] disabled:opacity-50"
                    >
                      {showConfirmPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                {/* Reset Password Button */}
                <motion.button
                  type="submit"
                  disabled={loading || isSuccess}
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
                        Resetting Password...
                      </>
                    ) : isSuccess ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1 }}
                        >
                          ✓
                        </motion.span>
                        Password Reset!
                      </>
                    ) : (
                      <>
                        Reset Password
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

          {/* Security Info */}
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
                <h4 className="text-sm font-medium text-white">Security Note</h4>
                <p className="text-xs text-gray-400">
                  Your password is encrypted and stored securely
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