import { combineReducers } from 'redux';
import personalInfoReducer from './personalInfoReducer';
import cartReducer from './cartReducer';

export default combineReducers({
    personalInfo: personalInfoReducer,
    cart: cartReducer
    // products: productsReducer
})