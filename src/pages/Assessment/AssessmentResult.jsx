import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AssessmentResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  // If no result, redirect to assessment
  if (!result) {
    navigate("/assessment");
    return null;
  }

  const { score, totalQuestions, percentage, proficiencyLevel, topicBreakdown } = result;

  // Level styling
  const getLevelStyles = () => {
    switch (proficiencyLevel) {
      case 'Beginner':
        return {
          bg: 'bg-orange-100',
          text: 'text-orange-800',
          border: 'border-orange-300',
          icon: '🌱'
        };
      case 'Intermediate':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          border: 'border-blue-300',
          icon: '🚀'
        };
      case 'Advanced':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-300',
          icon: '⭐'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-300',
          icon: '📊'
        };
    }
  };

  const levelStyles = getLevelStyles();

  // Motivational messages
  const getMessage = () => {
    if (percentage <= 40) {
      return "Great start! Keep learning and practicing to improve your skills.";
    } else if (percentage <= 70) {
      return "Well done! You have a solid foundation. Keep building on it!";
    } else {
      return "Excellent work! You have strong knowledge in this language!";
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F2F4] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header - Celebration */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            Assessment Complete!
          </h1>
          <p className="text-xl text-gray-600">
            {getMessage()}
          </p>
        </div>

        {/* Main Result Card */}
        <div className="bg-white rounded-3xl p-10 shadow-xl mb-8">
          
          {/* Score Circle */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#E5E7EB"
                  strokeWidth="16"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#E6FF03"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={`${percentage * 5.53} 553`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-5xl font-bold text-gray-900">{percentage}%</div>
                <div className="text-gray-600">{score}/{totalQuestions}</div>
              </div>
            </div>
          </div>

          {/* Proficiency Level Badge */}
          <div className="flex justify-center mb-8">
            <div className={`${levelStyles.bg} ${levelStyles.text} px-8 py-4 rounded-2xl border-2 ${levelStyles.border}`}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{levelStyles.icon}</span>
                <div>
                  <div className="text-sm font-medium">Your Level</div>
                  <div className="text-2xl font-bold">{proficiencyLevel}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 rounded-xl p-6 text-center border-2 border-green-200">
              <div className="text-4xl font-bold text-green-600">{score}</div>
              <div className="text-gray-700 font-medium">Correct Answers</div>
            </div>
            <div className="bg-red-50 rounded-xl p-6 text-center border-2 border-red-200">
              <div className="text-4xl font-bold text-red-600">{totalQuestions - score}</div>
              <div className="text-gray-700 font-medium">Incorrect Answers</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 text-center border-2 border-blue-200">
              <div className="text-4xl font-bold text-blue-600">{totalQuestions}</div>
              <div className="text-gray-700 font-medium">Total Questions</div>
            </div>
          </div>

        </div>

        {/* Topic Breakdown */}
        {topicBreakdown && Object.keys(topicBreakdown).length > 0 && (
          <div className="bg-white rounded-3xl p-8 shadow-xl mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              📊 Performance by Topic
            </h3>
            <div className="space-y-4">
              {Object.entries(topicBreakdown).map(([topic, stats]) => {
                const topicPercentage = Math.round((stats.correct / stats.total) * 100);
                return (
                  <div key={topic}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">{topic}</span>
                      <span className="text-gray-600">
                        {stats.correct}/{stats.total} ({topicPercentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-[#E6FF03] h-3 rounded-full transition-all"
                        style={{ width: `${topicPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-[#E6FF03] to-[#d7ee00] rounded-3xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            🚀 What's Next?
          </h3>
          <p className="text-gray-800 mb-6">
            Based on your {proficiencyLevel} level, we'll create a personalized learning path just for you!
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-black text-white font-semibold py-4 rounded-xl 
            hover:bg-gray-800 transition-all text-lg"
          >
            Continue to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}