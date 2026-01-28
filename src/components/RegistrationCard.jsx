import React from "react";

const RegistrationCard = ({ registration }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md">
      <h3 className="font-semibold text-lg mb-1">
        {registration.eventTitle}
      </h3>

      <p className="text-sm text-gray-600">
        Event ID: {registration.eventId}
      </p>

      <p className="mt-2">👤 {registration.name}</p>
      <p>📧 {registration.email}</p>

      <p
        className={`mt-3 font-semibold ${
          registration.status === "Registered"
            ? "text-green-600"
            : "text-yellow-600"
        }`}
      >
        Status: {registration.status}
      </p>

      {registration.status === "Pending" && (
        <p className="text-sm text-gray-500 mt-2">
          ⏳ Check after sometime.  
          We will also inform you via email.
        </p>
      )}
    </div>
  );
};

export default RegistrationCard;
