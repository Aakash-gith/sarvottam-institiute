import React from "react";
import {
  HeaderBar,
  Navbar,
  SingleNotes,
} from "../components/index.components";

function SubjectNotes() {
  return (
<div className="grid md:grid-rows-1  
                md:grid-cols-[minmax(180px,220px)_1fr] 
                h-screen bg-bg overflow-hidden">
  <Navbar />

  <div className=" pb-0 pr-0 rounded-lg gap-5 flex flex-col ">
    <HeaderBar />

    <div className="flex-1 overflow-y-auto">
      <SingleNotes />
    </div>
  </div>
</div>

  );
}

export default SubjectNotes;
