import { create } from "zustand";
import userApi from "../src/api/userApi.js";
import ticketApi from "../src/api/ticket.js";

const useUserStore = create((set, get) => ({
  // User state
  user: null,
  userLoading: false,
  userError: null,
  
  // User tickets state
  userTickets: [],
  ticketsLoading: false,
  ticketsError: null,

  // Fetch current user details (from localStorage token)
  fetchUserDetails: async () => {
    console.log("fetchUserDetails called");
    set({ userLoading: true, userError: null });
    try {
      // We'll need to create this API endpoint
      const res = await userApi.getCurrentUser();
      console.log("User details response:", res.data);
      set({ 
        user: res.data.user,
        userLoading: false 
      });
    } catch (err) {
      console.error("fetchUserDetails error:", err);
      set({
        userError: err.response?.data?.message || "Failed to fetch user details",
        userLoading: false,
      });
    }
  },

//   Fetch all tickets for current user
  fetchUserTickets: async () => {
    console.log("fetchUserTickets called");
    set({ ticketsLoading: true, ticketsError: null });
    try {
      // We'll need to create this API endpoint
      const res = await ticketApi.getUserTickets();
      console.log("User tickets response:", res.data);
      set({
        userTickets: res.data.tickets || [],
        ticketsLoading: false,
      });
    } catch (err) {
      console.error("fetchUserTickets error:", err);
      set({
        ticketsError: err.response?.data?.message || "Failed to fetch tickets",
        ticketsLoading: false,
      });
    }
  },

//   Clear user data (for logout)
  clearUser: () => {
    set({
      user: null,
      userTickets: [],
      userError: null,
      ticketsError: null,
    });
  },
}));

export default useUserStore;