import React from "react";
import { classData } from "../classData";
import { Link } from "react-router-dom";
import { ChevronRight, BookOpen, Brain, FileText } from "lucide-react";

function Dashboard() {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const currentClass = userData.class;

  const subjects = classData[currentClass]?.subjects || [];

  const quickLinks = [
    { name: "Study Notes", path: "/notes", icon: BookOpen, color: "bg-blue-50 text-blue-600" },
    { name: "Practice Quiz", path: "/quiz", icon: Brain, color: "bg-purple-50 text-purple-600" },
    { name: "PYQ Papers", path: "/pyq", icon: FileText, color: "bg-orange-50 text-orange-600" },
  ];

  return (
    <div className="w-full">
      {/* Quick Links */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Access</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                to={link.path}
                key={link.name}
                className={`${link.color} rounded-lg p-6 hover:shadow-md transition cursor-pointer`}
              >
                <Icon size={24} className="mb-2" />
                <h3 className="font-semibold text-sm">{link.name}</h3>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Your Subjects */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Your Subjects</h2>
        <p className="text-gray-600 text-sm">Continue learning and master your concepts</p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
        {subjects.map((subject) => (
          <Link
            to={`/notes/${subject.id}`}
            key={subject.id}
            className="group relative rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-300 transform hover:scale-105 h-48 bg-gradient-to-br hover:from-blue-50 hover:to-blue-100"
          >
            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-6 bg-white group-hover:bg-opacity-95 transition">
              {/* Top Section - Icon */}
              <div className="flex justify-between items-start">
                <div className="text-5xl">{subject.icon}</div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors transform group-hover:translate-x-1 duration-300" />
              </div>

              {/* Bottom Section - Title & Description */}
              <div>
                <h3 className="text-gray-900 font-bold text-xl mb-1">{subject.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{subject.description}</p>
                <div className="mt-4 flex items-center text-blue-600 text-sm group-hover:text-blue-700 transition-colors font-medium">
                  <span>Start Learning</span>
                  <ChevronRight size={16} className="ml-1" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;