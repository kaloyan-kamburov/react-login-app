import initialState from './initialState';
import * as actionTypes from '../common/constants';

const userReducer = (state = initialState.user, action) => {
    // console.log(action)
    switch (action.type) {
        case actionTypes.USER_REGISTER:
            return state;
        case actionTypes.USER_REGISTERED:
            console.log(action.payload)
            localStorage.setItem('loginAppToken', 'JWT ' + action.payload.token);
            return Object.assign({}, state, {
                personal_info: {
                    username: {
                        ...state.personal_info.username,
                        value: action.payload.user.username
                    },
                    firstname: {
                        ...state.personal_info.firstname,
                        value: action.payload.user.firstname
                    },
                    lastname: {
                        ...state.personal_info.lastname,
                        value: action.payload.user.lastname
                    },
                    email: {
                        ...state.personal_info.email,
                        value: action.payload.user.email
                    },
                    address: {
                        ...state.personal_info.address,
                        value: action.payload.user.address
                    },
                    phone: {
                        ...state.personal_info.phone,
                        value: action.payload.user.username
                    },
                    errorType: '',
                    errorMsg: ''
                }
            })            
        case actionTypes.USER_REGISTER_ERROR:
            return Object.assign({}, state, {
                personal_info: {
                    ...state.personal_info,
                    errorMsg: action.payload.errorMsg,
                    errorType: action.payload.errorType
                },
            }); 
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
}

export default userReducer;