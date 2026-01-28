import React, { useState } from "react";
import postApi from "../../api/postApi.js";

const EventsContent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    ticketLimit: "",
    approvalMode: "auto",
    imageUrl: "",
  // Example user ID
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleCreateEvent = (e) => {
  e.preventDefault();

  const payload = {
    ...formData,
    ticketLimit: Number(formData.ticketLimit),
  };

  postApi
    .createPost(payload)
    .then((res) => {
      console.log("EVENT CREATED:", res.data);
      alert("Event Created Successfully ✅");
      setFormData({
        title: "",
        description: "",
        date: "",
        venue: "",
        ticketLimit: "",
        approvalMode: "auto",
        imageUrl: "",
        
      });
    })
    .catch((err) => {
      console.error("ERROR creating event:", err.response?.data || err.message);
      alert("Failed to create event ❌");
    });
};


  return (
    <div className="flex justify-center  py-10">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">

        {/* ===== Header ===== */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            🎉 Create New Event
          </h1>
          <p className="text-gray-500 mt-2">
            Fill the details below and publish your event.
          </p>
        </div>

        <form onSubmit={handleCreateEvent} className="space-y-10">

          {/* ===== Event Details ===== */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              🧾 Event Details
            </h2>

            <div className="space-y-4">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Event Title"
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your event"
                rows="4"
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* ===== Date & Venue ===== */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              📍 Date & Location
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="px-4 py-3 border rounded-lg"
              />

              <input
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Venue"
                required
                className="px-4 py-3 border rounded-lg"
              />
            </div>
          </div>

          {/* ===== Registration Settings ===== */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              🎟️ Ticket Count
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="number"
                name="ticketLimit"
                value={formData.ticketLimit}
                onChange={handleChange}
                placeholder="Ticket Limit (e.g. 100)"
                required
                className="px-4 py-3 border rounded-lg"
              />
            </div>

            {/* Approval Mode Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["auto", "manual"].map((mode) => (
                <div
                  key={mode}
                  onClick={() =>
                    setFormData({ ...formData, approvalMode: mode })
                  }
                  className={`cursor-pointer p-5 rounded-xl border text-center transition
                    ${
                      formData.approvalMode === mode
                        ? "border-blue-600 bg-blue-50"
                        : "hover:border-gray-400"
                    }
                  `}
                >
                  <h3 className="font-semibold capitalize">
                    {mode} Approval
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {mode === "auto"
                      ? "Users get instant access"
                      : "You manually approve registrations"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ===== Image Section ===== */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              🖼️ Event Image
            </h2>

            <input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 border rounded-lg"
            />

            {/* Image Preview */}
            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt="preview"
                className="mt-4 w-full h-48 object-cover rounded-xl border"
              />
            )}
          </div>

          {/* ===== Submit ===== */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="px-12 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
            >
              Create Event 🚀
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EventsContent;
