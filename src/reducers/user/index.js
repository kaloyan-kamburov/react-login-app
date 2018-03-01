import { combineReducers } from 'redux';
import userPersonalInfoReducer from './personalInfoReducer';

export default combineReducers({
    personalInfo: userPersonalInfoReducer
    // products: productsReducer
})