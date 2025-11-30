const express = require('express');
const router = express.Router();
const {
  getLanguages,
  getQuestions,
  submitAssessment,
  getUserResult,
  checkAssessmentStatus,
} = require('../controllers/assessmentController');

// GET available languages
router.get('/languages', getLanguages);

// GET test questions for selected language
router.get('/questions/:language', getQuestions);

// POST submit assessment and get results
router.post('/submit', submitAssessment);

// GET user's assessment result
router.get('/result/:userId', getUserResult);

// GET check if user completed assessment
router.get('/status/:userId', checkAssessmentStatus);

module.exports = router;