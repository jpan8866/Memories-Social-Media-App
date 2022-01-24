import { AUTH } from './types';
import * as api from '../api/index';

export const signIn = (postData, navigate) => async (dispatch) => {
    // send data to the back-end/database so that it signs in the user
    // create end points for this
    // ...
    try {
        // navigate to home once signed in
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const signUp = (postData, navigate) => async (dispatch) => {
    // send data to back-end/data to sign up the user
    try {
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}