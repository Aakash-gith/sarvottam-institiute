import React from "react";
import { HeaderBar, Calendar } from "./index.components";
import { semesterData } from "../semesterData";

import { Link } from "react-router-dom";

function Dashboard() {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const currentSemester = userData.semester;

  const subjects = semesterData[currentSemester]?.subjects || [];

  const getImagePath = (subject) => {
    return `/assets/subjects/${subject.id}.jpeg`;
  };
  return (
    <div className="h-screen">
      <HeaderBar />

      <div className="p-6 bg-bg-1 m-2 rounded-xl ">
        <h2 className="text-white text-2xl font-semibold mb-6">
          Your Subjects
        </h2>

        <div
          className="
    grid 
    gap-6
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3 
    xl:grid-cols-4
    place-items-center
  "
        >
          {subjects.map((subject) => (
            <Link
              to={`/notes/${subject.id}`}
              key={subject.id}
              className="
    group
    w-full
    max-w-[260px]
    h-44
    rounded-2xl
    bg-cover
    bg-center
    overflow-hidden
    relative
    cursor-pointer
    transition-all
  "
              style={{ backgroundImage: `url(${getImagePath(subject)})` }}
            >
              {/* Hover overlay */}
              <div
                className="
      absolute inset-0 
      bg-black/0
      group-hover:bg-black/60 
      transition-all 
      duration-300
    "
              />

              {/* Name reveal */}
              <div
                className="
      absolute inset-0
      flex 
      items-center 
      justify-center
      opacity-0
      group-hover:opacity-100
      transition-opacity 
      duration-300
      text-white 
      text-xl 
      font-bold 
      px-3 
      text-center
      wrap-break-words
    "
              >
                {subject.name}
              </div>
            </Link>
          ))}
        </div>

        <h2 className="text-white text-2xl font-semibold mb-6">Extras</h2>

        <div className="bg-bg-2 w-64 h-64 rounded-lg"></div>
      </div>
    </div>
  );
}

export default Dashboard;
