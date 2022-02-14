import { FETCH_ALL, CREATE, UPDATE, SET_ID, DELETE, LIKE_POST, FETCH_SEARCH } from "../actions/types";

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
        case FETCH_SEARCH:
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
            };
        case DELETE:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            };
        case LIKE_POST:
            // note that the payload receive is the post with the updated number of likes.
            // replace it directly using map
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)
            }
        default: 
            return state;
    };
};

export default postsReducer;