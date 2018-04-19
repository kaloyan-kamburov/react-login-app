import { combineReducers } from 'redux';
import userReducer from './user';
import adimnReducer from './admin';
import serverReducer from './server';
import categoryReducer from './categories'
import formMessagesReducer from './formMessages';


import initialState from './initialState';
import * as actionTypes from '../common/constants'

export default combineReducers({
    user: userReducer,
    admin: adimnReducer,
    server: serverReducer,
    categories: categoryReducer,
    formMessages: formMessagesReducer
    // products: productsReducer
})


// const logoutReducer = (state = initialState, action) => {
//     switch (action.type) {
// 		case actionTypes.USER_LOGOUT:
// 			return {
//                 ...state,
//                 user: initialState.user,
//                 admin: initialState.admin,
//                 server: initialState.server
//             }
//         default:
//             return state
//     }
// }