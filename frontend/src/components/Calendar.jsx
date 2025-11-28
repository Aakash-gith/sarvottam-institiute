import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { CreateEvent } from "./index.components";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

function Calendar({ refresh, className = "", showUpcoming = true, showHeader = true }) {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use state for current displayed month/year
  const today = new Date();
  const [displayMonth, setDisplayMonth] = useState(today.getMonth());
  const [displayYear, setDisplayYear] = useState(today.getFullYear());

  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
  const firstDay = new Date(displayYear, displayMonth, 1).getDay();

  // Navigation functions
  const goToPrevMonth = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else {
      setDisplayMonth(displayMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(displayMonth + 1);
    }
  };

  const goToPrevYear = () => {
    setDisplayYear(displayYear - 1);
  };

  const goToNextYear = () => {
    setDisplayYear(displayYear + 1);
  };

  const goToToday = () => {
    setDisplayMonth(today.getMonth());
    setDisplayYear(today.getFullYear());
  };

  const getEvents = async () => {
    try {
      const { data } = await API.get("/event/getEvents");
      setEvents(data.events || []);
    } catch (error) {
      console.error("Event fetch Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getEvents();
  }, [refresh]);

  const handleDateClick = (day) => {
    const clickedDate = new Date(displayYear, displayMonth, day);
    if (clickedDate >= new Date(new Date().setHours(0, 0, 0, 0))) {
      setSelectedDate(clickedDate);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = async (shouldRefresh) => {
    setIsModalOpen(false);
    setSelectedDate(null);
    if (shouldRefresh) await getEvents();
  };

  const isEventDate = (day) => {
    return events.some((e) => {
      const eventDate = new Date(e.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === displayMonth &&
        eventDate.getFullYear() === displayYear
      );
    });
  };

  const isCurrentMonth = displayMonth === today.getMonth() && displayYear === today.getFullYear();

  return (
    <div className={`${className} text-gray-900 h-full overflow-y-auto bg-white p-4 flex flex-col gap-3`}>
      {/* Calendar Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        {/* Header with Navigation */}
        {showHeader && (
          <div className="mb-4 pb-3 border-b border-gray-200">
            {/* Month/Year Display */}
            <div className="flex justify-center items-center gap-2 mb-3">
              <span className="text-2xl">📅</span>
              <h2 className="text-lg font-semibold text-gray-900">
                {new Date(displayYear, displayMonth).toLocaleString("default", { month: "long" })} {displayYear}
              </h2>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between gap-1">
              {/* Year navigation */}
              <button
                onClick={goToPrevYear}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900"
                title="Previous Year"
              >
                <ChevronsLeft size={16} />
              </button>

              {/* Month navigation */}
              <button
                onClick={goToPrevMonth}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900"
                title="Previous Month"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Today button */}
              <button
                onClick={goToToday}
                className={`px-3 py-1 text-xs rounded-lg transition-colors ${isCurrentMonth
                  ? "bg-blue-100 text-blue-600 cursor-default"
                  : "bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white"
                  }`}
                disabled={isCurrentMonth}
              >
                Today
              </button>

              {/* Month navigation */}
              <button
                onClick={goToNextMonth}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900"
                title="Next Month"
              >
                <ChevronRight size={16} />
              </button>

              {/* Year navigation */}
              <button
                onClick={goToNextYear}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900"
                title="Next Year"
              >
                <ChevronsRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-center text-gray-600">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <div key={d} className="font-semibold text-[10px] text-gray-500 mb-2">{d}</div>
          ))}

          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const date = new Date(displayYear, displayMonth, day);
            const isToday =
              day === today.getDate() &&
              displayMonth === today.getMonth() &&
              displayYear === today.getFullYear();
            const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
            const hasEvent = isEventDate(day);

            return (
              <div
                key={day}
                onClick={() => !isPast && handleDateClick(day)}
                className={`relative cursor-pointer text-sm py-1 w-8 h-8 inline-flex items-center justify-center rounded-full transition-all
                  ${isPast ? "text-gray-400 cursor-not-allowed"
                    : isToday ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30"
                      : hasEvent ? "bg-red-100 text-red-700 hover:bg-red-200 ring-1 ring-red-300"
                        : "text-gray-700 hover:bg-gray-100"}
                `}
              >
                <span className="text-xs">{day}</span>
                {hasEvent && !isToday && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-400 rounded-full"></span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events Section */}
      {showUpcoming && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex-1">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
            <span className="text-lg">🎯</span>
            <h3 className="text-sm font-semibold text-gray-900">Upcoming Events</h3>
            <span className="ml-auto text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {events.length}
            </span>
          </div>

          {events.length > 0 ? (
            <ul className="flex flex-col gap-2 w-full">
              {events.slice(0, 4).map((task, index) => (
                <li
                  key={index}
                  className="p-2.5 rounded-lg bg-gradient-to-r from-red-50 to-red-100 border border-red-200 hover:border-red-300 transition-all duration-200 hover:translate-x-0.5 cursor-pointer"
                >
                  <p className="font-medium text-xs text-gray-900 truncate">{task.title}</p>
                  <p className="text-[10px] text-gray-500 mt-1">
                    {new Date(task.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-6 text-gray-400">
              <p className="text-2xl mb-2">📭</p>
              <p className="text-xs">No upcoming events</p>
              <p className="text-[10px] mt-1 text-gray-500">Click a date to add one!</p>
            </div>
          )}
        </div>
      )}

      {/* Create Event Modal */}
      {isModalOpen && selectedDate && (
        <CreateEvent date={selectedDate} open={isModalOpen} onClose={handleModalClose} />
      )}
    </div>
  );
}

export default Calendar;
