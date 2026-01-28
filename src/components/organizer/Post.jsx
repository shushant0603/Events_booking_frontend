import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import postApi from "../../api/postApi.js";

const Post = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await postApi.GetAllPosts();
        console.log("Events fetched:", res.data);
        console.log("Response keys:", Object.keys(res.data));

        // Check all possible response keys
        const events = res.data.userPosts || res.data.events || res.data.posts || res.data || [];
        console.log("Setting events:", events);
        setEvents(events);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p className="p-6">Loading your events...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        My Created Events ({events.length})
      </h1>

      {/* Debug Info */}
      <div className="mb-4 p-3 bg-gray-100 rounded-lg text-xs">
        <strong>Debug:</strong> Events count: {events.length} | Loading: {loading.toString()} | Error: {error || 'none'}
      </div>

      {events.length === 0 ? (
        <p className="text-gray-500">
          You haven’t created any events yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              onClick={() => navigate(`/events_details/${event._id}`)}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              {event.imageUrl && (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-40 object-cover"
                />
              )}

              <div className="p-4">
                <h2 className="text-lg font-semibold mb-1">
                  {event.title}
                </h2>

                <p className="text-sm text-gray-600 mb-1">
                  📍 {event.venue}
                </p>

                <p className="text-sm text-gray-600 mb-2">
                  📅 {new Date(event.date).toLocaleDateString()}
                </p>

                <p className="text-sm text-gray-600 mb-2">
                  🎟 Ticket Limit: {event.ticketLimit}
                </p>

                <span
                  className={`inline-block px-3 py-1 text-xs rounded-full
                    ${
                      event.approvalMode === "manual"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }
                  `}
                >
                  {event.approvalMode.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
