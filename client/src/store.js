import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers'; // grabs index file 

const initialState = {};
let store;

if(process.env.NODE_ENV === 'production') {
    store = createStore(rootReducer, initialState, compose(
        applyMiddleware(thunk)
    ));
} else { // include redux dev tools only during development, otherwise unsupporting browsers cannot render
    store = createStore(rootReducer, initialState, compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));
}

export default store;