import React, { useMemo, useState, useEffect } from "react";
import {
  classData,
  fetchSubjectProgress,
  initClassProgress,
} from "../../classData";
import { useNavigate } from "react-router-dom";
import { BookOpen, Video, ChevronRight, TrendingUp } from "lucide-react";

function Subjects() {
  const [subjectsProgress, setSubjectsProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const studentId = useMemo(() => {
    if (typeof window !== "undefined") {
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        return userData.id;
      } catch (error) {
        console.error("Error reading localStorage:", error);
        return null;
      }
    }
    return null;
  }, []);

  const currentClass = useMemo(() => {
    if (typeof window !== "undefined") {
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        return userData.class || 9;
      } catch (error) {
        console.error("Error reading localStorage:", error);
        return 9;
      }
    }
    return 9;
  }, []);

  useEffect(() => {
    const loadSubjectProgress = async () => {
      if (!studentId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await fetchSubjectProgress(currentClass);
        setSubjectsProgress(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching progress:", error);
        setSubjectsProgress([]);
      }
      setLoading(false);
    };

    loadSubjectProgress();
  }, [studentId, currentClass]);

  useEffect(() => {
    const semSubjects = classData[currentClass]?.subjects || [];
    initClassProgress(currentClass, semSubjects);
  }, [currentClass]);

  const subjects = classData[currentClass]?.subjects || [];

  const subjectsWithProgress = subjects.map((subject) => {
    const progressData = subjectsProgress.find(
      (p) => p.subjectId === subject.id
    );
    return {
      ...subject,
      lectures: progressData?.videosCompleted?.length || 0,
      notes: progressData?.notesCompleted?.length || 0,
      completion: progressData?.completion ?? 0,
    };
  });

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-8 flex items-center justify-center min-h-[300px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-500 text-sm">Loading subjects...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 md:p-8">
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900">
          Your Subjects
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          Class {currentClass === 9 ? "IX" : "X"} - Track your learning progress
        </p>
      </div>

      <div className="space-y-4">
        {subjectsWithProgress.length > 0 ? (
          subjectsWithProgress.map((subject) => (
            <div
              key={subject.id}
              onClick={() => navigate(`/notes/${subject.id}`)}
              className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-blue-400 hover:shadow-lg hover:bg-blue-50/30 transition-all duration-300 cursor-pointer group transform hover:scale-[1.02]"
            >
              <div className="flex items-start gap-4 mb-4">
                {/* Subject Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-2xl shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  {subject.icon}
                </div>
                
                {/* Subject Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-gray-900 font-bold text-lg group-hover:text-blue-600 transition-colors">
                      {subject.name}
                    </h4>
                    <ChevronRight 
                      size={20} 
                      className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" 
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {subject.description}
                  </p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex gap-4 mb-4 ml-[72px]">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 rounded-lg">
                  <Video size={14} className="text-blue-600" />
                  <span className="text-xs font-medium text-blue-700">
                    {subject.lectures} Lecture{subject.lectures !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 rounded-lg">
                  <BookOpen size={14} className="text-amber-600" />
                  <span className="text-xs font-medium text-amber-700">
                    {subject.notes} Note{subject.notes !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="ml-[72px]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium">Progress</span>
                  </div>
                  <span className="text-sm font-bold text-green-600">
                    {subject.completion}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${subject.completion}%` }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-500 font-medium">No subjects available yet</p>
            <p className="text-gray-400 text-sm mt-1">Check back soon for your class materials</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Subjects;
