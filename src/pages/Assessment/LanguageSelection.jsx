import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import assessmentService from "../../services/assessmentService";

export default function LanguageSelection() {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      const data = await assessmentService.getLanguages();
      setLanguages(data.languages);
    } catch (error) {
      console.error("Error fetching languages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageSelect = (languageId) => {
    navigate(`/assessment/test/${languageId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1F2F4]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#E6FF03]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F2F4] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Choose Your Language
          </h1>
          <p className="text-xl text-gray-600">
            Select a programming language to begin your skill assessment test
          </p>
          <p className="text-md text-gray-500 mt-2">
            15 questions • 15-20 minutes • Beginner to Advanced
          </p>
        </div>

        {/* Language Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {languages.map((language) => (
            <div
              key={language.id}
              onClick={() => handleLanguageSelect(language.id)}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl 
              transition-all duration-300 cursor-pointer transform hover:-translate-y-2
              border-2 border-transparent hover:border-[#E6FF03]"
            >
              {/* Icon */}
              <div className="text-7xl mb-6 text-center">
                {language.icon}
              </div>

              {/* Language Name */}
              <h3 className="text-3xl font-bold text-gray-900 text-center mb-4">
                {language.name}
              </h3>

              {/* Description */}
              <div className="space-y-2 text-gray-600 text-sm mb-6">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-[#E6FF03] rounded-full"></span>
                  <span>15 Questions</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-[#E6FF03] rounded-full"></span>
                  <span>Mixed Difficulty</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-[#E6FF03] rounded-full"></span>
                  <span>MCQ + Code Output</span>
                </div>
              </div>

              {/* Button */}
              <button className="w-full bg-[#E6FF03] text-black font-semibold py-3 rounded-xl 
              hover:bg-[#d7ee00] transition-all">
                Start Test
              </button>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            📋 Assessment Details
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <strong>• Format:</strong> Multiple choice + Code output prediction
            </div>
            <div>
              <strong>• Duration:</strong> No time limit (recommended 15-20 min)
            </div>
            <div>
              <strong>• Topics:</strong> Variables, Loops, Functions, Arrays, OOP
            </div>
            <div>
              <strong>• Result:</strong> Instant proficiency level (Beginner/Intermediate/Advanced)
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}