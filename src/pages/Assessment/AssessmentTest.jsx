import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const languageColors = {
    python: "#3776AB",
    javascript: "#F7DF1E",
    java: "#007396",
    cpp: "#00599C",
    react: "#61DAFB",
    node: "#339933"
  };

  const timerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [language]);

  useEffect(() => {
    // Timer
    timerRef.current = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [startTime]);

  useEffect(() => {
    // Reset states when question changes
    setSelectedOption(answers[currentQuestion]);
    setIsAnswered(answers[currentQuestion] !== null);
    setShowExplanation(false);
  }, [currentQuestion, answers]);

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

  const handleAnswerSelect = (answer, index) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
    setSelectedOption(answer);
    setIsAnswered(true);
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
    const unanswered = answers.filter(a => a === null).length;
    if (unanswered > 0) {
      const confirmSubmit = window.confirm(
        `You have ${unanswered} unanswered questions. Submit anyway?`
      );
      if (!confirmSubmit) return;
    }

    setSubmitting(true);
    clearInterval(timerRef.current);

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
          language: language,
          timeTaken: timeTaken
        }
      });
      
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert(error.response?.data?.message || "Failed to submit assessment");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(10, 10, 10, 0.9) 0%, rgba(0, 0, 0, 1) 100%)"
        }}
      >
        <div className="text-center">
          <motion.div
            className="w-20 h-20 rounded-full border-4 border-transparent mx-auto mb-6"
            style={{ 
              borderTopColor: '#ffdf20',
              borderRightColor: '#ffdf20'
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-400">Loading assessment questions...</p>
          <p className="text-sm text-gray-500 mt-2">Preparing your personalized AI assessment</p>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = answers.filter(a => a !== null).length;
  const languageColor = languageColors[language] || '#ffdf20';

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{
        background: "radial-gradient(circle at 50% 50%, rgba(10, 10, 10, 0.95) 0%, rgba(0, 0, 0, 1) 100%)"
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, ${languageColor}20, transparent 70%)`
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ 
                    background: 'linear-gradient(135deg, #ffdf20 0%, #ffb020 100%)' 
                  }}
                >
                  <span className="text-black font-bold text-lg">AI</span>
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-white">IntelliLearn</h1>
                  <p className="text-xs text-gray-400 tracking-widest">AI Assessment</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="px-4 py-2 rounded-full text-sm font-semibold capitalize"
                  style={{ 
                    background: `${languageColor}20`,
                    color: languageColor,
                    border: `1px solid ${languageColor}40`
                  }}
                >
                  {language} Assessment
                </span>
                <span className="px-3 py-1 rounded-full text-xs"
                  style={{ 
                    background: 'rgba(255, 223, 32, 0.1)',
                    color: '#ffdf20',
                    border: '1px solid rgba(255, 223, 32, 0.2)'
                  }}
                >
                  Skill Level: Intermediate
                </span>
              </div>
            </div>

            {/* Timer */}
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">Time Elapsed</div>
              <div className="text-3xl font-bold text-white font-mono">
                {formatTime(timeElapsed)}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-gray-300">
                {answeredCount} answered • {questions.length - answeredCount} remaining
              </span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #ffdf20, #ffb020)' }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Question */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8">
              {/* Question Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      background: question.questionType === 'mcq' ? '#3B82F620' : '#8B5CF620',
                      color: question.questionType === 'mcq' ? '#60A5FA' : '#A78BFA'
                    }}
                  >
                    {question.questionType === 'mcq' ? 'Multiple Choice' : 'Code Analysis'}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      background: 'rgba(255, 223, 32, 0.1)',
                      color: '#ffdf20',
                      border: '1px solid rgba(255, 223, 32, 0.2)'
                    }}
                  >
                    {question.topic}
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  Difficulty: <span className="text-[#ffdf20]">{question.difficulty || 'Medium'}</span>
                </div>
              </div>

              {/* Question Text */}
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-6 leading-relaxed">
                  {question.question}
                </h3>

                {/* Code Block */}
                {question.code && (
                  <div className="mb-8 rounded-2xl overflow-hidden border border-white/10">
                    <div className="px-4 py-3 border-b border-white/10 bg-black/50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-sm text-gray-400">code.{language}</div>
                    </div>
                    <div className="p-6 bg-black/70">
                      <pre className="font-mono text-sm text-[#ffdf20] leading-relaxed whitespace-pre-wrap">
                        {question.code}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Options */}
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerSelect(option, index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                        selectedOption === option
                          ? 'border-2 shadow-lg'
                          : 'border border-white/10 hover:border-white/20'
                      }`}
                      style={{
                        background: selectedOption === option 
                          ? 'linear-gradient(135deg, rgba(255, 223, 32, 0.1), rgba(255, 176, 32, 0.05))'
                          : 'rgba(255, 255, 255, 0.05)',
                        borderColor: selectedOption === option ? '#ffdf20' : ''
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                          selectedOption === option
                            ? 'bg-[#ffdf20] text-black'
                            : 'bg-white/10 text-gray-400'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className={`text-lg ${selectedOption === option ? 'text-white' : 'text-gray-300'}`}>
                          {option}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Explanation (Optional) */}
                {question.explanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: showExplanation ? 1 : 0,
                      height: showExplanation ? 'auto' : 0
                    }}
                    className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-blue-400">💡</span>
                      <h4 className="text-sm font-semibold text-blue-400">Explanation</h4>
                    </div>
                    <p className="text-sm text-gray-300">{question.explanation}</p>
                  </motion.div>
                )}

                {/* Show Explanation Button */}
                {question.explanation && !showExplanation && isAnswered && (
                  <button
                    onClick={() => setShowExplanation(true)}
                    className="mt-4 text-sm text-[#ffdf20] hover:text-[#ffec80] transition-colors flex items-center gap-2"
                  >
                    <span>💡</span>
                    Show Explanation
                  </button>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Navigation & Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Question Navigator */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Questions</h3>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all ${
                      index === currentQuestion
                        ? 'bg-gradient-to-br from-[#ffdf20] to-[#ffb020] text-black shadow-lg'
                        : answers[index] !== null
                        ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white'
                        : 'bg-white/10 text-gray-400 hover:bg-white/20'
                    }`}
                  >
                    {index + 1}
                  </motion.button>
                ))}
              </div>
              
              <div className="flex items-center justify-between mt-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ffdf20]"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/10"></div>
                  <span>Unanswered</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Assessment Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #ffdf20, #ffb020)' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-xl bg-white/5">
                    <div className="text-2xl font-bold text-white">{answeredCount}</div>
                    <div className="text-xs text-gray-400">Answered</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/5">
                    <div className="text-2xl font-bold text-white">{questions.length - answeredCount}</div>
                    <div className="text-xs text-gray-400">Remaining</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff'
                  }}
                >
                  ← Previous
                </motion.button>
                
                {currentQuestion === questions.length - 1 ? (
                  <motion.button
                    onClick={handleSubmit}
                    disabled={submitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl font-semibold relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: '#fff'
                    }}
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.div
                          className="w-4 h-4 rounded-full border-2 border-transparent border-t-white"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Submitting...
                      </span>
                    ) : (
                      "Submit Assessment"
                    )}
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleNext}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl font-semibold relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #ffdf20 0%, #ffb020 100%)',
                      color: '#000'
                    }}
                  >
                    Next →
                  </motion.button>
                )}
              </div>

              {/* Submit Button */}
              {currentQuestion !== questions.length - 1 && (
                <button
                  onClick={handleSubmit}
                  className="w-full p-3 rounded-xl font-medium text-sm"
                  style={{
                    background: 'rgba(255, 223, 32, 0.1)',
                    border: '1px solid rgba(255, 223, 32, 0.2)',
                    color: '#ffdf20'
                  }}
                >
                  Submit Early
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Floating Particles */}
        <div className="fixed inset-0 pointer-events-none">
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
      </div>
    </div>
  );
}