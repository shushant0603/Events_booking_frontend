import React, { useState,useEffect } from "react";
import Sidebar from "../components/organizer/Sidebar";
// import postApi from "../api/postApi";
import usePostStore from "../../store/store";

// import HomeContent from "../components/organizer/HomeContent";
// import AboutContent from "../components/organizer/AboutContent";
import EventsContent from "../components/organizer/EventsContent";
import Dashboard from "../components/organizer/Dashboard";
import Post from "../components/organizer/Post";

const Home = () => {
  const [active, setActive] = useState("home");

  const renderContent = () => {
    if (active === "home") return <Dashboard />;
    if (active === "Events") return <Post />;
    if (active === "Create Event") return <EventsContent />;
  };
  

  const { fetchPosts } = usePostStore();

  useEffect(() => {
    fetchPosts(); // 🔥 ONLY ONCE
  }, []);
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar active={active} setActive={setActive} />

      {/* Right side */}
      <div className="flex-1 overflow-y-auto  p-6">
        {renderContent()}
        
      </div>
    </div>
  );
};

export default Home;
