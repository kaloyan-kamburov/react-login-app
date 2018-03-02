import { combineReducers } from 'redux';
import personalInfoReducer from './personalInfoReducer';

export default combineReducers({
    personalInfo: personalInfoReducer
    // products: productsReducer
})