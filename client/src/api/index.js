// use axios to make api calls (can also use fetch)
import axios from 'axios';

//const url = '/api/posts'; // recall that this url goes to our posts routes in backend

// use baseURL instead, change axios. to API. below
const API = axios.create({ baseURL: "http://localhost:9000/api" });

// intercept all below requests and populate req with token if logged in, though not all requests will need the token (e.g. fetchPosts fetches regardless of whether logged in)
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }    
    return req;
})

// used with get, this returns all posts
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
// Note that Axios automatically serializes object to JSON

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData); 

// pagination
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

// commenting. Note that comment is a string, convert to obj
export const commentPost = (comment, id) => API.post(`/posts/${id}/commentPost`, { comment })
export const deleteComment = (comment, id) => API.delete(`/posts/${id}/deleteComment`, { comment })