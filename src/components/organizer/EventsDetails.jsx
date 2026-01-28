import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ticketApi from "../../api/ticket";
import postApi from "../../api/postApi.js";

const EventsDetails = () => {
  const { id } = useParams(); // eventId

  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // =========================
  // 🔹 Fetch Event Details
  // =========================
  const fetchEvent = async () => {
    try {
      const res = await postApi.GetPostById(id);
      console.log("result",res);
      setEvent(res.data.post || res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load event details");
    }
  };

  // =========================
  // 🔹 Fetch Tickets by Event
  // =========================
  const fetchTickets = async () => {
    try {
      const res = await ticketApi.getTicketbyEventId(id);
      setTickets(res.data.tickets || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load tickets");
    }
  };

  // =========================
  // 🔹 Update Ticket Status
  // =========================
  const updateStatus = async (ticketId, status) => {
    try {
      await ticketApi.updateTicketStatus(ticketId, status);
      fetchTickets(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to update ticket status");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchEvent(), fetchTickets()]);
      setLoading(false);
    };
    loadData();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-8">

      {/* ================= EVENT DETAILS ================= */}
      {event && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {event.imageUrl && (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-64 object-cover"
            />
          )}

          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">
              {event.title}
            </h1>

            <p className="text-gray-600 mb-1">
              📍 {event.venue}
            </p>

            <p className="text-gray-600 mb-3">
              📅 {new Date(event.date).toLocaleDateString()}
            </p>

            <p className="text-gray-700 mb-4">
              {event.description}
            </p>

            <div className="flex gap-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                🎟 Limit: {event.ticketLimit}
              </span>

              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  event.approvalMode === "manual"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {event.approvalMode ? event.approvalMode.toUpperCase() : "N/A"}

              </span>
            </div>
          </div>
        </div>
      )}

      {/* ================= TICKETS LIST ================= */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">
          🎫 Registrations ({tickets.length})
        </h2>

        {tickets.length === 0 ? (
          <p className="text-gray-500">
            No one has registered yet.
          </p>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
              >
                {/* LEFT */}
                <div>
                  <p className="font-semibold">{ticket.name}</p>
                  <p className="text-sm text-gray-600">{ticket.email}</p>
                  <p className="text-xs text-gray-500">
                    Registered on{" "}
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full
                      ${
                        ticket.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : ticket.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {ticket.status.toUpperCase()}
                  </span>

                  {ticket.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(ticket._id, "approved")
                        }
                        className="px-3 py-1 text-xs bg-green-600 text-white rounded"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(ticket._id, "rejected")
                        }
                        className="px-3 py-1 text-xs bg-red-600 text-white rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default EventsDetails;
