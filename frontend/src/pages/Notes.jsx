import React from "react";
import { Navbar, Progress, Subjects, PyqSection } from "../components/index.components";

function Notes() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1 mt-16">
        <div className="p-6 md:p-10 max-w-7xl mx-auto flex flex-col gap-6">
          <Progress />
          <Subjects />
          <PyqSection />
        </div>
      </div>
    </div>
  );
}

export default Notes;
