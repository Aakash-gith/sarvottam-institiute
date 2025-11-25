import React from "react";
import {  HeaderBar, Navbar, Progress, Subjects } from "../components/index.components";

function Notes() {
  return (
    <div className="grid md:grid-rows-1 md:grid-cols-[minmax(180px,220px)_1fr] h-screen bg-bg ">
      <Navbar />
      <div className="p-10 rounded-lg gap-5 flex flex-col"> 
        <HeaderBar />
        <Progress />
        <Subjects />
      </div>
    </div>
  );
}

export default Notes;
