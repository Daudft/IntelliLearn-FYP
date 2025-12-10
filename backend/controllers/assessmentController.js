const Assessment = require('../models/Assessment');
const UserAssessment = require('../models/UserAssessment');
const User = require('../models/User');

// GET AVAILABLE LANGUAGES
exports.getLanguages = async (req, res) => {
  try {
    const languages = [
      { id: 'python', name: 'Python', icon: '🐍' },
      { id: 'java', name: 'Java', icon: '☕' },
      { id: 'c', name: 'C', icon: '💻' },
    ];
    
    res.status(200).json({ languages });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET TEST QUESTIONS FOR SELECTED LANGUAGE
exports.getQuestions = async (req, res) => {
  try {
    const { language } = req.params;
    
    // Validate language
    if (!['python', 'java', 'c'].includes(language)) {
      return res.status(400).json({ message: 'Invalid language' });
    }
    
    // Get 15 questions for the language
    const questions = await Assessment.find({ language })
      .sort({ questionNumber: 1 })
      .limit(15)
      .select('-correctAnswer -explanation'); // Don't send correct answers to frontend
    
    if (questions.length === 0) {
      return res.status(404).json({ message: 'No questions found for this language' });
    }
    
    res.status(200).json({ 
      questions,
      totalQuestions: questions.length 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// SUBMIT TEST AND CALCULATE RESULTS
exports.submitAssessment = async (req, res) => {
  try {
    const { userId, language, answers, timeTaken } = req.body;
    
    // Validation
    if (!userId || !language || !answers) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // ✅ CHANGED: Get the latest attempt number instead of blocking retakes
    const lastAttempt = await UserAssessment.findOne({ userId, language })
      .sort({ attemptNumber: -1 }); // Get the most recent attempt
    
    const attemptNumber = lastAttempt ? lastAttempt.attemptNumber + 1 : 1;
    
    // Get all questions with correct answers
    const questions = await Assessment.find({ language })
      .sort({ questionNumber: 1 })
      .limit(15);
    
    if (questions.length === 0) {
      return res.status(404).json({ message: 'No questions found for this language' });
    }
    
    // Grade the test
    let score = 0;
    const gradedAnswers = [];
    const topicBreakdown = new Map();
    
    questions.forEach((question, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) score++;
      
      gradedAnswers.push({
        questionId: question._id,
        userAnswer: userAnswer,
        isCorrect: isCorrect,
      });
      
      // Track topic performance
      const topic = question.topic;
      if (!topicBreakdown.has(topic)) {
        topicBreakdown.set(topic, { correct: 0, total: 0 });
      }
      const topicStats = topicBreakdown.get(topic);
      topicStats.total++;
      if (isCorrect) topicStats.correct++;
    });
    
    // Calculate percentage and proficiency level
    const totalQuestions = questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    let proficiencyLevel;
    if (percentage <= 40) {
      proficiencyLevel = 'Beginner';
    } else if (percentage <= 70) {
      proficiencyLevel = 'Intermediate';
    } else {
      proficiencyLevel = 'Advanced';
    }
    
    // ✅ CHANGED: Create new assessment record with attempt number
    const userAssessment = await UserAssessment.create({
      userId,
      language,
      attemptNumber, // Store which attempt this is
      answers: gradedAnswers,
      score,
      totalQuestions,
      percentage,
      proficiencyLevel,
      topicBreakdown: Object.fromEntries(topicBreakdown),
      timeTaken: timeTaken || null,
    });
    
    // ✅ CHANGED: Update user with latest proficiency level and attempt date
    await User.findByIdAndUpdate(userId, {
      hasCompletedAssessment: true,
      assessmentLanguage: language,
      proficiencyLevel: proficiencyLevel,
      lastAssessmentDate: new Date(),
    });
    
    res.status(201).json({
      message: 'Assessment completed successfully',
      result: {
        score,
        totalQuestions,
        percentage,
        proficiencyLevel,
        topicBreakdown: Object.fromEntries(topicBreakdown),
        attemptNumber, // Return attempt number to frontend
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ UPDATED: GET USER'S LATEST ASSESSMENT RESULT
exports.getUserResult = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // ✅ CHANGED: Get the most recent assessment by sorting by completedAt descending
    const result = await UserAssessment.findOne({ userId })
      .sort({ completedAt: -1 }) // Get the latest attempt
      .populate('userId', 'name email')
      .populate('answers.questionId', 'question topic questionType');
    
    if (!result) {
      return res.status(404).json({ message: 'No assessment found for this user' });
    }
    
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ NEW: GET ALL USER'S ASSESSMENT ATTEMPTS
exports.getUserAllAttempts = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const attempts = await UserAssessment.find({ userId })
      .sort({ completedAt: -1 }) // Most recent first
      .populate('userId', 'name email')
      .populate('answers.questionId', 'question topic questionType');
    
    if (!attempts.length) {
      return res.status(404).json({ message: 'No assessments found for this user' });
    }
    
    res.status(200).json({ 
      attempts,
      totalAttempts: attempts.length 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// CHECK IF USER HAS COMPLETED ASSESSMENT
exports.checkAssessmentStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({
      hasCompletedAssessment: user.hasCompletedAssessment,
      assessmentLanguage: user.assessmentLanguage,
      proficiencyLevel: user.proficiencyLevel,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};