import initialState from './initialState';
import * as actionTypes from '../common/constants';

const userReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case actionTypes.USER_REGISTER:
        case actionTypes.USER_REGISTERED:
            return Object.assign({}, state, {
                name: action.payload.name,
                email: action.payload.email
            })
        case actionTypes.USER_REGISTER_ERROR:
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