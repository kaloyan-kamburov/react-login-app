import initialState from './initialState';
import * as actionTypes from '../common/constants';

const userReducer = (state = initialState.user, action) => {
    // console.log(action)
    switch (action.type) {
        case actionTypes.USER_REGISTER:
        case actionTypes.USER_REGISTERED:
            return Object.assign({}, state, {
                ...state,
                name: action.payload.name,
                email: action.payload.email
                
            })            
        case actionTypes.USER_REGISTER_ERROR:
            return state;
        case actionTypes.USER_LOGIN:
            return Object.assign({}, state, {
                ...state,
                email: action.payload.email,
                password: action.payload.password
            })
        case actionTypes.USER_LOGGED:
            return state;
        case actionTypes.USER_LOGIN_ERROR:
        debugger
            return state;
        default:
            return state;
    }
    // if (action.type === 'USER_REGISTER') {
    //     return {
    //         name: action.payload.name,
    //         email: action.payload.email
    //     }
    // } else if (action.type === 'USER_REGISTERED') {
    //     return {
    //         name: action.payload.name,
    //         email: action.payload.email
    //     }
    // } else {
    //     return state;
    // }
}

export default userReducer;