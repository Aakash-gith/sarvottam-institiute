import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  topic: {
    type: String,
    required: true,
    trim: true
  },
  numberOfQuestions: {
    type: Number,
    required: true,
    min: 1,
    max: 50
  },
  timeLimit: {
    type: Number,
    required: true,
    min: 1, // minimum 1 minute
    max: 180 // maximum 3 hours
  },
  questions: [{
    questionText: {
      type: String,
      required: true
    },
    options: [{
      text: String,
      isCorrect: Boolean
    }],
    correctAnswer: {
      type: String,
      required: true
    },
    explanation: {
      type: String,
      required: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for better query performance
quizSchema.index({ user: 1, createdAt: -1 });
quizSchema.index({ topic: 1 });

export default mongoose.model("Quiz", quizSchema);