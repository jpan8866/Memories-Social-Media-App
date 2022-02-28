import * as api from '../api';
// use api index file to perform all requests e.g. api.fetchPosts(). Ensures cleanliness
import * as actions from './types';

export const getPosts = (page) => async (dispatch) => {
    try {
        const res = await api.fetchPosts(page); // recall we're using axios
        console.log(res.data) // contains num pages and number of page
        dispatch({
            type: actions.FETCH_ALL,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        // send search query to backend and get response
        const res = await api.fetchPostsBySearch(searchQuery);
        // dispatch data
        dispatch({
            type: actions.FETCH_SEARCH,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        const res = await api.createPost(post);
        // Note that Axios automatically serializes object to JSON
        dispatch({
            type: actions.CREATE,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        // send update request to backend and get newly updated post as response
        const res = await api.updatePost(id, post);
        const updatedPost = res.data;

        dispatch({
            type: actions.UPDATE,
            payload: updatedPost
        })
    } catch (error) {
        console.log(error);
    }
}

export const setPostId = (id) => {
    return {
        type: actions.SET_ID,
        payload: id
    };
};

export const deletePost = (id) => async (dispatch) => {
    try {
        // note we are not interested in the response, since we are deleting.
        // could return the post deleted for debugging purposes if needed.
        // send request to backend 
        await api.deletePost(id);
        // update front-end
        dispatch({
            type: actions.DELETE,
            payload: id
        }); 
    } catch (error) {
        console.log(error);
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        // send request to back-end to update like count
        const res = await api.likePost(id);
        // update front-end
        dispatch({
            type: actions.LIKE_POST,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
}