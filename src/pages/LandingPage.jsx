import React, { useState,useEffect } from "react";
// import events from "../../data/events.json";
import RegisterForm from "../components/RegisterForm";
import RegistrationCard from "../components/RegistrationCard";
import Navbar from "../components/Navbar";
import  postApi from "../api/postApi.js";
import fallbackEvents from "../../data/fallbackEvents.json";


const LandingPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);

  console.log("Landing Page - Events state:", events);
  console.log("Landing Page - Events length:", events.length);

  const handleSubmit = (registration) => {
    setRegistrations([...registrations, registration]);
    setSelectedEvent(null);
  };
 useEffect(() => {
  const fetchEvents = async () => {
    try {
      const res = await postApi.GetPost();
      console.log("FETCH EVENTS RESPONSE:", res.data);

      const apiEvents = res.data.posts || [];

      // ✅ Fallback logic
      if (apiEvents.length === 0) {
        console.warn("No events from API, using fallback data");
        setEvents(fallbackEvents);
      } else {
        setEvents(apiEvents);
      }

    } catch (err) {
      console.error("FETCH EVENTS ERROR:", err.message);

      // ✅ API fail hone pe bhi fallback
      setEvents(fallbackEvents);
    }
  };

  fetchEvents();
}, []);


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
        <Navbar/>
<div className="grid mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {events.length === 0 ? (
    <p className="text-gray-600">No events available</p>
  ) : (
    events.map((event) => (
      <div
        key={event._id} // ✅ FIX
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
      >
        {/* Image */}
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-44 object-cover"
        />

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            {event.title}
          </h2>

          <p className="text-sm text-gray-600 mb-3 line-clamp-3">
            {event.description}
          </p>

          <div className="text-sm text-gray-700 space-y-1 mb-3">
            <p>📍 <span className="font-medium">{event.venue}</span></p>

            <p>
              📅{" "}
              {new Date(event.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>

            <p>
              🎟️ Tickets Available:{" "}
              <span className="font-medium">
                {event.ticketLimit}
              </span>
            </p>
          </div>

          <div className="mb-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                event.approvalMode === "manual"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {event.approvalMode === "manual"
                ? "Manual Approval"
                : "Auto Approval"}
            </span>
          </div>

          <button
            onClick={() => setSelectedEvent(event)}
            className="mt-auto w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </div>
      </div>
    ))
  )}
</div>


      {/* Register Form */}
      {selectedEvent && (
        <RegisterForm
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onSubmit={handleSubmit}
        />
      )}

      {/* Registrations */}
      {registrations.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">
            Your Registrations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {registrations.map((reg, index) => (
              <RegistrationCard
                key={index}
                registration={reg}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
