import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import CheckTicket from "./pages/CheckTicket";
import LandingPage from "./pages/LandingPage";

import ProtectedRoute from "./components/auth/ProtectedRoutes";
import PublicRoute from "./components/auth/PublicRoutes";
import Ticket from "./components/Ticket";
import EventsDetails from "./components/organizer/EventsDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Routes (BLOCK if token exists) */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/ticket"
          element={
      
              <Ticket />
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
          <Route
          path="/events_details/:id"
          element={
            <ProtectedRoute>
              <EventsDetails />
            </ProtectedRoute>
          }
        />

        {/* <Route path="/check-ticket" element={<CheckTicket />} /> */}

        {/* Fallback */}
        <Route path="*" element={<h1 className="p-6">Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
