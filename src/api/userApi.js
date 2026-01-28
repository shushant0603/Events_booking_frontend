import api from '../api/api';

// User related APIs
const userApi = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getCurrentUser: () => api.get("/auth/profile"), 
  logout: () => api.post("/auth/logout")
};

export default userApi;