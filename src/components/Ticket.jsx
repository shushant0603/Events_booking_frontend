import React, { useState } from "react";
import ticketApi from "../api/ticket";

const Ticket = () => {
  const [ticketId, setTicketId] = useState("");
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = () => {
  window.print(); // Save as PDF
};

  const handleCheckTicket = async () => {
    if (!ticketId) {
      setError("Please enter Ticket ID");
      return;
    }

    setLoading(true);
    setError(null);
    setTicketData(null);

    try {
      console.log("Searching for ticket ID:", ticketId);
      const res = await ticketApi.getTicketById(ticketId.trim());
      console.log("TICKET FETCH RESPONSE:", res.data);
      setTicketData(res.data);
    } catch (err) {
      console.error("Ticket fetch error:", err);
      setError(
        err.response?.data?.message || "Ticket not found"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">
          🎫 Check Your Ticket
        </h2>

        {/* INPUT */}
        <input
          type="text"
          placeholder="Enter Ticket ID"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <button
          onClick={handleCheckTicket}
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white ${
            loading
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Checking..." : "Check Ticket"}
        </button>

        {/* ERROR */}
        {error && (
          <p className="text-red-600 text-sm mt-3 text-center">
            ❌ {error}
          </p>
        )}

      {ticketData && (
  <div className="mt-5 border p-4 rounded-lg bg-gray-50 print:border-none print:bg-white">
    <p className="text-sm">
      <b>Ticket ID:</b> {ticketData._id}
    </p>
    <p className="text-sm">
      <b>Name:</b> {ticketData.name}
    </p>
    <p className="text-sm">
      <b>Email:</b> {ticketData.email}
    </p>
    <p className="text-sm">
      <b>Event:</b> {ticketData.eventTitle || "—"}
    </p>

    <span
      className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${
        ticketData.status === "approved"
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      Status: {ticketData.status.toUpperCase()}
    </span>

    {/* DOWNLOAD BUTTON */}
    <button
      onClick={handleDownload}
      className="w-full mt-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg print:hidden"
    >
      ⬇️ Download Ticket
    </button>
  </div>
)}

      </div>
    </div>
  );
};

export default Ticket;
