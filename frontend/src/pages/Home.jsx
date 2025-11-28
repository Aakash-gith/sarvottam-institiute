import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Dashboard, Calendar, CreateEvent } from "../components/index.components";
import { BookOpen, Brain, Zap, ArrowRight, CheckCircle } from "lucide-react";

function Home() {
  const { status } = useSelector((state) => state.auth);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshEvents, setRefreshEvents] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
    setRefreshEvents((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          {status ? (
            <>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome back, <span className="text-blue-300">{userData?.name?.split(" ")[0]}</span>! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                Continue your learning journey in Grade {userData?.class === 9 ? "9" : "10"}
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Learn, Practice, Excel in <span className="text-blue-300">Grades 9 & 10</span>
              </h1>
              <p className="text-blue-100 text-lg mb-8">
                Focused study materials, practice questions, and resources for Maths and Science.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={() => navigate("/auth/signup")}
                  className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
                >
                  Get Started
                </button>
                <button
                  onClick={() => navigate("/auth/login")}
                  className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition"
                >
                  Login
                </button>
              </div>
              <p className="text-blue-100 text-sm mt-6">Join thousands of students excelling in Maths and Science</p>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex-1">
        {status ? (
          <>
            {/* For Logged In Users - Dashboard and Calendar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <Dashboard />
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-y-auto max-h-96">
                <Calendar refresh={refreshEvents} />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* For Non-Logged In Users */}
            {/* Explore Subjects Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Explore Subjects</h2>
              <p className="text-gray-600 mb-8">
                Focused learning resources for Mathematics and Science for grades 9 and 10
              </p>
              <div className="inline-block bg-blue-50 rounded-lg p-8 w-full max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col items-center p-6 bg-white rounded-lg border border-blue-200">
                    <div className="text-4xl mb-3">🔢</div>
                    <h3 className="text-lg font-semibold text-gray-900">Mathematics</h3>
                    <p className="text-gray-600 text-sm mt-2">Algebra, Geometry, Statistics and more</p>
                  </div>
                  <div className="flex flex-col items-center p-6 bg-white rounded-lg border border-blue-200">
                    <div className="text-4xl mb-3">🧪</div>
                    <h3 className="text-lg font-semibold text-gray-900">Science</h3>
                    <p className="text-gray-600 text-sm mt-2">Physics, Chemistry, Biology and more</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Grade Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Grade 9 Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition">
                <div className="text-5xl mb-4">📖</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Grade 9</h3>
                <p className="text-gray-600 mb-6">
                  Access comprehensive Maths and Science study materials, practice questions, and resources for 9th grade curriculum.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle size={18} className="text-blue-600" />
                    <span>Complete study materials</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle size={18} className="text-blue-600" />
                    <span>Practice questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle size={18} className="text-blue-600" />
                    <span>Progress tracking</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/auth/signup")}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Explore Grade 9
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Grade 10 Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition">
                <div className="text-5xl mb-4">🎓</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Grade 10</h3>
                <p className="text-gray-600 mb-6">
                  Prepare for board exams with our extensive Maths and Science resources for 10th grade students.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle size={18} className="text-blue-600" />
                    <span>Board exam preparation</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle size={18} className="text-blue-600" />
                    <span>Mock tests</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle size={18} className="text-blue-600" />
                    <span>Expert solutions</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/auth/signup")}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Explore Grade 10
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-center text-white">
              <h2 className="text-3xl font-bold mb-3">Ready to Start Learning?</h2>
              <p className="mb-6 text-blue-100">Join thousands of students already using Sarvottam Institute</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={() => navigate("/auth/signup")}
                  className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
                >
                  Sign Up Now
                </button>
                <button
                  onClick={() => navigate("/auth/login")}
                  className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition"
                >
                  Login
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <CreateEvent open={isModalOpen} onClose={handleClose} />
    </div>
  );
}

export default Home;