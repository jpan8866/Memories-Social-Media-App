// use axios to make api calls (can also use fetch)
import axios from 'axios';

const url = '/api/posts';
// recall that this url goes to our posts routes in backend
// used with get, this returns all posts
export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
// Note that Axios automatically serializes object to JSON