import React from "react";
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

import conf from "./conf/conf";

// Lazy load components
const Home = React.lazy(() => import("./pages/Home"));
const Auth = React.lazy(() => import("./pages/Auth"));
const Events = React.lazy(() => import("./pages/Events"));
const Notes = React.lazy(() => import("./pages/Notes"));
const SubjectNotes = React.lazy(() => import("./pages/SubjectNotes"));
const Quiz = React.lazy(() => import("./pages/Quiz"));
const Profile = React.lazy(() => import("./pages/Profile"));
const CreateQuiz = React.lazy(() => import("./components/quiz/CreateQuiz"));
const TakeQuiz = React.lazy(() => import("./components/quiz/TakeQuiz"));
const QuizResults = React.lazy(() => import("./components/quiz/QuizResults"));
const QuizHistory = React.lazy(() => import("./components/quiz/QuizHistory"));

import ProtectedRoute from "./components/ProtectedRoute";
import { Skeleton } from "./components/Skeleton"; // Use our new Skeleton component

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={conf.toast}
      />
      <React.Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <Routes>
          <Route path={index} element={<Home />} />
          <Route path={logIn} element={<Auth />} />
          <Route path={verify} element={<Auth />} />
          <Route path={forgotPass} element={<Auth />} />
          <Route path={signUp} element={<Auth />} />

          {/* Protected Routes - Only accessible when logged in */}
          <Route path={events} element={<ProtectedRoute><Events /></ProtectedRoute>} />
          <Route path={notes} element={<ProtectedRoute><Notes /></ProtectedRoute>} />
          <Route path={subjectNotes} element={<ProtectedRoute><SubjectNotes /></ProtectedRoute>} />
          <Route path={quiz} element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path={quizCreate} element={<ProtectedRoute><CreateQuiz /></ProtectedRoute>} />
          <Route path={quizTake} element={<ProtectedRoute><TakeQuiz /></ProtectedRoute>} />
          <Route path={quizResults} element={<ProtectedRoute><QuizResults /></ProtectedRoute>} />
          <Route path={quizHistory} element={<ProtectedRoute><QuizHistory /></ProtectedRoute>} />
          <Route path={profile} element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </React.Suspense>
    </>
  );
}

export default App;
