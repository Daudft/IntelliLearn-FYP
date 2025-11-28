import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import authService from "../../services/authService";

export default function VerifyEmail() {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = async () => {
    try {
      const response = await authService.verifyEmail({ token });
      
      setSuccess(true);
      setLoading(false);
      
      // Redirect to home/dashboard after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Verification failed. The link may be invalid or expired.";
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F2F4] px-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-10 text-center">
        
        {/* LOADING STATE */}
        {loading && (
          <>
            <div className="mb-6">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-[#E6FF03]"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Verifying Email...</h2>
            <p className="text-gray-600">Please wait while we verify your email address.</p>
          </>
        )}

        {/* SUCCESS STATE */}
        {success && (
          <>
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Email Verified!</h2>
            <p className="text-gray-600 mb-6">
              Your email has been successfully verified. You will be redirected to the home page in 3 seconds...
            </p>
            <Link
              to="/"
              className="inline-block bg-[#E6FF03] text-black font-semibold px-6 py-3 rounded-xl 
              hover:bg-[#d7ee00] transition-all shadow-md"
            >
              Go to Home Now
            </Link>
          </>
        )}

        {/* ERROR STATE */}
        {error && (
          <>
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Verification Failed</h2>
            <p className="text-red-600 mb-6">{error}</p>
            <div className="space-y-3">
              <Link
                to="/signup"
                className="block bg-[#E6FF03] text-black font-semibold px-6 py-3 rounded-xl 
                hover:bg-[#d7ee00] transition-all shadow-md"
              >
                Sign Up Again
              </Link>
              <Link
                to="/signin"
                className="block text-blue-600 font-semibold hover:underline"
              >
                Back to Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}