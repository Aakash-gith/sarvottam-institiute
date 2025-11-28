import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  logIn,
  signUp,
  verify,
  index,
  forgotPass,
  events,
  maps,
  news,
  notes,
  subjectNotes,
  quiz,
  quizCreate,
  quizTake,
  quizResults,
  quizHistory,
  profile,
} from "./Routes/Routes";

import { Home, Auth, Events, Maps, News, Notes, SubjectNotes, Quiz } from "./pages/index.pages";
import Profile from "./pages/Profile";
import CreateQuiz from "./components/quiz/CreateQuiz";
import TakeQuiz from "./components/quiz/TakeQuiz";
import QuizResults from "./components/quiz/QuizResults";
import QuizHistory from "./components/quiz/QuizHistory";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1F2937',
            color: '#fff',
            border: '1px solid #374151',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        <Route path={index} element={<Home />} />
        <Route path={logIn} element={<Auth />} />
        <Route path={verify} element={<Auth />} />
        <Route path={forgotPass} element={<Auth />} />
        <Route path={signUp} element={<Auth />} />

        {/* Protected Routes - Only accessible when logged in */}
        <Route path={events} element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path={maps} element={<ProtectedRoute><Maps /></ProtectedRoute>} />
        <Route path={news} element={<ProtectedRoute><News /></ProtectedRoute>} />
        <Route path={notes} element={<ProtectedRoute><Notes /></ProtectedRoute>} />
        <Route path={subjectNotes} element={<ProtectedRoute><SubjectNotes /></ProtectedRoute>} />
        <Route path={quiz} element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
        <Route path={quizCreate} element={<ProtectedRoute><CreateQuiz /></ProtectedRoute>} />
        <Route path={quizTake} element={<ProtectedRoute><TakeQuiz /></ProtectedRoute>} />
        <Route path={quizResults} element={<ProtectedRoute><QuizResults /></ProtectedRoute>} />
        <Route path={quizHistory} element={<ProtectedRoute><QuizHistory /></ProtectedRoute>} />
        <Route path={profile} element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
