import { combineReducers } from 'redux';
import userReducer from './user';
import adimnReducer from './admin';
// import productsReducer from './products';

export default combineReducers({
    user: userReducer,
    admin: adimnReducer
    // products: productsReducer
})