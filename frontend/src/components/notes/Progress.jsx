import React, { useMemo, useState, useEffect } from "react";
import { semesterData,  fetchSemesterProgress } from "../../semesterData";

function Progress() {
  const [completion, setCompletion] = useState(0);
  const [loading, setLoading] = useState(true);

  const currentSemester = useMemo(() => {
    if (typeof window !== "undefined") {
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        return userData.semester || 1;
      } catch (error) {
        console.error("Error reading localStorage:", error);
        return 1;
      }
    }
    return 1;
  }, []);

  useEffect(() => {
    const loadProgress = async () => {
      setLoading(true);
      const data = await fetchSemesterProgress(currentSemester);

      if (data) {
        setCompletion(data.completion || 0);
      } else {
        setCompletion(0);
      }
      setLoading(false);
    };

    loadProgress();
  }, [currentSemester]);

  const semesterInfo = semesterData[currentSemester];

  if (loading) {
    return (
      <div className="md:col-span-2 bg-bg-1 p-6 rounded-xl flex items-center justify-center">
        <div className="text-slate-400">Loading progress...</div>
      </div>
    );
  }

  return (
    <div className="md:col-span-2 bg-bg-1 p-6 rounded-xl">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {semesterInfo.name} Progress
        </h2>
      </div>

      <div className="bg-slate-700/40 rounded-lg p-5 border border-slate-600/50">
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-4xl md:text-5xl font-bold text-emerald-400">
            {completion}%
          </span>
          <span className="text-slate-300 text-sm md:text-base">
            Overall Completion
          </span>
        </div>

        <div className="w-full bg-slate-600/50 rounded-full h-3 overflow-hidden border border-slate-600">
          <div
            className="bg-linear-to-r from-emerald-500 to-emerald-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${completion}%` }}
          />
        </div>

        <p className="text-xs md:text-sm text-slate-400 mt-3">
          Progress calculation includes notes read and lectures watched.
        </p>
      </div>
    </div>
  );
}

export default Progress;
