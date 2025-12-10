import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AssessmentResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;
  const language = location.state?.language;

  if (!result) {
    navigate("/assessment");
    return null;
  }

  const { score, totalQuestions, percentage, proficiencyLevel } = result;

  const getLevelStyles = () => {
    switch (proficiencyLevel) {
      case 'Beginner':
        return {
          bg: 'from-orange-500 to-orange-600',
          icon: '🌱',
          message: 'Great start! Keep learning and practicing to improve your skills.'
        };
      case 'Intermediate':
        return {
          bg: 'from-blue-500 to-blue-600',
          icon: '🚀',
          message: 'Well done! You have a solid foundation. Keep building on it!'
        };
      case 'Advanced':
        return {
          bg: 'from-green-500 to-green-600',
          icon: '⭐',
          message: 'Excellent work! You have strong knowledge in this language!'
        };
      default:
        return {
          bg: 'from-gray-500 to-gray-600',
          icon: '📊',
          message: 'Assessment completed successfully!'
        };
    }
  };

  const levelStyles = getLevelStyles();

  const handleRetakeTest = () => {
    if (language) {
      // Navigate to the same language test - will trigger a fresh test
      navigate(`/assessment/test/${language}`, { replace: true });
      // Force a page reload to ensure fresh questions
      window.location.href = `/assessment/test/${language}`;
    } else {
      // If no language stored, go to language selection
      navigate("/assessment");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-5xl w-full">
        
        {/* Main Result Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Header Section with Gradient */}
          <div className={`bg-gradient-to-r ${levelStyles.bg} p-8 text-white`}>
            <div className="text-center">
              <div className="text-5xl mb-3">{levelStyles.icon}</div>
              <h1 className="text-4xl font-black mb-2">Assessment Complete!</h1>
              <p className="text-white/90 text-lg">{levelStyles.message}</p>
            </div>
          </div>

          {/* Content Grid */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Left Side - Score Circle */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative mb-6">
                  <svg className="transform -rotate-90 w-56 h-56">
                    <circle
                      cx="112"
                      cy="112"
                      r="100"
                      stroke="#E5E7EB"
                      strokeWidth="20"
                      fill="none"
                    />
                    <circle
                      cx="112"
                      cy="112"
                      r="100"
                      stroke="#E6FF03"
                      strokeWidth="20"
                      fill="none"
                      strokeDasharray={`${percentage * 6.28} 628`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-6xl font-black text-gray-900">{percentage}%</div>
                    <div className="text-gray-500 text-lg font-medium">{score}/{totalQuestions}</div>
                  </div>
                </div>
                
                {/* Proficiency Badge */}
                <div className={`bg-gradient-to-r ${levelStyles.bg} text-white px-8 py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-transform`}>
                  <div className="text-center">
                    <div className="text-sm font-medium opacity-90">Your Level</div>
                    <div className="text-2xl font-black">{proficiencyLevel}</div>
                  </div>
                </div>
              </div>

              {/* Right Side - Stats */}
              <div className="flex flex-col justify-center space-y-4">
                
                {/* Correct Answers */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200 transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-green-700 mb-1">Correct Answers</div>
                      <div className="text-4xl font-black text-green-600">{score}</div>
                    </div>
                    <div className="text-5xl">✓</div>
                  </div>
                </div>

                {/* Incorrect Answers */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border-2 border-red-200 transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-red-700 mb-1">Incorrect Answers</div>
                      <div className="text-4xl font-black text-red-600">{totalQuestions - score}</div>
                    </div>
                    <div className="text-5xl">✗</div>
                  </div>
                </div>

                {/* Total Questions */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200 transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-blue-700 mb-1">Total Questions</div>
                      <div className="text-4xl font-black text-blue-600">{totalQuestions}</div>
                    </div>
                    <div className="text-5xl">📝</div>
                  </div>
                </div>

              </div>

            </div>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <button
                onClick={handleRetakeTest}
                className="bg-white border-2 border-gray-300 text-gray-900 font-bold py-4 rounded-xl 
                hover:bg-gray-50 hover:border-gray-400 transition-all text-lg shadow-md flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Retake Test
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-[#E6FF03] to-[#d7ee00] text-gray-900 font-bold py-4 rounded-xl 
                hover:from-[#d7ee00] hover:to-[#c8e003] transition-all text-lg shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Go to Dashboard
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}