import * as api from '../api';
// use api index file to perform all requests e.g. api.fetchPosts(). Ensures cleanliness
import * as actions from './types';

export const getPosts = () => async (dispatch) => {
    try {
        const res = await api.fetchPosts(); // recall we're using axios
        dispatch({
            type: actions.FETCH_ALL,
            payload: res.data
        });
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