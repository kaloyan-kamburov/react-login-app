import initialState from '../initialState';
import * as constants from '../../common/constants';
import * as helpers from '../../common/helpers';

const personalInfoReducer = (state = initialState.user.personalInfo, action) => {
    switch (action.type) {
        case constants.USER_LOGGED:
        case constants.USER_REGISTERED:
            localStorage.setItem('token', action.payload.token);
            helpers.setAxiosHeaders(localStorage.getItem('token'));
            return {
                ...state,
                ...action.payload.user
            }
        break;

        case constants.USER_REGISTER_ERROR:
            return {
                ...state,
                serverErrorMsg: action.payload.errorMsg,
                serverErrorType: action.payload.errorType
            }
        break;

        case constants.USER_SET_PERSONAL_INFO: 
            return {
                ...state,
                ...action.payload.user
            }

        case constants.USER_UPDATED: 
        console.log({
            ...state
        })
            return {
                ...state,
                ...action.payload.user
            }

        case constants.USER_UPDATE_ERROR: 
        
            return {
                ...state,
                ...action.payload.user
            }
        
        case constants.USER_INFO_CHANGE:
            return {
                ...state,
                ...action.payload
            }

        break;
        default:
            return state;
    }
}

export default personalInfoReducer;


/*case constants.USER_LOGGED:
            localStorage.setItem('loginAppToken', action.payload.token);
            return Object.assign({}, state, {
                loggedIn: true,
                personal_info: {
                    ...state.personal_info,
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
                        value: action.payload.user.phone
                    }
                }
            });
            
            // return Object.assign({}, state, {
            //     ...state,
            //     userOrEmail: action.payload.email,
            //     password: action.payload.password
            // })
        */