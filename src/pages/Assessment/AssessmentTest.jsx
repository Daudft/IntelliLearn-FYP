import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import assessmentService from "../../services/assessmentService";

export default function AssessmentTest() {
  const { language } = useParams();
  const navigate = useNavigate();

  const normalizedLanguage = language.toLowerCase();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    // Reset all states on retake or language change
    setQuestions([]);
    setAnswers([]);
    setCurrentQuestion(0);
    setSubmitting(false);
    setStartTime(Date.now());
    setLoading(true);

    fetchQuestions();
  }, [normalizedLanguage]);

  const fetchQuestions = async () => {
    try {
      const data = await assessmentService.getQuestions(normalizedLanguage);
      setQuestions(data.questions);
      setAnswers(new Array(data.questions.length).fill(null));
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Failed to load questions. Try again.");
      navigate("/assessment");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (answers.some(a => a === null)) {
      const confirm = window.confirm(
        "Some questions are unanswered. Submit anyway?"
      );
      if (!confirm) return;
    }

    if (answers.length !== questions.length) {
      alert("Error: Answers mismatch.");
      return;
    }

    setSubmitting(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("Please sign in first");
        navigate("/signin");
        return;
      }

      const userId = user.id || user._id;

      const timeTaken = Math.floor((Date.now() - startTime) / 1000);

      const result = await assessmentService.submitAssessment({
        userId,
        language: normalizedLanguage,
        answers,
        timeTaken,
      });

      navigate("/assessment/result", {
        state: {
          result: result.result,
          language: normalizedLanguage,
        },
      });

    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert(error.response?.data?.message || "Failed to submit assessment");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 mx-auto"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-[#E6FF03] absolute top-0 left-1/2 -translate-x-1/2"></div>
          </div>
          <p className="text-gray-600 mt-4 font-medium">Loading questions...</p>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = answers.filter((a) => a !== null).length;

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full p-4">
        
        {/* Header */}
        <div className="bg-white rounded-xl p-3 shadow-lg mb-2 flex-shrink-0">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-black text-gray-900">
                {normalizedLanguage.toUpperCase()} Assessment
              </h2>
              <span className="text-xs text-gray-500 font-medium">
                {currentQuestion + 1}/{questions.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Progress:</span>
              <span className="text-lg font-black text-gray-900">
                {answeredCount}
                <span className="text-gray-400 text-sm">/{questions.length}</span>
              </span>
            </div>
          </div>

          <div className="relative w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#E6FF03] to-[#d7ee00] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-6 gap-3 min-h-0">

          {/* Question Column */}
          <div className="lg:col-span-5 flex flex-col min-h-0">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 flex-1 flex flex-col overflow-hidden">
              
              {/* Question Header */}
              <div className="p-4 border-b border-gray-100 flex-shrink-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold">
                    {question.questionType === "mcq"
                      ? "Multiple Choice"
                      : "Code Output"}
                  </span>
                  <span className="px-2.5 py-1 bg-purple-600 text-white rounded-lg text-xs font-bold">
                    {question.topic}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 leading-snug">
                  {question.question}
                </h3>
              </div>

              {/* Code Block */}
              <div className="flex-1 overflow-y-auto p-4">

                {question.code && (
                  <div className="bg-gray-900 text-[#E6FF03] p-3 rounded-lg mb-3 font-mono text-xs shadow-lg">
                    <pre className="whitespace-pre-wrap">
                      {question.code}
                    </pre>
                  </div>
                )}

                {/* Options */}
                <div className="space-y-2">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      className={`group w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ${
                        answers[currentQuestion] === option
                          ? "border-[#E6FF03] bg-[#E6FF03]/10 shadow-sm"
                          : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            answers[currentQuestion] === option
                              ? "border-[#E6FF03] bg-[#E6FF03]"
                              : "border-gray-300"
                          }`}
                        >
                          {answers[currentQuestion] === option && (
                            <svg
                              className="w-3 h-3 text-gray-900"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="text-gray-900 font-medium text-sm">
                          {option}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 flex flex-col min-h-0">
            <div className="bg-white rounded-xl p-3 shadow-lg border border-gray-100 flex-1 flex flex-col">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Questions
              </h4>

              <div className="flex-1 overflow-y-auto mb-2">
                <div className="grid grid-cols-3 gap-1.5">
                  {questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      className={`aspect-square rounded-lg font-bold text-xs flex items-center justify-center transition-all ${
                        index === currentQuestion
                          ? "bg-[#E6FF03] text-gray-900 shadow-md ring-2 ring-[#E6FF03]"
                          : answers[index] !== null
                          ? "bg-green-600 text-white shadow-sm"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-2 flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-5 py-2.5 bg-white border-2 border-gray-200 rounded-lg font-bold shadow-md disabled:opacity-40"
          >
            Previous
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2.5 bg-green-700 text-white rounded-lg font-bold shadow-lg disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Test"}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-[#E6FF03] rounded-lg font-bold shadow-lg"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
