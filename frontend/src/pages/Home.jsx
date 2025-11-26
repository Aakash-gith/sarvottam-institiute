import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Dashboard, Calendar, CreateEvent } from "../components/index.components";

function Home() {
  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshEvents, setRefreshEvents] = useState(false);

  useEffect(() => {
    if (!status && !localStorage.getItem("accessToken")) {
      navigate("/auth/login", { replace: true });
    }
  }, [status, navigate]);


  const handleClose = () => {
    setIsModalOpen(false);
    setRefreshEvents((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-bg">
      <Navbar />
      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 transition-all duration-300">
        <div className="grid md:grid-rows-1 md:grid-cols-[1fr_minmax(220px,260px)] h-full">
          <Dashboard />
          <Calendar refresh={refreshEvents} />
        </div>
      </div>
      <CreateEvent open={isModalOpen} onClose={handleClose} />
    </div>
  );
}

export default Home;
