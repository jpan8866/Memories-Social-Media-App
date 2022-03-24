import { FETCH_ALL, FETCH_POST, CREATE, UPDATE, SET_ID, DELETE, LIKE_POST, FETCH_SEARCH, START_LOADING, END_LOADING } from "../actions/types";

const initialState = {
    posts: [],
    post: null,
    currentPage: 0,
    totalPages: 0,
    updateId: null,
    isLoading: false
};

const postsReducer = (state=initialState, action) => {
    switch(action.type) {
        case START_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case END_LOADING:
            return {
                ...state,
                isLoading: false
            }
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages
            };
        case FETCH_POST:
            return {
                ...state,
                post: action.payload
            }
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
            // replace the post with matching id with the newly updated post
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