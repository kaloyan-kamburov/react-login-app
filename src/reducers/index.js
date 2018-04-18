import { combineReducers } from 'redux';
import userReducer from './user';
import adimnReducer from './admin';
import serverReducer from './server';
import categoryReducer from './categories'
// import productsReducer from './products';

export default combineReducers({
    user: userReducer,
    admin: adimnReducer,
    server: serverReducer,
    categories: categoryReducer
    // products: productsReducer
})