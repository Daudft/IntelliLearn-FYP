import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AssessmentResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;
  const language = location.state?.language?.toLowerCase();

  // Redirect safely if no result found
  useEffect(() => {
    if (!result) {
      navigate("/assessment", { replace: true });
    }
  }, [result, navigate]);

  if (!result) return null;

  const { score, totalQuestions, percentage, proficiencyLevel } = result;

  const getLevelStyles = () => {
    switch (proficiencyLevel) {
      case "Beginner":
        return {
          bg: "from-orange-500 to-orange-600",
          icon: "🌱",
          message: "Great start! Keep learning and practicing to improve your skills."
        };
      case "Intermediate":
        return {
          bg: "from-blue-500 to-blue-600",
          icon: "🚀",
          message: "Well done! You have a solid foundation. Keep building on it!"
        };
      case "Advanced":
        return {
          bg: "from-green-500 to-green-600",
          icon: "⭐",
          message: "Excellent work! You have strong knowledge in this language!"
        };
      default:
        return {
          bg: "from-gray-500 to-gray-600",
          icon: "📊",
          message: "Assessment completed successfully!"
        };
    }
  };

  const levelStyles = getLevelStyles();

  const handleRetakeTest = () => {
    if (language) {
      navigate(`/assessment/test/${language}`, { replace: true });
    } else {
      navigate("/assessment");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-5xl w-full">
        
        {/* Main Result Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className={`bg-gradient-to-r ${levelStyles.bg} p-8 text-white`}>
            <div className="text-center">
              <div className="text-5xl mb-3">{levelStyles.icon}</div>
              <h1 className="text-4xl font-black mb-2">Assessment Complete!</h1>
              <p className="text-white/90 text-lg">{levelStyles.message}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Score Circle */}
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
                    <div className="text-gray-500 text-lg font-medium">
                      {score}/{totalQuestions}
                    </div>
                  </div>
                </div>

                {/* Proficiency Badge */}
                <div className={`bg-gradient-to-r ${levelStyles.bg} text-white px-8 py-4 rounded-2xl shadow-lg`}>
                  <div className="text-center">
                    <div className="text-sm font-medium opacity-90">Your Level</div>
                    <div className="text-2xl font-black">{proficiencyLevel}</div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-col justify-center space-y-4">
                
                <div className="bg-green-100 rounded-2xl p-6 border-green-200 border-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-green-700">Correct Answers</div>
                      <div className="text-4xl font-black text-green-600">{score}</div>
                    </div>
                    <div className="text-5xl">✓</div>
                  </div>
                </div>

                <div className="bg-red-100 rounded-2xl p-6 border-red-200 border-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-red-700">Incorrect Answers</div>
                      <div className="text-4xl font-black text-red-600">{totalQuestions - score}</div>
                    </div>
                    <div className="text-5xl">✗</div>
                  </div>
                </div>

                <div className="bg-blue-100 rounded-2xl p-6 border-blue-200 border-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-blue-700">Total Questions</div>
                      <div className="text-4xl font-black text-blue-600">{totalQuestions}</div>
                    </div>
                    <div className="text-5xl">📝</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Buttons */}
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <button
                onClick={handleRetakeTest}
                className="bg-white border-2 border-gray-300 text-gray-900 font-bold py-4 rounded-xl hover:bg-gray-50 transition-all"
              >
                Retake Test
              </button>

              <button
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-[#E6FF03] to-[#d7ee00] text-gray-900 font-bold py-4 rounded-xl hover:from-[#d7ee00] hover:to-[#c8e003] transition-all"
              >
                Go to Dashboard
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
