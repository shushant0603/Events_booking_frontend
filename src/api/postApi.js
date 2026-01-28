// import { GetAllPosts } from '../../../backend/src/controller/PostController.js';
import api from '../api/api.js';

const postApi = {
    createPost: (data) => api.post("/posts", data),
    GetAllPosts: () => api.get("/post"),
    GetPost:()=>api.get("/posts"),
    GetPostById:(id)=>api.get(`/posts/${id}`),
}

export default postApi;