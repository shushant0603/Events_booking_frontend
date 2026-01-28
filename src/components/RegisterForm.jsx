import React, { useState } from "react";
import ticketApi from "../api/ticket.js";
// import { useNavigate } from "react-router-dom";

const RegisterForm = ({ event, onClose, onSubmit }) => {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target);

    const payload = {
      eventId: event._id,
      name: formData.get("name"),
      email: formData.get("email"),
    };

    try {
      const res = await ticketApi.createTicket(payload);
      console.log("TICKET CREATION RESPONSE:", res.data);
      setResult(res.data);

      // Success! User can now choose to close or download
      
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to register for event. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadTicket = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={onClose} // 👈 outside click close
    >
      <div
        className="bg-white p-6 rounded-xl w-96 shadow-2xl border-2 border-gray-100"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      // 👈 inside safe
      >
        <h2 className="text-xl font-semibold mb-4">
          Register for Event
        </h2>

        {result ? (
          <div className="text-center space-y-4 print:space-y-2">
            <div className="text-6xl print:hidden">🎫</div>

            <p className="text-green-600 font-bold text-lg">
              🎉 Ticket Created Successfully!
            </p>
            
            <p className="text-sm text-gray-600">
              आपका ticket तैयार है! आप अब close कर सकते हैं।
            </p>

            <div className="border p-4 rounded-lg">
              <p><b>Ticket ID:</b> {result.ticketId}</p>
              <p><b>Event:</b> {event.title}</p>
              <p><b>Status:</b> {result.status.toUpperCase()}</p>
            </div>

            <div className="flex gap-2 print:hidden">
              <button
                onClick={downloadTicket}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg"
              >
                Download Ticket
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                ✅ Done - Close
              </button>
            </div>

            <p className="text-xs text-gray-500 print:hidden">
              You can download or close this ticket.
            </p>
          </div>
        ) : (
          <div>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">❌ {error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={event._id}
                disabled
                className="w-full mb-3 px-3 py-2 border rounded bg-gray-100 text-sm"
              />

              <input
                name="name"
                placeholder="Your Name"
                required
                disabled={loading}
                className="w-full mb-3 px-3 py-2 border rounded"
              />

              <input
                name="email"
                type="email"
                placeholder="Your Email"
                required
                disabled={loading}
                className="w-full mb-4 px-3 py-2 border rounded"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white font-medium ${
                  loading
                    ? "bg-gray-400"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Creating Ticket..." : "Register & Create Ticket"}
              </button>
            </form>

            {!loading && (
              <button
                onClick={onClose}
                className="w-full mt-3 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
