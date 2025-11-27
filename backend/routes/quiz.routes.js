import express from "express";
import * as quizController from "../controllers/quiz.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Create a new quiz
router.post("/create", quizController.createQuiz);

// Get active quiz attempt
router.get("/attempt/:attemptId", quizController.getActiveQuiz);

// Submit an answer to a question
router.post("/attempt/:attemptId/answer", quizController.submitAnswer);

// Submit/complete the quiz
router.post("/attempt/:attemptId/submit", quizController.submitQuiz);

// Get quiz results
router.get("/results/:attemptId", quizController.getQuizResults);

// Send explanation email
router.post("/results/:attemptId/email", quizController.sendExplanationEmail);

// Get quiz history
router.get("/history", quizController.getQuizHistory);

// Get user stats (quiz count, streak)
router.get("/stats", quizController.getUserStats);

// Delete a quiz attempt
router.delete("/attempt/:attemptId", quizController.deleteQuizAttempt);

export default router;