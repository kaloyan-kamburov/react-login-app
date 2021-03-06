import initialState from '../initialState';
import * as constants from '../../common/constants';
import {
    setAxiosHeaders
} from '../../common/helpers';

const personalInfoReducer = (state = initialState.user.personalInfo, action) => {
    switch (action.type) {
        case constants.USER_LOGIN_SUCCESS:
        case constants.USER_REGISTER_SUCCESS:
            if (action.payload.token) {
                localStorage.setItem('token', action.payload.token);
                setAxiosHeaders(localStorage.getItem('token'));
            }
            return {
                ...state,
                ...action.payload.user
            }

        case constants.USER_REGISTER_ERROR:
            return {
                ...state,
            }
        case constants.USER_SET_DATA_SUCCESS: 
            return {
                ...state,
                ...action.payload.user
            }
        case constants.USER_SET_DATA_ERROR:
            return state;
        case constants.USER_UPDATE_SUCCESS:
        case constants.ADMIN_UPDATE_INFO_SUCCESS:
            return {
                ...state,
                ...action.payload.user
            }
        case constants.USER_UPDATE_ERROR:
        case constants.ADMIN_UPDATE_INFO_ERROR:
            return {
                ...state,
                ...action.payload.user
            }        
        case constants.USER_LOGIN_ERROR:
            return {
                ...state
            }
        case constants.USER_LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                ...initialState.user.personalInfo
            }        
        case constants.USER_CHANGE_PASSWORD_SUCCESS: 
            return {
                ...state
            }
        case constants.USER_CHANGE_PASSWORD_ERROR: 
            return {
                ...state,
                changePasswordSuccess: false,
                msgChangePassword: action.payload.msg
            }
        default:
            return state;
    }
}

export default personalInfoReducer;
