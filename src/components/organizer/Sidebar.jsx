import { useNavigate } from "react-router-dom";

const Sidebar = ({ active, setActive }) => {
  const navigate = useNavigate();

  const menu = ["home", "Events", "Create Event"];

  // 🔹 Temporary user data (future me API se aayega)
  const user = {
    name: "organizer",
    photo: null, // yaha future me image URL aayega
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-56 bg-white shadow-md p-4 flex flex-col h-screen">
      
      {/* 🔹 User Profile Section */}
      <div
        // future route
        className="flex items-center gap-3 mb-6 cursor-pointer hover:bg-gray-100 p-2 rounded"
      >
        {/* Avatar */}
        {user.photo ? (
          <img
            src={user.photo}
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Name + hint */}
        <div>
          <p className="text-sm font-semibold">{user.name}</p>
          <p className="text-xs text-gray-500">
            View / Edit Profile
          </p>
        </div>
      </div>

      {/* Menu Title */}
      <h2 className="text-xl font-bold mb-4">Menu</h2>

      {/* Menu Items */}
      <div className="flex-1">
        {menu.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`block w-full text-left px-3 py-2 mb-2 rounded capitalize
              ${
                active === item
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }
            `}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-auto w-full px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
