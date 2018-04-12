import { combineReducers } from 'redux';
import userReducer from './user';
import adimnReducer from './admin';
import serverReducer from './server';
// import productsReducer from './products';

export default combineReducers({
    user: userReducer,
    admin: adimnReducer,
    server: serverReducer
    // products: productsReducer
})