import { AUTH } from './types';
import * as api from '../api/index';

export const signIn = (postData, navigate) => async (dispatch) => {

    try {
        // send data to the back-end/database so that it signs in the user
        // recall with axios we can get data directly, Axios automatically serializes object to JSON
        // and axios automatically parses JSON response to js object
        const { data } = await api.signIn(postData); 
        console.log(data)
        dispatch({ 
            type: AUTH, 
            payload: data 
        });

        // navigate to home once signed in
        navigate('/');
    } catch (error) {
        const { data } = error.response;
        dispatch({
            type: AUTH,
            payload: data
        });
    }
}

export const signUp = (postData, navigate) => async (dispatch) => {
    // send data to back-end/data to sign up the user
    try {
        const { data } = await api.signUp(postData); 
        
        dispatch({ 
            type: AUTH, 
            payload: data 
        });
        
        navigate('/');
    } catch (error) { // catch 400 response
        const { data } = error.response;
        dispatch({
            type: AUTH,
            payload: data
        });
    }
}