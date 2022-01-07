import { FETCH_ALL, CREATE, UPDATE, SET_ID } from "../actions/types";

const initialState = {
    posts: [],
    updateId: null
};

const postsReducer = (state=initialState, action) => {
    switch(action.type) {
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload
            };
        case CREATE:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        case UPDATE:
            // We want to replace the post with matching id with the newly updated post
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)
            };
        case SET_ID:
            return {
                ...state,
                updateId: action.payload
            }
        default: 
            return state;
    };
};

export default postsReducer;