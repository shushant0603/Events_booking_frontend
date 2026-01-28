import React, { useEffect } from "react";
// import usePostStore from "../../../store/store";
import useUserStore from "../../../store/userStore";
import ticketApi from "../../api/ticket";

const Dashboard = () => {
  // const { posts, loading, error } = usePostStore();

  const {
    user,
    userTickets,
    userLoading,
    ticketsLoading,
    fetchUserDetails,
    fetchUserTickets,
  } = useUserStore();

  useEffect(() => {
    fetchUserDetails();
    fetchUserTickets();
  }, []);


  
  const handleTicketApproval = async (ticketId, status) => {
    try {
      await ticketApi.updateTicketStatus(ticketId, status);
      fetchUserTickets(); // refresh after update
    } catch (error) {
      console.error("Error updating ticket:", error);
      alert(
        error.response?.data?.message || "Failed to update ticket"
      );
    }
  };

  // =========================
  // 📦 GROUP TICKETS BY EVENT
  // =========================
  const ticketsByEvent = userTickets.reduce((acc, ticket) => {
    const eventId = ticket.eventId;

    if (!acc[eventId]) {
      acc[eventId] = {
        eventTitle: ticket.eventTitle,
        eventDate: ticket.eventDate,
        eventVenue: ticket.eventVenue,
        tickets: [],
      };
    }

    acc[eventId].tickets.push(ticket);
    return acc;
  }, {});

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, {userLoading ? "..." : user?.name || "Organizer"} 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Manage events, registrations, and approvals from one place.
        </p>
        {user && (
          <div className="mt-2 text-sm text-gray-500">
            📧 {user.email} • User ID: {user.id}
          </div>
        )}
      </div>

    

      {/* ================= TICKET MANAGEMENT ================= */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          🎫 Ticket Registrations ({userTickets.length})
        </h2>

        {ticketsLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading tickets...</p>
          </div>
        )}

        {!ticketsLoading && Object.keys(ticketsByEvent).length === 0 && (
          <p className="text-gray-500 text-center py-8">
            No ticket registrations yet.
          </p>
        )}

        {!ticketsLoading &&
          Object.entries(ticketsByEvent).map(
            ([eventId, eventData]) => (
              <div
                key={eventId}
                className="border rounded-lg p-4 mb-6"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {eventData.eventTitle}
                    </h3>
                    <p className="text-sm text-gray-600">
                      📅{" "}
                      {new Date(
                        eventData.eventDate
                      ).toLocaleDateString()}{" "}
                      • 📍 {eventData.eventVenue}
                    </p>
                  </div>

                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
                    {eventData.tickets.length} registrations
                  </span>
                </div>

                <div className="space-y-2">
                  {eventData.tickets.map((ticket) => (
                    <div
                      key={ticket._id}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded"
                    >
                      <div>
                        <p className="font-medium">
                          {ticket.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {ticket.email}
                        </p>
                        <p className="text-xs text-gray-500">
                          Registered:{" "}
                          {new Date(
                            ticket.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            ticket.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : ticket.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {ticket.status.toUpperCase()}
                        </span>

                        {ticket.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleTicketApproval(
                                  ticket._id,
                                  "approved"
                                )
                              }
                              className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
                            >
                              Approve
                            </button>

                            <button
                              onClick={() =>
                                handleTicketApproval(
                                  ticket._id,
                                  "rejected"
                                )
                              }
                              className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
      </div>

      {/* ================= INFO TIP ================= */}
      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-md">
        <p className="text-sm text-indigo-700">
          💡 Tip: For manual approval events, regularly review
          pending registrations to keep users engaged.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
