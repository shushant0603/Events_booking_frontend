import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      
      {/* Left: Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <span className="text-2xl">🎟️</span>
        <h1 className="text-xl font-bold text-gray-800">
          TicketBook
        </h1>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        <button
          className="text-gray-700 font-medium hover:text-blue-600 transition"
          onClick={() => navigate("/ticket")}
        >
          Check Ticket
        </button>

        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
