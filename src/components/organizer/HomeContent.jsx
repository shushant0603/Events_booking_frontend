import React from "react";

const HomeContent = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome, Organizer 👋
        </h1>
        <p className="text-gray-600">
          Manage your events, track registrations, and control approvals from
          this dashboard.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">➕ Create Event</h2>
          <p className="text-sm text-gray-600">
            Create a new event with auto or manual approval.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">📋 My Events</h2>
          <p className="text-sm text-gray-600">
            View, edit, or delete the events you’ve created.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">🧾 Registrations</h2>
          <p className="text-sm text-gray-600">
            Approve or reject registrations for manual events.
          </p>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
        <p className="text-sm text-blue-700">
          💡 Tip: For manual approval events, remember to regularly check
          pending registrations.
        </p>
      </div>
    </div>
  );
};

export default HomeContent;
