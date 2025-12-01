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
  const [startTime] = useState(Date.now());

  useEffect(() => {
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
    // Check if all questions are answered
    const unanswered = answers.filter(a => a === null).length;
    if (unanswered > 0) {
      if (!window.confirm(`You have ${unanswered} unanswered questions. Submit anyway?`)) {
        return;
      }
    }

    setSubmitting(true);

    try {
      // Get user from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        alert("Please sign in first");
        navigate("/signin");
        return;
      }

      const timeTaken = Math.floor((Date.now() - startTime) / 1000); // in seconds

      const result = await assessmentService.submitAssessment({
        userId: user.id,
        language,
        answers,
        timeTaken,
      });

      // Navigate to results page
      navigate("/assessment/result", { state: { result: result.result } });
      
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert(error.response?.data?.message || "Failed to submit assessment");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1F2F4]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#E6FF03] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = answers.filter(a => a !== null).length;

  return (
    <div className="min-h-screen bg-[#F1F2F4] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header with Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {language.toUpperCase()} Assessment
              </h2>
              <p className="text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Answered</div>
              <div className="text-2xl font-bold text-[#E6FF03]">
                {answeredCount}/{questions.length}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-[#E6FF03] h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
          
          {/* Question Type Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {question.questionType === 'mcq' ? 'Multiple Choice' : 'Code Output'}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              {question.topic}
            </span>
          </div>

          {/* Question Text */}
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {question.question}
          </h3>

          {/* Code Block (if code_output type) */}
          {question.code && (
            <div className="bg-gray-900 text-[#E6FF03] p-6 rounded-xl mb-6 font-mono text-sm overflow-x-auto">
              <pre className="whitespace-pre-wrap">{question.code}</pre>
            </div>
          )}

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all
                  ${answers[currentQuestion] === option
                    ? 'border-[#E6FF03] bg-[#E6FF03]/10'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${answers[currentQuestion] === option
                      ? 'border-[#E6FF03] bg-[#E6FF03]'
                      : 'border-gray-300'
                    }`}
                  >
                    {answers[currentQuestion] === option && (
                      <div className="w-3 h-3 bg-black rounded-full"></div>
                    )}
                  </div>
                  <span className="text-gray-900 font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl
            hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed
            border-2 border-gray-200"
          >
            ← Previous
          </button>

          <div className="flex gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-lg font-semibold transition-all
                  ${index === currentQuestion
                    ? 'bg-[#E6FF03] text-black'
                    : answers[index] !== null
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-xl
              hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit Test"}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-[#E6FF03] text-black font-semibold rounded-xl
              hover:bg-[#d7ee00] transition-all"
            >
              Next →
            </button>
          )}
        </div>

      </div>
    </div>
  );
}