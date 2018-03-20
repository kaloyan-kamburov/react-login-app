import { combineReducers } from 'redux';
import personalInfoReducer from './personalInfoReducer';
import formMessagesReducer from './formMessagesReducer';

export default combineReducers({
    personalInfo: personalInfoReducer,
    formMessages: formMessagesReducer
    // products: productsReducer
})