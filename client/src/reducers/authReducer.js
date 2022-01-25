import { AUTH, LOGOUT } from '../actions/types';

const initialState = {
    authData: null
}
// get user data
const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case AUTH:
            // Need to use JSON.stringify because objects are stored as addresses in localStorage. 
            // we can extract this info in Navbar using JSON.parse
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
            console.log(action?.payload)
            return {
                ...state,
                authData: action?.payload
            };
        case LOGOUT:
            // clear the login status from UI
            localStorage.clear();
            console.log("logged out");
            // erase authData when logging out
            return {
                ...state,
                authData: null
            };
        default:
            return state;
    }
}

export default authReducer;