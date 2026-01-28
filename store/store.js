import { create } from "zustand";
import postApi from "../src/api/postApi.js";

const usePostStore = create((set) => ({
  posts: [],
  loading: false,
  error: null,


  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await postApi.GetAllPosts();
      console.log("FETCH POSTS STORE RESPONSE:", res.data);
      set({
        posts: res.data.posts || [], // correct backend response key
        loading: false,
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to fetch posts",
        loading: false,
      });
    }
  },
}));

export default usePostStore;
