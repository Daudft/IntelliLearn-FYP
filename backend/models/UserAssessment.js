const mongoose = require('mongoose');

const userAssessmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // Each user can only have one preliminary assessment
  },
  language: {
    type: String,
    required: true,
    enum: ['python', 'java', 'c'],
  },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assessment',
      },
      userAnswer: String,
      isCorrect: Boolean,
    },
  ],
  score: {
    type: Number,
    required: true, // Total correct answers
  },
  totalQuestions: {
    type: Number,
    required: true,
    default: 15,
  },
  percentage: {
    type: Number,
    required: true, // (score / totalQuestions) * 100
  },
  proficiencyLevel: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  },
  topicBreakdown: {
    type: Map,
    of: {
      correct: Number,
      total: Number,
    },
  },
  completedAt: {
    type: Date,
    default: Date.now,
  },
  timeTaken: {
    type: Number, // Time in seconds
  },
});

module.exports = mongoose.model('UserAssessment', userAssessmentSchema);