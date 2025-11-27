import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  timeLimit: {
    type: Number,
    required: true // in minutes
  },
  answers: [{
    questionIndex: {
      type: Number,
      required: true
    },
    selectedAnswer: {
      type: String,
      required: true
    },
    isCorrect: {
      type: Boolean,
      required: true
    }
  }],
  totalQuestions: {
    type: Number,
    required: true
  },
  correctAnswers: {
    type: Number,
    default: 0
  },
  incorrectAnswers: {
    type: Number,
    default: 0
  },
  score: {
    type: Number,
    default: 0 // percentage score
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'expired'],
    default: 'in-progress'
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  explanationEmailSent: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to prevent duplicate attempts for same quiz
quizAttemptSchema.index({ user: 1, quiz: 1 }, { unique: true });
quizAttemptSchema.index({ user: 1, status: 1 });
quizAttemptSchema.index({ user: 1, isArchived: 1 });

// Virtual to check if quiz is expired
quizAttemptSchema.virtual('isExpired').get(function() {
  if (this.status === 'completed') return false;
  const now = new Date();
  const timeExpired = new Date(this.startTime.getTime() + (this.timeLimit * 60 * 1000));
  return now > timeExpired;
});

// Method to calculate remaining time
quizAttemptSchema.methods.getRemainingTime = function() {
  if (this.status === 'completed') return 0;
  const now = new Date();
  const endTime = new Date(this.startTime.getTime() + (this.timeLimit * 60 * 1000));
  const remaining = Math.max(0, Math.floor((endTime - now) / 1000)); // in seconds
  return remaining;
};

// Method to auto-complete expired quiz
quizAttemptSchema.methods.autoComplete = function() {
  if (this.isExpired && this.status === 'in-progress') {
    this.status = 'expired';
    this.endTime = new Date();
    this.isArchived = true;
    return this.save();
  }
};

export default mongoose.model("QuizAttempt", quizAttemptSchema);