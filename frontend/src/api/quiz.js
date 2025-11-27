import API from "./axios.js";

// Create a new quiz
export const createQuiz = async (quizData) => {
  try {
    const response = await API.post("/quiz/create", quizData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get active quiz attempt
export const getActiveQuiz = async (attemptId) => {
  try {
    const response = await API.get(`/quiz/attempt/${attemptId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Submit an answer
export const submitAnswer = async (attemptId, answerData) => {
  try {
    const response = await API.post(`/quiz/attempt/${attemptId}/answer`, answerData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Submit quiz (complete)
export const submitQuiz = async (attemptId) => {
  try {
    const response = await API.post(`/quiz/attempt/${attemptId}/submit`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get quiz results
export const getQuizResults = async (attemptId) => {
  try {
    const response = await API.get(`/quiz/results/${attemptId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Send explanation email
export const sendExplanationEmail = async (attemptId) => {
  try {
    const response = await API.post(`/quiz/results/${attemptId}/email`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get quiz history
export const getQuizHistory = async (params = {}) => {
  try {
    const response = await API.get("/quiz/history", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a quiz attempt
export const deleteQuizAttempt = async (attemptId) => {
  try {
    const response = await API.delete(`/quiz/attempt/${attemptId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get user stats (quiz count, streak)
export const getUserStats = async () => {
  try {
    const response = await API.get("/quiz/stats");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};