import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import assessmentService from "../../services/assessmentService";

export default function AssessmentTest() {
  const { language } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    // Reset everything when component mounts or language changes
    setCurrentQuestion(0);
    setAnswers([]);
    setLoading(true);
    setSubmitting(false);
    setStartTime(Date.now());
    fetchQuestions();
  }, [language]);

  const fetchQuestions = async () => {
    try {
      const data = await assessmentService.getQuestions(language);
      setQuestions(data.questions);
      setAnswers(new Array(data.questions.length).fill(null));
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Failed to load questions");
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
    setSubmitting(true);

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        alert("Please sign in first");
        navigate("/signin");
        return;
      }

      const timeTaken = Math.floor((Date.now() - startTime) / 1000);

      const result = await assessmentService.submitAssessment({
        userId: user.id,
        language,
        answers,
        timeTaken,
      });

      navigate("/assessment/result", { 
        state: { 
          result: result.result,
          language: language 
        } 
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
  const answeredCount = answers.filter(a => a !== null).length;

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full p-4">
        
        {/* Compact Header */}
        <div className="bg-white rounded-xl p-3 shadow-lg mb-2 flex-shrink-0">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-black text-gray-900">
                {language.toUpperCase()} Assessment
              </h2>
              <span className="text-xs text-gray-500 font-medium">
                {currentQuestion + 1}/{questions.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Progress:</span>
              <span className="text-lg font-black text-gray-900">
                {answeredCount}<span className="text-gray-400 text-sm">/{questions.length}</span>
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
          
          {/* Question Card - 5 columns */}
          <div className="lg:col-span-5 flex flex-col min-h-0">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 flex-1 flex flex-col overflow-hidden">
              
              {/* Question Header */}
              <div className="p-4 border-b border-gray-100 flex-shrink-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-xs font-bold">
                    {question.questionType === 'mcq' ? 'Multiple Choice' : 'Code Output'}
                  </span>
                  <span className="px-2.5 py-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg text-xs font-bold">
                    {question.topic}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 leading-snug">
                  {question.question}
                </h3>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {/* Code Block */}
                {question.code && (
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-[#E6FF03] p-3 rounded-lg mb-3 font-mono text-xs shadow-lg">
                    <pre className="whitespace-pre-wrap leading-relaxed">{question.code}</pre>
                  </div>
                )}

                {/* Options - Compact */}
                <div className="space-y-2">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      className={`group w-full text-left p-3 rounded-lg border-2 transition-all duration-200
                        ${answers[currentQuestion] === option
                          ? 'border-[#E6FF03] bg-gradient-to-r from-[#E6FF03]/10 to-[#E6FF03]/5 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                          ${answers[currentQuestion] === option
                            ? 'border-[#E6FF03] bg-[#E6FF03]'
                            : 'border-gray-300 group-hover:border-gray-400'
                          }`}
                        >
                          {answers[currentQuestion] === option && (
                            <svg className="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="text-gray-900 font-medium text-sm leading-snug">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Compact Sidebar - 1 column */}
          <div className="lg:col-span-1 flex flex-col min-h-0">
            <div className="bg-white rounded-xl p-3 shadow-lg border border-gray-100 flex-1 flex flex-col overflow-hidden">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex-shrink-0">Questions</h4>
              
              {/* Scrollable grid */}
              <div className="flex-1 overflow-y-auto mb-2">
                <div className="grid grid-cols-3 gap-1.5">
                  {questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      className={`aspect-square rounded-lg font-bold transition-all text-xs flex items-center justify-center
                        ${index === currentQuestion
                          ? 'bg-gradient-to-br from-[#E6FF03] to-[#d7ee00] text-gray-900 shadow-md ring-2 ring-[#E6FF03] ring-offset-1'
                          : answers[index] !== null
                          ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Legend */}
              <div className="pt-2 border-t border-gray-200 space-y-1.5 text-xs flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded bg-gradient-to-br from-[#E6FF03] to-[#d7ee00] shadow-sm"></div>
                  <span className="text-gray-600">Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded bg-gradient-to-br from-green-500 to-green-600 shadow-sm"></div>
                  <span className="text-gray-600">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded bg-gray-100"></div>
                  <span className="text-gray-600">Unanswered</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-2 flex justify-between items-center flex-shrink-0">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-5 py-2.5 bg-white text-gray-900 font-bold rounded-lg text-sm
            hover:bg-gray-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed
            border-2 border-gray-200 shadow-md flex items-center gap-2 group"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg text-sm
              hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50
              shadow-lg flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Submit Test
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-5 py-2.5 bg-gradient-to-r from-[#E6FF03] to-[#d7ee00] text-gray-900 font-bold rounded-lg text-sm
              hover:from-[#d7ee00] hover:to-[#c8e003] transition-all shadow-lg flex items-center gap-2 group"
            >
              Next
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}