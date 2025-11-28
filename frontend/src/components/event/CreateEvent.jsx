import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { createEvent as apiCreateEvent, updateEvent as apiUpdateEvent } from "../../api/tasks";

function CreateEvent({ open, date, onClose, initialEvent = null }) {
  const [formData, setFormData] = useState({
    title: "",
    event: "",
    date: date ? new Date(date).toISOString().split("T")[0] : "",
  });
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(open);

  // keep internal open state in sync with prop
  useEffect(() => {
    setIsOpen(!!open);
  }, [open]);

  // when initialEvent changes (edit mode), prefill form
  useEffect(() => {
    if (initialEvent) {
      setFormData({
        title: initialEvent.title || "",
        event: initialEvent.event || initialEvent.description || "",
        date: initialEvent.date ? new Date(initialEvent.date).toISOString().split("T")[0] : (date ? new Date(date).toISOString().split("T")[0] : ""),
      });
    } else if (date) {
      setFormData((prev) => ({ ...prev, date: new Date(date).toISOString().split("T")[0] }));
    }
  }, [initialEvent, date]);

  // Fetch events for this specific date
  const fetchEventsForDate = async () => {
    try {
      const { data } = await API.get("/event/getEvents");
      const filtered = (data.events || []).filter((e) => {
        const eventDate = new Date(e.date);
        return (
          eventDate.getDate() === new Date(date).getDate() &&
          eventDate.getMonth() === new Date(date).getMonth() &&
          eventDate.getFullYear() === new Date(date).getFullYear()
        );
      });
      setEvents(filtered);
    } catch (error) {
      console.error("Error fetching events for date:", error);
    }
  };

  useEffect(() => {
    if (date) {
      setFormData((prev) => ({
        ...prev,
        date: new Date(date).toISOString().split("T")[0],
      }));
      fetchEventsForDate();
    }
  }, [date]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialEvent && initialEvent._id) {
        // update flow
        await apiUpdateEvent(initialEvent._id, {
          title: formData.title,
          event: formData.event,
          date: formData.date,
        });
      } else {
        // create flow
        await apiCreateEvent({
          title: formData.title,
          event: formData.event,
          date: formData.date,
        });
      }
      await fetchEventsForDate(); // refresh local event list
      setFormData({ title: "", event: "", date: formData.date });
      onClose?.(true); // notify parent to refresh events
    } catch (error) {
      console.error("Event Creation Error:", error.response?.data || error.message);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // keep small delay for UI effect, then notify parent
    setTimeout(() => onClose?.(), 200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white w-full max-w-lg mx-4 rounded-xl shadow-2xl border border-gray-200 p-6">
        {/* Close Button */}
        <X
          size={28}
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700 hover:scale-110 transition-all"
          onClick={handleClose}
        />

        {/* Header */}
        <h2 className="text-gray-900 text-2xl font-semibold mb-6 text-center">
          {initialEvent ? `Update Event for ${new Date(formData.date).toDateString()}` : `Create Event for ${new Date(formData.date).toDateString()}`}
        </h2>

        {/* Existing Events */}
        <div className="mb-6 bg-gray-50 rounded-lg p-3 border border-gray-200">
          <h3 className="text-gray-700 text-sm mb-2 font-semibold">Existing Events</h3>
          {events.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {events.map((e, i) => (
                <li
                  key={i}
                  className="bg-blue-50 text-blue-900 rounded-md px-3 py-2 text-sm border border-blue-200"
                >
                  <span className="font-semibold">{e.title}</span> — {e.event}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic text-sm">No events for this date.</p>
          )}
        </div>

        {/* Create Event Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="text-gray-700 text-sm block mb-1 font-medium">
              Event Name
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
              placeholder="Enter event title"
              required
            />
          </div>

          <div>
            <label htmlFor="event" className="text-gray-700 text-sm block mb-1 font-medium">
              Event Details
            </label>
            <textarea
              id="event"
              value={formData.event}
              onChange={handleChange}
              className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors min-h-40"
              placeholder="Enter details"
              required
            />
          </div>

          <div>
            <label htmlFor="date" className="text-gray-700 text-sm block mb-1 font-medium">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors mt-2 shadow-sm"
          >
            {initialEvent ? "Update Event" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
